/**
 * HTTP Cloud Function.
 *
 * @param {Object} req Cloud Function request context.
 * @param {Object} res Cloud Function response context.
 */

const admin = require('firebase-admin');
const functions = require('firebase-functions');

admin.initializeApp(functions.config().firebase);

var db = admin.firestore();

exports.helloHttp = (req, res) => {
db.collection('quote').get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        console.log(doc.id, '=>', doc.quote());
      });
    })
    .catch((err) => {
      console.log('Error getting documents', err);
    });

    
    res.send(`Hello ${req.body.name || 'World'}!`);
    
  };
