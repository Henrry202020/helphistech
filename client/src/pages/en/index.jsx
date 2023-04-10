import Image from "next/image";
import Link from "next/link";
// Youtube videos
import Youtube from 'react-youtube'
// Components
import Button from "@/components/Button";
import Layout from "@/components/Layout";
// Hooks
import useContextProvider from "@/hooks/useAppContextProvider";
// Swiper Slider
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function ENGHome() {

	// Get functions and variables from context
	const { darkMode, handleShowProjectQuote } = useContextProvider();

	return (
		<Layout title="Home">
			<div className="flex items-center justify-center sm:justify-start max-w-6xl 2xl:max-w-[90rem] mx-auto pb-16 px-6 md:px-10 min-h-[65rem] lg:min-h-[40rem]" style={{height: 'calc(100vh - 5rem)'}} id="index_section_home">
				<div className="flex flex-col lg:flex-row items-center gap-10 w-full lazy-load-1">
					<div className="flex flex-col items-center sm:items-start gap-12">
						<div className="flex items-center">
							<div className="flex flex-col gap-5">
								<h1 className={`flex flex-col gap-3 items-center sm:items-start sm:gap-5 text-center sm:text-left text-3xl sm:text-4xl md:text-5xl 2xl:text-6xl uppercase font-extrabold max-w-3xl ${darkMode ? 'text-dark-main' : 'text-light-main'} transition-colors`}>
								<div className="flex items-center gap-2">
									<div className={`px-3 py-1 rounded-xl ${darkMode ? 'bg-dark-main text-dark-text' : 'bg-light-main text-white'} transition-colors`}>We are</div>
									<div>a</div>
									</div>
									<div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 w-fit">
										<div className={`px-3 py-1 rounded-xl ${darkMode ? 'bg-dark-main text-dark-text' : 'bg-light-main text-white'} transition-colors`}>professional</div>
										<div className="hidden sm:block">team</div>
									</div>
									<div className="block sm:hidden">team of</div>
									<div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 w-fit">
										<div className="hidden sm:block">of</div>
										<div className={`px-3 py-1 rounded-xl ${darkMode ? 'bg-dark-main text-dark-text' : 'bg-light-main text-white'} transition-colors`}>developers</div>
									</div>
								</h1>
								<p className={`text-center ${darkMode ? 'text-dark-text' : 'text-neutral-700'} max-w-xs sm:text-left sm:max-w-2xl sm:text-xl 2xl:text-2xl font-light`}>We work on your idea and develop it step by step looking for perfection in each pixel and each line of code. We play with the fine line between aesthetics and usability.</p>
							</div>
						</div>
						<div className="text-center sm:text-left lazy-load-2 max-w-[10rem] 2xl:max-w-[12rem]">
							<Button properties={{
								classes: 'py-2 px-4 text-lg 2xl:text-2xl 2xl:py-3',
								handler: { action: handleShowProjectQuote }
							}}>Contact</Button>
						</div>
					</div>
					<div className="flex flex-col gap-3 w-full">
						<Youtube videoId="lhfU7j50bWk" className="" iframeClassName="w-full rounded-xl" />
						<Link className="flex justify-center items-center gap-2 hover:text-light-main" href={"https://www.youtube.com/watch?v=lhfU7j50bWk"} target="_blank">
							<span>Watch on YouTube</span> 
							<i className="fa-regular fa-arrow-up-right-from-square"></i>
						</Link>
					</div>
				</div>
			</div>
			<div className={`lazy-load-2`} id="index_section_consult">
				<div className="flex flex-col gap-20 justify-center max-w-6xl 2xl:max-w-[90rem] mx-auto px-6 md:px-10 lg:px-20 py-20">
					<div className={`flex flex-col sm:flex-row justify-center sm:items-center gap-2 text-3xl sm:text-4xl md:text-5xl 2xl:text-6xl font-bold uppercase w-fit`}>
						<div className={`${darkMode ? 'text-dark-main' : 'text-light-main'}`}>What we</div>
						<div className={`${darkMode ? 'text-dark-text bg-dark-main' : 'text-white bg-light-main'} w-fit px-3 py-1 rounded-lg`}>can do</div>
					</div>
					<div className="">
						<Swiper 
							slidesPerView={1}
							spaceBetween={30}
							loop={true}
							pagination={{
								clickable: true,
							}}
							navigation={true}
							modules={[Pagination, Navigation]}
							className="mySwiper rounded-lg shadow-md"
						>
							<SwiperSlide className="select-none rounded-lg">
								<Image className="rounded-lg shadow-md" src={"/otherprojects/1.png"} width={1920} height={1080} alt="What we can do image 1" />
							</SwiperSlide>
							<SwiperSlide className="select-none rounded-lg">
								<Image className="rounded-lg shadow-md" src={"/otherprojects/2.png"} width={1920} height={1080} alt="What we can do image 2" />
							</SwiperSlide>
							<SwiperSlide className="select-none rounded-lg">
								<Image className="rounded-lg shadow-md" src={"/otherprojects/3.png"} width={1920} height={1080} alt="What we can do image 3" />
							</SwiperSlide>
							<SwiperSlide className="select-none rounded-lg">
								<Image className="rounded-lg shadow-md" src={"/otherprojects/4.png"} width={1920} height={1080} alt="What we can do image 4" />
							</SwiperSlide>
						</Swiper>
					</div>
				</div>
			</div>
			{/* <div className={`${darkMode ? 'bg-dark-main text-dark-text' : 'bg-light-main text-white'} lazy-load-2`} id="index_section_consult">
				<div className="flex flex-col items-center justify-center gap-12 max-w-6xl 2xl:max-w-[90rem] mx-auto px-6 md:px-10 lg:px-20 min-h-[35rem] 2xl:min-h-[40rem]">
					<div className="flex flex-col items-center gap-8 text-center">
						<h2 className="uppercase text-4xl md:text-5xl 2xl:text-6xl font-extrabold">We advise you</h2>
						<p className="text-xl 2xl:text-2xl max-w-4xl">We listen to our clients to fully understand the needs of each project. We generate our own recommendations to define a solution aligned to the business objectives.</p>
					</div>
					<button onClick={handleShowProjectQuote} className="py-2 2xl:py-3 w-1/3 rounded-xl uppercase font-semibold text-lg 2xl:text-2xl bg-white text-light-main border-2 border-white hover:bg-transparent hover:text-white transition-colors select-none">Consult</button>
				</div>
			</div> */}
			<div className={`${darkMode ? 'text-dark-text' : 'text-black'} flex flex-col justify-center gap-20 max-w-6xl 2xl:max-w-[90rem] mx-auto px-6 md:px-10 lg:px-20 lazy-load-3 py-20`} id="index_section_ourjobs">
				{/* <div className="font-extrabold text-5xl uppercase text-light-main">Algo de lo que hemos hecho</div> */}
				<div className="flex flex-col sm:flex-row sm:items-center gap-4 text-3xl sm:text-4xl md:text-5xl 2x:text-6xl font-extrabold uppercase">
					<div className={`${darkMode ? 'text-dark-main' : 'text-light-main'}`}>Our</div>
					<div className={`${darkMode ? 'bg-dark-main text-dark-text' : 'bg-light-main text-white'} px-2 py-1 sm:px-3 sm:py-2 rounded-lg w-fit`}>
						<span>Jobs</span>
					</div>
				</div>
				<div className="grid grid-cols-1 items-center gap-16">
					<Project 
						name={"Evolution"}
						description={"Buy, trade and hold cryptocurrencies at Evolution. Evolution is the easiest place to buy and sell cryptocurrency."}
						image={"/projects/evolution.png"}
						link={"https://evolution-react.vercel.app"}
						side={"left"}
					/>
					<Project 
						name={"Haikei"}
						description={"Generate unique SVG design assets. Haikei is a web app to generate stunning visual content – ready to use with your design tools and workflow."}
						image={"/projects/haikei.png"}
						link={"https://haikei.app"}
						side={"right"}
					/>
					<Project 
						name={"Railway"}
						description={"Bring your code, we'll handle the rest. Made for any language, for projects big and small. Railway is the cloud that takes the complexity out of shipping software."}
						image={"/projects/railway.png"}
						link={"https://railway.app"}
						side={"left"}
					/>
				</div>
			</div>
			<div className="flex items-center max-w-6xl 2xl:max-w-[90rem] mx-auto px-6 md:px-10 lg:px-20 h-screen min-h-[45rem] lazy-load-4 py-20" id="index_section_technologies">
				<div className="flex flex-col gap-20 overflow-hidden">
					<div className="flex flex-col gap-5">
						<div className="flex flex-col sm:flex-row sm:items-center gap-4 text-3xl sm:text-4xl md:text-5xl 2x:text-6xl font-extrabold uppercase">
							<div className={`${darkMode ? 'text-dark-main' : 'text-light-main'}`}>Main</div>
							<div className={`${darkMode ? 'bg-dark-main text-dark-text' : 'bg-light-main text-white'} px-2 py-1 sm:px-3 sm:py-2 rounded-lg w-fit`}>
								<span>Technologies</span>
							</div>
						</div>
						<div className={`text-lg ${darkMode ? 'text-dark-text' : 'text-light-description'} 2xl:text-xl`}>
							<p>The appropriate technology enriches the project.<br/> Here are some of the ones we use the most:</p>
						</div>
					</div>
					<div className="overflow-x-scroll">
						<div className="grid grid-cols-5 gap-10 select-none min-w-[60rem]">
							<TechnologyImage src={"/technologies/react.png"} alt={"React technology image"} />
							<TechnologyImage src={"/technologies/nextjs.png"} alt={"Next js technology image"} darkmode={"/technologies/darkmode/nextjs.png"} />
							<TechnologyImage src={"/technologies/angular.png"} alt={"Angular technology image"} />
							<TechnologyImage src={"/technologies/vue.png"} alt={"Vue technology image"} />
							<TechnologyImage src={"/technologies/astro.png"} alt={"Astro technology image"} darkmode={"/technologies/darkmode/astro.png"} />
							<TechnologyImage src={"/technologies/tailwind.png"} alt={"Tailwind technology image"} />
							<TechnologyImage src={"/technologies/nodejs.png"} alt={"Node js technology image"} />
							<TechnologyImage src={"/technologies/mongodb.png"} alt={"MongoDB technology image"} />
							<TechnologyImage src={"/technologies/mysql.png"} alt={"MySQL technology image"} />
							<TechnologyImage src={"/technologies/socketio.png"} alt={"Socket.io technology image"} darkmode={"/technologies/darkmode/socketio.png"} />
						</div>
					</div>
				</div>
			</div>
			<div className="flex flex-col gap-16 bg-black py-28 text-center lazy-load-4 border-t border-neutral-900" id="index_section_startmyproject">
				<div className="flex flex-col gap-8">
					<div className="text-neutral-400 text-lg uppercase font-semibold">Do you have an idea?</div>
					<div className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold w-2/3 2xl:w-2/4 mx-auto">We only need an idea or a problem for us to carry out your project</div>
				</div>
				<div className="cursor-pointer border-b-2 border-light-main text-light-main hover:border-white hover:text-white transition-colors w-fit mx-auto pb-1">
					<button className="text-2xl transition-colors font-semibold" onClick={handleShowProjectQuote}>Start your project</button>
				</div>
			</div>
		</Layout>
	)
}

