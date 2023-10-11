/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../features/featuresUsers";
import { useState } from "react";
import { TUsers } from "../vite-env";

import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState<TUsers>({
        _id: "",
        userName: '',
        password: ''
    });
    const [loginUser, { data, isLoading, error }] = useLoginUserMutation();
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
            const response = await loginUser({
                userName: formData.userName,
                password: formData.password
            });


            if ("data" in response) {
                const user = response.data.user;
                localStorage.setItem('user', JSON.stringify(user));
                success();
                navigate("/");
            }

        } catch (error) {
            // Gestione dell'errore
            success();
            console.error('Errore durante la registrazione:', error);
        }
    }


    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Accedi!</h1>
                    <p className="py-6"></p>
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handlerSubmit} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">UserName</span>
                            </label>
                            <input
                                onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
                                type="UserName" placeholder="UserName" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                type="password" placeholder="password" className="input input-bordered" required />
                            <label className="label">
                                <Link to="/users/register" className="label-text-alt link link-hover">Non sei registrato?</Link>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button type="submit" className="btn btn-primary">Accedi</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
