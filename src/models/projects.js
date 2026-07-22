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
        WHERE project_id = $1;
    `;

    const queryParams = [id];
    const result = await db.query(query, queryParams);
    return result.rows.length > 0 ? result.rows[0] : null;
}

async function createProject(organization_id, title, description, location, date) {
    const query = `
        INSERT INTO services (organization_id, title, description, project_location, project_date)
        VALUES($1, $2, $3, $4, $5)
        RETURNING project_id;
    `;

    const queryParams = [organization_id, title, description, location, date];
    const result = await db.query(query, queryParams);

    if (result.rows.length === 0) {
        throw new Error('Failed to create project');
    }

    if (process.env.ENABLE_SQL_LOGGING === 'true') {
        console.log('Created new project with ID:', result.rows[0].project_id);
    }

    return result.rows[0].project_id;
}

async function updateProject(organization_id, title, description, location, date, projectId) {
    const query = `
        UPDATE services
        SET organization_id = $1, title = $2, description = $3, project_location = $4, project_date = $5
        WHERE project_id = $6
        RETURNING project_id;
    `;

    const queryParams = [organization_id, title, description, location, date, projectId];
    const result = await db.query(query, queryParams);

    if (result.rows.length === 0) {
        throw new Error('Project not found');
    }

    if (process.env.ENABLE_SQL_LOGGING === 'true') {
        console.log('Updated project with ID:', projectId);
    }
    return result.rows[0].project_id;
}

export {
    getAllProjects,
    getProjectsByOrganizationId,
    getUpcomingProjects,
    getProjectDetails,
    createProject,
    updateProject
};