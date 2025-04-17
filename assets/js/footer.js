document.addEventListener('DOMContentLoaded', function() {
    // Cargar el footer dinámicamente con ruta relativa según la ubicación
    let footerPath = 'footer.html';
    const path = window.location.pathname;
    if (path.includes('geometria.html')) {
        footerPath = '../../assets/pages/footer.html';
    } else if (path.includes('animales.html')) {
        footerPath = '../../assets/pages/footer.html';
    } else if (path.includes('index.html') || path === '/' || path === '/index.html') {
        footerPath = 'assets/pages/footer.html';
    } else if (path.includes('assets/pages/')) {
        footerPath = 'footer.html';
    }
    
    console.log('Cargando footer desde:', footerPath);
    
    fetch(footerPath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error al cargar el footer: ${response.status}`);
            }
            return response.text();
        })
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