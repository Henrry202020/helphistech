import { useEffect } from "react";
// Nextjs
import { useRouter } from "next/router";
// Context
import useContextProvider from "@/hooks/useAppContextProvider";

/**
 * Check if user has superadmin permissions */ 
export default function SuperAdminPermissions({ children }) {
    const router = useRouter();

    const { auth, fetchingAuth } = useContextProvider();

    useEffect(() => {
        if(!fetchingAuth && auth.permissions !== 'superadmin') {
            router.push('/admin');
        }
    }, [auth, fetchingAuth])

    return !fetchingAuth && auth.permissions === 'superadmin' && <>{children}</>
}