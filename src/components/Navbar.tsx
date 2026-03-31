import React, { useState, useEffect } from 'react';

interface NavbarProps {
    onBookNow: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onBookNow }) => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'HOME', href: '#' },
        { name: 'OUR JOURNEY', href: '#about' },
        { name: 'OUR LEGACY', href: '#heritage' },
        { name: 'VILLAS', href: '#cottages' },
        { name: 'CONCIERGE', href: '#contact' },
    ];

    return (
        <nav className={`fixed left-0 right-0 z-[10000] px-6 md:px-12 transition-all duration-700 ${isScrolled ? 'top-6' : 'top-10'}`}>
            <div className={`max-w-7xl mx-auto rounded-2xl transition-all duration-700 shadow-premium flex items-center justify-between px-8 md:px-10 py-4 ${isScrolled ? 'bg-white/90 backdrop-blur-xl border border-primary/5' : 'bg-white/10 backdrop-blur-md border border-white/10'}`}>
                
                {/* Logo Section */}
                <div className="flex items-center">
                    <a href="#" className={`text-2xl md:text-3xl font-lora font-bold tracking-tighter transition-all duration-500 ${isScrolled ? 'text-primary' : 'text-white'}`}>
                        Azure<span className="text-secondary">.</span>
                    </a>
                </div>

                {/* Navigation Links - Desktop */}
                <div className="hidden lg:flex items-center gap-10">
                    {navLinks.map((link) => (
                        <a 
                            key={link.name} 
                            href={link.href} 
                            className={`text-[10px] font-bold tracking-[0.3em] transition-all duration-500 hover:text-secondary ${isScrolled ? 'text-primary/60' : 'text-white/70'}`}
                        >
                            {link.name}
                        </a>
                    ))}
                </div>

                {/* Call to Action */}
                <div className="flex items-center">
                    <button 
                        onClick={onBookNow} 
                        className={`btn ${isScrolled ? 'btn-primary' : 'btn-outline'} !py-3 !px-8 text-[9px] rounded-xl`}
                    >
                        RESERVE NOW
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
