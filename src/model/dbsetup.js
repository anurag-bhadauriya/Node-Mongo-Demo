const agentCollection = require('../connections/AgentConnection');
const userAccountCollection = require('../connections/UserAccountConnection');
const userCollection = require('../connections/UserConnection');
const lobCollection = require('../connections/LobConnection');
const policyCarrierCollection = require('../connections/PolicyCarrierConnection');
const policyInfoCollection = require('../connections/PolicyInfoConnection');

const agentData = [{
    agentName: "John Doe"
}];
const userData =[{
    firstName: "John",
    dob: "12/01/2020",
    address: "Street 24, trade route",
    phone: 2025631452,
    state: "New Jersey",
    city: "New Jersey",
    zip: "124568",
    email: "john-doe@yahoo.com",
    gender: "Male",
    userType: "Temporary"
}];
const userAccountData=[{
    "accountName": "johnDoe@123",
    "accountType": "Temporary"
}];
const LobData =[{
    categoryName: "Category_12"
}];
const PolicyCarrierData =[{
    companyName: "John Doe's pvt Ltd"
}];
const PolicyInfoData =[{
    policyNumber: "12345678",
    policyStartDate: "02/12/2020",
    policyEndDate: "02/12/2021",
    consumer: "John Doe",
    producer: "John Doe",
    premiumAmountWritten: "",
    premiumAmount: "40000",
    policyMode: "Online",
    policyType: "Monthly",
    lobId: "",
    policyCarrierId: "",
    userId: "",
    agentId: ""
}];

exports.setupDb = ()=>{
    return agentCollection.getAgentCollection().then((agCollection)=>{
        return agCollection.insertMany(agentData).then( data=>{
            if(data){
                return userCollection.getUserCollection().then(uCollection =>{
                    return uCollection.insertMany(userData).then( data=>{
                        if(data){
                            return userAccountCollection.getUserAccountCollection().then(uACollection =>{
                                return uACollection.insertMany(userAccountData).then( data=>{
                                    if(data){
                                        return lobCollection.getLobCollection().then(lbCollection =>{
                                            return lbCollection.insertMany(LobData).then( data=>{
                                                if(data){
                                                    return policyCarrierCollection.getPolicyCarrierCollection().then(polCollection =>{
                                                        return polCollection.insertMany(PolicyCarrierData).then( data=>{
                                                            if(data){
                                                                return policyInfoCollection.getPolicyInfoCollection().then(polInfoCollection =>{
                                                                    return polInfoCollection.insertMany(PolicyInfoData).then( data=>{
                                                                        if(data){
                                                                            return "Insertion successfull";
                                                                        }
                                                                        else{ throw new Error('Insertion failed for policy_Info collection')}
                                                                    })
                                                                })
                                                            }
                                                            else{ throw new Error('Insertion failed for Policy_carrier collection')}
                                                        })
                                                    })
                                                }
                                                else{ throw new Error('Insertion failed for Lob collection')}
                                            })
                                        })
                                    }
                                    else{ throw new Error('Insertion failed for userAccount collection')}
                                })
                            })
                        }
                        else{ throw new Error('Insertion failed for user collection')}
                    })
                })
            }
            else {
                throw new Error('Insertion failed for agent Collection');
            }
        })
    })
}