import type { NextApiRequest, NextApiResponse } from 'next'
import {PrismaClient} from "@prisma/client/";
const prisma = new PrismaClient()

export default async function handler(req:NextApiRequest, res:NextApiResponse){
    const  noteId = req.query.id

    if(req.method ==='DELETE'){
        const note = await prisma.note.delete({
            where:{id:Number(noteId)}
        })
        res.json(note)
    }else {
        console.log('Note could not be deleted')
    }
    if( req.method ==='PUT'){
        const {title, content} = req.body
        const note = await prisma.note.update({
            where:{id:Number(noteId)},
            data:{title:title, content:content}
        })
        res.json(note)
    }else {
        console.log('Could not update')
    }

}