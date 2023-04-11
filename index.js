// j'utilise le module express
const express = require("express");
// je défini le port par defaut de l'API
const serverPort = 8000;
// je rend accessible les méthodes d'express
const app = express();

const things = [
  { id: 1, name: "Chaussettes" },
  { id: 2, name: "Ordinateur" },
  { id: 3, name: "Passion" },
];

app.get("/", (request, response) => {
  console.log("On est dans le /");
  response.send("Super ton appel, c'était cool");
});

app.get("/things", (request, response) => {
  // je transforme l'objet en sa représentation JSON
  const thingsStringified = JSON.stringify(things);
  console.log(thingsStringified);
  // je renvoi le JSON au client
  response.send(thingsStringified);
});

app.get("/things/:id", (request, response) => {
  const id = parseInt(request.params.id);
  //const id = +request.params.id;
  const thing = things.find((thing) => thing.id === id);

  // si thing est présent je renvoi le thing trouvé
  if (thing) {
    console.log("trouvé !");
    response.send(thing);
  } else {
    // sinon thing n'a pas été trouvé / vaut undefined => je renvoi une 404
    console.log("Non trouvé");
    response.status(404).send("Non trouvé !");
  }
});

// je lance le serveur
app.listen(serverPort, () => {
  console.log("Le server est demarré");
});
