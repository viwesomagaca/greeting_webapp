module.exports = function(){

     const namesGreeted =[];

    const index = function(req, res){
        res.render('greetings', {names:namesGreeted});
    };

    // const addScreen = function(req, res) {
    //     res.render('greetings/add');
    // }

    const add = function(req, res){
    //    res.send("Enter your Name")
    //    var names = req.params.names;
       var names = req.body.names;
       var language= req.body.language;
       var greets = "";

       if(language === "English"){
       greets =  "Hello, " + names;
        }

        if(language === "Isixhosa"){
       greets = "Molo, " + names;
        }

         if(language === "Afrikaans"){
       greets = "Hallo, " + names;
        }

        var sameName = namesGreeted.find(function(currentName){
             return currentName === names;
         })

         if(!names){
             req.flash('error','field should not be blank!');
         }else
           if(names && !sameName){
               namesGreeted.push(names);
           }
           else{
             req.flash('error', 'name has already been greeted!');
         }
       if(language === undefined){
           req.flash('error','Please select a Language');
       }
         console.log(greets);
         console.log(language);


        res.render("greetings/add",{language : greets} );
    }

    return{
      index,
        add,
        // addScreen
    }
}
