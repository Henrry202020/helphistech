// Nextjs
import { useRouter } from "next/router";
import Link from "next/link";
// Context
import useContextProvider from "@/hooks/useAppContextProvider";

export default function Sidebar() {
    
    const { darkMode } = useContextProvider();

    const router = useRouter();
    const language = router.pathname.split('/')[1];

    // On click account button -> show/hide account menu
    const handleAccountMenu = () => {
        // ...
    }

    return (
        <div className={`flex flex-col justify-between gap-10 w-[3.5rem] lg:w-[17rem] border-r ${darkMode ? 'border-neutral-900' : 'border-neutral-100'}`} style={{height: 'calc(100vh - 3.5rem)'}}>

            <div className="flex flex-col gap-3 lg:px-5 pt-5">
                <SidebarSection title={"Panel de control"} permissions={"admin"}>
                    <SidebarItem 
                        permissions={"admin"}
                        icon={'fa-regular fa-home'}
                        href={`/admin`}
                    >Inicio</SidebarItem>
                </SidebarSection>
                <SidebarSection title={"Proyectos"} permissions={"admin"}>
                    <SidebarItem 
                        permissions={"admin"}
                        icon={'fa-regular fa-rectangle-history-circle-user'}
                        href={`/admin/projects`}
                    >Recibido</SidebarItem>
                    <SidebarItem 
                        permissions={"superadmin"}
                        icon={'fa-regular fa-folder-xmark'}
                        href={`/admin/projects/cancelled`}
                    >Cancelado</SidebarItem>
                </SidebarSection>
                <SidebarSection title={"Videollamadas"} permissions={"admin"}>
                    <SidebarItem 
                        permissions={"admin"}
                        icon={'fa-regular fa-video'}
                        href={`/admin/projects`}
                    >Recibido</SidebarItem>
                    <SidebarItem 
                        permissions={"superadmin"}
                        icon={'fa-regular fa-video-slash'}
                        href={`/admin/projects/cancelled`}
                    >Cancelado</SidebarItem>
                </SidebarSection>
                <SidebarSection title={"Usuarios"} permissions={"superadmin"}>
                    <SidebarItem 
                        permissions={"superadmin"}
                        icon={'fa-regular fa-user'}
                        href={`/admin/accounts`}
                    >Cuentas</SidebarItem>
                    <SidebarItem 
                        permissions={"superadmin"}
                        icon={'fa-regular fa-user-plus'}
                        href={`/admin/accounts/create`}
                    >Crear cuenta</SidebarItem>
                </SidebarSection>
            </div>

            <div className={`border-t ${darkMode ? 'border-neutral-900' : 'border-neutral-200'} lg:px-5 pb-5 pt-5`}>
                <div className="flex flex-col gap-1">
                    <SidebarItem
                        permissions={"admin"}
                        icon={'fa-regular fa-user'}
                        href={"/admin/myaccount"}
                    >Mi cuenta</SidebarItem>
                </div>
            </div>

        </div>
    )
}

function SidebarSection({ children, title, permissions }) {
    
    const { darkMode, auth } = useContextProvider();

    return (
        <div className={`${auth.permissions == 'superadmin' ? 'flex' : permissions === auth.permissions ? 'flex' : 'hidden'} flex flex-col gap-2`}>
            <div className={`${darkMode ? 'text-zinc-400' : 'text-zinc-600'} hidden lg:block uppercase font-semibold text-sm`}>{title}</div>
            <div className="flex flex-col gap-1">{children}</div>
        </div>
    )
}

function SidebarItem({ children, icon, href, permissions }) {
    
    const { darkMode, auth } = useContextProvider();

    return (
        <Link href={href} className={`${auth.permissions == 'superadmin' ? 'flex' : permissions === auth.permissions ? 'flex' : 'hidden'} flex justify-center`}>
            <button className={`${darkMode ? 'text-dark-text hover:bg-dark-main' : 'text-black hover:bg-light-main'} flex items-center justify-center lg:justify-start gap-2 lg:rounded-md py-2 lg:px-4 w-full hover:text-white uppercase font-semibold text-left transition-colors select-none`}>
                <div><i className={`${icon} text-xl`}></i></div>
                <div className="hidden lg:block">{children}</div>
            </button>
        </Link>
    )
}