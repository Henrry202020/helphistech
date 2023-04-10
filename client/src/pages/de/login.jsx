// Nextjs
import Image from "next/image"
// Components
import LoginForm from "@/components/de/login/LoginForm"
// Hooks
import useContextProvider from "@/hooks/useAppContextProvider"
import Head from "next/head";

export default function Login() {

    const { darkMode } = useContextProvider();

    return (
        <>
            <Head>
                <title>Helphis Tech | authentifizieren</title>
            </Head>
            <div className={`${darkMode ? 'bg-neutral-900' : 'bg-white'}`}>
                <div className="">
                    <Image className="h-screen -z-1" src={'/login/login_bg.png'} width={1920} height={1080} alt="Login background image" />
                </div>
                <div className={`absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 sm:rounded-xl shadow-xl ${darkMode ? 'bg-neutral-900' : 'bg-zinc-100'} opacity-[97%] login-card`}>
                    <div className="h-full">
                        {/* <div className="absolute top-5 left-5 text-2xl text-light-main font-semibold uppercase">Helphis Tech</div> */}
                        <div className="flex justify-center items-center gap-20 min-h-[30rem] h-full md:max-w-5xl mx-auto px-5 sm:px-10">    
                            <div className="w-1/2 hidden md:block lazy-load-1">
                                <div className="flex justify-center items-center">
                                    <Image className="h-auto w-auto" src={'/login/form_image.png'} width={547} height={461} alt="From image" />
                                </div>
                            </div>
                            <div className="w-full sm:w-2/3 md:w-1/2 lazy-load-1">
                                <LoginForm />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}