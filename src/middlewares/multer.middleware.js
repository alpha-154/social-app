//This line imports the `multer` package, which is a middleware for handling `multipart/form-data`, primarily used for uploading files.
import multer from "multer";


//This line creates a storage configuration object for Multer using the `diskStorage` method. This configuration determines how and where the uploaded files will be stored on the disk.
const storage = multer.diskStorage({
  //This line defines the `destination` function, which is called by Multer to determine the destination directory for the uploaded files. The `cb` (callback) function is called with `null` for the first argument (indicating no error) and the path `./public/temp` for the second argument, specifying where the files should be saved.
    destination: function (req, file, cb) {
      cb(null, "./public/temp")
    },


    //This line defines the `filename` function, which is called by Multer to determine the name of the uploaded file. The `cb` function is called with null for the first argument (indicating no error) and `file.originalname` for the second argument, setting the file name to the original name of the uploaded file.
    filename: function (req, file, cb) {
      
      cb(null, file.originalname)
    }


  })
  

//This line exports the configured Multer middleware as `upload`. It initializes Multer with the previously defined `storage` configuration, allowing it to handle file uploads with the specified destination and filename settings.  
export const upload = multer({ 
    storage, 
})