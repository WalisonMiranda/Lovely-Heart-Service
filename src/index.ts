import express from "express";
import cors from "cors";

import router from "./routes";

const app = express();
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: "*",
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(router);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
