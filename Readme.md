## a social-app

---->>> All the Steps that I've follwed, mentioned here..

=> `.gitkeep` file (on public/temp folder) created to track the changes on temp file since automatically git won't be able to track this nested folder...

=> `.gitignore` file will have those files which have security issues and won't be deployed to github...

=> `.env` files are commonly used in development to manage environment variables. Environment variables are key-value pairs that are used to configure the environment in which applications run. These variables can be used to store configuration details such as database connection strings, API keys, and other sensitive information that should not be hard-coded into the application's source code.

=> `type` is set to 'module' -> ("type": "module") in the package.json file to import npm packages with module system way (through 'import' keyword)

=> `nodemon` (npm i -D nodemon & "dev": "nodemon src/index.js" in package.json file) is installed to avoid doing restart the server after changes in the project files (note: here, '-D' keyword is used to install it as dev dependency not as system dependency)

=> `prettier` -> (npm i -D prettier) & `.prettierrc` file is installed to maintain the same coding format (like spacing, semicommas) etc in all over the code

=> `.prettierignore`file is created to instruct prettier not to apply is styling format to mentioned files

=> `npm i mongoose express dotenv` installing (mongoose, express & dotenv)

=> `npm install mongoose-aggregate-paginate-v2` installing mongoose-aggregate-paginate . The mongoose-aggregate-paginate-v2 package is an NPM module designed to provide pagination functionality for Mongoose aggregation queries.

=> `npm i bcrypt` installing bcrypt package.
`bcrypt` is a library used for hashing passwords and verifying them. Hashing is a one-way process that converts a password into a fixed-length string of characters, which is typically stored in a database. This ensures that even if the database is compromised, the original passwords cannot be easily retrieved.

=> `npm i jsonwebtoken` installing jsonwebtoken package.
`jsonwebtoken` is a library used for creating and verifying JSON Web Tokens (JWT). JWT is a compact, URL-safe means of representing claims to be transferred between two parties. It is commonly used for authentication and information exchange in web applications.

=> UseCases:
`bcrypt`:
Password Storage: Securely storing user passwords in a database.
Authentication: Verifying user login attempts by comparing entered passwords with stored hashed passwords.

`jsonwebtoken`:
Token-Based Authentication: Securing APIs by issuing tokens upon successful login and validating them on subsequent requests.
Authorization: Including roles and permissions in the token payload to control access to different parts of an application.

=> `npm i multer` installing multer npm package.
`multer` simplifies the process of handling file uploads in web applications. It parses incoming file data and saves it to the specified destination on the server.

=> `npm i cloudinary` installing cloudinary.
Cloudinary is a cloud-based service that provides a comprehensive solution for managing and delivering media assets, including images and videos, in web and mobile applications. It offers a wide range of features for storing, transforming, optimizing, and delivering media content.

- we'll store media files like (images, videos ) first on the local file (./public/temp) and then we'll upload it to the cloudinary

NOTES:

//regarding `db`:

1. while working with db, wrap it under the try..catch format
2. to get response from database takes time, so always use async-await or promises with db codes

//regarding `express -> app`:

1. app.use() get used while working with cookies or middlewares in the code

[Model Link] => https://app.eraser.io/workspace/YtPqZ1VogxGy1jzIDkzj?origin=share

[Video Playlist] => https://www.youtube.com/watch?v=EH3vGeqeIAo&list=PLu71SKxNbfoBGh_8p_NS-ZAh6v7HhYqHW
