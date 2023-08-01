const express = require('express')
const expressLayouts = require('express-ejs-layouts');
const { loadContact, findContact } = require('./utils/contacts');

const app = express()
const port = 3000;
// gunakan ejs
app.set('view engine', 'ejs');

// Third-party Middleware
app.use(expressLayouts);
// Built-in middleware
app.use(express.static('public'));

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
	const contacts = loadContact();
	
	res.render('contact', { 
		layout: 'layouts/main-layout',
		title: 'Halaman Contactt',
		contacts,
	});
});

app.get('/contact/:nama', (req, res) => {
	 const contact = findContact(req.params.nama);
	
	res.render('detail', { 
		layout: 'layouts/main-layout',
		title: 'Halaman Contactt',
		 contact,
	});
});

app.use((req, res) => {
	res.status(404);
	res.send('<h1>404 not found</h1>');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});