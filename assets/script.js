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

    // Aplicar el tema guardado o el modo claro por defecto
    const currentTheme = localStorage.getItem('theme') || 'light';
    applyTheme(currentTheme);

    // Alternar el tema al hacer clic
    themeToggle.addEventListener('click', () => {
        const newTheme = root.classList.contains('light-mode') ? 'dark' : 'light';
        applyTheme(newTheme);
    });

    // --- Función: Aplicar tema (claro/oscuro) ---
    function applyTheme(theme) {
        if (theme === 'dark') {
            root.classList.add('dark-mode');
            root.classList.remove('light-mode');
        } else {
            root.classList.add('light-mode');
            root.classList.remove('dark-mode');
        }
        localStorage.setItem('theme', theme);
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
        if (localStorage.getItem('ipSent') === ip) {
            console.log('⚠️ IP ya enviada previamente.');
            return;
        }

        fetch(webhookURL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                content: `🚨 **Nuevo visitante**\n🔍 IP: ${ip}\n📅 Fecha: ${new Date().toLocaleString()}\n🔗 URL: ${window.location.href}`
            })
        })
        .then(() => {
            localStorage.setItem('ipSent', ip);
            console.log('✅ IP enviada a Discord');
        })
        .catch(error => console.error('❌ Error al enviar IP a Discord:', error));
    }
});
