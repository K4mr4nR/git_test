// Demo to emulate a database returning joke data to the client vis API
const express = require('express')
const fs = require('fs')
const path = require('path')
const app = express()
const PORT = 3000


app.use(express.static(path.join(__dirname, 'public'))) // Serve static web pages
app.use(express.json())

// path.join creates absolute path to the json file in all environments
// fs returns a buffer of bytes unless utf8 specified then its a big string
// JSON.parse will create a json structure, in this case an array of objects in jokeList
const jokeList = JSON.parse(fs.readFileSync(path.join(__dirname,'jokes.json')))

//-------------------- ROUTES ------------------------------
// Return a unique list of all joke types. e.g., laptop, phone, etc used to populate the dropdown
app.get('/jokes/types', (req, res) => {
  // map will iterate the array and return a new array containing only types with specific ID but not unique set
  // new Set will create a Set object where each property is a unique type name based on the array of types. A set cannot hold duplicates so creates a unique set for the dropdown
  // ... is weird syntax for the spread operator. It initialises the array with the unique types by iterating across them and returning each individual
  // in this case each property of the set is added to the array to effectively initialise it const types = ["scanner", "printer", etc]
  // So unique list of types is returned to the caller 
  const types = [...new Set(jokeList.map(index => index.type))]
  res.json(types)
})

// Return all jokes of type item unless item is 'all' then return all
app.get('/jokes', (req, res) => {
  const type = req.query.type
  const limit = Number(req.query.limit) || jokeList.length // if limit is not specified then return all jokes
  let jokes = jokeList
  if (type) {
    jokes = jokeList.filter(index => index.type === type)
  }
  jokes = jokes.sort(() => 0.5 - Math.random()).slice(0, limit) // shuffle the jokes and return only the number specified by limit
  jokes = jokes.slice(0, limit)
  res.json(jokes)
  // if (type === 'all') {
  //   res.json(jokeList)
  // } else {
  //   // filter returns an array only of elements that pass the test on each element of jokeList
  //   res.json(jokeList.filter(index => index.type === type))
  // }
  //removes the need for /type == all to give a random joke
  // if (type) {
  //   res.json(jokeList.filter(index => index.type === type))
  // } else {
  //   res.json(jokeList)
  // }
})

app.get('/jokes/:id', (req, res) => {
  const id = Number(req.params.id)

  const joke = jokeList.find(index => index.id === id)

  if (!joke) {
    return res.status(404).json([])
  }

  res.json(joke)
})

app.post('/jokes', (req, res) => {
  const newJoke = req.body

  const jokeExists = jokeList.some(index => index.id === newJoke.id)

  if (jokeExists) {
    return res.status(400).json([])
  }

  jokeList.push(newJoke)

  res.status(201).json(newJoke)
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})


// // Demo to emulate a database returning product data to the client vis API
// const express = require('express')
// const fs = require('fs')
// const path = require('path')
// const app = express()
// const PORT = 3000


// app.use(express.static(path.join(__dirname, 'public'))) // Serve static web pages
// app.use(express.json())

// // path.join creates absolute path to the json file in all environments
// // fs returns a buffer of bytes unless utf8 specified then its a big string
// // JSON.parse will create a json structure, in this case an array of objects in priceList
// const priceList = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'priceList.json')))

// //-------------------- ROUTES ------------------------------
// // Return a unique list of all product items. e.g., laptop, phone, etc used to populate the dropdown
// app.get('/products/items', (req, res) => {
//   // map will iterate the array and return a new array containing only items with specific ID but not unique set
//   // new Set will create a Set object where each property is a unique item name based on the array of items. A set cannot hold duplicates so creates a unique set for the dropdown
//   // ... is weird syntax for the spread operator. It initialises the array with the unique items by iterating across them and returning each individual
//   // in this case each property of the set is added to the array to effectively initialise it const items = ["scanner", "printer", etc]
//   // So unique list of items is returned to the caller 
//   const items = [...new Set(priceList.map(index => index.item))]
//   res.json(items)
// })

// // Return all products of type item unless item is 'all' then return all
// app.get('/products/:item', (req, res) => {
//   const item = req.params.item
//   if (item === 'all') {
//     res.json(priceList)
//   } else {
//     // filter returns an array only of elements that pass the test on each element of priceList
//     res.json(priceList.filter(index => index.item === item))
//   }
// })

// // IDs of selected product are sent in the body in json
// app.post('/products/purchase', (req, res) => {
//   const ids = req.body.ids // Array of product IDs e.g. { "ids": [1,3,4,9]}
//   if (ids.length == 0) return res.send('Duh! You need to choose a product to buy') // return prevent more code execution
//   // IDs is a array of IDs so need to get products with those IDs only. To avoid iterating the
//   // IDs array and product, ids.includes will do that and check each priceList element to see
//   // if its id is any of those in the ids array
//   const selectedItems = priceList.filter(index => ids.includes(index.id))

//   // With the selected products, 
//   let total = 0
//   selectedItems.forEach(element => total += element.price)
//   res.send(`Thank you for your purchase. Your card will be charged with £${total.toFixed(2)}`)
// })

// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`)
// })
