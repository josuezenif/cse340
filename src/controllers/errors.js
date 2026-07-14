// NO MODELS NEEDED TO IMPORT 

// DEFINE CONTROLLER FUNCTION

// Test route for 500 errors
const testErrorPage = (req, res, next) => {
    const err = new Error('This is a test error');
    err.status = 500;
    next(err);
};

// EXPORT CONTROLLER FUNCTION
export { testErrorPage };