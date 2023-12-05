const joi = require ('joi')
const validation = requires  ('../../middleware/validation.js')

 const addCategoryVal = {
    body: joi.object().required().keys({
        name: validation.generalFields.name,
    }),
    file: validation.generalFields.file.required(),
    params: joi.object().required().keys({}),
    query: joi.object().required().keys({})
}
module.exports = addCategoryVal