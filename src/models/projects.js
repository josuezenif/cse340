import db from "./db.js";

async function getAllProjects() {
    const query = `SELECT title, services.description, project_location, project_date, organization.name
    FROM public.services
    JOIN organization
    ON services.organization_id = organization.organization_id;`

    const result = await db.query(query);
    return result.rows;
}

export { getAllProjects }