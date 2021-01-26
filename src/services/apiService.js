const uploadUtil = require('../utilities/uploadUtil');
const dbConnection = require('../connections/db-connection');

let apiService ={}

apiService.getPolicyInfoByUsername = (userName)=>{
    let query = { firstName:  { $regex : new RegExp( userName, "i") }};
    return dbConnection.getUserCollection().then( userModel=>{
        return userModel.find(query).then(userDoc=>{
            if(userDoc.length >0){
                let policyInfoQuery = { userId:  { $regex : new RegExp( userDoc[0]._id , "i") }};
                return dbConnection.getPolicyInfoCollection().then(policyInfoModel =>{
                    return policyInfoModel.find(policyInfoQuery).then(policyDocs =>{
                        if(policyDocs.length >0)
                            return policyDocs;
                        else
                            return { msg: 'No policy Info present for this user !!!'}
                    });
                });
            }
            else
                return { msg: 'User does not exists !!!'}
        });
    });
}

apiService.getAggregatePolicyByEachUser = ()=>{
    let query = { $group: {_id: "$userId", data: { $push: "$$ROOT"}}};
    return dbConnection.getPolicyInfoCollection().then(policyInfoModel=>{
        return policyInfoModel.aggregate([query]).then(policyData=>{
            if(policyData.length >0)
                return policyData;
            else
                return { msg: 'No policy data available !'}
        }).catch(err=>{ console.log('Error occured while fetching policy data:', err) });
    }).catch( err =>{ console.log( 'Error occured while creating DB connection:', err) });
}

apiService.insertToDbUsingFile = async (records)=>{
    for( record of records){
        let agentData =[{ agentName: record.agent }];
        let userAccountData =[{ accountName: record.account_name ,accountType: record.account_type}];
        let lobData =[{categoryName: record.category_name}];
        let policyCarrierData =[{companyName: record.company_name}];
        let userData =[{firstName: record.firstname,
            dob: record.dob,
            address: record.address,
            phone: record.phone,
            state: record.state,
            city: record.city,
            zip: record.zip,
            email: record.email,
            gender: record.gender,
            userType: record.userType,
            userAccountId: '' }];
        let policyInfoData =[{ policyNumber: record.policy_number,
            policyStartDate: record.policy_start_date,
            policyEndDate: record.policy_end_date,
            consumer: record.csr,
            producer: record.producer,
            premiumAmountWritten: record.premium_amount_written,
            premiumAmount: record.premium_amount,
            policyMode: record.policy_mode,
            policyType: record.policy_type,
            lobId: '',
            policyCarrierId: '',
            userId: '',
            agentId: '' }];
        await uploadUtil.insertToAgentCollection(agentData).then(agentDoc=>{
            uploadUtil.insertToLobCollection(lobData).then(lobDoc=>{
                uploadUtil.insertToPolicyCarrierCollection(policyCarrierData).then(policyCarrierDoc=>{
                    uploadUtil.insertToUserAccountCollection(userAccountData).then(userAccountDoc=>{
                        userData[0].userAccountId = userAccountDoc[0]._id;
                        uploadUtil.insertToUserCollection(userData).then(userDoc=>{
                            policyInfoData[0].lobId = lobDoc._id;
                            policyInfoData[0].policyCarrierId = policyCarrierDoc._id;
                            policyInfoData[0].userId = userDoc[0]._id;
                            policyInfoData[0].agentId = agentDoc._id;
                            uploadUtil.insertToPolicyInfoCollection(policyInfoData).then(policyDoc=>{
                                console.log('Row inserted !!!');
                            }).catch(err=>{ console.log(err) });
                        }).catch(err=>{ console.log(err) });
                    }).catch(err=>{ console.log(err) });
                }).catch(err=>{ console.log(err) });
            }).catch(err=>{ console.log(err) });
        }).catch(err=>{ console.log(err) });
    }
    return 'CSV INSERTION SUCCESS !!!';
}


module.exports = apiService;