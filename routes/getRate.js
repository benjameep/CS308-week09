var express = require('express');
var router = express.Router();

var priceArray = {
  stamped:{
    1:0.5,
    2:0.71,
    3:0.92,
    "3.5":1.13
  },
  metered:{
    1:0.47,
    2:0.68,
    3:0.89,
    "3.5":1.10
  },
  flats:[0,1.00,1.21,1.42,1.63,1.84,2.05,2.26,2.47,2.68,2.89,3.10,3.31,3.52],
  parcels:[0,3.50,3.50,3.50,3.50,3.75,3.75,3.75,3.75,4.10,4.45,4.80,5.15,5.50]
}

function calculateRate(type,theirWeight){
  if(isNaN(theirWeight)) throw theirWeight+' is not a number'
  var prices = priceArray[type]
  if(!prices) throw 'Don\t have a price for that type'
  var keptPrice, good = false
  for(var [weight,price] of Object.entries(prices)){
    keptPrice = price
    if(weight >= theirWeight) {
      good = true
      break;
    }
  }
  if(!good) throw 'Item too heavy'
  return keptPrice
}

router.post('/', function(req, res, next) {
  try{
    var price = calculateRate(req.body.type,req.body.weight)
  } catch(e){
    var error = e
  }
  res.render('rate', {
    price:price,
    weight:req.body.weight,
    type:req.body.type,
    error:error
  });
});

module.exports = router;
