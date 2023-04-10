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
                    <FooterColumn title={"Redes sociales"}>
                        <div className="flex flex-col gap-2">
                            <Link className="flex items-center gap-2 hover:text-neutral-400" href={"https://linkedin.com"}>
                                <div className="grid place-content-center w-4"><i className="fa-brands fa-linkedin-in"></i></div>
                                <div>Linkedin</div>
                            </Link>
                            <Link className="flex items-center gap-2 hover:text-neutral-400" href={"https://github.com"}>
                                <div className="grid place-content-center w-4"><i className="fa-brands fa-github"></i></div>
                                <div>GitHub</div>
                            </Link>
                            <Link className="flex items-center gap-2 hover:text-neutral-400" href={"https://youtube.com/@HelphisTech"}>
                                <div className="grid place-content-center w-4"><i class="fa-brands fa-youtube"></i></div>
                                <div>Youtube</div>
                            </Link>
                            <Link className="flex items-center gap-2 hover:text-neutral-400" href={"https://instagram.com"}>
                                <div className="grid place-content-center w-4"><i class="fa-brands fa-instagram"></i></div>
                                <div>Instagram</div>
                            </Link>
                            <Link className="flex items-center gap-2 hover:text-neutral-400" href={"https://twitter.com/"}>
                                <div className="grid place-content-center w-4"><i class="fa-brands fa-twitter"></i></div>
                                <div>Twitter</div>
                            </Link>
                        </div>
                    </FooterColumn>
                    <FooterColumn title={"Contacto"}>
                        <div className="flex flex-col gap-2">
                            <div>
                                <a className="flex items-center gap-2 hover:text-neutral-400" href="mailto:helphis.tech@gmail.com">
                                    <div className="grid place-content-center w-4"><i className="fa-regular fa-envelope text-neutral-500"></i></div>
                                    <div>helphis.tech@gmail.com</div>
                                </a>
                            </div>
                            <div className="text-[.92rem]">
                                <a className="flex items-center gap-2 hover:text-neutral-400" href="tel:+490101010101">
                                    <div className="grid place-content-center w-4"><i className="fa-regular fa-phone text-neutral-500"></i></div>
                                    <div>+49 0101 01 01 01</div>
                                </a>
                            </div>
                        </div>
                    </FooterColumn>
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
        <div className="flex flex-col gap-5 md:w-fit md:mx-auto">
            <div className="text-2xl font-semibold">{title}</div>
            <div className="">{children}</div>
        </div>
    )
}