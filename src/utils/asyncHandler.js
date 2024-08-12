/* this is wrapper function (asynHandler) that will take any function and send request

// using the promises
const asyncHandler = (requestHandler)  => {
   Promise.resolve(requestHandler(req,res ,next))
   .catch((err) => next(err))
}
*/

// using try and catch (async and await)
// const asyncHandler = (function) => {() => {}}  
// const asyncHandler = (function) => async() => {}

const asyncHandler = (fn) => async (req, res , next) => {
 try {
       await fn(req,res ,next)
 } 
 catch(error) {
    res.status(err.code || 500).json({   // send json response also 
        success : false,                  // success or false
        message : err.message
    })
 }
}
export {asyncHandler}



// higher order functions => thoes function which can accept functions as parameter and can also return the function. 