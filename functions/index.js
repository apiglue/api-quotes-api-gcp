/**
 * Responds to any HTTP request.
 *
 * @param {!Object} req HTTP request context.
 * @param {!Object} res HTTP response context.
 */
const Datastore = require('@google-cloud/datastore');

const datastore = Datastore();

function getKeyFromRequestData (requestData) {
  if (!requestData.key) {
    throw new Error('Key not provided. Make sure you have a "key" property in your request');
  }

  if (!requestData.kind) {
    throw new Error('Kind not provided. Make sure you have a "kind" property in your request');
  }

  return datastore.key([requestData.kind, requestData.key]);
}


exports.helloWorld = (req, res) => {
//  let message = req.query.message || req.body.message || 'Hello World!';
//  res.status(200).send(message);
  
const key = getKeyFromRequestData(req.body);

  return datastore.get(key)
    .then(([entity]) => {
      // The get operation will not fail for a non-existent entity, it just
      // returns an empty dictionary.
      if (!entity) {
        throw new Error(`No entity found for key ${key.path.join('/')}.`);
      }

      res.status(200).send(entity);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send(err.message);
      return Promise.reject(err);
    });
  
  
};
