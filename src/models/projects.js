import db from "./db.js";

async function getAllProjects() {
    const query = `
    SELECT title, services.description, project_location, project_date, organization.name
    FROM services
    JOIN organization
    ON services.organization_id = organization.organization_id;
    `

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

const getUpcomingProjects = async (number_of_projects) => {
    const query = `
        SELECT project_id, 
        title,
        services.description,
        project_date, 
        project_location,
        organization.organization_id,
        organization.name

        FROM services

        JOIN organization
        ON services.organization_id = organization.organization_id

        WHERE project_date >= CURRENT_DATE
        ORDER BY project_date ASC
        LIMIT ${number_of_projects};
    `;

    const result = await db.query(query);
    return result.rows;
}

async function getProjectDetails(id) {
    const query = `
        SELECT project_id,
        title,
        services.description,
        project_date,
        project_location,
        organization.organization_id,
        organization.name

        FROM services

        JOIN organization
        ON services.organization_id = organization.organization_id
        WHERE services.organization_id = $1;
    `;

    const queryParams = [id];
    const result = await db.query(query, queryParams);
    return result.rows.length > 0 ? result.rows[0] : null;
}

export { getAllProjects, getProjectsByOrganizationId, getUpcomingProjects, getProjectDetails };