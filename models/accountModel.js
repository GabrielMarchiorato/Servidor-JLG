const mongoose = require('mongoose');
const accountSchema = require('./schemas/accountSchema')
module.exports = mongoose.model('plano', accountSchema);