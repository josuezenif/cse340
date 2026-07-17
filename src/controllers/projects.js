//IMPORT MODELS NEEDED
import { getAllProjects, getUpcomingProjects, getProjectDetails, getProjectsByOrganizationId } from "../models/projects.js";
import { retrieveCategoriesByProjectId } from "../models/categories.js";

const NUMBER_OF_UPCOMING_PROJECTS = 5;

// DEFINE AYN CONTROLLER FUNCTIONS
const showProjectsPage = async (req, res) => {
    const projects = await getUpcomingProjects(NUMBER_OF_UPCOMING_PROJECTS);

    const title = 'Upcoming Service Projects'
    res.render('projects', { title, projects });
};

const showProjectDetailsPage = async (req, res) => {
    const projectId = req.params.id
    const project_details = await getProjectDetails(projectId);
    const categories = await retrieveCategoriesByProjectId(projectId);

    const title = 'Service Project Details';
    res.render('project', { title, project_details, categories });
}

//EXPORT CONTROLLER FUNCTIONS
export { showProjectsPage, showProjectDetailsPage };