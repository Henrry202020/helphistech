import { useRef, useState } from "react";
// Nextjs
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
// Context
import useContextProvider from "@/hooks/useAppContextProvider";
// Components
import Navbar from "@/components/en/Navbar";
import Footer from "@/components/en/Footer";

export default function Home() {

    // Get functions and variables from context
	const { darkMode } = useContextProvider();

	return (
		<>
			<Head>
				<title>Webseiten | HelphisTech</title>
			</Head>
			<main className={darkMode ? 'bg-black text-zinc-200' : 'bg-white text-black'}>
				<div className={'relative overflow-hidden'} id="hero">
					<Image className="absolute top-0 w-full h-full object-cover" src={`${darkMode ? '/home/hero/wave/dark/wave.webp' : '/home/hero/wave/light/wave.webp'}`} fill={true} alt="" priority={true} />
					<Navbar />
					<section className="relative flex items-center justify-center xl:px-20 2xl:px-0 min-h-[80rem] xl:min-h-[50rem] lazy-load-1" style={{height: 'calc(100vh - 5rem)', zIndex: '1'}}>
						<div className="max-w-7xl flex flex-col xl:flex-row items-center gap-12 w-full">
							<div className="flex flex-col gap-10 text-center xl:text-left xl:max-w-[33rem] 2xl:max-w-[37rem] px-20 xl:px-0">
								<div className={`flex flex-col gap-5`}>
									<h1 className={`${darkMode ? 'title-dark' : 'title-light'} text-6xl 2xl:text-7xl font-bold leading-[5rem] 2xl:leading-[5.5rem]`}>Custom web development for your business</h1>
									<p className={`${darkMode ? 'description-dark font-light' : 'description-light'} 2xl:text-lg`}>We offer customized solutions to help your business stand out online. From website design and development to app programming and search engine optimization, our team of experts can help you achieve your online goals.</p>
								</div>
								<div className="flex justify-center xl:justify-start">
									<Link href={"/project-quote"}>
										<button className="btn-primary text-white uppercase w-fit py-4 px-8 font-medium bg-primary hover:bg-primary-2 transition-colors 2xl:text-lg rounded-sm">
											<span>Start a project with us</span>
										</button>
									</Link>
								</div>
							</div>
							<div className="">
								<VideoPlayer 
									url={"https://res.cloudinary.com/drdor2wz7/video/upload/v1681591174/helphistech_eynapv.mp4"} 
								/>
							</div>
						</div>
					</section>
				</div>
				<section className={`px-20 2xl:px-0 ${darkMode ? 'section-bg-dark' : 'section-bg-light'} py-28 overflow-hidden lazy-load-1`} id="our-services">
					<div className="max-w-7xl mx-auto z-10 relative">
						<div className="flex items-center gap-20 justify-between w-full">
							<div className="blur-shadow -left-28 -top-28"></div>
							<div className="flex flex-col gap-20">
								<div className="flex flex-col gap-5 relative">
									<div className="flex flex-col">
										<h4 className={`uppercase font-semibold ${darkMode ? 'subtitle-dark' : 'subtitle-light'}`}>Our services</h4>
									</div>
									<div className="flex items-start gap-20">
										<div>
											<h2 className={`flex flex-col gap-5 text-5xl font-bold whitespace-nowrap ${darkMode ? 'title-dark' : 'title-light'}`}>
												<div>What <span className="text-primary">Services</span></div>
												<div>{"We're Offering"}</div>
											</h2>
										</div>
										<div className={`flex flex-col gap-5 ${darkMode ? 'description-dark font-light' : 'description-light'}`}>
											<p>At HelphisTech, we offer a wide range of web development services to help businesses create a strong online presence and achieve their digital goals. Our team of experienced developers is skilled in creating custom websites, web applications, and e-commerce platforms that are tailored to meet the unique needs of each client.</p>
											{/* We use the latest technologies and industry best practices to ensure that our projects are of the highest quality, and we work closely with our clients to ensure that they are satisfied with the final product. */}
										</div>
									</div>
								</div>
								<div className={`flex flex-col divide-y`}>
									<ServicesOption
										title={"Custom Website Development"}
										description={"We specialize in creating custom websites that are designed to meet the specific needs of our clients. Our websites are responsive, user-friendly, and optimized for search engines to ensure maximum visibility."}
									/>
									<ServicesOption
										title={"Web Application Development"}
										description={"We can develop complex web applications that are designed to streamline your business processes and improve efficiency. Our team has expertise in various programming languages and frameworks, including React, Angular, and Node."}
									/>
									<ServicesOption
										title={"E-Commerce Development"}
										description={"We can create custom e-commerce platforms that are designed to help businesses sell their products and services online. Our e-commerce websites are secure, easy to use, and can integrate with popular payment gateways such as PayPal and Stripe."}
									/>
									<ServicesOption
										title={"Website Maintenance and Support"}
										description={"We provide ongoing maintenance and support for all of our websites and web applications. Our team is available to troubleshoot any issues that may arise and to ensure that your website is always up-to-date and running smoothly."}
									/>
								</div>
								<Link className="flex justify-center" href={"#"}>
									<button className="flex items-center gap-2 text-primary hover:text-primary-2 transition-colors">
										<div>See more</div>
										<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
											<path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
										</svg>
									</button>
								</Link>
							</div>
						</div>
					</div>
				</section>
				<section className={`relative overflow-hidden ${darkMode ? 'section-bg-dark border-[#19191F]' : 'section-bg-light border-zinc-300'} flex items-center py-28 px-20 2xl:px-0 border-t lazy-load-1`} id="our-technologies">
					<div className="blur-shadow -top-6 -left-6"></div>
					<div className="flex flex-col gap-20 overflow-hidden max-w-7xl mx-auto">
						<div className="flex flex-col gap-4 text-white relative">
							<div className="flex flex-col gap-3">
								<h4 className={`uppercase font-semibold ${darkMode ? 'subtitle-dark' : 'subtitle-light'}`}>Our technologies</h4>
								<h2 className={`flex flex-col gap-5 text-5xl font-bold whitespace-nowrap ${darkMode ? 'title-dark' : 'title-light'}`}>
									<div>These are the <span className="text-primary">Technologies</span></div> 
									<div>we use the most</div>
								</h2>
							</div>
							<div className={`2xl:text-lg ${darkMode ? 'description-dark font-light' : 'description-light'}`}>
								<p>The appropriate technology enriches the project. Here are some of the ones we use the most:</p>
							</div>
						</div>
						<div className="overflow-x-scroll hide-scroll">
							<div className="grid grid-cols-5 gap-y-10 gap-x-14 xl:gap-x-28 select-none min-w-[60rem]">
								<TechnologyImage src={"/technologies/react.webp"} alt={"React technology image"} />
								<TechnologyImage src={"/technologies/nextjs.webp"} alt={"Next js technology image"} darkmode={"/technologies/darkmode/nextjs.webp"} />
								<TechnologyImage src={"/technologies/angular.webp"} alt={"Angular technology image"} />
								<TechnologyImage src={"/technologies/vuejs.webp"} alt={"Vue technology image"} />
								<TechnologyImage src={"/technologies/astro.webp"} alt={"Astro technology image"} darkmode={"/technologies/darkmode/astro.webp"} />
								<TechnologyImage src={"/technologies/tailwind.webp"} alt={"Tailwind technology image"} />
								<TechnologyImage src={"/technologies/nodejs.webp"} alt={"Node js technology image"} darkmode={"/technologies/darkmode/nodejs.webp"} />
								<TechnologyImage src={"/technologies/mongodb.webp"} alt={"MongoDB technology image"} />
								<TechnologyImage src={"/technologies/mysql.webp"} alt={"MySQL technology image"} />
								<TechnologyImage src={"/technologies/socketio.webp"} alt={"Socket.io technology image"} darkmode={"/technologies/darkmode/socketio.webp"} />
							</div>
						</div>
						<Link className="flex justify-center" href={"#"}>
							<button className="flex items-center gap-2 text-primary hover:text-primary-2 transition-colors">
								<div>See more</div>
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
									<path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
								</svg>
							</button>
						</Link>
					</div>
				</section>
				<section className="flex flex-col gap-16 py-28 text-center lazy-load-1" id="index_section_startmyproject">
					<div className="flex flex-col gap-8">
						<div className={`${darkMode ? 'subtitle-dark' : 'subtitle-light'} text-lg uppercase font-semibold`}>
							<span>Do you have an idea?</span>
						</div>
						<div className="w-2/3 2xl:w-2/4 mx-auto">
							<h2 className={`${darkMode ? 'title-dark' : 'title-light'} text-[2.25rem] sm:text-[3rem] md:text-[3.75rem] lg:text-[4.5rem] font-semibold`}>We only need an idea or a problem for us to carry out your project</h2>
						</div>
					</div>
					<div className="cursor-pointer border-b-2 border-primary text-primary hover:border-white hover:text-white transition-colors w-fit mx-auto pb-1">
						<button className="text-2xl transition-colors font-semibold" onClick={null}>Start your project</button>
					</div>
				</section>
				<Footer />
			</main>
		</>
	)
}

