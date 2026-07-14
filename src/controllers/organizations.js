// IMPORT MODELS NEEDED 
import { getAllOrganizations } from "../models/organizations.js";

// DEFINE CONTROLLER FUNCTIONS
const showOrganizationsPage = async (req, res) => {
    const organizations = await getAllOrganizations();

    const title = 'Partner Organizations'
    res.render('organizations', { title, organizations });
};

// EXPORT CONTROLLER FUNCTIONS
export { showOrganizationsPage };

