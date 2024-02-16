import { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import { useDeleteNotesMutation } from "../features/featuresApi";
import { TNotes } from "../vite-env";

import ReactMarkdown from 'react-markdown';

//https://notes-pbwe.onrender.com/

const ListaNotes = () => {
    const storedUser = JSON.parse(localStorage.getItem('user') || "null");
    const userId = storedUser ? storedUser._id : null;

    const [notes, setNotes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        if (userId) {
            fetchNotes();
        }
    }, [userId]);
    
    const fetchNotes = async () => {
        try {
            const response = await fetch(`https://notes-pbwe.onrender.com/notes`, {
                method: 'GET',
                headers: {
                    'user-id': userId,
                },
            });

            if (!response.ok) {
                throw new Error('Errore durante il fetch delle note');
            }

            const data = await response.json();
            setNotes(data);
            setIsLoading(false);
        } catch (error) {
            console.error('Errore durante il fetch delle note:', error);
            setIsLoading(false);
        }
    };

    const [deleteNote] = useDeleteNotesMutation();
    const handleDeleteNote = async (id: string) => {
        try {
            await deleteNote(id);
            fetchNotes();
        } catch (error) {
            console.error('Errore durante l\'eliminazione della nota:', error);
        }
    };

    return (
        <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4 items-center p-4">
            {isLoading ? <div className=" w-full h-full flex justify-center">
                <span className="loading loading-spinner  w-[30%]"></span>
            </div> : notes?.map((note: TNotes) =>
                <div className="collapse collapse-arrow bg-base-200" key={note._id}>
                    <input type="radio" name="my-accordion-1" />
                    <div className="collapse-title text-xl font-medium">
                        <h1 className=" capitalize">Titolo: {note.title}</h1>
                    </div>
                    <div className="collapse-content">
                        <ReactMarkdown>{note.description}</ReactMarkdown>
                        <div className="flex gap-2">
                            <button onClick={() => handleDeleteNote(note._id)} className="btn btn-outline btn-error mt-6">Elimina</button>
                            <Link to={`/modifica/${note._id}`} >
                                <button type="button" className="btn btn-outline btn-warning mt-6">Modifica</button>
                            </Link>

                        </div>
                    </div>
                </div>
            )
            }

        </div >
    )
}

export default ListaNotes
