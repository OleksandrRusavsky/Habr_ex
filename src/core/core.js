const { ethers } = require('ethers')
const ContractArtifact = require('./SimpleMarketplace.json')
const CONTRACT_ADDRESS = ContractArtifact.networks['3'].address

const ABI = [
    'function InstanceOwner () public view returns(address)',
    'function Description () public view returns(string)',
    'function AskingPrice () public view returns(int)',

    'function InstanceBuyer () public view returns(address)',
    'function OfferPrice () public view returns(int)',

    'function MakeOffer(int offerPrice) public',
    'function Reject() public',
    'function AcceptOffer() public'
]

let provider = new ethers.providers.Web3Provider(window.ethereum)
let readOnlyContract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider)
let signer = provider.getSigner()
let contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer)
let contractSigner = contract.connect(signer)

export default {
    async getInstanceOwner() {
        const instanceOwner = await readOnlyContract.InstanceOwner()
        return {instanceOwner: instanceOwner}
    },
    async getDescription() {
        const description = await readOnlyContract.Description()
        return {description: description}
    },
    async getAskingPrice() {
        const askingPrice = await readOnlyContract.AskingPrice()
        return {askingPrice: askingPrice}
    },
    async getInstanceBuyer() {
        const instanceBuyer = await readOnlyContract.InstanceBuyer()
        return {instanceBuyer: instanceBuyer}
    },
    async getOfferPrice() {
        const offerPrice = await readOnlyContract.OfferPrice()
        return {offerPrice: offerPrice}
    },

    async makeOffer(offerPrice) {
        const txResponse = await contractSigner.MakeOffer(offerPrice, {gasLimit: 300000})
        const txReceipt = await txResponse.wait()
        return {transaction: txReceipt.transactionHash}
    },
    async reject() {
        const txResponse = await contractSigner.Reject({gasLimit: 300000})
        const txReceipt = await txResponse.wait()
        return {transaction: txReceipt.transactionHash}
    },
    async acceptOffer() {
        const txResponse = await contractSigner.AcceptOffer({gasLimit: 300000})
        const txReceipt = await txResponse.wait()
        return {transaction: txReceipt.transactionHash}
    }
}