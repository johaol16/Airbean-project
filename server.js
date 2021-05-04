const { request, response } = require("express")
const express = require("express")
const lowdb = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const { nanoid } = require('nanoid')

const adapterMenu = new FileSync('menu.json')
const databaseMenu = lowdb(adapterMenu)
const adapterAccounts = new FileSync('accounts.json')
const databaseAccounts = lowdb(adapterAccounts)

const app = express()
app.use(express.json())


function initiateDatabase() {
  databaseMenu.defaults({ menu: [] }).write()
  databaseAccounts.defaults({ accounts: [] }).write()
}

app.get('/api/coffee', (request, response) => {
  const menu = databaseMenu.get('menu').value()

  let result = {}

  if (menu.length > 0) {
    result.success = true;
    result.menu = menu;
     
    
  } else {
    result.success = false;
    result.message = 'Inga menus att hämta'
   
  } 

  response.json(result)
}); 


 app.post('/api/account', (request, response) => {
  const account = request.body
  /* console.log('Konto att lägga till:', account) */

    const usernameExists = databaseAccounts.get('accounts').find({ username: account.username }).value()
  const emailExists = databaseAccounts.get('accounts').find({ email: account.email }).value()

  console.log('usernameExists:', usernameExists)
  console.log('emailExists', emailExists)

  const result = {
    success: false,
    usernameExists: false,
    emailExists: false
  }

  if (usernameExists) {
    result.usernameExists = true
  }

  if (emailExists) {
    result.emailExists = true
  }

  if (!result.usernameExists && !result.emailExists) {
    databaseAccounts.get('accounts').push(account).write()
    result.success = true
  }

  response.json(result)

}) 


app.post('/api/order', (request, response) => {
  const order = request.body
  order.id = nanoid()
  order.eta =  10 + Math.floor(Math.random() * 20)

  const account = databaseAccounts.get('accounts').find({ username: order.username }).value()
if (account) {
  databaseAccounts.get('orders').push(order).write()
}
  response.json(order)
})


app.listen(8000, () => {
  console.log('server started')
  initiateDatabase()
})

