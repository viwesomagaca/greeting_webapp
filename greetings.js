module.exports = function(models) {

    var NameModel = models.Name

    const namesGreeted = [];

    const index = function(req, res) {
        res.render('greetings/add', {
            names: namesGreeted
        });
    };


    const greeted = function(req, res, done) {
        models.Name.find({}, function(err, allNames) {
            if (err) {
                return done(err)
            }

            var namesG = {
                names: allNames
            }

            res.render('greetings/namesgreeted', namesG)

        })

    }


    const add = function(req, res, done) {
        //var name = req.body.names;
        var grt = '';
        var dbnames = req.body.names;
        var language = req.body.language;
        var firstLetter = req.body.names.substring(0,1);
        var caps = req.body.names.substring(0,1).toUpperCase();
        var users = {
            dbnames: req.body.names.replace(firstLetter,caps)
        }

        if (!users || !users.dbnames) {
            req.flash('error', 'Please type in your name.');
           res.render('greetings/add');
       }else if(users && !language){
           req.flash('error','Please select a Langauage');
           res.render('greetings/add');
       }
        else {

            models.Name.findOne({dbnames:req.body.names.replace(firstLetter,caps)}, function(err, foundName) {
                if (err){
                    return done(err);
                }

                if (foundName) {

                    foundName.NamesGreetedCounter = foundName.NamesGreetedCounter + 1;


                    if (language == 'Afrikaans') {
                        grt = 'Halo, ' + foundName.dbnames;

                    }
                    if (language == 'English') {
                        grt = 'Hello, ' + foundName.dbnames;

                    }
                    if (language == 'Isixhosa') {
                        grt = 'Molo, ' + foundName.dbnames;
                    }

                    foundName.save(function(err, name) {
                        if (err) {
                            return done(err);

                        }
                    })

                    models.Name.find({}, function(err, greetedCounter) {
                        if (err) {
                            return done(err);
                        }

                        var message = "";

                        message = greetedCounter.length + " name(s) have been greeted for this Session."

                        res.render('greetings/add', {
                            language: grt,
                            message: message
                        })
                    })
                }

                if (foundName === null) {
                    models.Name.create({
                        dbnames:req.body.names.replace(firstLetter,caps),
                        NamesGreetedCounter: 1
                    }, function(err, name) {
                        if (err) {
                            return done(err);
                        }


                        models.Name.findOne({
                            dbnames:req.body.names.replace(firstLetter,caps)
                        }, function(err, foundName) {
                            if (err) {
                                return done(err)
                            }
                            var grt = '';

                            if (language == 'Afrikaans') {
                                grt = 'Halo, ' + foundName.dbnames;
                            }
                            if (language == 'English') {
                                grt = 'Hello, ' + foundName.dbnames;
                            }
                            if (language == 'Isixhosa') {
                                grt = 'Molo, ' + foundName.dbnames;
                            }


                            models.Name.find({}, function(err, greetedCounter) {
                                if (err) {
                                    return done(err)
                                }
                                var message = "";

                                message = greetedCounter.length + " Names has been greeted for ths Session."

                                res.render('greetings/add', {
                                    language: grt,
                                    message: message
                                })
                            })

                        })
                    })
                }

            })

        }
    }

    const counter = function(req, res, done) {
        var user = req.params.user_id;

        models.Name.findOne({
            _id: user
        }, function(err, count) {
            if (err) {
                return done(err);
            }

            if (count) {
                var uniqueCounter = count.dbnames + " has been greeted " + count.NamesGreetedCounter + " time(s). "
            }
            res.render('greetings/counter', {
                uniqueCounter: uniqueCounter
            })
        })

    }

    const clearButton = function(req, res, next){
        var clear = req.body.clearButton
        models.Name.remove({}, function(err){
            if(err){
                return next(err);
            }
            res.render('greetings/add')
        })
    }


    return {
        index,
        add,
        greeted,
        counter,
        clearButton
    }
}
