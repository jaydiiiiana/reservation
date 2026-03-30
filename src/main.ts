import './style.css'
import emailjs from '@emailjs/browser'
import heroImg from './assets/hero_mindoro.png'
import cottage101Img from './assets/cottage101_mindoro.png'
import suite202Img from './assets/suite202_mindoro.png'
import villa303Img from './assets/villa303_mindoro.png'
import aboutImg from './assets/about_mindoro.png'
import heritageImg from './assets/hero_mindoro.png'
import fullResortImg from './assets/full_resort.png'

// Initialize EmailJS
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

if (PUBLIC_KEY) {
    emailjs.init(PUBLIC_KEY);
}

// Initialize UI
document.addEventListener('DOMContentLoaded', () => {
    // Set images
    const heroEl = document.getElementById('hero');
    if (heroEl) {
        heroEl.style.backgroundImage = `url(${heroImg})`;
    }

    const imgCottage1 = document.getElementById('img-cottage-1') as HTMLImageElement;
    if (imgCottage1) imgCottage1.src = cottage101Img;

    const imgCottage2 = document.getElementById('img-cottage-2') as HTMLImageElement;
    if (imgCottage2) imgCottage2.src = suite202Img;

    const imgCottage3 = document.getElementById('img-cottage-3') as HTMLImageElement;
    if (imgCottage3) imgCottage3.src = villa303Img;

    const imgCottageFull = document.getElementById('img-cottage-full') as HTMLImageElement;
    if (imgCottageFull) imgCottageFull.src = fullResortImg;

    const imgAbout = document.getElementById('img-about') as HTMLImageElement;
    if (imgAbout) imgAbout.src = aboutImg;

    const imgHeritage = document.getElementById('img-adventures') as HTMLImageElement;
    if (imgHeritage) imgHeritage.src = heritageImg;

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar?.classList.add('scrolled');
        } else {
            navbar?.classList.remove('scrolled');
        }
    });
});

// Modal Logic
const modal = document.getElementById('bookingModal') as HTMLElement;
const closeModal = document.getElementById('closeModal') as HTMLElement;
const bookingForm = document.getElementById('bookingForm') as HTMLFormElement;
const contactForm = document.getElementById('contactForm') as HTMLFormElement;

// Modal open logic
(window as any).openBooking = (cottageName: string, basePrice: number) => {
    const modalTitle = document.getElementById('modalTitle');
    const cottageInput = document.getElementById('cottageNumber') as HTMLInputElement;
    const priceInput = document.getElementById('price') as HTMLInputElement;
    const datetimeInput = document.getElementById('datetime') as HTMLInputElement;
    const basePriceDisplay = document.getElementById('basePriceDisplay');
    const totalPriceDisplay = document.getElementById('totalPriceDisplay');
    const addonsSection = document.querySelector('.addons-section') as HTMLElement;
    const guestsSection = document.querySelector('.guests-section') as HTMLElement;

    // Reset checkboxes
    const checkboxes = bookingForm.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((cb: any) => cb.checked = false);

    // Initial guest counts based on suggested packs
    const adultsInput = document.getElementById('adults') as HTMLInputElement;
    const elderlyInput = document.getElementById('elderly') as HTMLInputElement;
    const childrenInput = document.getElementById('children') as HTMLInputElement;


    if (adultsInput) adultsInput.value = "0";
    if (elderlyInput) elderlyInput.value = "0";
    if (childrenInput) childrenInput.value = "0";

    const charcoalInput = document.getElementById('charcoal') as HTMLInputElement;
    if (charcoalInput) charcoalInput.value = "0";

    // Hide sections if Full Resort Buyout
    if (cottageName.includes('Full Resort Buyout')) {
        if (addonsSection) addonsSection.style.display = 'none';
        if (guestsSection) guestsSection.style.display = 'none';
    } else {
        if (addonsSection) addonsSection.style.display = 'block';
        if (guestsSection) guestsSection.style.display = 'block';
    }

    // Set min to current time
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    const minTime = now.toISOString().slice(0, 16);
    if (datetimeInput) datetimeInput.min = minTime;

    if (modalTitle) modalTitle.innerText = `Reserve ${cottageName}`;
    if (cottageInput) cottageInput.value = cottageName;
    if (priceInput) priceInput.value = basePrice.toString();
    if (basePriceDisplay) basePriceDisplay.innerText = `₱${basePrice.toLocaleString()}`;
    if (totalPriceDisplay) totalPriceDisplay.innerText = `₱${basePrice.toLocaleString()}`;

    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    updateTotalPrice();
};

