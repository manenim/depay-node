import { verify } from '@depay/js-verify-signature';

// ENTER YOUR PUBLIC KEY HERE, FORMAT: "-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA5P24ZAKJRkINGTroqKTD\nDLOIXtL1SK9uz6rTFjHBcQdD4zZIlrCIDqxvn1kUelbfR22iEj5RnoN1LRqil3zc\nQDWD03SLxEYHdrJ3zBwN9qJ9mBeEURdmcZOvVLoXug6yRapAqS457AXhAWsacX6j\n06cpN/wLazAZe31uZOb/3xphfe7+C+6NNFzZPi6a2Dt2eSOrRtK/JD6b04RomJKk\n21ptGCxG78kMZMv5m4qqMIP8slBxTzAiTCYNUXimNzAlI793aT2X2NOEaxAKhohT\nbSGJP2xJDvwB2ZuW+WkVPs5Q+uVo0imhlHpH/h7dP1J7JFZQY50HNjhutu3xY5Xm\niQIDAQAB\n-----END PUBLIC KEY-----"
// const publicKey =  undefined;
const publicKey = "-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAy8ByBeAUfui3YHLzUf/FxePli5Ih3OlZi1wxzdRC7t1I4+D6V+y7Z3uKudyxxvYpcaEYtrf466w+KgJaXO2toYypLQ9l4AqDYW27omPjukQKXCeI3dLg87zg4VgeWQizzQpg+l2RFSv5ND7VSBhpSJatgJvb8R0bkqgLHtfyemn3Sf0CZkTg7nLBoDyy97SoKRRtIDFgzJODfTHq+PykdaxcR/XQ/ugts5B4dmWfC/qAk20yZnUsWhSBCY+0N7t07YJZvM/RNoQIdiPcLLRVX8CxtLnI/jgEmr72CLXVXI9X0pa/4jvkuliRQq1UJy2H5NXGfJ2xTIdc41QAXW0UcQIDAQAB\n-----END PUBLIC KEY-----"
export default async(req)=> {
  
  return await verify({
    signature: req.headers['x-signature'],
    data: JSON.stringify(req.body),
    publicKey,
  });  
}