
import { constants } from "../constants.js"


export const errorHandler =  ( err,req, res  , next)=>{
const statusCode = res.statusCode ? res.statusCode : 500
switch (statusCode) {
    case constants.FORBIDDEN:
        res.json({ error:{  message:err.message , stackTrace:err.stack}})
        
        break;
        case constants.NOTFOUND :
            res.json({
               error:{
                title:"Not Found",
                message:err.message,
                stackTrace:err.stack
               }
            })
            break
            case constants.UNAUTHORIZE:
                res.json({
             error:{
                       
                title:"Un Authorize",
                message:err.message,
            stackTrace:err.stack
             }
                });
                break

                case constants.VALIDATION_ERRORl:
                    res.json({
                        error:{

                            title:"Validation failed",
                            message:err.message,
                            stackTrace:err.stack

                        }
                    });
                    break

                    case 500:
                        res.json({
                            title:"Validation failed",
                            message:err.message,
                            stackTrace:err.stack
                        });
                        break
    default:
        console.log("no error   ")
        break;
}



}
