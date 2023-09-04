import ApiVideoClient from "@api.video/nodejs-client";
import {Request, Response} from "express";

export default async function handle(req:Request,res:Response) {
    try{
        const client=new ApiVideoClient({
            apiKey:process.env.API_KEY
        })
        if(req.method==="GET"){
            const uploadTokenList= await client.uploadTokens.list();
            res.status(200).json({uploadTokenList});
        }
        else if (req.method === 'POST') {
            const newUploadToken = await client.uploadTokens.createToken()
            res.status(200).json({ newUploadToken })
        } 
        else{
            res.status(405).send("METHOD NOT ALLOWED")
        }
    }catch(error){
        res.status(401).send(error);
    }
}
