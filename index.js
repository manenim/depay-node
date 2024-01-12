// import express from 'express'
// import depayRoute from './src/routes/depay.js'

// const app = express()
// app.use(express.json())

// app.get('/', (req, res) => {
//     return res.send('tested hello world')
// })


// app.use('/depay', depayRoute)




// app.listen(5001, (() => 'server running at port 5001'))






// const { Buffer } = require("node:buffer");

import { Buffer } from "node:buffer";
import crypto from 'node:crypto';
import express from 'express';
import { verify } from '@depay/js-verify-signature';

const app = express();
const port = 5001;
app.use(express.json());

//
// THE FOLLOWING PLACEHOLDERS NEED TO BE CONFIGURED!

// Identifies your integration
// const integrationId = "SET_YOUR_INTEGRATION_ID";
const integrationId = "3a1a3121-fee0-47ef-9845-89d5c75f611a";

// Used to verify communication from DePay APIs to your integration
// Provided by app.depay.com
// ENTER YOUR PUBLIC KEY HERE, FORMAT: "-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA5P24ZAKJRkINGTroqKTD\nDLOIXtL1SK9uz6rTFjHBcQdD4zZIlrCIDqxvn1kUelbfR22iEj5RnoN1LRqil3zc\nQDWD03SLxEYHdrJ3zBwN9qJ9mBeEURdmcZOvVLoXug6yRapAqS457AXhAWsacX6j\n06cpN/wLazAZe31uZOb/3xphfe7+C+6NNFzZPi6a2Dt2eSOrRtK/JD6b04RomJKk\n21ptGCxG78kMZMv5m4qqMIP8slBxTzAiTCYNUXimNzAlI793aT2X2NOEaxAKhohT\nbSGJP2xJDvwB2ZuW+WkVPs5Q+uVo0imhlHpH/h7dP1J7JFZQY50HNjhutu3xY5Xm\niQIDAQAB\n-----END PUBLIC KEY-----"
// const publicKey =  undefined;
const publicKey = "-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAy8ByBeAUfui3YHLzUf/FxePli5Ih3OlZi1wxzdRC7t1I4+D6V+y7Z3uKudyxxvYpcaEYtrf466w+KgJaXO2toYypLQ9l4AqDYW27omPjukQKXCeI3dLg87zg4VgeWQizzQpg+l2RFSv5ND7VSBhpSJatgJvb8R0bkqgLHtfyemn3Sf0CZkTg7nLBoDyy97SoKRRtIDFgzJODfTHq+PykdaxcR/XQ/ugts5B4dmWfC/qAk20yZnUsWhSBCY+0N7t07YJZvM/RNoQIdiPcLLRVX8CxtLnI/jgEmr72CLXVXI9X0pa/4jvkuliRQq1UJy2H5NXGfJ2xTIdc41QAXW0UcQIDAQAB\n-----END PUBLIC KEY-----"



