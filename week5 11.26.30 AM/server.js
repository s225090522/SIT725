const express = require("express");
const mongoose = require("mongoose");
const app = express();
const path = require("path");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const mongoURI = "mongodb://127.0.0.1:27017/sportDB";
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

const projectSchema = new mongoose.Schema({
  title: { type: String, unique: true },
  image: String,
  link: String,
  description: String,
});

const Project = mongoose.model("Project", projectSchema);

const addSampleProjects = async () => {
  try {
    await Project.deleteMany({});

    const sportsProjects = [
      {
        title: "Cricket",
        image: "images/cricket.jpg",
        link: "About Cricket",
        description: "Cricket is a bat-and-ball game played globally.",
      },
      {
        title: "Football",
        image: "images/football.jpg",
        link: "About Football",
        description: "Football is the world's most popular sport.",
      },
      {
        title: "Basketball",
        image: "images/basketball.jpg",
        link: "About Basketball",
        description: "Basketball is a fast-paced and high-scoring sport.",
      },
      {
        title: "Hockey",
        image: "images/hockey.jpg",
        link: "About Hockey",
        description: "Hockey is a thrilling sport played on ice and field.",
      },
    ];

    await Project.insertMany(sportsProjects);
    console.log("Sports projects saved!");
  } catch (err) {
    console.error("Error adding sample projects:", err);
  }
};

addSampleProjects();

app.get("/api/projects", async (req, res) => {
  try {
    const projects = await Project.find();
    res.json({ statusCode: 200, data: projects, message: "Success" });
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: "Database Error", error: err });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App listening on port: ${port}`);
});
