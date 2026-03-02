const express = require("express");
const app = express();
const PORT = 4000;

// --------------------
// Performance Middleware
// --------------------
app.use((req, res, next) => {
  const start = process.hrtime.bigint();

  res.on("finish", () => {
    const end = process.hrtime.bigint();
    const durationMs = Number(end - start) / 1_000_000;
    console.log(
      `[REST] ${req.method} ${req.url} - ${durationMs.toFixed(2)} ms`
    );
  });

  next();
});

// --------------------
// Mock CMS Data
// --------------------
const screenData = {
  id: "1",
  name: "Lobby Screen",
  layout: "grid",
  sections: [
    {
      id: "s1",
      type: "promo",
      components: [
        { type: "PromoBlock", title: "Big Sale", image: "sale.jpg" },
      ],
    },
    {
      id: "s2",
      type: "weather",
      components: [
        { type: "WeatherWidget", temperature: 24, icon: "sun.png" },
      ],
    },
  ],
};

// --------------------
// REST Endpoints
// --------------------
app.get("/screen/:id", (req, res) => {
  res.json(screenData);
});

app.get("/screen/:id/sections", (req, res) => {
  res.json(screenData.sections);
});

app.get("/sections/:id/components", (req, res) => {
  const section = screenData.sections.find(
    (s) => s.id === req.params.id
  );
  res.json(section ? section.components : []);
});

app.listen(PORT, () =>
  console.log(`REST Server running at http://localhost:${PORT}`)
);