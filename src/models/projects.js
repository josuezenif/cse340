import db from "./db.js";

async function getAllProjects() {
    const query = `SELECT title, services.description, project_location, project_date, organization.name
    FROM public.services
    JOIN organization
    ON services.organization_id = organization.organization_id;`

    const result = await db.query(query);
    return result.rows;
}

const getProjectsByOrganizationId = async (organizationId) => {
    const query = `
        SELECT
          project_id,
          organization_id,
          title,
          description,
          project_location,
          project_date
        FROM services
        WHERE organization_id = $1
        ORDER BY project_date;
      `;

    const queryParams = [organizationId];
    const result = await db.query(query, queryParams);

    return result.rows;
};

export { getAllProjects, getProjectsByOrganizationId }