// Next
import Link from "next/link";
import { useRouter } from "next/router";
// Components
import Button from "../Button";
// Hooks
import useContextProvider from "../../hooks/useAppContextProvider";
import { useEffect, useState } from "react";

export default function Navbar() {
    
    // Mobile hamburger menu
    const [ showMenu, setShowMenu ] = useState(false);
    const [ closeAnimation, setCloseAnimation ] = useState(false);
    const handleShowMenu = () => {
        setShowMenu(!showMenu);
    }
    useEffect(() => {
        showMenu ? document.body.style.overflowY = 'hidden' : document.body.style.overflowY = 'auto';
    }, [showMenu])
    function handleCloseAnimation() {
        setCloseAnimation(true);
        setTimeout(() => {
            setShowMenu(false);
            setCloseAnimation(false);
        }, 270)
    }

    // Get functions and variables from context
    const { darkMode, handleDarkMode, language, setLanguage, showProjectQuote, handleShowProjectQuote } = useContextProvider();
    
    const router = useRouter();

    function handleChangeLanguage(e) {
        const language = e.target.value;
        setLanguage(language);
        localStorage.setItem('language', language);
        router.push(`/${language}`)
    }

    function handleScrollTo(id) {
        document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
    }

    return(
        <>
            <header className={`flex flex-col gap-2 justify-center h-20 lg:h-24 2xl:h-28 px-3 sm:px-10 border-b ${darkMode ? 'border-neutral-900' : 'border-zinc-200'} sm:border-none transition-colors`}>
                <nav className="flex flex-row gap-0 items-center justify-between w-full">
                    <div className={`${showProjectQuote ? 'invisible' : 'visible'} transition-colors`}>
                        <Link href={"/"}>
                            <div className={`uppercase font-bold text-2xl text-light-main`}>Helphis Tech</div>
                        </Link>
                    </div>
                    <button className={`block md:hidden text-2xl ${darkMode ? 'text-white' : 'text-black'}`} onClick={handleShowMenu}>
                        <i className="fa-solid fa-bars"></i>
                    </button>
                    <div className={`hidden md:flex flex-row items-center gap-5 ${showProjectQuote ? 'hidden' : 'block'}`}>
                        <div className="flex items-center gap-3">
                            <div onClick={handleDarkMode} className={`text-2xl cursor-pointer ${darkMode ? 'text-dark-text' : 'text-black'} transition-colors`}>
                                { darkMode == 'dark' ? (
                                    <i className="fa-solid fa-sun"></i>
                                ) : (
                                    <i className="fa-solid fa-moon"></i>
                                )}
                            </div>
                            <div className="text-xl">
                                <select className={`cursor-pointer ${darkMode ? 'text-dark-text' : 'text-black'} bg-transparent transition-colors`} onChange={handleChangeLanguage} name="" id="" value={language}>
                                    <option value="de">DE</option>
                                    <option value="en">EN</option>
                                    <option value="es">ES</option>
                                </select>
                            </div>
                        </div>
                        <Button properties={{ 
                            classes: "py-2 px-4 w-fit 2xl:text-2xl 2xl:px-6 2xl:py-3", 
                            handler: { action: handleShowProjectQuote } 
                        }}>Schätzen Sie Ihr Projekt</Button>
                    </div>
                </nav>
                <div className="hidden lg:flex justify-center items-center gap-5 uppercase font-medium">
                    <div 
                        className={`${darkMode ? 'text-dark-text hover:text-dark-main' : 'text-black hover:text-light-main'} cursor-pointer transition-colors`} 
                        onClick={() => handleScrollTo('index_section_home')}>Startseite</div>
                    <div 
                        className={`${darkMode ? 'text-dark-text hover:text-dark-main' : 'text-black hover:text-light-main'} cursor-pointer transition-colors`} 
                        onClick={() => handleScrollTo('index_section_consult')}>WAS WIR TUN KÖNNEN</div>
                    <div 
                        className={`${darkMode ? 'text-dark-text hover:text-dark-main' : 'text-black hover:text-light-main'} cursor-pointer transition-colors`} 
                        onClick={() => handleScrollTo('index_section_ourjobs')}>Unsere Arbeitsplätze</div>
                    <div 
                        className={`${darkMode ? 'text-dark-text hover:text-dark-main' : 'text-black hover:text-light-main'} cursor-pointer transition-colors`} 
                        onClick={() => handleScrollTo('index_section_technologies')}>Technologien</div>
                    <div 
                        className={`${darkMode ? 'text-dark-text hover:text-dark-main' : 'text-black hover:text-light-main'} cursor-pointer transition-colors`} 
                        onClick={() => handleScrollTo('index_section_startmyproject')}>Beginnen Sie mit meinem Projekt</div>
                </div>
            </header>
            { showMenu && (
                <NavbarMobileMenu 
                    closeAnimation={closeAnimation} 
                    closeMenu={handleCloseAnimation}
                />
            ) }
        </>
    )
}

