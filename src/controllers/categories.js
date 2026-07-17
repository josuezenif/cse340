// IMPORT MODELS NEEDED 
import { getAllCategories, retrieveSingleCategoryById, retrieveAllProjectsByCategoryId } from "../models/categories.js";

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

// EXPORT CONTROLLER FUNCTIONS
export { showCategoriesPage, showCategoryDetails };