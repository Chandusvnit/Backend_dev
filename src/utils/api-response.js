class Apiresponse{
    constructor(statusCode , data , message = "sucess"){
        this.data = data
        this.message = message
        this.statusCode = statusCode
        this.sucess = statusCode < 400
    }
}

export {Apiresponse};