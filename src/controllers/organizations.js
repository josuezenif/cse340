// IMPORT MODELS NEEDED 
import {
    getAllOrganizations,
    getOrganizationDetails,
    createOrganization,
    updateOrganization
} from "../models/organizations.js";

import { getProjectsByOrganizationId } from "../models/projects.js";
import { body, validationResult } from "express-validator";

// Define validation and sanitization rules for organization form
// Define validation rules for organization form
const organizationValidation = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Organization name is required')
        .isLength({ min: 3, max: 150 })
        .withMessage('Organization name must be between 3 and 150 characters'),
    body('description')
        .trim()
        .notEmpty()
        .withMessage('Organization description is required')
        .isLength({ max: 500 })
        .withMessage('Organization description cannot exceed 500 characters'),
    body('contactEmail')
        .normalizeEmail()
        .notEmpty()
        .withMessage('Contact email is required')
        .isEmail()
        .withMessage('Please provide a valid email address')
];

// DEFINE CONTROLLER FUNCTIONS
const showOrganizationsPage = async (req, res) => {
    const organizations = await getAllOrganizations();

    const title = 'Partner Organizations'
    res.render('organizations', { title, organizations });
};

const showOrganizationDetailsPage = async (req, res) => {
    const organizationId = req.params.id;
    const organizationDetails = await getOrganizationDetails(organizationId);
    const projects = await getProjectsByOrganizationId(organizationId);
    const title = 'Organization Details';

    res.render('organization', { title, organizationDetails, projects });
};

// NEW ORGANIZATION FUNCTION
const showNewOrganizationForm = async (req, res) => {
    const title = 'Add New Organization';

    res.render('new-organization', { title });
}

const processNewOrganizationForm = async (req, res) => {
    // Check for validation errors
    const results = validationResult(req);

    if (!results.isEmpty()) {
        // Validation failed - loop through errors
        results.array().forEach((error) => {
            req.flash('error', error.msg);
        });

        // Redirect back to the new organization form
        return res.redirect('/new-organization');
    }

    const { name, description, contactEmail } = req.body; // USED TO PULL NAME PROPERTIES OUT OF OBJECT INTO VARIABLES
    const logoFilename = 'placeholder-logo.png'; // Use the placeholder logo for all new organizations

    const organizationId = await createOrganization(name, description, contactEmail, logoFilename);

    // Set a success flash message
    req.flash('success', 'Organization added successfully!');

    res.redirect(`/organization/${organizationId}`);
};

const showEditOrganizationForm = async (req, res) => {
    const id = req.params.id;
    const title = 'Edit Organization'

    const organization = await getOrganizationDetails(id);
    res.render('edit-organization', { title, organization });
}

const processEditOrganizationForm = async (req, res) => {
    const organizationID = req.params.id;
    const { name, description, contactEmail, logo_file } = req.body;

    // Check for validation errors
    const results = validationResult(req);
    if (!results.isEmpty()) {

        // Validation failed - loop through errors
        results.array().forEach((error) => {
            req.flash('error', error.msg);
        });

        // Redirect back to the edit organization form
        return res.redirect('/edit-organization/' + organizationID);
    }
    console.log(contactEmail);

    await updateOrganization(name, description, contactEmail, logo_file, organizationID);

    req.flash('success', 'Organization updated successfully!');
    res.redirect(`/organization/${organizationID}`);
}

// EXPORT CONTROLLER FUNCTIONS
export {
    showOrganizationsPage,
    showOrganizationDetailsPage,
    showNewOrganizationForm,
    processNewOrganizationForm,
    organizationValidation,
    showEditOrganizationForm,
    processEditOrganizationForm
};

