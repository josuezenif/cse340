import bcrypt from "bcrypt"
import {
    createNewUser,
    authenticateUser,
    getRegisteredUsers
} from '../models/users.js';

// -------------------- REGISTRATION FORM ------------------
async function showUserRegistrationForm(req, res) {
    const title = 'Registration';

    res.render('register', { title });
}

const processUserRegistrationForm = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const saltRounds = await bcrypt.genSalt(10);
        const password_hash = await bcrypt.hash(password, saltRounds);

        const user_id = await createNewUser(name, email, password_hash);

        req.flash('success', 'Successfully registrated! Please log in! 😁');
        res.redirect('/');
    }

    catch (error) {
        console.error(error);
        req.flash('error', 'There was an error with the registration. 😢 Please try again!');
        res.redirect('/register');
    }
}

// -------------------- LOGIN AND AUTHENTICATING USERS ----------------
const showLoginForm = async (req, res) => {
    const title = 'Login to account';

    res.render('login', { title });
}

async function processLoginForm(req, res) {
    const { email, password } = req.body;
    try {
        const user = await authenticateUser(email, password);
        console.log(user);

        if (user) {
            req.session.user = user;
            req.flash('sucess', 'Successfully logged in! 🤩');

            if (res.locals.NODE_ENV === 'development') {
                console.log('User logged in:', user);
            }

            res.redirect('/dashboard');
        }

        else {
            req.flash('error', 'Invalid email or password! Try again! 😖');
            res.redirect('/login');
        }
    }

    catch (error) {
        console.error('These was an error logging you in!', error);
        req.flash('error', 'Please type in your valid email address and password! 🙄');
        res.redirect('/login');
    }

}

async function processLogout(req, res) {
    if (req.session.user) {
        delete req.session.user;
    }

    req.flash('success', 'Successfully logged out! 😝');
    res.redirect('/login');
}

// --------------------- REQUIRE LOGIN FUNCTION ----------------
async function requireLogin(req, res, next) {
    if (!req.session || !req.session.user) {
        req.flash('error', 'You must be logged in to access that page.');
        return res.redirect('/login');
    }

    next();
}

// --------------------------- DASHBOARD -------------------------
async function showDashboard(req, res) {
    const user = req.session.user;
    const title = 'My account';

    res.render('dashboard', {
        title,
        name: user.name,
        email: user.email
    });
}

// --------------- REQUIRE ROLE (admin) FUNCTION MIDDLEWARE ------------
function requireRole(role) {
    return (req, res, next) => {
        if (!req.session || !req.session.user) {
            req.flash('error', 'You must be logged in first!');
            return res.redirect('/');
        }

        if (req.session.user.role_name !== role) {
            req.flash('error', 'You do not have the required role!')
            return res.redirect('/');
        }

        next();
    }

}

// -------------------------- DISPLAYING ALL USERS TO ADMIN ACCOUNTS ----------------
async function allUsersPage(req, res) {
    const title = 'All Accounts Registered';

    const users = await getRegisteredUsers();

    res.render('allUsers', { title, users });
}

export {
    showUserRegistrationForm,
    processUserRegistrationForm,
    showLoginForm,
    processLoginForm,
    processLogout,
    requireLogin,
    showDashboard,
    requireRole,
    allUsersPage
};