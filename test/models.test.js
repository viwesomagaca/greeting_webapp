const assert = require('assert')
 const Models = require('../models');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/namesGreeted');

    beforeEach(function(done){
        models.names.remove({}, function(err){
            if(err){
            done(err);
            }
        })
   })

const namesGreeted = mongoose.model('name', {
    name: String
});

describe('models should be able to', function() {

    it('store names to MongoBD', function(done) {

    //var models = Models('mongodb://localhost/namesGreeted');

        var name = new namesGreeted({
            name : names
        });

        name.save().then(function() {
            assert(name.isNew === false);
            done();
        });


    });

    it('should not duplicate vulues', function(done){

      var name = new namesGreeted({
          name: names
      });


        name.save().then(function(err) {
          assert.ok(err, 'should give error for duplicate values')
          done()
        });


      })
    })
