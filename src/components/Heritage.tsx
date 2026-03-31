import React from 'react';
import heritageImg from '../assets/hero_mindoro.png';

const Heritage: React.FC = () => {
    return (
        <section id="heritage" className="py-32 md:py-56 bg-white relative overflow-hidden z-10">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 items-center">
                    
                    {/* Content Column */}
                    <div className="fade-in order-2 lg:order-1">
                        <span className="text-secondary font-semibold tracking-[0.4em] uppercase text-[10px] mb-6 block opacity-80">
                            Our Legacy
                        </span>
                        <h2 className="text-4xl md:text-6xl font-lora font-bold text-primary mb-10 tracking-tight leading-[1.1]">
                            Established in <span className="italic font-normal text-secondary">2012</span>
                        </h2>
                        <div className="space-y-8 mb-12">
                            <p className="text-lg text-primary/60 leading-relaxed font-light">
                                Founded by Filipino businessman Luis Rivera, Azure Mindoro was born from a vision to preserve the local highland aesthetic while introducing world-class luxury to the mountains.
                            </p>
                            <p className="text-lg text-primary/60 leading-relaxed font-light">
                                Built over two years, each beam was hand-picked from sustainable forest mahogany groves, ensuring that our presence honors the land we occupy.
                            </p>
                        </div>
                        
                        <div className="flex flex-wrap gap-12 md:gap-20 mb-16 border-b border-primary/5 pb-12">
                            <div className="stat flex flex-col gap-2">
                                <strong className="text-5xl font-lora font-bold text-primary leading-none">100%</strong>
                                <span className="text-[10px] text-primary/30 uppercase tracking-[0.3em] font-bold">Sustainable</span>
                            </div>
                            <div className="stat flex flex-col gap-2">
                                <strong className="text-5xl font-lora font-bold text-primary leading-none">450+</strong>
                                <span className="text-[10px] text-primary/30 uppercase tracking-[0.3em] font-bold">Artisans</span>
                            </div>
                        </div>

                        <div className="glass p-8 rounded-2xl border-l-[6px] border-secondary shadow-premium relative bg-mist/50">
                            <strong className="text-secondary uppercase text-[10px] tracking-[0.3em] font-bold block mb-3">Architectural Note</strong>
                            <p className="text-base text-primary/80 leading-relaxed font-medium">
                                The resort's main lobby roof reaches 12 meters, hand-woven using traditional Mindoro mountain techniques—a labor of love that took over 6 months to complete.
                            </p>
                        </div>
                    </div>
                    
                    {/* Image Column */}
                    <div className="relative fade-in order-1 lg:order-2">
                        <div className="relative z-10 rounded-2xl overflow-hidden shadow-premium h-[400px] md:h-[600px]">
                            <img 
                                src={heritageImg} 
                                alt="Mindoro Heritage Lodge" 
                                className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105" 
                            />
                        </div>
                        {/* Decorative background elements */}
                        <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-secondary/5 rounded-full -z-10 blur-3xl"></div>
                        <div className="absolute -top-10 -left-10 w-40 h-40 border border-primary/10 rounded-full -z-10"></div>
                    </div>
                </div>
            </div>
            {/* Section Connector */}
            <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-mist to-transparent"></div>
        </section>
    );
};

export default Heritage;
