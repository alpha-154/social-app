import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { ApiResponse  } from "../utils/ApiResponse.js"
import jwt from "jsonwebtoken"




const generateAccessAndRefreshTokens = async(userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        //storing the refresh token value to the mongoDB database
        user.refreshToken = refreshToken
        //saving the refresh token value
        await user.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }


    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating Access & Refresh tokens")
    }
}

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
    const { fullName, email, username, password } = req.body
    // console.log("request body: ", req.body)
    // console.log("email: ", email)
    // console.log("fullname: ", fullName)


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
    const existedUser = await User.findOne({
        $or: [ {username}, {email} ]
    })

    if(existedUser){
        throw new ApiError(409, "User with this username or email already exists")
    }


    //step:4

    const avatarLocalPath = req.files?.avatar[0]?.path; 
    //const coverImageLocalPath = req.files?.coverImage[0]?.path;
    //these piece of code (above line) isn't well designed to perform when the cover image isn't send.
    //So, that's why we've come up with this following code , and through this code whenever cover image isn't provided then for this approach we won't get the undefinied error.

    let coverImageLocalPath;
    if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0){
        coverImageLocalPath = req.files.coverImage[0].path
    }

   
    //console.log("request files: ", req.files)

    if(!avatarLocalPath){
        throw new ApiError(400, "Avatar file is required")
    }
    

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

const loginUser = asyncHandler(async (req, res) => {
      //collect the data from -> req.body
      //choose the login method (username or email based)
      //find the User 
      //if user is find then check password
      //if password is correct then generate access & refresh token
      //send cookie

      //step: 01
      const { email, username, password } = req.body
      console.log("email: ", email)

      //step: 02
      if(!username && !email){
        throw new ApiError(400,"Username or Email is required")
      }

      //step: 03
      const user = await User.findOne({
           $or: [ {username}, {email} ]
      })

      if(!user){
        throw new ApiError(404, "user doesn't exist")
      }

      //step: 04
      
      //there's difference between `User` & `user` . `User` is the object of mongoose which is saved in mongoDB cloud db. So, that's why methods like `User.findOne` etc only can be used with it. But , `user` is the object that we've created in this code. So, the user's saved password which is stored in mongoDB can be accessible through `User` object while the password that are coming from the request url can be accessible in `user` object

      const isPasswordValid = await user.isPasswordCorrect(password)

      if(!isPasswordValid){
        throw new ApiError(404, "Invalid user credentials")
      }

      //step: 05
      
      const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id)
      
      //step: 06

      const loggedInUser =  await User.findById(user._id).select("-password -refreshToken") 

      //constructing the options object such way so that it can only be editable through backend
      const options = {
        httpOnly: true,
        secure: true
      }
   
      return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(
            200,
            {
                user: loggedInUser, accessToken, refreshToken
            },
            "User logged in Successfully"
        )
      )



})

const logoutUser = asyncHandler( async ( req,res ) => {
    //step: 01 -> erase previous token values
     await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: undefined
            }
        },
        {
            new: true
        }
      )

    //step: 02 -> erase previous cookies
    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200 , {}, "User logged out"))
    
})

//creating an endpoint to trigger login option for frontend purposes
const refreshAccessToken = asyncHandler(async(req,res)=>{
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if(!incomingRefreshToken){
        throw new ApiError(401, "Unauthorized request")
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )
    
        const user = await User.findById(decodedToken?._id)
    
        if(!user){
            throw new ApiError(401, "Invalid refresh token")
        }
    
        if(incomingRefreshToken !== user?.refreshToken){
            throw new ApiError(401, "Refresh token is expired or used")
        }
    
        const options = {
            httpOnly: true,
            secure: true
        }
    
        const {accessToken, newRefreshToken} =  await generateAccessAndRefreshTokens(user._id)
    
        return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", newRefreshToken, options)
        .json(
            new ApiResponse(
                200,
                {accessToken, refreshToken: newRefreshToken},
                "Access token refreshed"
    
            )
        )
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh token")
    }
})


export { 
    registerUser, 
    loginUser,
    logoutUser,
    refreshAccessToken
}
