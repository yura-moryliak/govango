import * as cryptoJS from "crypto-js";

export class Encryption {

  static encode(query: string, encryptionKey: string): string {
    const result = cryptoJS.AES.encrypt(query, encryptionKey);
    return result.toString();
  }

  static decode(query: string, encryptionKey: string): string {
    const result = cryptoJS.AES.decrypt(query, encryptionKey);
    return result.toString(cryptoJS.enc.Utf8);
  }

}
