

const Hero = () => {
    const user = JSON.parse(localStorage.getItem('user') || 'null');


    return (
        <div className="hero min-h-8 ">
            <div className="hero-content text-center">
                <h1 className=" max-sm:text-4xl max-md:text-8xl  text-9xl font-bold">Note di {user.userName || "Utente"}</h1>

            </div>
        </div>
    )
}

export default Hero
