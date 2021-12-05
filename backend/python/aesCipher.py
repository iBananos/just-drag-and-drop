from Crypto.Cipher import AES


class AESCipher :

    def __init__(self, key) :
        self.key = bytes.fromhex(key)

    def decrypt(self, encryptedData) :

        iv = bytes.fromhex(encryptedData.split(";")[0])
        data = bytes.fromhex(encryptedData.split(";")[1])

        dec = AES.new(key=self.key, mode=AES.MODE_CBC, IV=iv)
        value = dec.decrypt(data)

        return value.decode()