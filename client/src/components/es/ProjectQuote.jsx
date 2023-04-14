import axios from "axios";
import { useRef, useState } from "react";
// Nextjs
import { useRouter } from "next/router";
// Hooks
import useContextProvider from "@/hooks/useAppContextProvider";

export default function ProjectQuote() {

    // Get functions and variables from context
    const { projectQuoteAnimation, handleCloseProjectQuote } = useContextProvider();

    const [ showVideoCallForm, setShowVideoCallForm ] = useState(false);

    return (
        <div className="fixed top-0 left-0 w-screen h-screen">
            <div className={`fixed top-0 w-screen h-screen bg-black ${projectQuoteAnimation ? 'full-screen-menu-close' : 'full-screen-menu-open'}`}></div>
            <div className={`absolute top-0 left-0 w-screen h-screen px-10 overflow-y-scroll text-white ${!projectQuoteAnimation ? 'lazy-load-1' : 'hidden'}`}>
                <div className="flex flex-col lg:flex-row lg:items-start justify-center gap-16 py-20 xl:gap-12 lg:max-w-6xl mx-auto lg:h-full" id="quote-project-form">
                    <div onClick={handleCloseProjectQuote} className="absolute top-5 right-8 text-white text-3xl cursor-pointer hover:text-neutral-300 transition-colors"><i className="fa-solid fa-xmark"></i></div>
                    <div className="flex flex-col justify-between gap-10 lg:h-full">
                        <div className={`flex flex-col justify-center gap-5 w-full`}>
                            <div className={`text-6xl font-extrabold text-gradient h-fit lg:leading-[4rem] lazy-load-1 ${projectQuoteAnimation ? 'hidden' : 'block'}`}>
                                <span className="w-full">Cotiza tu</span>
                                <br /> 
                                <span className="w-full">proyecto.</span>
                            </div>
                            <div className={`max-w-xs xl:max-w-md lazy-load-2 text-neutral-200 ${projectQuoteAnimation ? 'hidden' : 'block'}`}>Gracias por tu interés. ¡Cuéntanos sobre tu proyecto o idea para que podamos empezar a trabajar juntos!</div>
                        </div>
                        <div className="flex flex-col gap-5">
                            <div className={`text-6xl font-extrabold text-gradient h-fit lg:leading-[4rem] lazy-load-1 ${projectQuoteAnimation ? 'hidden' : 'block'}`}>
                                <span className="w-full">Agenda tu</span>
                                <br /> 
                                <span className="w-full">videollamada.</span>
                            </div>
                            <div className="max-w-xs">También puedes agendar una videollamada y hablar directamente con nosotros!</div>
                            <button onClick={() => setShowVideoCallForm(current => !current)} className="px-4 py-2 rounded-md text-white font-semibold uppercase bg-dark-main w-fit select-none">Agendar Videollamada</button>
                        </div>
                    </div>
                    <div className="flex flex-col gap-8 lg:w-1/2 lg:pr-5 pb-20">
                        { showVideoCallForm ? (
                            <VideoCallComponent closeVideoCallForm={() => setShowVideoCallForm(false)} />
                        ) : (
                            <FormComponent />
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

// Date picker imports
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

function VideoCallComponent({ closeVideoCallForm }) {

    // on submit show message
    const [ message, setMessage ] = useState({ error: false, text: '' });

    // date picker settings
    // const [ showDatePicker, setShowDatePicker ] = useState(false);
    const today = new Date();
    const day = today.getDate();
    const year = today.getFullYear();
    const month = (today.getMonth());
    const disabledDays = [
        { from: new Date(year, month, 1), to: new Date(year, month, (day + 3))}
    ]

    const [ full_name, setFullName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ date, setDate ] = useState('');
    const [ hour, setHour ] = useState('');

    function showMessage(error, text, timeout) {
        document.getElementById("quote-project-form").scrollIntoView({ behavior: 'smooth' });
        setMessage({ error, text })
        setTimeout(() => {
            setMessage({ error: false, text: '' })
        }, timeout)
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if([full_name, email, date, hour].includes('')) {
            showMessage(true, 'Todos los campos son obligatorios', 5000)
            return;
        }


        try {
            await axios.post('/api/sendVideoCall', { full_name, email, date, hour });
            showMessage(false, 'Se agendó tu videollamada correctamente', 5000);
        } catch (error) {
            showMessage(true, 'Hubo un error al agendar tu videollamada', 5000);
        }
    }

    return (
        <form className="flex flex-col gap-5 lazy-load-1" onSubmit={handleSubmit}>
            { message.text && (
                <div className={`${message.error ? 'bg-red-500' : 'bg-light-main'} py-2 w-full text-white uppercase font-semibold text-center rounded-md`}>{message.text}</div>
            )}
            <div className="flex flex-col">
                <div className="text-2xl font-semibold">Nombre completo</div>
                <div className="flex items-center gap-2 border-b border-neutral-400">
                    <input className="bg-transparent outline-none py-2 w-full placeholder:text-neutral-400 text-lg" type={'text'} placeholder={'Ingresa tu nombre'} onChange={(e) => setFullName(e.target.value)} />
                </div>
            </div>
            <div className="flex flex-col">
                <div className="text-2xl font-semibold">Email de contacto</div>
                <div className="flex items-center border-b border-neutral-400">
                    <input className="bg-transparent outline-none py-2 w-full placeholder:text-neutral-400 text-lg" type={'email'} placeholder={'Ingresa tu e-mail'} onChange={(e) => setEmail(e.target.value)} />
                </div>
            </div>
            <div className="flex flex-col gap-4">
                <div className="flex flex-col">
                    <div className="text-2xl font-semibold">Elige una fecha y hora de encuentro</div>
                    <div className="text-neutral-400">Zona horaria: GMT+2</div>
                </div>
                <div className="flex justify-between items-start">
                    <DayPicker
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        disabled={disabledDays}
                        fromMonth={new Date(year, month)}
                        toMonth={new Date(year, (month + 4))}
                    />
                    <select name="" id="" className="bg-transparent text-white video-call-select outline-none border border-neutral-600 rounded-md px-3 py-2 text-lg" value={hour} onChange={(e) => setHour(e.target.value)}>
                        <option value="">Seleccionar hora</option>
                        <option value="14:00">14:00</option>
                        <option value="16:00">16:00</option>
                        <option value="20:00">20:00</option>
                    </select>
                </div>
            </div>
            {/* <div className="flex flex-col gap-4">
                <div className="text-2xl font-semibold">Elige una hora de encuentro</div>
                <div className="flex items-center border-b border-neutral-400">
                    <input className="bg-transparent outline-none py-2 w-full placeholder:text-neutral-400 text-lg" type={'text'} placeholder={'Ingresa la hora. Ej: 08:00 PM'} onChange={(e) => setHour(e.target.value)} />
                </div>
            </div> */}
            {/* <div className="flex flex-col gap-4">
                <div className="text-2xl font-semibold">¿Cuál es tu zona horaria?</div>
                <div className="flex items-center border-b border-neutral-400">
                    <input className="bg-transparent outline-none py-2 w-full placeholder:text-neutral-400 text-lg" type={'text'} placeholder={'Ingresa tu zona horaria. Ej: GMT+2'} onChange={(e) => setTimezone(e.target.value)} />
                </div>
            </div> */}
            <div className="flex items-center gap-2 lazy-load-4">
                <button type={'button'} onClick={closeVideoCallForm} className={`py-2 px-4 bg-gradient rounded-xl text-lg uppercase font-bold text-center cursor-pointer w-full`}>Volver </button>
                <button type={'submit'} className={`py-2 px-4 bg-gradient rounded-xl text-lg uppercase font-bold text-center cursor-pointer w-full`}>Enviar</button>
            </div>
        </form>
    )
}

function FormComponent() {

    const router = useRouter();

    // On user submit form show a message
    const [ message, setMessage ] = useState({ error: false, text: '' });

    // Get functions and variables from context
    const { projectQuoteAnimation } = useContextProvider();

    /* Project form values */
    // 1ST FORM - Project type
    const [ type, setType ] = useState('');
    // Estimated budget
    const [ budget, setBudget ] = useState({});
    // Tell us more
    const full_name = useRef('');
    const email = useRef('');
    const description = useRef('');

    // 2ND FORM - What is the full name of the company or client?
    const company_fullname = useRef('');
    // What type of business does the client have?
    const [ business_type, setBusinessType ] = useState('');
    // What is the company's vision and mission?
    const [ company_vision, setCompanyVision ] = useState('');
    // Who is the target audience for the company?
    const [ target_audience, setTargetAudience ] = useState('');
    // What services or products does the company offer?
    const [ service_or_product, setServiceOrProduct ] = useState('');
    // What is the expected delivery timeline?
    const [ expected_deilvertime, setExpectedDeliverTime ] = useState({ from: null, to: null });
    
    // 3RD FORM -  What functionalities should the web have?
    const [ functionalities, setFunctionalities ] = useState([]);
    const functionalities_other = useRef('');
    function handleFunctionabilites(value) {
        if(functionalities.indexOf(value) > -1) {
            const newFunctionabilites = functionalities.filter(f => f != value);
            setFunctionalities(newFunctionabilites);
        } else {
            setFunctionalities(current => current.concat([value]));
        }
    }
    // Should the web be responsive or have a specific design?
    const [ web_design_type, setWebDesignType ] = useState('');
    // Are e-commerce functionalities needed on the web?
    const [ ecommerce_funtionabilites, setEcommerceFunc ] = useState(false);
    // Does the client have any content (text, images, videos) to include on the web?
    const [ content_to_include, setContentToInclude ] = useState(false);
    // What programming language and technologies are preferred for development?
    const [ preferred_technologies, setPreferredTechnologies ] = useState('');
    // Who will be responsible for managing the web once the project is completed?
    const [ responsible_for_managing, setResponsibleForManaging ] = useState('');
    // What is the client's marketing and positioning strategy?
    const [ marketing_strategy, setMarketingStrategy ] = useState('');
    // Are there competitor websites that should be taken into account as references?
    const [ competitor_websites, setCompetitorWebsites ] = useState(false);

    // Reset form fields on submit
    function resetForm() {
        setType('');
        setBudget({})
        full_name.current.value = '';
        email.current.value = '';
        description.current.value = '';
        // 
        company_fullname.current.value = '';
        setBusinessType('');
        setCompanyVision('');
        setTargetAudience('');
        setServiceOrProduct('');
        setExpectedDeliverTime({ from: null, to: null });
        // 
        setFunctionalities([]);
        functionalities_other.current.value = '';
        setWebDesignType('');
        setEcommerceFunc(false);
        setContentToInclude(false);
        setPreferredTechnologies('');
        setResponsibleForManaging('');
        setMarketingStrategy('');
        setCompetitorWebsites(false);
        // 
        setStep(1);
    }

    function showMessage(error, text, timeout) {
        document.getElementById("quote-project-form").scrollIntoView({ behavior: 'smooth' });
        setMessage({ error, text })
        setTimeout(() => {
            setMessage({ error: false, text: '' })
        }, timeout)
    }

    async function handleSubmit(e) {
        e.preventDefault();

        // If fields are void then return
        if([type, full_name.current.value, email.current.value, company_fullname, business_type, company_vision, target_audience, service_or_product, web_design_type, ecommerce_funtionabilites, content_to_include, preferred_technologies, responsible_for_managing, marketing_strategy, competitor_websites].includes('')) {
            showMessage(true, 'Debes completar todos los campos.', 5000)
            return;
        }

        if(expected_deilvertime.from == null) {
            showMessage(true, 'Debes completar todos los campos.', 5000)
            return;
        }

        if(functionalities.length == 0 && functionalities_other == '') {
            showMessage(true, 'Debes completar todos los campos.', 5000)
            return;
        }
        
        // Project object
        const project = { 
            website_type: type, 
            contact_information: { 
                full_name: full_name.current.value, 
                email: email.current.value
            },
            description: description.current.value,
            company_info: {
                full_name: company_fullname.current.value,
                business_type,
                company_vision,
                target_audience,
                service_or_product,
                expected_deilvertime
            },
            project_info: {
                functionalities,
                functionalities_other: functionalities_other.current.value || '',
                web_design_type,
                ecommerce_funtionabilites,
                content_to_include,
                preferred_technologies,
                responsible_for_managing,
                marketing_strategy,
                competitor_websites
            },
            budget
        }
        // console.log(project)
        // Send project to server
        try {
            await axios.post('/api/sendProject', { project })    
            showMessage(false, '¡Se enviaron los datos correctamente!', 5000)
            resetForm();   
        } catch (error) {
            // console.log(error.response.data)
            showMessage(true, 'Hubo un error al enviar los datos.', 5000)
        }
    }

    // Form steps
    const [ step, setStep ] = useState(1);

    function handleNextStep() {
        if(step === 3) {
            return;
        }

        if(step == 1 && [type, full_name.current.value, email.current.value, description.current.value].includes('')) {
            showMessage(true, 'Debes completar todos los campos.', 5000)
            return;
        }
        if(step == 2 && [company_fullname.current.value, business_type, company_vision, target_audience, service_or_product].includes('')) {
            showMessage(true, 'Debes completar todos los campos.', 5000)
            return;
        }
        if(step == 3 && [web_design_type, ecommerce_funtionabilites, content_to_include, preferred_technologies, responsible_for_managing, marketing_strategy, competitor_websites].includes('')) {
            showMessage(true, 'Debes completar todos los campos.', 5000)
            return;
        }

        setStep(current => current + 1);
        setMessage({ error: false, text: '' })
    }

    function handlePrevStep() {
        if(step > 1) {
            setStep(current => current - 1);
        }
    }

    return (
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            { message.text && (
                <div className={`${message.error ? 'bg-red-500' : 'bg-light-main'} py-2 w-full text-white uppercase font-semibold text-center rounded-md`}>{message.text}</div>
            )}
            <section id="step1" className={`flex flex-col gap-6 ${step == 1 ? 'block' : 'hidden'}`}>
                <Section 
                    title={"¿Qué tipo de proyecto?"} 
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
                        <div className="flex items-center gap-2 border-b border-neutral-400">
                            <input className="bg-transparent outline-none py-2 w-full placeholder:text-neutral-400 text-lg" type={'text'} placeholder={'Nombre completo'} ref={full_name} />
                        </div>
                        <div className="flex items-center gap-2 border-b border-neutral-400">
                            <input className="bg-transparent outline-none py-2 w-full placeholder:text-neutral-400 text-lg" type={'email'} placeholder={'Correo electrónico'} ref={email} />
                        </div>
                    </div>
                </Section>
                <Section 
                    title={"Cuéntanos más acerca del proyecto"} 
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
                    title={"¿Cuál es tu presupuesto estimado?"} 
                    subtitle={"Presupuesto estimado en USD"}  
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
            </section>
            <section id="step2" className={`flex flex-col gap-6 ${step == 2 ? 'block' : 'hidden'}`}>
                <Section 
                    title={"¿Cuál es el nombre de la empresa o cliente?"} 
                >
                    <Input props={{
                        placeholder: 'Nombre completo', 
                        ref: company_fullname, 
                        type: 'text', 
                        required: false
                    }} />
                </Section>
                <Section 
                    title={"¿Qué tipo de negocio tiene el cliente?"} 
                >
                    <div className="grid grid-cols-2 sm:grid-cols-3 items-center gap-2 pb-3">
                        <div onClick={() => setBusinessType('retail')} className={`grid place-content-center border rounded-full py-2 px-5 hover:bg-white hover:text-black transition-colors cursor-pointer whitespace-nowrap ${business_type === 'retail' && 'bg-white text-black'}`}>
                            <span>Minorista</span>
                        </div>
                        <div onClick={() => setBusinessType('service')} className={`grid place-content-center border rounded-full py-2 px-5 hover:bg-white hover:text-black transition-colors cursor-pointer whitespace-nowrap ${business_type === 'service' && 'bg-white text-black'}`}>
                            <span>Servicio</span>
                        </div>
                        <div onClick={() => setBusinessType('manufacturing')} className={`grid place-content-center border rounded-full py-2 px-5 hover:bg-white hover:text-black transition-colors cursor-pointer whitespace-nowrap ${business_type === 'manufacturing' && 'bg-white text-black'}`}>
                            <span>Fabricación</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 border-b border-neutral-400">
                        <input className="bg-transparent outline-none py-2 w-full placeholder:text-neutral-400 text-lg" type={'text'} placeholder={'Otro (especificar)'} onChange={(e) => setBusinessType(e.target.value)} />
                    </div>
                </Section>
                <Section 
                    title={"¿Cuál es la visión y misión de la empresa?"} 
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-2 pb-3">
                        <div onClick={() => setCompanyVision('increase-profitability')} className={`grid place-content-center border rounded-full py-2 px-5 hover:bg-white hover:text-black transition-colors cursor-pointer whitespace-nowrap ${company_vision === 'increase-profitability' && 'bg-white text-black'}`}>
                            <span>Aumentar la rentabilidad</span>
                        </div>
                        <div onClick={() => setCompanyVision('enhance-customer-satisfaction')} className={`grid place-content-center border rounded-full py-2 px-5 hover:bg-white hover:text-black transition-colors cursor-pointer whitespace-nowrap ${company_vision === 'enhance-customer-satisfaction' && 'bg-white text-black'}`}>
                            <span>Mejorar la satisfacción del cliente</span>
                        </div>
                        <div onClick={() => setCompanyVision('promote-sustainability')} className={`grid place-content-center border rounded-full py-2 px-5 hover:bg-white hover:text-black transition-colors cursor-pointer whitespace-nowrap ${company_vision === 'promote-sustainability' && 'bg-white text-black'}`}>
                            <span>Promover la sostenibilidad</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 border-b border-neutral-400">
                        <input className="bg-transparent outline-none py-2 w-full placeholder:text-neutral-400 text-lg" type={'text'} placeholder={'Otro (especificar)'} onChange={(e) => setCompanyVision(e.target.value)} />
                    </div>
                </Section>
                <Section 
                    title={"¿Cuál es la visión y misión de la empresa?"} 
                >
                    <div className="grid grid-cols-2 sm:grid-cols-3 items-center gap-2 pb-3">
                        <div onClick={() => setTargetAudience('children')} className={`grid place-content-center border rounded-full py-2 px-5 hover:bg-white hover:text-black transition-colors cursor-pointer whitespace-nowrap ${target_audience === 'children' && 'bg-white text-black'}`}>
                            <span>Niños</span>
                        </div>
                        <div onClick={() => setTargetAudience('teenagers')} className={`grid place-content-center border rounded-full py-2 px-5 hover:bg-white hover:text-black transition-colors cursor-pointer whitespace-nowrap ${target_audience === 'teenagers' && 'bg-white text-black'}`}>
                            <span>Adolescentes</span>
                        </div>
                        <div onClick={() => setTargetAudience('young-adults')} className={`grid place-content-center border rounded-full py-2 px-5 hover:bg-white hover:text-black transition-colors cursor-pointer whitespace-nowrap ${target_audience === 'young-adults' && 'bg-white text-black'}`}>
                            <span>Adultos jovenes</span>
                        </div>
                        <div onClick={() => setTargetAudience('adults')} className={`grid place-content-center border rounded-full py-2 px-5 hover:bg-white hover:text-black transition-colors cursor-pointer whitespace-nowrap ${target_audience === 'adults' && 'bg-white text-black'}`}>
                            <span>Adultos</span>
                        </div>
                        <div onClick={() => setTargetAudience('seniors')} className={`grid place-content-center border rounded-full py-2 px-5 hover:bg-white hover:text-black transition-colors cursor-pointer whitespace-nowrap ${target_audience === 'seniors' && 'bg-white text-black'}`}>
                            <span>Mayores</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 border-b border-neutral-400">
                        <input className="bg-transparent outline-none py-2 w-full placeholder:text-neutral-400 text-lg" type={'text'} placeholder={'Otro (especificar)'} onChange={(e) => setTargetAudience(e.target.value)} />
                    </div>
                </Section>
                <Section 
                    title={"¿Qué servicios o productos ofrece la empresa?"} 
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-2 pb-3">
                        <div onClick={() => setServiceOrProduct('products')} className={`grid place-content-center border rounded-full py-2 px-5 hover:bg-white hover:text-black transition-colors cursor-pointer whitespace-nowrap ${service_or_product === 'products' && 'bg-white text-black'}`}>
                            <span>Productos</span>
                        </div>
                        <div onClick={() => setServiceOrProduct('services')} className={`grid place-content-center border rounded-full py-2 px-5 hover:bg-white hover:text-black transition-colors cursor-pointer whitespace-nowrap ${service_or_product === 'services' && 'bg-white text-black'}`}>
                            <span>Servicios</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 border-b border-neutral-400">
                        <input className="bg-transparent outline-none py-2 w-full placeholder:text-neutral-400 text-lg" type={'text'} placeholder={'Otro (especificar)'} onChange={(e) => setServiceOrProduct(e.target.value)} />
                    </div>
                </Section>
                <Section 
                    title={"¿Cuál es el plazo de entrega previsto?"} 
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-2 pb-3">
                        <div onClick={() => setExpectedDeliverTime({ from: 0, to: 1 })} className={`grid place-content-center border rounded-full py-2 px-5 hover:bg-white hover:text-black transition-colors cursor-pointer whitespace-nowrap ${expected_deilvertime.from == 0 && 'bg-white text-black'}`}>
                            <span>{"< 1 mes"}</span>
                        </div>
                        <div onClick={() => setExpectedDeliverTime({ from: 1, to: 3 })} className={`grid place-content-center border rounded-full py-2 px-5 hover:bg-white hover:text-black transition-colors cursor-pointer whitespace-nowrap ${expected_deilvertime.from == 1 && 'bg-white text-black'}`}>
                            <span>1 - 3 meses</span>
                        </div>
                        <div onClick={() => setExpectedDeliverTime({ from: 3, to: 6 })} className={`grid place-content-center border rounded-full py-2 px-5 hover:bg-white hover:text-black transition-colors cursor-pointer whitespace-nowrap ${expected_deilvertime.from == 3 && 'bg-white text-black'}`}>
                            <span>3 - 6 meses</span>
                        </div>
                        <div onClick={() => setExpectedDeliverTime({ from: 6, to: 0 })} className={`grid place-content-center border rounded-full py-2 px-5 hover:bg-white hover:text-black transition-colors cursor-pointer whitespace-nowrap ${expected_deilvertime.from == 6 && 'bg-white text-black'}`}>
                            <span>{"> 6 meses"}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 border-b border-neutral-400">
                        <input className="bg-transparent outline-none py-2 w-full placeholder:text-neutral-400 text-lg" type={'text'} placeholder={'Otro (especificar)'} onChange={(e) => setExpectedDeliverTime(e.target.value)} />
                    </div>
                </Section>
            </section>
            <section id="step3" className={`flex flex-col gap-6 ${step == 3 ? 'block' : 'hidden'}`}>
                <Section 
                    title={"¿Qué funcionalidades debe tener la web?"} 
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-2 pb-3">
                        <div onClick={() => handleFunctionabilites("contact-form")} className={`grid place-content-center border rounded-full py-2 px-5 hover:bg-white hover:text-black transition-colors cursor-pointer whitespace-nowrap ${functionalities.indexOf("contact-form") > -1 && 'bg-white text-black'}`}>
                            <span>Formulario de contacto</span>
                        </div>
                        <div onClick={() => handleFunctionabilites("image-gallery")} className={`grid place-content-center border rounded-full py-2 px-5 hover:bg-white hover:text-black transition-colors cursor-pointer whitespace-nowrap ${functionalities.indexOf("image-gallery") > -1 && 'bg-white text-black'}`}>
                            <span>Galería de imágenes</span>
                        </div>
                        <div onClick={() => handleFunctionabilites("blog-section")} className={`grid place-content-center border rounded-full py-2 px-5 hover:bg-white hover:text-black transition-colors cursor-pointer whitespace-nowrap ${functionalities.indexOf("blog-section") > -1 && 'bg-white text-black'}`}>
                            <span>Sección de blogs</span>
                        </div>
                        <div onClick={() => handleFunctionabilites("social-media-integration")} className={`grid place-content-center border rounded-full py-2 px-5 hover:bg-white hover:text-black transition-colors cursor-pointer whitespace-nowrap ${functionalities.indexOf("social-media-integration") > -1 && 'bg-white text-black'}`}>
                            <span>Integración de redes sociales</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 border-b border-neutral-400">
                        <input className="bg-transparent outline-none py-2 w-full placeholder:text-neutral-400 text-lg" type={'text'} placeholder={'Otro (especificar)'} ref={functionalities_other} />
                    </div>
                </Section>
                <Section 
                    title={"¿La web debe ser responsive o tener un diseño específico?"} 
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-2 pb-3">
                        <div onClick={() => setWebDesignType("responsive")} className={`grid place-content-center border rounded-full py-2 px-5 hover:bg-white hover:text-black transition-colors cursor-pointer whitespace-nowrap ${web_design_type == 'responsive' && 'bg-white text-black'}`}>
                            <span>Responsive</span>
                        </div>
                        <div onClick={() => setWebDesignType("specific-design")} className={`grid place-content-center border rounded-full py-2 px-5 hover:bg-white hover:text-black transition-colors cursor-pointer whitespace-nowrap ${web_design_type == 'specific-design' && 'bg-white text-black'}`}>
                            <span>Diseño específico</span>
                        </div>
                    </div>
                </Section>
                <Section 
                    title={"¿Se necesitan funcionalidades de comercio electrónico en la web?"} 
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-2 pb-3">
                        <div onClick={() => setEcommerceFunc(true)} className={`grid place-content-center border rounded-full py-2 px-5 hover:bg-white hover:text-black transition-colors cursor-pointer whitespace-nowrap ${ecommerce_funtionabilites && 'bg-white text-black'}`}>
                            <span>Sí</span>
                        </div>
                        <div onClick={() => setEcommerceFunc(false)} className={`grid place-content-center border rounded-full py-2 px-5 hover:bg-white hover:text-black transition-colors cursor-pointer whitespace-nowrap ${!ecommerce_funtionabilites && 'bg-white text-black'}`}>
                            <span>No</span>
                        </div>
                    </div>
                </Section>
                <Section 
                    title={"¿Tiene el cliente algún contenido (texto, imágenes, videos) para incluir en la web?"} 
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-2 pb-3">
                        <div onClick={() => setContentToInclude(true)} className={`grid place-content-center border rounded-full py-2 px-5 hover:bg-white hover:text-black transition-colors cursor-pointer whitespace-nowrap ${content_to_include && 'bg-white text-black'}`}>
                            <span>Sí</span>
                        </div>
                        <div onClick={() => setContentToInclude(false)} className={`grid place-content-center border rounded-full py-2 px-5 hover:bg-white hover:text-black transition-colors cursor-pointer whitespace-nowrap ${!content_to_include && 'bg-white text-black'}`}>
                            <span>No</span>
                        </div>
                    </div>
                </Section>
                <Section 
                    title={"¿Qué lenguaje de programación y tecnologías se prefieren para el desarrollo?"} 
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-2 pb-3">
                        <div onClick={() => setPreferredTechnologies("HTML/CSS/JavaScript")} className={`grid place-content-center border rounded-full py-2 px-5 hover:bg-white hover:text-black transition-colors cursor-pointer whitespace-nowrap ${preferred_technologies == 'HTML/CSS/JavaScript' && 'bg-white text-black'}`}>
                            <span>HTML/CSS/JavaScript</span>
                        </div>
                        <div onClick={() => setPreferredTechnologies("PHP/MySQL")} className={`grid place-content-center border rounded-full py-2 px-5 hover:bg-white hover:text-black transition-colors cursor-pointer whitespace-nowrap ${preferred_technologies == 'PHP/MySQL' && 'bg-white text-black'}`}>
                            <span>PHP/MySQL</span>
                        </div>
                        <div onClick={() => setPreferredTechnologies("Python/Django")} className={`grid place-content-center border rounded-full py-2 px-5 hover:bg-white hover:text-black transition-colors cursor-pointer whitespace-nowrap ${preferred_technologies == 'Python/Django' && 'bg-white text-black'}`}>
                            <span>Python/Django</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 border-b border-neutral-400">
                        <input className="bg-transparent outline-none py-2 w-full placeholder:text-neutral-400 text-lg" type={'text'} placeholder={'Otro (especificar)'} onChange={(e) => setPreferredTechnologies(e.target.value)} />
                    </div>
                </Section>
                <Section 
                    title={"¿Quién será el responsable de la gestión de la web una vez finalizado el proyecto?"} 
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-2 pb-3">
                        <div onClick={() => setResponsibleForManaging("client")} className={`grid place-content-center border rounded-full py-2 px-5 hover:bg-white hover:text-black transition-colors cursor-pointer whitespace-nowrap ${responsible_for_managing == 'client' && 'bg-white text-black'}`}>
                            <span>El cliente</span>
                        </div>
                        <div onClick={() => setResponsibleForManaging("developer")} className={`grid place-content-center border rounded-full py-2 px-5 hover:bg-white hover:text-black transition-colors cursor-pointer whitespace-nowrap ${responsible_for_managing == 'developer' && 'bg-white text-black'}`}>
                            <span>El desarrollador</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 border-b border-neutral-400">
                        <input className="bg-transparent outline-none py-2 w-full placeholder:text-neutral-400 text-lg" type={'text'} placeholder={'Otro (especificar)'} onChange={(e) => setResponsibleForManaging(e.target.value)} />
                    </div>
                </Section>
                <Section 
                    title={"¿Cuál es la estrategia de marketing y posicionamiento del cliente?"} 
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-2 pb-3">
                        <div onClick={() => setMarketingStrategy("social-media")} className={`grid place-content-center border rounded-full py-2 px-5 hover:bg-white hover:text-black transition-colors cursor-pointer whitespace-nowrap ${marketing_strategy == 'social-media' && 'bg-white text-black'}`}>
                            <span>Redes sociales</span>
                        </div>
                        <div onClick={() => setMarketingStrategy("email-marketing")} className={`grid place-content-center border rounded-full py-2 px-5 hover:bg-white hover:text-black transition-colors cursor-pointer whitespace-nowrap ${marketing_strategy == 'email-marketing' && 'bg-white text-black'}`}>
                            <span>Correo electrónico</span>
                        </div>
                        <div onClick={() => setMarketingStrategy("search-engine-optimization")} className={`grid place-content-center border rounded-full py-2 px-5 hover:bg-white hover:text-black transition-colors cursor-pointer whitespace-nowrap ${marketing_strategy == 'search-engine-optimization' && 'bg-white text-black'}`}>
                            <span>SEO</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 border-b border-neutral-400">
                        <input className="bg-transparent outline-none py-2 w-full placeholder:text-neutral-400 text-lg" type={'text'} placeholder={'Otro (especificar)'} onChange={(e) => setMarketingStrategy(e.target.value)} />
                    </div>
                </Section>
                <Section 
                    title={"Are there competitor websites that should be taken into account as references?"} 
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-2 pb-3">
                        <div onClick={() => setCompetitorWebsites(true)} className={`grid place-content-center border rounded-full py-2 px-5 hover:bg-white hover:text-black transition-colors cursor-pointer whitespace-nowrap ${competitor_websites && 'bg-white text-black'}`}>
                            <span>Sí</span>
                        </div>
                        <div onClick={() => setCompetitorWebsites(false)} className={`grid place-content-center border rounded-full py-2 px-5 hover:bg-white hover:text-black transition-colors cursor-pointer whitespace-nowrap ${!competitor_websites && 'bg-white text-black'}`}>
                            <span>No</span>
                        </div>
                    </div>
                </Section>
            </section>
            <div className="flex items-center gap-2 lazy-load-4">
                <button type={'button'} onClick={handlePrevStep} className={`${step == 1 ? 'hidden' : 'block'} py-2 px-4 bg-gradient rounded-xl text-lg uppercase font-bold text-center cursor-pointer ${!projectQuoteAnimation ? 'block' : 'hidden'} w-full`}>Atras</button>
                <button type={step == 3 ? 'submit' : 'button'} onClick={handleNextStep} className={`py-2 px-4 bg-gradient rounded-xl text-lg uppercase font-bold text-center cursor-pointer ${!projectQuoteAnimation ? 'block' : 'hidden'} w-full`}>{step < 3 ? 'Siguiente' : 'Enviar'}</button>
            </div>
        </form>
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

    const { placeholder, ref, type, name, required } = props;

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