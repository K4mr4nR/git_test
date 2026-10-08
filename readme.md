# Price List backend demo
To follow on from the previous lab exercise, this demo moves the data from the frontend to a backend server. The backend will service up the data on API request. It emulates getting the data from a database and returning it to the caller.

There are three endpoints. Assuming the server is on local host and listening on tcp port 3000:

GET http://localhost:3000/products/items
This returns all item categories as an array. e.g., [ Laptop, Scanner, Phone, Printer ]

GET http://localhost:3000/products/{product}
Get all specific item details based on product. e.g. Scanner returns all scanners

GET http://localhost:3000/products/all
Return all products with their details

POST http://localhost:3000/products/purchase
Post an array of ids of products to buy. The total is calculated and returned. e.g., {"ids": [1,8,9] } returns a text message with thanks and cost.

Make sure you understand the operation of this code then use your knowledge to implement the lab exercise which is a simpler version of this.

## Lab exercise
You need to create a backend API to return requested jokes.

The lab exercise requirements are in the word document and the jokes.json file will be your emulated database.