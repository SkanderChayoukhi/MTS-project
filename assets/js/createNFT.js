let web3;
let account = '';
let NTFtokenAddress = "0x9cC87f956859484F6B36be42A113fa5574448563"
let CurrencytokenAddress = "0xf2F855Eee4Def023EAcf3ceacA50E898bb072bC3";
let totalSupplyInt = 0;

window.addEventListener('load', async () => {
    if (typeof window.ethereum !== 'undefined') {
        console.log('MetaMask is installed!');
        web3 = new Web3(window.ethereum);
        connectMetaMask(); // Call connectMetaMask on page load
    } else {
        console.log('You have to install MetaMask');
    }
});
const createNFT = document.querySelector('#createNFT');
const connectBtn = document.querySelector("#connectBtn");
const showAccount = document.querySelector('.showAccount');
const s = document.querySelector('#status');
const addressSpan = document.querySelector("#address");



connectBtn.addEventListener('click', () => {
    connectMetaMask();
});

function connectMetaMask() {
    ethereum.request({ method: 'eth_requestAccounts' }).then(accounts => {
        account = accounts[0];
        addressSpan.textContent = account;
        connectBtn.disabled = true; // Disable the connect button after successful connection
    }).catch(error => {
        console.error(error);
    });
}
createNFT.addEventListener('click', () => {
    send();
})

async function send() {
    let name = document.getElementsByName('name')[0].value;
    let price = document.getElementsByName('price')[0].value;
    let theme = document.getElementsByName('theme')[0].value;
    let image = document.getElementsByName('image_upload')[0].value;
    let description = document.getElementById('message').value;

    let obj = {
        name: name,
        price: price,
        theme: theme,
        image: image,
        description: description,
        account: account,
    };

    // Convert the object to a JSON string
    let uri = JSON.stringify(obj);
    let minABI = [{
        "inputs": [{
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "uri",
                "type": "string"
            }
        ],
        "name": "safeMint",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }];

    // Update the contract address if needed
    let contract = new web3.eth.Contract(minABI, NTFtokenAddress, { from: account });

    // Display the "Creating" message
    s.innerHTML = "Creating";

    try {
        // Call the safeMint function with the provided URI
        let data = await contract.methods.safeMint(account, uri).send();
        console.log(data);
        // Display the "Done!" message
        s.innerHTML = "Done!";
    } catch (error) {
        // Handle errors, e.g., display an error message
        console.error(error);
        s.innerHTML = "Error: " + error.message;
    }
}


