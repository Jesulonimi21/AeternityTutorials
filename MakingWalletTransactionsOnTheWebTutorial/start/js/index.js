

let bobSecretKey='f22811807eed1f2ae5b871e8dab4f5d879c708f0d0f0e4345b4eae799933d391fc4860560cec170d9e8866d889d54962ec9779bf57f7684a7a4cd0e1b28cef72';
let bobPublicKey='ak_2v7Dxo7cjwfgto3inBw9RBw7n2QXDavym4da5Ss3HMDEaDf3v9';
let alicePublicKey='ak_8mF1W1LRCXJgUMf75YDD7rFEo3mZL4PFHAbKBYsieVouP2NC9';
let bobClient=null;
let bobKeyPairObj= null;
function generateAccountWithExistingKeyPair(secretKey){
 
    }

async function generateAccountWithoutKeyPair(){
 
}
async function getSdkInstance(secretKey,publicKey){
 
}

async function getAccountBalance( publicKey,sdkInstance){
  
}

async function sendAeToAccount(publicAddress,amount,client){

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