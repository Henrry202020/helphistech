// Hooks
import Layout from "@/components/admin/AdminLayout";
import useContextProvider from "@/hooks/useAppContextProvider"

export default function AdminIndex() {
    
    const { darkMode, auth } = useContextProvider();

    return (
        <Layout title={"Panel de administración"}>
            <div className={`${darkMode ? 'text-dark-text' : 'text-black'} lazy-load-1`}>
                <div className="text-3xl font-medium text-center">Bienvenido, {auth.name}.</div>
            </div>
        </Layout>
    )
}