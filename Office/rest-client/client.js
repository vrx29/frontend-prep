const fetch = global.fetch;

async function run() {
  console.time("REST Total");

  const screen = await fetch("http://localhost:4000/screen/1").then(res =>
    res.json()
  );

  const sections = await fetch(
    "http://localhost:4000/screen/1/sections"
  ).then(res => res.json());

  for (const section of sections) {
    await fetch(
      `http://localhost:4000/sections/${section.id}/components`
    ).then(res => res.json());
  }

  console.timeEnd("REST Total");
}

run();