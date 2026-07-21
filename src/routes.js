import express from "express";

// IMPORTING CONTROLLER FUNCTIONS 
import { showHomePage } from "./controllers/index.js";
import { showOrganizationsPage, showOrganizationDetailsPage, showNewOrganizationForm, processNewOrganizationForm } from "./controllers/organizations.js";
import { showProjectsPage, showProjectDetailsPage } from "./controllers/projects.js";
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
router.post('/new-organization', processNewOrganizationForm);

// error-handling routes
router.get('/test-error', testErrorPage);

export default router;
