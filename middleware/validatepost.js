module.exports = {
    validatePost: (req, res, next) => {
        const errors = [];

        if (!req.body) {
            errors.push('Post needs a title.');
        }

        if (!req.body.title || req.body.title.length <= 3) {
            errors.push('Post title needs to be greater than 3 characters.');
        }

        if (!req.body.content || req.body.content.trim() === '') {
            errors.push('Post content cannot be empty.');
        }

        // If there are any errors, send a 400 response with the errors
        if (errors.length > 0) {
            console.log(errors)
        }

        // If no errors, proceed to the next middleware or route handler
        next();
    }
};