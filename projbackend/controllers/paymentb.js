var braintree = require("braintree");

var gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: "872hyhy7nf3sdy8q",
  publicKey: "xpwhgwbzbc3t557s",
  privateKey: "333f59360bf63a1ad78c32a5553bfdda"
});

exports.getToken = (req,res) =>{
    gateway.clientToken.generate({}, function (err, response) {
    if (err) {
        res.status(500).json(err)
    }else{
        res.send(response)
    }  

});
}

exports.processPayment = (req,res) =>{
let nonceFromTheClient = req.body.paymentMethodNonce

let amountFromTheClient = req.body.amount

    gateway.transaction.sale({
        amount: "10.00",
        paymentMethodNonce: nonceFromTheClient,
        options: {
          submitForSettlement: true
        }
      }, function (err, result) {
        if (err) {
            res.status(500).json(err)
        }else{
            res.send(result)
        }  
      });
}