# Crookie

Due to the amount of pages and many elements are the same, we try to reduce the duplicated work. 
Then, only the page with "*" will display recipes.

Gain happiness from cooking!

## Dev Environment

```bash
!!!Nodejs is required!!!
# install necessary dependencies
npm install express

// encrypt password for login
npm i bcryptjs

//template engine
npm i ejs

//connecting MongoDB server
npm i mongoose

//logger middleware
npm i morgan
```

## Rename `.env.example` to `.env`
In `.env` input valid values
```sh
PORT=3000
DATABASE=mongodb+srv://crookie:<password>@cluster0.u2w5zqi.mongodb.net/Recipe?retryWrites=true&w=majority
DATABASE_PASSWORD=

JWT_SECRET=my-childhood-onepiece-pirateking
JWT_EXPIRES_IN=1d
JWT_COOKIE_EXPIRES_IN=90

EMAIL_USERNAME=3e70ea6c99371c
EMAIL_PASSWORD=4d03b69eae744b
```sh

//Localhost website
nodemon node.js


## Addition Resouce
There are some CSS format are credited in the follwing:
- https://getcssscan.com/css-buttons-examples
- https://www.youtube.com/watch?v=42M9esAvAEU