function NavbarMobileMenu({ closeAnimation, closeMenu }) {

    const router = useRouter();

    const { darkMode, handleDarkMode, language, setLanguage, handleShowProjectQuote } = useContextProvider();

    function handleChangeLanguage(e) {
        const language = e.target.value;
        setLanguage(language);
        localStorage.setItem('language', language);
        router.push(`/${language}`)
    }

    function handleScrollTo(id) {
        closeMenu();
        document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
    }

    return (
        <>
            <div className="fixed top-0 left-0 w-screen h-screen bg-black opacity-60" onClick={closeMenu}></div>
            <div className={`${closeAnimation ? 'full-screen-menu-close' : 'full-screen-menu-open'} fixed top-0 right-0 w-[85vw] h-screen ${darkMode ? 'bg-darkmode text-dark-text border-l border-neutral-900' : 'bg-white text-black'} shadow-lg transition-colors`}>
                <div className={`${closeAnimation ? 'hidden' : null} h-full lazy-load-1`}>
                    <button onClick={closeMenu} className="absolute top-4 right-5 text-3xl">
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                    <div className="flex flex-col justify-between items-center gap-10 h-full mx-auto py-16">
                        <div className="flex flex-col items-center gap-10 w-full px-6">
                            {/* <Link href={"/"}>
                                <div className={`uppercase font-bold text-2xl text-white`}>Helphis Tech</div>
                            </Link> */}
                            <div className={`flex flex-col text-xl ${darkMode ? 'font-normal' : 'font-medium'} items-start gap-5 w-full`}>
                                <div 
                                    className="" 
                                    onClick={() => handleScrollTo('index_section_home')}>Startseite</div>
                                <div 
                                    className="" 
                                    onClick={() => handleScrollTo('index_section_consult')}>wir raten Ihnen</div>
                                <div 
                                    className="" 
                                    onClick={() => handleScrollTo('index_section_ourjobs')}>Unsere Arbeitsplätze</div>
                                <div 
                                    className="" 
                                    onClick={() => handleScrollTo('index_section_technologies')}>Technologien</div>
                                <div 
                                    className="" 
                                    onClick={() => handleScrollTo('index_section_startmyproject')}>Beginnen Sie mit meinem Projekt</div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-5 items-center">
                            <div className="flex items-center gap-6">
                                <div onClick={handleDarkMode} className={`text-2xl cursor-pointer transition-colors`}>
                                    { darkMode == 'dark' ? (
                                        <i className="fa-solid fa-sun"></i>
                                    ) : (
                                        <i className="fa-solid fa-moon"></i>
                                    )}
                                </div>
                                <div className="text-xl">
                                    <select className={`cursor-pointer bg-transparent text-black bg-white rounded-md px-2 py-1`} onChange={handleChangeLanguage} name="" id="" value={language}>
                                        <option value="de">DE</option>
                                        <option value="en">EN</option>
                                        <option value="es">ES</option>
                                    </select>
                                </div>
                            </div>
                            <Button properties={{ 
                                classes: "w-fit text-2xl px-6 py-3", 
                                handler: { action: handleShowProjectQuote } 
                            }}>Schätzen Sie Ihr Projekt</Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}