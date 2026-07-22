// IMPORT MODELS NEEDED 
import {
    getAllCategories,
    retrieveSingleCategoryById,
    retrieveAllProjectsByCategoryId,
    retrieveCategoriesByProjectId,
    updateCategoryAssignments,
    createNewCategory,
    updateCategory
} from "../models/categories.js";

import { getProjectDetails } from "../models/projects.js";
import { body, validationResult } from "express-validator";

// VALIDATION RULES FOR NEW PROJECT CREATIONS
const categoryValidation = [
    body('category_name')
        .trim()
        .notEmpty()
        .withMessage('A name is required!')
        .isLength({ min: 3, max: 100 })
        .withMessage('Name must be between 3 and 100 characters')
];

// DEFINE CONTROLLER FUNCTIONS
const showCategoriesPage = async (req, res) => {
    const categories = await getAllCategories();

    const title = 'Categories Services'
    res.render('categories', { title, categories });
};

async function showCategoryDetails(req, res) {
    const category_id = req.params.id;
    const categoryDetails = await retrieveSingleCategoryById(category_id);
    const projectsList = await retrieveAllProjectsByCategoryId(category_id);

    const title = 'Category Details';
    res.render('category', { title, categoryDetails, projectsList });
}

const showAssignCategoriesForm = async (req, res) => {
    const projectId = req.params.project_id;

    const projectDetails = await getProjectDetails(projectId);
    const categories = await getAllCategories();
    const assignedCategories = await retrieveCategoriesByProjectId(projectId);

    const title = 'Assign Categories to Project';

    res.render('assign-categories', { title, projectId, projectDetails, categories, assignedCategories });
};

const processAssignCategoriesForm = async (req, res) => {
    const projectId = req.params.project_id;
    const selectedCategoryIds = req.body.categoryIds || [];

    // Ensure selectedCategoryIds is an array
    const categoryIdsArray = Array.isArray(selectedCategoryIds) ? selectedCategoryIds : [selectedCategoryIds];
    await updateCategoryAssignments(projectId, categoryIdsArray);

    req.flash('success', 'Categories updated successfully.');
    res.redirect(`/project/${projectId}`);
};


const showNewCategoryForm = async (req, res) => {
    const title = 'Add new Category'

    res.render('new-category', { title });
}

const processNewCategoryForm = async (req, res) => {
    const { category_name } = req.body;

    // Check for validation errors
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        // Loop through validation errors and flash them
        errors.array().forEach((error) => {
            req.flash('error', error.msg);
        });

        // Redirect back to the new project form
        return res.redirect('/new-category');
    }

    try {
        const category_id = await createNewCategory(category_name);

        req.flash('success', 'New category successfully created! 🥳');
        res.redirect(`/category/${category_id}`);
    }

    catch (error) {
        console.error('Error creating new category:', error);
        req.flash('error', 'There was an error creating the service category.');
        res.redirect('/new-category');
    }
}

async function showUpdateCategoryForm(req, res) {
    const category_id = req.params.id;
    const category = await retrieveSingleCategoryById(category_id);

    const title = 'Update Category';
    res.render('edit-category', { title, category, category_id });
}

async function processUpdateCategoryForm(req, res) {
    const categoryId = req.params.id;
    const { category_name } = req.body;

    // Check for validation errors
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        // Loop through validation errors and flash them
        errors.array().forEach((error) => {
            req.flash('error', error.msg);
        });

        // Redirect back to the new project form
        return res.redirect(`/edit-category/${categoryId}`);
    }

    try {
        await updateCategory(category_name, categoryId);

        req.flash('success', 'Category updated successfully!');
        res.redirect(`/category/${categoryId}`);
    }

    catch (error) {
        console.error('Error updating the category:', error);
        req.flash('error', 'There was an error updating the service category.');
        res.redirect(`/edit-category/${categoryId}`);
    }
}

// EXPORT CONTROLLER FUNCTIONS
export {
    showCategoriesPage,
    showCategoryDetails,
    showAssignCategoriesForm,
    processAssignCategoriesForm,
    showNewCategoryForm,
    processNewCategoryForm,
    showUpdateCategoryForm,
    processUpdateCategoryForm,
    categoryValidation
};