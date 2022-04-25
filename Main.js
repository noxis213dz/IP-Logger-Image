var express = require('express'),
  app = express(),
  qs = require('querystring'),
  cfg = require("./config.json");

app.set('view engine', 'ejs').use(express.static( "public" ))
.get('/', function(req, res) {
  res.send('Belle Cock!');
}).post('/', function(req, res) {
  res.send('Qu\'essayez-vous de faire !?');
}).get('/params/:id', function(req, res) {

  //Exemple: http://localhost:3001/params/Rytez.jpg

  let ip = req.headers['cf-connecting-ip'] || req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  console.log(`IP: ${ip.replace("::ffff:", "")}`);

  res.render('embed.ejs', { title: decodeURIComponent(qs.escape(`${req.query.title||cfg.embedDefaultTitle}`)), desc: decodeURIComponent(qs.escape(`${req.query.desc||cfg.embedDefaultDescription}`)), color: req.query.color, image: `${req.protocol + "://" + req.get('host')}/Images/${req.params["id"]}`, embedMode: cfg.embedMode, ip: ip });
}).get('/query?:id', function(req, res) {

  //Exemple: http://localhost:3001/query?id=Rytez.jpg

  let ip = req.headers['cf-connecting-ip'] || req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  console.log(`IP: ${ip.replace("::ffff:", "")}`);

  res.render('embed.ejs', { title: decodeURIComponent(qs.escape(`${req.query.title||cfg.embedDefaultTitle}`)), desc: decodeURIComponent(qs.escape(`${req.query.desc||cfg.embedDefaultDescription}`)), color: req.query.color, image: `${req.protocol + "://" + req.get('host')}/Images/${req.query["id"]}`, embedMode: cfg.embedMode, ip: ip });
}).listen(cfg.Port, () => {
  console.log(`Listening at http://localhost:${cfg.Port}\nEmbeds`)
})
