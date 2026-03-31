import React from 'react';
import heroImg from '../assets/hero_mindoro.png';

interface HeroProps {
    onExplore: () => void;
}

const Hero: React.FC<HeroProps> = ({ onExplore }) => {
    return (
        <section 
            id="hero"
            className="h-screen relative flex items-center justify-center text-white text-center bg-cover bg-center bg-fixed z-10"
            style={{ backgroundImage: `url(${heroImg})` }}
        >
            {/* Rich Atmosphere Overlay */}
            <div className="absolute top-0 left-0 w-full h-full bg-linear-to-b from-primary/20 via-primary/40 to-primary/80 z-[1]"></div>
            
            <div className="relative z-[10] max-w-5xl px-8 fade-in flex flex-col items-center">
                <span className="text-secondary font-semibold tracking-[0.4em] uppercase text-xs mb-6 opacity-90">
                    Highland Sanctuary
                </span>
                
                <h1 className="text-6xl md:text-8xl font-lora font-bold mb-8 tracking-tight leading-[1.05] drop-shadow-2xl text-balance">
                    Untamed <br /> 
                    <span className="italic font-normal">Mindoro Serenity</span>
                </h1>
                
                <p className="text-lg md:text-xl mb-12 mx-auto max-w-2xl opacity-80 font-light tracking-wide leading-relaxed text-balance">
                    Discover a sanctuary where modern forest architecture meets the mist of mountain peaks. A retreat born from raw beauty and quiet luxury.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-6 justify-center w-full sm:w-auto">
                    <button 
                        onClick={onExplore}
                        className="btn btn-gold"
                    >
                        Reserve Your Escape
                    </button>
                    <a 
                        href="#about"
                        className="btn btn-outline backdrop-blur-md"
                    >
                        Learn Our Story
                    </a>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-[10] flex flex-col items-center gap-3 animate-pulse">
                <span className="text-[10px] uppercase tracking-[0.3em] font-semibold opacity-60">Discover</span>
                <div className="w-[1px] h-12 bg-linear-to-b from-white/60 to-transparent"></div>
            </div>
        </section>
    );
};

export default Hero;
