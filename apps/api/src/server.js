import Fastify from "fastify";
import { getRepository } from "./services/repository.service.js";
const app = Fastify({
  //  logger: true,
});

app.get("/health", async () => {
  return {
    status: "OK",
    service: "RepoPilot AI Backend",
  };
});

app.get("/api/repos/:owner/:repo", async (request) => {
  const { owner, repo } = request.params;

  const data = await getRepository(owner, repo);
  return data;
});

await app.listen({
  port: 3001,
});
