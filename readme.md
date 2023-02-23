# **13 SQL: eCommerce Backend**

## **Project Description**
This is an eCommerce backend application that allows users to perform the following HTTP requests via Insomnia API-testing application: 
<br>

* **GET requests:**
    * GET all categories data via `/api/categories` endpoint
    * GET all tags data via `/api/tags` endpoint
    * GET all products data via `api/products` endpoint
<br>

* **POST requests** 
    * Use data from `req.body` to create a new category via `/api/categories` endpoint
    * Use data from `req.body` to create a new tag via `/api/tags` endpoint
    * Use data from `req.body` to create a new product via `/api/products` endpoint
<br>

* **PUT requests**
    * Use data from `req.body` to update the `category_name` of a specific category ID, and send the update request to the `api/categories` endpoint.
    * Use data from `req.body` to update the `tag_name` of a specific category ID, and send the update request to the `api/tags` endpoint.
    * Use data from `req.body` to update the `product_name` of a specific category ID, and send the update request to the `api/products` endpoint.
<br>

* **DELETE requests**
    * delete a category of a specific category ID via `/api/categories` endpoint
    * delete a tag of a specific category ID via `/api/tags` endpoint
    * delete a product of a specific category ID via `/api/products` endpoint
<br>

All the HTTP requested data would be returned in JSON format.

---
## **URLs**
- [Walkthrough Video]()
- [GitHub Repository URL](https://github.com/jouriena11/ecommerce-backend)

---
## **Table of Contents**
- <a href="#installation">Installation</a>
- <a href="#technologies-used">Technologies Used</a>
- <a href="#usage">Usage</a>
- <a href="#future-development">Future Developments</a>

---
## **Installation**
The following npm packages must be installed to run this application:
- dotenv v8.2.0
- express v4.17.1
- mysql2 v2.1.0
- sequelize v5.21.7

The installations can be done conveniently by the running the following command line at the root directory: 
```
npm i
```

---
## **Technologies Used**
- JavaScript
- Node.js
- MySQL
- Express.js

---
## **Usage**
Before running this application, make sure to do the following first
- change `.env.EXAMPLE` file name to `.env` 
- update your username and password in the .env file
- login to your mysql account at ./db folder and enter the this command line `source schema.sql` in your CLI 
- run `npm run seed` in your CLI at root directory

To start running the application, enter the following code at root directory in a command-line application
```
node server.js
```

Then open Insomnia application to perfrom GET, POST, PUT, DELETE requests.

To exit the application, press CTRL+c on the keyboard.

---
## **Future Development**
- to create a frontend interface for this backend API functionalities, replacing Insomnia application in performing HTTP requests