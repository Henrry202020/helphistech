import axios from "axios";
import { useRef, useState } from "react";
// Nextjs
import { useRouter } from "next/router";
// Hooks
import useContextProvider from "@/hooks/useAppContextProvider";

export default function ProjectQuote() {

    // Get functions and variables from context
    const { projectQuoteAnimation, handleCloseProjectQuote } = useContextProvider();

    return (
        <div className="fixed top-0 left-0 w-screen h-screen">
            <div className={`fixed top-0 w-screen h-screen bg-black ${projectQuoteAnimation ? 'full-screen-menu-close' : 'full-screen-menu-open'}`}></div>
            <div className={`absolute top-0 left-0 w-screen h-screen px-10 overflow-y-scroll text-white ${!projectQuoteAnimation ? 'lazy-load-1' : 'hidden'}`}>
                <div className="flex flex-col lg:flex-row items-start justify-center gap-16 pt-20 xl:gap-12 lg:max-w-6xl mx-auto">
                    <div onClick={handleCloseProjectQuote} className="absolute top-5 right-8 text-white text-3xl cursor-pointer hover:text-neutral-300 transition-colors"><i className="fa-solid fa-xmark"></i></div>
                    <div className={`flex flex-col justify-center gap-5 lg:w-1/2 lg:pl-5`}>
                        <div className={`text-6xl font-extrabold text-gradient lg:h-36 lg:leading-[4rem] lazy-load-1 ${projectQuoteAnimation ? 'hidden' : 'block'}`}>Cotiza tu<br /> proyecto.</div>
                        <div className={`lg:max-w-xs xl:max-w-md lazy-load-2 text-neutral-200 ${projectQuoteAnimation ? 'hidden' : 'block'}`}>Gracias por su interés. ¡Cuéntanos sobre tu proyecto o idea para que podamos empezar a trabajar juntos!</div>
                    </div>
                    <div className="flex flex-col gap-8 lg:w-1/2 lg:pr-5 pb-20">
                        <FormComponent />
                    </div>
                </div>
            </div>
        </div>
    )
}

import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

