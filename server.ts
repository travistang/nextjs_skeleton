import express from 'express';
import { createServer }  from "http";
import { parse }  from "url";
import next  from "next";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const port = process.env.PORT || 8080;

app.prepare().then(() => {
  const app = express();
  const httpServer = createServer(app);
  app.use('/healthcheck', (req, res) => res.status(200).send('OK'));

  app.all('*', (req, res) => {
    return handle(req, res);
  });
  httpServer.listen({ port }, () => {
    console.log(`> Ready on http://localhost:${port}`)
  })
}).catch((error) => {
  console.log("Error:::::", error)
});
