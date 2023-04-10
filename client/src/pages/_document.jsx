import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
	return (
		<Html lang="en">
			<Head>
				<link rel="stylesheet" href="https://site-assets.fontawesome.com/releases/v6.4.0/css/all.css" />
			</Head>
			<body className='overflow-x-hidden'>
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}