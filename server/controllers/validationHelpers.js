const { validationResult } = require('express-validator/check');

module.exports = {
    Error(location, param, value, msg) {
        return [ {
            location: location,
            param: param,
            value: value,
            msg: msg
        }];
    },

    validate(req, res, redirectTemplate) {
        return new Promise(function (resolve, reject) {
            const errors = validationResult(req);
            if (!errors.isEmpty())
                reject(res.render(redirectTemplate, {
                    errors: errors.array()
                }));
            else
                resolve();
        });
    },
}
