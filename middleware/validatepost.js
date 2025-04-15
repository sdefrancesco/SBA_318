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

        if (errors.length > 0) {
            res.locals.errors = errors;
        }

        next();
    }
};