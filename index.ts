import express from "express";
import API from "./src/driving";
const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", API);

app.get("/", (_req, res) => {
  res.send("IsOdd API Root");
});

app.listen(PORT, () => console.log(`Server Listening On Port ${PORT}`));
