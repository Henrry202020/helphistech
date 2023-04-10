import { useRouter } from "next/router"
import { useEffect } from "react";

export default function Login() {
    const router = useRouter();
    
    useEffect(() => {
        const language = localStorage.getItem('language') || 'de';
        router.push(`/${language}/login`)
    }, [])
}