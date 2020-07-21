

let bobSecretKey='f22811807eed1f2ae5b871e8dab4f5d879c708f0d0f0e4345b4eae799933d391fc4860560cec170d9e8866d889d54962ec9779bf57f7684a7a4cd0e1b28cef72';
let bobPublicKey='ak_2v7Dxo7cjwfgto3inBw9RBw7n2QXDavym4da5Ss3HMDEaDf3v9';
let bobClient=null;

let generalClient=null;
let bobKeyPairObj= null;
function generateAccountWithExistingKeyPair(secretKey){
    const hexStr = Ae.Crypto.hexStringToByte(secretKey);   
      const keys =  Ae.Crypto.generateKeyPairFromSecret(hexStr)   
      console.log(keys);
      const pKey=Ae.Crypto.aeEncodeKey(keys.publicKey);
      console.log({publicKey:pKey});
      return{publicKey:pKey,privateKey:secretKey};
    }

async function generateAccountWithoutKeyPair(){
    let { secretKey, publicKey } = Ae.Crypto.generateKeyPair(true);
    console.log(secretKey);
    console.log(publicKey);
 
    let decodedPublicKey=Ae.Crypto.aeEncodeKey(publicKey);
    let decodedSecretKey=buffer.Buffer.from(secretKey).toString('hex');
  
    return {publicKey:decodedPublicKey,privateKey:decodedSecretKey};
}
async function getSdkInstance(secretKey,publicKey){
    const NODE_URL = 'https://sdk-testnet.aepps.com';
    const ACCOUNT = Ae.MemoryAccount({ keypair: { secretKey: secretKey, publicKey: publicKey } });
    const nodeInstance = await Ae.Node({ url: NODE_URL })
    const sdkInstance = await Ae.Universal({
       compilerUrl: 'https://compiler.aepps.com',
       nodes: [ { name: 'test-net', instance: nodeInstance } ],
       accounts: [ ACCOUNT ]
    });
    return sdkInstance;
}

async function getAccountBalance( publicKey,sdkInstance){
  
   
    console.log(sdkInstance);
    let height=await sdkInstance.height();
    try{
        let balance=await sdkInstance.balance(publicKey);
        console.log(balance);
        balance=parseFloat(balance)/1000000000000000000;
        return balance.toFixed(2)+ 'aettos';
    }catch(err){
         console.log(err);
         return 0;
     }   
}

async function sendAeToAccount(publicAddress,amount,client){
  
    document.getElementById('bobLoader').style.display='block';
   

  let returnValue=await client.spend(amount, publicAddress, { denomination: 'ae' });
  console.log(returnValue);
  console.log(returnValue.hash);

    document.getElementById('bobLoader').style.display='block';
    document.getElementById('bobBalance').innerText=await getAccountBalance(bobKeyPairObj.publicKey,bobClient);
    document.getElementById('bobLoader').style.display='none';

  
}



document.getElementById('bobSendButton').addEventListener('click',function(){
    let publicKey=document.getElementById('bobSendPublickey').value.trim();
    let amount=parseInt(document.getElementById('bobSendAmount').value.trim());
    sendAeToAccount(publicKey,amount,bobClient);
});

document.getElementById('bobBalance').addEventListener('click', async function(){
  if(bobKeyPairObj!==null&& bobClient!=null){
    showLoader()
    let balance=await getAccountBalance(bobKeyPairObj.publicKey,bobClient);
    initializeBalanceElement(balance)
    hideLoader()
  }

})


document.getElementById('bobPublicKey').addEventListener('click',function(){
    const el = document.createElement('textarea');
  el.value = bobKeyPairObj.publicKey;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
});




// generateAccountWithoutKeyPair()

async function initializeViews(){
   // bobKeyPairObj=   generateAccountWithExistingKeyPair(bobSecretKey);
    bobKeyPairObj= await generateAccountWithoutKeyPair();
    
     bobClient=await getSdkInstance(bobKeyPairObj.privateKey,bobKeyPairObj.publicKey);
    
    initializePublicKeyElement(bobKeyPairObj.publicKey);
    initializePrivateKeyElement(bobKeyPairObj.privateKey);


    
    let balance=await getAccountBalance(bobKeyPairObj.publicKey,bobClient);
    initializeBalanceElement(balance)
   hideLoader()
   
    
}

initializeViews();

function initializePublicKeyElement(value){
  document.getElementById('bobPublicKey').innerText=value
}

function initializePrivateKeyElement(value){
  document.getElementById('bobPrivateKey').innerText=value
}

function initializeBalanceElement(value){
  document.getElementById('bobBalance').innerText=value

}

function hideLoader(){
  document.getElementById('bobLoader').style.display='none';

}
function showLoader(){
  document.getElementById('bobLoader').style.display='block';

}