import { useEffect, useState } from "react"
import { useEditNoteMutation, useGetNoteByIdQuery } from "../features/featuresApi"
import { useNavigate, useParams } from "react-router-dom"
import { TNotes } from "../vite-env";

const Modifica = () => {
    const { id } = useParams()!;
    const navigate = useNavigate();
    const [editNote] = useEditNoteMutation<TNotes>()
    const { data: noteData } = useGetNoteByIdQuery(id!);

    const [formData, setFormData] = useState({
        title: noteData?.title,
        description: noteData?.description,
    });

    useEffect(() => {
        if (noteData) {
            setFormData({
                title: noteData.title || '',
                description: noteData.description || '',
            });
        }
    }, [noteData]);

    const handlerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await editNote({
                _id: id!,
                title: formData.title,
                description: formData.description,
            });

            console.log('Nota modificata con successo:', response);
            navigate("/");
        } catch (error) {
            console.error('Errore durante la modifica della nota:', error);
        }
    }
    return (

        <div className="hero min-h-full ">
            <div className="hero-content text-center">
                <div className="max-w-md">
                    <h1 className="text-5xl font-bold">Modifica la tua Nota</h1>
                    <form onSubmit={handlerSubmit}>
                        <div className="max-w-md flex flex-col gap-2 items-center mt-10">
                            <label >Titolo</label>
                            <input
                                type="text"
                                placeholder="Titolo..."
                                className="input input-bordered max-sm:input-sm w-full max-w-xs"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                required
                            />

                            <label >Descrizione</label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="textarea textarea-bordered max-sm:textarea-sm w-full min-h-[7rem]" placeholder="Descrizione...">

                            </textarea>
                            <button type="submit" className="btn btn-outline btn-primary max-sm:btn-sm transition-all">Modifica
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>





    )
}

export default Modifica
