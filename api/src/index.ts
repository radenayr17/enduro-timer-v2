import express, { Express, Request, Response } from "express";

import { raceRoute, userRoute, authRoute } from "@/routes";

const app: Express = express();
const port = process.env.PORT || 8000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Enduro Timer API");
});
app.use("/auth", authRoute);
app.use("/races", raceRoute);
app.use("/users", userRoute);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