function FormComponent() {

    // Form steps
    const [ step, setStep ] = useState(1);

    // On user submit form show a message
    const [ message, setMessage ] = useState({ error: false, text: '' });

    const ProjectQuoteSchema = Yup.object().shape({
        fullName: Yup.string()
          .min(5, 'Nombre muy corto')
          .max(50, 'Nombre muy largo')
          .required('El nombre es obligatorio'),
        email: Yup.string().email('Correo electrónico no válido').required('El email es obligatorio')
    });

    const router = useRouter();

    // Get functions and variables from context
    const { projectQuoteAnimation } = useContextProvider();

    /* Project form values */
    // 1ST FORM - Project type
    const [ type, setType ] = useState('');
    // Estimated budget
    const [ budget, setBudget ] = useState({});
    // Tell us more
    const description = useRef('');

    // 2ND FORM - What is the full name of the company or client?
    const company_fullname = useRef('');
    // What type of business does the client have?
    const business_type = useRef('');
    // What is the company's vision and mission?
    const company_vision = useRef('');
    // Who is the target audience for the company?
    const target_audience = useRef('');
    // What services or products does the company offer?
    const service_or_product = useRef('');
    // What is the expected delivery timeline?
    const expected_deilvertime = useRef('');
    
    // 3RD FORM -  What functionalities should the web have?
    const functionalities = useRef('');
    // Should the web be responsive or have a specific design?
    const web_design_type = useRef('');
    // Are e-commerce functionalities needed on the web?
    const ecommerce_funtionabilites = useRef('');
    // Does the client have any content (text, images, videos) to include on the web?
    const conten_to_include = useRef('');
    // What programming language and technologies are preferred for development?
    const preferred_technologies = useRef('');
    // Who will be responsible for managing the web once the project is completed?
    const responsible_for_managing = useRef('');
    // What is the client's marketing and positioning strategy?
    const marketing_strategy = useRef('');
    // Are there competitor websites that should be taken into account as references?
    const competitor_websites = useRef('');

    // Reset form fields on submit
    function resetForm() {
        setType('');
        setBudget({})
        description.current.value = '';
    }

    function showMessage(error, text, timeout) {
        setMessage({ error, text })
        setTimeout(() => {
            setMessage({ error: false, text: '' })
        }, timeout)
    }

    return (
        <Formik
            initialValues={{
                fullName: '',
                email: ''
            }}
            validationSchema={ProjectQuoteSchema}
            onSubmit={ async (values) => {
                // Contact information values
                const _fullName = values.fullName;
                const _email = values.email;
                // Description value
                const _description = description.current.value;

                // If type, fullname, email and phone are void return
                if([type, _fullName, _email].includes('')) {
                    return;
                }
                
                // Get language from url
                const language = router.pathname.split('/')[1];
                // Project object
                const project = { 
                    website_type: type, 
                    contact_information: { 
                        full_name: _fullName, 
                        email: _email
                    },
                    description: _description,
                    budget
                }
                // Send project to server
                try {
                    const { data } = await axios.request({
                        url: '/api/sendProject',
                        method: 'POST',
                        data: { project }
                    });      
                    values.fullName = '';   
                    values.email = '';  
                    showMessage(false, 'Se enviaron los datos correctamente!', 5000)
                    resetForm();   
                } catch (error) {
                    showMessage(true, 'Hubo un error al enviar los datos', 5000)
                }
            }}
        >
            {({ errors, touched }) => (   
                <Form className="flex flex-col gap-6">
                    { message.text && (
                        <div className={`${message.error ? 'bg-red-500' : 'bg-light-main'} py-2 w-full text-white uppercase font-semibold text-center rounded-md`}>{message.text}</div>
                    )}
                    <Section 
                        title={"Qué tipo de proyecto?"} 
                        classes={`${!projectQuoteAnimation ? 'lazy-load-1 block' : 'hidden'}`}
                    >
                        <div className="grid grid-cols-2 sm:grid-cols-3 items-center gap-2">
                            <div onClick={() => setType('website')} className={`grid place-content-center border rounded-full py-2 px-5 hover:bg-white hover:text-black transition-colors cursor-pointer whitespace-nowrap ${type === 'website' && 'bg-white text-black'}`}>
                                <span>Sitio web</span>
                            </div>
                            <div onClick={() => setType('ecommerce')} className={`grid place-content-center border rounded-full py-2 px-5 hover:bg-white hover:text-black transition-colors cursor-pointer whitespace-nowrap ${type === 'ecommerce' && 'bg-white text-black'}`}>
                                <span>E-Commerce</span>
                            </div>
                            <div onClick={() => setType('app')} className={`grid place-content-center border rounded-full py-2 px-5 hover:bg-white hover:text-black transition-colors cursor-pointer whitespace-nowrap ${type === 'app' && 'bg-white text-black'}`}>
                                <span>Aplicación</span>
                            </div>
                        </div>
                    </Section>
                    <Section 
                        title={"Información de contacto"}  
                        classes={`${!projectQuoteAnimation ? 'lazy-load-2 block' : 'hidden'}`}
                    >
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center border-b border-neutral-400">
                                <Field 
                                    className="bg-transparent outline-none py-2 w-full placeholder:text-neutral-400 text-lg"
                                    name="fullName" 
                                    type="text"
                                    placeholder="Nombre completo"
                                />
                            </div>
                            {errors.fullName && touched.fullName ? (
                                <div className="text-sm text-red-500">{errors.fullName}</div>
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
                                <div className="text-sm text-red-500">{errors.email}</div>
                            ) : null}
                        </div>
                    </Section>
                    <Section 
                        title={"Cuentanos más acerca del proyecto"} 
                        classes={`${!projectQuoteAnimation ? 'lazy-load-4 block' : 'hidden'}`}
                    >
                        <Input props={{
                            placeholder: 'Descripción', 
                            ref: description, 
                            type: 'text', 
                            required: false
                        }} />
                    </Section>
                    <Section 
                        title={"Cuál es tu presupuesto estimado?"} 
                        subtitle={"Presupuesto expresado en USD"}  
                        classes={`${!projectQuoteAnimation ? 'lazy-load-3 block' : 'hidden'}`}
                    >
                        <div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-5 items-center gap-2">
                            <div onClick={() => setBudget({ from: 1, to: 5000 })} className={`grid place-content-center border rounded-full py-2 px-5 hover:bg-white hover:text-black transition-colors cursor-pointer whitespace-nowrap ${budget.from === 1 && 'bg-white text-black'}`}>
                                <span>{'< 5K'}</span>
                            </div>
                            <div onClick={() => setBudget({ from: 5000, to: 10000 })} className={`grid place-content-center border rounded-full py-2 px-5 hover:bg-white hover:text-black transition-colors cursor-pointer whitespace-nowrap ${budget.from === 5000 && 'bg-white text-black'}`}>
                                <span>{'5K - 10K'}</span>
                            </div>
                            <div onClick={() => setBudget({ from: 10000, to: 20000 })} className={`grid place-content-center border rounded-full py-2 px-5 hover:bg-white hover:text-black transition-colors cursor-pointer whitespace-nowrap ${budget.from === 10000 && 'bg-white text-black'}`}>
                                <span>{'10K - 20K'}</span>
                            </div>
                            <div onClick={() => setBudget({ from: 20000, to: 30000 })} className={`grid place-content-center border rounded-full py-2 px-5 hover:bg-white hover:text-black transition-colors cursor-pointer whitespace-nowrap ${budget.from === 20000 && 'bg-white text-black'}`}>
                                <span>{'20K - 30K'}</span>
                            </div>
                            <div onClick={() => setBudget({ from: 30000, to: 100000 })} className={`grid place-content-center border rounded-full py-2 px-5 hover:bg-white hover:text-black transition-colors cursor-pointer whitespace-nowrap ${budget.from === 30000 && 'bg-white text-black'}`}>
                                <span>{'> 30K'}</span>
                            </div>
                        </div>
                    </Section>
                    <button className={`py-2 px-4 bg-gradient rounded-xl text-lg uppercase font-bold text-center cursor-pointer ${!projectQuoteAnimation ? 'lazy-load-4 block' : 'hidden'}`}>Enviar</button>
                </Form>
            )}
        </Formik>
    )
}

function Section({title, subtitle, children, classes}) {
    return (
        <div className={`flex flex-col gap-4 ${classes}`}>
            <div className="flex flex-col">
                <div className="text-2xl font-semibold">{title}</div>
                { subtitle && <div className="text-neutral-400">{subtitle}</div> }
            </div>
            <div>{children}</div>
        </div>
    )
}

function Input({ props }) {

    const { placeholder, ref, type, name, required, } = props;

    return (
        <div className="flex items-center gap-2 border-b border-neutral-400">
            { required ? (
                <>
                    <div className="text-red-500">*</div>
                    <input className="bg-transparent outline-none py-2 w-full placeholder:text-neutral-400 text-lg" ref={ref} type={type} placeholder={placeholder} name={name} />
                </>
            ) : (
                <input className="bg-transparent outline-none py-2 w-full placeholder:text-neutral-400 text-lg" ref={ref} type={type} placeholder={placeholder} name={name} />
            )}
        </div>
    )
}

function FromStep({ children }) {
    return <div>
        {children}
    </div>
}