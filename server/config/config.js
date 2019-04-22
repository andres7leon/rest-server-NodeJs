//  ==============================
// puerto
//  ==============================

process.env.PORT = process.env.PORT || 3000;

//  ==============================
// Entorno
//  ==============================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//  ==============================
// Vencimiento del token
//  ==============================
// 60 Segundos 
// 60 Minutos 
// 60 Horas 
// 60 Dias 

process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

//  ==============================
// SEDD de autenticación
//  ==============================

process.env.SEED = process.env.SEED || 'este-es-el-seed-de-desarrollo';


//  ==============================
// Base de datos
//  ==============================

let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;

//  ==============================
// google client id
//  ==============================

process.env.CLIENT_ID = '594052093476-go74auuei76rs17oktsv80isgk7u216t.apps.googleusercontent.com';