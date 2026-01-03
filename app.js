// app.js - Sitenin Kasları

document.addEventListener("DOMContentLoaded", () => {
    renderPartners();
    renderProcess();
});

// Referansları Oluştur
function renderPartners() {
    const container = document.getElementById("partners-container");
    if (!container) return; // Hata önleyici
    container.innerHTML = "";

    siteData.partners.forEach(partner => {
        let htmlContent = '';

        // LOGO VARSA VE BOŞ DEĞİLSE
        if (partner.logo && partner.logo.trim() !== "") {
            htmlContent = `
                <div class="group flex items-center justify-center grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition duration-300 cursor-default">
                    <img src="${partner.logo}" alt="${partner.name}" class="h-10 md:h-12 w-auto object-contain" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'">
                    <span class="hidden text-gray-200 font-extrabold text-xl gap-2 items-center">
                        <span class="text-2xl">${partner.icon}</span> ${partner.name}
                    </span>
                </div>
            `;
        } 
        // LOGO YOKSA (EMOJİ MODU)
        else {
            htmlContent = `
                <div class="flex items-center gap-2 text-gray-200 font-extrabold text-xl opacity-60 hover:opacity-100 hover:text-white transition cursor-default">
                    <span class="text-2xl">${partner.icon}</span> ${partner.name}
                </div>
            `;
        }
        container.innerHTML += htmlContent;
    });
}

// Süreç Adımlarını Oluştur
function renderProcess() {
    const container = document.getElementById("process-cards-container");
    if (!container) return;
    container.innerHTML = "";

    siteData.processSteps.forEach(step => {
        const html = `
            <div class="bg-gray-800/50 border border-gray-700 p-8 rounded-2xl hover:bg-gray-800 transition duration-300 relative z-10 group">
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