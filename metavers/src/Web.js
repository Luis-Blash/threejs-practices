import abi from './abi/abi.json' assert {type: "json"}

// sc: 0x4038bA2d9575C39352a8fbb218a9aeA8CD281cA9

const blockchain = new Promise((res, rej) => {
    if(typeof window.ethereum === "undefined"){
        rej("Necesitas installar MetaMask to use it!")
    }

    // Web3 Instance
    let web3 = new Web3(window.ethereum);
    let contract = new web3.eth.Contract(abi, 0x4038bA2d9575C39352a8fbb218a9aeA8CD281cA9);

    // Get my metamask address
    web3.eth.getAccounts().then((accounts) => {
        console.log("My Account", [accounts[0]]);
    })

    // Get the current supply of ntf tokens
    web3.eth.getAccounts().then((accounts) => {
        contract.methods.totalSupply().call({from: accounts[0]}).then((supply) => {
            console.log("Current supply of Ntf Tokens is: ", supply);
        })
    })

    // Get the maximun supply of ntf tokens
    web3.eth.getAccounts().then((accounts) => {
        contract.methods.maxSupply().call({from: accounts[0]}).then((maxsupply) => {
            console.log("Max supply of Ntf Tokens is: ", maxsupply);
        })
    })

    // Get your builds made in metavers
    web3.eth.getAccounts().then((accounts) => {
        contract.methods.getOwnerBuildings().call({from: accounts[0]}).then((buildings) => {
            console.log("Your builds ", buildings);
        })
    })

    // Get all the builds made in the metavers
    web3.eth.getAccounts().then((accounts) => {
        contract.methods.totalSupply().call({from: accounts[0]}).then((supply) => {
            contract.methods.getBuildings().call({from: accounts[0]}).then((data) => {
                res({supply: supply, buildings: data})
            })
        })
    })
})