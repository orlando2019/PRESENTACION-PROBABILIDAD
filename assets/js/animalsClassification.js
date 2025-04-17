/**
 * Script para manejar la clasificación de animales utilizando el árbol de decisiones
 * Utiliza la clase DecisionTree de decisionTree.js
 */

// Función global para inicializar la clasificación de animales
// Esta función será llamada cuando se cargue la pestaña de animales
function loadAnimalClassification() {
    console.log("Inicializando la clasificación de animales...");
    initAnimalClassification();
}

// Función para inicializar la clasificación (evita conflictos de alcance)
function initAnimalClassification() {
    // Hacer disponible la referencia para el script de conexión
    window.initAnimalClassification = initAnimalClassification;
    
    // Instancia del árbol de decisiones
    const animalTree = new DecisionTree();
    
    // Datos para visualización del árbol completo
    let treeData = null;
    let treeVisualization = null;

    // Datos del árbol incrustados para evitar problemas de carga del JSON
    const animalTreeData = {
      "name": "AnimalClassification",
      "root": {
        "question": "¿Es un vertebrado?",
        "options": [
          {
            "answer": "Sí",
            "next": {
              "question": "¿Vive en el agua?",
              "options": [
                {
                  "answer": "Sí",
                  "next": {
                    "question": "¿Tiene aletas y branquias?",
                    "options": [
                      {
                        "answer": "Sí",
                        "result": "Pez"
                      },
                      {
                        "answer": "No",
                        "result": "Anfibio"
                      }
                    ]
                  }
                },
                {
                  "answer": "No",
                  "next": {
                    "question": "¿Es de sangre caliente?",
                    "options": [
                      {
                        "answer": "Sí",
                        "next": {
                          "question": "¿Tiene plumas?",
                          "options": [
                            {
                              "answer": "Sí",
                              "result": "Ave"
                            },
                            {
                              "answer": "No",
                              "result": "Mamífero"
                            }
                          ]
                        }
                      },
                      {
                        "answer": "No",
                        "result": "Reptil"
                      }
                    ]
                  }
                }
              ]
            }
          },
          {
            "answer": "No",
            "next": {
              "question": "¿Tiene exoesqueleto?",
              "options": [
                {
                  "answer": "Sí",
                  "next": {
                    "question": "¿Tiene seis patas?",
                    "options": [
                      {
                        "answer": "Sí",
                        "result": "Insecto"
                      },
                      {
                        "answer": "No",
                        "next": {
                          "question": "¿Tiene ocho patas?",
                          "options": [
                            {
                              "answer": "Sí",
                              "result": "Arácnido"
                            },
                            {
                              "answer": "No",
                              "result": "Crustáceo"
                            }
                          ]
                        }
                      }
                    ]
                  }
                },
                {
                  "answer": "No",
                  "next": {
                    "question": "¿Tiene tentáculos?",
                    "options": [
                      {
                        "answer": "Sí",
                        "result": "Molusco"
                      },
                      {
                        "answer": "No",
                        "result": "Gusano"
                      }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    };
    
    // Referencias a elementos del DOM
    const animalsResetBtn = document.getElementById('animals-reset-btn');
    const animalsShowTreeBtn = document.getElementById('animals-show-tree-btn');
    const animalQuestion = document.getElementById('animal-question');
    const animalOptions = document.getElementById('animal-options');
    const animalsTreeContainer = document.getElementById('animals-tree-container');
    const animalsResultPanel = document.getElementById('animals-result-panel');
    const animalsResultContent = document.getElementById('animals-result-content');
    const animalsPath = document.getElementById('animals-path');
    const animalsNewClassificationBtn = document.getElementById('animals-new-classification-btn');
    const predefinedAnimals = document.getElementById('predefined-animals');
    const classifyAnimalBtn = document.getElementById('classify-animal-btn');
    
    // Hacer disponibles las funciones para el script de conexión
    window.handleAnswer = handleAnswer;
    window.animalTree = animalTree;
    window.updateQuestionUI = updateQuestionUI;
    window.classifyAnimalAutomatically = classifyAnimalAutomatically;
    
    // Verificar si todos los elementos del DOM fueron encontrados
    function checkDOMElements() {
        const elements = {
            'animals-reset-btn': animalsResetBtn,
            'animals-show-tree-btn': animalsShowTreeBtn,
            'animal-question': animalQuestion,
            'animal-options': animalOptions,
            'animals-tree-container': animalsTreeContainer,
            'animals-result-panel': animalsResultPanel,
            'animals-result-content': animalsResultContent,
            'animals-path': animalsPath,
            'animals-new-classification-btn': animalsNewClassificationBtn,
            'predefined-animals': predefinedAnimals,
            'classify-animal-btn': classifyAnimalBtn
        };
        
        let missingElements = [];
        
        for (const [id, element] of Object.entries(elements)) {
            if (!element) {
                missingElements.push(id);
                console.error(`Elemento con ID "${id}" no encontrado en el DOM`);
            }
        }
        
        if (missingElements.length > 0) {
            console.error('Elementos faltantes:', missingElements);
            
            // Intenta conectar los botones disponibles
            connectExistingButtons();
            
            if (missingElements.length > 3) {
                // Si faltan muchos elementos, detener la inicialización
                return false;
            }
        }
        
        return true;
    }
    
    // Conectar botones existentes - función auxiliar para manejar casos con elementos faltantes
    function connectExistingButtons() {
        // Conectar botones de respuesta
        const answerOptions = document.querySelectorAll('.answer-option');
        if (answerOptions.length > 0) {
            answerOptions.forEach(button => {
                button.addEventListener('click', function() {
                    const answer = this.dataset.value || this.textContent;
                    handleAnswer({target: {dataset: {answer: answer}}});
                });
            });
        }
        
        // Conectar botones de ejemplo
        const exampleButtons = document.querySelectorAll('.example-animal');
        if (exampleButtons.length > 0) {
            exampleButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const animalType = this.dataset.animal;
                    if (animalType) {
                        const selector = document.getElementById('predefined-animals');
                        if (selector) selector.value = animalType;
                        classifyAnimalAutomatically();
                    }
                });
            });
        }
    }
    
    // Inicializar el árbol de decisiones directamente con los datos incrustados
    function initializeTree() {
        try {
            // Verificar los elementos del DOM
            if (!checkDOMElements()) {
                console.warn('Faltan algunos elementos del DOM. Se intentará una inicialización parcial.');
            }
            
            // Inicializar correctamente el árbol de decisión
            if (!animalTree.loadTree(animalTreeData)) {
                console.error('Error al cargar el árbol de decisión');
                return false;
            }
            
            // Añadir event listeners a los botones
            if (animalsResetBtn) {
                animalsResetBtn.addEventListener('click', resetClassification);
            }
            
            if (animalsNewClassificationBtn) {
                animalsNewClassificationBtn.addEventListener('click', resetClassification);
            }
            
            if (classifyAnimalBtn) {
                classifyAnimalBtn.addEventListener('click', classifyAnimalAutomatically);
            }
            
            // También conectar directamente los botones de respuesta
            const answerButtons = document.querySelectorAll('.answer-option');
            if (answerButtons.length > 0) {
                answerButtons.forEach(button => {
                    button.addEventListener('click', function() {
                        const answer = this.getAttribute('data-value') || this.textContent;
                        handleAnswer({target: {dataset: {answer: answer}}});
                    });
                });
            }
            
            console.log('Árbol de clasificación de animales cargado correctamente');
            updateQuestionUI();
            return true;
        } catch (error) {
            console.error('Error al inicializar el árbol:', error);
            showError('Error al inicializar: ' + error.message);
            return false;
        }
    }
    
    // Actualizar la UI con la pregunta actual
    function updateQuestionUI() {
        try {
            const currentNode = animalTree.currentNode;
            
            if (!currentNode || animalTree.hasResult()) {
                // Si no hay nodo actual o ya llegamos al resultado
                showResult();
                return;
            }
            
            // Actualizar la pregunta
            if (animalQuestion) {
                animalQuestion.textContent = currentNode.question;
            }
            
            // Limpiar opciones anteriores
            if (animalOptions) {
                animalOptions.innerHTML = '';
                
                // Verificar que las opciones existan
                if (currentNode.options && Array.isArray(currentNode.options)) {
                    // Crear botones para cada opción
                    currentNode.options.forEach(option => {
                        if (option && option.answer) {
                            const button = document.createElement('button');
                            button.className = 'btn btn-outline-primary m-2 animal-option';
                            button.textContent = option.answer;
                            button.dataset.answer = option.answer;
                            button.addEventListener('click', handleAnswer);
                            animalOptions.appendChild(button);
                        }
                    });
                } else {
                    console.error('No hay opciones disponibles para la pregunta actual');
                    showError('Error: No hay opciones disponibles');
                }
            }
        } catch (error) {
            console.error('Error al actualizar la UI:', error);
            showError('Error al mostrar la pregunta: ' + error.message);
        }
    }
    
    // Manejar la respuesta del usuario
    function handleAnswer(event) {
        const answer = event.target.dataset.answer;
        
        if (animalTree.answerQuestion(answer)) {
            // Actualizar UI con la siguiente pregunta o resultado
            updateQuestionUI();
            // Actualizar visualización del árbol dinámicamente
            showTreeVisualization();
        } else {
            console.error('Error al procesar la respuesta');
            showError('Hubo un error al procesar tu respuesta. Por favor intenta de nuevo.');
        }
    }
    
    // Mostrar el resultado de la clasificación
    function showResult() {
        const result = animalTree.getResult();
        const path = animalTree.getPath();
        
        if (!result) {
            console.error('No hay resultado para mostrar');
            return;
        }
        
        // Ocultar panel de interacción y mostrar panel de resultados
        if (animalsResultPanel) {
            animalsResultPanel.classList.remove('d-none');
        }
        
        // Determinar el tipo para estilos
        let typeClass = '';
        switch (result.toLowerCase()) {
            case 'pez':
                typeClass = 'fish';
                break;
            case 'anfibio':
                typeClass = 'amphibian';
                break;
            case 'reptil':
                typeClass = 'reptile';
                break;
            case 'ave':
                typeClass = 'bird';
                break;
            case 'mamífero':
                typeClass = 'mammal';
                break;
            case 'insecto':
                typeClass = 'insect';
                break;
            case 'arácnido':
                typeClass = 'arachnid';
                break;
            default:
                if (['pez', 'anfibio', 'reptil', 'ave', 'mamífero'].includes(result.toLowerCase())) {
                    typeClass = 'vertebrate';
                } else {
                    typeClass = 'invertebrate';
                }
        }
        
        // Construir contenido HTML del resultado
        let html = `
            <div class="figure-info ${typeClass}">
                <h3>${result}</h3>
                <p><strong>Características:</strong></p>
                <ul>
        `;
        
        // Añadir características según el tipo de animal
        switch (result.toLowerCase()) {
            case 'pez':
                html += `
                    <li>Vertebrado acuático</li>
                    <li>Respira por branquias</li>
                    <li>Cuerpo cubierto de escamas</li>
                    <li>Utiliza aletas para moverse</li>
                `;
                break;
            case 'anfibio':
                html += `
                    <li>Vertebrado que vive en agua y tierra</li>
                    <li>Piel húmeda sin escamas</li>
                    <li>Metamorfosis en su desarrollo</li>
                    <li>Respira por branquias en fase juvenil y pulmones/piel en fase adulta</li>
                `;
                break;
            case 'reptil':
                html += `
                    <li>Vertebrado terrestre</li>
                    <li>Piel seca con escamas</li>
                    <li>Sangre fría (ectotérmico)</li>
                    <li>Respiración pulmonar</li>
                `;
                break;
            case 'ave':
                html += `
                    <li>Vertebrado con plumas</li>
                    <li>Sangre caliente (endotérmico)</li>
                    <li>Pico sin dientes</li>
                    <li>Adaptación para el vuelo (aunque no todas vuelan)</li>
                `;
                break;
            case 'mamífero':
                html += `
                    <li>Vertebrado con pelo/pelaje</li>
                    <li>Sangre caliente (endotérmico)</li>
                    <li>Glándulas mamarias para alimentar a las crías</li>
                    <li>Respiración pulmonar</li>
                `;
                break;
            case 'insecto':
                html += `
                    <li>Invertebrado con exoesqueleto</li>
                    <li>Cuerpo dividido en cabeza, tórax y abdomen</li>
                    <li>Seis patas</li>
                    <li>A menudo con alas y antenas</li>
                `;
                break;
            case 'arácnido':
                html += `
                    <li>Invertebrado con exoesqueleto</li>
                    <li>Ocho patas</li>
                    <li>Sin antenas</li>
                    <li>Cuerpo dividido en cefalotórax y abdomen</li>
                `;
                break;
            case 'crustáceo':
                html += `
                    <li>Invertebrado acuático con exoesqueleto</li>
                    <li>Diez o más patas</li>
                    <li>Cuerpo segmentado</li>
                    <li>Dos pares de antenas</li>
                `;
                break;
            case 'molusco':
                html += `
                    <li>Invertebrado de cuerpo blando</li>
                    <li>A menudo con concha protectora</li>
                    <li>Cuerpo no segmentado</li>
                    <li>Incluye pulpos, caracoles, almejas, etc.</li>
                `;
                break;
            case 'gusano':
                html += `
                    <li>Invertebrado de cuerpo blando</li>
                    <li>Cuerpo alargado y segmentado</li>
                    <li>Sin patas</li>
                    <li>Movimiento por contracción muscular</li>
                `;
                break;
            default:
                html += `<li>Animal clasificado como ${result}</li>`;
        }
        
        html += `
                </ul>
                <p class="mt-3">Los animales se clasifican en grupos según sus características anatómicas, fisiológicas y genéticas. Esta información es fundamental para comprender la biodiversidad y la evolución.</p>
            </div>
        `;
        
        // Añadir contenido al panel de resultados
        if (animalsResultContent) {
            animalsResultContent.innerHTML = html;
        }
        
        // Mostrar el camino recorrido
        if (animalsPath) {
            let pathHTML = '<strong>Camino recorrido:</strong><br>';
            path.forEach((step, index) => {
                pathHTML += `${index + 1}. ${step.question}: <strong>${step.answer}</strong><br>`;
            });
            animalsPath.innerHTML = pathHTML;
        }
    }
    
    // Mostrar un mensaje de error
    function showError(message) {
        // Crear alerta de Bootstrap
        const alertElement = document.createElement('div');
        alertElement.className = 'alert alert-danger mt-3';
        alertElement.textContent = message;
        console.error(message);
        
        // Añadir al contenedor
        const container = document.querySelector('#animals-interaction') || document.querySelector('.card-body');
        if (container) {
            container.prepend(alertElement);
            
            // Eliminar después de 5 segundos
            setTimeout(() => {
                alertElement.remove();
            }, 5000);
        }
    }
    
    // Reiniciar la clasificación
    function resetClassification() {
        animalTree.reset();
        if (animalsResultPanel) {
            animalsResultPanel.classList.add('d-none');
        }
        updateQuestionUI();
        // Recargo visualización del árbol completo
        showTreeVisualization();
    }
    
    // Mapeo de animales predefinidos a respuestas
    const predefinedAnswers = {
        'pez': ['Sí', 'Sí', 'Sí'],
        'anfibio': ['Sí', 'Sí', 'No'],
        'reptil': ['Sí', 'No', 'No'],
        'ave': ['Sí', 'No', 'Sí', 'Sí'],
        'mamifero': ['Sí', 'No', 'Sí', 'No'],
        'insecto': ['No', 'Sí', 'Sí'],
        'aracnido': ['No', 'Sí', 'No', 'Sí'],
        'crustaceo': ['No', 'Sí', 'No', 'No'],
        'molusco': ['No', 'No', 'Sí'],
        'gusano': ['No', 'No', 'No']
    };
    
    // Clasificar animal automáticamente
    function classifyAnimalAutomatically() {
        if (!predefinedAnimals) {
            showError('No se encontró el selector de animales predefinidos');
            return;
        }
        
        const animalType = predefinedAnimals.value;
        
        if (!animalType) {
            showError('Por favor, selecciona un animal para clasificar');
            return;
        }
        
        const answers = predefinedAnswers[animalType];
        
        if (!answers) {
            showError('No se encontraron respuestas para este animal');
            return;
        }
        
        // Reiniciar árbol y procesar todas las respuestas
        animalTree.reset();
        if (animalTree.processTree(answers)) {
            showResult();
        } else {
            showError('Error al procesar las respuestas');
        }
    }
    
    // Mostrar árbol visual completo
    // Exponemos la funciu00f3n directamente en el objeto global para que pueda ser llamada desde fuera
    initAnimalClassification.showTreeVisualization = function() {
        console.log('Intentando mostrar el árbol de decisiones...');
        
        // Verificar si el contenedor existe
        if (!animalsTreeContainer) {
            console.error('No se encontró el contenedor para el árbol (id: animals-tree-container)');
            // Intentar obtener el contenedor nuevamente
            animalsTreeContainer = document.getElementById('animals-tree-container');
            if (!animalsTreeContainer) {
                showError('No se encontró el contenedor para el árbol');
                return;
            }
        }
        
        // Limpiar contenedor de árbol y calcular dimensiones dinámicas
        animalsTreeContainer.innerHTML = '<div class="text-center mb-3"><i class="fas fa-spinner fa-spin"></i> Generando árbol de decisiones...</div>';
        
        // Dar tiempo para que el DOM se actualice
        setTimeout(() => {
            try {
                // Limpiar contenedor y preparar para SVG
                animalsTreeContainer.innerHTML = '';
                const margin = {top: 20, right: 90, bottom: 30, left: 90};
                const containerRect = animalsTreeContainer.getBoundingClientRect();
                const svgWidth = Math.max(containerRect.width, 600); // Mínimo 600px de ancho
                const svgHeight = Math.max(containerRect.height, 500); // Mínimo 500px de alto
                const width = svgWidth - margin.left - margin.right;
                const height = svgHeight - margin.top - margin.bottom;
                
                // Función para convertir los datos del árbol al formato necesario para D3
                function convertTreeData(node) {
                    if (!node) return null;
                    
                    const result = {
                        name: node.question || node.result,
                        children: []
                    };
                    
                    if (node.options) {
                        node.options.forEach(option => {
                            const child = {
                                name: option.answer,
                                children: []
                            };
                            
                            if (option.result) {
                                child.children.push({
                                    name: option.result
                                });
                            } else if (option.next) {
                                const nextNode = convertTreeData(option.next);
                                if (nextNode) {
                                    child.children.push(nextNode);
                                }
                            }
                            
                            result.children.push(child);
                        });
                    }
                    
                    return result;
                }
                
                // Crear SVG dinámico para llenar 100% del contenedor
                const svg = d3.select('#animals-tree-container')
                    .append('svg')
                    .attr('width', svgWidth)
                    .attr('height', svgHeight)
                    .append('g')
                    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
                
                // Configurar el árbol para ocupar todo el espacio disponible
                const treeLayout = d3.tree().size([height, width]);
                
                // Convertir datos
                const treeJson = convertTreeData(animalTree.root); // Usar root, no currentNode
                
                if (!treeJson) {
                    animalsTreeContainer.innerHTML = '<div class="alert alert-warning">No se pudo generar la visualización del árbol</div>';
                    return;
                }
                
                // Crear jerarquía
                const root = d3.hierarchy(treeJson);
                
                // Calcular posiciones
                treeLayout(root);
                
                // Dibujar enlaces
                svg.selectAll('.link')
                    .data(root.descendants().slice(1))
                    .enter()
                    .append('path')
                    .attr('class', 'link')
                    .attr('d', d => {
                        return 'M' + d.y + ',' + d.x
                            + 'C' + (d.y + d.parent.y) / 2 + ',' + d.x
                            + ' ' + (d.y + d.parent.y) / 2 + ',' + d.parent.x
                            + ' ' + d.parent.y + ',' + d.parent.x;
                    })
                    .style('fill', 'none')
                    .style('stroke', '#ccc')
                    .style('stroke-width', '2px');
                
                // Crear nodos
                const node = svg.selectAll('.node')
                    .data(root.descendants())
                    .enter()
                    .append('g')
                    .attr('class', d => 'node' + (d.children ? ' node--internal' : ' node--leaf'))
                    .attr('transform', d => 'translate(' + d.y + ',' + d.x + ')');
                
                // Añadir círculos a los nodos
                node.append('circle')
                    .attr('r', 10)
                    .style('fill', d => {
                        // Colorear según tipo o nivel
                        if (d.data.name === animalTree.currentNode.question) return '#ffca7a';
                        if (d.data.name.includes('vertebrado')) return '#d4f1f9';
                        if (['Pez', 'Anfibio', 'Reptil', 'Ave', 'Mamífero'].includes(d.data.name)) return '#e5ffe5';
                        if (['Insecto', 'Arácnido', 'Crustáceo', 'Molusco', 'Gusano'].includes(d.data.name)) return '#ffe5e5';
                        return '#ffffff';
                    })
                    .style('stroke', '#4CAF50')
                    .style('stroke-width', '2px');
                
                // Añadir etiquetas de texto
                node.append('text')
                    .attr('dy', '.35em')
                    .attr('x', d => d.children ? -13 : 13)
                    .style('text-anchor', d => d.children ? 'end' : 'start')
                    .text(d => d.data.name)
                    .style('font-size', '12px')
                    .each(function(d) {
                        // Truncar texto muy largo
                        const text = d3.select(this);
                        if (text.node().getComputedTextLength() > 120) {
                            let shortText = d.data.name.substring(0, 20) + '...';
                            text.text(shortText);
                        }
                    });
                    
                // Botón para cerrar el árbol
                const closeButton = document.createElement('button');
                    closeButton.className = 'btn btn-warning hide-tree-btn';
                    closeButton.innerHTML = '<i class="fas fa-eye-slash mr-1"></i> Ocultar Árbol';
                    closeButton.addEventListener('click', function() {
                        animalsTreeContainer.classList.add('d-none');
                    });
                    
                    animalsTreeContainer.prepend(closeButton);
                    console.log('Árbol de decisiones mostrado correctamente');
                } catch (error) {
                    console.error('Error al mostrar el árbol:', error);
                    animalsTreeContainer.innerHTML = '<div class="alert alert-danger">Error al generar el árbol: ' + error.message + '</div>';
                }
            }, 100); // Fin del setTimeout
        }
    
    // Inicializar cuando se cargue el DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeTree);
    } else {
        initializeTree();
    }

    // Mostrar el árbol de decisiones automáticamente al cargar la página
    if (typeof initAnimalClassification.showTreeVisualization === 'function') {
        initAnimalClassification.showTreeVisualization();
    }
}

// Iniciar la clasificación de animales si esta página se carga directamente
document.addEventListener('DOMContentLoaded', function() {
    // Verificar si estamos en la página de animales
    if (window.location.pathname.includes('animales.html')) {
        loadAnimalClassification();
    }
}); 