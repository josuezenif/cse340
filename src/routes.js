import express from "express";

// IMPORTING CONTROLLER FUNCTIONS 
import { showHomePage } from "./controllers/index.js";
import {
    showOrganizationsPage,
    showOrganizationDetailsPage,
    showNewOrganizationForm,
    processNewOrganizationForm,
    organizationValidation,
    showEditOrganizationForm,
    processEditOrganizationForm
} from "./controllers/organizations.js";

import {
    showProjectsPage,
    showProjectDetailsPage,
    showNewProjectForm,
    processNewProjectForm,
    projectValidation,
    showEditProjectForm,
    processEditProjectForm
} from "./controllers/projects.js";

import {
    showCategoriesPage,
    showCategoryDetails,
    showAssignCategoriesForm,
    processAssignCategoriesForm,
    showNewCategoryForm,
    processNewCategoryForm,
    showUpdateCategoryForm,
    processUpdateCategoryForm,
    categoryValidation
} from "./controllers/categories.js";

import { testErrorPage } from "./controllers/errors.js";

// DEFINING ROUTES AND GETTING PAGES
const router = express.Router();

router.get('/', showHomePage);
router.get('/organizations', showOrganizationsPage);
router.get('/projects', showProjectsPage);
router.get('/categories', showCategoriesPage);
router.get('/organization/:id', showOrganizationDetailsPage);
router.get('/project/:id', showProjectDetailsPage);
router.get('/category/:id', showCategoryDetails);

// ROUTE FOR NEW ORGINZATION
router.get('/new-organization', showNewOrganizationForm);

// Route to handle new organization form submission
router.post('/new-organization', organizationValidation, processNewOrganizationForm);

// ROUTE FOR EDIT ORGANIZATION PAGE
router.get('/edit-organization/:id', showEditOrganizationForm);

// ROUTE FOR UPTDATING ORGANIZATON DATA
router.post('/edit-organization/:id', organizationValidation, processEditOrganizationForm);

// ROUTE FOR CREATING AND DISPLAYING NEW PROJECT INFORMATION
router.get('/new-project', showNewProjectForm);
router.post('/new-project', projectValidation, processNewProjectForm);

//ROUTES FOR ASSIGNING AND DISPLAYING CATEGORIES TO PROJECTS
router.get('/project/:project_id/assign-categories', showAssignCategoriesForm);
router.post('/project/:project_id/assign-categories', processAssignCategoriesForm);

// ROUTES TO DISPLAY EDIT PROJECT FROM AND TO PROCESS THE DATA AND DISPLAY IT
router.get('/edit-project/:id', showEditProjectForm);
router.post('/edit-project/:id', projectValidation, processEditProjectForm);

// SHOW NEW CATEGORY FORM AND PROCESS THE DATA
router.get('/new-category', showNewCategoryForm);
router.post('/new-category', categoryValidation, processNewCategoryForm);

// ROUTES TO SHOW UPDATE CATEGORY FORM AND TO PROCESS DATA
router.get('/edit-category/:id', showUpdateCategoryForm);
router.post('/edit-category/:id', categoryValidation, processUpdateCategoryForm);

// error-handling routes
router.get('/test-error', testErrorPage);

export default router;
