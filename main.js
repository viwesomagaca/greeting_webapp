const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())



const GreetingRoutes = require("./greetings");
const greetingRoutes = GreetingRoutes();

app.engine('handlebars',exphbs({defaultLayout : 'main'}) );
app.set('view engine', 'handlebars');

app.use(session({secret:'keyboard cat', cookie: { maxAge: 60000 *30 }}));
app.use(flash());

app.get("/", function(req,res){
   res.send("Greeting Web Form");
});

// app.get("/greetings/index" , greetingRoutes.index);
// app.post("/greetings/index" ,greetingRoutes.index);

// app.post("/greetings" , greetingRoutes.redirection);
app.get("/greetings" ,greetingRoutes.add);
app.get("/greetings/add",greetingRoutes.index);
app.post("/greetings/add" ,greetingRoutes.index);
app.post("/greetings" , greetingRoutes.add);

// parse application/x-www-form-urlencoded

// parse application/json


const port = process.env.PORT||3003;

app.listen(port, function(){
    console.log("Greeting webform started on port:" + port);
})