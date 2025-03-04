import express, { Express, Request, Response, RequestHandler } from "express";

import { raceRoute, userRoute, authRoute } from "@/routes";
import { verifyUserToken } from "@/middlewares";

const app: Express = express();
const port = process.env.PORT || 8000;

app.use(express.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Enduro Timer API");
});
app.use("/auth", authRoute);
//app.use(verifyUserToken() as RequestHandler);
app.use("/races", raceRoute);
app.use("/users", userRoute);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
