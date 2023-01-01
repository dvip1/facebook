const ejs = require('ejs');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const port = 3000;
databaseName= 'faceMashDB'
mongoose.connect('mongodb://127.0.0.1/'+ databaseName);
arr=[];
const faceMashScheme= new mongoose.Schema({
	name: String,
	password: String
});
const faceMash= mongoose.model("user", faceMashScheme);
const me= {
	name: 'Dvip',
	password: '1234'
};
faceMash.find((err, users)=>{
	if(err)console.log(err);
	else{
		if(users.length===0){
			faceMash.insertMany(me, (err)=>{
				if(err)console.log(err);
				else console.log('successfully added');
			});
		}
		else{
			console.log(users);
		}
		arr = users;
	}
})
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.get('/', (req, res) => {
	res.render("index");
})
app.get('/privacy', (req, res) => {
	res.render("privacy");
})
app.get('/aboutme', (req, res) => {
	res.render("aboutme");
})

app.post('/', async (req, res) => {
	 let form={
		name: req.body.name,
		password:req.body.password,
	 };
	 let flag=0;
	 for(let i=0; i<arr.length; i++){
		 if(arr[i].name===form.name && arr[i].password===form.password){
			 flag=1;
			 break;
		 }
	 }
	 if(flag===0){
		console.log('user not found');
		res.redirect('/');
	 }
	 else
		res.render('login', { name: form.name, email: form.email, flag: flag});

})
app.listen(port, () => {
	console.log('app is litening on port ' + port);
})
