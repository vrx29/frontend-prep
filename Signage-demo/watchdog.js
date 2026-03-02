/* ==========================================================
   Samsung Signage Web App Watchdog
   Version: 1.0 Production
   Designed for Tizen Web Runtime (Signage)
========================================================== */

(function (global) {
    "use strict";

    const DEFAULT_CONFIG = {
        intervalMs: 5000,

        thresholds: {
            memory: {
                warning: 75,
                critical: 85,
                reload: 90
            },
            minFPS: 20,
            maxDOMNodes: 5000
        },

        autoReloadOnCritical: true,
        enableSoftCleanup: true,
        enableLogging: true,
        remoteEndpoint: null, // e.g. "https://your-server/api/metrics"
        maxReloadsPerSession: 3
    };

    class SignageWatchdog {

        constructor(config = {}) {
            this.config = this.mergeDeep(DEFAULT_CONFIG, config);
            this.frameCount = 0;
            this.fps = 0;
            this.lastFrameTime = performance.now();
            this.reloadCount = 0;
            this.started = false;
            this.monitorInterval = null;
        }

        start() {
            if (this.started) return;
            this.started = true;

            this.monitorFPS();
            this.monitorInterval = setInterval(() => {
                this.checkHealth();
            }, this.config.intervalMs);

            this.log("Watchdog started");
        }

        stop() {
            clearInterval(this.monitorInterval);
            this.started = false;
        }

        /* =============================
           METRICS
        ============================== */

        getMemoryUsage() {
            if (performance.memory) {
                const mem = performance.memory;
                return {
                    used: mem.usedJSHeapSize,
                    limit: mem.jsHeapSizeLimit,
                    percent: (mem.usedJSHeapSize / mem.jsHeapSizeLimit) * 100
                };
            }
            return null;
        }

        getDOMNodeCount() {
            return document.getElementsByTagName("*").length;
        }

        monitorFPS() {
            const loop = () => {
                this.frameCount++;
                const now = performance.now();

                if (now >= this.lastFrameTime + 1000) {
                    this.fps = this.frameCount;
                    this.frameCount = 0;
                    this.lastFrameTime = now;
                }

                requestAnimationFrame(loop);
            };
            requestAnimationFrame(loop);
        }

        /* =============================
           HEALTH CHECK
        ============================== */

        checkHealth() {
            const mem = this.getMemoryUsage();
            const dom = this.getDOMNodeCount();
            const fps = this.fps;

            if (this.config.enableLogging) {
                this.logMetrics(mem, dom, fps);
            }

            if (mem) {
                this.handleMemory(mem.percent);
            }

            if (fps < this.config.thresholds.minFPS) {
                this.log("Low FPS detected:", fps);
                this.applyMitigation("fps");
            }

            if (dom > this.config.thresholds.maxDOMNodes) {
                this.log("High DOM count:", dom);
                this.applyMitigation("dom");
            }
        }

        /* =============================
           MEMORY HANDLING
        ============================== */

        handleMemory(percent) {
            const { warning, critical, reload } = this.config.thresholds.memory;

            if (percent >= reload) {
                this.log("Memory reload threshold reached:", percent);
                this.applyMitigation("reload");
            } else if (percent >= critical) {
                this.log("Memory critical threshold reached:", percent);
                this.applyMitigation("critical");
            } else if (percent >= warning) {
                this.log("Memory warning threshold reached:", percent);
                this.applyMitigation("warning");
            }
        }

        /* =============================
           MITIGATION STRATEGY
        ============================== */

        applyMitigation(level) {

            if (level === "warning" && this.config.enableSoftCleanup) {
                this.softCleanup();
            }

            if (level === "critical") {
                this.releaseResources();
            }

            if (level === "reload" || level === "fps" || level === "dom") {
                if (this.config.autoReloadOnCritical) {
                    this.safeReload();
                }
            }
        }

        softCleanup() {
            this.log("Performing soft cleanup");

            // Remove temporary elements
            document.querySelectorAll("[data-temp='true']").forEach(el => el.remove());

            // Clear unused references if your app exposes them
            if (global.appCache) global.appCache = null;

            if (window.gc) window.gc();
        }

        releaseResources() {
            this.log("Releasing heavy resources");

            // Pause all videos
            document.querySelectorAll("video").forEach(v => {
                v.pause();
                v.src = "";
                v.load();
            });

            // Clear canvas
            document.querySelectorAll("canvas").forEach(c => {
                const ctx = c.getContext("2d");
                if (ctx) ctx.clearRect(0, 0, c.width, c.height);
            });

            this.softCleanup();
        }

        safeReload() {
            if (this.reloadCount >= this.config.maxReloadsPerSession) {
                this.log("Max reloads reached. Skipping reload.");
                return;
            }

            this.reloadCount++;
            this.log("Reloading application... Count:", this.reloadCount);

            setTimeout(() => {
                if (global.tizen && tizen.application) {
                    try {
                        const app = tizen.application.getCurrentApplication();
                        app.exit();
                    } catch (e) {
                        location.reload(true);
                    }
                } else {
                    location.reload(true);
                }
            }, 1000);
        }

        /* =============================
           LOGGING
        ============================== */

        log(...args) {
            if (this.config.enableLogging) {
                console.log("[Watchdog]", ...args);
            }
        }

        logMetrics(mem, dom, fps) {
            const payload = {
                timestamp: Date.now(),
                memoryPercent: mem ? mem.percent : null,
                domCount: dom,
                fps: fps
            };

            if (this.config.remoteEndpoint) {
                fetch(this.config.remoteEndpoint, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload)
                }).catch(() => {});
            }

            this.log("Metrics:", payload);
        }

        /* =============================
           UTILS
        ============================== */

        mergeDeep(target, source) {
            for (const key in source) {
                if (source[key] instanceof Object && key in target) {
                    Object.assign(source[key], this.mergeDeep(target[key], source[key]));
                }
            }
            return { ...target, ...source };
        }
    }

    global.SignageWatchdog = SignageWatchdog;

})(window);