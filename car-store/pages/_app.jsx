import '../styles/globals.css';
import Layout from '../components/layout';
import { DarkModeProvider } from '../utils/darkModeContext';
import { UserContext, UserProvider } from '../utils/userContext';
import { useRouter } from 'next/router';
import ThemeToggle from '../components/themeToggle';
import Footer from '../components/footer';



export default function App({ Component, pageProps }) {
    const router = useRouter();

    if (router.pathname === '/404' || router.pathname === '/500') {
        return (
            <DarkModeProvider>
                <div className='flex px-8 py-4 justify-end'>
                    <ThemeToggle />
                </div>
                <Component {...pageProps} />
                <Footer />
            </DarkModeProvider >
        );
    }
    else {
        return (

            <DarkModeProvider>
                <UserProvider>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </UserProvider>
            </DarkModeProvider>
        );
    }
}

