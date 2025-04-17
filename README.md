# Simulador de Probabilidad

Este proyecto es una aplicación web interactiva para visualizar y simular conceptos de probabilidad, incluyendo diagramas de árbol, simulaciones de extracciones y recursos educativos como geometría y clasificación animal.

## Estructura del Proyecto

```
├── assets/
│   ├── css/            # Hojas de estilo principales y específicas
│   ├── img/            # Imágenes y favicon
│   ├── js/             # Scripts JS para simuladores, diagramas y utilidades
│   ├── pages/          # Páginas auxiliares (animales, geometría, footer)
│   └── styles/         # Estilos adicionales por tema
├── data/               # Archivos de datos para simulaciones
├── index.html          # Página principal de la presentación interactiva
├── .gitignore          # Archivos y carpetas excluidos del control de versiones
├── netlify.toml        # Configuración para despliegue en Netlify (ignorado por git)
├── windsurf_deployment.yaml # Configuración de despliegue (ignorado por git)
├── README.md           # Este archivo
└── .windsurfrules      # Reglas de despliegue (ignorado por git)
```

## Tecnologías Utilizadas

- **HTML5, CSS3, JavaScript** (Vanilla)
- **Bootstrap 5** para estilos y componentes responsivos
- **D3.js** para visualización de diagramas de árbol y simulaciones
- **MathJax** para renderizado de fórmulas matemáticas
- **Netlify** y **Windsurf** para despliegue (archivos de configuración ignorados en git)

## Archivos Ignorados

El archivo `.gitignore` está configurado para excluir archivos de configuración de despliegue, variables de entorno, dependencias y archivos de sistema, entre otros. Ejemplos:

- `netlify.toml`
- `windsurf_deployment.yaml`
- `.env`, `.env.local`, `.windsurfrules`
- `node_modules/`, `vendor/`
- Archivos temporales y de sistema

Esto ayuda a mantener el repositorio limpio y seguro, evitando la exposición de configuraciones sensibles o específicas del entorno local.

## Instalación y Uso

1. Clona el repositorio:
   ```bash
   git clone [URL_DEL_REPOSITORIO]
   ```
2. Abre `index.html` en tu navegador web para comenzar a explorar la presentación interactiva.
3. Navega por las secciones y utiliza los simuladores y diagramas.

## Contribución

Las contribuciones son bienvenidas. Por favor, sigue estos pasos:
1. Haz un Fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/NombreFeature`)
3. Haz commit de tus cambios (`git commit -m 'Agrega nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/NombreFeature`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.


Este proyecto es una aplicación web interactiva para visualizar y simular conceptos de probabilidad, incluyendo diagramas de árbol y simulaciones de extracciones.

## Características

- Visualización interactiva de diagramas de árbol
- Simulador de extracciones con y sin reemplazo
- Cálculos de probabilidad en tiempo real
- Interfaz intuitiva y responsive

## Estructura del Proyecto

```
├── assets/
│   ├── css/
│   │   └── styles.css
│   └── js/
│       └── script.js
├── index.html
├── README.md
└── .gitignore
```

## Tecnologías Utilizadas

- HTML5
- CSS3
- JavaScript
- Bootstrap 5
- MathJax para fórmulas matemáticas

## Instalación

1. Clona el repositorio:
```bash
git clone [URL_DEL_REPOSITORIO]
```

2. Abre el archivo `index.html` en tu navegador web.

## Uso

- Navega por las diferentes secciones usando el menú superior
- Utiliza el simulador de extracciones para ver probabilidades en tiempo real
- Interactúa con el diagrama de árbol para entender las probabilidades condicionales

## Contribución

Las contribuciones son bienvenidas. Por favor, sigue estos pasos:

1. Haz un Fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Haz commit de tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles. 