// Nextjs
import Link from "next/link"
import Image from "next/image";
// Context
import useContextProvider from "@/hooks/useAppContextProvider";

export default function Footer() {

    const { darkMode } = useContextProvider();

    return (
        <footer className={`${darkMode ? 'text-dark border-neutral-900' : 'text-light border-neutral-200'} lazy-load-4 border-t`}>
            <div className="flex flex-col items-start gap-16 py-16 px-16 xl:px-0 max-w-6xl w-full mx-auto">
                <div className="grid md:grid-cols-3 gap-y-10 md:gap-y-0 w-full">
                    <FooterColumn title={"Navegación"}>
                        <div className={`flex flex-col gap-2 ${darkMode ? 'text-dark' : 'text-light'}`}>
                            <Link href={"#"} >
                                <span className="hover:underline hover:text-primary transition-colors">Inicio</span>
                            </Link>
                            <Link href={"#"} >
                                <span className="hover:underline hover:text-primary transition-colors">Servicios</span>
                            </Link>
                            <Link href={"#"} >
                                <span className="hover:underline hover:text-primary transition-colors">Tecnologías</span>
                            </Link>
                            <Link href={"#"} >
                                <span className="hover:underline hover:text-primary transition-colors">Empezar mi proyecto</span>
                            </Link>
                        </div>
                    </FooterColumn>
                    <FooterColumn title={"Redes sociales"}>
                        <div className="flex flex-col gap-2">
                            <Link className="flex items-center gap-2 hover:text-primary transition-colors" href={"https://linkedin.com"}>
                                <div className="grid place-content-center w-4">
                                    <Image src={darkMode ? "/footer/darkmode/linkedin2.webp" : "/footer/linkedin.webp"} width={30} height={26} alt="Linkedin image" />    
                                </div>
                                <div>Linkedin</div>
                            </Link>
                            <Link className="flex items-center gap-2 hover:text-primary transition-colors" href={"https://github.com"}>
                                <div className="grid place-content-center w-4">
                                    <Image src={darkMode ? "/footer/darkmode/github2.webp" : "/footer/github.webp"} width={30} height={26} alt="Github image" />   
                                </div>
                                <div>GitHub</div>
                            </Link>
                            <Link className="flex items-center gap-2 hover:text-primary transition-colors" href={"https://youtube.com/@HelphisTech"}>
                                <div className="grid place-content-center w-4">
                                    <Image src={darkMode ? "/footer/darkmode/youtube2.webp" : "/footer/youtube.webp"} width={30} height={26} alt="Youtube image" />   
                                </div>
                                <div>Youtube</div>
                            </Link>
                            <Link className="flex items-center gap-2 hover:text-primary transition-colors" href={"https://instagram.com"}>
                                <div className="grid place-content-center w-4">
                                    <Image src={darkMode ? "/footer/darkmode/instagram2.webp" : "/footer/instagram.webp"} width={30} height={26} alt="Instagram image" />   
                                </div>
                                <div>Instagram</div>
                            </Link>
                        </div>
                    </FooterColumn>
                    <FooterColumn title={"Contacto"}>
                        <div className={`flex flex-col gap-2`}>
                            <div>
                                <a className="flex items-center gap-2 hover:text-primary transition-colors" href="mailto:helphis.tech@gmail.com">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-[1.1rem] h-[1.1rem] ${darkMode ? 'text-dark' : 'text-light'}`}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                                    </svg>
                                    <span>helphis.tech@gmail.com</span>
                                </a>
                            </div>
                            <div className="text-[.92rem]">
                                <a className="flex items-center gap-2 hover:text-primary transition-colors" href="tel:+490101010101">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-[1.1rem] h-[1.1rem] ${darkMode ? 'text-dark' : 'text-light'}`}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                                    </svg>
                                    <span>49 0101 01 01 01</span>
                                </a>
                            </div>
                        </div>
                    </FooterColumn>
                </div>
            </div>
            <div className={`${darkMode ? 'border-neutral-900 text-neutral-400' : 'border-neutral-300 text-neutral-600'} text-center border-t  py-3`}>
                <div className="text-sm">©Helphis Tech 2023</div>
            </div>
        </footer>
    )
}

function FooterColumn({title, children}) {
    return (
        <div className="flex flex-col gap-5 md:w-fit md:mx-auto">
            <div className="text-2xl font-semibold">{title}</div>
            <div>{children}</div>
        </div>
    )
}