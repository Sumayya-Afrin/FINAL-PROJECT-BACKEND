import cors from "cors";
import craftsRouter from "./routes/crafts.route.js";
import usersRouter from "./routes/users.route.js";
import cartRouter from "./routes/cart.routes.js";
import express from "express";
const app = express();

const PORT = process.env.PORT || 4000;
app.use(cors());
app.use(express.json());

app.get("/", function (request, response) {
  response.send("🎊✨🤩");
});

app.use("/crafts", craftsRouter);
app.use("/users", usersRouter);
app.use("/cart", cartRouter);
// app.get("/crafts", async (req, res) => {
//   const searchTerm = req.query.search || "";
//   try {
//     const crafts = await CraftModel.find({ name: new RegExp(searchTerm, "i") });
//     res.json(crafts);
//   } catch (error) {
//     res.status(500).send("Error retrieving crafts");
//   }
// });

app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));

// request -> index.js -> Router -> Controller -> Service -> DB
