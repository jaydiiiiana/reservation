import React from 'react';
import cottage101Img from '../assets/cottage101_mindoro.png';
import suite202Img from '../assets/suite202_mindoro.png';
import villa303Img from '../assets/villa303_mindoro.png';
import fullResortImg from '../assets/full_resort.png';

interface VillaProps {
    onSelect: (name: string, price: number) => void;
}

const VillaCard: React.FC<{ 
    name: string; 
    price: number; 
    img: string; 
    desc: string; 
    amenities: string[]; 
    highlight?: boolean;
    onSelect: () => void;
}> = ({ name, price, img, desc, amenities, highlight, onSelect }) => (
    <div className={`relative bg-white rounded-2xl overflow-hidden shadow-premium transition-all duration-700 border border-primary/5 hover:-translate-y-4 group ${highlight ? 'ring-1 ring-secondary/30' : ''} z-10`}>
        <div className="relative overflow-hidden h-[400px]">
            <img 
                src={img} 
                alt={name} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
            />
            {/* Price Tag Overlay */}
            <div className="absolute top-6 right-6 glass-dark px-6 py-3 rounded-full shadow-lg z-20">
                <span className="text-white font-bold text-lg">₱{price.toLocaleString()}</span>
                <span className="text-white/60 text-xs ml-1 font-medium">/ night</span>
            </div>
            
            {highlight && (
                <div className="absolute top-6 left-6 bg-secondary text-white px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg z-20">
                    Full Venue
                </div>
            )}
        </div>
        
        <div className="p-10 md:p-12 relative z-10 bg-white">
            <h3 className="text-3xl font-lora font-bold text-primary mb-4 tracking-tight">{name}</h3>
            <p className="text-primary/60 text-base mb-8 leading-relaxed font-light" dangerouslySetInnerHTML={{ __html: desc }} />
            
            <div className="flex flex-wrap gap-6 mb-10 pb-8 border-b border-primary/5 relative z-0">
                {amenities.map(amenity => (
                    <div key={amenity} className="flex items-center gap-2 text-xs font-semibold text-primary/40 uppercase tracking-widest">
                        <div className="w-1.5 h-1.5 rounded-full bg-secondary"></div>
                        {amenity}
                    </div>
                ))}
            </div>
            
            <button 
                onClick={onSelect}
                className={`w-full btn ${highlight ? 'btn-gold' : 'btn-primary'}`}
            >
                {highlight ? 'Enquire for Event' : 'Select Package'}
            </button>
        </div>
    </div>
);

const Villas: React.FC<VillaProps> = ({ onSelect }) => {
    const villaData = [
        {
            name: 'Forest Suite',
            price: 250,
            img: suite202Img,
            desc: 'Spacious getaway recommended for <strong>5 persons</strong>. Immersed in vibrant Mindoro jungle greenery with private canopy access.',
            amenities: ['Forest View', 'High-Speed Wifi', 'King Bed']
        },
        {
            name: 'Valley Cottage',
            price: 450,
            img: cottage101Img,
            desc: 'Masterpiece for groups of <strong>10 persons</strong>, featuring traditional bamboo rafters and sweeping mountain valley views.',
            amenities: ['Valley View', 'Kitchenette', 'Private Deck']
        },
        {
            name: 'Ridge Villa',
            price: 750,
            img: villa303Img,
            desc: 'Majestic stilt villa for <strong>15 persons</strong>, perched on a mountain ridge with 360-degree peak and mist views.',
            amenities: ['Peak View', 'Infinity Lounge', 'Full Kitchen']
        },
        {
            name: 'Sanctuary Buyout',
            price: 5000,
            img: fullResortImg,
            desc: 'Reserve the entire mountain sanctuary for Weddings, Birthdays, or Corporate retreats. Private use of all villas and staff.',
            amenities: ['Full Event Space', 'Private Concierge', 'All Villas'],
            highlight: true
        }
    ];

    return (
        <section id="cottages" className="py-32 md:py-48 bg-white relative overflow-hidden z-20">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="text-center mb-24 md:mb-32 fade-in">
                    <span className="text-secondary font-semibold tracking-[0.4em] uppercase text-xs mb-6 block">
                        Our Accommodations
                    </span>
                    <h2 className="text-4xl md:text-6xl font-lora font-bold text-primary mb-8 tracking-tight">
                        Highland Luxury Living
                    </h2>
                    <p className="text-lg text-primary/60 max-w-2xl mx-auto font-light leading-relaxed italic">
                        Our forest-integrated villas are designed to provide a harmonious blend of indoor comfort and the raw beauty of untamed nature.
                    </p>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                    {villaData.map((villa) => (
                        <VillaCard 
                            key={villa.name} 
                            {...villa} 
                            onSelect={() => onSelect(villa.name, villa.price)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Villas;
