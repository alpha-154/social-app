const asyncHandler = (requestHandler) => {
    
      return (req, res, next) => {
            Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err))
        }
    
}

export { asyncHandler }









//  ----->>>   achiving same task with async-await - try...error method  >>>>>----


//const asyncHandler = () => {}
//const asyncHandler = (function) => {}
//const asyncHandler = (function) =>  async () => {}
//these are the steps we'll be doing below in short form

//here, we're sending the fn function to another function
// const asyncHandler = (fn) => async (req, res, next) => {
//     try {
//         await fn(req, res, next)
//     } catch (error) {
//         res.status(error.code || 5000).json({
//             success: false,
//             message: error.message 
//         })
//     }
// }

//export { asynceHandler}