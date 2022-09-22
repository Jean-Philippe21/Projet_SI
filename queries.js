/*const Pool = require('pg').Pool

const pool = new Pool({
	user: 'user_conciergerie',
	host: 'machine.jessy-lebrun.fr',
	database: 'dbconciergerie',
	password: 'ensim1995',
	port: 3306
});*/

const mysql = require('mysql');

const connexion = mysql.createConnection({
	user: 'user_conciergerie',
	host: 'machine.jessy-lebrun.fr',
	database: 'dbconciergerie',
	password: 'ensim1995',
	connectTimeout: 10000
});

connexion.connect(function(err) {
	if (err) throw err;

	console.log("DB Connected!");
});


const  fs = require('fs');


const DBCall = async function(name,...parms){

	var DBParam = "";

	parms.forEach( function(elt, index) {
		if(index != 0)
			DBParam += ",";
		DBParam += "\'" + elt + "\'";

	});

	//console.log("CALL " + name + "(" + DBParam + ");");

	var ret = null;
	connexion.query("CALL " + name + "(" + DBParam + ")", (error, results) =>{
		if(error){
			console.log("error DB CALL : ", error);

		}else{
			ret = results;
			//console.log("1", ret);
		}
	});

	while(ret === null){
		await new Promise(resolve => setTimeout(resolve, 200));
	}	

	return ret[0][0];
}



//DBCall("test", "azeaze", "qsfezfzef", "fderfgdrgdr");

const createUser = (request, response)=> {

	
	/*const { Nom, Sexe, Age, Nom_User,Type_Compte, Identification_Compte, Mot_de_passe, Langue,Pays, Tel, Prenom, Mail, Adresse_postal, Theme_compte  } = request.body

	pool.query('insert into  Compte(Nom,Sexe,Age,Nom_User,Type_Compte, Identification_Compte ,Mot_de_passe, Langue,Pays) values ($1, $2, $3, $4,$5,$6,$7,$8,$9)', [Nom, Sexe, Age, Nom_User, Type_Compte ,Identification_Compte,Mot_de_passe, Langue, Pays], (error, results) => {
		if(error){
			throw error
		}

		
	})*/

		

	//On ne créer le dossier pour le compte que si celui ci est un compte pro

	/*if ((Statut_legal=='true') && (type_de_compte==1) ) {

		fs.mkdir(Identification_Compte.toString(), function(error){
			if (error) {
					console.log('échec de création du répertoire', error);
			}else{
					console.log('répertoire créé');
			}
		});
		
	}*/


}

const recupInfo = async (request, response)=> {
	
	const Nom_User = request.params.Nom_User

	console.log('Nom_User=%s',Nom_User)


	const DBReturn = await DBCall("testProc", Nom_User);
	response.status(200).send(JSON.stringify(DBReturn));
	//console.log(DBReturn);

	
}

const modificationClient = async (request, response)=>{

	const flag = request.params.Flag;

	const id_client = request.params.id_client;

	if (flag==0) {
		
		// On veut juste update l'email du client

		const email_client = request.params.email_client;

		const DBReturn = await DBCall("modifClientEmailProc", email_client,id_client);
		
		response.status(200).send(JSON.stringify(DBReturn));  
	}

	if (flag==1) {
		// On veut juste update le nom du client

		const nom_client = request.params.nom_client;

		const DBReturn = await DBCall("modifClientNomProc", nom_client,id_client);
		
		response.status(200).send(JSON.stringify(DBReturn));  
	}

	if (flag==2) {
		// On veut juste update les points fixe du client

		const points_fixe_client = request.params.points_fixe_client;

		const DBReturn = await DBCall("modifClientPointsFixeProc", points_fixe_client,id_client);
		
		response.status(200).send(JSON.stringify(DBReturn));  
	}

	if (flag==3) {
		// On veut juste update le prenom du client

		const prenom_client = request.params.prenom_client;

		const DBReturn = await DBCall("modifClientPrenomProc", prenom_client,id_client);
		
		response.status(200).send(JSON.stringify(DBReturn));  
	}

	if (flag==-1) {
		// update all information du client
		const email_client = request.params.email_client;

		const nom_client = request.params.nom_client;

		const points_fixe_client = request.params.points_fixe_client;

		const prenom_client = request.params.prenom_client;

		const DBReturn = await DBCall("modifAllinfoClientProc",email_client,nom_client,points_fixe_client,prenom_client,id_client);

		response.status(200).send(JSON.stringify(DBReturn));
	}




}



const recupAllInfoClient = async (request, response)=>{

	const id_client = request.params.id_client;

	const DBReturn = await DBCall("recupAllInfoClientProc", id_client);
		
	response.status(200).send(JSON.stringify(DBReturn)); 

}




const recupId = (request, response)=> {
	const Nom = request.params.Nom

	const Nom_User = rerequest.params.Nom_User

	console.log('Nom=%s et Nom_User=%s',Nom,Nom_User)

	pool.query('select Identification_Compte from Compte where Nom = $1 and Nom_User= $2', [Nom,Nom_User], (error, results) =>{
		if(error){
			console.log('ERREUR : ',error)

			//throw error 

		}else{
			var answer = JSON.stringify(`Recuperation de Id`)

			response.status(200).send(answer)
		}

		
	})
}



module.exports = {
	createUser,
	recupId,
	recupInfo,
	modificationClient,
	recupAllInfoClient,
	modifCommande,
}
