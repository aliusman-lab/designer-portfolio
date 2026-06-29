// =============================================
//  MAIN.JS — Alen Kevin Portfolio
// =============================================

// ---- GSAP Plugins ----
gsap.registerPlugin(ScrollTrigger);

// =============================================
//  SIDE NAV MENU
// =============================================
const menuBtn  = document.getElementById('menuBtn');
const menuIcon = document.getElementById('menuIcon');
const sideNav  = document.getElementById('sideNav');
const navItems = document.querySelectorAll('.nav-item');

let isOpen = false;

const tl = gsap.timeline({ paused: true, defaults: { ease: "expo.inOut" } });
tl.to(sideNav, { right: 0, duration: 0.8 })
  .to(navItems, { opacity: 1, y: -10, stagger: 0.1, duration: 0.4 }, "-=0.4");

menuBtn.addEventListener('click', () => {
    if (!isOpen) {
        tl.play();
        menuIcon.innerHTML = "✕";
        gsap.fromTo(menuIcon, { rotate: 0 }, { rotate: 90, duration: 0.3 });
    } else {
        tl.reverse();
        menuIcon.innerHTML = "☰";
        gsap.fromTo(menuIcon, { rotate: 90 }, { rotate: 0, duration: 0.3 });
    }
    isOpen = !isOpen;
});

navItems.forEach(link => {
    link.addEventListener('click', () => {
        tl.reverse();
        menuIcon.innerHTML = "☰";
        isOpen = false;
    });
});

// =============================================
//  SCROLL ANIMATIONS
// =============================================

// About section
const aboutimg  = document.getElementById('abt-img');
const aboutcont = document.getElementById('abt-cont');

if (aboutimg) {
    gsap.from(aboutimg, {
        scrollTrigger: { trigger: aboutimg, start: "top 80%", toggleActions: "play none none reset" },
        x: -80, opacity: 0, duration: 1, ease: "power2.out"
    });
}
if (aboutcont) {
    gsap.from(aboutcont, {
        scrollTrigger: { trigger: aboutcont, start: "top 80%", toggleActions: "play none none reset" },
        x: 80, opacity: 0, duration: 1, ease: "power2.out"
    });
}

// Education cards
const eduItems = document.querySelectorAll('.edu-item');
if (eduItems.length > 0) {
    gsap.from(eduItems, {
        scrollTrigger: { trigger: "#edu-card", start: "top 80%", toggleActions: "play none none reset" },
        y: 80, opacity: 0, duration: 1, stagger: 0.3, ease: "power2.out"
    });
}

// Project cards
const prjcards = document.querySelectorAll('.prjcard');
if (prjcards.length > 0) {
    gsap.from(prjcards, {
        scrollTrigger: { trigger: "#proj-cards", start: "top 80%", toggleActions: "play none none reset" },
        y: 80, opacity: 0, duration: 1, stagger: 0.2, ease: "power2.out"
    });
}

// Contact section
const contactdet  = document.getElementById('con-det');
const contactform = document.getElementById('con-form');

if (contactdet) {
    gsap.from(contactdet, {
        scrollTrigger: { trigger: contactdet, start: "top 80%", toggleActions: "play none none reset" },
        x: -80, opacity: 0, duration: 1, ease: "power2.out"
    });
}
if (contactform) {
    gsap.from(contactform, {
        scrollTrigger: { trigger: contactform, start: "top 80%", toggleActions: "play none none reset" },
        x: 80, opacity: 0, duration: 1, ease: "power2.out"
    });
}

// Logo grid items
window.addEventListener("DOMContentLoaded", () => {
    const logoproj = document.querySelector('#logos');
    const logoanim = document.querySelectorAll('.logo-anim');
    if (logoproj && logoanim.length > 0) {
        gsap.from(logoanim, {
            scrollTrigger: { trigger: logoproj, start: "top 80%", toggleActions: "play none none reset" },
            y: 80, opacity: 0, duration: 1, stagger: 0.2, ease: "power2.out"
        });
    }
});

// =============================================
//  DESIGNER TEXT — MIST HOVER EFFECT
// =============================================
const designerText = document.querySelector('#designer-text');
const mistFilter   = document.querySelector('#mistTurbulence');
const mistBlur     = document.querySelector('#mistBlur');

