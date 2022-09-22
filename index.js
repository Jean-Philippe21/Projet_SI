const  express = require('express');
const  bodyParser = require('body-parser');

//const	cors = require('cors');
const  app = express();
const  db = require('./queries');
const  port = 3000;
const  host = '192.168.137.235';

const  fs = require('fs');

const  http = require('http');




/*const corsOptions = {
	origin: (origin, callback) => {
		if(allowedOrigins.includes(origin) || !origin){
			callback(null, true);
		}else{
			callback(new Error('Origin not allowed by CORS'));
		}
	}
}
*/
app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true,
	})

);
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin','*');
	res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With,Content, Accept, Content-Type, Authorization');
	res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, DELETE, PATCH, OPTIONS');
	next();
});
//app.options('*',cors(corsOptions));

app.get('/',(request, response) => {
	response.json({ info: 'Node.js, Express, and  API' });
});

/*
const  key = fs.readFileSync('/etc/letsencrypt/live/avossevou.eu/privkey.pem');
const  cert = fs.readFileSync('/etc/letsencrypt/live/avossevou.eu/fullchain.pem');*/

//const  server = https.createServer({key : key,cert : cert }, app);

const server = http.createServer(app);

//app.get('/users/:id', db.getUsersPublication);

app.post('/users/', db.createUser);

app.get('/info/:Nom_User',db.recupInfo);//juste un test

app.post('/users/update/user/data/',db.modificationClient);//mettre a jour les donnees dans la table client

app.get('/info/all/info/client/:id_client',db.recupAllInfoClient);//recuperé touttes les informations sur un client

app.post('/users/modif/commande/',db.modifCommande);



server.listen(port, () => {
	console.log(`App running on port ${port}.`);
});
