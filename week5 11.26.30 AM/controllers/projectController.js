const Project = require("../models/Project");

const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.json({ statusCode: 200, data: projects, message: "Success" });
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: "Database Error", error: err });
  }
};

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

module.exports = { getAllProjects, addSampleProjects };
