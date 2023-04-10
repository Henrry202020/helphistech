import useContextProvider from "@/hooks/useAppContextProvider";

export default function Button({ properties, children }) {
    
    const { classes, handler, disabled } = properties;

    const { darkMode } = useContextProvider();

    return (
        <button 
            onClick={handler.action} 
            className={`${classes} ${disabled ? 'bg-dark-main opacity-80 cursor-not-allowed' : `${darkMode ? 'bg-dark-main hover:text-dark-text hover:border-white' : 'bg-light-main hover:text-light-main hover:border-light-main'} hover:bg-transparent`} text-sm sm:text-base rounded-xl uppercase font-semibold border-2 border-transparent w-full text-white transition-colors select-none`}
        >
            {children}
        </button>
    )
}