import Head from "next/head";
// DE Components
import NavbarDE from "./Navbar";
import FooterDE from "./Footer";
// EN Components
import NavbarEN from "./en/Navbar";
import FooterEN from "./en/Footer";
// ES Components
import NavbarES from "./es/Navbar";
import FooterES from "./es/Footer";
// Hooks
import useContextProvider from "@/hooks/useAppContextProvider";

export default function Layout({ title, children }) {

    // Get functions and variables from context
    const { language, darkMode } = useContextProvider();

    return(
        <>
            <Head>
                <title>Helphis Tech | {title}</title>
            </Head>
            <div className={`${darkMode ? 'bg-darkmode text-zinc-200' : 'bg-white text-black'} transition-colors`}>
                {/* Navbar */}
                { language == 'de' && <NavbarDE /> }
                { language == 'en' && <NavbarEN /> }
                { language == 'es' && <NavbarES /> }
                {/* Page content */}
                {children}
                {/* Footer */}
                { language == 'de' && <FooterDE /> }
                { language == 'en' && <FooterEN /> }
                { language == 'es' && <FooterES /> }
            </div>
        </>
    )
}