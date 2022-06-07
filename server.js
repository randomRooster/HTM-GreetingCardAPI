var express = require('express');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var cors = require('cors');
var app = express();

// This will be a proper database later
var fakeDB = [
   {
      "name": "Lorem Ipsum",
      "bio" : "I am a teapot short and stout",
      "git": "https://www.github.com/LoremIpsum"
   },
   {
      "name": "Animi minus",
      "bio": "btw Muirhead is the best building on UoB Campus",
      "git": "https://www.github.com/Animagus"
   }];

app.get('/', function (req, res) {
   res.send('Hello World');
});

app.get('/api/0/profile/:id', function (req, res) {
   // If the profile 'does not exist', error
   console.log(req.params.id);
   if(!(parseInt(req.params.id) >= 0 && parseInt(req.params.id) < fakeDB.length)){
      res.status(404).send("profile not found");
      res.end();
      return;
   }

   // 'Query' the database, and respond with the profile
   res.json(fakeDB[req.params.id]);
});

app.put('/api/0/profile/:id', jsonParser, function (req, res) {
   // If the profile 'does not exist', error
   console.log(req.params.id);
   if(!(parseInt(req.params.id) >= 0 && parseInt(req.params.id) < fakeDB.length)){
      res.status(404).send("profile not found");
      res.end();
      return;
   }

   // Modify the profile
   console.log(req.body);
   fakeDB[parseInt(req.params.id)] = req.body;

   res.status(201).send("OK");

});

app.post('/api/0/profile/:id', jsonParser, function (req, res) {
   // If authentication fails, error
   if(req.body.auth != "3282c8027771f72b2def2520135daae5"){
      res.status(403).send("authorisation failed");
      return;
   }
   // If the profile exists, error
   console.log(req.params.id);
   if(parseInt(req.params.id) >= 0 && parseInt(req.params.id) < fakeDB.length){
      res.status(403).send("duplicate profile id");
      res.end();
      return;
   }
   
   // Add the dummy object
   let dummyObject = {
      "name": "No name",
      "bio": "No bio",
      "git": "No git"
   };
   //Ignores the id parameter but lets be real this is a PoS PoC
   fakeDB.push(dummyObject);

   res.status(201).send("Created");
   res.end();
   return;
});

app.delete('/api/0/profile/:id', jsonParser, function (req, res) {
   // If authentication fails, error
   if(req.body.auth != "3282c8027771f72b2def2520135daae5"){
      res.status(403).send("authorisation failed");
      return;
   }
   // If the profile 'does not exist', error
   console.log(req.params.id);
   if(!(parseInt(req.params.id) >= 0 && parseInt(req.params.id) < fakeDB.length)){
      res.status(404).send("profile not found");
      res.end();
      return;
   }
   
   // Delete the profile
   fakeDB[req.params.id] = {};

   res.status(200).send("OK");
   res.end();
   return;
});

var server = app.listen(8087, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})