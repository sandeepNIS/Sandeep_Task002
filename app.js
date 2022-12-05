const express = require("express")
const bodyParser = require("body-parser")
const fs = require('fs');
// const { nextTick } = require("process");
// create our express app
const app = express.Router()
// middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
// route
const dataPath = './details_folder/accounts.json'
// const routes = require('./routes/Route')
// app.use('/', routes)
// //start server
app.listen(5000, ()=>{
    console.log("listeniing at port:5000")
}) 

app.post('/account/addaccount', (req, res) => {
    var existAccounts = getAccountData()    
    const newAccountId =(Math.random() *100)
// const newAccountId = Math.floor(100000 + Math.random() * 900000)
// const newAccountId=Array(1).fill().map(() => Math.round(Math.random() * 1))
 
    existAccounts[newAccountId] = req.body
    let acc = req.body;
    acc.id = newAccountId;
    existAccounts.push(acc)
   
    console.log(existAccounts);
    saveAccountData(existAccounts);
    res.send({success: true, msg: 'account added successfully'})
  });




 
//  app.get("/", (req, res) => {
//     res.sendFile(`${__dirname}/index.html`)
//   });

//   app.get("/register", (req, res) =>{
//     res.sendFile(`${__dirname}/Register.html`)
//   });

//   app.get("/List", (req, res) =>{
//     res.sendFile(`${__dirname}/List.html`)
//   });

// account.js




// util functions
const saveAccountData = (data) => {
    const stringifyData = JSON.stringify(data)
    fs.writeFileSync(dataPath, stringifyData)
}
const getAccountData = () => {
    const jsonData = fs.readFileSync(dataPath)
    return JSON.parse(jsonData)   
}

// const getAccountDetails=(id) => {
//   const jsonData = fs.readFileSync(dataPath)
//   return JSON.parse(jsonData)   
// }

// app.post('/account/addaccount', (req, res) => {
//     var existAccounts = getAccountData()    
//     const newAccountId =(Math.random() *100)
// // const newAccountId = Math.floor(100000 + Math.random() * 900000)
// // const newAccountId=Array(1).fill().map(() => Math.round(Math.random() * 1))
 
//     existAccounts[newAccountId] = req.body
//     let acc = req.body;
//     acc.id = newAccountId;
//     existAccounts.push(acc)
   
//     console.log(existAccounts);
//     saveAccountData(existAccounts);
//     res.send({success: true, msg: 'account added successfully'})
// })





// Read - get all accounts from the json file
app.get('/account/list', (req, res) => {
    const accounts = getAccountData()
    res.send(accounts)
  })

  // accountRoutes.get('/account/list/:id', (req, res) => {
  //   const accounts = getAccountData()
  //   res.send(accounts)
  // })  


// //(get a specific user)
// //   accountRoutes.get('/account/list/:id', function(req, res){
// //     listId=req.params.id;
// //     const accounts= getAccountData();
// //     accounts.find(({id:listId}),function(err,val){
// //       res.send(val);
// //     })
// //   //   res.send(accounts)
// //   })

//   // accountRoutes.get('/account/list/:id', (req, res) =>{
//   //   const accounts = getAccountData();
//   //   accounts.findById(req.params.id)
//   //   .then(userfound =>{
//   //     if(!doc) {return res.status(404).end();}
//   //     return res.status(200).json(doc);
//   //   })
//   //   .catch(err=>next(err))
//   //   })

  

  // Update - using Put method
// app.put('/account/:id', (req, res) => {
//     var existAccounts = getAccountData()
//     fs.readFile(dataPath, 'utf8', (err, data) => {
//       const accountId = req.params['id'];
//       existAccounts[accountId] = req.body;
//       saveAccountData(existAccounts);
//       res.send(`accounts with id ${accountId} has been updated`)
//     }, true);
//   });

//   delete - using delete method
app.delete('/account/delete/:id', (req, res) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
      var existAccounts = getAccountData()
      const userId = req.params['id'];
      delete existAccounts[userId]; 
      saveAccountData(existAccounts);
      res.send(`accounts with id ${userId} has been deleted`)
    }, true);
  })

  