// Technology image of Technologies section.
function TechnologyImage({src, alt, darkmode}) {
	
	const { darkMode } = useContextProvider();

	return darkmode && darkMode ? (
		<div className="opacity-[.7] hover:opacity-100 transition-opacity">
			<Image src={darkmode} width={800} height={500} alt={alt} />
		</div>
	) : (
		<div className="opacity-[.7] hover:opacity-100 transition-opacity">
			<Image src={src} width={800} height={500} alt={alt} />
		</div>
	)
}

function Project({ name, description, image, side, link }) {
	return (
		<div className={`flex flex-col ${side === 'left' ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-5 md:gap-0`}>
			<div className="md:w-1/2">
				<Image className="rounded-xl shadow-md" src={image} width={3840} height={2160} alt="Railway app Image" />
			</div>
			<div className="md:w-1/2">
				<div className="flex flex-col gap-2 w-fit mx-auto max-w-[80%] text-center">
					<div className="text-2xl md:text-xl uppercase font-bold text-light-main">{name}</div>
					<div className="">{description}</div>
					<div className="pt-4">
						<Link className="flex items-center justify-center gap-2 font-semibold hover:text-light-main transition-colors" href={link} target="_blank">
							Visitar
							<i className="fa-solid fa-arrow-up-right-from-square"></i>
						</Link>
					</div>
				</div>
			</div>
		</div>
	)
}