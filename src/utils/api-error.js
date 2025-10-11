class ApiError extends Error {
    constructor(
        statuscode,
        errors =  [],
        message ="Something Went Wrong",
        stack =""
    ){
        super(message)
        this.statuscode =statuscode
        this.data = null
        this.sucess  = false
        this.message =message
        this.errors = errors

        if(stack){
            this.stack = stack
        }
        else{
            Error.captureStackTrace(this , this.constructor)
        }
    }
}

export {ApiError};