import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { ApiResponse  } from "../utils/ApiResponse.js"



const registerUser = asyncHandler( async (req,res) => {
    //get user details from frontend
    //validation - not empty
    //check if user already exists: email, username
    //check for images, check for avatar
    //upload them to cloudinary, avatar
    //create user object - create entry in db
    //remove password and refresh token fields
    //check for user creation
    //return res


    //step: 1
    const { fullName, email, username, password} = req.body
    console.log("email: ", email)

    /* if we write all the `validation` codes in following simple `if` condition way then it'll be long . So, instead of writing the validations codes that way , we've approached to the more `optimised `way 
      if( fullName === ""){
        throw new ApiError(400, "password should be given")
     } */

    //step:2
    if(
        [fullName, email, username, password].some( (field) => field?.trim() === "")
    ){
        throw new ApiError(400, "All fields are required")
    }


    //step:3
    //`User.findOne(...)`: This is a method provided by Mongoose (assuming `User` is a Mongoose model) to find a single document in the database that matches the provided criteria.

    /*

    `$or: [{ username }, { email }]`: The `$or` operator in MongoDB is used to perform a logical OR operation on an array of conditions. This means it will return a document if at least one of the conditions is true.
    `{ username }`: This is shorthand for { username: username }, meaning it will match any document with a username field equal to the provided username.
    `{ email }`: This is shorthand for { email: email }, meaning it will match any document with an email field equal to the provided email.
    `What this line does`: It searches the database for a user document where either the username or email matches the provided values. If such a user is found, it is assigned to the existedUser variable.

    */
    const existedUser = User.findOne({
        $or: [ {username}, {email} ]
    })

    if(existedUser){
        throw new ApiError(409, "User with this username or email already exists")
    }


    //step:4
    const avatarLocalPath = req.files?.avatar[0]?.path; 
    const coverImageLocalPath = req.files?.coverImgae[0]?.path;
   
    if(!avatarLocalPath){
        throw new ApiError(400, "Avatar file is required")
    }
    // else{
    //    console.log("localPath: ",avatarLocalPath)
    // }

    //step:5
    
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if(!avatar){
        throw new ApiError(400, "Avatar file is required")
    }

    //step:6 (storing informations in the DB)

   const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })


    //step: (7+8)
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )
    
    if(!createdUser){
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    )

})

export { registerUser, }
