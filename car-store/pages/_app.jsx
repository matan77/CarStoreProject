import '../styles/globals.css';
import Layout from '../components/layout';
import { DarkModeProvider } from '../utils/darkModeContext';
import { useRouter } from 'next/router';
import ThemeToggle from '../components/themeToggle';


export default function App({ Component, pageProps }) {
    const router = useRouter();


    if (router.pathname === '/404' || router.pathname === '/500') {
        return (
            <DarkModeProvider>
                <div className='fixed top-4 right-2 mr-4'>
                    <ThemeToggle />
                </div>
                <Component {...pageProps} />5500
            </DarkModeProvider >
        );
    }
    else {
        return (
            <DarkModeProvider>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </DarkModeProvider>);
    }
}

