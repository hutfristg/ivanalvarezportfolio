// script.js
document.addEventListener('DOMContentLoaded', () => {
    const togglebtn = document.querySelector('.togglebtn');
    const nav = document.querySelector('.navlinks');

    togglebtn.addEventListener('click', () => {
        togglebtn.classList.toggle('click');
        nav.classList.toggle('open');
    });

    new Typed('.input', {
        strings: ['Welcome!', 'Bienvenido!', 'Ciao!', 'Bienvenue!', '欢迎!', '환영합니다!', 'Hoş geldiniz!', 'ยินดีต้อนรับ!', 'Selamat Datang!'],
        typeSpeed: 80,
        backSpeed: 30,
        backDelay: 1200,
        startDelay: 500,
        loop: true,
        showCursor: true
    });

    const textSpan = document.querySelector('.falling-text');
    textSpan.addEventListener('mouseenter', () => textSpan.classList.add('falling'));
    textSpan.addEventListener('mouseleave', () => textSpan.classList.remove('falling'));

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

    const sections = document.querySelectorAll('section, .hero-header');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.2 });

    sections.forEach(section => observer.observe(section));

    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            const isActive = content.classList.contains('active');
            document.querySelectorAll('.accordion-content').forEach(c => c.classList.remove('active'));
            document.querySelectorAll('.accordion-header').forEach(h => h.classList.remove('active'));
            if (!isActive) {
                content.classList.add('active');
                header.classList.add('active');
            }
        });
    });

    window.scrollTo(0, 0);
});

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offset = 70;
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
        'grading_system': ['grading_system_project/grading_system_gui_1.png', 'grading_system_project/grading_system_gui_2.png', 'grading_system_project/grading_system_gui_3.png', 'grading_system_project/grading_system_gui_4.png'],
        'snake': ['snake_game_project/snake_gui_1.png', 'snake_game_project/snake_gui_2.png', 'snake_game_project/snake_gui_3.png', 'snake_game_project/snake_gui_4.png'],
        'mp3_player': ['mp3_player_project/mp3_player_gui_1.png', 'mp3_player_project/mp3_player_gui_2.png', 'mp3_player_project/mp3_player_gui_3.png', 'mp3_player_project/mp3_player_gui_4.png'],
        'ecommerce': ['ecommerce_project/ecommerce_gui_1.png', 'ecommerce_project/ecommerce_gui_2.png', 'ecommerce_project/ecommerce_gui_3.png', 'ecommerce_project/ecommerce_gui_4.png'],
        'lehitimo': ['lehitimo_project/lehitimo_gui_1.png', 'lehitimo_project/lehitimo_gui_2.png', 'lehitimo_project/lehitimo_gui_3.png', 'lehitimo_project/lehitimo_gui_4.png', 'lehitimo_project/lehitimo_gui_5.png'],
        'raspberry_pi': ['raspberry_pi_project/raspberry_pi_gui_1.png', 'raspberry_pi_project/raspberry_pi_gui_2.png', 'raspberry_pi_project/raspberry_pi_gui_3.png', 'raspberry_pi_project/raspberry_pi_gui_4.png', 'raspberry_pi_project/raspberry_pi_gui_5.png'],
        'assembly': ['assembly_project/assembly_gui_1.png', 'assembly_project/assembly_gui_2.png', 'assembly_project/assembly_gui_3.png', 'assembly_project/assembly_gui_4.png', 'assembly_project/assembly_gui_5.png', 'assembly_project/assembly_gui_6.png', 'assembly_project/assembly_gui_7.png', 'assembly_project/assembly_gui_8.png'],
        'light_motion': ['light_motion_project/light_motion_gui_1.png', 'light_motion_project/light_motion_gui_2.png', 'light_motion_project/light_motion_gui_3.png', 'light_motion_project/light_motion_gui_4.png'],
        'smart_access': ['smart_access_project/smart_access_gui_1.png', 'smart_access_project/smart_access_gui_2.png', 'smart_access_project/smart_access_gui_3.png', 'smart_access_project/smart_access_gui_4.png'],
        'air_quality': ['air_quality_project/air_quality_gui_1.png', 'air_quality_project/air_quality_gui_2.png', 'air_quality_project/air_quality_gui_3.png', 'air_quality_project/air_quality_gui_4.png'],
        'inventory': ['inventory_management_project/inventory_gui_1.png', 'inventory_management_project/inventory_gui_2.png', 'inventory_management_project/inventory_gui_3.png', 'inventory_management_project/inventory_gui_4.png', 'inventory_management_project/inventory_gui_5.png', 'inventory_management_project/inventory_gui_6.png']
    };
    modalBody.classList.add('screenshots');
    modalBody.innerHTML = screenshots[project].map(src => `<img src="assets/projects/${src}" alt="Project Screenshot" onclick="openImageModal('assets/projects/${src}')">`).join('');
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
    modalBody.innerHTML = `<iframe src="assets/files/IvanKennethAlvarez_FinalReport.pdf#toolbar=0&navpanes=0" title="Final Report Preview"></iframe>`;
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

function openImageModal(imageSrc) {
    const imageModal = document.getElementById('image-modal');
    const enlargedImage = document.getElementById('enlarged-image');
    enlargedImage.src = imageSrc;
    imageModal.style.display = 'flex';
    imageModal.focus();
    imageModal.addEventListener('keydown', trapImageFocus);
}

function closeImageModal() {
    const imageModal = document.getElementById('image-modal');
    const enlargedImage = document.getElementById('enlarged-image');
    imageModal.style.display = 'none';
    enlargedImage.src = '';
    imageModal.removeEventListener('keydown', trapImageFocus);
}

function trapFocus(e) {
    const modal = document.getElementById('modal');
    const focusableElements = modal.querySelectorAll('button, [href], img[onclick]');
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

function trapImageFocus(e) {
    const imageModal = document.getElementById('image-modal');
    const focusableElements = imageModal.querySelectorAll('button');
    const firstElement = focusableElements[0];

    if (e.key === 'Tab') {
        e.preventDefault();
        firstElement.focus();
    }

    if (e.key === 'Escape') {
        closeImageModal();
    }
}

document.getElementById('modal').addEventListener('click', (e) => {
    if (e.target === document.getElementById('modal')) {
        closePDFModal();
    }
});

document.getElementById('image-modal').addEventListener('click', (e) => {
    if (e.target === document.getElementById('image-modal')) {
        closeImageModal();
    }
});

document.getElementById('pdf-download-btn').addEventListener('click', function(e) {
    // Download attribute handles file download
});
