const express = require('express')
const expressLayouts = require('express-ejs-layouts');
const morgan = require('morgan');
const app = express()
const port = 3000;
// gunakan ejs
app.set('view engine', 'ejs');

// Third-party Middleware
app.use(expressLayouts);
app.use(morgan('dev'));

// Built-in middleware
app.use(express.static('public'));


// application level middleware
app.use((req, res, next) => {
	console.log('Time: ', Date.now());
	next();  
});

// application level middleware
app.use((req, res, next) => {
	console.log('ini middleware ke-2');
	next();  
});


app.get('/', (req, res) => {
	const mahasiswa = [
		{
			nama: 'Laurientus Rando',
			email: 'rando@gmail.com',
		},
		{
			nama: 'Kevin Budiman',
			email: 'kevin@gmail.com',
		},
		{
			nama: 'Rangga Sastria',
			email: 'rangga@gmail.com',
		},
	];
	res.render('index', { 
		nama: 'Laurientus Rando', 
		title: 'Halaman Home',
		mahasiswa,
		layout: 'layouts/main-layout',
	});
});

app.get('/about', (req, res) => {
	res.render('about', { 
		layout: 'layouts/main-layout',
		title: 'Halaman About',
	});
});

app.get('/contact', (req, res) => {
	res.render('contact', { 
		layout: 'layouts/main-layout',
		title: 'Halaman Contactt',
	});
});

app.get('/product/:id', (req, res) => {
	res.send(`Product ID : ${req.params.id} <br> Category : ${req.query.category}`);
});

app.use((req, res) => {
	res.status(404);
	res.send('<h1>404 not found</h1>');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});