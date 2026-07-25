import db from "./db.js";
import bcrypt from 'bcrypt';

async function createNewUser(name, email, password_hash) {
    const default_role = 'user';
    const query = `
        INSERT INTO users (name, email, password_hash, role_id) VALUES
        ($1, $2, $3, (SELECT role_id FROM roles WHERE role_name = $4))
        RETURNING user_id;
    `;

    const queryParams = [name, email, password_hash, default_role];
    const result = await db.query(query, queryParams);

    if (result.rows.length === 0) {
        throw new Error('Failed to create user');
    }

    if (process.env.ENABLE_SQL_LOGGING === 'true') {
        console.log('Created new user with ID:', result.rows[0].user_id);
    }

    return result.rows[0].user_id;
}

const findUserByEmail = async (email) => {
    const query = `
        SELECT user_id, name, email, password_hash, role_name
        FROM users u
        JOIN roles r
        ON u.role_id = r.role_id
        WHERE u.email = $1;
    `;

    const queryParams = [email];
    const result = await db.query(query, queryParams);

    if (result.rows.length === 0) {
        return null; // user not found
    }

    return result.rows[0];
}

const veryifyPassword = async (password, password_hash) => {
    return bcrypt.compare(password, password_hash); // <<---------- return true or false
}

const authenticateUser = async (email, password) => {
    const user = await findUserByEmail(email);
    const userPassword = await veryifyPassword(password, user.password_hash);

    if (userPassword === true) {
        delete user.password_hash;
        return user;
    }

    else {
        return null;
    }
}

// ----------- GETTING ALL USERS REGISTERED ------------
const getRegisteredUsers = async () => {
    const query = `
        SELECT name, email, role_name
        FROM users
        JOIN roles
        ON users.role_id = roles.role_id;
    `;
    const result = await db.query(query);

    if (result.rows.length === 0) {
        throw new Error('Failed to retrieve users');
    }

    if (process.env.ENABLE_SQL_LOGGING === 'true') {
        console.log('Retrieved all users:', result.rows);
    }

    return result.rows;
}

export { createNewUser, authenticateUser, getRegisteredUsers };