import axios from "axios";
// React
import { createContext, useEffect, useState } from "react";
// Nextjs
import { useRouter } from "next/router";

const AppContext = createContext();

const AppContextProvider = ({children}) => {
    
    const router = useRouter();

    // Language and dark mode settings
    const [ language, setLanguage ] = useState('de');
    const [ darkMode, setDarkMode ] = useState(false);
    // On component load load:
    useEffect(() => {
        // Use saved localStorage language or 'de'(german)
        const urlLanguage = router.pathname.split('/')[1];
        const localStorageLanguage = localStorage.getItem('language') || 'de';
        setLanguage(urlLanguage != localStorageLanguage ? urlLanguage : localStorageLanguage);
        // Use saved localStorage theme or 'light'(lightmode)
        setDarkMode(JSON.parse(localStorage.getItem('darkmode')) || false);
    }, []);

    // User Authentication
    const [ auth, setAuth ] = useState({});
    const [ fetchingAuth, setFetchingAuth ] = useState(true);

    // Check user authentication
    useEffect(() => {
        // Get authentication token from localStorage
        const token = localStorage.getItem('auth-token');
        if(!token) {
            setFetchingAuth(false);
            return;
        }

        const config = {
            headers: {
                "Content-Type": "application-json",
                Authorization: `Bearer ${token}`
            }
        }

        getProfile(config);
    }, [])

    async function getProfile(config) {
        try {
            const { data } = await axios.post('/api/getProfile', { config, language });
            setAuth(data);
        } catch (error) {
            setAuth({});
        } finally {
            setFetchingAuth(false);
        }
    }

    // Toggle dark mode on/off
    const handleDarkMode = () => {
        setDarkMode(current => !current);
        // Set theme on localStorage
        darkMode ? localStorage.setItem('darkmode', false) : localStorage.setItem('darkmode', true);
    }
    
    const [ showProjectQuote, setShowProjectQuote ] = useState(false);
    // Show and hide Project Quote Menu
    const handleShowProjectQuote = () => {
        // Stop menu close animation
        setProjectQuoteAnimation(false);
        // Show/hide menu
        setShowProjectQuote(current => !current);
        // If menu is closed set overflow auto else set overflow hidden to prevent page scrolling
        showProjectQuote ? document.body.style.overflowY = 'auto' : document.body.style.overflowY = 'hidden';
    }

    const [ projectQuoteAnimation, setProjectQuoteAnimation ] = useState(false);
    // Apply delay on close Project Quote menu to see close animation
    const handleCloseProjectQuote = () => {
        // Show menu animation
        setProjectQuoteAnimation(true);
        // After 270ms close menu
        setTimeout(() => {
            handleShowProjectQuote();
        }, 270)
    }

    return (
        <AppContext.Provider value={{
            auth, 
            setAuth,
            fetchingAuth,
            language,
            setLanguage,
            handleDarkMode,
            darkMode,
            showProjectQuote,
            handleShowProjectQuote,
            projectQuoteAnimation,
            setProjectQuoteAnimation,
            handleCloseProjectQuote
        }}>
            {children}
        </AppContext.Provider>
    )
}

export {
    AppContextProvider
}

export default AppContext