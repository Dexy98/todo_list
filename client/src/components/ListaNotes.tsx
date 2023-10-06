import { useDeleteNotesMutation, useGetNotesQuery } from "../features/featuresApi";
import { TNotes } from "../vite-env";

import ReactMarkdown from 'react-markdown';



const ListaNotes = () => {
    const { data, isLoading } = useGetNotesQuery();
    console.log(data, isLoading);
    const [deleteNote] = useDeleteNotesMutation();

    const handleDeleteNote = async (id: string) => {
        try {
            await deleteNote(id)
        } catch (error) {
            console.error('Errore durante l\'eliminazione della nota:', error);
        }
    };

    return (
        <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4 items-center p-4">
            {isLoading ? <div>loading</div> : data?.map((note: TNotes) =>
                <div className="collapse collapse-arrow bg-base-200" key={note._id}>
                    <input type="radio" name="my-accordion-1" />
                    <div className="collapse-title text-xl font-medium">
                        <h1 className=" capitalize">Titolo: {note.title}</h1>
                    </div>
                    <div className="collapse-content">
                        <ReactMarkdown>{note.description}</ReactMarkdown>
                        <button onClick={() => handleDeleteNote(note._id)} className="btn btn-outline btn-error mt-6">Elimina</button>
                    </div>
                </div>
            )}

        </div>
    )
}

export default ListaNotes
