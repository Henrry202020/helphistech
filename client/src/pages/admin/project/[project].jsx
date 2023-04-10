import axios from "axios";
// React
import { useEffect, useState } from "react";
// Nextjs
import { useRouter } from "next/router"
// Components
import Layout from "@/components/admin/AdminLayout";
// Hooks
import currencyFormatter from "@/hooks/currencyFormatter";
// Date and Hour Formatter
import moment from "moment";
// Context
import useContextProvider from "@/hooks/useAppContextProvider";

export default function ProjectDynamic() {
    
    const { auth, darkMode } = useContextProvider();

    const router = useRouter();
    // Get project id from url params
    const projectId = router.query.project;

    // Project data
    const [ project, setProject ] = useState({});
    const { website_type, contact_information, budget, description, state } = project;

    const [ projectState, setProjectState ] = useState(state);

    // On component load fetch project
    useEffect(() => {
        if(projectId) {
            getProject();
        }
    }, [projectId])

    // Fetch project data
    async function getProject() {
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

        const { data } = await axios.post(`/api/admin/getProject`, { _id: projectId, config });
        setProject(data);
        setProjectState(data.state)
    }

    async function handleChangeState() {
        if(projectState == 'cancelled') return;

        let state;

        if(projectState == 'onhold') {
            setProjectState('inprogress');
            state = 'inprogress';
        }
        if(projectState == 'inprogress') {
            setProjectState('completed');
            state = 'completed';
        }
        if(projectState == 'completed') {
            setProjectState('onhold');
            state = 'onhold';
        }

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

        await axios.post('/api/admin/changeProjectState', { _id: project._id, state, config });
    }

    // Confirm cancel project state and menu
    const [ showCancelMenu, setShowCancelMenu ] = useState(false);
    // Cancel menu close animation
    const [ closeCancelMenuAnim, setCloseCancelMenuAnim ] = useState(false);
    function handleShowModal() {
        setShowCancelMenu(current => !current);
    }
    function handleCloseModal() {
        setCloseCancelMenuAnim(true);
        setTimeout(() => {
            handleShowModal()
            setCloseCancelMenuAnim(false);
        }, 170)
    }
    async function handleCancelProject() {
        handleCloseModal();

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

        await axios.post('/api/admin/cancelProject', { _id: project._id, config })
        router.push(`/admin/projects`)
    }
    async function handleRecoverProject() {
        handleCloseModal();

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

        await axios.post('/api/admin/changeProjectState', { _id: project._id, state: "onhold", config })
        router.push(`/admin/projects`)
    }

    return (
        <Layout title={'Proyeto'}>
            { Object.keys(project).length != 0 && (
                <div className={`${darkMode ? 'text-dark-text' : 'text-black'} flex flex-col gap-3 px-5 rounded-lg`}>
                    <div className={`${darkMode ? 'border-neutral-900' : 'border-neutral-200'} flex flex-col border-b py-3`}>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0 pb-3">
                            <div className="flex flex-col sm:flex-row sm:gap-2 text-xl">
                                <div className="uppercase font-semibold">Tipo de software</div>
                                <div className="font-semibold text-light-main">{website_type == 'website' ? 'Sitio web' : website_type == 'ecommerce' ? 'E-Commerce' : website_type == 'app' && 'Aplicación'}</div>    
                            </div>
                            <div className="flex sm:justify-end font-semibold">{moment(project.createdAt).format('LLL')}</div>
                        </div>
                        <div className="flex flex-col gap-2 py-3">
                            <div className="font-bold uppercase">Descripción</div>
                            <div className={`${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>{description ? description : "Sin descripción"}</div>    
                        </div>
                        <div className={`${darkMode ? 'border-neutral-900' : 'border-neutral-200'} flex flex-col py-3 border-t`}>
                            <div className="font-bold uppercase">Presupuesto</div>
                            <div className="flex items-center gap-1">
                                <div className={`${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>Entre</div>
                                <div className="font-semibold">{currencyFormatter(budget.from)}</div>    
                                <div className={`${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>y</div>
                                <div className="font-semibold">{currencyFormatter(budget.to)}</div>    
                            </div>    
                        </div>
                        <div className={`${darkMode ? 'border-neutral-900' : 'border-neutral-200'} flex flex-col gap-2 border-t pt-3`}>
                            <div className="font-bold uppercase">Información de contacto</div>
                            <div className="flex flex-col gap-2">
                                <div className="flex flex-col">
                                    <div className="uppercase font-bold text-sm">Nombre completo</div>
                                    <div className="">{contact_information.full_name}</div>
                                </div>
                                <div className="flex flex-col">
                                    <div className="uppercase font-bold text-sm">Correo electrónico</div>
                                    <div className="">
                                        <a href={`mailto:${contact_information.email}`}>{contact_information.email}</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-10 sm:gap-0">
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-col gap-2">
                                <div className="uppercase font-semibold text-lg">Estado</div>
                                <button className={`${projectState == 'cancelled' ? 'cursor-default' : null} flex items-center gap-4 w-fit`} onClick={handleChangeState}>
                                    <div className={`${projectState == 'onhold' ? 'bg-yellow-500' : projectState == 'inprogress' ? 'bg-orange-500' : projectState == 'completed' ? 'bg-light-main' :  'bg-red-500'} w-40 py-2 rounded-md text-white uppercase font-semibold select-none transition-colors`}>{projectState == 'onhold' ? 'En espera' : projectState == 'inprogress' ? 'En desarrollo' : projectState == 'completed' ? 'Completado' : 'Cancelado'}</div>
                                </button>
                            </div>
                            {/* <div className="flex items-center gap-1"> 
                                <div className="uppercase font-bold">Completado por:</div>
                                <div className="text-lg">{auth.name}</div>
                            </div> */}
                        </div>
                        {/* <div className="flex flex-col gap-2">
                            <div className="uppercase font-semibold text-lg">Cambiar Estado</div>
                            <div className="flex justify-end gap-4">
                                <select name="" id="" className="bg-zinc-500 text-white px-4 py-2 rounded-md outline-none">
                                    <option value="onhold">En espera</option>
                                    <option value="inprogress">En progreso</option>
                                    <option value="complete">Completado</option>
                                </select>
                            </div>
                        </div> */}
                        <div className="pt-2">
                            {auth.permissions === 'superadmin' && (
                                <div className="flex items-start">
                                    <button onClick={handleShowModal} className={`${projectState != 'cancelled' ? 'bg-red-500 hover:border-red-500 hover:text-red-500' : 'bg-light-main hover:border-light-main hover:text-light-main'} hover:bg-transparent text-white py-2 px-4 rounded-md uppercase font-semibold border-2 border-transparent transition-colors whitespace-nowrap`}>{projectState != 'cancelled' ? 'Cancelar proyecto' : 'Recuperar proyecto'}</button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
            { showCancelMenu && 
                <CancelProjectMenu 
                    closeAnim={closeCancelMenuAnim} 
                    confirm={projectState != 'cancelled' ? handleCancelProject : handleRecoverProject} 
                    cancel={handleCloseModal} 
                    projectState={projectState} 
                />
            }
        </Layout>
    )
}

function CancelProjectMenu({ closeAnim, confirm, cancel, projectState }) {

    const { darkMode } = useContextProvider();

    return (
        <>
            <div className="fixed bg-black opacity-75 top-0 left-0 w-screen h-screen"></div>
            <div className={`${darkMode ? 'bg-neutral-900 text-dark-text' : 'bg-white text-black'} ${closeAnim ? 'modal-close' : 'modal-open'} fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 flex flex-col gap-7 shadow-md px-5 py-4 rounded-md`}>
                <div className="flex flex-col gap-1">
                    <div className={`${projectState != 'cancelled' ? 'text-red-700' : 'text-light-main'} text-xl font-semibold uppercase`}>{projectState != 'cancelled' ? 'Cancelar proyecto' : 'Recuperar proyecto'}</div>
                    <div className="text-lg">¿Estás seguro que deseas {projectState != 'cancelled' ? 'cancelar' : 'recuperar'} este proyecto?</div>
                </div>
                <div className="flex items-center justify-between">
                    <button className="bg-red-500 hover:bg-red-900 text-white rounded-md px-4 py-2 uppercase font-semibold transition-colors" onClick={cancel}>Cancelar</button>
                    <button className="bg-light-main hover:bg-indigo-900 text-white rounded-md px-4 py-2 uppercase font-semibold transition-colors" onClick={confirm}>Confirmar</button>
                </div>
            </div>
        </>
    )
}