// React
import { useState } from "react";
// Super admin permissions
import SuperAdminPermissions from "@/components/admin/SuperAdminPermissions";
// Layout
import AdminLayout from "@/components/admin/AdminLayout";
// Form validation
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

export default function CreateAccount() {
    
    const AccountSchema = Yup.object().shape({
        name: Yup.string()
          .min(5, 'El nombre es muy corto.')
          .max(50, 'El nombre es muy largo.')
          .required('El nombre es obligatorio'),
        email: Yup.string().
            email('El formato es incorrecto').
            required('El correo electrónico es obligatorio'),
        password: Yup.string().
            min(8, 'La contraseña es muy corta').
            max(32, 'La contraseña es muy larga').
            required('La contraseña es obligatoria')
    });

    // On user submit form show a message
    const [ message, setMessage ] = useState({ error: false, text: '' });

    function showMessage(error, text, timeout) {
        setMessage({ error, text })
        setTimeout(() => {
            setMessage({ error: false, text: '' })
        }, timeout)
    }

    return (
        <SuperAdminPermissions>
            <AdminLayout title={"Crear cuenta"}>
                <div className="flex flex-col gap-10 justify-center w-[30rem] mx-auto text-center">
                    <div className={`text-light-main font-semibold uppercase text-2xl`}>Crear cuenta</div>
                    <Formik
                        initialValues={{
                            name: '',
                            email: '',
                            password: ''
                        }}
                        validationSchema={AccountSchema}
                        onSubmit={ async (values) => {
                            // Form values
                            const name = values.name;
                            const email = values.email;
                            const password = values.password;

                            // If type, name, email and phone are void return
                            if([name, email, password].includes('')) {
                                return;
                            }

                            // Send project to server
                            try {
                                const { data } = await axios.request({
                                    url: '/api/sendProject',
                                    method: 'POST',
                                    data: { project }
                                });      
                                values.name = '';   
                                values.email = '';  
                                values.password = '';  
                                showMessage(false, 'El usuario se creó correctamente', 5000)
                                resetForm();   
                            } catch (error) {
                                showMessage(true, 'Beim Senden der Daten ist ein Fehler aufgetreten', 5000)
                            }
                        }}
                    >
                        {({ errors, touched }) => (   
                            <Form className="flex flex-col">
                                { message.text && (
                                    <div className={`${message.error ? 'bg-red-500' : 'bg-light-main'} py-2 w-full text-white uppercase font-semibold text-center rounded-md`}>{message.text}</div>
                                )}
                                <div className="flex items-center border-b border-neutral-400">
                                    <Field 
                                        className="bg-transparent outline-none py-2 w-full placeholder:text-neutral-400 text-lg"
                                        name="name" 
                                        type="text"
                                        placeholder="Nombre completo"
                                    />
                                </div>
                                {errors.name && touched.name ? (
                                    <div className="text-left text-sm text-red-500">{errors.name}</div>
                                ) : null}
                                <div className="flex items-center border-b border-neutral-400">
                                    <Field 
                                        className="bg-transparent outline-none py-2 w-full placeholder:text-neutral-400 text-lg"
                                        name="email" 
                                        type="email"
                                        placeholder="Correo electrónico"
                                    />
                                </div>
                                {errors.email && touched.email ? (
                                    <div className="text-left text-sm text-red-500">{errors.email}</div>
                                ) : null}
                                <div className="flex items-center border-b border-neutral-400">
                                    <Field 
                                        className="bg-transparent outline-none py-2 w-full placeholder:text-neutral-400 text-lg"
                                        name="password" 
                                        type="password"
                                        placeholder="Contraseña"
                                    />
                                </div>
                                {errors.password && touched.password ? (
                                    <div className="text-left text-sm text-red-500">{errors.password}</div>
                                ) : null}
                            </Form>
                        )}
                    </Formik>
                </div>
            </AdminLayout>
        </SuperAdminPermissions>
    )
}