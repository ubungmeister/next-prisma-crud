import {FormData} from "@/pages";

export async function createNote(data: FormData) {
    try {
        await fetch('/api/create', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    } catch (err) {
        console.log(err)
    }
}
export async function deleteNote(id: string) {
    try {
        await fetch(`/api/note/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
    } catch (err) {
        console.log(err)
    }
}

export async function updateNote(data:FormData) {
    try {
        await fetch(`/api/note/${data.id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    } catch (err) {
        console.log(err)
    }
}