// Used to sign & authenticate communication from your integration to DePay APIs
// Create and provide as documented here: https://depay.com/docs/payments/integrate/widget#create-privatepublic-key
// const privateKey:any = process.env.MY_PRIVATE_KEY ? crypto.createPrivateKey(process.env.MY_PRIVATE_KEY.replace(/\\n/g, '\n')) : undefined;
const privateKey = "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDLwHIF4BR+6LdgcvNR/8XF4+WLkiHc6VmLXDHN1ELu3Ujj4PpX7Ltne4q53LHG9ilxoRi2t/jrrD4qAlpc7a2hjKktD2XgCoNhbbuiY+O6RApcJ4jd0uDzvODhWB5ZCLPNCmD6XZEVK/k0PtVIGGlIlq2Am9vxHRuSqAse1/J6afdJ/QJmRODucsGgPLL3tKgpFG0gMWDMk4N9Mer4/KR1rFxH9dD+6C2zkHh2ZZ8L+oCTbTJmdSxaFIEJj7Q3u3Ttglm8z9E2hAh2I9wstFVfwLG0ucj+OASavvYItdVcj1fSlr/iO+S6WJFCrVQnLYfk1cZ8nbFMh1zjVABdbRRxAgMBAAECggEAFzPh/Y+gNeLm0xR0Eg/y+Tnzz3pDjJvZkc2yHD2Xpl+hEoDxxqZ+TDwHjGqN/NmBLF/156+OqLk+K7GF5ymSiXWdDwppsGLyGtu7WjRO4CIpyIcgsRt3zjnhpWJ6s5U9SH8Yk8T+UG9oBc5BTTWpHlY5CY7LiVXREy6QyaE6NedRjsTxrdPd1Ldhnmkovh+F3GjznBBkXmyVF0IiDj5LXSrULaPyz1r8vF4q1H6e+8ZOojaCcbdjfa/kXFFEGZb9MgvKcI1N9oNAO9WpKE2xWJt/7leICGYCM0j/psPefY4MatyN6qlu+XxjERvSluGoPbvgcMkogrEapjiBDb2awwKBgQDYBA9GV0Yl1nGeCQXJs9l9U2w5Wkxjvg7RTuLbBXyS1Q797hfltU9DrZeiGDC2EPIU6YZHW53ZirE1cAqSQYIY8MCOKKlKdvOtHBJFhxWJ3wPAPlmMQLvlFDbaN6w/00rHPmYtiTRc9MszSFNCj1HOIrfDJckr8cQ5V3+VGOzrZwKBgQDxdz+0y1+KzjDuy8FcAZ2wB+Al1aOSUlFIZ8Sh4v01pUXtWb4SUu27z/Yh1ntcallxzZIrj96DlyMOz0obmpENsrBAFxPpUh3fMwOWf+HMYPOIf6ZvOS/oKe1aQneQZjXGosfIFeZ1cK1bgKz8jDotV4at0blw4DQoQ1PhevXyZwKBgQCBxTaT8Fww4PoSkaMLgGMY+iPa9JdNmGD4dyaro0kqQJqoDAAJPHno04FznIqu5dE4pO3JMo3KoZpB2xROttH8P629+UlydbF//owvfq5+zB5JwGs1abI3NYSaZbWyBjI3LhJeKr3tVhY4satrIgRoDM1OjAWlw7E5LYp0vKuf4wKBgQCPGHJCfDt0kNjiyxEdqz99sE0fXsn+zpWo6QXYQiJ4hic4j3Rae5azNHzSdL7Kd6PmE0NKWYouRYTbI/DxBtprWbelY4fDP4zAVwULTWHMsq/f9nX1d9hyJ1anpLgidM/tlU37vy7B7jJuBYV+bMOVV0dS/vR8dgGy0qOE/k9+hQKBgQDSHIHZs1HgYWdCM/4xHvADpVj5kkwWBM6mQWMxgdNlxD3LzKQN0pNwv96T+crL45TISyEpCGiJS0YOY2Xi/7O41uO8Pzse+YM5xaf9UN590WjqDr9AJNlr0TI8/RjxoblhLtyEeXbbPruzmw5C2KrOZWdCt5MLhyPVVNwHts8Zng==\n-----END PRIVATE KEY-----"



// app.get('/', (req: Request, res: Response)=>{

//   const payload = {
//     itemId: 1,
//     quantity: 2,
//     userId: '123'
//   };

//   res.send(`\
//   <html>\
//     <head>\
//       <script defer async src="https://integrate.depay.com/buttons/v12.js"></script>\
//     <head>\
//     </head>\
//     <body style="text-align: center; padding-top: 5rem;">\
//       <div
//         class="DePayButton"
//         label="Pay"
//         integration="${integrationId}"
//         payload='${JSON.stringify(payload).replace(/"/g, '&quot;')}'
//         blockchains='["ethereum","bsc","polygon","solana","gnosis","fantom","avalanche","arbitrum","optimism","base"]'
//       ></div>
//       <script src="https://integrate.depay.com/buttons/v12.js"></script>
//       <noscript><a href="https://depay.com">Web3 Payments</a> are only supported with JavaScript enabled.</noscript>
//       <script>DePayButtons.init({document: document});</script>
//     </body>\
//   </html>\
//   `);
// });

const verifyRequest = async (req) => {
    
    console.log("hello", req.headers['x-signature'], req.body)
  
  return await verify({
    signature: req.headers['x-signature'],
    data: req.body,
    publicKey,
  });
}

const getResponseSignature = (responseString)=>{

  const signature = crypto.sign('sha256', Buffer.from(responseString), {
    key: privateKey,
    padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
    saltLength: 64,
  });

  const urlSafeBase64Signature = signature.toString('base64')
    .replace('+', '-')
    .replace('/', '_')
    .replace(/=+$/, '');

  return urlSafeBase64Signature;
}

app.post('/depay/configuration', async(req, res)=>{

//   if(!await verifyRequest(req)){
//     return res.status(401).json({ error: "UNAUTHORIZED" });
//   };

  const price = 1.00;

    const configuration = {
//       amount: {
//     "currency": currency || "GBP",
//     "fix": req.body.quantity || 100
//   },
    accept: [
      { blockchain: 'polygon', token: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174', receiver: '0xA04FED1cab1008F7cA4E83D43B52cd561a10db57', amount: 0.000001 }
    ]
  };

  // If you need to dynamically set a redirect location after a successfull payment, set forward_to
  //
  // configuration.forward_to = "https://mydomain.com/payment/confirmation/SOMEID"
  //

  res.setHeader('x-signature', getResponseSignature(JSON.stringify(configuration)));
  res.status(200).json(configuration);
});

app.post('/depay/callback', async(req, res)=>{

  if(!await verifyRequest(req)){
    return res.status(401).json({ error: "UNAUTHORIZED" });
  };

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
  res.status(200).json(responseData || 'congrats');
});

app.listen(port, ()=> {
  console.log(`[Server]: I am running at https://localhost:${port}`);
});
