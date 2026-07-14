// IMPORT MODELS NEEDED (none in this case)

// DEFINE CONTROLLER FUNCTIONS
const showHomePage = (req, res) => {
    const title = 'Home Page'
    res.render('home', { title });
};

// EXPORT CONTROLLER FUNCTIONS
export { showHomePage };