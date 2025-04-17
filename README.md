# Simulador de Probabilidad - Árbol de Clasificación de Animales

Este proyecto es una aplicación web interactiva para visualizar y simular conceptos de probabilidad, incluyendo diagramas de árbol, simulaciones de extracciones y recursos educativos como geometría y clasificación animal.

## Mejoras Recientes: Clasificador de Animales

### Corrección de Visualización del Árbol de Decisiones

Hemos realizado importantes mejoras en el clasificador de animales, especialmente en la visualización del árbol de decisiones:

1. **Correcciones de Rutas**
   - Cambiamos rutas absolutas por relativas para asegurar compatibilidad en todos los entornos
   - Solucionamos problemas de carga de scripts que causaban errores en producción

2. **Mejoras en la Estructura del Código**
   - Reestructuramos la exposición de funciones globales
   - Implementamos un manejo de errores más robusto
   - Creamos una arquitectura más modular y mantenible

3. **Limpieza de Mensajes de Consola**
   - Eliminamos todos los mensajes de consola para una experiencia limpia en producción
   - Mantuvimos los mensajes de error importantes para el usuario final
   - Implementamos manejo silencioso de errores no críticos

4. **Mejoras de Visualización e Interactividad**
   - Aseguramos que el árbol de decisiones se muestre correctamente en todos los entornos
   - Mantuvimos la interactividad completa del clasificador de animales
   - Optimizamos el rendimiento de la visualización

La aplicación ahora funciona correctamente tanto en desarrollo local como en producción (Netlify), proporcionando una experiencia más profesional y robusta para los usuarios finales.

## Estructura del Proyecto

```
│── assets/
│   ─── css/            # Hojas de estilo principales y específicas
│   ─── img/            # Imágenes y favicon
│   ─── js/             # Scripts JS para simuladores, diagramas y utilidades
│   ─── pages/          # Páginas auxiliares (animales, geometría, footer)
│   └── styles/         # Estilos adicionales por tema
│── data/               # Archivos de datos para simulaciones
│── index.html          # Página principal de la presentación interactiva
│── animales.html       # Página del clasificador de animales
│── .gitignore          # Archivos y carpetas excluidos del control de versiones
│── netlify.toml        # Configuración para despliegue en Netlify (ignorado por git)
│── README.md           # Este archivo
```

## Características

- **Visualización interactiva de diagramas de árbol**
  - Árbol de clasificación de animales con interactividad completa
  - Animaciones suaves y representación visual intuitiva

- **Simuladores de Probabilidad**
  - Simulador de extracciones con y sin reemplazo
  - Cálculos de probabilidad en tiempo real
  - Interfaces interactivas para experimentación

- **Recursos Educativos**
  - Clasificación taxonómica de animales
  - Figuras geométricas y sus propiedades
  - Ejemplos de aplicación de probabilidad

## Tecnologías Utilizadas

- **HTML5, CSS3, JavaScript** (Vanilla)
- **Bootstrap 5** para estilos y componentes responsivos
- **D3.js** para visualización de diagramas de árbol y simulaciones
- **MathJax** para renderizado de fórmulas matemáticas
- **Netlify** para despliegue en producción

## Instalación y Uso

1. Clona el repositorio:
   ```bash
   git clone [URL_DEL_REPOSITORIO]
   ```
2. Abre `index.html` en tu navegador web para comenzar a explorar la presentación interactiva.
3. Navega a `animales.html` para ver el clasificador de animales mejorado.

## Despliegue

El proyecto está configurado para ser desplegado en Netlify. Puedes usar el botón a continuación para desplegar tu propia instancia:

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start)

## Contribución

Las contribuciones son bienvenidas. Por favor, sigue estos pasos:
1. Haz un Fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/NombreFeature`)
3. Haz commit de tus cambios (`git commit -m 'Agrega nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/NombreFeature`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.