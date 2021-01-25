const agentCollection = require('../connections/AgentConnection');
const userAccountCollection = require('../connections/UserAccountConnection');
const userCollection = require('../connections/UserConnection');
const lobCollection = require('../connections/LobConnection');
const policyCarrierCollection = require('../connections/PolicyCarrierConnection');
const policyInfoCollection = require('../connections/PolicyInfoConnection');

let uploadUtil ={};

uploadUtil.insertToAgentCollection =(agentData)=>{
    let query = { agentName:  { $regex : new RegExp( agentData[0].agentName, "i") }};
    return agentCollection.getAgentCollection().then(agentModel =>{
        return agentModel.findOne(query).then(agentDoc =>{
            if(agentDoc !== null)
                return agentDoc;
            else{
                return agentModel.insertMany(agentData).then(insertResp =>{
                    if(insertResp)
                        return insertResp[0];
                    else 
                    throw new Error('Insertion failed for the user Account');
                }).catch(err=>{
                    throw new Error(err);
                });
            }
        })
    });
}

uploadUtil.insertToUserAccountCollection =(userAccountData)=>{
    return userAccountCollection.getUserAccountCollection().then(userAccountModel=>{
        return userAccountModel.insertMany(userAccountData).then(insertResp=>{
            if(insertResp)
                return insertResp;
            else
                throw new Error('Insertion failed for the user Account');
        }).catch(err =>{
            throw new Error(err);
        })
    });
}

uploadUtil.insertToUserCollection =(userData)=>{
    return userCollection.getUserCollection().then(userModel=>{
        return userModel.insertMany(userData).then(insertResp=>{
            if(insertResp)
                return insertResp;
            else
                throw new Error('Insertion failed for the user');
        }).catch(err =>{
            throw new Error(err);
        })
    });
}

uploadUtil.insertToLobCollection = (lobData)=>{
    let query = { categoryName:  { $regex : new RegExp( lobData[0].categoryName, "i") }};
    return lobCollection.getLobCollection().then(lobModal =>{
        return lobModal.findOne(query).then(lobDoc =>{
            if(lobDoc !== null)
                return lobDoc;
            else{
                return lobModal.insertMany(lobData).then(lobDoc=>{
                    return lobDoc[0];
                });
            }
        });
    });
}

uploadUtil.insertToPolicyCarrierCollection =(policyCarrierData)=>{
    let query = { companyName:  { $regex : new RegExp( policyCarrierData[0].companyName, "i") }};
    return policyCarrierCollection.getPolicyCarrierCollection().then(policyCarrierModel=>{
        return policyCarrierModel.findOne(query).then(policyCarrierDoc=>{
            if(policyCarrierDoc !==null)
                return policyCarrierDoc;
            else{
                return policyCarrierModel.insertMany(policyCarrierData).then(policyCarrierDoc=>{
                    return policyCarrierDoc[0];
                });
            }
        });
    });
}

uploadUtil.insertToPolicyInfoCollection =(policyInfoData)=>{
    return policyInfoCollection.getPolicyInfoCollection().then(policyInfoModel=>{
        return policyInfoModel.insertMany(policyInfoData).then(insertResp=>{
            if(insertResp)
                return insertResp;
            else
                throw new Error('Insertion failed for the Policy Info');
        }).catch(err =>{
            throw new Error(err);
        })
    });
}

module.exports = uploadUtil;