// Nextjs
import Link from "next/link"

export default function Footer() {

    // Scroll with navigation buttons
    function handleScrollTo(id) {
        document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
    }

    return (
        <div className="bg-black text-neutral-200 lazy-load-4 border-t border-neutral-900">
            <div className="flex flex-col items-start gap-16 py-16 px-16 xl:px-0 max-w-6xl w-full mx-auto">
                <div className="grid md:grid-cols-3 gap-y-10 md:gap-y-0 w-full">
                    <FooterColumn title={"Contacto"}>
                        <div className="flex flex-col gap-2">
                            <div>
                                <a className="flex items-center gap-2 hover:text-neutral-400" href="mailto:helphistech@gmail.com">
                                    <i className="fa-regular fa-envelope text-neutral-500 w-4"></i>
                                    <span>helphistech@gmail.com</span>
                                </a>
                            </div>
                            <div className="text-[.92rem]">
                                <a className="flex items-center gap-2 hover:text-neutral-400" href="tel:+490101010101">
                                    <i className="fa-regular fa-phone text-neutral-500 w-4"></i>
                                    <span>+49 0101 01 01 01</span>
                                </a>
                            </div>
                        </div>
                    </FooterColumn>
                    <FooterColumn title={"Navegación"}>
                        <div className="flex flex-col gap-2">
                            <div 
                                className={`text-dark-text hover:text-neutral-400 cursor-pointer transition-colors`} 
                                onClick={() => handleScrollTo('index_section_home')}>Inicio</div>
                            <div 
                                className={`text-dark-text hover:text-neutral-400 cursor-pointer transition-colors`} 
                                onClick={() => handleScrollTo('index_section_consult')}>Lo que podemos hacer</div>
                            <div 
                                className={`text-dark-text hover:text-neutral-400 cursor-pointer transition-colors`} 
                                onClick={() => handleScrollTo('index_section_ourjobs')}>Nuestros trabajos</div>
                            <div 
                                className={`text-dark-text hover:text-neutral-400 cursor-pointer transition-colors`} 
                                onClick={() => handleScrollTo('index_section_technologies')}>Tecnologías</div>
                            <div 
                                className={`text-dark-text hover:text-neutral-400 cursor-pointer transition-colors`} 
                                onClick={() => handleScrollTo('index_section_startmyproject')}>Comenzar con mi proyecto</div>
                        </div>
                    </FooterColumn>
                </div>
                <div className="flex justify-start sm:justify-end w-full">
                    <div className="flex items-center gap-3">
                        <Link 
                            className={`grid place-content-center text-xl bg-neutral-200 hover:bg-[#0077b5] text-black hover:text-white w-9 h-9   rounded-full transition-colors`} 
                            href={"https://linkedin.com/in/"} 
                            target="_blank"
                        ><i className="fa-brands fa-linkedin-in"></i></Link>
                        <Link 
                            className={`grid place-content-center text-xl bg-neutral-200 hover:bg-[#6e5494] text-black hover:text-white w-9 h-9   rounded-full transition-colors`} 
                            href={"https://github.com/"} 
                            target="_blank"
                        ><i className="fa-brands fa-github"></i></Link>
                        <Link 
                            className={`grid place-content-center text-xl bg-neutral-200 hover:bg-[#3F3F3F] text-black hover:text-white w-9 h-9   rounded-full transition-colors`} 
                            href={"mailto:helphistech@gmail.com"} 
                            target="_blank"
                        ><i className="fa-regular fa-envelope"></i></Link>
                    </div>
                </div>
            </div>
            <div className="bg-black text-center border-t border-neutral-900 py-3">
                <div className="text-neutral-400 text-sm">©Helphis Tech 2023</div>
            </div>
        </div>
    )
}

function FooterColumn({title, children}) {
    return (
        <div className="flex flex-col gap-5">
            <div className="text-2xl font-semibold">{title}</div>
            <div>{children}</div>
        </div>
    )
}