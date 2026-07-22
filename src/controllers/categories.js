// IMPORT MODELS NEEDED 
import {
    getAllCategories,
    retrieveSingleCategoryById,
    retrieveAllProjectsByCategoryId,
    retrieveCategoriesByProjectId,
    updateCategoryAssignments
} from "../models/categories.js";

import { getProjectDetails } from "../models/projects.js";

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

// EXPORT CONTROLLER FUNCTIONS
export { showCategoriesPage, showCategoryDetails, showAssignCategoriesForm, processAssignCategoriesForm };