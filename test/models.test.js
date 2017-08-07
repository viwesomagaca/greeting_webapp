const assert = require('assert');
const Models = require('../models');

describe('Models should be able to', function(){

    var models = Models("mongodb://localhost/GreetingApp");

    beforeEach(function(done){
        models.Name.remove({}, function(err){
            if(err){
            done(err);
            }
        })
   })

    it('Store names to MongoDB', function(done){
        var nameData = {
            names: "Gideon"
        };

        models.Name.create(nameData, function(err){
            assert.equal(1, names.length);
            done(err);
        })
    })
})
