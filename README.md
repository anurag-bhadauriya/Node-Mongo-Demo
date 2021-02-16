Contains API's to insert the csv sheet data to various collection in the mongoDb.
MongoDb port : 27017
Node server used: Express

Placed sample sheet in the same directory on which we are going to perform the below tasks,

1) Agent - Agent Name
2) User - firstname, Dob, address, phone number, state, zip code, email, gender, userType
3) User's Account - Account Name
4) Policy Category(LOB) - category_name
5) Policy Carrier - company_name
6) Policy Info -  policy number, policy start date, policy end date, policy category, collection id, company collection id, and user id.

You have to perform the following tasks based above information:

Task 1:
1) Create API to upload the attached XLSX/CSV data into MongoDB. (Please accomplish this using worker threads)
2) Search API to find policy info with the help of username.
3) API to provide aggregated policy by each user.
4) Consider each info as a different collection in MongoDB (Agent, User, User's Account, LOB, Carrier, Policy).

API List

#1 API to upload the CSV filein mongoDb using worker thread  
POST : http://localhost:3000/api/upload  
Body : in form of key value, where key = data, value = csv file

#2 API to upload the CSV file using async method  
POST : http://localhost:3000/api/upload/async  
Body : in form of key value, where key = data, value = csv file

#3 API to get the aggregate policy data for each user  
GET : http://localhost:3000/api/get-aggregate-policy

#4 API to get the policy information by username  
GET : http://localhost:3000/api/getpolicyinfo/{userName}  
queryparams: username to be mentioned in the url
