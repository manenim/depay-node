

export const configuration = async (req, res) => {
     if(!await verifyRequest(req)){
        return res.status(401).json({ error: "UNAUTHORIZED" });
        }

    console.log('hello')

    const price = 1.00;

    const configuration = {
        accept: [
        { blockchain: 'ethereum', token: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', amount: price*req.body.quantity || 0.0001 }
        ]
    };

  // If you need to dynamically set a redirect location after a successfull payment, set forward_to
  //
  // configuration.forward_to = "https://mydomain.com/payment/confirmation/SOMEID"
  //

  res.setHeader('x-signature', signResponse(JSON.stringify(configuration)));
  res.status(200).json(configuration);
}

export const callback = async (req, res) => {
    if(!await verifyRequest(req)){
    return res.status(401).json({ error: "UNAUTHORIZED" });
  }

  // Do whatever you need to do after a succesfull payment
  //
  // req.body:
  //
  // {
  //   "blockchain": "polygon",
  //   "transaction": "0x053279fcb2f52fd66a9367416910c0bf88ae848dca769231098c4d9e240fcf56",
  //   "sender": "0x317D875cA3B9f8d14f960486C0d1D1913be74e90",
  //   "receiver": "0x08B277154218CCF3380CAE48d630DA13462E3950",
  //   "token": "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
  //   "amount": "0.0985",
  //   "payload": null,
  //   "after_block": "46934392",
  //   "commitment": "confirmed",
  //   "confirmations": 1,
  //   "created_at": "2023-08-30T11:37:30.157555Z",
  //   "confirmed_at": "2023-08-30T11:37:35.492041Z"
  // }

  const responseData = {};

  // If you need to dynamically set a redirect location:
  //
  // responseData.forward_to = "https://mydomain.com/payment/confirmation/SOMEID"
  //

  res.setHeader('x-signature', getResponseSignature(JSON.stringify(responseData)));
  res.status(200).json(responseData);
}