import bcrypt from "bcrypt"
import { createNewUser } from '../models/users.js';

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

export { showUserRegistrationForm, processUserRegistrationForm };