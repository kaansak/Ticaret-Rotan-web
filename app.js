// app.js - Sitenin Kasları

document.addEventListener("DOMContentLoaded", () => {
    // 1. Verileri Doldur
    renderPartners();
    renderProcess();

    // 2. Animasyonları Başlat
    initAOS();

    // 3. Event Listener'ları Başlat
    initEventListeners();
});

// --- RENDER FONKSİYONLARI ---

function renderPartners() {
    const container1 = document.getElementById("partners-container");
    const container2 = document.getElementById("partners-container-clone");
    
    // Güvenlik kontrolü
    if (!container1 || !container2) return;

    let htmlContent = "";

    siteData.partners.forEach(partner => {
        if (partner.logo && partner.logo.trim() !== "") {
            htmlContent += `
                <div class="group flex items-center justify-center grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition duration-300 cursor-default min-w-[150px]">
                    <img src="${partner.logo}" alt="${partner.name}" class="h-10 md:h-12 w-auto object-contain" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'">
                    <span class="hidden text-gray-200 font-extrabold text-xl gap-2 items-center">
                        <span class="text-2xl">${partner.icon}</span> ${partner.name}
                    </span>
                </div>
            `;
        } else {
            htmlContent += `
                <div class="flex items-center gap-2 text-gray-200 font-extrabold text-xl opacity-60 hover:opacity-100 hover:text-white transition cursor-default min-w-[150px]">
                    <span class="text-2xl">${partner.icon}</span> ${partner.name}
                </div>
            `;
        }
    });

    container1.innerHTML = htmlContent;
    container2.innerHTML = htmlContent;
}

function renderProcess() {
    const container = document.getElementById("process-cards-container");
    if (!container) return;
    container.innerHTML = "";

    siteData.processSteps.forEach(step => {
        const html = `
            <div class="bg-gray-800/50 border border-gray-700 p-8 rounded-2xl hover:bg-gray-800 transition duration-300 relative z-10 group" data-aos="fade-up">
                <div class="w-16 h-16 bg-blue-900/50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-brandBlue group-hover:scale-110 transition duration-300">
                    <span class="text-3xl">${step.icon}</span>
                </div>
                <h3 class="text-xl font-bold text-white mb-3">${step.title}</h3>
                <p class="text-gray-400 leading-relaxed">
                    ${step.textPart1}
                    <span class="text-white font-semibold">${step.highlight}</span>
                    ${step.textPart2}
                </p>
            </div>
        `;
        container.innerHTML += html;
    });
}

function initAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 600,
            easing: 'ease-out-cubic',
            once: true,
            offset: 50,
            disable: 'mobile' 
        });
    }
}

// --- OLAY YÖNETİMİ (EVENT LISTENERS) ---

function initEventListeners() {
    
    // A) MOBİL MENÜ MANTIĞI
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (mobileBtn && mobileMenu) {
        mobileBtn.addEventListener('click', () => {
            // Menüyü aç/kapat
            mobileMenu.classList.toggle('translate-x-full');
            
            // Scroll kilitle/aç
            const isMenuOpen = !mobileMenu.classList.contains('translate-x-full');
            document.body.style.overflow = isMenuOpen ? 'hidden' : '';
        });

        // Linke tıklayınca menüyü kapat
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('translate-x-full');
                document.body.style.overflow = '';
            });
        });
    }

    // B) MODAL MANTIĞI
    const modal = document.getElementById('analizModal');
    const heroBtn = document.getElementById('hero-cta-btn');
    const closeBtns = [
        document.getElementById('modal-close-btn'),
        document.getElementById('modal-cancel-btn'),
        document.getElementById('modal-backdrop')
    ];
    // Tüm "Fiyat Listesi" ve "Teklif Al" butonlarını seç
    const triggerBtns = document.querySelectorAll('.modal-trigger-btn');

    // Modalı Açan Fonksiyon
    const openModal = () => {
        if(modal) modal.classList.remove('hidden');
    };

    // Modalı Kapatan Fonksiyon
    const closeModal = () => {
        if(modal) modal.classList.add('hidden');
    };

    // Butonlara tıklandığında aç
    if(heroBtn) heroBtn.addEventListener('click', openModal);
    triggerBtns.forEach(btn => btn.addEventListener('click', openModal));

    // Kapatma butonlarına tıklandığında kapat
    closeBtns.forEach(btn => {
        if(btn) btn.addEventListener('click', closeModal);
    });

    // C) WHATSAPP GÖNDERİM & DOĞRULAMA
    const sendBtn = document.getElementById('send-whatsapp-btn');
    
    if(sendBtn) {
        sendBtn.addEventListener('click', () => {
            const countryInput = document.getElementById('targetCountry');
            const productInput = document.getElementById('productName');
            
            let isValid = true;

            // Basit Doğrulama
            [countryInput, productInput].forEach(input => {
                if(!input.value.trim()) {
                    isValid = false;
                    input.classList.add('input-error');
                    setTimeout(() => input.classList.remove('input-error'), 2000);
                } else {
                    input.classList.remove('input-error');
                }
            });

            if(!isValid) return;

            // Doğrulama başarılıysa gönder
            const phone = "905434688407"; 
            const message = `Merhaba, ${countryInput.value} pazarı için ${productInput.value} sektöründe yurt dışı müşteri analizi talep ediyorum. Bilgi alabilir miyim?`;
            
            window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
            closeModal();
        });
    }

    // D) SSS (FAQ) ACCORDION MANTIĞI
    const faqBtns = document.querySelectorAll('.faq-btn');
    
    faqBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const content = btn.nextElementSibling;
            const icon = btn.querySelector('span:last-child');
            const isHidden = content.classList.contains('hidden');

            // Diğerlerini kapat
            document.querySelectorAll('.faq-btn').forEach(otherBtn => {
                if(otherBtn !== btn) {
                    otherBtn.nextElementSibling.classList.add('hidden');
                    otherBtn.querySelector('span:last-child').innerText = '+';
                    otherBtn.querySelector('span:last-child').classList.remove('rotate-180');
                }
            });

            // Tıklananı aç/kapat
            if (isHidden) {
                content.classList.remove('hidden');
                icon.innerText = '-';
                icon.classList.add('rotate-180');
            } else {
                content.classList.add('hidden');
                icon.innerText = '+';
                icon.classList.remove('rotate-180');
            }
        });
    });
}