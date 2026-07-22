//IMPORT MODELS NEEDED
import {
    getAllProjects,
    getUpcomingProjects,
    getProjectDetails,
    getProjectsByOrganizationId,
    createProject
} from "../models/projects.js";

import { retrieveCategoriesByProjectId } from "../models/categories.js";
import { getAllOrganizations } from "../models/organizations.js";
import { body, validationResult } from "express-validator";


// VALIDATION RULES FOR NEW PROJECT CREATIONS
const projectValidation = [
    body('title')
        .trim()
        .notEmpty().withMessage('Title is required')
        .isLength({ min: 3, max: 200 }).withMessage('Title must be between 3 and 200 characters'),
    body('description')
        .trim()
        .notEmpty().withMessage('Description is required')
        .isLength({ max: 1000 }).withMessage('Description must be less than 1000 characters'),
    body('location')
        .trim()
        .notEmpty().withMessage('Location is required')
        .isLength({ max: 200 }).withMessage('Location must be less than 200 characters'),
    body('date')
        .notEmpty().withMessage('Date is required')
        .isISO8601().withMessage('Date must be a valid date format'),
    body('organizationId')
        .notEmpty().withMessage('Organization is required')
        .isInt().withMessage('Organization must be a valid integer')
];

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
    console.log(categories);

    const title = 'Service Project Details';
    res.render('project', { title, project_details, categories });
}

const showNewProjectForm = async (req, res) => {
    const allOrganizations = await getAllOrganizations();
    const title = 'Create new Service Project'

    res.render('new-project', { title, allOrganizations });
}

const processNewProjectForm = async (req, res) => {
    const { organization_id, title, description, location, date } = req.body;

    // Check for validation errors
    const errors = validationResult(req.body);

    if (!errors.isEmpty()) {
        // Loop through validation errors and flash them
        errors.array().forEach((error) => {
            req.flash('error', error.msg);
        });

        // Redirect back to the new project form
        return res.redirect('/new-project');
    }

    try {
        const project_id = await createProject(organization_id, title, description, location, date);

        req.flash('success', 'Project successfully created! 🤑');
        res.redirect(`/project/${project_id}`);
    }

    catch (error) {
        console.error('Error creating new project:', error);
        req.flash('error', 'There was an error creating the service project.');
        res.redirect('/new-project');
    }
}

//EXPORT CONTROLLER FUNCTIONS
export { showProjectsPage, showProjectDetailsPage, showNewProjectForm, processNewProjectForm, projectValidation };