## a social-app

=> `.gitkeep` file (on public/temp folder) created to track the changes on temp file since automatically git won't be able to track this nested folder...

=> `.gitignore` file will have those files which have security issues and won't be deployed to github...

=> `.env` files are commonly used in development to manage environment variables. Environment variables are key-value pairs that are used to configure the environment in which applications run. These variables can be used to store configuration details such as database connection strings, API keys, and other sensitive information that should not be hard-coded into the application's source code.

=> `type` is set to 'module' -> ("type": "module") in the package.json file to import npm packages with module system way (through 'import' keyword)

=> `nodemon` (npm i -D nodemon & "dev": "nodemon src/index.js" in package.json file) is installed to avoid doing restart the server after changes in the project files (note: here, '-D' keyword is used to install it as dev dependency not as system dependency)

=> `prettier` -> (npm i -D prettier) & `.prettierrc` file is installed to maintain the same coding format (like spacing, semicommas) etc in all over the code

=> `.prettierignore`file is created to instruct prettier not to apply is styling format to mentioned files

[Model Link] => https://app.eraser.io/workspace/YtPqZ1VogxGy1jzIDkzj?origin=share

[Video Playlist] => https://www.youtube.com/watch?v=EH3vGeqeIAo&list=PLu71SKxNbfoBGh_8p_NS-ZAh6v7HhYqHW
