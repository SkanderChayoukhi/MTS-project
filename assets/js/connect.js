let web3;
let account = '';

window.addEventListener('load', async () => {
    if (typeof window.ethereum !== 'undefined') {
        console.log('MetaMask is installed!');
        web3 = new Web3(window.ethereum);
        connectMetaMask(); // Call connectMetaMask on page load
    } else {
        console.log('You have to install MetaMask');
    }
});

const connectBtn = document.querySelector("#connectBtn");
const addressSpan = document.querySelector("#address");
const actionBtn = document.querySelector("#actionBtn");


connectBtn.addEventListener('click', () => {
    connectMetaMask();
});

function connectMetaMask() {
    ethereum.request({ method: 'eth_requestAccounts' }).then(accounts => {
        account = accounts[0];
        addressSpan.textContent = account;
        connectBtn.disabled = true; // Disable the connect button after successful connection
        actionBtn.disabled = false; // Enable the action button after successful connection
    }).catch(error => {
        console.error(error);
    });
}

function performAction() {
    // Prevent default form submission behavior
    event.preventDefault();

    // Add your logic for the action you want to perform
    
    
    // Redirect to contact.html
    window.location.href = 'contact.html';
}
