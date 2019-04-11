import cryptoJs from 'crypto-js';
// ECB模式
let DES = {};

// DES加密
DES.encryptDes = message => {
  let key = 'm$mHJAV$Q1xD$BHyE*8p8eHj5y3xYjI*!H68&K5vsQPGuxNKOR1AR^g$mXyzaenxHOk7g9X1PcJ$DYErkXhvN*3i4V';
  let keyHex = cryptoJs.enc.Utf8.parse(key);
  let option = { mode: cryptoJs.mode.ECB, padding: cryptoJs.pad.Pkcs7 };
  let encrypted = cryptoJs.DES.encrypt(message, keyHex, option);
  return encrypted.ciphertext.toString();
};

// DES解密
DES.decryptDes = message => {
  let key = 'm$mHJAV$Q1xD$BHyE*8p8eHj5y3xYjI*!H68&K5vsQPGuxNKOR1AR^g$mXyzaenxHOk7g9X1PcJ$DYErkXhvN*3i4V';
  let keyHex = cryptoJs.enc.Utf8.parse(key);
  let decrypted = cryptoJs.DES.decrypt(
    {
      ciphertext: cryptoJs.enc.Hex.parse(message)
    },
    keyHex,
    {
      mode: cryptoJs.mode.ECB,
      padding: cryptoJs.pad.Pkcs7
    }
  );
  return decrypted.toString(cryptoJs.enc.Utf8);
};
export default DES;