if (designerText && mistFilter && mistBlur) {
    let obj = { scale: 18, blur: 2.5, opacity: 0.88 };

    designerText.addEventListener('mouseenter', () => {
        gsap.to(obj, {
            scale: 3, blur: 0.3, opacity: 1,
            duration: 0.8, ease: 'power2.out',
            onUpdate: () => {
                mistFilter.setAttribute('scale', obj.scale);
                mistBlur.setAttribute('stdDeviation', obj.blur);
                designerText.style.opacity = obj.opacity;
            }
        });
    });

    designerText.addEventListener('mouseleave', () => {
        gsap.to(obj, {
            scale: 18, blur: 2.5, opacity: 0.88,
            duration: 1.2, ease: 'power2.inOut',
            onUpdate: () => {
                mistFilter.setAttribute('scale', obj.scale);
                mistBlur.setAttribute('stdDeviation', obj.blur);
                designerText.style.opacity = obj.opacity;
            }
        });
    });
}

// =============================================
//  CONTACT FORM — VALIDATION + EMAILJS
// =============================================
const nameRegex    = /^[a-zA-Z\s'-]{2,50}$/;
const emailRegex   = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const messageRegex = /^[\s\S]{10,}$/;

const nameInput    = document.getElementById('nameInput');
const emailInput   = document.getElementById('emailInput');
const messageInput = document.getElementById('messageInput');
const nameError    = document.getElementById('nameError');
const emailError   = document.getElementById('emailError');
const messageError = document.getElementById('messageError');
const successMsg   = document.getElementById('successMsg');
const submitBtn    = document.getElementById('submitBtn');

// Only run form logic if all elements exist (index.html only)
if (nameInput && emailInput && messageInput) {

    function validateField(input, regex, errorEl) {
        const valid = regex.test(input.value.trim());
        if (!valid) {
            input.classList.add('ring-2', 'ring-red-400');
            errorEl.classList.remove('hidden');
        } else {
            input.classList.remove('ring-2', 'ring-red-400');
            errorEl.classList.add('hidden');
        }
        return valid;
    }

    // Validate on blur
    nameInput.addEventListener('blur',    () => validateField(nameInput,    nameRegex,    nameError));
    emailInput.addEventListener('blur',   () => validateField(emailInput,   emailRegex,   emailError));
    messageInput.addEventListener('blur', () => validateField(messageInput, messageRegex, messageError));

    // Clear errors on input
    nameInput.addEventListener('input',    () => { nameError.classList.add('hidden');    nameInput.classList.remove('ring-2','ring-red-400'); });
    emailInput.addEventListener('input',   () => { emailError.classList.add('hidden');   emailInput.classList.remove('ring-2','ring-red-400'); });
    messageInput.addEventListener('input', () => { messageError.classList.add('hidden'); messageInput.classList.remove('ring-2','ring-red-400'); });

    document.getElementById('contactForm').addEventListener('submit', async (e) => {
        e.preventDefault();

        const vName    = validateField(nameInput,    nameRegex,    nameError);
        const vEmail   = validateField(emailInput,   emailRegex,   emailError);
        const vMessage = validateField(messageInput, messageRegex, messageError);

        if (!vName || !vEmail || !vMessage) return;

        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        try {
            await emailjs.send(
                'YOUR_SERVICE_ID',    // Replace with your EmailJS Service ID
                'YOUR_TEMPLATE_ID',   // Replace with your EmailJS Template ID
                {
                    from_name:  nameInput.value.trim(),
                    from_email: emailInput.value.trim(),
                    message:    messageInput.value.trim(),
                },
                'YOUR_PUBLIC_KEY'     // Replace with your EmailJS Public Key
            );

            successMsg.textContent = '✓ Message sent successfully!';
            successMsg.classList.remove('hidden', 'text-red-400');
            successMsg.classList.add('text-[#b2ff0a]');
            document.getElementById('contactForm').reset();

        } catch (err) {
            console.error('EmailJS error:', err);
            successMsg.textContent = '✕ Something went wrong. Please try again.';
            successMsg.classList.remove('hidden', 'text-[#b2ff0a]');
            successMsg.classList.add('text-red-400');
        }

        submitBtn.textContent = 'SEND MESSAGE';
        submitBtn.disabled = false;
    });
}