function VideoPlayer({ url }) {

	// Hero section video
	const video = useRef(null);
	const [ paused, setPaused ] = useState(true);

	function handlePlayVideo() {
		if(video.current.paused) {
			setPaused(false);
			video.current.play();
		} else {
			setPaused(true);
			video.current.pause();
		}
	}

	return (
		<div className="relative cursor-pointer xl:rounded-md" onClick={handlePlayVideo}>
			<div className={`${paused ? 'block' : 'hidden'}`}>
				<div className={`absolute top-0 left-0 w-full h-full bg-black opacity-70 xl:rounded-md`}></div>
				<div className={`absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2`}>
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={.7} stroke="currentColor" className="w-20 h-20 text-zinc-300">
						<path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
						<path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />
					</svg>

				</div>
			</div>
			<video ref={video} className="xl:rounded-md" width="100%" height="auto" loop controls controlsList="nofullscreen nodownload noremoteplayback noplaybackrate foobar" poster="/home/hero/video-preview/preview.webp">
				<source src={url} type="video/mp4" />
			</video>
		</div>
	)
}

function ServicesOption({ title, description, href }) {

    // Get functions and variables from context
	const { darkMode } = useContextProvider();

	const [ showDescription, setShowDescription ] = useState(false);
	const [ closeDropdown, setCloseDropdown ] = useState(false);

	function handleShowDescription() {
		if(showDescription) {
			setCloseDropdown(true);
			setTimeout(() => {
				setShowDescription(false);
			}, 220)
		} else {
			setCloseDropdown(false);
			setShowDescription(true);
		}
	}

	return (
		<div onClick={handleShowDescription} className={`flex flex-col gap-5 py-9 cursor-pointer select-none ${darkMode ? 'subtitle-dark border-[#19191F] hover:text-zinc-200' : 'text-neutral-600 hover:text-black border-neutral-300'} transition-colors`}>
			<div className={`flex items-center justify-between ${showDescription ? darkMode ? 'text-zinc-200' : 'text-black' : null}`}>
				<h3 className="font-extralight text-4xl">{title}</h3>
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={.7} stroke="currentColor" className={`w-12 h-12 ${showDescription ? 'rotate-180' : 'rotate-0'} transition-all`}>
					<path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75l3 3m0 0l3-3m-3 3v-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
				</svg>
			</div>
			{ showDescription && (
				<div className={`flex flex-col gap-5 ${closeDropdown ? 'dropdown-description-hide' : 'dropdown-description-show'}`}>
					<p className={`font-light ${darkMode ? 'description-dark' : 'description-light'}`}>{description}</p>
					<Link className="text-primary hover:text-primary-2 transition-colors" href={"#"}>
						<button className="flex items-center gap-2">
							<div>I'm interested</div>
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
								<path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
							</svg>
						</button>
					</Link>
				</div>
			)}
		</div>
	)
}

// Technology image of Technologies section.
function TechnologyImage({ src, alt, darkmode }) {
	
	const { darkMode } = useContextProvider();

	return darkmode && darkMode ? (
		<div>
			<Image src={darkmode} width={166} height={104} alt={alt} />
		</div>
	) : (
		<div>
			<Image src={src} width={166} height={104} alt={alt} />
		</div>
	)
}