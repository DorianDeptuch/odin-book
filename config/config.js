const dev = process.env.NODE_ENV !== "production";

export const server = dev
  ? "http://localhost:3001"
  : "https://the_deployment.server.com";

export const client = dev
  ? "http://localhost:3000"
  : "https://the_deployment.server.com";
