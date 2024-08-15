// this file used id used to handle the api errors 
// the class Error is a in built class. check mdn docs in node for more info
class ApiError extends Error {
    constructor(
        statusCode,
        message = "Something went wrong",
        errors = [],
        stack = ""
    ){
        super(message)
        this.statusCode = statusCode
        this.data =null
        this.message = message
        this.success = false;
        this.error = errors


        if(stack) {
            this.stack = stack
        }
        else {
            Error.captureStackTrace(this,this.constructor)
        }
    }
}

export {ApiError}