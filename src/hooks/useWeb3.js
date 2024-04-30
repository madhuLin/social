import Web3 from "web3";
import socialJSON from "../contracts/SocialMedia.json";
const userWeb3 = () => {
    //infura
    // const sepoliaWS = "https://sepolia.infura.io/v3/3bd39234922b4be49abe1a21d6cc60e8";
    // const web3 = new Web3(Web3.givenProvider || sepoliaWS);
    //metamask
    if(typeof web3 !== "undefined"){
        web3 = new Web3(web3.currentProvider);
    } else {
        alert("Please install metamask");
    }
    web3.eth.getAccounts((error, acccount) => {
        if(error) {
            console.log(error);
        } else {
            console.log("當前帳戶地址:",acccount);
        }
    });

    // ---------------------------------------
    
    const contractAddress = "0xB0eFA78F2b6B87281d2279f964F3ba02B3C6127d";
    const socialContract = new web3.eth.Contract(
        socialJSON.abi,
        contractAddress,
    );

    const getAccount = async () => {
        let accounts; 
        try {
            accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
            // console.log(accounts);
          } catch (error) {
            console.error("Failed to request accounts:", error);
            return;
          }
        return accounts[0];
    };
    return { web3, socialContract, contractAddress, getAccount};
    // return { web3, voteContract, contractAddress, getAccount, };
};

export default userWeb3;