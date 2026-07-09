import db from "./db.js";

async function getAllCategories() {
    const query = `SELECT category_name
    FROM categories;`;

    const result = await db.query(query);
    return result.rows;
}

export { getAllCategories }