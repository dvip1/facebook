const ejs= require('ejs');
const express= require('express');
const bodyParser= require('body-parser');
const app = express();
const port= 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.get('/', (req, res)=>{
    res.render("index");
})
app.post('/',(req, res)=>{
	let name1= req.body.first_name;
	let name2= req.body.last_name;
	res.render('login', {Name:name1, LastName:name2});
})
app.listen(port, ()=>{
	console.log('app is litening on port ' + port) ;
})
