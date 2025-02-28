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

    // Cargar el tema guardado
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.add('light-mode');
    }

    // Alternar el tema
    themeToggle.addEventListener('click', () => {
        if (document.body.classList.contains('light-mode')) {
            document.body.classList.replace('light-mode', 'dark-mode');
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.classList.replace('dark-mode', 'light-mode');
            localStorage.setItem('theme', 'light');
        }
    });
});
