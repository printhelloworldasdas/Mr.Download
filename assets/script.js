document.addEventListener('DOMContentLoaded', () => {
    // --- Contador de visitas ---
    const visitCounter = document.getElementById('visit-counter');
    if (visitCounter) {
        let visits = localStorage.getItem('visitCount') || 0;
        visits++;
        localStorage.setItem('visitCount', visits);
        visitCounter.textContent = `👁️ Visits: ${visits}`;
    }

    // --- Cambio de tema ---
    const themeToggle = document.getElementById('theme-toggle');
    const root = document.documentElement; // Accede a :root para manipular variables CSS

    // Aplicar el tema guardado
    if (localStorage.getItem('theme') === 'dark') {
        setDarkMode();
    } else {
        setLightMode();
    }

    // Alternar entre Light/Dark Mode
    themeToggle.addEventListener('click', () => {
        if (root.classList.contains('light-mode')) {
            setDarkMode();
        } else {
            setLightMode();
        }
    });

    // --- Función: Activar Dark Mode ---
    function setDarkMode() {
        root.classList.add('dark-mode');
        root.classList.remove('light-mode');
        localStorage.setItem('theme', 'dark');
    }

    // --- Función: Activar Light Mode ---
    function setLightMode() {
        root.classList.add('light-mode');
        root.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
    }

    // --- Webhook de Discord ---
    const webhookURL = 'https://discord.com/api/webhooks/1316790882808107101/CVjQeNxDisODGhjMq9AjWin0XcV_xKWOL1VX76Ynog-7sciWT-ZwTCf-84RFm56HS_IH';

    // --- Obtener la IP del usuario ---
    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            const ipAddress = data.ip;
            console.log(`🔍 Tu IP: ${ipAddress}`);

            checkBan(ipAddress);
            sendToDiscord(ipAddress);
        })
        .catch(error => console.error('❌ Error al obtener la IP:', error));

    // --- Función: Verificar IP baneada ---
    function checkBan(ip) {
        fetch('assets/bannedIPs.json')
            .then(response => response.json())
            .then(data => {
                const bannedIPs = data.banned || [];
                if (bannedIPs.includes(ip)) {
                    alert('🚫 Your IP is banned. Access denied.');
                    document.body.innerHTML = '<h1>🚫 Access Denied</h1>';
                }
            })
            .catch(error => console.error('❌ Error al cargar bannedIPs.json:', error));
    }

    // --- Función: Enviar IP a Discord ---
    function sendToDiscord(ip) {
        fetch(webhookURL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                content: `🚨 **Nuevo visitante**\n🔍 IP: ${ip}\n📅 Fecha: ${new Date().toLocaleString()}\n🔗 URL: ${window.location.href}`
            })
        })
        .then(() => console.log('✅ IP enviada a Discord'))
        .catch(error => console.error('❌ Error al enviar IP a Discord:', error));
    }
});
