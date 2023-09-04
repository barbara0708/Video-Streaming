import ApiVideoClient from "@api.video/nodejs-client";
import {Request, Response} from "express";

export default async function handle(req:Request,res:Response) {
    try{
        const client=new ApiVideoClient({
            apiKey:process.env.API_KEY
        })
        if(req.method==="GET"){
            const uploadTokenList= await client.uploadTokens.list();
            res.status(200).json({})
        }
    }catch(error){
        res.status(400).send(console.error);

    }
}
