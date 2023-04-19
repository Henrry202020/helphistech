import axios from "axios";
import { useRef, useState } from "react";
// Layout
import Layout from "@/components/Layout";
// Hooks
import useContextProvider from "@/hooks/useAppContextProvider";

export default function ProjectQuote() {

    // Get functions and variables from context
    const { darkMode } = useContextProvider();

    const [ showVideoCallForm, setShowVideoCallForm ] = useState(false);

    return (
        <Layout title={"kontaktiere uns"}>
            <div className="flex flex-col items-center justify-center gap-16 py-20 xl:gap-12 max-w-7xl mx-auto lg:h-full" id="quote-project-form">
                <div className={`flex flex-col items-center gap-10 lg:h-full text-center w-full border-b ${darkMode ? 'border-neutral-900' : 'border-zinc-200'} pb-20 transition-colors`}>
                    <div className={`flex flex-col justify-center gap-5 w-full`}>
                        <div className={`text-6xl font-extrabold text-gradient h-fit lg:leading-[4rem] `}>
                            <h1 className="w-full">Cotiza tu proyecto.</h1>
                            {/* <br /> 
                            <span className="w-full"></span> */}
                        </div>
                        <div className={`${darkMode ? 'text-dark' : 'text-light'}`}>Gracias por tu interés. ¡Cuéntanos sobre tu proyecto o idea para que podamos empezar a trabajar juntos!</div>
                    </div>
                    <div className="flex flex-col items-center gap-5">
                        <div className={`text-5xl font-extrabold text-gradient h-fit lg:leading-[4rem] `}>
                            <h2 className="w-full">Agenda tu videollamada.</h2>
                            {/* <br /> 
                            <span className="w-full">Videoanruf.</span> */}
                        </div>
                        <div className={`${darkMode ? 'text-dark' : 'text-light'}`}>También puedes agendar una videollamada y hablar directamente con nosotros!</div>
                        <button onClick={() => setShowVideoCallForm(current => !current)} className="px-4 py-2 rounded-sm text-white font-semibold uppercase bg-primary w-fit select-none">Agendar Videollamada</button>
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
        </Layout>
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
        <form className="flex flex-col gap-5 " onSubmit={handleSubmit}>
            { message.text && (
                <div className={`${message.error ? 'bg-red-500' : 'bg-primary'} py-2 w-full text-white uppercase font-semibold text-center rounded-md`}>{message.text}</div>
            )}
            <div className="flex flex-col">
                <div className="text-2xl font-semibold">Nombre completo</div>
                <div className="flex items-center gap-2 border-b border-neutral-400">
                    <input className="bg-transparent outline-none py-2 w-full placeholder:text-neutral-400 text-lg" type={'text'} placeholder={'Ingresa tu nombre completo'} onChange={(e) => setFullName(e.target.value)} />
                </div>
            </div>
            <div className="flex flex-col">
                <div className="text-2xl font-semibold">E-mail de contacto</div>
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
                    <select name="" id="" className="bg-transparent video-call-select outline-none border border-neutral-600 rounded-sm px-3 py-2 text-lg" value={hour} onChange={(e) => setHour(e.target.value)}>
                        <option value="">Seleccionar hora</option>
                        <option value="14:00">14:00</option>
                        <option value="16:00">16:00</option>
                        <option value="20:00">20:00</option>
                    </select>
                </div>
            </div>
            <div className="flex items-center gap-2 text-white">
                <button type={'button'} onClick={closeVideoCallForm} className={`py-2 px-4 bg-primary rounded-sm text-lg uppercase font-bold text-center cursor-pointer w-full`}>Atrás</button>
                <button type={'submit'} className={`py-2 px-4 bg-primary rounded-sm text-lg uppercase font-bold text-center cursor-pointer w-full`}>Enviar</button>
            </div>
        </form>
    )
}

