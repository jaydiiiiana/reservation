import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Heritage from './components/Heritage';
import Villas from './components/Villas';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
import { MaintenanceGuard } from './components/MaintenanceGuard';

const App: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCottage, setSelectedCottage] = useState<{ name: string; price: number } | null>(null);

    const openBooking = (name: string, price: number) => {
        setSelectedCottage({ name, price });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedCottage(null);
    };

    return (
        <MaintenanceGuard systemId="ext-6">
            <div className="min-h-screen bg-white">

                <Navbar onBookNow={() => document.getElementById('cottages')?.scrollIntoView({ behavior: 'smooth' })} />
                <Hero onExplore={() => document.getElementById('cottages')?.scrollIntoView({ behavior: 'smooth' })} />
                <About />
                <Heritage />
                <Villas onSelect={openBooking} />
                <Contact />
                <Footer />
                
                {isModalOpen && selectedCottage && (
                    <BookingModal 
                        isOpen={isModalOpen} 
                        onClose={closeModal} 
                        cottage={selectedCottage} 
                    />
                )}
            </div>
        </MaintenanceGuard>
    );
};

export default App;

