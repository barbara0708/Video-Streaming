import ApiVideoClient from "@api.video/nodejs-client";
import {Request, Response} from "express";

export default async function handle(req:Request,res:Response) {
    try{
        
        if(req.method==="GET"){
            
        }
        else if (req.method === 'POST') {
            
        } 
        else{
            res.status(405).send("METHOD NOT ALLOWED")
        }
    }catch(error){
        res.status(401).send(error);
    }
}
