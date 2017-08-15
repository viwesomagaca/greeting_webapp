// var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/greetingwebapp',{
//     useMongoClient: true
// });
//
//
// const dataNames = mongoose.model('dataNames',{
//     names : String,
//     counter : Number
//
// });


var mongoose = require('mongoose');
module.exports = function(mongoUrl){
mongoose.connect(mongoUrl);

const Name = mongoose.model('Name',{
    dbnames:String
    //counter : Number
});

return {
    Name
};
}
