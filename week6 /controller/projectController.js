
const Project = require('../model/project');  

const getProjects = async (req, res) => {
  try {
    const projects = await Project.find();  
    res.json({ statusCode: 200, data: projects, message: 'Success' });
  } catch (err) {
    console.error('Error fetching projects:', err);
    res.status(500).json({ statusCode: 500, message: 'Database Error', error: err });
  }
};

const addSampleProjects = async () => {
  try {
    await Project.deleteMany({});  

    const sampleProjects = [
      {
        title: 'Cricket',
        image: 'images/cricket.jpg',
        link: 'About cricket',
        description: 'Cricket is a popular bat-and-ball sport played worldwide.',
      },
      {
        title: 'Football',
        image: 'images/football.jpg',
        link: 'About football',
        description: 'Football is the most popular sport globally, known for its passion and skill.',
      },
    ];

    for (let project of sampleProjects) {
      const newProject = new Project(project);
      await newProject.save();
      console.log(`${project.title} project saved!`);
    }
  } catch (err) {
    console.error('Error adding sample projects:', err);
  }
};

// Optionally call this function in dev only
addSampleProjects();

module.exports = { getProjects, addSampleProjects };
