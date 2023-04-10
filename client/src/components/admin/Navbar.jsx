// Context
import useContextProvider from "@/hooks/useAppContextProvider"

export default function Navbar() {
    
    const { auth, darkMode } = useContextProvider();

    // On click account button -> show/hide account menu
    const handleAccountMenu = () => {
        // ...
    }

    return (
        <div className={`w-full h-14 px-10 border-b ${darkMode ? 'border-neutral-900' : 'border-neutral-100'}`}>
            <div className="flex items-center justify-between h-full">
                <div className="text-light-main uppercase font-semibold text-lg">
                    <span>Helphis Tech</span>
                </div>
                <div className="hidden sm:flex items-center gap-2 cursor-pointer rounded-md transition-colors" onClick={handleAccountMenu}>
                    <div className={`${darkMode ? 'text-dark-text' : 'text-black'}`}>{auth.name}</div>
                    <div className={`grid place-content-center w-10 h-10 ${darkMode ? 'bg-dark-main' : 'bg-light-main'} text-white rounded-full select-none`}>
                        <span className={`font-medium text-xl`}>{auth.name && auth.name.split('')[0]}</span>
                    </div>
                </div>
                <div className="block sm:hidden text-2xl"><i className="fa-regular fa-bars"></i></div>
            </div>
        </div>
    )
}