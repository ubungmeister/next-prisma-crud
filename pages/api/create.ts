import type { NextApiRequest, NextApiResponse } from 'next'
import {PrismaClient} from "@prisma/client/";


export default async function handler(req:NextApiRequest, res:NextApiResponse){

    const prisma = new PrismaClient()
    const {title, content} = req.body

    try{
        await prisma.note.create({
            data:{
                title,
                content
            }
        })
        res.status(200).json({message:'Note Created'})
    }catch (err){
        console.log('error')
    }

}