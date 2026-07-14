import express from "express";

// IMPORTING CONTROLLER FUNCTIONS 
import { showHomePage } from "./controllers/index.js";
import { showOrganizationsPage, showOrganizationDetailsPage } from "./controllers/organizations.js";
import { showProjectsPage } from "./controllers/projects.js";
import { showCategoriesPage } from "./controllers/categories.js";
import { testErrorPage } from "./controllers/errors.js";

// DEFINING ROUTES AND GETTING PAGES
const router = express.Router();

router.get('/', showHomePage);
router.get('/organizations', showOrganizationsPage);
router.get('/projects', showProjectsPage);
router.get('/categories', showCategoriesPage);
router.get('/organization/:id', showOrganizationDetailsPage);

// error-handling routes
router.get('/test-error', testErrorPage);

export default router;
