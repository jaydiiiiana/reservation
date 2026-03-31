import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

const Contact: React.FC = () => {
    const [isSending, setIsSending] = useState(false);
    const [formData, setFormData] = useState({ user_name: '', user_email: '', message: '' });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSending(true);

        const templateParams = {
            ...formData,
            subject: 'New Inquiry: Azure Mindoro Resort'
        };

        try {
            await emailjs.send(SERVICE_ID!, TEMPLATE_ID!, templateParams as any);
            alert('Your message has been sent successfully! Our concierge will contact you soon.');
            setFormData({ user_name: '', user_email: '', message: '' });
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to send message. Please try again later.');
        } finally {
            setIsSending(false);
        }
    };

    return (
        <section id="contact" className="py-32 md:py-48 bg-mist relative overflow-hidden z-20">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
                    {/* Left: Contact Info */}
                    <div className="flex flex-col gap-12 fade-in lg:pt-10">
                        <div className="flex flex-col gap-4">
                            <span className="text-secondary font-semibold tracking-[0.4em] uppercase text-[10px] opacity-80 block">
                                Location
                            </span>
                            <h2 className="text-3xl md:text-5xl font-lora font-bold text-primary leading-[1.1] mb-2">
                                Highlands of <br />
                                <span className="italic font-normal">San Jose, Mindoro</span>
                            </h2>
                        </div>
                        
                        <div className="flex flex-col gap-4">
                            <span className="text-secondary font-semibold tracking-[0.4em] uppercase text-[10px] opacity-80 block">
                                Concierge Desk
                            </span>
                            <p className="text-2xl md:text-4xl font-lora font-bold text-primary leading-tight">
                                +63 917 123 4567
                            </p>
                        </div>

                        <div className="w-24 h-[1px] bg-primary/10 mt-4"></div>
                    </div>
                    
                    {/* Right: Booking Form Container */}
                    <div className="bg-white p-10 md:p-14 rounded-2xl shadow-premium relative z-30 fade-in border border-primary/5">
                        <div className="mb-10">
                            <h3 className="text-3xl font-lora font-bold text-primary mb-3">Send an Inquiry</h3>
                            <p className="text-primary/50 text-[10px] font-bold uppercase tracking-[0.3em]">
                                Connect with our mountain hosts
                            </p>
                        </div>
                        
                        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                            <div className="flex flex-col gap-3">
                                <label className="text-[10px] font-bold text-primary/40 uppercase tracking-widest ml-1">Full Name</label>
                                <input 
                                    type="text" 
                                    name="user_name" 
                                    placeholder="John Doe" 
                                    required 
                                    value={formData.user_name}
                                    onChange={(e) => setFormData({...formData, user_name: e.target.value})}
                                    className="w-full p-4 bg-mist border border-primary/5 rounded-xl text-sm outline-none transition-all duration-500 focus:border-secondary focus:bg-white text-primary" 
                                />
                            </div>
                            <div className="flex flex-col gap-3">
                                <label className="text-[10px] font-bold text-primary/40 uppercase tracking-widest ml-1">Email Address</label>
                                <input 
                                    type="email" 
                                    name="user_email" 
                                    placeholder="john@example.com" 
                                    required 
                                    value={formData.user_email}
                                    onChange={(e) => setFormData({...formData, user_email: e.target.value})}
                                    className="w-full p-4 bg-mist border border-primary/5 rounded-xl text-sm outline-none transition-all duration-500 focus:border-secondary focus:bg-white text-primary" 
                                />
                            </div>
                            <div className="flex flex-col gap-3">
                                <label className="text-[10px] font-bold text-primary/40 uppercase tracking-widest ml-1">Message</label>
                                <textarea 
                                    name="message" 
                                    placeholder="Tell us about your trip..." 
                                    rows={4} 
                                    required 
                                    value={formData.message}
                                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                                    className="w-full p-4 bg-mist border border-primary/5 rounded-xl text-sm outline-none transition-all duration-500 focus:border-secondary focus:bg-white text-primary resize-none"
                                ></textarea>
                            </div>
                            <button 
                                type="submit" 
                                disabled={isSending}
                                className="btn btn-gold w-full text-xs mt-4 disabled:opacity-50"
                            >
                                {isSending ? 'Sending Inquiry...' : 'Send Message'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