function FormComponent() {

    // Get functions and variables from context
    const { darkMode } = useContextProvider();

    // On user submit form show a message
    const [ message, setMessage ] = useState({ error: false, text: '' });

    /* Project form values */
    // 1ST FORM - Project type
    const [ type, setType ] = useState('');
    // Estimated budget
    const [ budget, setBudget ] = useState({});
    // Tell us more
    const full_name = useRef('');
    const email = useRef('');
    const description = useRef('');

    // 2ND FORM
    // What type of business does the client have?
    const [ business_type, setBusinessType ] = useState('');
    // What is the company's vision and mission?
    const [ company_vision, setCompanyVision ] = useState([]);
    // Who is the target audience for the company?
    const [ target_audience, setTargetAudience ] = useState([]);
    // What services or products does the company offer?
    const [ service_or_product, setServiceOrProduct ] = useState('');
    // What is the expected delivery timeline?
    const [ expected_deilvertime, setExpectedDeliverTime ] = useState({ from: null, to: null });
    
    // 3RD FORM -  What functionalities should the web have?
    const [ functionalities, setFunctionalities ] = useState([]);
    // Should the web be responsive or have a specific design?
    const [ web_design_type, setWebDesignType ] = useState([]);
    // Are e-commerce functionalities needed on the web?
    const [ ecommerce_funtionabilites, setEcommerceFunc ] = useState(false);
    // Does the client have any content (text, images, videos) to include on the web?
    const [ content_to_include, setContentToInclude ] = useState(false);
    // What programming language and technologies are preferred for development?
    const [ preferred_technologies, setPreferredTechnologies ] = useState([]);
    // Who will be responsible for managing the web once the project is completed?
    const [ responsible_for_managing, setResponsibleForManaging ] = useState('');
    // What is the client's marketing and positioning strategy?
    const [ marketing_strategy, setMarketingStrategy ] = useState([]);
    // Are there competitor websites that should be taken into account as references?
    const [ competitor_websites, setCompetitorWebsites ] = useState(false);
    // 
    function setMultiOptionState(state, setter, value) {
        if(state.indexOf(value) > -1) {
            const newState = state.filter(f => f != value);
            setter(newState);
        } else {
            setter(current => current.concat([value]));
        }
    }

    // Reset form fields on submit
    function resetForm() {
        setType('');
        setBudget({})
        full_name.current.value = '';
        email.current.value = '';
        description.current.value = '';
        // 
        setBusinessType('');
        setCompanyVision([]);
        setTargetAudience([]);
        setServiceOrProduct('');
        setExpectedDeliverTime({ from: null, to: null });
        // 
        setFunctionalities([]);
        setWebDesignType([]);
        setEcommerceFunc(false);
        setContentToInclude(false);
        setPreferredTechnologies([]);
        setResponsibleForManaging('');
        setMarketingStrategy([]);
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
        if([type, full_name.current.value, email.current.value, business_type, company_vision, target_audience, service_or_product, web_design_type, ecommerce_funtionabilites, content_to_include, preferred_technologies, responsible_for_managing, marketing_strategy, competitor_websites].includes('')) {
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
                business_type,
                company_vision,
                target_audience,
                service_or_product,
                expected_deilvertime
            },
            project_info: {
                functionalities,
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
        // Send project to server
        try {
            await axios.post('/api/sendProject', { project })    
            showMessage(false, '¡Se enviaron los datos correctamente!', 5000)
            resetForm();   
        } catch (error) {
            showMessage(true, 'Hubo un error al enviar los datos.', 5000)
        }
    }

    // Form steps
    const [ step, setStep ] = useState(1);

    function handleNextStep() {
        if(step == 1 && [type, full_name.current.value, email.current.value, description.current.value].includes('')) {
            showMessage(true, 'Debes completar todos los campos.', 5000)
            return;
        }
        if(step == 2 && [business_type, company_vision, target_audience, service_or_product].includes('')) {
            showMessage(true, 'Debes completar todos los campos.', 5000)
            return;
        }
        if(step == 3 && [web_design_type, ecommerce_funtionabilites, content_to_include, preferred_technologies, responsible_for_managing, marketing_strategy, competitor_websites].includes('')) {
            showMessage(true, 'Debes completar todos los campos.', 5000)
            return;
        }
        if(step < 3) {
            // If type, fullname, email and phone are void return
            setStep(current => current + 1);
            setMessage({ error: false, text: '' })
        }
    }

    function handlePrevStep() {
        if(step > 1) {
            setStep(current => current - 1);
        }
    }

    return (
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            { message.text && (
                <div className={`${message.error ? 'bg-red-500' : 'bg-primary'} py-2 w-full text-white uppercase font-semibold text-center rounded-md`}>{message.text}</div>
            )}
            <section id="step1" className={`flex flex-col gap-6 ${step == 1 ? 'block' : 'hidden'}`}>
                <Section 
                    title={"¿Qué tipo de proyecto?"} 
                    classes={``}
                >
                    <div className="grid grid-cols-2 sm:grid-cols-3 items-center gap-2">
                        <div onClick={() => setType('website')} className={`grid place-content-center border rounded-full py-2 px-5 transition-colors cursor-pointer whitespace-nowrap ${darkMode ? `hover:bg-white hover:text-black ${type === 'website' && 'bg-white text-black'}` : `hover:bg-black hover:text-white ${type === 'website' && 'bg-black text-white'}`}`}>
                            <span>Sitio web</span>
                        </div>
                        <div onClick={() => setType('ecommerce')} className={`grid place-content-center border rounded-full py-2 px-5 transition-colors cursor-pointer whitespace-nowrap ${darkMode ? `hover:bg-white hover:text-black ${type === 'ecommerce' && 'bg-white text-black'}` : `hover:bg-black hover:text-white ${type === 'ecommerce' && 'bg-black text-white'}`}`}>
                            <span>E-Commerce</span>
                        </div>
                        <div onClick={() => setType('app')} className={`grid place-content-center border rounded-full py-2 px-5 transition-colors cursor-pointer whitespace-nowrap ${darkMode ? `hover:bg-white hover:text-black ${type === 'app' && 'bg-white text-black'}` : `hover:bg-black hover:text-white ${type === 'app' && 'bg-black text-white'}`}`}>
                            <span>Aplicación</span>
                        </div>
                    </div>
                </Section>
                <Section 
                    title={"Información de contacto"}  
                    classes={``}
                >
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center border-b border-neutral-400">
                            <input className="bg-transparent outline-none py-2 w-full placeholder:text-neutral-400 text-lg" type={'text'} placeholder={'Ingresa tu nombre completo'} ref={full_name} />
                        </div>
                        <div className="flex items-center border-b border-neutral-400">
                            <input className="bg-transparent outline-none py-2 w-full placeholder:text-neutral-400 text-lg" type={'email'} placeholder={'Ingresa tu e-mail'} ref={email} />
                        </div>
                    </div>
                </Section>
                <Section 
                    title={"Cuéntanos más acerca del proyecto"} 
                    classes={``}
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
                    classes={``}
                >
                    <div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-5 items-center gap-2">
                        <div onClick={() => setBudget({ from: 1, to: 5000 })} className={`grid place-content-center border rounded-full py-2 px-5 transition-colors cursor-pointer whitespace-nowrap ${darkMode ? `hover:bg-white hover:text-black ${budget.from === 1 && 'bg-white text-black'}` : `hover:bg-black hover:text-white ${budget.from === 1 && 'bg-black text-white'}`}`}>
                            <span>{'< 5K'}</span>
                        </div>
                        <div onClick={() => setBudget({ from: 5000, to: 10000 })} className={`grid place-content-center border rounded-full py-2 px-5 transition-colors cursor-pointer whitespace-nowrap ${darkMode ? `hover:bg-white hover:text-black ${budget.from === 5000 && 'bg-white text-black'}` : `hover:bg-black hover:text-white ${budget.from === 5000 && 'bg-black text-white'}`}`}>
                            <span>{'5K - 10K'}</span>
                        </div>
                        <div onClick={() => setBudget({ from: 10000, to: 20000 })} className={`grid place-content-center border rounded-full py-2 px-5 transition-colors cursor-pointer whitespace-nowrap ${darkMode ? `hover:bg-white hover:text-black ${budget.from === 10000 && 'bg-white text-black'}` : `hover:bg-black hover:text-white ${budget.from === 10000 && 'bg-black text-white'}`}`}>
                            <span>{'10K - 20K'}</span>
                        </div>
                        <div onClick={() => setBudget({ from: 20000, to: 30000 })} className={`grid place-content-center border rounded-full py-2 px-5 transition-colors cursor-pointer whitespace-nowrap ${darkMode ? `hover:bg-white hover:text-black ${budget.from === 20000 && 'bg-white text-black'}` : `hover:bg-black hover:text-white ${budget.from === 20000 && 'bg-black text-white'}`}`}>
                            <span>{'20K - 30K'}</span>
                        </div>
                        <div onClick={() => setBudget({ from: 30000, to: 100000 })} className={`grid place-content-center border rounded-full py-2 px-5 transition-colors cursor-pointer whitespace-nowrap ${darkMode ? `hover:bg-white hover:text-black ${budget.from === 30000 && 'bg-white text-black'}` : `hover:bg-black hover:text-white ${budget.from === 30000 && 'bg-black text-white'}`}`}>
                            <span>{'> 30K'}</span>
                        </div>
                    </div>
                </Section>
            </section>
            <section id="step2" className={`flex flex-col gap-6 ${step == 2 ? 'block' : 'hidden'}`}>
                <Section 
                    title={"¿Qué tipo de negocio tiene el cliente?"} 
                >
                    <div className="grid grid-cols-2 sm:grid-cols-3 items-center gap-2 pb-3">
                        <div onClick={() => setBusinessType('retail')} className={`grid place-content-center border rounded-full py-2 px-5 transition-colors cursor-pointer whitespace-nowrap ${darkMode ? `hover:bg-white hover:text-black ${business_type === 'retail' && 'bg-white text-black'}` : `hover:bg-black hover:text-white ${business_type === 'retail' && 'bg-black text-white'}`}`}>
                            <span>Minorista</span>
                        </div>
                        <div onClick={() => setBusinessType('service')} className={`grid place-content-center border rounded-full py-2 px-5 transition-colors cursor-pointer whitespace-nowrap ${darkMode ? `hover:bg-white hover:text-black ${business_type === 'service' && 'bg-white text-black'}` : `hover:bg-black hover:text-white ${business_type === 'service' && 'bg-black text-white'}`}`}>
                            <span>Servicio</span>
                        </div>
                        <div onClick={() => setBusinessType('manufacturing')} className={`grid place-content-center border rounded-full py-2 px-5 transition-colors cursor-pointer whitespace-nowrap ${darkMode ? `hover:bg-white hover:text-black ${business_type === 'manufacturing' && 'bg-white text-black'}` : `hover:bg-black hover:text-white ${business_type === 'manufacturing' && 'bg-black text-white'}`}`}>
                            <span>Fabricación</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 border-b border-neutral-400">
                        <input className="bg-transparent outline-none py-2 w-full placeholder:text-neutral-400 text-lg" type={'text'} placeholder={'Otro (Especificar)'} onChange={(e) => setBusinessType(e.target.value)} />
                    </div>
                </Section>
                <Section 
                    title={"¿Cuál es la visión y misión de la empresa?"} 
                >
                    <div className="grid grid-cols-1 items-center gap-2 pb-3">
                        <div onClick={() => setMultiOptionState(company_vision, setCompanyVision, "increase-profitability")} className={`grid place-content-center border rounded-full py-2 px-5 transition-colors cursor-pointer whitespace-nowrap ${darkMode ? `hover:bg-white hover:text-black ${company_vision.indexOf("increase-profitability") > -1 && 'bg-white text-black'}` : `hover:bg-black hover:text-white ${company_vision.indexOf("increase-profitability") > -1 && 'bg-black text-white'}`}`}>
                            <span>Aumentar la rentabilidad</span>
                        </div>
                        <div onClick={() => setMultiOptionState(company_vision, setCompanyVision, "enhance-customer-satisfaction")} className={`grid place-content-center border rounded-full py-2 px-5 transition-colors cursor-pointer whitespace-nowrap ${darkMode ? `hover:bg-white hover:text-black ${company_vision.indexOf("enhance-customer-satisfaction") > -1 && 'bg-white text-black'}` : `hover:bg-black hover:text-white ${company_vision.indexOf("enhance-customer-satisfaction") > -1 && 'bg-black text-white'}`}`}>
                            <span>Mejorar la satisfacción del cliente</span>
                        </div>
                        <div onClick={() => setMultiOptionState(company_vision, setCompanyVision, "promote-sustainability")} className={`grid place-content-center border rounded-full py-2 px-5 transition-colors cursor-pointer whitespace-nowrap ${darkMode ? `hover:bg-white hover:text-black ${company_vision.indexOf("promote-sustainability") > -1 && 'bg-white text-black'}` : `hover:bg-black hover:text-white ${company_vision.indexOf("promote-sustainability") > -1 && 'bg-black text-white'}`}`}>
                            <span>Promover la sostenibilidad</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 border-b border-neutral-400">
                        <input className="bg-transparent outline-none py-2 w-full placeholder:text-neutral-400 text-lg" type={'text'} placeholder={'Otro (Especificar)'} onChange={(e) => setCompanyVision([e.target.value])} />
                    </div>
                </Section>
                <Section 
                    title={"¿Cuál es el público objetivo de la empresa?"} 
                >
                    <div className="grid grid-cols-2 sm:grid-cols-3 items-center gap-2 pb-3">
                        <div onClick={() => setMultiOptionState(target_audience, setTargetAudience, "children")} className={`grid place-content-center border rounded-full py-2 px-5 transition-colors cursor-pointer whitespace-nowrap ${darkMode ? `hover:bg-white hover:text-black ${target_audience.indexOf("children") > -1 && 'bg-white text-black'}` : `hover:bg-black hover:text-white ${target_audience.indexOf("children") > -1 && 'bg-black text-white'}`}`}>
                            <span>Niños</span>
                        </div>
                        <div onClick={() => setMultiOptionState(target_audience, setTargetAudience, "teenagers")} className={`grid place-content-center border rounded-full py-2 px-5 transition-colors cursor-pointer whitespace-nowrap ${darkMode ? `hover:bg-white hover:text-black ${target_audience.indexOf("teenagers") > -1 && 'bg-white text-black'}` : `hover:bg-black hover:text-white ${target_audience.indexOf("teenagers") > -1 && 'bg-black text-white'}`}`}>
                            <span>Adolescentes</span>
                        </div>
                        <div onClick={() => setMultiOptionState(target_audience, setTargetAudience, "young-adults")} className={`grid place-content-center border rounded-full py-2 px-5 transition-colors cursor-pointer whitespace-nowrap ${darkMode ? `hover:bg-white hover:text-black ${target_audience.indexOf("young-adults") > -1 && 'bg-white text-black'}` : `hover:bg-black hover:text-white ${target_audience.indexOf("young-adults") > -1 && 'bg-black text-white'}`}`}>
                            <span>Adultos jovenes</span>
                        </div>
                        <div onClick={() => setMultiOptionState(target_audience, setTargetAudience, "adults")} className={`grid place-content-center border rounded-full py-2 px-5 transition-colors cursor-pointer whitespace-nowrap ${darkMode ? `hover:bg-white hover:text-black ${target_audience.indexOf("adults") > -1 && 'bg-white text-black'}` : `hover:bg-black hover:text-white ${target_audience.indexOf("adults") > -1 && 'bg-black text-white'}`}`}>
                            <span>Adultos</span>
                        </div>
                        <div onClick={() => setMultiOptionState(target_audience, setTargetAudience, "seniors")} className={`grid place-content-center border rounded-full py-2 px-5 transition-colors cursor-pointer whitespace-nowrap ${darkMode ? `hover:bg-white hover:text-black ${target_audience.indexOf("seniors") > -1 && 'bg-white text-black'}` : `hover:bg-black hover:text-white ${target_audience.indexOf("seniors") > -1 && 'bg-black text-white'}`}`}>
                            <span>Mayores</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 border-b border-neutral-400">
                        <input className="bg-transparent outline-none py-2 w-full placeholder:text-neutral-400 text-lg" type={'text'} placeholder={'Otro (Especificar)'} onChange={(e) => setTargetAudience([e.target.value])} />
                    </div>
                </Section>
                <Section 
                    title={"¿Qué servicios o productos ofrece la empresa?"} 
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-2 pb-3">
                        <div onClick={() => setServiceOrProduct('products')} className={`grid place-content-center border rounded-full py-2 px-5 transition-colors cursor-pointer whitespace-nowrap ${darkMode ? `hover:bg-white hover:text-black ${service_or_product === 'products' && 'bg-white text-black'}` : `hover:bg-black hover:text-white ${service_or_product === 'products' && 'bg-black text-white'}`}`}>
                            <span>Productos</span>
                        </div>
                        <div onClick={() => setServiceOrProduct('services')} className={`grid place-content-center border rounded-full py-2 px-5 transition-colors cursor-pointer whitespace-nowrap ${darkMode ? `hover:bg-white hover:text-black ${service_or_product === 'services' && 'bg-white text-black'}` : `hover:bg-black hover:text-white ${service_or_product === 'services' && 'bg-black text-white'}`}`}>
                            <span>Servicios</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 border-b border-neutral-400">
                        <input className="bg-transparent outline-none py-2 w-full placeholder:text-neutral-400 text-lg" type={'text'} placeholder={'Otro (Especificar)'} onChange={(e) => setServiceOrProduct(e.target.value)} />
                    </div>
                </Section>
                <Section 
                    title={"¿Cuál es el plazo de entrega previsto?"} 
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-2 pb-3">
                        <div onClick={() => setExpectedDeliverTime({ from: 0, to: 1 })} className={`grid place-content-center border rounded-full py-2 px-5 transition-colors cursor-pointer whitespace-nowrap ${darkMode ? `hover:bg-white hover:text-black ${expected_deilvertime.from == 0 && 'bg-white text-black'}` : `hover:bg-black hover:text-white ${expected_deilvertime.from == 0 && 'bg-black text-white'}`}`}>
                            <span>{"< 1 mes"}</span>
                        </div>
                        <div onClick={() => setExpectedDeliverTime({ from: 1, to: 3 })} className={`grid place-content-center border rounded-full py-2 px-5 transition-colors cursor-pointer whitespace-nowrap ${darkMode ? `hover:bg-white hover:text-black ${expected_deilvertime.from == 1 && 'bg-white text-black'}` : `hover:bg-black hover:text-white ${expected_deilvertime.from == 1 && 'bg-black text-white'}`}`}>
                            <span>1 - 3 meses</span>
                        </div>
                        <div onClick={() => setExpectedDeliverTime({ from: 3, to: 6 })} className={`grid place-content-center border rounded-full py-2 px-5 transition-colors cursor-pointer whitespace-nowrap ${darkMode ? `hover:bg-white hover:text-black ${expected_deilvertime.from == 3 && 'bg-white text-black'}` : `hover:bg-black hover:text-white ${expected_deilvertime.from == 3 && 'bg-black text-white'}`}`}>
                            <span>3 - 6 meses</span>
                        </div>
                        <div onClick={() => setExpectedDeliverTime({ from: 6, to: 0 })} className={`grid place-content-center border rounded-full py-2 px-5 transition-colors cursor-pointer whitespace-nowrap ${darkMode ? `hover:bg-white hover:text-black ${expected_deilvertime.from == 6 && 'bg-white text-black'}` : `hover:bg-black hover:text-white ${expected_deilvertime.from == 6 && 'bg-black text-white'}`}`}>
                            <span>{"> 6 meses"}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 border-b border-neutral-400">
                        <input className="bg-transparent outline-none py-2 w-full placeholder:text-neutral-400 text-lg" type={'text'} placeholder={'Otro (Especificar)'} onChange={(e) => setExpectedDeliverTime(e.target.value)} />
                    </div>
                </Section>
            </section>
            <section id="step3" className={`flex flex-col gap-6 ${step == 3 ? 'block' : 'hidden'}`}>
                <Section 
                    title={"¿Qué funcionalidades debe tener la web?"} 
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-2 pb-3">
                        <div onClick={() => setMultiOptionState(functionalities, setFunctionalities, "contact-form")} className={`grid place-content-center border rounded-full py-2 px-5 transition-colors cursor-pointer whitespace-nowrap ${darkMode ? `hover:bg-white hover:text-black ${functionalities.indexOf("contact-form") > -1 && 'bg-white text-black'}` : `hover:bg-black hover:text-white ${functionalities.indexOf("contact-form") > -1 && 'bg-black text-white'}`}`}>
                            <span>Formulario de contacto</span>
                        </div>
                        <div onClick={() => setMultiOptionState(functionalities, setFunctionalities, "image-gallery")} className={`grid place-content-center border rounded-full py-2 px-5 transition-colors cursor-pointer whitespace-nowrap ${darkMode ? `hover:bg-white hover:text-black ${functionalities.indexOf("image-gallery") > -1 && 'bg-white text-black'}` : `hover:bg-black hover:text-white ${functionalities.indexOf("image-gallery") > -1 && 'bg-black text-white'}`}`}>
                            <span>Galería de imágenes</span>
                        </div>
                        <div onClick={() => setMultiOptionState(functionalities, setFunctionalities, "blog-section")} className={`grid place-content-center border rounded-full py-2 px-5 transition-colors cursor-pointer whitespace-nowrap ${darkMode ? `hover:bg-white hover:text-black ${functionalities.indexOf("blog-section") > -1 && 'bg-white text-black'}` : `hover:bg-black hover:text-white ${functionalities.indexOf("blog-section") > -1 && 'bg-black text-white'}`}`}>
                            <span>Sección de blogs</span>
                        </div>
                        <div onClick={() => setMultiOptionState(functionalities, setFunctionalities, "social-media-integration")} className={`grid place-content-center border rounded-full py-2 px-5 transition-colors cursor-pointer whitespace-nowrap ${darkMode ? `hover:bg-white hover:text-black ${functionalities.indexOf("social-media-integration") > -1 && 'bg-white text-black'}` : `hover:bg-black hover:text-white ${functionalities.indexOf("social-media-integration") > -1 && 'bg-black text-white'}`}`}>
                            <span>Integración de redes sociales</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 border-b border-neutral-400">
                        <input className="bg-transparent outline-none py-2 w-full placeholder:text-neutral-400 text-lg" type={'text'} placeholder={'Otro (Especificar)'} onChange={(e) => setFunctionalities([e.target.value])} />
                    </div>
                </Section>
                <Section 
                    title={"¿La web debe ser responsive o tener un diseño específico?"} 
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-2 pb-3">
                        <div onClick={() => setMultiOptionState(web_design_type, setWebDesignType, "responsive")} className={`grid place-content-center border rounded-full py-2 px-5 transition-colors cursor-pointer whitespace-nowrap ${darkMode ? `hover:bg-white hover:text-black ${web_design_type.indexOf("responsive") > -1 && 'bg-white text-black'}` : `hover:bg-black hover:text-white ${web_design_type.indexOf("responsive") > -1 && 'bg-black text-white'}`}`}>
                            <span>Responsive</span>
                        </div>
                        <div onClick={() => setMultiOptionState(web_design_type, setWebDesignType, "specific-design")} className={`grid place-content-center border rounded-full py-2 px-5 transition-colors cursor-pointer whitespace-nowrap ${darkMode ? `hover:bg-white hover:text-black ${web_design_type.indexOf("specific-design") > -1 && 'bg-white text-black'}` : `hover:bg-black hover:text-white ${web_design_type.indexOf("specific-design") > -1 && 'bg-black text-white'}`}`}>
                            <span>Diseño específico</span>
                        </div>
                    </div>
                </Section>
                <Section 
                    title={"¿Se necesitan funcionalidades de E-Commerce en la web?"} 
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-2 pb-3">
                        <div onClick={() => setEcommerceFunc(true)} className={`grid place-content-center border rounded-full py-2 px-5 transition-colors cursor-pointer whitespace-nowrap ${darkMode ? `hover:bg-white hover:text-black ${ecommerce_funtionabilites && 'bg-white text-black'}` : `hover:bg-black hover:text-white ${ecommerce_funtionabilites && 'bg-black text-white'}`}`}>
                            <span>Sí</span>
                        </div>
                        <div onClick={() => setEcommerceFunc(false)} className={`grid place-content-center border rounded-full py-2 px-5 transition-colors cursor-pointer whitespace-nowrap ${darkMode ? `hover:bg-white hover:text-black ${!ecommerce_funtionabilites && 'bg-white text-black'}` : `hover:bg-black hover:text-white ${!ecommerce_funtionabilites && 'bg-black text-white'}`}`}>
                            <span>No</span>
                        </div>
                    </div>
                </Section>
                <Section 
                    title={"¿Tiene el cliente algún contenido (texto, imágenes, videos) para incluir en la web?"} 
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-2 pb-3">
                        <div onClick={() => setContentToInclude(true)} className={`grid place-content-center border rounded-full py-2 px-5 transition-colors cursor-pointer whitespace-nowrap ${darkMode ? `hover:bg-white hover:text-black ${content_to_include && 'bg-white text-black'}` : `hover:bg-black hover:text-white ${content_to_include && 'bg-black text-white'}`}`}>
                            <span>Sí</span>
                        </div>
                        <div onClick={() => setContentToInclude(false)} className={`grid place-content-center border rounded-full py-2 px-5 transition-colors cursor-pointer whitespace-nowrap ${darkMode ? `hover:bg-white hover:text-black ${!content_to_include && 'bg-white text-black'}` : `hover:bg-black hover:text-white ${!content_to_include && 'bg-black text-white'}`}`}>
                            <span>No</span>
                        </div>
                    </div>
                </Section>
                <Section 
                    title={"¿Qué lenguaje de programación y tecnologías se prefieren para el desarrollo?"} 
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-2 pb-3">
                        <div onClick={() => setMultiOptionState(preferred_technologies, setPreferredTechnologies, "React")} className={`grid place-content-center border rounded-full py-2 px-5 transition-colors cursor-pointer whitespace-nowrap ${darkMode ? `hover:bg-white hover:text-black ${preferred_technologies.indexOf("React") > -1 && 'bg-white text-black'}` : `hover:bg-black hover:text-white ${preferred_technologies.indexOf("React") > -1 && 'bg-black text-white'}`}`}>
                            <span>React</span>
                        </div>
                        <div onClick={() => setMultiOptionState(preferred_technologies, setPreferredTechnologies, "Next.js")} className={`grid place-content-center border rounded-full py-2 px-5 transition-colors cursor-pointer whitespace-nowrap ${darkMode ? `hover:bg-white hover:text-black ${preferred_technologies.indexOf("Next.js") > -1 && 'bg-white text-black'}` : `hover:bg-black hover:text-white ${preferred_technologies.indexOf("Next.js") > -1 && 'bg-black text-white'}`}`}>
                            <span>Next.js</span>
                        </div>
                        <div onClick={() => setMultiOptionState(preferred_technologies, setPreferredTechnologies, "Vite.js")} className={`grid place-content-center border rounded-full py-2 px-5 transition-colors cursor-pointer whitespace-nowrap ${darkMode ? `hover:bg-white hover:text-black ${preferred_technologies.indexOf("Vite.js") > -1 && 'bg-white text-black'}` : `hover:bg-black hover:text-white ${preferred_technologies.indexOf("Vite.js") > -1 && 'bg-black text-white'}`}`}>
                            <span>Vite.js</span>
                        </div>
                        <div onClick={() => setMultiOptionState(preferred_technologies, setPreferredTechnologies, "Angular")} className={`grid place-content-center border rounded-full py-2 px-5 transition-colors cursor-pointer whitespace-nowrap ${darkMode ? `hover:bg-white hover:text-black ${preferred_technologies.indexOf("Angular") > -1 && 'bg-white text-black'}` : `hover:bg-black hover:text-white ${preferred_technologies.indexOf("Angular") > -1 && 'bg-black text-white'}`}`}>
                            <span>Angular</span>
                        </div>
                        <div onClick={() => setMultiOptionState(preferred_technologies, setPreferredTechnologies, "Tailwind")} className={`grid place-content-center border rounded-full py-2 px-5 transition-colors cursor-pointer whitespace-nowrap ${darkMode ? `hover:bg-white hover:text-black ${preferred_technologies.indexOf("Tailwind") > -1 && 'bg-white text-black'}` : `hover:bg-black hover:text-white ${preferred_technologies.indexOf("Tailwind") > -1 && 'bg-black text-white'}`}`}>
                            <span>Tailwind</span>
                        </div>
                        <div onClick={() => setMultiOptionState(preferred_technologies, setPreferredTechnologies, "Node.js")} className={`grid place-content-center border rounded-full py-2 px-5 transition-colors cursor-pointer whitespace-nowrap ${darkMode ? `hover:bg-white hover:text-black ${preferred_technologies.indexOf("Node.js") > -1 && 'bg-white text-black'}` : `hover:bg-black hover:text-white ${preferred_technologies.indexOf("Node.js") > -1 && 'bg-black text-white'}`}`}>
                            <span>Node.js</span>
                        </div>
                        <div onClick={() => setMultiOptionState(preferred_technologies, setPreferredTechnologies, "Express")} className={`grid place-content-center border rounded-full py-2 px-5 transition-colors cursor-pointer whitespace-nowrap ${darkMode ? `hover:bg-white hover:text-black ${preferred_technologies.indexOf("Express") > -1 && 'bg-white text-black'}` : `hover:bg-black hover:text-white ${preferred_technologies.indexOf("Express") > -1 && 'bg-black text-white'}`}`}>
                            <span>Express</span>
                        </div>
                        <div onClick={() => setMultiOptionState(preferred_technologies, setPreferredTechnologies, "MongoDB")} className={`grid place-content-center border rounded-full py-2 px-5 transition-colors cursor-pointer whitespace-nowrap ${darkMode ? `hover:bg-white hover:text-black ${preferred_technologies.indexOf("MongoDB") > -1 && 'bg-white text-black'}` : `hover:bg-black hover:text-white ${preferred_technologies.indexOf("MongoDB") > -1 && 'bg-black text-white'}`}`}>
                            <span>MongoDB</span>
                        </div>
                        <div onClick={() => setMultiOptionState(preferred_technologies, setPreferredTechnologies, "MySQL")} className={`grid place-content-center border rounded-full py-2 px-5 transition-colors cursor-pointer whitespace-nowrap ${darkMode ? `hover:bg-white hover:text-black ${preferred_technologies.indexOf("MySQL") > -1 && 'bg-white text-black'}` : `hover:bg-black hover:text-white ${preferred_technologies.indexOf("MySQL") > -1 && 'bg-black text-white'}`}`}>
                            <span>MySQL</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 border-b border-neutral-400">
                        <input className="bg-transparent outline-none py-2 w-full placeholder:text-neutral-400 text-lg" type={'text'} placeholder={'Otro (Especificar)'} onChange={(e) => setPreferredTechnologies([e.target.value])} />
                    </div>
                </Section>
                <Section 
                    title={"¿Quién será el responsable de la gestión de la web una vez finalizado el proyecto?"} 
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-2 pb-3">
                        <div onClick={() => setResponsibleForManaging("client")} className={`grid place-content-center border rounded-full py-2 px-5 transition-colors cursor-pointer whitespace-nowrap ${darkMode ? `hover:bg-white hover:text-black ${responsible_for_managing == 'client' && 'bg-white text-black'}` : `hover:bg-black hover:text-white ${responsible_for_managing == 'client' && 'bg-black text-white'}`}`}>
                            <span>El cliente</span>
                        </div>
                        <div onClick={() => setResponsibleForManaging("developer")} className={`grid place-content-center border rounded-full py-2 px-5 transition-colors cursor-pointer whitespace-nowrap ${darkMode ? `hover:bg-white hover:text-black ${responsible_for_managing == 'developer' && 'bg-white text-black'}` : `hover:bg-black hover:text-white ${responsible_for_managing == 'developer' && 'bg-black text-white'}`}`}>
                            <span>El desarrollador</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 border-b border-neutral-400">
                        <input className="bg-transparent outline-none py-2 w-full placeholder:text-neutral-400 text-lg" type={'text'} placeholder={'Otro (Especificar)'} onChange={(e) => setResponsibleForManaging(e.target.value)} />
                    </div>
                </Section>
                <Section 
                    title={"¿Cuál es la estrategia de marketing y posicionamiento del cliente?"} 
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-2 pb-3">
                        <div onClick={() => setMultiOptionState(marketing_strategy, setMarketingStrategy, "social-media")} className={`grid place-content-center border rounded-full py-2 px-5 transition-colors cursor-pointer whitespace-nowrap ${darkMode ? `hover:bg-white hover:text-black ${marketing_strategy.indexOf("social-media") > -1 && 'bg-white text-black'}` : `hover:bg-black hover:text-white ${marketing_strategy.indexOf("social-media") > -1 && 'bg-black text-white'}`}`}>
                            <span>Redes sociales</span>
                        </div>
                        <div onClick={() => setMultiOptionState(marketing_strategy, setMarketingStrategy, "email-marketing")} className={`grid place-content-center border rounded-full py-2 px-5 transition-colors cursor-pointer whitespace-nowrap ${darkMode ? `hover:bg-white hover:text-black ${marketing_strategy.indexOf("email-marketing") > -1 && 'bg-white text-black'}` : `hover:bg-black hover:text-white ${marketing_strategy.indexOf("email-marketing") > -1 && 'bg-black text-white'}`}`}>
                            <span>Correo electrónico</span>
                        </div>
                        <div onClick={() => setMultiOptionState(marketing_strategy, setMarketingStrategy, "SEO")} className={`grid place-content-center border rounded-full py-2 px-5 transition-colors cursor-pointer whitespace-nowrap ${darkMode ? `hover:bg-white hover:text-black ${marketing_strategy.indexOf("SEO") > -1 && 'bg-white text-black'}` : `hover:bg-black hover:text-white ${marketing_strategy.indexOf("SEO") > -1 && 'bg-black text-white'}`}`}>
                            <span>SEO</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 border-b border-neutral-400">
                        <input className="bg-transparent outline-none py-2 w-full placeholder:text-neutral-400 text-lg" type={'text'} placeholder={'Otro (Especificar)'} onChange={(e) => setMarketingStrategy([e.target.value])} />
                    </div>
                </Section>
                <Section 
                    title={"¿Existen sitios web de la competencia que deban tenerse en cuenta como referencias?"} 
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-2 pb-3">
                        <div onClick={() => setCompetitorWebsites(true)} className={`grid place-content-center border rounded-full py-2 px-5 transition-colors cursor-pointer whitespace-nowrap ${darkMode ? `hover:bg-white hover:text-black ${competitor_websites && 'bg-white text-black'}` : `hover:bg-black hover:text-white ${competitor_websites && 'bg-black text-white'}`}`}>
                            <span>Sí</span>
                        </div>
                        <div onClick={() => setCompetitorWebsites(false)} className={`grid place-content-center border rounded-full py-2 px-5 transition-colors cursor-pointer whitespace-nowrap ${darkMode ? `hover:bg-white hover:text-black ${!competitor_websites && 'bg-white text-black'}` : `hover:bg-black hover:text-white ${!competitor_websites && 'bg-black text-white'}`}`}>
                            <span>No</span>
                        </div>
                    </div>
                </Section>
            </section>
            <div className="flex items-center gap-2  text-white">
                <button type={'button'} onClick={handlePrevStep} className={`${step == 1 ? 'hidden' : 'block'} py-2 px-4 bg-primary rounded-sm text-lg uppercase font-bold text-center cursor-pointer w-full`}>Atrás</button>
                <button type={step == 3 ? 'submit' : 'button'} onClick={handleNextStep} className={`py-2 px-4 bg-primary rounded-sm text-lg uppercase font-bold text-center cursor-pointer w-full`}>{step < 3 ? 'Siguiente' : 'Enviar'}</button>
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