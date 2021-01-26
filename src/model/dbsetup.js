const dbConnection = require('../connections/db-connection');

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
    return dbConnection.getAgentCollection().then((agModel)=>{
        return agModel.insertMany(agentData).then( data=>{
            if(data){
                return dbConnection.getUserCollection().then(uModel =>{
                    return uModel.insertMany(userData).then( data=>{
                        if(data){
                            return dbConnection.getUserAccountCollection().then(uAModel =>{
                                return uAModel.insertMany(userAccountData).then( data=>{
                                    if(data){
                                        return dbConnection.getLobCollection().then(lobModel =>{
                                            return lobModel.insertMany(LobData).then( data=>{
                                                if(data){
                                                    return dbConnection.getPolicyCarrierCollection().then(polModel =>{
                                                        return polModel.insertMany(PolicyCarrierData).then( data=>{
                                                            if(data){
                                                                return dbConnection.getPolicyInfoCollection().then(polInfoModel =>{
                                                                    return polInfoModel.insertMany(PolicyInfoData).then( data=>{
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