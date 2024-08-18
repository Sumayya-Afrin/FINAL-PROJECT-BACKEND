import cors from "cors";
import craftsRouter from "./routes/crafts.route.js";
import express from "express";
const app = express();

const PORT = process.env.PORT || 4000;
app.use(cors());
app.use(express.json());

app.get("/", function (request, response) {
  response.send("🙋‍♂️, 🌏 🎊✨🤩");
});

app.use("/Crafts", craftsRouter);

app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));

// request -> index.js -> Router -> Controller -> Service -> DB
