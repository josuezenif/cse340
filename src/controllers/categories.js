// IMPORT MODELS NEEDED 
import { getAllCategories } from "../models/categories.js";

// DEFINE CONTROLLER FUNCTIONS
const showCategoriesPage = async (req, res) => {
    const categories = await getAllCategories();

    const title = 'Categories Services'
    res.render('categories', { title, categories });
};

// EXPORT CONTROLLER FUNCTIONS
export { showCategoriesPage };