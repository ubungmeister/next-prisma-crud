import {PrismaClient} from "@prisma/client";
import {FormEvent, useState} from "react";
import {GetServerSideProps} from "next";
import {useRouter} from "next/router";
import {createNote, deleteNote, updateNote} from "@/lib/utils";


export type  FormData = {
    title: string
    content: string
    id: string
}

type DataFromDB = {
    data: FormData[]
}

const prisma = new PrismaClient()

export default function Home({data}: DataFromDB) {
    const initialState = {title: '', content: '', id: ''}
    const [formData, setFormData] = useState<FormData>(initialState)
    const router = useRouter();

    const onFormHandler = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (!formData.id) {
            await createNote(formData)
        } else {
            await updateNote(formData)
        }
        await router.push(router.asPath)

    }
    const onDeleteHandler = async (id: string) => {
        const result = await deleteNote(id)
        await router.push(router.asPath)
    }

    const onUpdateHandler = async (id: string) => {
        const noteUpdate = data.find(note => note.id === id)
        if (noteUpdate) {
            setFormData({...formData, id: noteUpdate.id, content: noteUpdate.content, title: noteUpdate.title})
        }
    }

    return (
        <div className='min-h-screen bg-white  space-x-1 pt-10 space-y-8'>
            <form className='rounded-md text-center border-2 min-w-[25%] max-w-min mx-auto space-y-5 flex flex-col items-stretch w-auto py-4 px-4'
                  onSubmit={(e) => onFormHandler(e)}>
                <h1 className='font-bold text-xl '>Notes</h1>
                <input className='px-2 rounded-md border-2 border-solid focus:outline-blue-200'
                       placeholder={'Title'}
                       value={formData.title}
                       onChange={(e) => setFormData({...formData, title: e.target.value})}/>
                <textarea className='px-2 rounded-md border-2 border-solid focus:outline-blue-200'
                    placeholder={'Content'}
                    value={formData.content}
                    onChange={(e) => setFormData({...formData, content: e.target.value})}/>

                    <button className='bg-blue-500 text-white rounded-md py-1 hover:bg-blue-800'
                        type='submit'>Add+</button>
            </form>
            <div className='mx-auto'>
            <ul className=' min-w-[25%] max-w-min mt-20 mx-auto space-y-6 flex flex-col content-center '>
                {data.map((note) => {
                    return (
                        <li key={note.id} className=''>
                            <div className='flex justify-between border-b border-gray-500'>
                                <div className='flex-1'>
                                    <div className='font-bold'>{note.title}</div>
                                    <div className=''>{note.content}</div>
                                </div>
                                <div className='flex flex-row space-x-1 justify-center mx-auto'>
                                    <button className='bg-blue-500 text-white px-1 rounded-md h-12 hover:bg-blue-800'
                                            onClick={() => onUpdateHandler(note.id)}>update</button>
                                    <button className='bg-red-500 text-white px-1 rounded-md h-12 hover:bg-red-800'
                                            onClick={(e) => onDeleteHandler(note.id)}>delete</button>
                                </div>

                            </div>

                        </li>
                    )
                })}
            </ul>
            </div>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async () => {
    const data = await prisma.note.findMany({
        select: {
            title: true,
            id: true,
            content: true
        }
    })
    return {
        props: {
            data
        }
    }
}