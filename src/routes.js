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
    processEditProjectForm,
    processNewVolunteer,
    processRemoveVolunteer,
    removeProject
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

import {
    showUserRegistrationForm,
    processUserRegistrationForm,
    showLoginForm,
    processLoginForm,
    processLogout,
    requireLogin,
    showDashboard,
    requireRole,
    allUsersPage
} from "./controllers/users.js";

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
router.get('/new-organization', requireRole('admin'), showNewOrganizationForm);

// Route to handle new organization form submission
router.post('/new-organization', requireRole('admin'), organizationValidation, processNewOrganizationForm);

// ROUTE FOR EDIT ORGANIZATION PAGE
router.get('/edit-organization/:id', requireRole('admin'), showEditOrganizationForm);

// ROUTE FOR UPDATING ORGANIZATON DATA
router.post('/edit-organization/:id', requireRole('admin'), organizationValidation, processEditOrganizationForm);

// ROUTE FOR CREATING AND DISPLAYING NEW PROJECT INFORMATION
router.get('/new-project', requireRole('admin'), showNewProjectForm);
router.post('/new-project', requireRole('admin'), projectValidation, processNewProjectForm);

//ROUTES FOR ASSIGNING AND DISPLAYING CATEGORIES TO PROJECTS
router.get('/project/:project_id/assign-categories', requireRole('admin'), showAssignCategoriesForm);
router.post('/project/:project_id/assign-categories', requireRole('admin'), processAssignCategoriesForm);

// ROUTES TO DISPLAY EDIT PROJECT FROM AND TO PROCESS THE DATA AND DISPLAY IT
router.get('/edit-project/:id', requireRole('admin'), showEditProjectForm);
router.post('/edit-project/:id', requireRole('admin'), projectValidation, processEditProjectForm);

// SHOW NEW CATEGORY FORM AND PROCESS THE DATA
router.get('/new-category', requireRole('admin'), showNewCategoryForm);
router.post('/new-category', requireRole('admin'), categoryValidation, processNewCategoryForm);

// ROUTES TO SHOW UPDATE CATEGORY FORM AND TO PROCESS DATA
router.get('/edit-category/:id', requireRole('admin'), showUpdateCategoryForm);
router.post('/edit-category/:id', requireRole('admin'), categoryValidation, processUpdateCategoryForm);


// ROUTES TO SHOW REGISTRATION FORM AND PROCESS THE REGISTRATION DATA
router.get('/register', showUserRegistrationForm);
router.post('/register', processUserRegistrationForm);


// ROUTES FOR LOGIN AUTHENTICATION AND LOGGING OUT
router.get('/login', showLoginForm);
router.post('/login', processLoginForm);
router.get('/logout', processLogout);

// REQUIRE LOGIN BEFORE SHOWING DASHBOARD AND DISPLAYING PROJECTS USER  IS SIGNED UP FOR
router.get('/dashboard', requireLogin, showDashboard);

// DISPLAYING ALL USERS FOR ADMIN
router.get('/allUsers', requireRole('admin'), allUsersPage);

// ADDING VOLUNTEERS TO PROJECTS
// router.get('/volunteer', requireLogin, showVolunteerPage)
router.get('/volunteer/:project_id', requireLogin, processNewVolunteer);

// PROCESSING REMOVING VOLUNTEER FROM PROJECT
router.get('/remove-volunteer/:project_id', requireLogin, processRemoveVolunteer);

// REMOVING PROJECT FROM DASHBOARD
router.get('/remove-project/:project_id', requireLogin, removeProject);

// error-handling routes
router.get('/test-error', testErrorPage);

export default router;
