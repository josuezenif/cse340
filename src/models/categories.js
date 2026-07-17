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
    return result.rows.length > 0 ? result.rows[0] : null;
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

export { getAllCategories, retrieveSingleCategoryById, retrieveCategoriesByProjectId, retrieveAllProjectsByCategoryId }

//     return result.rows.length > 0 ? result.rows[0] : null;