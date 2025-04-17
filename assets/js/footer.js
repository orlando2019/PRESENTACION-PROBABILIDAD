document.addEventListener('DOMContentLoaded', function() {
    // Cargar el footer dinámicamente
    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            // Insertar el footer en el contenedor
            document.getElementById('footer-container').innerHTML = data;
            
            // Establecer el año actual
            document.getElementById('current-year').textContent = new Date().getFullYear();
            
            // Personalizar el título del footer según la página
            const pageTitle = document.title;
            const footerTitle = document.querySelector('.footer-title');
            
            if (footerTitle) {
                if (pageTitle.includes('Geometría') || window.location.href.includes('geometria')) {
                    footerTitle.textContent = 'Árbol de Figuras Geométricas';
                } else {
                    footerTitle.textContent = 'Simulador de Probabilidad';
                }
            }
        })
        .catch(error => {
            console.error('Error al cargar el footer:', error);
        });
}); 