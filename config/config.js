const dev = process.env.NODE_ENV !== "production";

export const server = dev
  ? "http://localhost:3001"
  : "https://odin-book.vercel.app/";

export const client = dev
  ? "http://localhost:3000"
  : "https://odin-book.vercel.app/";
