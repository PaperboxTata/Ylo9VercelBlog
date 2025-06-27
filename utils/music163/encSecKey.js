import crypto from 'crypto';
import bigInt from 'big-integer';

const e = '010001';
const f = '00e0b509f6259df8642dbc35662901477df22677ec152b5ff68ace615bb7b725152b3ab17a876aea8a5aa76d2e417629ec4ee341f56135fccf695280104e0312ecbda92557c93870114af6c9d05c4f7f0c3685b7a46bee255932575cce10b424d813cfe4875d3e82047b97ddef52741d546b8e289dc6935b3ece0462db0a22b8e7';
const g = '0CoJUm6Qyw8W8jud';

function generateStr(length) {
  const str = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let res = '';
  for (let i = 0; i < length; i++) {
    const index = Math.floor(Math.random() * str.length);
    res += str.charAt(index);
  }
  return res;
}

function AESEncrypt(text, key) {
  const iv = Buffer.from('0102030405060708', 'utf-8');
  const textBuffer = Buffer.from(text, 'utf-8');
  
  const pad = 16 - (textBuffer.length % 16);
  const paddedText = Buffer.concat([
    textBuffer,
    Buffer.alloc(pad, pad)
  ]);

  const cipher = crypto.createCipheriv('aes-128-cbc', Buffer.from(key, 'utf-8'), iv);
  let encrypted = cipher.update(paddedText);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  
  return encrypted.toString('base64');
}

function RSAEncrypt(text, key, modulus) {
  const reversedText = text.split('').reverse().join('');
  
  const textHex = Buffer.from(reversedText, 'utf-8').toString('hex');
  const textBigInt = bigInt(textHex, 16);
  
  const keyBigInt = bigInt(key, 16);
  const modulusBigInt = bigInt(modulus, 16);
  const result = textBigInt.modPow(keyBigInt, modulusBigInt);
  
  return result.toString(16).padStart(256, '0');
}

export function getParams(uid) {
  const i = generateStr(16);
  const msg = JSON.stringify({
    uid: uid,
    type: "1",
    limit: "100",
    offset: "1",
    total: "true",
    csrf_token: ""
  });
  const encText = AESEncrypt(msg, g);
  const params = AESEncrypt(encText, i);
  const encSecKey = RSAEncrypt(i, e, f);

  return { params, encSecKey };
}