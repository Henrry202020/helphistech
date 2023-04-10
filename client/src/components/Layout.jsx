import Head from "next/head";
// DE Components
import NavbarDE from "./de/Navbar";
import FooterDE from "./de/Footer";
import ProjectQuoteDE from "./de/ProjectQuote";
// EN Components
import NavbarEN from "./en/Navbar";
import FooterEN from "./en/Footer";
import ProjectQuoteEN from "./en/ProjectQuote";
// ES Components
import NavbarES from "./es/Navbar";
import FooterES from "./es/Footer";
import ProjectQuoteES from "./es/ProjectQuote";
// Hooks
import useContextProvider from "@/hooks/useAppContextProvider";

export default function Layout({ title, children }) {

    // Get functions and variables from context
    const { language, darkMode, showProjectQuote } = useContextProvider();

    return(
        <>
            <Head>
                <title>Helphis Tech | {title}</title>
            </Head>
            <div className={`${darkMode ? 'bg-darkmode' : 'bg-white'} transition-colors`}>
                <div>
                    { language == 'de' && <NavbarDE /> }
                    { language == 'en' && <NavbarEN /> }
                    { language == 'es' && <NavbarES /> }
                </div>
                <div>
                    {children}
                    {showProjectQuote && (
                        <>
                            { language == 'de' && <ProjectQuoteDE /> }
                            { language == 'en' && <ProjectQuoteEN /> }
                            { language == 'es' && <ProjectQuoteES /> }
                        </>
                    )}
                </div>
                <div>
                    { language == 'de' && <FooterDE /> }
                    { language == 'en' && <FooterEN /> }
                    { language == 'es' && <FooterES /> }
                </div>
            </div>
        </>
    )
}