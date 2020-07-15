# Tutorials How to make wallet transactions on the Web with aepp-sdk-js

## Tutorial Overview
This tutorial is mend for web developers who want to begin to build interesting applications on the aeternity blockchain.
In this tutorial we will cover the following:
- Wallet Creation
- Checking Wallet Balance
- Token transfer
- Connecting to a Smart Contract Instance

## Prerequisites
- A familiarity with the javascript programming language
- Basic understanding of some blockchain terminologies

## Setup And Configuration
Create a new folder and create an index.html file in it then include the cdn link for the javascript sdk, i will be using version 7.3.1 of the aeternity javascript sdk in this tutorial, also add a link to the Node.js Buffer for web cdn like it is done below

```html
<html>
    <head>
        <script src="https://unpkg.com/@aeternity/aepp-sdk@7.3.1/dist/aepp-sdk.browser-script.js"></script>
        <script src="https://bundle.run/buffer@5.6.0"></script>
    </head>
</html>
```
Lastly, create an index.js file in the same directory and include it in your index.html file just after the links to the buffer.This is the file where we will be doing most of our work in, your index.html file should look like this after
```html
full head of the index.html file
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Wallet Web Tutorial</title>
        <script src="https://unpkg.com/@aeternity/aepp-sdk@7.3.1/dist/aepp-sdk.browser-script.js"></script>
        <script src="https://bundle.run/buffer@5.6.0"></script>
        <script src="./index.js"></script>
    </head>
    <body>
        
    </body>
</html>
```
With the above done, we are set to start doing wonders with the aeternity javascript sdk
 # Wallet creation
 Creating an Aeternity wallet with the javascript sdk is extremely simple since we only need one module from the sdk to do this, which is the `Crypto` module,to have access to a wallet, we need to create a KeyPair(An object containing a private Key and a public key). We will go over two ways to create this and they are:
 - KeyPair creation with an existing private key
 - New KeyPair cereation without a private key
 
 ## KeyPair Creation with an existing private key
 Lets see how this is done, write the following code in the `index.js` file created earlier:
 ```javascript
 function generateKeyPairWithiExistingPrivateKey(secretKey){
    const hexBuffer = Ae.Crypto.hexStringToByte(secretKey);   
      const keyPair =  Ae.Crypto.generateKeyPairFromSecret(hexBuffer)   
      const publicKey=Ae.Crypto.aeEncodeKey(keyPair.publicKey);
      const secretKey=buffer.Buffer.from(keyPair.secretKey).toString('hex')
      return{publicKey:publicKey,privateKey:secretKey};
    }
 ```
 What we do above is pretty simple, the function above expects a private key as a string and then converts it to an ArrayBuffer using the `hexStringToByte` function in the crypto module of the aepp-js-sdk. We further access  the `generateKeyPairFromSecret` function in the crypto module of the aeternity javascript sdk, this function then returns a KeyPair object containing both the secret key and private key as an ArrayBuffer of view UInt8Array. The next step is to retrieve the private key and public key from their respective ArrayBuffers, we do this using the `aencodeKey` function of the `Crypto` module and the `from` method of the Buffer module to get the private key and public Key as strings. So now that you know how to get a public Key from an existing private key. lets go over creating a KeyPair from a brand new public key and private key.
 
 ## New KeyPair Creation Without Existing Public Key
 ```javascript
 function generateKeyPairWithoutSecretKey(){
    let { secretKey, publicKey } = Ae.Crypto.generateKeyPair(true);
    console.log(secretKey);
    console.log(publicKey);
    let translatedPublicKey=Ae.Crypto.aeEncodeKey(publicKey);
    let translatedSecretKey=buffer.Buffer.from(secretKey).toString('hex');
    return {publicKey:translatedPublicKey,privateKey:translatedSecretKey};
}
 ```
 The function abpve simply creates a brand new KeyPair, we do this by accessing the `generateKeyPair` method of the  `Crypto` module of the aepp-js-sdk. Then we repeat the same steps we did earlier to get the string version of our secret key and public key.
 Voilà, we now know how to create a wallet on the Aeternity Blockchain.  Lets Quickly get into checking the bank account of this wallet.
 
 
 
 
