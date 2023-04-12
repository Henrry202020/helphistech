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
                        <div className={`text-6xl font-extrabold text-gradient lg:h-36 lg:leading-[4rem] lazy-load-1 ${projectQuoteAnimation ? 'hidden' : 'block'}`}>Quote your<br /> project.</div>
                        <div className={`lg:max-w-xs xl:max-w-md lazy-load-2 text-neutral-200 ${projectQuoteAnimation ? 'hidden' : 'block'}`}>Thank you for your interest. Tell me about your project or idea so we can start working together!</div>
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

    function handleNextStep() {
        if(step < 3) {
            setStep(current => current + 1);
        }
    }

    function handlePrevStep() {
        if(step > 1) {
            setStep(current => current - 1);
        }
    }

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
    const description = useRef(null);

    // 2ND FORM - What is the full name of the company or client?
    const company_fullname = useRef(null);
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
    const functionalities_other = useRef(null);
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
        description.current.value = '';
    }

    function showMessage(error, text, timeout) {
        setMessage({ error, text })
        setTimeout(() => {
            setMessage({ error: false, text: '' })
        }, timeout)
    }

    function handleSubmit() {
        // console.log('asd')
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
                    company_info: {
                        full_name: company_fullname,
                        business_type,
                        company_vision,
                        target_audience,
                        service_or_product,
                        expected_deilvertime
                    },
                    project_info: {
                        functionalities,
                        functionalities_other,
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
                    const { data } = await axios.request({
                        url: '/api/sendProject',
                        method: 'POST',
                        data: { project }
                    });      
                    values.fullName = '';   
                    values.email = '';  
                    showMessage(false, 'Information sent successfully!', 5000)
                    resetForm();   
                } catch (error) {
                    showMessage(true, 'There was an error sending the information', 5000)
                }
            }}
        >
            {({ errors, touched }) => (   
                <Form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                    { message.text && (
                        <div className={`${message.error ? 'bg-red-500' : 'bg-light-main'} py-2 w-full text-white uppercase font-semibold text-center rounded-md`}>{message.text}</div>
                    )}
                    <section id="step1" className={`flex flex-col gap-6 ${step == 1 ? 'block' : 'hidden'}`}>
                        <Section 
                            title={"What type of project?"} 
                            classes={`${!projectQuoteAnimation ? 'lazy-load-1 block' : 'hidden'}`}
                        >
                            <div className="grid grid-cols-2 sm:grid-cols-3 items-center gap-2">
                                <div onClick={() => setType('website')} className={`grid place-content-center border rounded-full py-2 px-5 hover:bg-white hover:text-black transition-colors cursor-pointer whitespace-nowrap ${type === 'website' && 'bg-white text-black'}`}>
                                    <span>Website</span>
                                </div>
                                <div onClick={() => setType('ecommerce')} className={`grid place-content-center border rounded-full py-2 px-5 hover:bg-white hover:text-black transition-colors cursor-pointer whitespace-nowrap ${type === 'ecommerce' && 'bg-white text-black'}`}>
                                    <span>E-Commerce</span>
                                </div>
                                <div onClick={() => setType('app')} className={`grid place-content-center border rounded-full py-2 px-5 hover:bg-white hover:text-black transition-colors cursor-pointer whitespace-nowrap ${type === 'app' && 'bg-white text-black'}`}>
                                    <span>App</span>
                                </div>
                            </div>
                        </Section>
                        <Section 
                            title={"Contact information"}  
                            classes={`${!projectQuoteAnimation ? 'lazy-load-2 block' : 'hidden'}`}
                        >
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center border-b border-neutral-400">
                                    <Field 
                                        className="bg-transparent outline-none py-2 w-full placeholder:text-neutral-400 text-lg"
                                        name="fullName" 
                                        type="text"
                                        placeholder="Full name"
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
                                        placeholder="Email"
                                    />
                                </div>
                                {errors.email && touched.email ? (
                                    <div className="text-sm text-red-500">{errors.email}</div>
                                ) : null}
                            </div>
                        </Section>
                        <Section 
                            title={"Tell us more about your project"} 
                            classes={`${!projectQuoteAnimation ? 'lazy-load-4 block' : 'hidden'}`}
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
                            title={"What is the full name of the company or client?"} 
                        >
                            <Input props={{
                                placeholder: 'Full name', 
                                ref: company_fullname, 
                                type: 'text', 
                                required: false
                            }} />
                        </Section>
                        <Section 
                            title={"What type of business does the client have?"} 
                        >
                            <div className="grid grid-cols-2 sm:grid-cols-3 items-center gap-2 pb-3">
                                <div onClick={() => setBusinessType('Retail')} className={`grid place-content-center border rounded-full py-2 px-5 hover:bg-white hover:text-black transition-colors cursor-pointer whitespace-nowrap ${business_type === 'Retail' && 'bg-white text-black'}`}>
                                    <span>Retail</span>
                                </div>
                                <div onClick={() => setBusinessType('Service')} className={`grid place-content-center border rounded-full py-2 px-5 hover:bg-white hover:text-black transition-colors cursor-pointer whitespace-nowrap ${business_type === 'Service' && 'bg-white text-black'}`}>
                                    <span>Service</span>
                                </div>
                                <div onClick={() => setBusinessType('Manufacturing')} className={`grid place-content-center border rounded-full py-2 px-5 hover:bg-white hover:text-black transition-colors cursor-pointer whitespace-nowrap ${business_type === 'Manufacturing' && 'bg-white text-black'}`}>
                                    <span>Manufacturing</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 border-b border-neutral-400">
                                <input className="bg-transparent outline-none py-2 w-full placeholder:text-neutral-400 text-lg" type={'text'} placeholder={'Other'} onChange={(e) => setBusinessType(e.target.value)} />
                            </div>
                        </Section>
                        <Section 
                            title={"What is the company's vision and mission?"} 
                        >
                            <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-2 pb-3">
                                <div onClick={() => setCompanyVision('Increase profitability')} className={`grid place-content-center border rounded-full py-2 px-5 hover:bg-white hover:text-black transition-colors cursor-pointer whitespace-nowrap ${company_vision === 'Increase profitability' && 'bg-white text-black'}`}>
                                    <span>Increase profitability</span>
                                </div>
                                <div onClick={() => setCompanyVision('Enhance customer satisfaction')} className={`grid place-content-center border rounded-full py-2 px-5 hover:bg-white hover:text-black transition-colors cursor-pointer whitespace-nowrap ${company_vision === 'Enhance customer satisfaction' && 'bg-white text-black'}`}>
                                    <span>Enhance customer satisfaction</span>
                                </div>
                                <div onClick={() => setCompanyVision('Promote sustainability')} className={`grid place-content-center border rounded-full py-2 px-5 hover:bg-white hover:text-black transition-colors cursor-pointer whitespace-nowrap ${company_vision === 'Promote sustainability' && 'bg-white text-black'}`}>
                                    <span>Promote sustainability</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 border-b border-neutral-400">
                                <input className="bg-transparent outline-none py-2 w-full placeholder:text-neutral-400 text-lg" type={'text'} placeholder={'Other'} onChange={(e) => setCompanyVision(e.target.value)} />
                            </div>
                        </Section>
                        <Section 
                            title={"Who is the target audience for the company?"} 
                        >
                            <div className="grid grid-cols-2 sm:grid-cols-3 items-center gap-2 pb-3">
                                <div onClick={() => setTargetAudience('Children')} className={`grid place-content-center border rounded-full py-2 px-5 hover:bg-white hover:text-black transition-colors cursor-pointer whitespace-nowrap ${target_audience === 'Children' && 'bg-white text-black'}`}>
                                    <span>Children</span>
                                </div>
                                <div onClick={() => setTargetAudience('Teenagers')} className={`grid place-content-center border rounded-full py-2 px-5 hover:bg-white hover:text-black transition-colors cursor-pointer whitespace-nowrap ${target_audience === 'Teenagers' && 'bg-white text-black'}`}>
                                    <span>Teenagers</span>
                                </div>
                                <div onClick={() => setTargetAudience('Young adults')} className={`grid place-content-center border rounded-full py-2 px-5 hover:bg-white hover:text-black transition-colors cursor-pointer whitespace-nowrap ${target_audience === 'Young adults' && 'bg-white text-black'}`}>
                                    <span>Young adults</span>
                                </div>
                                <div onClick={() => setTargetAudience('Adults')} className={`grid place-content-center border rounded-full py-2 px-5 hover:bg-white hover:text-black transition-colors cursor-pointer whitespace-nowrap ${target_audience === 'Adults' && 'bg-white text-black'}`}>
                                    <span>Adults</span>
                                </div>
                                <div onClick={() => setTargetAudience('Seniors')} className={`grid place-content-center border rounded-full py-2 px-5 hover:bg-white hover:text-black transition-colors cursor-pointer whitespace-nowrap ${target_audience === 'Seniors' && 'bg-white text-black'}`}>
                                    <span>Seniors</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 border-b border-neutral-400">
                                <input className="bg-transparent outline-none py-2 w-full placeholder:text-neutral-400 text-lg" type={'text'} placeholder={'Other'} onChange={(e) => setTargetAudience(e.target.value)} />
                            </div>
                        </Section>
                        <Section 
                            title={"What services or products does the company offer?"} 
                        >
                            <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-2 pb-3">
                                <div onClick={() => setServiceOrProduct('Products')} className={`grid place-content-center border rounded-full py-2 px-5 hover:bg-white hover:text-black transition-colors cursor-pointer whitespace-nowrap ${service_or_product === 'Products' && 'bg-white text-black'}`}>
                                    <span>Products</span>
                                </div>
                                <div onClick={() => setServiceOrProduct('Services')} className={`grid place-content-center border rounded-full py-2 px-5 hover:bg-white hover:text-black transition-colors cursor-pointer whitespace-nowrap ${service_or_product === 'Services' && 'bg-white text-black'}`}>
                                    <span>Services</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 border-b border-neutral-400">
                                <input className="bg-transparent outline-none py-2 w-full placeholder:text-neutral-400 text-lg" type={'text'} placeholder={'Other'} onChange={(e) => setServiceOrProduct(e.target.value)} />
                            </div>
                        </Section>
                        <Section 
                            title={"What is the expected delivery timeline?"} 
                        >
                            <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-2 pb-3">
                                <div onClick={() => setExpectedDeliverTime({ from: 0, to: 1 })} className={`grid place-content-center border rounded-full py-2 px-5 hover:bg-white hover:text-black transition-colors cursor-pointer whitespace-nowrap ${expected_deilvertime.from == 0 && 'bg-white text-black'}`}>
                                    <span>{"< 1 month"}</span>
                                </div>
                                <div onClick={() => setExpectedDeliverTime({ from: 1, to: 3 })} className={`grid place-content-center border rounded-full py-2 px-5 hover:bg-white hover:text-black transition-colors cursor-pointer whitespace-nowrap ${expected_deilvertime.from == 1 && 'bg-white text-black'}`}>
                                    <span>1 - 3 months</span>
                                </div>
                                <div onClick={() => setExpectedDeliverTime({ from: 3, to: 6 })} className={`grid place-content-center border rounded-full py-2 px-5 hover:bg-white hover:text-black transition-colors cursor-pointer whitespace-nowrap ${expected_deilvertime.from == 3 && 'bg-white text-black'}`}>
                                    <span>3 - 6 months</span>
                                </div>
                                <div onClick={() => setExpectedDeliverTime({ from: 6, to: 0 })} className={`grid place-content-center border rounded-full py-2 px-5 hover:bg-white hover:text-black transition-colors cursor-pointer whitespace-nowrap ${expected_deilvertime.from == 6 && 'bg-white text-black'}`}>
                                    <span>{"> 6 months"}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 border-b border-neutral-400">
                                <input className="bg-transparent outline-none py-2 w-full placeholder:text-neutral-400 text-lg" type={'text'} placeholder={'Other'} onChange={(e) => setExpectedDeliverTime(e.target.value)} />
                            </div>
                        </Section>
                    </section>
                    <section id="step3" className={`flex flex-col gap-6 ${step == 3 ? 'block' : 'hidden'}`}>
                        <Section 
                            title={"What functionalities should the web have?"} 
                        >
                            <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-2 pb-3">
                                <div onClick={() => handleFunctionabilites("Contact form")} className={`grid place-content-center border rounded-full py-2 px-5 hover:bg-white hover:text-black transition-colors cursor-pointer whitespace-nowrap ${functionalities.indexOf("Contact form") > -1 && 'bg-white text-black'}`}>
                                    <span>Contact form</span>
                                </div>
                                <div onClick={() => handleFunctionabilites("Image gallery")} className={`grid place-content-center border rounded-full py-2 px-5 hover:bg-white hover:text-black transition-colors cursor-pointer whitespace-nowrap ${functionalities.indexOf("Image gallery") > -1 && 'bg-white text-black'}`}>
                                    <span>Image gallery</span>
                                </div>
                                <div onClick={() => handleFunctionabilites("Blog section")} className={`grid place-content-center border rounded-full py-2 px-5 hover:bg-white hover:text-black transition-colors cursor-pointer whitespace-nowrap ${functionalities.indexOf("Blog section") > -1 && 'bg-white text-black'}`}>
                                    <span>Blog section</span>
                                </div>
                                <div onClick={() => handleFunctionabilites("Social media integration")} className={`grid place-content-center border rounded-full py-2 px-5 hover:bg-white hover:text-black transition-colors cursor-pointer whitespace-nowrap ${functionalities.indexOf("Social media integration") > -1 && 'bg-white text-black'}`}>
                                    <span>Social media integration</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 border-b border-neutral-400">
                                <input className="bg-transparent outline-none py-2 w-full placeholder:text-neutral-400 text-lg" type={'text'} placeholder={'Other'} onChange={(e) => setFunctionalities(e.target.value)} />
                            </div>
                        </Section>
                        <Section 
                            title={"Should the web be responsive or have a specific design?"} 
                        >
                            <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-2 pb-3">
                                <div onClick={() => setWebDesignType("Responsive")} className={`grid place-content-center border rounded-full py-2 px-5 hover:bg-white hover:text-black transition-colors cursor-pointer whitespace-nowrap ${web_design_type == 'Responsive' && 'bg-white text-black'}`}>
                                    <span>Responsive</span>
                                </div>
                                <div onClick={() => setWebDesignType("Specific design")} className={`grid place-content-center border rounded-full py-2 px-5 hover:bg-white hover:text-black transition-colors cursor-pointer whitespace-nowrap ${web_design_type == 'Specific design' && 'bg-white text-black'}`}>
                                    <span>Specific design</span>
                                </div>
                            </div>
                        </Section>
                        <Section 
                            title={"Are e-commerce functionalities needed on the web?"} 
                        >
                            <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-2 pb-3">
                                <div onClick={() => setEcommerceFunc(true)} className={`grid place-content-center border rounded-full py-2 px-5 hover:bg-white hover:text-black transition-colors cursor-pointer whitespace-nowrap ${ecommerce_funtionabilites && 'bg-white text-black'}`}>
                                    <span>Yes</span>
                                </div>
                                <div onClick={() => setEcommerceFunc(false)} className={`grid place-content-center border rounded-full py-2 px-5 hover:bg-white hover:text-black transition-colors cursor-pointer whitespace-nowrap ${!ecommerce_funtionabilites && 'bg-white text-black'}`}>
                                    <span>No</span>
                                </div>
                            </div>
                        </Section>
                        <Section 
                            title={"Does the client have any content (text, images, videos) to include on the web?"} 
                        >
                            <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-2 pb-3">
                                <div onClick={() => setContentToInclude(true)} className={`grid place-content-center border rounded-full py-2 px-5 hover:bg-white hover:text-black transition-colors cursor-pointer whitespace-nowrap ${content_to_include && 'bg-white text-black'}`}>
                                    <span>Yes</span>
                                </div>
                                <div onClick={() => setContentToInclude(false)} className={`grid place-content-center border rounded-full py-2 px-5 hover:bg-white hover:text-black transition-colors cursor-pointer whitespace-nowrap ${!content_to_include && 'bg-white text-black'}`}>
                                    <span>No</span>
                                </div>
                            </div>
                        </Section>
                        <Section 
                            title={"What programming language and technologies are preferred for development?"} 
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
                                <input className="bg-transparent outline-none py-2 w-full placeholder:text-neutral-400 text-lg" type={'text'} placeholder={'Other'} onChange={(e) => setPreferredTechnologies(e.target.value)} />
                            </div>
                        </Section>
                        <Section 
                            title={"Who will be responsible for managing the web once the project is completed?"} 
                        >
                            <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-2 pb-3">
                                <div onClick={() => setResponsibleForManaging("The client")} className={`grid place-content-center border rounded-full py-2 px-5 hover:bg-white hover:text-black transition-colors cursor-pointer whitespace-nowrap ${responsible_for_managing == 'The client' && 'bg-white text-black'}`}>
                                    <span>The client</span>
                                </div>
                                <div onClick={() => setResponsibleForManaging("The developer")} className={`grid place-content-center border rounded-full py-2 px-5 hover:bg-white hover:text-black transition-colors cursor-pointer whitespace-nowrap ${responsible_for_managing == 'The developer' && 'bg-white text-black'}`}>
                                    <span>The developer</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 border-b border-neutral-400">
                                <input className="bg-transparent outline-none py-2 w-full placeholder:text-neutral-400 text-lg" type={'text'} placeholder={'Other'} onChange={(e) => setResponsibleForManaging(e.target.value)} />
                            </div>
                        </Section>
                        <Section 
                            title={"What is the client's marketing and positioning strategy?"} 
                        >
                            <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-2 pb-3">
                                <div onClick={() => setMarketingStrategy("Social media")} className={`grid place-content-center border rounded-full py-2 px-5 hover:bg-white hover:text-black transition-colors cursor-pointer whitespace-nowrap ${marketing_strategy == 'Social media' && 'bg-white text-black'}`}>
                                    <span>Social media</span>
                                </div>
                                <div onClick={() => setMarketingStrategy("Email marketing")} className={`grid place-content-center border rounded-full py-2 px-5 hover:bg-white hover:text-black transition-colors cursor-pointer whitespace-nowrap ${marketing_strategy == 'Email marketing' && 'bg-white text-black'}`}>
                                    <span>Email marketing</span>
                                </div>
                                <div onClick={() => setMarketingStrategy("Search engine optimization")} className={`grid place-content-center border rounded-full py-2 px-5 hover:bg-white hover:text-black transition-colors cursor-pointer whitespace-nowrap ${marketing_strategy == 'Search engine optimization' && 'bg-white text-black'}`}>
                                    <span>Search engine optimization</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 border-b border-neutral-400">
                                <input className="bg-transparent outline-none py-2 w-full placeholder:text-neutral-400 text-lg" type={'text'} placeholder={'Other'} onChange={(e) => setMarketingStrategy(e.target.value)} />
                            </div>
                        </Section>
                        <Section 
                            title={"Are there competitor websites that should be taken into account as references?"} 
                        >
                            <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-2 pb-3">
                                <div onClick={() => setCompetitorWebsites(true)} className={`grid place-content-center border rounded-full py-2 px-5 hover:bg-white hover:text-black transition-colors cursor-pointer whitespace-nowrap ${competitor_websites && 'bg-white text-black'}`}>
                                    <span>Yes</span>
                                </div>
                                <div onClick={() => setCompetitorWebsites(false)} className={`grid place-content-center border rounded-full py-2 px-5 hover:bg-white hover:text-black transition-colors cursor-pointer whitespace-nowrap ${!competitor_websites && 'bg-white text-black'}`}>
                                    <span>No</span>
                                </div>
                            </div>
                        </Section>
                    </section>
                    <div className="flex items-center gap-2 lazy-load-4">
                        <button type={'button'} onClick={handlePrevStep} className={`${step == 1 ? 'hidden' : 'block'} py-2 px-4 bg-gradient rounded-xl text-lg uppercase font-bold text-center cursor-pointer ${!projectQuoteAnimation ? 'block' : 'hidden'} w-full`}>Back</button>
                        <button type={step == 3 ? 'submit' : 'button'} onClick={handleNextStep} className={`py-2 px-4 bg-gradient rounded-xl text-lg uppercase font-bold text-center cursor-pointer ${!projectQuoteAnimation ? 'block' : 'hidden'} w-full`}>{step < 3 ? 'Next' : 'Submit'}</button>
                    </div>
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