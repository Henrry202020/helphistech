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
                            <h1 className="w-full">Quote your project.</h1>
                            {/* <br /> 
                            <span className="w-full"></span> */}
                        </div>
                        <div className={`${darkMode ? 'text-dark' : 'text-light'}`}>Thank you for your interest. Tell me about your project or idea so we can start working together!</div>
                    </div>
                    <div className="flex flex-col items-center gap-5">
                        <div className={`text-5xl font-extrabold text-gradient h-fit lg:leading-[4rem] `}>
                            <h2 className="w-full">Schedule your video call.</h2>
                            {/* <br /> 
                            <span className="w-full">Videoanruf.</span> */}
                        </div>
                        <div className={`${darkMode ? 'text-dark' : 'text-light'}`}>You can also schedule a video call and talk directly with us!</div>
                        <button onClick={() => setShowVideoCallForm(current => !current)} className="px-4 py-2 rounded-sm text-white font-semibold uppercase bg-primary w-fit select-none">Schedule video call</button>
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
            showMessage(true, 'All fields are required', 5000)
            return;
        }


        try {
            await axios.post('/api/sendVideoCall', { full_name, email, date, hour });
            showMessage(false, 'Your video call was successfully scheduled', 5000);
        } catch (error) {
            showMessage(true, 'There was an error scheduling your video call', 5000);
        }
    }

    return (
        <form className="flex flex-col gap-5 " onSubmit={handleSubmit}>
            { message.text && (
                <div className={`${message.error ? 'bg-red-500' : 'bg-primary'} py-2 w-full text-white uppercase font-semibold text-center rounded-md`}>{message.text}</div>
            )}
            <div className="flex flex-col">
                <div className="text-2xl font-semibold">Full name</div>
                <div className="flex items-center gap-2 border-b border-neutral-400">
                    <input className="bg-transparent outline-none py-2 w-full placeholder:text-neutral-400 text-lg" type={'text'} placeholder={'Type your full name'} onChange={(e) => setFullName(e.target.value)} />
                </div>
            </div>
            <div className="flex flex-col">
                <div className="text-2xl font-semibold">Contact e-mail</div>
                <div className="flex items-center border-b border-neutral-400">
                    <input className="bg-transparent outline-none py-2 w-full placeholder:text-neutral-400 text-lg" type={'email'} placeholder={'Type your contact e-mail'} onChange={(e) => setEmail(e.target.value)} />
                </div>
            </div>
            <div className="flex flex-col gap-4">
                <div className="flex flex-col">
                    <div className="text-2xl font-semibold">Choose a meeting date and time</div>
                    <div className="text-neutral-400">Time zone: GMT+2</div>
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
                        <option value="">Select time</option>
                        <option value="14:00">14:00</option>
                        <option value="16:00">16:00</option>
                        <option value="20:00">20:00</option>
                    </select>
                </div>
            </div>
            <div className="flex items-center gap-2 text-white">
                <button type={'button'} onClick={closeVideoCallForm} className={`py-2 px-4 bg-primary rounded-sm text-lg uppercase font-bold text-center cursor-pointer w-full`}>Back</button>
                <button type={'submit'} className={`py-2 px-4 bg-primary rounded-sm text-lg uppercase font-bold text-center cursor-pointer w-full`}>Submit</button>
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
            showMessage(true, 'You must complete all fields.', 5000)
            return;
        }

        if(expected_deilvertime.from == null) {
            showMessage(true, 'You must complete all fields.', 5000)
            return;
        }

        if(functionalities.length == 0 && functionalities_other == '') {
            showMessage(true, 'You must complete all fields.', 5000)
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
            showMessage(false, 'Information sent successfully!', 5000)
            resetForm();   
        } catch (error) {
            showMessage(true, 'There was an error sending the information', 5000)
        }
    }

    // Form steps
    const [ step, setStep ] = useState(1);

    function handleNextStep() {
        if(step == 1 && [type, full_name.current.value, email.current.value, description.current.value].includes('')) {
            showMessage(true, 'You must complete all fields.', 5000)
            return;
        }
        if(step == 2 && [business_type, company_vision, target_audience, service_or_product].includes('')) {
            showMessage(true, 'You must complete all fields.', 5000)
            return;
        }
        if(step == 3 && [web_design_type, ecommerce_funtionabilites, content_to_include, preferred_technologies, responsible_for_managing, marketing_strategy, competitor_websites].includes('')) {
            showMessage(true, 'You must complete all fields.', 5000)
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
                    title={"What type of project?"} 
                    classes={``}
                >
                    <div className="grid grid-cols-2 sm:grid-cols-3 items-center gap-2">
                        <div onClick={() => setType('website')} className={`grid place-content-center border rounded-full py-2 px-5 transition-colors cursor-pointer whitespace-nowrap ${darkMode ? `hover:bg-white hover:text-black ${type === 'website' && 'bg-white text-black'}` : `hover:bg-black hover:text-white ${type === 'website' && 'bg-black text-white'}`}`}>
                            <span>Website</span>
                        </div>
                        <div onClick={() => setType('ecommerce')} className={`grid place-content-center border rounded-full py-2 px-5 transition-colors cursor-pointer whitespace-nowrap ${darkMode ? `hover:bg-white hover:text-black ${type === 'ecommerce' && 'bg-white text-black'}` : `hover:bg-black hover:text-white ${type === 'ecommerce' && 'bg-black text-white'}`}`}>
                            <span>E-Commerce</span>
                        </div>
                        <div onClick={() => setType('app')} className={`grid place-content-center border rounded-full py-2 px-5 transition-colors cursor-pointer whitespace-nowrap ${darkMode ? `hover:bg-white hover:text-black ${type === 'app' && 'bg-white text-black'}` : `hover:bg-black hover:text-white ${type === 'app' && 'bg-black text-white'}`}`}>
                            <span>App</span>
                        </div>
                    </div>
                </Section>
                <Section 
                    title={"Contact information"}  
                    classes={``}
                >
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center border-b border-neutral-400">
                            <input className="bg-transparent outline-none py-2 w-full placeholder:text-neutral-400 text-lg" type={'text'} placeholder={'Full name'} ref={full_name} />
                        </div>
                        <div className="flex items-center border-b border-neutral-400">
                            <input className="bg-transparent outline-none py-2 w-full placeholder:text-neutral-400 text-lg" type={'email'} placeholder={'Your e-mail'} ref={email} />
                        </div>
                    </div>
                </Section>
                <Section 
                    title={"Tell us more about your project"} 
                    classes={``}
                >
                    <Input props={{
                        placeholder: 'Description', 
                        ref: description, 
                        type: 'text', 
                        required: false
                    }} />
                </Section>
                <Section 
                    title={"What is your estimated budget for the project?"} 
                    subtitle={"Budget expressed in USD"}  
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
                    title={"What type of business does the client have?"} 
                >
                    <div className="grid grid-cols-2 sm:grid-cols-3 items-center gap-2 pb-3">
                        <div onClick={() => setBusinessType('retail')} className={`grid place-content-center border rounded-full py-2 px-5 transition-colors cursor-pointer whitespace-nowrap ${darkMode ? `hover:bg-white hover:text-black ${business_type === 'retail' && 'bg-white text-black'}` : `hover:bg-black hover:text-white ${business_type === 'retail' && 'bg-black text-white'}`}`}>
                            <span>Retail</span>
                        </div>
                        <div onClick={() => setBusinessType('service')} className={`grid place-content-center border rounded-full py-2 px-5 transition-colors cursor-pointer whitespace-nowrap ${darkMode ? `hover:bg-white hover:text-black ${business_type === 'service' && 'bg-white text-black'}` : `hover:bg-black hover:text-white ${business_type === 'service' && 'bg-black text-white'}`}`}>
                            <span>Service</span>
                        </div>
                        <div onClick={() => setBusinessType('manufacturing')} className={`grid place-content-center border rounded-full py-2 px-5 transition-colors cursor-pointer whitespace-nowrap ${darkMode ? `hover:bg-white hover:text-black ${business_type === 'manufacturing' && 'bg-white text-black'}` : `hover:bg-black hover:text-white ${business_type === 'manufacturing' && 'bg-black text-white'}`}`}>
                            <span>Manufacturing</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 border-b border-neutral-400">
                        <input className="bg-transparent outline-none py-2 w-full placeholder:text-neutral-400 text-lg" type={'text'} placeholder={'Other (please specify)'} onChange={(e) => setBusinessType(e.target.value)} />
                    </div>
                </Section>
                <Section 
                    title={"What is the company's vision and mission?"} 
                >
                    <div className="grid grid-cols-1 items-center gap-2 pb-3">
                        <div onClick={() => setMultiOptionState(company_vision, setCompanyVision, "increase-profitability")} className={`grid place-content-center border rounded-full py-2 px-5 transition-colors cursor-pointer whitespace-nowrap ${darkMode ? `hover:bg-white hover:text-black ${company_vision.indexOf("increase-profitability") > -1 && 'bg-white text-black'}` : `hover:bg-black hover:text-white ${company_vision.indexOf("increase-profitability") > -1 && 'bg-black text-white'}`}`}>
                            <span>Increase profitability</span>
                        </div>
                        <div onClick={() => setMultiOptionState(company_vision, setCompanyVision, "enhance-customer-satisfaction")} className={`grid place-content-center border rounded-full py-2 px-5 transition-colors cursor-pointer whitespace-nowrap ${darkMode ? `hover:bg-white hover:text-black ${company_vision.indexOf("enhance-customer-satisfaction") > -1 && 'bg-white text-black'}` : `hover:bg-black hover:text-white ${company_vision.indexOf("enhance-customer-satisfaction") > -1 && 'bg-black text-white'}`}`}>
                            <span>Enhance customer satisfaction</span>
                        </div>
                        <div onClick={() => setMultiOptionState(company_vision, setCompanyVision, "promote-sustainability")} className={`grid place-content-center border rounded-full py-2 px-5 transition-colors cursor-pointer whitespace-nowrap ${darkMode ? `hover:bg-white hover:text-black ${company_vision.indexOf("promote-sustainability") > -1 && 'bg-white text-black'}` : `hover:bg-black hover:text-white ${company_vision.indexOf("promote-sustainability") > -1 && 'bg-black text-white'}`}`}>
                            <span>Promote sustainability</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 border-b border-neutral-400">
                        <input className="bg-transparent outline-none py-2 w-full placeholder:text-neutral-400 text-lg" type={'text'} placeholder={'Other (please specify)'} onChange={(e) => setCompanyVision([e.target.value])} />
                    </div>
                </Section>
                <Section 
                    title={"Who is the target audience for the company?"} 
                >
                    <div className="grid grid-cols-2 sm:grid-cols-3 items-center gap-2 pb-3">
                        <div onClick={() => setMultiOptionState(target_audience, setTargetAudience, "children")} className={`grid place-content-center border rounded-full py-2 px-5 transition-colors cursor-pointer whitespace-nowrap ${darkMode ? `hover:bg-white hover:text-black ${target_audience.indexOf("children") > -1 && 'bg-white text-black'}` : `hover:bg-black hover:text-white ${target_audience.indexOf("children") > -1 && 'bg-black text-white'}`}`}>
                            <span>Children</span>
                        </div>
                        <div onClick={() => setMultiOptionState(target_audience, setTargetAudience, "teenagers")} className={`grid place-content-center border rounded-full py-2 px-5 transition-colors cursor-pointer whitespace-nowrap ${darkMode ? `hover:bg-white hover:text-black ${target_audience.indexOf("teenagers") > -1 && 'bg-white text-black'}` : `hover:bg-black hover:text-white ${target_audience.indexOf("teenagers") > -1 && 'bg-black text-white'}`}`}>
                            <span>Teenagers</span>
                        </div>
                        <div onClick={() => setMultiOptionState(target_audience, setTargetAudience, "young-adults")} className={`grid place-content-center border rounded-full py-2 px-5 transition-colors cursor-pointer whitespace-nowrap ${darkMode ? `hover:bg-white hover:text-black ${target_audience.indexOf("young-adults") > -1 && 'bg-white text-black'}` : `hover:bg-black hover:text-white ${target_audience.indexOf("young-adults") > -1 && 'bg-black text-white'}`}`}>
                            <span>Young adults</span>
                        </div>
                        <div onClick={() => setMultiOptionState(target_audience, setTargetAudience, "adults")} className={`grid place-content-center border rounded-full py-2 px-5 transition-colors cursor-pointer whitespace-nowrap ${darkMode ? `hover:bg-white hover:text-black ${target_audience.indexOf("adults") > -1 && 'bg-white text-black'}` : `hover:bg-black hover:text-white ${target_audience.indexOf("adults") > -1 && 'bg-black text-white'}`}`}>
                            <span>Adults</span>
                        </div>
                        <div onClick={() => setMultiOptionState(target_audience, setTargetAudience, "seniors")} className={`grid place-content-center border rounded-full py-2 px-5 transition-colors cursor-pointer whitespace-nowrap ${darkMode ? `hover:bg-white hover:text-black ${target_audience.indexOf("seniors") > -1 && 'bg-white text-black'}` : `hover:bg-black hover:text-white ${target_audience.indexOf("seniors") > -1 && 'bg-black text-white'}`}`}>
                            <span>Seniors</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 border-b border-neutral-400">
                        <input className="bg-transparent outline-none py-2 w-full placeholder:text-neutral-400 text-lg" type={'text'} placeholder={'Other (please specify)'} onChange={(e) => setTargetAudience([e.target.value])} />
                    </div>
                </Section>
                <Section 
                    title={"What services or products does the company offer?"} 
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-2 pb-3">
                        <div onClick={() => setServiceOrProduct('products')} className={`grid place-content-center border rounded-full py-2 px-5 transition-colors cursor-pointer whitespace-nowrap ${darkMode ? `hover:bg-white hover:text-black ${service_or_product === 'products' && 'bg-white text-black'}` : `hover:bg-black hover:text-white ${service_or_product === 'products' && 'bg-black text-white'}`}`}>
                            <span>Products</span>
                        </div>
                        <div onClick={() => setServiceOrProduct('services')} className={`grid place-content-center border rounded-full py-2 px-5 transition-colors cursor-pointer whitespace-nowrap ${darkMode ? `hover:bg-white hover:text-black ${service_or_product === 'services' && 'bg-white text-black'}` : `hover:bg-black hover:text-white ${service_or_product === 'services' && 'bg-black text-white'}`}`}>
                            <span>Services</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 border-b border-neutral-400">
                        <input className="bg-transparent outline-none py-2 w-full placeholder:text-neutral-400 text-lg" type={'text'} placeholder={'Other (please specify)'} onChange={(e) => setServiceOrProduct(e.target.value)} />
                    </div>
                </Section>
                <Section 
                    title={"What is the expected delivery timeline?"} 
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-2 pb-3">
                        <div onClick={() => setExpectedDeliverTime({ from: 0, to: 1 })} className={`grid place-content-center border rounded-full py-2 px-5 transition-colors cursor-pointer whitespace-nowrap ${darkMode ? `hover:bg-white hover:text-black ${expected_deilvertime.from == 0 && 'bg-white text-black'}` : `hover:bg-black hover:text-white ${expected_deilvertime.from == 0 && 'bg-black text-white'}`}`}>
                            <span>{"< 1 month"}</span>
                        </div>
                        <div onClick={() => setExpectedDeliverTime({ from: 1, to: 3 })} className={`grid place-content-center border rounded-full py-2 px-5 transition-colors cursor-pointer whitespace-nowrap ${darkMode ? `hover:bg-white hover:text-black ${expected_deilvertime.from == 1 && 'bg-white text-black'}` : `hover:bg-black hover:text-white ${expected_deilvertime.from == 1 && 'bg-black text-white'}`}`}>
                            <span>1 - 3 months</span>
                        </div>
                        <div onClick={() => setExpectedDeliverTime({ from: 3, to: 6 })} className={`grid place-content-center border rounded-full py-2 px-5 transition-colors cursor-pointer whitespace-nowrap ${darkMode ? `hover:bg-white hover:text-black ${expected_deilvertime.from == 3 && 'bg-white text-black'}` : `hover:bg-black hover:text-white ${expected_deilvertime.from == 3 && 'bg-black text-white'}`}`}>
                            <span>3 - 6 months</span>
                        </div>
                        <div onClick={() => setExpectedDeliverTime({ from: 6, to: 0 })} className={`grid place-content-center border rounded-full py-2 px-5 transition-colors cursor-pointer whitespace-nowrap ${darkMode ? `hover:bg-white hover:text-black ${expected_deilvertime.from == 6 && 'bg-white text-black'}` : `hover:bg-black hover:text-white ${expected_deilvertime.from == 6 && 'bg-black text-white'}`}`}>
                            <span>{"> 6 months"}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 border-b border-neutral-400">
                        <input className="bg-transparent outline-none py-2 w-full placeholder:text-neutral-400 text-lg" type={'text'} placeholder={'Other (please specify)'} onChange={(e) => setExpectedDeliverTime(e.target.value)} />
                    </div>
                </Section>
            </section>
            <section id="step3" className={`flex flex-col gap-6 ${step == 3 ? 'block' : 'hidden'}`}>
                <Section 
                    title={"What functionalities should the web have?"} 
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-2 pb-3">
                        <div onClick={() => setMultiOptionState(functionalities, setFunctionalities, "contact-form")} className={`grid place-content-center border rounded-full py-2 px-5 transition-colors cursor-pointer whitespace-nowrap ${darkMode ? `hover:bg-white hover:text-black ${functionalities.indexOf("contact-form") > -1 && 'bg-white text-black'}` : `hover:bg-black hover:text-white ${functionalities.indexOf("contact-form") > -1 && 'bg-black text-white'}`}`}>
                            <span>Contact form</span>
                        </div>
                        <div onClick={() => setMultiOptionState(functionalities, setFunctionalities, "image-gallery")} className={`grid place-content-center border rounded-full py-2 px-5 transition-colors cursor-pointer whitespace-nowrap ${darkMode ? `hover:bg-white hover:text-black ${functionalities.indexOf("image-gallery") > -1 && 'bg-white text-black'}` : `hover:bg-black hover:text-white ${functionalities.indexOf("image-gallery") > -1 && 'bg-black text-white'}`}`}>
                            <span>Image gallery</span>
                        </div>
                        <div onClick={() => setMultiOptionState(functionalities, setFunctionalities, "blog-section")} className={`grid place-content-center border rounded-full py-2 px-5 transition-colors cursor-pointer whitespace-nowrap ${darkMode ? `hover:bg-white hover:text-black ${functionalities.indexOf("blog-section") > -1 && 'bg-white text-black'}` : `hover:bg-black hover:text-white ${functionalities.indexOf("blog-section") > -1 && 'bg-black text-white'}`}`}>
                            <span>Blog section</span>
                        </div>
                        <div onClick={() => setMultiOptionState(functionalities, setFunctionalities, "social-media-integration")} className={`grid place-content-center border rounded-full py-2 px-5 transition-colors cursor-pointer whitespace-nowrap ${darkMode ? `hover:bg-white hover:text-black ${functionalities.indexOf("social-media-integration") > -1 && 'bg-white text-black'}` : `hover:bg-black hover:text-white ${functionalities.indexOf("social-media-integration") > -1 && 'bg-black text-white'}`}`}>
                            <span>Social media integration</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 border-b border-neutral-400">
                        <input className="bg-transparent outline-none py-2 w-full placeholder:text-neutral-400 text-lg" type={'text'} placeholder={'Other (please specify)'} onChange={(e) => setFunctionalities([e.target.value])} />
                    </div>
                </Section>
                <Section 
                    title={"Should the web be responsive or have a specific design?"} 
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-2 pb-3">
                        <div onClick={() => setMultiOptionState(web_design_type, setWebDesignType, "responsive")} className={`grid place-content-center border rounded-full py-2 px-5 transition-colors cursor-pointer whitespace-nowrap ${darkMode ? `hover:bg-white hover:text-black ${web_design_type.indexOf("responsive") > -1 && 'bg-white text-black'}` : `hover:bg-black hover:text-white ${web_design_type.indexOf("responsive") > -1 && 'bg-black text-white'}`}`}>
                            <span>Responsive</span>
                        </div>
                        <div onClick={() => setMultiOptionState(web_design_type, setWebDesignType, "specific-design")} className={`grid place-content-center border rounded-full py-2 px-5 transition-colors cursor-pointer whitespace-nowrap ${darkMode ? `hover:bg-white hover:text-black ${web_design_type.indexOf("specific-design") > -1 && 'bg-white text-black'}` : `hover:bg-black hover:text-white ${web_design_type.indexOf("specific-design") > -1 && 'bg-black text-white'}`}`}>
                            <span>Specific design</span>
                        </div>
                    </div>
                </Section>
                <Section 
                    title={"Are e-commerce functionalities needed on the web?"} 
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-2 pb-3">
                        <div onClick={() => setEcommerceFunc(true)} className={`grid place-content-center border rounded-full py-2 px-5 transition-colors cursor-pointer whitespace-nowrap ${darkMode ? `hover:bg-white hover:text-black ${ecommerce_funtionabilites && 'bg-white text-black'}` : `hover:bg-black hover:text-white ${ecommerce_funtionabilites && 'bg-black text-white'}`}`}>
                            <span>Yes</span>
                        </div>
                        <div onClick={() => setEcommerceFunc(false)} className={`grid place-content-center border rounded-full py-2 px-5 transition-colors cursor-pointer whitespace-nowrap ${darkMode ? `hover:bg-white hover:text-black ${!ecommerce_funtionabilites && 'bg-white text-black'}` : `hover:bg-black hover:text-white ${!ecommerce_funtionabilites && 'bg-black text-white'}`}`}>
                            <span>No</span>
                        </div>
                    </div>
                </Section>
                <Section 
                    title={"Does the client have any content (text, images, videos) to include on the web?"} 
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-2 pb-3">
                        <div onClick={() => setContentToInclude(true)} className={`grid place-content-center border rounded-full py-2 px-5 transition-colors cursor-pointer whitespace-nowrap ${darkMode ? `hover:bg-white hover:text-black ${content_to_include && 'bg-white text-black'}` : `hover:bg-black hover:text-white ${content_to_include && 'bg-black text-white'}`}`}>
                            <span>Yes</span>
                        </div>
                        <div onClick={() => setContentToInclude(false)} className={`grid place-content-center border rounded-full py-2 px-5 transition-colors cursor-pointer whitespace-nowrap ${darkMode ? `hover:bg-white hover:text-black ${!content_to_include && 'bg-white text-black'}` : `hover:bg-black hover:text-white ${!content_to_include && 'bg-black text-white'}`}`}>
                            <span>No</span>
                        </div>
                    </div>
                </Section>
                <Section 
                    title={"What programming language and technologies are preferred for development?"} 
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
                        <input className="bg-transparent outline-none py-2 w-full placeholder:text-neutral-400 text-lg" type={'text'} placeholder={'Other (please specify)'} onChange={(e) => setPreferredTechnologies([e.target.value])} />
                    </div>
                </Section>
                <Section 
                    title={"Who will be responsible for managing the web once the project is completed?"} 
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-2 pb-3">
                        <div onClick={() => setResponsibleForManaging("client")} className={`grid place-content-center border rounded-full py-2 px-5 transition-colors cursor-pointer whitespace-nowrap ${darkMode ? `hover:bg-white hover:text-black ${responsible_for_managing == 'client' && 'bg-white text-black'}` : `hover:bg-black hover:text-white ${responsible_for_managing == 'client' && 'bg-black text-white'}`}`}>
                            <span>The client</span>
                        </div>
                        <div onClick={() => setResponsibleForManaging("developer")} className={`grid place-content-center border rounded-full py-2 px-5 transition-colors cursor-pointer whitespace-nowrap ${darkMode ? `hover:bg-white hover:text-black ${responsible_for_managing == 'developer' && 'bg-white text-black'}` : `hover:bg-black hover:text-white ${responsible_for_managing == 'developer' && 'bg-black text-white'}`}`}>
                            <span>The developer</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 border-b border-neutral-400">
                        <input className="bg-transparent outline-none py-2 w-full placeholder:text-neutral-400 text-lg" type={'text'} placeholder={'Other (please specify)'} onChange={(e) => setResponsibleForManaging(e.target.value)} />
                    </div>
                </Section>
                <Section 
                    title={"What is the client's marketing and positioning strategy?"} 
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-2 pb-3">
                        <div onClick={() => setMultiOptionState(marketing_strategy, setMarketingStrategy, "social-media")} className={`grid place-content-center border rounded-full py-2 px-5 transition-colors cursor-pointer whitespace-nowrap ${darkMode ? `hover:bg-white hover:text-black ${marketing_strategy.indexOf("social-media") > -1 && 'bg-white text-black'}` : `hover:bg-black hover:text-white ${marketing_strategy.indexOf("social-media") > -1 && 'bg-black text-white'}`}`}>
                            <span>Social media</span>
                        </div>
                        <div onClick={() => setMultiOptionState(marketing_strategy, setMarketingStrategy, "email-marketing")} className={`grid place-content-center border rounded-full py-2 px-5 transition-colors cursor-pointer whitespace-nowrap ${darkMode ? `hover:bg-white hover:text-black ${marketing_strategy.indexOf("email-marketing") > -1 && 'bg-white text-black'}` : `hover:bg-black hover:text-white ${marketing_strategy.indexOf("email-marketing") > -1 && 'bg-black text-white'}`}`}>
                            <span>E-mail marketing</span>
                        </div>
                        <div onClick={() => setMultiOptionState(marketing_strategy, setMarketingStrategy, "SEO")} className={`grid place-content-center border rounded-full py-2 px-5 transition-colors cursor-pointer whitespace-nowrap ${darkMode ? `hover:bg-white hover:text-black ${marketing_strategy.indexOf("SEO") > -1 && 'bg-white text-black'}` : `hover:bg-black hover:text-white ${marketing_strategy.indexOf("SEO") > -1 && 'bg-black text-white'}`}`}>
                            <span>SEO</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 border-b border-neutral-400">
                        <input className="bg-transparent outline-none py-2 w-full placeholder:text-neutral-400 text-lg" type={'text'} placeholder={'Other (please specify)'} onChange={(e) => setMarketingStrategy([e.target.value])} />
                    </div>
                </Section>
                <Section 
                    title={"Are there any competing websites that should be considered as references?"} 
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-2 pb-3">
                        <div onClick={() => setCompetitorWebsites(true)} className={`grid place-content-center border rounded-full py-2 px-5 transition-colors cursor-pointer whitespace-nowrap ${darkMode ? `hover:bg-white hover:text-black ${competitor_websites && 'bg-white text-black'}` : `hover:bg-black hover:text-white ${competitor_websites && 'bg-black text-white'}`}`}>
                            <span>Yes</span>
                        </div>
                        <div onClick={() => setCompetitorWebsites(false)} className={`grid place-content-center border rounded-full py-2 px-5 transition-colors cursor-pointer whitespace-nowrap ${darkMode ? `hover:bg-white hover:text-black ${!competitor_websites && 'bg-white text-black'}` : `hover:bg-black hover:text-white ${!competitor_websites && 'bg-black text-white'}`}`}>
                            <span>No</span>
                        </div>
                    </div>
                </Section>
            </section>
            <div className="flex items-center gap-2  text-white">
                <button type={'button'} onClick={handlePrevStep} className={`${step == 1 ? 'hidden' : 'block'} py-2 px-4 bg-primary rounded-sm text-lg uppercase font-bold text-center cursor-pointer w-full`}>Back</button>
                <button type={step == 3 ? 'submit' : 'button'} onClick={handleNextStep} className={`py-2 px-4 bg-primary rounded-sm text-lg uppercase font-bold text-center cursor-pointer w-full`}>{step < 3 ? 'Next' : 'Submit'}</button>
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