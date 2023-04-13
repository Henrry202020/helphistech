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
                <div className="flex flex-col lg:flex-row items-start justify-center gap-16 pt-20 xl:gap-12 lg:max-w-6xl mx-auto" id="quote-project-form">
                    <div onClick={handleCloseProjectQuote} className="absolute top-5 right-8 text-white text-3xl cursor-pointer hover:text-neutral-300 transition-colors"><i className="fa-solid fa-xmark"></i></div>
                    <div className={`flex flex-col justify-center gap-5 lg:w-1/2 lg:pl-5`}>
                        <div className={`text-6xl font-extrabold text-gradient lg:h-36 lg:leading-[4rem] lazy-load-1 ${projectQuoteAnimation ? 'hidden' : 'block'}`}>Schätzen Sie Ihr<br /> Projekt.</div>
                        <div className={`lg:max-w-xs xl:max-w-md lazy-load-2 text-neutral-200 ${projectQuoteAnimation ? 'hidden' : 'block'}`}>Danke für dein Interesse. Erzählen Sie mir von Ihrem Projekt oder Ihrer Idee, damit wir mit der Zusammenarbeit beginnen können!</div>
                    </div>
                    <div className="flex flex-col gap-8 lg:w-1/2 lg:pr-5 pb-20">
                        <FormComponent />
                    </div>
                </div>
            </div>
        </div>
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
            showMessage(true, 'Sie müssen alle Felder ausfüllen.', 5000)
            return;
        }

        if(expected_deilvertime.from == null) {
            showMessage(true, 'Sie müssen alle Felder ausfüllen.', 5000)
            return;
        }

        if(functionalities.length == 0 && functionalities_other == '') {
            showMessage(true, 'Sie müssen alle Felder ausfüllen.', 5000)
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
        // Send project to server
        try {
            await axios.post('/api/sendProject', { project })    
            showMessage(false, 'Sie müssen alle Felder ausfüllen.', 5000)
            resetForm();   
        } catch (error) {
            showMessage(true, 'Beim Senden der Informationen ist ein Fehler aufgetreten', 5000)
        }
    }

    // Form steps
    const [ step, setStep ] = useState(1);

    function handleNextStep() {
        if(step == 1 && [type, full_name.current.value, email.current.value, description.current.value].includes('')) {
            showMessage(true, 'Sie müssen alle Felder ausfüllen.', 5000)
            return;
        }
        if(step == 2 && [company_fullname.current.value, business_type, company_vision, target_audience, service_or_product].includes('')) {
            showMessage(true, 'Sie müssen alle Felder ausfüllen.', 5000)
            return;
        }
        if(step == 3 && [web_design_type, ecommerce_funtionabilites, content_to_include, preferred_technologies, responsible_for_managing, marketing_strategy, competitor_websites].includes('')) {
            showMessage(true, 'Sie müssen alle Felder ausfüllen.', 5000)
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
                <div className={`${message.error ? 'bg-red-500' : 'bg-light-main'} py-2 w-full text-white uppercase font-semibold text-center rounded-md`}>{message.text}</div>
            )}
            <section id="step1" className={`flex flex-col gap-6 ${step == 1 ? 'block' : 'hidden'}`}>
                <Section 
                    title={"Welche Art von Projekt?"} 
                    classes={`${!projectQuoteAnimation ? 'lazy-load-1 block' : 'hidden'}`}
                >
                    <div className="grid grid-cols-2 sm:grid-cols-3 items-center gap-2">
                        <div onClick={() => setType('website')} className={`grid place-content-center border rounded-full py-2 px-5 hover:bg-white hover:text-black transition-colors cursor-pointer whitespace-nowrap ${type === 'website' && 'bg-white text-black'}`}>
                            <span>Webseite</span>
                        </div>
                        <div onClick={() => setType('ecommerce')} className={`grid place-content-center border rounded-full py-2 px-5 hover:bg-white hover:text-black transition-colors cursor-pointer whitespace-nowrap ${type === 'ecommerce' && 'bg-white text-black'}`}>
                            <span>E-Commerce</span>
                        </div>
                        <div onClick={() => setType('app')} className={`grid place-content-center border rounded-full py-2 px-5 hover:bg-white hover:text-black transition-colors cursor-pointer whitespace-nowrap ${type === 'app' && 'bg-white text-black'}`}>
                            <span>Anwendung</span>
                        </div>
                    </div>
                </Section>
                <Section 
                    title={"Kontaktinformationen"}  
                    classes={`${!projectQuoteAnimation ? 'lazy-load-2 block' : 'hidden'}`}
                >
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center border-b border-neutral-400">
                            <div className="flex items-center gap-2 border-b border-neutral-400">
                                <input className="bg-transparent outline-none py-2 w-full placeholder:text-neutral-400 text-lg" type={'text'} placeholder={'Vollständiger Name'} ref={full_name} />
                            </div>
                        </div>
                        <div className="flex items-center border-b border-neutral-400">
                            <div className="flex items-center gap-2 border-b border-neutral-400">
                                <input className="bg-transparent outline-none py-2 w-full placeholder:text-neutral-400 text-lg" type={'email'} placeholder={'E-Mail'} ref={email} />
                            </div>
                        </div>
                    </div>
                </Section>
                <Section 
                    title={"Erzählen Sie uns mehr über Ihr Projekt"} 
                    classes={`${!projectQuoteAnimation ? 'lazy-load-4 block' : 'hidden'}`}
                >
                    <Input props={{
                        placeholder: 'Beschreibung', 
                        ref: description, 
                        type: 'text', 
                        required: false
                    }} />
                </Section>
                <Section 
                    title={"Wie hoch ist Ihr geschätztes Budget für das Projekt?"} 
                    subtitle={"Budget in USD angegeben"}  
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
                    title={"Wie lautet der vollständige Name des Unternehmens oder des Kunden?"} 
                >
                    <Input props={{
                        placeholder: 'Vollständiger Name', 
                        ref: company_fullname, 
                        type: 'text', 
                        required: false
                    }} />
                </Section>
                <Section 
                    title={"Welche Art von Geschäft hat der Kunde?"} 
                >
                    <div className="grid grid-cols-2 sm:grid-cols-3 items-center gap-2 pb-3">
                        <div onClick={() => setBusinessType('retail')} className={`grid place-content-center border rounded-full py-2 px-5 hover:bg-white hover:text-black transition-colors cursor-pointer whitespace-nowrap ${business_type === 'retail' && 'bg-white text-black'}`}>
                            <span>Einzelhandel</span>
                        </div>
                        <div onClick={() => setBusinessType('service')} className={`grid place-content-center border rounded-full py-2 px-5 hover:bg-white hover:text-black transition-colors cursor-pointer whitespace-nowrap ${business_type === 'service' && 'bg-white text-black'}`}>
                            <span>Service</span>
                        </div>
                        <div onClick={() => setBusinessType('manufacturing')} className={`grid place-content-center border rounded-full py-2 px-5 hover:bg-white hover:text-black transition-colors cursor-pointer whitespace-nowrap ${business_type === 'manufacturing' && 'bg-white text-black'}`}>
                            <span>Herstellung</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 border-b border-neutral-400">
                        <input className="bg-transparent outline-none py-2 w-full placeholder:text-neutral-400 text-lg" type={'text'} placeholder={'Other (please specify)'} onChange={(e) => setBusinessType(e.target.value)} />
                    </div>
                </Section>
                <Section 
                    title={"Was ist die Vision und Mission des Unternehmens?"} 
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-2 pb-3">
                        <div onClick={() => setCompanyVision('increase-profitability')} className={`grid place-content-center border rounded-full py-2 px-5 hover:bg-white hover:text-black transition-colors cursor-pointer whitespace-nowrap ${company_vision === 'increase-profitability' && 'bg-white text-black'}`}>
                            <span>Erhöhen Sie die Rentabilität</span>
                        </div>
                        <div onClick={() => setCompanyVision('enhance-customer-satisfaction')} className={`grid place-content-center border rounded-full py-2 px-5 hover:bg-white hover:text-black transition-colors cursor-pointer whitespace-nowrap ${company_vision === 'enhance-customer-satisfaction' && 'bg-white text-black'}`}>
                            <span>Steigern Sie die Kundenzufriedenheit</span>
                        </div>
                        <div onClick={() => setCompanyVision('promote-sustainability')} className={`grid place-content-center border rounded-full py-2 px-5 hover:bg-white hover:text-black transition-colors cursor-pointer whitespace-nowrap ${company_vision === 'promote-sustainability' && 'bg-white text-black'}`}>
                            <span>Nachhaltigkeit fördern</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 border-b border-neutral-400">
                        <input className="bg-transparent outline-none py-2 w-full placeholder:text-neutral-400 text-lg" type={'text'} placeholder={'Other (please specify)'} onChange={(e) => setCompanyVision(e.target.value)} />
                    </div>
                </Section>
                <Section 
                    title={"Wer ist die Zielgruppe des Unternehmens?"} 
                >
                    <div className="grid grid-cols-2 sm:grid-cols-3 items-center gap-2 pb-3">
                        <div onClick={() => setTargetAudience('children')} className={`grid place-content-center border rounded-full py-2 px-5 hover:bg-white hover:text-black transition-colors cursor-pointer whitespace-nowrap ${target_audience === 'children' && 'bg-white text-black'}`}>
                            <span>Kinder</span>
                        </div>
                        <div onClick={() => setTargetAudience('teenagers')} className={`grid place-content-center border rounded-full py-2 px-5 hover:bg-white hover:text-black transition-colors cursor-pointer whitespace-nowrap ${target_audience === 'teenagers' && 'bg-white text-black'}`}>
                            <span>Jugendliche</span>
                        </div>
                        <div onClick={() => setTargetAudience('young-adults')} className={`grid place-content-center border rounded-full py-2 px-5 hover:bg-white hover:text-black transition-colors cursor-pointer whitespace-nowrap ${target_audience === 'young-adults' && 'bg-white text-black'}`}>
                            <span>Junge Erwachsene</span>
                        </div>
                        <div onClick={() => setTargetAudience('adults')} className={`grid place-content-center border rounded-full py-2 px-5 hover:bg-white hover:text-black transition-colors cursor-pointer whitespace-nowrap ${target_audience === 'adults' && 'bg-white text-black'}`}>
                            <span>Erwachsene</span>
                        </div>
                        <div onClick={() => setTargetAudience('seniors')} className={`grid place-content-center border rounded-full py-2 px-5 hover:bg-white hover:text-black transition-colors cursor-pointer whitespace-nowrap ${target_audience === 'seniors' && 'bg-white text-black'}`}>
                            <span>Senioren</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 border-b border-neutral-400">
                        <input className="bg-transparent outline-none py-2 w-full placeholder:text-neutral-400 text-lg" type={'text'} placeholder={'Other (please specify)'} onChange={(e) => setTargetAudience(e.target.value)} />
                    </div>
                </Section>
                <Section 
                    title={"Welche Dienstleistungen oder Produkte bietet das Unternehmen an?"} 
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-2 pb-3">
                        <div onClick={() => setServiceOrProduct('products')} className={`grid place-content-center border rounded-full py-2 px-5 hover:bg-white hover:text-black transition-colors cursor-pointer whitespace-nowrap ${service_or_product === 'products' && 'bg-white text-black'}`}>
                            <span>Produkte</span>
                        </div>
                        <div onClick={() => setServiceOrProduct('services')} className={`grid place-content-center border rounded-full py-2 px-5 hover:bg-white hover:text-black transition-colors cursor-pointer whitespace-nowrap ${service_or_product === 'services' && 'bg-white text-black'}`}>
                            <span>Dienstleistungen</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 border-b border-neutral-400">
                        <input className="bg-transparent outline-none py-2 w-full placeholder:text-neutral-400 text-lg" type={'text'} placeholder={'Other (please specify)'} onChange={(e) => setServiceOrProduct(e.target.value)} />
                    </div>
                </Section>
                <Section 
                    title={"Was ist die voraussichtliche Lieferzeit?"} 
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-2 pb-3">
                        <div onClick={() => setExpectedDeliverTime({ from: 0, to: 1 })} className={`grid place-content-center border rounded-full py-2 px-5 hover:bg-white hover:text-black transition-colors cursor-pointer whitespace-nowrap ${expected_deilvertime.from == 0 && 'bg-white text-black'}`}>
                            <span>{"< 1 Monat"}</span>
                        </div>
                        <div onClick={() => setExpectedDeliverTime({ from: 1, to: 3 })} className={`grid place-content-center border rounded-full py-2 px-5 hover:bg-white hover:text-black transition-colors cursor-pointer whitespace-nowrap ${expected_deilvertime.from == 1 && 'bg-white text-black'}`}>
                            <span>1 - 3 Monate</span>
                        </div>
                        <div onClick={() => setExpectedDeliverTime({ from: 3, to: 6 })} className={`grid place-content-center border rounded-full py-2 px-5 hover:bg-white hover:text-black transition-colors cursor-pointer whitespace-nowrap ${expected_deilvertime.from == 3 && 'bg-white text-black'}`}>
                            <span>3 - 6 Monate</span>
                        </div>
                        <div onClick={() => setExpectedDeliverTime({ from: 6, to: 0 })} className={`grid place-content-center border rounded-full py-2 px-5 hover:bg-white hover:text-black transition-colors cursor-pointer whitespace-nowrap ${expected_deilvertime.from == 6 && 'bg-white text-black'}`}>
                            <span>{"> 6 Monate"}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 border-b border-neutral-400">
                        <input className="bg-transparent outline-none py-2 w-full placeholder:text-neutral-400 text-lg" type={'text'} placeholder={'Other (please specify)'} onChange={(e) => setExpectedDeliverTime(e.target.value)} />
                    </div>
                </Section>
            </section>
            <section id="step3" className={`flex flex-col gap-6 ${step == 3 ? 'block' : 'hidden'}`}>
                <Section 
                    title={"Welche Funktionalitäten soll das Web haben?"} 
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-2 pb-3">
                        <div onClick={() => handleFunctionabilites("contact-form")} className={`grid place-content-center border rounded-full py-2 px-5 hover:bg-white hover:text-black transition-colors cursor-pointer whitespace-nowrap ${functionalities.indexOf("contact-form") > -1 && 'bg-white text-black'}`}>
                            <span>Kontakt Formular</span>
                        </div>
                        <div onClick={() => handleFunctionabilites("image-gallery")} className={`grid place-content-center border rounded-full py-2 px-5 hover:bg-white hover:text-black transition-colors cursor-pointer whitespace-nowrap ${functionalities.indexOf("image-gallery") > -1 && 'bg-white text-black'}`}>
                            <span>Bildergalerie</span>
                        </div>
                        <div onClick={() => handleFunctionabilites("blog-section")} className={`grid place-content-center border rounded-full py-2 px-5 hover:bg-white hover:text-black transition-colors cursor-pointer whitespace-nowrap ${functionalities.indexOf("blog-section") > -1 && 'bg-white text-black'}`}>
                            <span>Blog-Bereich</span>
                        </div>
                        <div onClick={() => handleFunctionabilites("social-media-integration")} className={`grid place-content-center border rounded-full py-2 px-5 hover:bg-white hover:text-black transition-colors cursor-pointer whitespace-nowrap ${functionalities.indexOf("social-media-integration") > -1 && 'bg-white text-black'}`}>
                            <span>Social media integration</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 border-b border-neutral-400">
                        <input className="bg-transparent outline-none py-2 w-full placeholder:text-neutral-400 text-lg" type={'text'} placeholder={'Other (please specify)'} ref={functionalities_other} />
                    </div>
                </Section>
                <Section 
                    title={"Soll das Web responsive sein oder ein bestimmtes Design haben?"} 
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-2 pb-3">
                        <div onClick={() => setWebDesignType("responsive")} className={`grid place-content-center border rounded-full py-2 px-5 hover:bg-white hover:text-black transition-colors cursor-pointer whitespace-nowrap ${web_design_type == 'responsive' && 'bg-white text-black'}`}>
                            <span>Responsive</span>
                        </div>
                        <div onClick={() => setWebDesignType("specific-design")} className={`grid place-content-center border rounded-full py-2 px-5 hover:bg-white hover:text-black transition-colors cursor-pointer whitespace-nowrap ${web_design_type == 'specific-design' && 'bg-white text-black'}`}>
                            <span>Spezifisches Design</span>
                        </div>
                    </div>
                </Section>
                <Section 
                    title={"Werden E-Commerce-Funktionalitäten im Web benötigt?"} 
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-2 pb-3">
                        <div onClick={() => setEcommerceFunc(true)} className={`grid place-content-center border rounded-full py-2 px-5 hover:bg-white hover:text-black transition-colors cursor-pointer whitespace-nowrap ${ecommerce_funtionabilites && 'bg-white text-black'}`}>
                            <span>Ja</span>
                        </div>
                        <div onClick={() => setEcommerceFunc(false)} className={`grid place-content-center border rounded-full py-2 px-5 hover:bg-white hover:text-black transition-colors cursor-pointer whitespace-nowrap ${!ecommerce_funtionabilites && 'bg-white text-black'}`}>
                            <span>NEIN</span>
                        </div>
                    </div>
                </Section>
                <Section 
                    title={"Hat der Kunde Inhalte (Texte, Bilder, Videos) für das Web?"} 
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-2 pb-3">
                        <div onClick={() => setContentToInclude(true)} className={`grid place-content-center border rounded-full py-2 px-5 hover:bg-white hover:text-black transition-colors cursor-pointer whitespace-nowrap ${content_to_include && 'bg-white text-black'}`}>
                            <span>Ja</span>
                        </div>
                        <div onClick={() => setContentToInclude(false)} className={`grid place-content-center border rounded-full py-2 px-5 hover:bg-white hover:text-black transition-colors cursor-pointer whitespace-nowrap ${!content_to_include && 'bg-white text-black'}`}>
                            <span>NEIN</span>
                        </div>
                    </div>
                </Section>
                <Section 
                    title={"Welche Programmiersprache und Technologien werden für die Entwicklung bevorzugt?"} 
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
                        <input className="bg-transparent outline-none py-2 w-full placeholder:text-neutral-400 text-lg" type={'text'} placeholder={'Other (please specify)'} onChange={(e) => setPreferredTechnologies(e.target.value)} />
                    </div>
                </Section>
                <Section 
                    title={"Wer wird nach Abschluss des Projekts für die Verwaltung des Webs verantwortlich sein?"} 
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-2 pb-3">
                        <div onClick={() => setResponsibleForManaging("client")} className={`grid place-content-center border rounded-full py-2 px-5 hover:bg-white hover:text-black transition-colors cursor-pointer whitespace-nowrap ${responsible_for_managing == 'client' && 'bg-white text-black'}`}>
                            <span>Der Kunde</span>
                        </div>
                        <div onClick={() => setResponsibleForManaging("developer")} className={`grid place-content-center border rounded-full py-2 px-5 hover:bg-white hover:text-black transition-colors cursor-pointer whitespace-nowrap ${responsible_for_managing == 'developer' && 'bg-white text-black'}`}>
                            <span>Der Entwickler</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 border-b border-neutral-400">
                        <input className="bg-transparent outline-none py-2 w-full placeholder:text-neutral-400 text-lg" type={'text'} placeholder={'Other (please specify)'} onChange={(e) => setResponsibleForManaging(e.target.value)} />
                    </div>
                </Section>
                <Section 
                    title={"Wie sieht die Marketing- und Positionierungsstrategie des Kunden aus?"} 
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-2 pb-3">
                        <div onClick={() => setMarketingStrategy("social-media")} className={`grid place-content-center border rounded-full py-2 px-5 hover:bg-white hover:text-black transition-colors cursor-pointer whitespace-nowrap ${marketing_strategy == 'social-media' && 'bg-white text-black'}`}>
                            <span>Sozialen Medien</span>
                        </div>
                        <div onClick={() => setMarketingStrategy("email-marketing")} className={`grid place-content-center border rounded-full py-2 px-5 hover:bg-white hover:text-black transition-colors cursor-pointer whitespace-nowrap ${marketing_strategy == 'email-marketing' && 'bg-white text-black'}`}>
                            <span>E-Mail Marketing</span>
                        </div>
                        <div onClick={() => setMarketingStrategy("search-engine-optimization")} className={`grid place-content-center border rounded-full py-2 px-5 hover:bg-white hover:text-black transition-colors cursor-pointer whitespace-nowrap ${marketing_strategy == 'search-engine-optimization' && 'bg-white text-black'}`}>
                            <span>SEO</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 border-b border-neutral-400">
                        <input className="bg-transparent outline-none py-2 w-full placeholder:text-neutral-400 text-lg" type={'text'} placeholder={'Other (please specify)'} onChange={(e) => setMarketingStrategy(e.target.value)} />
                    </div>
                </Section>
                <Section 
                    title={"¿Existen sitios web de la competencia que deban tenerse en cuenta como referencias?"} 
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-2 pb-3">
                        <div onClick={() => setCompetitorWebsites(true)} className={`grid place-content-center border rounded-full py-2 px-5 hover:bg-white hover:text-black transition-colors cursor-pointer whitespace-nowrap ${competitor_websites && 'bg-white text-black'}`}>
                            <span>Ja</span>
                        </div>
                        <div onClick={() => setCompetitorWebsites(false)} className={`grid place-content-center border rounded-full py-2 px-5 hover:bg-white hover:text-black transition-colors cursor-pointer whitespace-nowrap ${!competitor_websites && 'bg-white text-black'}`}>
                            <span>NEIN</span>
                        </div>
                    </div>
                </Section>
            </section>
            <div className="flex items-center gap-2 lazy-load-4">
                <button type={'button'} onClick={handlePrevStep} className={`${step == 1 ? 'hidden' : 'block'} py-2 px-4 bg-gradient rounded-xl text-lg uppercase font-bold text-center cursor-pointer ${!projectQuoteAnimation ? 'block' : 'hidden'} w-full`}>zurück</button>
                <button type={step == 3 ? 'submit' : 'button'} onClick={handleNextStep} className={`py-2 px-4 bg-gradient rounded-xl text-lg uppercase font-bold text-center cursor-pointer ${!projectQuoteAnimation ? 'block' : 'hidden'} w-full`}>{step < 3 ? 'Nächste' : 'Einreichen'}</button>
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