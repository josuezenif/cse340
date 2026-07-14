//IMPORT MODELS NEEDED
import { getAllProjects } from "../models/projects.js";

// DEFINE AYN CONTROLLER FUNCTIONS
const showProjectsPage = async (req, res) => {
    const projects = await getAllProjects();

    const title = 'Service Projects'
    res.render('projects', { title, projects });
};

//EXPORT CONTROLLER FUNCTIONS
export { showProjectsPage };