import db from './db.js'

const getAllOrganizations = async () => {
  const query = `
      SELECT organization_id, name, description, email, logo_file
      FROM public.organization;
    `;

  const result = await db.query(query);

  return result.rows;
}

export { getAllOrganizations };