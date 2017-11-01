var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/api', function(req, res, next) {
  var path = require('path');
  var fileName = path.join(__dirname, '../emoji.json');
  const data = require(fileName)
  res.json(data);
});

router.post('/api', function(req, res, next) {
  var fs = require('fs');
  var path = require('path');
  var fileName = path.join(__dirname, '../emoji.json');

  fs.unlink(fileName, function(err){
    fs.writeFileSync(fileName, JSON.stringify(req.body));
    return res.json(req.body);
  });
  
  // fs.writeFileSync('../emoji.json', JSON.stringify(req.body));

  // fs.writeFile(fileName, JSON.stringify(req.body), 'utf8', function (err) {
  //   if (err) return console.log(err);
    // return res.json(req.body);
  // });

});

module.exports = router;
