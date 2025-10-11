import { Apiresponse } from "../utils/api-response.js";

const healthCheck = (req , res) =>{
    try {
        res.status(200).json(new Apiresponse(200 , {message:"Server is runnig"}))
    } catch (error) {
        
    }
};

export {healthCheck};