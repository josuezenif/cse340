import db from "./db.js";

async function getAllCategories() {
    const query = `SELECT category_name, category_id
    FROM categories;`;

    const result = await db.query(query);
    return result.rows;
}

async function retrieveSingleCategoryById(id) {
    const query = `
        SELECT category_id, category_name
        FROM categories
        WHERE category_id = $1;
    `;

    const queryParams = [id];
    const result = await db.query(query, queryParams);
    return result.rows.length > 0 ? result.rows[0] : null;
}

async function retrieveCategoriesByProjectId(project_id) {
    const query = `
        SELECT categ.category_id, category_name, service_id AS project_id
        FROM categories categ
        JOIN service_categories serv_categ
        ON categ.category_id = serv_categ.category_id
        WHERE service_id = $1;
        `;

    const queryParams = [project_id];
    const result = await db.query(query, queryParams);
    return result.rows;
}

async function retrieveAllProjectsByCategoryId(category_id) {
    const query = `
        SELECT project_id, title, category_id
        FROM services serv
        JOIN service_categories serv_categ
        ON serv.project_id = serv_categ.service_id
        WHERE category_id = $1;
        `;

    const queryParams = [category_id];
    const result = await db.query(query, queryParams);
    return result.rows;
}

async function assignCategoryToProject(project_id, category_id) {
    const query = `
        INSERT INTO service_categories (service_id, category_id)
        VALUES ($1, $2);
    `;

    await db.query(query, [project_id, category_id]);
}

const updateCategoryAssignments = async (project_id, categoryIds) => {
    // First, remove existing category assignments for the project
    const deleteQuery = `
        DELETE FROM service_categories
        WHERE service_id = $1;
    `;
    await db.query(deleteQuery, [project_id]);

    // Next, add the new category assignments
    for (const categoryId of categoryIds) {
        await assignCategoryToProject(project_id, categoryId);
    }
}

const createNewCategory = async (category_name) => {
    const query = `
        INSERT INTO categories (category_name)
        VALUES ($1)
        RETURNING category_id;
    `;

    const queryParams = [category_name];
    const result = await db.query(query, queryParams);

    if (result.rows.length === 0) {
        throw new Error('Failed to create category');
    }

    if (process.env.ENABLE_SQL_LOGGING === 'true') {
        console.log('Created new category with ID:', result.rows[0].category_id);
    }

    console.log(result.rows[0].category_id);

    return result.rows[0].category_id;
}

async function updateCategory(category_name, category_id) {
    const query = `
        UPDATE categories
        SET category_name = $1
        WHERE category_id = $2
        RETURNING category_id;
    `;

    const queryParams = [category_name, category_id];
    const result = await db.query(query, queryParams);

    if (result.rows.length === 0) {
        throw new Error('Category not found');
    }

    if (process.env.ENABLE_SQL_LOGGING === 'true') {
        console.log('Updated category with ID:', category_id);
    }
    return result.rows[0].category_id;
}


export {
    getAllCategories,
    retrieveSingleCategoryById,
    retrieveCategoriesByProjectId,
    retrieveAllProjectsByCategoryId,
    updateCategoryAssignments,
    createNewCategory,
    updateCategory
}

//     return result.rows.length > 0 ? result.rows[0] : null;