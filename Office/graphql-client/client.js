const fetch = global.fetch;

async function run() {
  console.time("GraphQL Total");

  await fetch("http://localhost:4000/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
        query {
          screen(id: "1") {
            name
            layout
            sections {
              id
              type
              components {
                ... on PromoBlock {
                  title
                  image
                }
                ... on WeatherWidget {
                  temperature
                  icon
                }
              }
            }
          }
        }
      `,
    }),
  }).then(res => res.json());

  console.timeEnd("GraphQL Total");
}

run();