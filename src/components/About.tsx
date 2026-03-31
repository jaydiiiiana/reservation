import React from 'react';
import aboutImg from '../assets/about_mindoro.png';
import accentImg from '../assets/about.png';

const About: React.FC = () => {
    return (
        <section id="about" className="py-32 md:py-64 bg-mist relative overflow-hidden z-20 noise-bg">
            {/* Ultra-Premium Editorial Watermark */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[22vw] font-lora font-bold text-primary/[0.015] pointer-events-none select-none tracking-tighter whitespace-nowrap z-0">
                A Z U R E
            </div>
            
            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-0 items-center">
                    
                    {/* Layer 1: The Masterwork Image */}
                    <div className="lg:col-span-8 relative z-10">
                        <div className="relative group perspective-1000">
                            <div className="relative rounded-3xl overflow-hidden shadow-2xl transition-all duration-1000 group-hover:rotate-y-2 lg:h-[750px] w-full lg:w-[105%] -translate-x-0 lg:-translate-x-16 border-[1px] border-white/20">
                                <img 
                                    src={aboutImg} 
                                    alt="Mindoro Sanctuary" 
                                    className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110" 
                                />
                                <div className="absolute inset-0 bg-gradient-to-tr from-primary/60 via-transparent to-transparent mix-blend-multiply"></div>
                            </div>
                            
                            {/* Metadata Detail: Coordinates */}
                            <div className="absolute bottom-10 left-0 lg:-left-6 glass-dark px-6 py-3 rounded-full flex gap-6 items-center border border-white/10 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-700">
                                <span className="text-[9px] font-bold text-secondary uppercase tracking-[0.4em]">12.3522° N, 121.0667° E</span>
                                <div className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></div>
                            </div>
                        </div>
                    </div>

                    {/* Layer 2: The Multi-Layered Glass Material Card */}
                    <div className="lg:col-span-6 lg:col-start-7 lg:-ml-40 relative z-30">
                        <div className="relative group">
                            {/* Material Glow */}
                            <div className="absolute -inset-1 bg-gradient-to-tr from-secondary/20 to-transparent blur-3xl opacity-50"></div>
                            
                            <div className="relative glass p-10 md:p-20 rounded-[40px] shadow-premium-gold backdrop-blur-3xl border border-white/50 bg-white/40 ring-1 ring-white/20">
                                <span className="text-secondary font-bold tracking-[0.6em] uppercase text-[9px] mb-8 block opacity-80">
                                    Established 2012 — Heritage
                                </span>
                                
                                <h2 className="text-4xl md:text-6xl font-lora font-bold text-primary leading-[1.05] mb-10 tracking-tight">
                                    A Sanctuary <br />
                                    <span className="italic font-normal text-secondary opacity-90 italic-serif">Born from Raw Nature.</span>
                                </h2>
                                
                                <p className="text-xl text-primary/70 leading-relaxed font-lora italic mb-10 border-l-2 border-secondary/30 pl-8">
                                    Azure Mindoro is an editorial expression of Philippine interior architecture, where sustainable luxury meets the ancient highlands.
                                </p>
                                
                                <p className="text-base text-primary/80 leading-relaxed mb-12 font-light">
                                    Nestled in the clouds of San Jose, our resort offers a rare perspective of the archipelago. We provide a bridge between modern comfort and the untamed forest, delivering world-class hospitality in a strictly private setting.
                                </p>

                                {/* Fine-Branding Features */}
                                <div className="flex flex-col gap-10">
                                    <div className="grid grid-cols-2 gap-12">
                                        {[
                                            { label: 'Architecture', val: 'Ancestral Bamboo' },
                                            { label: 'Immersion', val: 'Forest Integrated' }
                                        ].map((item, i) => (
                                            <div key={i} className="flex flex-col gap-3">
                                                <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-secondary">{item.label}</span>
                                                <span className="text-sm font-semibold text-primary/60">{item.val}</span>
                                            </div>
                                        ))}
                                    </div>
                                    
                                    <div className="flex items-center gap-8 pt-10 border-t border-primary/5">
                                        <button className="btn btn-primary !rounded-full !px-12 hover:shadow-2xl transition-all">
                                            The Collection
                                        </button>
                                        <span className="text-[10px] font-bold tracking-[0.3em] text-primary/40 uppercase cursor-pointer hover:text-secondary transition-colors">Our History</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Layer 3: The 'Seal of Quality' Accent */}
                    <div className="hidden lg:block lg:col-span-4 lg:absolute lg:-bottom-24 lg:-right-8 z-40">
                        <div className="relative group">
                            <div className="rounded-3xl overflow-hidden shadow-2xl w-full h-[380px] aspect-[4/5] border-[16px] border-white ring-1 ring-primary/5 transition-transform duration-700 group-hover:scale-[1.02]">
                                <img 
                                    src={accentImg} 
                                    alt="Resort Detail" 
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                                />
                                <div className="absolute inset-0 bg-primary/10 mix-blend-overlay"></div>
                            </div>
                            
                            {/* Circular Seal Badge */}
                            <div className="absolute -top-12 -left-12 w-44 h-44 glass rounded-full shadow-premium flex flex-col items-center justify-center border border-white/60 bg-white/40 backdrop-blur-3xl group-hover:rotate-12 transition-transform duration-700">
                                <div className="border border-secondary/20 rounded-full p-6 text-center">
                                    <span className="text-4xl font-lora font-bold text-secondary block mb-1">15</span>
                                    <span className="text-[8px] font-bold text-primary/40 uppercase tracking-[0.3em] block leading-none">Years</span>
                                    <span className="text-[7px] font-bold text-secondary uppercase tracking-[0.2em] block mt-1 italic font-lora">Legacy</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
