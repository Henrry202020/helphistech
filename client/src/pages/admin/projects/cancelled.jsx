import axios from "axios";
// React
import { useEffect, useState } from "react";
// Nextjs
import { useRouter } from "next/router";
// Layout
import AdminLayout from "@/components/admin/AdminLayout";
// Context
import useContextProvider from "@/hooks/useAppContextProvider";
// Money formatter
import currencyFormatter from "@/hooks/currencyFormatter";
// Date and hour formatter
import moment from "moment";
import SuperAdminPermissions from "@/components/admin/SuperAdminPermissions";

export default function CancelledProjects() {
    
    const { darkMode } = useContextProvider();

    // Projects data
    const [ projects, setProjects ] = useState([]);

    // On component load fetch projects
    useEffect(() => {
        getProjects();
    }, [])

    // Fetch projects
    async function getProjects() {
        // Get authentication token from localStorage
        const token = localStorage.getItem('auth-token');
        if(!token) {
            return;
        }

        const config = {
            headers: {
                "Content-Type": "application-json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const { data } = await axios.post(`/api/admin/getProjects`, { config });
            const projects = data.filter(project => project.state === 'cancelled');
            setProjects(projects);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <SuperAdminPermissions>
            <AdminLayout title={'Proyectos canelados'}>
                <div className={`${darkMode ? 'text-dark-text' : 'text-black'} h-full lazy-load-1`}>
                    <div className={`${projects.length === 0 ? 'grid place-content-center' : 'flex flex-col gap-2'} py-3 h-full`}>
                        {projects.length !== 0 && projects.map((project, i) => (
                            <Project key={i} project={project} />
                        ))}
                        {projects.length === 0 && (
                            <div className="grid place-content-center text-center">
                                <span className="text-xl uppercase font-semibold">No hay proyectos cancelados aún.</span>
                            </div>
                        )}
                    </div>
                </div>
            </AdminLayout>
        </SuperAdminPermissions>
    )
}

function Project({ project }) {

    const { darkMode } = useContextProvider();

    const router = useRouter();

    const redirectToProject = (id) => {
        router.push(`/admin/project/${id}`)
    }

    const { _id, website_type, budget, description, state, createdAt } = project;

    return (
        <div className={`gap-5 px-5 py-4 shadow-md rounded-lg ${darkMode ? 'bg-neutral-900' : 'bg-white'}`}>
            <div className="flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row sm:gap-2 text-xl">
                    <div className="font-bold uppercase">Tipo de software</div>
                    <div className="hidden sm:block">-</div>
                    <div className={`font-semibold ${darkMode ? 'text-dark-main' : 'text-light-main'}`}>{website_type == 'website' ? 'Sitio web' : website_type == 'ecommerce' ? 'E-Commerce' : website_type == 'app' && 'Aplicación'}</div>    
                </div>
                <div className="flex flex-col">
                    <div className="font-bold uppercase">Descripción</div>
                    <div className={`${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>{description}</div>    
                </div>
                <div className="flex flex-col">
                    <div className="font-bold uppercase">Presupuesto</div>
                    <div className="flex items-center gap-1">
                        <div className={`${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>Entre</div>
                        <div className="font-semibold">{currencyFormatter(budget.from)}</div>    
                        <div className={`${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>y</div>
                        <div className="font-semibold">{currencyFormatter(budget.to)}</div>    
                    </div>    
                </div>
                <div className="font-semibold text-sm">{moment(createdAt).format('LLL')}</div>
                <div className="flex flex-col sm:flex-row gap-5 sm:gap-0 sm:justify-between">
                    <div className="flex items-center gap-4">
                        <div className={`${state == 'onhold' ? 'bg-yellow-500' : state == 'inprogress' ? 'bg-orange-500' : state == 'completed' ? 'bg-light-main' : 'bg-red-500'} px-2 py-1 rounded-md text-white uppercase w-fit font-semibold select-none`}>{state == 'onhold' ? 'En espera' : state == 'inprogress' ? 'En desarrollo' : state == 'completed' ? 'Completado' : 'Cancelado'}</div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="flex items-start w-full">
                            <button onClick={() => redirectToProject(_id)} className="bg-light-main hover:bg-transparent text-white py-2 px-4 rounded-md uppercase font-semibold border-2 border-transparent hover:border-light-main hover:text-light-main transition-colors whitespace-nowrap w-full sm:w-fit">Ver más</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}