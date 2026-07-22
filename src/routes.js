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
    projectValidation
} from "./controllers/projects.js";

import { showCategoriesPage, showCategoryDetails } from "./controllers/categories.js";
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


// error-handling routes
router.get('/test-error', testErrorPage);

export default router;
