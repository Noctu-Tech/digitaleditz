import Link from 'next/link';
import styles from './Footer.module.css';

const Footer = () => {
    return (
        <footer className="w-full py-4 border-t">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap justify-center items-center gap-4 text-sm">
                    <span>© 2025 Digital Editz Pvt Ltd.</span>
                    <span className="hidden sm:inline">|</span>
                    <Link 
                        href="/contact"
                        className="transition-colors"
                    >
                        Contact Us
                    </Link>
                    <span className="hidden sm:inline">|</span>
                    <Link 
                        href="/terms"
                        className="transition-colors"
                    >
                        Terms & Conditions
                    </Link>
                    <span className="hidden sm:inline">|</span>
                    <Link 
                        href="/privacy"
                        className="transition-colors"
                    >
                        Privacy Policy
                    </Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;