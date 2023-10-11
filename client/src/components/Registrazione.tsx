/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useCreateUserMutation } from "../features/featuresUsers";
import { useNavigate } from "react-router-dom";
import { TUsers } from "../vite-env";

import { toast } from 'react-toastify';
import { Link } from "react-router-dom";
const Registrazione = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<TUsers>({
        _id: '',
        userName: '',
        password: ''
    });
    const [createUser, { data, isLoading, error }] = useCreateUserMutation();
    const ok = data?.message || (error as any)?.data.error
    const success = () => toast(ok, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    });


    success();

    if (isLoading) {
        return (
            <div className=" w-full h-screen flex justify-center">
                <span className="loading loading-spinner  w-[30%]"></span>

            </div>
        )
    }
    const handlerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await createUser({
                userName: formData.userName,
                password: formData.password
            });
            if (data.message) {
                success();
                navigate("/users/login");
            }
        } catch (error) {
            console.error('Errore durante la registrazione:', error);

        }
    }
    return (
        <div className="hero min-h-screen bg-[#100E0E] ">
            <div className="hero-content flex-col lg:flex-row-reverse">

                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Registrati ora ! </h1>
                    <p className="py-6">Entra e potrai aggiungere nuove note o appunti. Tutto quello che vuoi!</p>
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handlerSubmit} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">UserName</span>
                            </label>
                            <input
                                onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
                                type="UserName"
                                placeholder="UserName"
                                className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                type="password" placeholder="password" className="input input-bordered" required />
                            <label className="label">
                                <Link to="/users/login" className="label-text-alt link link-hover">Già registrato?</Link>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button type="submit" className="btn btn-primary">Registrati</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Registrazione
