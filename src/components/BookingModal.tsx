import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    cottage: { name: string; price: number };
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, cottage }) => {
    const [isConfirming, setIsConfirming] = useState(false);
    const [guests, setGuests] = useState({ adults: 0, elderly: 0, children: 0 });
    const [charcoal, setCharcoal] = useState(0);
    const [addons, setAddons] = useState<string[]>([]);
    const [totalPrice, setTotalPrice] = useState(cottage.price);

    const updateGuest = (type: keyof typeof guests, step: number) => {
        setGuests(prev => ({ ...prev, [type]: Math.max(0, prev[type] + step) }));
    };

    const toggleAddon = (addon: string) => {
        setAddons(prev => prev.includes(addon) ? prev.filter(a => a !== addon) : [...prev, addon]);
    };

    useEffect(() => {
        let total = cottage.price;
        total += (guests.adults * 120);
        total += (guests.elderly * 96);
        total += (guests.children * 96);
        total += (charcoal * 50);
        
        if (addons.includes('karaoke')) total += 150;
        if (addons.includes('party')) total += 200;
        
        setTotalPrice(total);
    }, [guests, charcoal, addons, cottage.price]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsConfirming(true);

        const formData = new FormData(e.currentTarget);
        const templateParams = {
            user_name: formData.get('user_name'),
            user_email: formData.get('user_email'),
            user_phone: formData.get('user_phone'),
            cottage_name: cottage.name,
            base_price: `₱${cottage.price}`,
            total_price: `₱${totalPrice.toLocaleString()}`,
            check_in: formData.get('datetime'),
            guests_adults: guests.adults,
            guests_elderly: guests.elderly,
            guests_children: guests.children,
            charcoal_packs: charcoal,
            addons: addons.length > 0 ? addons.join(', ') : 'None',
            to_email: 'ajohndarcy@gmail.com'
        };

        try {
            await emailjs.send(SERVICE_ID!, TEMPLATE_ID!, templateParams as any);
            alert('Reservation Successful! Check your email for confirmation.');
            onClose();
        } catch (error) {
            alert('Something went wrong. Please try again.');
        } finally {
            setIsConfirming(false);
        }
    };

    if (!isOpen) return null;

    const isFullBuyout = cottage.name.includes('Full Resort Buyout') || cottage.name.includes('Sanctuary Buyout');

    return (
        <div className="fixed inset-0 glass-dark z-[100000] flex items-center justify-center p-4 md:p-8 overflow-y-auto">
            <div className="bg-white p-8 md:p-14 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative shadow-premium border border-primary/5">
                {/* Close Button */}
                <button 
                    onClick={onClose} 
                    className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-primary/5 text-primary hover:bg-primary hover:text-white transition-all duration-500"
                >
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                </button>
                
                <div className="mb-12">
                    <span className="text-secondary font-semibold tracking-[0.3em] uppercase text-[10px] mb-3 block">
                        Reservation Request
                    </span>
                    <h2 className="text-3xl md:text-4xl font-lora font-bold text-primary tracking-tight">Reserve Your {cottage.name}</h2>
                    <p className="text-primary/50 text-sm mt-3 font-light">Provide your details and any additional party needs for your mountain stay.</p>
                </div>
                
                <form onSubmit={handleSubmit} className="flex flex-col gap-10">
                    {/* Basic Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                        {[
                            { label: 'Full Name', name: 'user_name', type: 'text', placeholder: 'John Doe' },
                            { label: 'Email Address', name: 'user_email', type: 'email', placeholder: 'john@example.com' },
                            { label: 'Contact Number', name: 'user_phone', type: 'tel', placeholder: '+63 9XX XXX XXXX' },
                            { label: 'Check-in Date & Time', name: 'datetime', type: 'datetime-local', placeholder: '' },
                        ].map((field) => (
                            <div key={field.name} className="flex flex-col gap-2">
                                <label className="text-[10px] font-bold text-primary/40 uppercase tracking-[0.2em] ml-1">{field.label}</label>
                                <input 
                                    type={field.type} 
                                    name={field.name} 
                                    placeholder={field.placeholder} 
                                    required 
                                    className="p-4 bg-primary/[0.02] border border-primary/10 rounded-xl text-sm outline-none focus:border-secondary focus:bg-white transition-all duration-500 text-primary" 
                                />
                            </div>
                        ))}
                    </div>

                    {!isFullBuyout && (
                        <>
                            {/* Guest Selection */}
                            <div className="pt-10 border-t border-primary/5">
                                <label className="text-xs font-bold text-primary uppercase tracking-[0.2em] mb-8 block">Guest Selection (Packs)</label>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {(['adults', 'elderly', 'children'] as const).map(type => (
                                        <div key={type} className="flex flex-col gap-4 p-5 rounded-2xl bg-primary/[0.02] border border-primary/5">
                                            <div className="flex flex-col">
                                                <strong className="capitalize text-primary text-sm font-bold tracking-wide">{type}</strong>
                                                <span className="text-[10px] text-primary/40 font-semibold uppercase tracking-wider">₱{type === 'adults' ? 120 : 96} per pack</span>
                                            </div>
                                            <div className="flex items-center bg-white rounded-xl overflow-hidden shadow-sm ring-1 ring-primary/5">
                                                <button type="button" onClick={() => updateGuest(type, -1)} className="px-5 py-3 hover:bg-primary/5 text-primary transition-all duration-500 font-bold">-</button>
                                                <input type="number" value={guests[type]} readOnly className="w-full text-center bg-transparent border-none text-sm outline-none font-bold text-primary" />
                                                <button type="button" onClick={() => updateGuest(type, 1)} className="px-5 py-3 hover:bg-primary/5 text-primary transition-all duration-500 font-bold">+</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Add-ons Section */}
                            <div className="pt-10 border-t border-primary/5">
                                <label className="text-xs font-bold text-primary uppercase tracking-[0.2em] mb-8 block">Enhance Your Stay (Add-ons)</label>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <label className={`flex items-center gap-4 p-5 rounded-2xl cursor-pointer transition-all duration-500 border-2 ${addons.includes('karaoke') ? 'border-secondary bg-secondary/5' : 'border-primary/5 bg-primary/[0.02]'}`}>
                                        <input type="checkbox" checked={addons.includes('karaoke')} onChange={() => toggleAddon('karaoke')} className="w-4 h-4 accent-secondary" />
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold text-primary">Karaoke System</span>
                                            <span className="text-[10px] text-secondary font-bold uppercase tracking-wider">+ ₱150</span>
                                        </div>
                                    </label>
                                    <label className={`flex items-center gap-4 p-5 rounded-2xl cursor-pointer transition-all duration-500 border-2 ${addons.includes('party') ? 'border-secondary bg-secondary/5' : 'border-primary/5 bg-primary/[0.02]'}`}>
                                        <input type="checkbox" checked={addons.includes('party')} onChange={() => toggleAddon('party')} className="w-4 h-4 accent-secondary" />
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold text-primary">Party Needs</span>
                                            <span className="text-[10px] text-secondary font-bold uppercase tracking-wider">+ ₱200</span>
                                        </div>
                                    </label>
                                </div>
                                <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between p-6 rounded-2xl bg-primary/[0.05] gap-4">
                                    <div className="flex flex-col">
                                        <strong className="text-primary text-sm font-bold tracking-wide">Charcoal Packs (Grilling)</strong>
                                        <span className="text-[10px] text-primary/40 font-semibold uppercase tracking-wider">₱50 per pack</span>
                                    </div>
                                    <div className="flex items-center bg-white rounded-xl overflow-hidden shadow-sm ring-1 ring-primary/10 w-full sm:w-[140px]">
                                        <button type="button" onClick={() => setCharcoal(Math.max(0, charcoal - 1))} className="px-5 py-3 hover:bg-primary/5 transition-all duration-500 text-primary font-bold">-</button>
                                        <input type="number" value={charcoal} readOnly className="w-full text-center bg-transparent border-none text-sm outline-none font-bold text-primary" />
                                        <button type="button" onClick={() => setCharcoal(charcoal + 1)} className="px-5 py-3 hover:bg-primary/5 transition-all duration-500 text-primary font-bold">+</button>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    {/* Price Summary */}
                    <div className="bg-primary/[0.02] p-8 md:p-10 rounded-2xl flex flex-col gap-4 border border-primary/5">
                        <div className="flex justify-between items-center text-primary/50 text-sm font-medium tracking-wide">
                            <span className="uppercase tracking-widest text-[10px]">Base Villa Rate:</span>
                            <span className="font-bold text-primary">₱{cottage.price.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center text-primary text-xl font-bold pt-6 border-t border-primary/10">
                            <span className="font-lora">Total Amount:</span>
                            <span className="text-secondary text-2xl font-bold">₱{totalPrice.toLocaleString()}</span>
                        </div>
                    </div>
                    
                    <button 
                        type="submit" 
                        disabled={isConfirming}
                        className="btn btn-gold w-full text-sm group"
                    >
                        {isConfirming ? (
                            <span className="flex items-center justify-center gap-3">
                                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Confirming...
                            </span>
                        ) : 'Confirm Reservation'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default BookingModal;
