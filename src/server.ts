import app from "./app";
import { AppDataSource } from "./data-source";

const PORT: number = 3000;

const runningMsg: string = `Server is running on http://localhost:${PORT}`;

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected");

    app.listen(PORT, async () => {
      console.log(runningMsg);
    });
  })
  .catch((err) => {
    console.log(err);
  });
