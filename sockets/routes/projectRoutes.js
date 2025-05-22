
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
        title: 'Dog',
        image: 'images/dog-4.jpg',
        link: 'About dogs',
        description: 'Dogs are man\'s best friends.',
      },
      {
        title: 'Rabbit',
        image: 'images/rabbit.jpg',
        link: 'About rabbits',
        description: 'Rabbits are cute and fluffy animals!',
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

addSampleProjects();

module.exports = { getProjects, addSampleProjects };
