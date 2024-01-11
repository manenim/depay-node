import { Buffer } from "node:buffer";
import crypto from 'node:crypto';

// MAKE SURE YOU PROVIDE YOUR PROVIDE KEY!
// Used to sign & authenticate communication from your integration to DePay APIs
// Create and provide as documented here: https://depay.com/docs/payments/integrate/widget#create-privatepublic-key
// const privateKey = process.env.MY_PRIVATE_KEY ? crypto.createPrivateKey(process.env.MY_PRIVATE_KEY.replace(/\\n/g, '\n')) : undefined;

const privateKey = "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDLwHIF4BR+6LdgcvNR/8XF4+WLkiHc6VmLXDHN1ELu3Ujj4PpX7Ltne4q53LHG9ilxoRi2t/jrrD4qAlpc7a2hjKktD2XgCoNhbbuiY+O6RApcJ4jd0uDzvODhWB5ZCLPNCmD6XZEVK/k0PtVIGGlIlq2Am9vxHRuSqAse1/J6afdJ/QJmRODucsGgPLL3tKgpFG0gMWDMk4N9Mer4/KR1rFxH9dD+6C2zkHh2ZZ8L+oCTbTJmdSxaFIEJj7Q3u3Ttglm8z9E2hAh2I9wstFVfwLG0ucj+OASavvYItdVcj1fSlr/iO+S6WJFCrVQnLYfk1cZ8nbFMh1zjVABdbRRxAgMBAAECggEAFzPh/Y+gNeLm0xR0Eg/y+Tnzz3pDjJvZkc2yHD2Xpl+hEoDxxqZ+TDwHjGqN/NmBLF/156+OqLk+K7GF5ymSiXWdDwppsGLyGtu7WjRO4CIpyIcgsRt3zjnhpWJ6s5U9SH8Yk8T+UG9oBc5BTTWpHlY5CY7LiVXREy6QyaE6NedRjsTxrdPd1Ldhnmkovh+F3GjznBBkXmyVF0IiDj5LXSrULaPyz1r8vF4q1H6e+8ZOojaCcbdjfa/kXFFEGZb9MgvKcI1N9oNAO9WpKE2xWJt/7leICGYCM0j/psPefY4MatyN6qlu+XxjERvSluGoPbvgcMkogrEapjiBDb2awwKBgQDYBA9GV0Yl1nGeCQXJs9l9U2w5Wkxjvg7RTuLbBXyS1Q797hfltU9DrZeiGDC2EPIU6YZHW53ZirE1cAqSQYIY8MCOKKlKdvOtHBJFhxWJ3wPAPlmMQLvlFDbaN6w/00rHPmYtiTRc9MszSFNCj1HOIrfDJckr8cQ5V3+VGOzrZwKBgQDxdz+0y1+KzjDuy8FcAZ2wB+Al1aOSUlFIZ8Sh4v01pUXtWb4SUu27z/Yh1ntcallxzZIrj96DlyMOz0obmpENsrBAFxPpUh3fMwOWf+HMYPOIf6ZvOS/oKe1aQneQZjXGosfIFeZ1cK1bgKz8jDotV4at0blw4DQoQ1PhevXyZwKBgQCBxTaT8Fww4PoSkaMLgGMY+iPa9JdNmGD4dyaro0kqQJqoDAAJPHno04FznIqu5dE4pO3JMo3KoZpB2xROttH8P629+UlydbF//owvfq5+zB5JwGs1abI3NYSaZbWyBjI3LhJeKr3tVhY4satrIgRoDM1OjAWlw7E5LYp0vKuf4wKBgQCPGHJCfDt0kNjiyxEdqz99sE0fXsn+zpWo6QXYQiJ4hic4j3Rae5azNHzSdL7Kd6PmE0NKWYouRYTbI/DxBtprWbelY4fDP4zAVwULTWHMsq/f9nX1d9hyJ1anpLgidM/tlU37vy7B7jJuBYV+bMOVV0dS/vR8dgGy0qOE/k9+hQKBgQDSHIHZs1HgYWdCM/4xHvADpVj5kkwWBM6mQWMxgdNlxD3LzKQN0pNwv96T+crL45TISyEpCGiJS0YOY2Xi/7O41uO8Pzse+YM5xaf9UN590WjqDr9AJNlr0TI8/RjxoblhLtyEeXbbPruzmw5C2KrOZWdCt5MLhyPVVNwHts8Zng==\n-----END PRIVATE KEY-----"


export default (responseDataAsString)=> {

  const signature = crypto.sign('sha256', Buffer.from(responseDataAsString), {
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