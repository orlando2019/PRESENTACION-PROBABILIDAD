document.addEventListener('DOMContentLoaded', function() {
    // Siempre usa la ruta absoluta desde la raíz del sitio
    const footerPath = '/assets/pages/footer.html';
    console.log('Cargando footer desde:', footerPath);
    fetch(footerPath)
        .then(data => {
            // Insertar el footer en el contenedor y asegurar ancho completo
            const footerContainer = document.getElementById('footer-container');
            if (!footerContainer) {
                console.error('No se encontró el contenedor del footer');
                return;
            }
            
            footerContainer.innerHTML = data;
            footerContainer.style.width = '100%';
            footerContainer.style.margin = '0';
            footerContainer.style.padding = '0';
            footerContainer.style.display = 'block';
            footerContainer.style.visibility = 'visible';
            
            // Establecer el año actual
            const yearElement = document.getElementById('current-year');
            if (yearElement) {
                yearElement.textContent = new Date().getFullYear();
            } else {
                console.warn('No se encontró el elemento para el año actual');
            }
            
            // Personalizar el título del footer según la página
            const pageTitle = document.title;
            const footerTitle = document.querySelector('.footer-title');
            
            if (footerTitle) {
                if (pageTitle.includes('Geometría') || window.location.href.includes('geometria')) {
                    footerTitle.textContent = 'Árbol de Figuras Geométricas';
                } else if (pageTitle.includes('Animales') || window.location.href.includes('animales')) {
                    footerTitle.textContent = 'Clasificador de Animales';
                } else {
                    footerTitle.textContent = 'Simulador de Probabilidad';
                }
            } else {
                console.warn('No se encontró el elemento del título del footer');
            }
            
            console.log('Footer cargado correctamente');
        })
        .catch(error => {
            console.error('Error al cargar el footer:', error);
        });
}); 