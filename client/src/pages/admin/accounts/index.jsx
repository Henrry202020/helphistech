import axios from "axios";
// React
import { useEffect, useState } from "react";
// Nextjs
import { useRouter } from "next/router";
// Super admin permissions
import SuperAdminPermissions from "@/components/admin/SuperAdminPermissions";
// Layout
import AdminLayout from "@/components/admin/AdminLayout";
// Data and hour formatter
import moment from "moment";
// Context
import useContextProvider from "@/hooks/useAppContextProvider";

export default function Accounts() {

    const { auth } = useContextProvider();

    const [ accounts, setAccounts ] = useState([]);

    useEffect(() => {
        getAccounts();
    }, [])

    async function getAccounts() {
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
            const { data } = await axios.post('/api/admin/accounts/getAccounts', { config })
            const accounts = data.filter(acc => acc._id !== auth._id);
            setAccounts(accounts);
        } catch (error) {
            console.log(error.response.data)
        }
    }

    return (
        <SuperAdminPermissions>
            <AdminLayout title={"Cuentas"}>
                <div className="h-full">
                    { accounts.length != 0 ? accounts.map((account, index) => (
                        <Account account={account} key={index} />
                    )) : (
                        <div className="grid place-content-center h-full">
                            <h1 className="uppercase text-xl font-semibold">Aún no hay cuentas que mostrar</h1>
                        </div>
                    )}
                </div>
            </AdminLayout>
        </SuperAdminPermissions>
    )
}

function Account({account}) {
    return (
        <div className="shadow-md px-5 py-4 rounded-lg">
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                    <div className="uppercase font-bold">Nombre</div>
                    <div>{account.name}</div>
                </div>
                <div className="flex items-center gap-2">
                    <div className="uppercase font-bold">Correo electrónico</div>
                    <div>{account.email}</div>
                </div>
                <div className="flex items-center gap-2">
                    <div className={`uppercase font-bold`}>Permisos</div>
                    <div className={`${account.permissions === 'admin' ? 'text-light-main' : account.permissions === 'superadmin' ? 'text-red-500' : null} uppercase font-semibold`}>{account.permissions}</div>
                </div>
                <div className="flex items-center gap-2">
                    <div className="uppercase font-bold">Creado</div>
                    <div>{moment(account.createdAt).format('LLL')}</div>
                </div>
            </div>
        </div>
    )
}