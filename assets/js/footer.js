document.addEventListener('DOMContentLoaded', function() {
    // Siempre usa la ruta absoluta desde la raíz del sitio
    const footerPath = '/assets/pages/footer.html';
    // Cargar footer silenciosamente
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
                // Error silencioso
                return;
            }
            
            footerContainer.innerHTML = data;
            footerContainer.style.width = '100%';
            footerContainer.style.margin = '0';
            footerContainer.style.padding = '0';
            footerContainer.style.display = 'block';
            footerContainer.style.visibility = 'visible';
            
            // Esperar a que el DOM del footer se cargue completamente
            setTimeout(() => {
                // Establecer el año actual
                const yearElement = document.getElementById('current-year');
                if (yearElement) {
                    yearElement.textContent = new Date().getFullYear();
                } // Error silencioso si no existe
                
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
                } // Error silencioso si no existe
            }, 100); // Esperar 100ms para asegurar que el DOM esté listo
        })
        .catch(error => {
            // Error silencioso al cargar el footer
        });
}); 