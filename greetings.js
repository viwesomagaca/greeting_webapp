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
        var name = req.body.names;
        var language = req.body.language;

        var data = {
            name: req.body.names
        }

        if (!data || !data.name) {
            req.flash('error', 'Please select name.');
            res.render('add');
        }

        if (data || data.names !== undefined) {

            models.Name.findOne({
                name: req.body.names
            }, function(err, result) {
                if (err) {
                    return done(err)
                }

                // if (result === null) {
                models.Name.create({
                    dbnames: req.body.names
                }, function(err, name) {
                    if (err) {
                        return done(err)
                    }
                    var newName = name.dbnames;


                    models.Name.findOne({
                        dbnames: req.body.names
                    }, function(err, result) {
                        if (err) {
                            return done(err)
                        }
                        var grt = '';

                        if (language == 'Afrikaans') {
                            grt = 'Halo, ' + result.dbnames;

                        }
                        if (language == 'English') {
                            grt = 'Hello, ' + result.dbnames;

                        }
                        if (language == 'Isixhosa') {
                            grt = 'Molo, ' + result.dbnames;

                        }



                        res.render('greetings/add', {
                            language: grt
                        })

                    })
                })

                // res.render('greetings/add')

                // }

            })

        }
    }



    return {
        index,
        add,
        greeted
    }
}
