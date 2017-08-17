const mongoose = require('mongoose');
module.exports = function(mongoUrl) {
    mongoose.Promise = global.Promise;
    mongoose.connect(mongoUrl);

    const Name = mongoose.model('Name', {
        dbnames: String,
        NamesGreetedCounter: Number
    })

    return {
        Name
    };
}
