// JavaScript for Portfolio Website
document.addEventListener('DOMContentLoaded', () => {
    const togglebtn = document.querySelector('.togglebtn');
    const nav = document.querySelector('.navlinks');

    togglebtn.addEventListener('click', () => {
        togglebtn.classList.toggle('click');
        nav.classList.toggle('open');
    });

    new Typed('.input', {
        strings: ['Welcome!', 'Bienvenido!', 'Ciao!', 'Bienvenue!', '欢迎!', '환영합니다!', 'Hoş geldiniz!', 'ยินดีต้อนรับ!', 'Benvenuto!', 'Selamat Datang!'],
        typeSpeed: 60,
        backSpeed: 20,
        backDelay: 1000,
        startDelay: 500,
        loop: true,
        showCursor: true
    });

    const textSpan = document.querySelector('.falling-text');
    textSpan.addEventListener('mouseenter', () => textSpan.classList.add('falling'));
    textSpan.addEventListener('mouseleave', () => textSpan.classList.remove('falling'));

    // Smooth scrolling for nav links and arrows
    const navLinks = document.querySelectorAll('.navlinks a, .nav-links a, .arrow');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href')?.substring(1) || link.getAttribute('onclick')?.match(/'([^']+)'/)?.[1];
            if (targetId) {
                scrollToSection(targetId);
            }
        });
    });

    // IntersectionObserver for section animations
    const sections = document.querySelectorAll('section, .hero-header');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => observer.observe(section));

    window.scrollTo(0, 0);
});

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offset = 80; // Adjust for fixed header
        const sectionPosition = section.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({
            top: sectionPosition,
            behavior: 'smooth'
        });
    }
}

function openScreenshotModal(project) {
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modal-body');
    const pdfDownloadBtn = document.getElementById('pdf-download-btn');
    const screenshots = {
        'snake': ['snake_gui_1.png', 'snake_gui_2.png', 'snake_gui_3.png', 'snake_gui_4.png'],
        'ecommerce': ['ecommerce_gui_1.png', 'ecommerce_gui_2.png', 'ecommerce_gui_3.png', 'ecommerce_gui_4.png'],
        'smart_access': ['smart_access_gui_1.png', 'smart_access_gui_2.png', 'smart_access_gui_3.png', 'smart_access_gui_4.png'],
        'air_quality': ['air_quality_gui_1.png', 'air_quality_gui_2.png', 'air_quality_gui_3.png', 'air_quality_gui_4.png']
    };
    modalBody.classList.add('screenshots');
    modalBody.innerHTML = screenshots[project].map(src => `<img src="assets/projects/${src}" alt="Project Screenshot">`).join('');
    pdfDownloadBtn.style.display = 'none';
    modal.style.display = 'flex';
    modal.focus();
    modal.addEventListener('keydown', trapFocus);
}

function openPDFModal() {
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modal-body');
    const pdfDownloadBtn = document.getElementById('pdf-download-btn');
    modalBody.classList.remove('screenshots');
    modalBody.innerHTML = `<iframe src="assets/files/finalreport-ivan.pdf#toolbar=0&navpanes=0" title="Final Report Preview"></iframe>`;
    pdfDownloadBtn.style.display = 'inline-flex';
    modal.style.display = 'flex';
    modal.focus();
    modal.addEventListener('keydown', trapFocus);
}

function closePDFModal() {
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modal-body');
    modal.style.display = 'none';
    modalBody.innerHTML = '';
    modalBody.classList.remove('screenshots');
    modal.removeEventListener('keydown', trapFocus);
}

// Focus trapping for accessibility
function trapFocus(e) {
    const modal = document.getElementById('modal');
    const focusableElements = modal.querySelectorAll('button, [href]');
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (e.key === 'Tab') {
        if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
        }
    }

    if (e.key === 'Escape') {
        closePDFModal();
    }
}

document.getElementById('modal').addEventListener('click', (e) => {
    if (e.target === document.getElementById('modal')) {
        closePDFModal();
    }
});

// Ensure PDF opens in system's default viewer (like Adobe Reader) when downloaded
document.getElementById('pdf-download-btn').addEventListener('click', function(e) {
    // The download attribute handles the file download, which will open in the system's default PDF viewer
});