// Stepper Logic
document.querySelectorAll('.step-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const type = (e.currentTarget as HTMLElement).dataset.type;
        const step = parseInt((e.currentTarget as HTMLElement).dataset.step || "0");
        const input = document.getElementById(type!) as HTMLInputElement;
        if (input) {
            let newVal = parseInt(input.value) + step;
            if (newVal < 0) newVal = 0;
            input.value = newVal.toString();
            updateTotalPrice();
        }
    });
});

// Live price update
const updateTotalPrice = () => {
    const priceInput = document.getElementById('price') as HTMLInputElement;
    const totalPriceDisplay = document.getElementById('totalPriceDisplay');
    const checkboxes = bookingForm.querySelectorAll('input[name="addon"]:checked');
    
    const adults = parseInt((document.getElementById('adults') as HTMLInputElement).value) || 0;
    const elderly = parseInt((document.getElementById('elderly') as HTMLInputElement).value) || 0;
    const children = parseInt((document.getElementById('children') as HTMLInputElement).value) || 0;
    const charcoal = parseInt((document.getElementById('charcoal') as HTMLInputElement).value) || 0;

    let total = parseInt(priceInput.value) || 0;

    // Per-person pricing added to base price
    total += (adults * 120);
    total += (elderly * 96); // 20% discount from 120
    total += (children * 96); // 20% discount from 120
    total += (charcoal * 50);

    checkboxes.forEach((cb: any) => {
        total += parseInt(cb.dataset.price) || 0;
    });

    if (totalPriceDisplay) totalPriceDisplay.innerText = `₱${total.toLocaleString()}`;
};

bookingForm.addEventListener('change', (e) => {
    const target = e.target as HTMLInputElement;
    if (target.name === 'addon') {
        updateTotalPrice();
    }
});

closeModal.onclick = () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
};

window.onclick = (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
};

// Form Submission (Booking)
bookingForm.onsubmit = async (e) => {
    e.preventDefault();
    const submitBtn = bookingForm.querySelector('button[type="submit"]') as HTMLButtonElement;
    submitBtn.innerText = 'Confirming...';
    submitBtn.disabled = true;

    const formData = new FormData(bookingForm);
    const addons = formData.getAll('addon');
    const totalPrice = document.getElementById('totalPriceDisplay')?.innerText || `₱${formData.get('price')}`;
    
    const templateParams = {
        user_name: formData.get('user_name'),
        user_email: formData.get('user_email'),
        user_phone: formData.get('user_phone'),
        cottage_name: formData.get('cottageNumber'),
        base_price: `₱${formData.get('price')}`,
        total_price: totalPrice,
        check_in: formData.get('datetime'),
        guests_adults: formData.get('adults'),
        guests_elderly: formData.get('elderly'),
        guests_children: formData.get('children'),
        charcoal_packs: formData.get('charcoal'),
        addons: addons.length > 0 ? addons.join(', ') : 'None',
        to_email: 'ajohndarcy@gmail.com' 
    };

    console.log('Attempting to send email with:', {
        service_id: SERVICE_ID,
        template_id: TEMPLATE_ID,
        params: templateParams
    });

    try {
        if (!SERVICE_ID || !TEMPLATE_ID) {
            throw new Error('EmailJS credentials missing. Please check your .env file.');
        }

        const response = await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams);
        console.log('Email successfully sent!', response);
        
        alert('Reservation Successful! Check your email for confirmation.');
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        bookingForm.reset();
    } catch (error: any) {
        console.error('Error:', error);
        alert(`Something went wrong: ${error.message || 'Please check your EmailJS setup.'}`);
    } finally {
        submitBtn.innerText = 'Confirm Booking';
        submitBtn.disabled = false;
    }
};

// Contact Form Submission
if (contactForm) {
    contactForm.onsubmit = async (e) => {
        e.preventDefault();
        const submitBtn = contactForm.querySelector('button[type="submit"]') as HTMLButtonElement;
        submitBtn.innerText = 'Sending...';
        submitBtn.disabled = true;

        const formData = new FormData(contactForm);
        const templateParams = {
            user_name: formData.get('user_name') || contactForm.querySelector<HTMLInputElement>('input[type="text"]')?.value,
            user_email: formData.get('user_email') || contactForm.querySelector<HTMLInputElement>('input[type="email"]')?.value,
            message: formData.get('message') || contactForm.querySelector<HTMLTextAreaElement>('textarea')?.value,
            subject: 'New Inquiry: Azure Mindoro Resort'
        };

        try {
            await emailjs.send(SERVICE_ID!, TEMPLATE_ID!, templateParams);
            alert('Your message has been sent successfully! Our concierge will contact you soon.');
            contactForm.reset();
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to send message. Please try again later.');
        } finally {
            submitBtn.innerText = 'Send Inquiry';
            submitBtn.disabled = false;
        }
    };
}
