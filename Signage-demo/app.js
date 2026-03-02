/* ======================================================
   INTENTIONAL MEMORY + DOM + FPS LEAK APPLICATION
   This app is DESIGNED to leak.
====================================================== */

const bigMemoryLeak = [];
const timerLeaks = [];

const metricsDiv = document.getElementById("metrics");

function updateUI() {
    const mem = performance.memory
        ? (performance.memory.usedJSHeapSize / performance.memory.jsHeapSizeLimit) * 100
        : 0;

    metricsDiv.innerHTML = `
        Memory: ${mem ? mem.toFixed(2) + "%" : "Not Available"} <br>
        DOM Nodes: ${document.getElementsByTagName("*").length} <br>
        Timers: ${timerLeaks.length}
    `;
}

/* =============================
   MEMORY LEAK
============================= */
function createMemoryLeak() {
    const largeArray = new Array(250000).fill("LEAK_" + Math.random());
    bigMemoryLeak.push(largeArray);
}

/* =============================
   DOM LEAK
============================= */
function createDOMLeak() {
    const container = document.getElementById("dom-container");

    for (let i = 0; i < 50; i++) {
        const div = document.createElement("div");
        div.className = "box";
        container.appendChild(div);
    }
}

/* =============================
   CANVAS LEAK
============================= */
function createCanvasLeak() {
    const canvas = document.createElement("canvas");
    canvas.width = 500;
    canvas.height = 500;
    canvas.style.display = "none";
    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "blue";
    ctx.fillRect(0, 0, 500, 500);
}

/* =============================
   TIMER LEAK
============================= */
function createTimerLeak() {
    const id = setInterval(() => {
        Math.random();
    }, 1000);

    timerLeaks.push(id);
}

/* =============================
   FPS DEGRADATION
============================= */
function degradeFPS() {
    const start = performance.now();
    while (performance.now() - start < 50) {
        Math.sqrt(Math.random() * 10000);
    }
}

/* =============================
   MAIN LEAK LOOP
============================= */
setInterval(() => {
    createMemoryLeak();
    createDOMLeak();
    createCanvasLeak();
    createTimerLeak();
    degradeFPS();
    updateUI();

    console.log("Leak cycle executed");
}, 2000);