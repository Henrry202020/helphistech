import { useEffect, useRef, useState } from "react";
// Nextjs
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
// Context
import useContextProvider from "@/hooks/useAppContextProvider";
// Components
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {

	const router = useRouter();

    // Get functions and variables from context
	const { darkMode, language } = useContextProvider();

	useEffect(() => {
		if(language != 'de') {
			router.push(`/${language}`)
		}
	}, [language])

	return (
		<>
			<Head>
				<title>Webseiten | HelphisTech</title>
			</Head>
			<main className={darkMode ? 'bg-black text-zinc-200' : 'bg-white text-black'}>
				<div className="relative overflow-hidden" id="hero">
					<Image className="absolute top-0 w-full h-full object-cover" src={`${darkMode ? '/home/hero/wave/dark/wave.webp' : '/home/hero/wave/light/wave.webp'}`} fill={true} alt="" priority={true} />
					<Navbar />
					<section className="relative flex items-center justify-center xl:px-20 2xl:px-0 min-h-[80rem] xl:min-h-[50rem] lazy-load-1" style={{height: 'calc(100vh - 5rem)', zIndex: '1'}}>
						<div className="max-w-7xl flex flex-col xl:flex-row items-center gap-12 w-full">
							<div className="flex flex-col gap-10 text-center xl:text-left xl:max-w-[33rem] 2xl:max-w-[37rem] px-20 xl:px-0">
								<div className={`flex flex-col gap-5`}>
									<h1 className={`${darkMode ? 'title-dark' : 'title-light'} text-5xl 2xl:text-6xl font-bold leading-[5rem] 2xl:leading-[5.5rem]`}>Maßgeschneiderte Webentwicklung für Ihr Unternehmen</h1>
									<p className={`${darkMode ? 'description-dark font-light' : 'description-light'} 2xl:text-lg`}>Wir bieten maßgeschneiderte Lösungen, mit denen sich Ihr Unternehmen online von der Masse abhebt. Von Website-Design und -Entwicklung bis hin zur App-Programmierung und Suchmaschinenoptimierung kann unser Expertenteam Ihnen helfen, Ihre Online-Ziele zu erreichen.</p>
								</div>
								<div className="flex justify-center xl:justify-start">
									<Link href={"/project-quote"}>
										<button className="btn-primary text-white uppercase w-fit py-4 px-8 font-medium bg-primary hover:bg-primary-2 transition-colors 2xl:text-lg rounded-sm">
											<span>Starten Sie ein Projekt mit uns</span>
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
										<span className={`uppercase font-semibold ${darkMode ? 'subtitle-dark' : 'subtitle-light'}`}>Unsere Dienstleistungen</span>
									</div>
									<div className="flex items-start gap-20">
										<div>
											<h2 className={`flex flex-col gap-5 text-5xl font-bold whitespace-nowrap ${darkMode ? 'title-dark' : 'title-light'}`}>
												<div>Welche</div>
                                                <div className="text-primary">Dienstleistungen</div>
												<div>{"wir anbieten"}</div>
											</h2>
										</div>
										<div className={`flex flex-col gap-5 ${darkMode ? 'description-dark font-light' : 'description-light'}`}>
											<p>Bei HelphisTech bieten wir eine breite Palette von Webentwicklungsdiensten an, um Unternehmen dabei zu helfen, eine starke Online-Präsenz zu schaffen und ihre digitalen Ziele zu erreichen. Unser Team aus erfahrenen Entwicklern ist in der Erstellung benutzerdefinierter Websites, Webanwendungen und E-Commerce-Plattformen geschult, die auf die individuellen Bedürfnisse jedes Kunden zugeschnitten sind.</p>
											{/* We use the latest technologies and industry best practices to ensure that our projects are of the highest quality, and we work closely with our clients to ensure that they are satisfied with the final product. */}
										</div>
									</div>
								</div>
								<div className={`flex flex-col divide-y`}>
									<ServicesOption
										title={"Maßgeschneiderte Softwareentwicklung"}
										description={"Wir sind darauf spezialisiert, kundenspezifische Websites zu erstellen, die auf die spezifischen Bedürfnisse unserer Kunden zugeschnitten sind. Unsere Websites sind reaktionsschnell, benutzerfreundlich und für Suchmaschinen optimiert, um eine maximale Sichtbarkeit zu gewährleisten."}
									/>
									<ServicesOption
										title={"Entwicklung von Webanwendungen"}
										description={"Wir können komplexe Webanwendungen entwickeln, die darauf ausgelegt sind, Ihre Geschäftsprozesse zu rationalisieren und die Effizienz zu verbessern. Unser Team verfügt über Erfahrung in verschiedenen Programmiersprachen und Frameworks, darunter React, Angular und Node."}
									/>
									<ServicesOption
										title={"E-Commerce-Webanwendungen"}
										description={"Wir können benutzerdefinierte E-Commerce-Plattformen erstellen, die Unternehmen dabei helfen sollen, ihre Produkte und Dienstleistungen online zu verkaufen. Unsere E-Commerce-Websites sind sicher, einfach zu bedienen und können in beliebte Zahlungsgateways wie PayPal und Stripe integriert werden."}
									/>
									<ServicesOption
										title={"Webanwendungs-Wartung"}
										description={"Wir bieten laufende Wartung und Support für alle unsere Websites und Webanwendungen. Unser Team steht Ihnen zur Verfügung, um eventuell auftretende Probleme zu beheben und sicherzustellen, dass Ihre Website immer auf dem neuesten Stand ist und reibungslos funktioniert."}
									/>
								</div>
								<Link className="flex justify-center" href={"#"}>
									<button className="flex items-center gap-2 text-primary hover:text-primary-2 transition-colors">
										<div>Mehr Erfahren</div>
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
								<span className={`uppercase font-semibold ${darkMode ? 'subtitle-dark' : 'subtitle-light'}`}>Unsere Technologien</span>
								<h2 className={`flex flex-col gap-5 text-5xl font-bold whitespace-nowrap ${darkMode ? 'title-dark' : 'title-light'}`}>
									<div>Dies sind die <span className="text-primary">Technologien</span></div> 
									<div>die wir am häufigsten verwenden</div>
								</h2>
							</div>
							<div className={`2xl:text-lg ${darkMode ? 'description-dark font-light' : 'description-light'}`}>
								<p>Die passende Technologie bereichert das Projekt. Hier sind einige von denen, die wir am häufigsten verwenden:</p>
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
								<div>Mehr Erfahren</div>
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
									<path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
								</svg>
							</button>
						</Link>
					</div>
				</section>
				<section className="flex flex-col gap-16 py-28 text-center lazy-load-1" id="start-my-project">
					<div className="flex flex-col gap-8">
						<div className={`${darkMode ? 'subtitle-dark' : 'subtitle-light'} text-lg uppercase font-semibold`}>
							<span>Haben sie eine Idee?</span>
						</div>
						<div className="w-2/3 2xl:w-2/4 mx-auto">
							<span className={`${darkMode ? 'title-dark' : 'title-light'} text-[2.25rem] sm:text-[3rem] md:text-[3.75rem] lg:text-[4.5rem] font-semibold`}>Wir brauchen nur eine Idee oder ein Problem, damit wir Ihr Projekt umsetzen können</span>
						</div>
					</div>
					<div className="cursor-pointer border-b-2 border-primary text-primary hover:border-white hover:text-white transition-colors w-fit mx-auto pb-1">
						<button className="text-2xl transition-colors font-semibold" onClick={null}>Starten Sie Ihr Projekt</button>
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
							<div>Ich bin interessiert</div>
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