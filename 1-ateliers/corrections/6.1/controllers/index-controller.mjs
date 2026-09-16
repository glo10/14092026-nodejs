export const getDocumentation = (_, res) => {
  const { PORT } = process.env;
  const documentation = [
    {
      route: "GET /teams",
      description: "Teams list",
      path: `http://localhost:${PORT}/teams`,
    },
    {
      route: " GET /teams/:id",
      description: "One team",
      schema: {
        id: "number",
      },
      path: `http://localhost:${PORT}/teams/1`,
    },
    {
      route: "POST /teams",
      description: "Add a new team",
      schema: {
        type: "application/json",
        body: {
          name: "string",
          country: "string",
        },
      },
    },
    //...
  ];
  res.json({ routes: documentation, version: "2.0.0" });
};