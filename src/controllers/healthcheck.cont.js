import { Apiresponse } from "../utils/api-response.js";
import {asyncHandler} from "../utils/async-handlers.js"

// const healthCheck = async (req , res ,next) =>{
//     try {
//         // const user = awaits getUserfromDB()
//         res.status(200).json(new Apiresponse(200 , {message:"Server is runnig"}))
//     } catch (error) {
//         next(err)
//     }
// };

const healthCheck = asyncHandler(async (req ,res)=>{
    res.status(200).json(new Apiresponse(200 , {message:"server is still Running"}))
})


export {healthCheck};