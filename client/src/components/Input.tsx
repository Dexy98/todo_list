import { useState } from "react"
import { useCreateNoteMutation } from "../features/featuresApi"
import { useNavigate } from "react-router-dom";
const Input = () => {
    const navigate = useNavigate();
    const [createNote] = useCreateNoteMutation()
    const [formData, setFormData] = useState({
        title: '',
        description: ''
    });
    const user = JSON.parse(localStorage.getItem('user') || 'null');

    const handlerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await createNote({
            _id: "123456",
            title: formData.title,
            description: formData.description,
            userId: user._id
        });
        navigate("/");
    }
    return (

        <div className="hero min-h-full ">
            <div className="hero-content text-center">
                <div className="max-w-md">
                    <h1 className="text-5xl font-bold">Aggiungi la tua Nota</h1>
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
                                className="textarea textarea-bordered max-sm:textarea-sm w-full" placeholder="Descrizione...">

                            </textarea>
                            <button type="submit" className="btn btn-outline btn-primary max-sm:btn-sm transition-all">Aggiungi</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>





    )
}

export default Input
