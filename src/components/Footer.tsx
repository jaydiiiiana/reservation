import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-primary text-white py-24 relative overflow-hidden z-20">
            {/* Subtle background glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-secondary/5 blur-[120px] rounded-full pointer-events-none"></div>
            
            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-30">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-16 md:gap-12 mb-20">
                    <div className="md:col-span-2">
                        <a href="#" className="text-3xl font-lora font-bold text-white tracking-tighter mb-8 block">
                            Azure<span className="text-secondary">.</span>
                        </a>
                        <p className="text-white/50 text-sm max-w-sm leading-relaxed font-light italic">
                            Eco-luxury forest architecture and authentic Filipino hospitality in the heart of the Occidental Mindoro highlands. A sanctuary born from raw beauty.
                        </p>
                    </div>
                    
                    <div>
                        <h4 className="text-xs font-bold text-secondary uppercase tracking-[0.3em] mb-8">Explore</h4>
                        <ul className="flex flex-col gap-4">
                            {['Home', 'Our Journey', 'Our Legacy', 'Villas', 'Concierge'].map(item => (
                                <li key={item}>
                                    <a href={`#${item.toLowerCase().replace(' ', '')}`} className="text-white/60 text-sm hover:text-white transition-colors duration-300">
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    
                    <div>
                        <h4 className="text-xs font-bold text-secondary uppercase tracking-[0.3em] mb-8">Legal</h4>
                        <ul className="flex flex-col gap-4 text-white/60 text-sm">
                            <li className="hover:text-white cursor-pointer transition-colors">Privacy Policy</li>
                            <li className="hover:text-white cursor-pointer transition-colors">Terms of Service</li>
                        </ul>
                    </div>
                </div>
                
                <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-white/30 text-[10px] font-bold uppercase tracking-[0.3em]">
                        © 2024 Azure Mindoro Nature Resort. San Jose Highlands, Occidental Mindoro.
                    </p>
                    <div className="flex gap-8">
                        {socials.map(social => (
                            <span key={social} className="text-white/30 text-[10px] font-bold uppercase tracking-[0.3em] hover:text-secondary cursor-pointer transition-colors">
                                {social}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

const socials = ['Instagram', 'Facebook', 'LinkedIn'];

export default Footer;
