document.addEventListener('DOMContentLoaded', function() {
    // Configuración del diagrama de árbol
    const margin = {top: 20, right: 120, bottom: 20, left: 120};
    const width = 960 - margin.left - margin.right;
    const height = 800 - margin.top - margin.bottom;

    const svg = d3.select("#geometry-tree")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Datos para el árbol de decisiones
    const treeData = {
        name: "¿Qué figura quieres clasificar?",
        children: [
            {
                name: "Tiene lados rectos",
                children: [
                    {
                        name: "3 lados",
                        type: "triangle",
                        children: [
                            {
                                name: "Todos los lados iguales",
                                result: {
                                    name: "Triángulo Equilátero",
                                    type: "triangle",
                                    properties: [
                                        "Tres lados iguales",
                                        "Tres ángulos iguales (60°)",
                                        "Simétrico respecto a tres ejes"
                                    ]
                                }
                            },
                            {
                                name: "Dos lados iguales",
                                result: {
                                    name: "Triángulo Isósceles",
                                    type: "triangle",
                                    properties: [
                                        "Dos lados iguales",
                                        "Dos ángulos iguales",
                                        "Un eje de simetría"
                                    ]
                                }
                            },
                            {
                                name: "Ningún lado igual",
                                children: [
                                    {
                                        name: "Con ángulo recto",
                                        result: {
                                            name: "Triángulo Rectángulo Escaleno",
                                            type: "triangle",
                                            properties: [
                                                "Ningún lado igual",
                                                "Un ángulo recto (90°)",
                                                "Cumple Teorema de Pitágoras"
                                            ]
                                        }
                                    },
                                    {
                                        name: "Sin ángulo recto",
                                        result: {
                                            name: "Triángulo Escaleno",
                                            type: "triangle",
                                            properties: [
                                                "Ningún lado igual",
                                                "Ningún ángulo igual",
                                                "Sin ejes de simetría"
                                            ]
                                        }
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: "4 lados",
                        type: "quadrilateral",
                        children: [
                            {
                                name: "Todos los lados paralelos dos a dos",
                                children: [
                                    {
                                        name: "Todos los lados iguales",
                                        children: [
                                            {
                                                name: "Todos los ángulos rectos",
                                                result: {
                                                    name: "Cuadrado",
                                                    type: "quadrilateral",
                                                    properties: [
                                                        "Cuatro lados iguales",
                                                        "Cuatro ángulos rectos (90°)",
                                                        "Diagonales iguales y perpendiculares",
                                                        "Cuatro ejes de simetría"
                                                    ]
                                                }
                                            },
                                            {
                                                name: "Ángulos no rectos",
                                                result: {
                                                    name: "Rombo",
                                                    type: "quadrilateral",
                                                    properties: [
                                                        "Cuatro lados iguales",
                                                        "Ángulos opuestos iguales",
                                                        "Diagonales perpendiculares",
                                                        "Dos ejes de simetría"
                                                    ]
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        name: "Lados opuestos iguales",
                                        children: [
                                            {
                                                name: "Todos los ángulos rectos",
                                                result: {
                                                    name: "Rectángulo",
                                                    type: "quadrilateral",
                                                    properties: [
                                                        "Lados opuestos iguales",
                                                        "Cuatro ángulos rectos (90°)",
                                                        "Diagonales iguales",
                                                        "Dos ejes de simetría"
                                                    ]
                                                }
                                            },
                                            {
                                                name: "Ángulos no rectos",
                                                result: {
                                                    name: "Paralelogramo",
                                                    type: "quadrilateral",
                                                    properties: [
                                                        "Lados opuestos iguales y paralelos",
                                                        "Ángulos opuestos iguales",
                                                        "Sin ejes de simetría"
                                                    ]
                                                }
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                name: "Solo un par de lados paralelos",
                                result: {
                                    name: "Trapecio",
                                    type: "quadrilateral",
                                    properties: [
                                        "Un par de lados paralelos",
                                        "Suma de ángulos internos = 360°",
                                        "Puede tener un eje de simetría (trapecio isósceles)"
                                    ]
                                }
                            },
                            {
                                name: "Ningún lado paralelo",
                                result: {
                                    name: "Cuadrilátero Irregular",
                                    type: "quadrilateral",
                                    properties: [
                                        "Ningún lado paralelo",
                                        "Suma de ángulos internos = 360°",
                                        "Sin ejes de simetría"
                                    ]
                                }
                            }
                        ]
                    },
                    {
                        name: "Más de 4 lados",
                        type: "polygon",
                        children: [
                            {
                                name: "Todos los lados y ángulos iguales",
                                children: [
                                    {
                                        name: "5 lados",
                                        result: {
                                            name: "Pentágono Regular",
                                            type: "polygon",
                                            properties: [
                                                "5 lados iguales",
                                                "5 ángulos iguales (108°)",
                                                "5 ejes de simetría",
                                                "Suma de ángulos internos = 540°"
                                            ]
                                        }
                                    },
                                    {
                                        name: "6 lados",
                                        result: {
                                            name: "Hexágono Regular",
                                            type: "polygon",
                                            properties: [
                                                "6 lados iguales",
                                                "6 ángulos iguales (120°)",
                                                "6 ejes de simetría",
                                                "Suma de ángulos internos = 720°"
                                            ]
                                        }
                                    },
                                    {
                                        name: "Otro número de lados",
                                        input: "number",
                                        inputLabel: "¿Cuántos lados tiene?",
                                        inputProcessor: function(value) {
                                            const n = parseInt(value);
                                            if (n < 3) return null;
                                            
                                            return {
                                                name: `Polígono Regular de ${n} lados`,
                                                type: "polygon",
                                                properties: [
                                                    `${n} lados iguales`,
                                                    `${n} ángulos iguales (${((n-2)*180/n).toFixed(1)}°)`,
                                                    `${n} ejes de simetría`,
                                                    `Suma de ángulos internos = ${(n-2)*180}°`
                                                ]
                                            };
                                        }
                                    }
                                ]
                            },
                            {
                                name: "Lados o ángulos no iguales",
                                result: {
                                    name: "Polígono Irregular",
                                    type: "polygon",
                                    properties: [
                                        "Lados de diferentes longitudes",
                                        "Ángulos de diferentes medidas",
                                        "Sin simetría regular",
                                        "Suma de ángulos internos = (n-2) × 180°"
                                    ]
                                }
                            }
                        ]
                    }
                ]
            },
            {
                name: "Tiene lados curvos",
                children: [
                    {
                        name: "Forma circular perfecta",
                        result: {
                            name: "Círculo",
                            type: "circle",
                            properties: [
                                "Todos los puntos equidistantes del centro",
                                "Perímetro = 2πr",
                                "Área = πr²",
                                "Infinitos ejes de simetría"
                            ]
                        }
                    },
                    {
                        name: "Forma ovalada",
                        result: {
                            name: "Elipse",
                            type: "circle",
                            properties: [
                                "Dos ejes (mayor y menor)",
                                "Dos focos",
                                "Dos ejes de simetría",
                                "Perímetro ≈ 2π√[(a² + b²)/2]"
                            ]
                        }
                    }
                ]
            }
        ]
    };

    // Configuración del layout del árbol
    const treeLayout = d3.tree()
        .size([height, width]);

    // Función para colapsar nodos
    function collapse(d) {
        if (d.children) {
            d._children = d.children;
            d._children.forEach(collapse);
            d.children = null;
        }
    }

    // Función para expandir un nodo
    function expand(d) {
        if (d._children) {
            d.children = d._children;
            d._children = null;
        }
    }

    // Función para actualizar el árbol
    let i = 0;
    function update(source) {
        // Crear la jerarquía y calcular posiciones
        const root = d3.hierarchy(treeData, d => d.children);
        root.x0 = height / 2;
        root.y0 = 0;
        
        // Si el source es el nodo raíz y viene de collapseAll, 
        // asegurarse de que sus hijos estén colapsados
        if (source === root || source.depth === 0) {
            if (root.children) {
                // Preservar los nodos colapsados
                root.children.forEach(child => {
                    // Si el nodo source tiene _children (está colapsado)
                    // colapsar también los nodos hijos correspondientes
                    const sourceChild = source.children ? 
                        source.children.find(sc => sc.data.name === child.data.name) : null;
                    
                    if (sourceChild && sourceChild._children) {
                        child._children = child.children;
                        child.children = null;
                    }
                });
            }
        }
        
        const nodes = treeLayout(root);
        
        // Actualizar los nodos
        const node = svg.selectAll('g.node')
            .data(nodes.descendants(), d => d.id || (d.id = ++i));
        
        // Entrar a nuevos nodos
        const nodeEnter = node.enter().append('g')
            .attr('class', 'node')
            .attr('transform', d => `translate(${source.y0},${source.x0})`)
            .on('click', clicked);
        
        // Añadir círculos a los nodos
        nodeEnter.append('circle')
            .attr('r', 10)
            .style('fill', d => {
                if (d.data.type === 'triangle') return '#d4f1f9';
                if (d.data.type === 'quadrilateral') return '#ffe5e5';
                if (d.data.type === 'polygon') return '#f9e5ff';
                if (d.data.type === 'circle') return '#e5ffe5';
                return '#fff';
            })
            .attr('stroke', '#555')
            .attr('stroke-width', 1.5);
        
        // Añadir etiquetas
        nodeEnter.append('text')
            .attr('dy', '.35em')
            .attr('x', d => d.children || d._children ? -13 : 13)
            .attr('text-anchor', d => d.children || d._children ? 'end' : 'start')
            .text(d => d.data.name)
            .style('fill-opacity', 1);
        
        // Actualizar posición de los nodos existentes
        const nodeUpdate = nodeEnter.merge(node);
        
        nodeUpdate.transition()
            .duration(750)
            .attr('transform', d => `translate(${d.y},${d.x})`);
        
        // Actualizar apariencia de los nodos
        nodeUpdate.select('circle')
            .attr('r', 10)
            .style('fill', d => {
                if (d.data.type === 'triangle') return '#d4f1f9';
                if (d.data.type === 'quadrilateral') return '#ffe5e5';
                if (d.data.type === 'polygon') return '#f9e5ff';
                if (d.data.type === 'circle') return '#e5ffe5';
                if (d._children) return '#ffca7a';
                return '#fff';
            });
        
        // Salida de los nodos
        const nodeExit = node.exit().transition()
            .duration(750)
            .attr('transform', d => `translate(${source.y},${source.x})`)
            .remove();
        
        nodeExit.select('circle')
            .attr('r', 0);
        
        nodeExit.select('text')
            .style('fill-opacity', 0);
        
        // Actualizar los enlaces
        const links = nodes.descendants().slice(1);
        const link = svg.selectAll('path.link')
            .data(links, d => d.id);
        
        // Entrar a nuevos enlaces
        const linkEnter = link.enter().insert('path', 'g')
            .attr('class', 'link')
            .attr('d', d => {
                const o = {x: source.x0, y: source.y0};
                return diagonal(o, o);
            });
        
        // Actualizar enlaces existentes
        linkEnter.merge(link).transition()
            .duration(750)
            .attr('d', d => diagonal(d, d.parent));
        
        // Remover enlaces salientes
        link.exit().transition()
            .duration(750)
            .attr('d', d => {
                const o = {x: source.x, y: source.y};
                return diagonal(o, o);
            })
            .remove();
        
        // Almacenar posición anterior para transición
        nodes.descendants().forEach(d => {
            d.x0 = d.x;
            d.y0 = d.y;
        });
    }

    // Función para dibujar línea diagonal entre nodos
    function diagonal(s, d) {
        const path = `M ${s.y} ${s.x}
                 C ${(s.y + d.y) / 2} ${s.x},
                   ${(s.y + d.y) / 2} ${d.x},
                   ${d.y} ${d.x}`;
        return path;
    }

    // Manejo de clics en nodos
    function clicked(d) {
        // Guardar el estado anterior para comparar
        const wasExpanded = d.children ? true : false;
        
        // Alternar el estado del nodo (expandir/colapsar)
        if (d.children) {
            d._children = d.children;
            d.children = null;
        } else {
            d.children = d._children;
            d._children = null;
        }
        
        // Actualizar el árbol
        update(d);
        
        // Actualizar la referencia global a la estructura del árbol
        currentTree = d.parent ? d.parent : d;
        
        // Mostrar pregunta o resultado solo si estamos expandiendo
        if (!wasExpanded) {
            if (d.data.result) {
                showResult(d.data.result);
            } else if (d.data.input === 'number') {
                showNumericInput(d.data);
            } else {
                showQuestion(d);
            }
        }
    }

    // Mostrar pregunta actual
    function showQuestion(node) {
        const questionPanel = document.getElementById('question-panel');
        const resultPanel = document.getElementById('result-panel');
        const currentQuestion = document.getElementById('current-question');
        const answerButtons = document.getElementById('answer-buttons');
        const inputContainer = document.getElementById('input-container');
        
        // Mostrar panel de preguntas y ocultar resultados
        questionPanel.classList.remove('d-none');
        resultPanel.classList.add('d-none');
        inputContainer.classList.add('d-none');
        
        // Establecer pregunta
        currentQuestion.textContent = node.data.name;
        
        // Limpiar botones anteriores
        answerButtons.innerHTML = '';
        
        // Crear botones para las opciones
        if (node.children || node._children) {
            const children = node.children || node._children;
            children.forEach(child => {
                const btn = document.createElement('button');
                btn.className = 'btn btn-outline-primary m-2';
                btn.textContent = child.data.name;
                btn.setAttribute('aria-label', `Seleccionar: ${child.data.name}`);
                btn.addEventListener('click', function() {
                    // Encontrar y hacer clic en el nodo correspondiente
                    svg.selectAll('g.node').each(function(d) {
                        if (d.data.name === child.data.name && d.parent && d.parent.data.name === node.data.name) {
                            clicked(d);
                        }
                    });
                });
                answerButtons.appendChild(btn);
            });
        }
    }

    // Mostrar entrada numérica
    function showNumericInput(nodeData) {
        const questionPanel = document.getElementById('question-panel');
        const resultPanel = document.getElementById('result-panel');
        const currentQuestion = document.getElementById('current-question');
        const answerButtons = document.getElementById('answer-buttons');
        const inputContainer = document.getElementById('input-container');
        const numericInput = document.getElementById('numeric-input');
        const submitBtn = document.getElementById('submit-input');
        
        // Mostrar panel de preguntas y entrada numérica
        questionPanel.classList.remove('d-none');
        resultPanel.classList.add('d-none');
        inputContainer.classList.remove('d-none');
        answerButtons.innerHTML = '';
        
        currentQuestion.textContent = nodeData.inputLabel || '¿Cuántos lados tiene?';
        
        // Configurar input
        numericInput.value = '';
        numericInput.focus();
        
        // Configurar botón de envío
        submitBtn.onclick = function() {
            const value = numericInput.value;
            if (value && !isNaN(value) && parseInt(value) >= 3) {
                const result = nodeData.inputProcessor(value);
                if (result) {
                    showResult(result);
                }
            } else {
                alert('Por favor, ingresa un número válido de lados (mínimo 3)');
            }
        };
    }

    // Mostrar resultado
    function showResult(result) {
        const questionPanel = document.getElementById('question-panel');
        const resultPanel = document.getElementById('result-panel');
        const resultContent = document.getElementById('result-content');
        
        // Ocultar preguntas y mostrar resultados
        questionPanel.classList.add('d-none');
        resultPanel.classList.remove('d-none');
        
        // Crear contenido del resultado
        let html = `
            <div class="figure-info ${result.type}">
                <h3>${result.name}</h3>
                <p><strong>Propiedades:</strong></p>
                <ul>
        `;
        
        result.properties.forEach(prop => {
            html += `<li>${prop}</li>`;
        });
        
        html += `
                </ul>
                <button id="restart-btn" class="btn btn-primary mt-3">Clasificar otra figura</button>
            </div>
        `;
        
        resultContent.innerHTML = html;
        
        // Añadir evento al botón de reinicio
        document.getElementById('restart-btn').addEventListener('click', resetTree);
    }

    // Función para expandir todos los nodos
    function expandAll() {
        // Limpiar completamente el SVG y recrear el árbol desde cero
        svg.selectAll('*').remove();
        
        // Recrear la jerarquía desde los datos originales
        const rootData = d3.hierarchy(treeData);
        rootData.x0 = height / 2;
        rootData.y0 = 0;
        
        // Expandir todos los nodos recursivamente
        function expandDeep(node) {
            if (node._children) {
                node.children = node._children;
                node._children = null;
            }
            
            if (node.children) {
                node.children.forEach(expandDeep);
            }
        }
        
        // Asegurarse de expandir desde el nodo raíz
        expandDeep(rootData);
        
        // Actualizar la referencia global
        currentTree = rootData;
        
        // Actualizar el árbol con la nueva estructura expandida
        update(rootData);
    }

    // Función para reiniciar el árbol
    function resetTree() {
        // Limpiar completamente el SVG y recrear el árbol desde cero
        svg.selectAll('*').remove();
        
        // Recrear la jerarquía desde los datos originales
        const rootData = d3.hierarchy(treeData);
        rootData.x0 = height / 2;
        rootData.y0 = 0;
        
        // Colapsar todos los nodos excepto el primer nivel
        if (rootData.children) {
            rootData.children.forEach(collapse);
        }
        
        // Actualizar la referencia global
        currentTree = rootData;
        
        // Actualizar el árbol
        update(rootData);
        
        // Ocultar paneles de resultados y preguntas
        document.getElementById('result-panel').classList.add('d-none');
        document.getElementById('question-panel').classList.remove('d-none');
        document.getElementById('current-question').textContent = 'Selecciona una opción en el árbol para comenzar...';
        document.getElementById('answer-buttons').innerHTML = '';
        document.getElementById('input-container').classList.add('d-none');
    }

    // Función para colapsar todos los nodos excepto el raíz
    function collapseAll() {
        // Limpiar completamente el SVG y recrear el árbol desde cero
        svg.selectAll('*').remove();
        
        // Recrear la jerarquía desde los datos originales
        const rootData = d3.hierarchy(treeData);
        rootData.x0 = height / 2;
        rootData.y0 = 0;
        
        // Colapsar todos los nodos recursivamente
        function collapseDeep(node) {
            if (node.children) {
                node._children = node.children;
                node._children.forEach(collapseDeep);
                node.children = null;
            }
        }
        
        // Aplicar colapso a todos los hijos del nodo raíz
        if (rootData.children) {
            rootData.children.forEach(collapseDeep);
        }
        
        // Actualizar la referencia global
        currentTree = rootData;
        
        // Actualizar el árbol con la nueva estructura colapsada
        update(rootData);
        
        // Reiniciar el panel de preguntas
        document.getElementById('question-panel').classList.remove('d-none');
        document.getElementById('result-panel').classList.add('d-none');
        document.getElementById('current-question').textContent = 'Selecciona una opción en el árbol para comenzar...';
        document.getElementById('answer-buttons').innerHTML = '';
        document.getElementById('input-container').classList.add('d-none');
    }

    // Configurar botones
    document.getElementById('reset-tree-btn').addEventListener('click', resetTree);
    document.getElementById('expand-all-btn').addEventListener('click', expandAll);
    document.getElementById('collapse-all-btn').addEventListener('click', function() {
        // Asegurarse de que se limpie completamente antes de colapsar
        collapseAll();
    });
    document.getElementById('start-simulation-btn').addEventListener('click', startGuidedSimulation);

    // Variables para la simulación guiada
    let currentSimulationStep = 0;
    const simulationSteps = [
        {
            title: "Paso 1: Selecciona el tipo de figura",
            question: "¿La figura que deseas clasificar tiene lados rectos o curvos?",
            options: [
                { text: "Tiene lados rectos", nextStep: 1, nodeName: "Tiene lados rectos" },
                { text: "Tiene lados curvos", nextStep: 5, nodeName: "Tiene lados curvos" }
            ],
            progress: 10
        },
        {
            title: "Paso 2: Número de lados",
            question: "¿Cuántos lados tiene la figura?",
            options: [
                { text: "3 lados", nextStep: 2, nodeName: "3 lados" },
                { text: "4 lados", nextStep: 3, nodeName: "4 lados" },
                { text: "Más de 4 lados", nextStep: 4, nodeName: "Más de 4 lados" }
            ],
            progress: 30
        },
        {
            title: "Paso 3: Clasificación de triángulos",
            question: "¿Cómo son los lados del triángulo?",
            options: [
                { text: "Todos los lados iguales", nextStep: "result", nodeName: "Todos los lados iguales", result: "Triángulo Equilátero" },
                { text: "Dos lados iguales", nextStep: "result", nodeName: "Dos lados iguales", result: "Triángulo Isósceles" },
                { text: "Ningún lado igual", nextStep: 2.1, nodeName: "Ningún lado igual" }
            ],
            progress: 50
        },
        {
            title: "Paso 3: Clasificación de cuadriláteros",
            question: "¿Cómo son los lados del cuadrilátero?",
            options: [
                { text: "Todos los lados paralelos dos a dos", nextStep: 3.1, nodeName: "Todos los lados paralelos dos a dos" },
                { text: "Solo un par de lados paralelos", nextStep: "result", nodeName: "Solo un par de lados paralelos", result: "Trapecio" },
                { text: "Ningún lado paralelo", nextStep: "result", nodeName: "Ningún lado paralelo", result: "Cuadrilátero Irregular" }
            ],
            progress: 50
        },
        {
            title: "Paso 3: Clasificación de polígonos",
            question: "¿Cómo son los lados y ángulos del polígono?",
            options: [
                { text: "Todos los lados y ángulos iguales", nextStep: 4.1, nodeName: "Todos los lados y ángulos iguales" },
                { text: "Lados o ángulos no iguales", nextStep: "result", nodeName: "Lados o ángulos no iguales", result: "Polígono Irregular" }
            ],
            progress: 50
        },
        {
            title: "Paso 2: Forma de la curva",
            question: "¿Qué forma tiene la figura curva?",
            options: [
                { text: "Forma circular perfecta", nextStep: "result", nodeName: "Forma circular perfecta", result: "Círculo" },
                { text: "Forma ovalada", nextStep: "result", nodeName: "Forma ovalada", result: "Elipse" }
            ],
            progress: 50
        },
        // Paso 2.1 (subpaso de triángulos con ningún lado igual)
        {
            id: 2.1,
            title: "Paso 3.1: Tipo de ángulos",
            question: "¿El triángulo tiene algún ángulo recto?",
            options: [
                { text: "Con ángulo recto", nextStep: "result", nodeName: "Con ángulo recto", result: "Triángulo Rectángulo Escaleno" },
                { text: "Sin ángulo recto", nextStep: "result", nodeName: "Sin ángulo recto", result: "Triángulo Escaleno" }
            ],
            progress: 70
        },
        // Paso 3.1 (subpaso de cuadriláteros con lados paralelos)
        {
            id: 3.1,
            title: "Paso 3.1: Igualdad de lados",
            question: "¿Cómo son los lados del paralelogramo?",
            options: [
                { text: "Todos los lados iguales", nextStep: 3.2, nodeName: "Todos los lados iguales" },
                { text: "Lados opuestos iguales", nextStep: 3.3, nodeName: "Lados opuestos iguales" }
            ],
            progress: 70
        },
        // Paso 3.2 (subpaso de paralelogramo con lados iguales)
        {
            id: 3.2,
            title: "Paso 3.2: Ángulos del cuadrilátero",
            question: "¿Cómo son los ángulos del cuadrilátero?",
            options: [
                { text: "Todos los ángulos rectos", nextStep: "result", nodeName: "Todos los ángulos rectos", result: "Cuadrado" },
                { text: "Ángulos no rectos", nextStep: "result", nodeName: "Ángulos no rectos", result: "Rombo" }
            ],
            progress: 90
        },
        // Paso 3.3 (subpaso de paralelogramo con lados opuestos iguales)
        {
            id: 3.3,
            title: "Paso 3.3: Ángulos del paralelogramo",
            question: "¿Cómo son los ángulos del paralelogramo?",
            options: [
                { text: "Todos los ángulos rectos", nextStep: "result", nodeName: "Todos los ángulos rectos", result: "Rectángulo" },
                { text: "Ángulos no rectos", nextStep: "result", nodeName: "Ángulos no rectos", result: "Paralelogramo" }
            ],
            progress: 90
        },
        // Paso 4.1 (subpaso de polígonos regulares)
        {
            id: 4.1,
            title: "Paso 3.1: Número de lados del polígono regular",
            question: "¿Cuántos lados tiene el polígono regular?",
            options: [
                { text: "5 lados", nextStep: "result", nodeName: "5 lados", result: "Pentágono Regular" },
                { text: "6 lados", nextStep: "result", nodeName: "6 lados", result: "Hexágono Regular" },
                { text: "Otro número de lados", nextStep: "input", nodeName: "Otro número de lados" }
            ],
            progress: 70
        }
    ];

    // Iniciar simulación guiada
    function startGuidedSimulation() {
        // Ocultar panel de preguntas normal y mostrar panel de simulación
        document.getElementById('question-panel').classList.add('d-none');
        document.getElementById('result-panel').classList.add('d-none');
        document.getElementById('simulation-panel').classList.remove('d-none');
        
        // Reiniciar el árbol
        resetTree();
        
        // Iniciar la simulación desde el primer paso
        currentSimulationStep = 0;
        showSimulationStep(0);
    }
    
    // Mostrar paso de simulación
    function showSimulationStep(stepIndex) {
        const step = findStepById(stepIndex);
        if (!step) return;
        
        const simStepDiv = document.getElementById('simulation-step');
        const progressBar = document.querySelector('#simulation-progress .progress-bar');
        
        // Actualizar contenido del paso
        simStepDiv.innerHTML = `
            <h6 class="mb-2">${step.title}</h6>
            <p>${step.question}</p>
            <div class="text-center" id="sim-options">
                ${step.options.map(option => 
                    `<button class="btn btn-outline-primary m-1 sim-option-btn" 
                     data-next-step="${option.nextStep}" 
                     data-node-name="${option.nodeName}"
                     ${option.result ? `data-result="${option.result}"` : ''}>
                        ${option.text}
                     </button>`
                ).join('')}
            </div>
        `;
        
        // Actualizar barra de progreso
        progressBar.style.width = `${step.progress}%`;
        progressBar.setAttribute('aria-valuenow', step.progress);
        progressBar.textContent = `${step.progress}%`;
        
        // Configurar eventos para los botones de opciones
        document.querySelectorAll('.sim-option-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const nextStep = this.getAttribute('data-next-step');
                const nodeName = this.getAttribute('data-node-name');
                
                // Encontrar y hacer clic en el nodo correspondiente en el árbol
                highlightNodeInTree(nodeName);
                
                // Si es un resultado final
                if (nextStep === "result") {
                    const resultName = this.getAttribute('data-result');
                    completeSimulation(resultName);
                } 
                // Si es una entrada numérica
                else if (nextStep === "input") {
                    showNumericInputInSimulation();
                }
                // Pasar al siguiente paso
                else {
                    currentSimulationStep = parseFloat(nextStep);
                    showSimulationStep(currentSimulationStep);
                }
            });
        });
    }
    
    // Encontrar paso por ID (puede ser número o decimal)
    function findStepById(stepId) {
        return simulationSteps.find(step => 
            (step.id === stepId) || 
            (step.id === undefined && simulationSteps.indexOf(step) === stepId)
        );
    }
    
    // Encontrar y resaltar nodo en el árbol
    function highlightNodeInTree(nodeName) {
        // Primero expandir todo para asegurar que todos los nodos estén visibles
        expandAll();
        
        // Buscar el nodo por nombre y resaltarlo
        svg.selectAll('g.node').each(function(d) {
            if (d.data.name === nodeName) {
                // Resaltar este nodo
                d3.select(this).select('circle')
                    .transition()
                    .duration(500)
                    .attr('r', 15)
                    .style('fill', '#ffca7a')
                    .style('stroke', '#ff5733')
                    .style('stroke-width', 3);
                
                // Simular clic en el nodo si tiene children o _children
                if (d.children || d._children) {
                    setTimeout(() => clicked(d), 500);
                }
            }
        });
    }
    
    // Mostrar entrada numérica en la simulación
    function showNumericInputInSimulation() {
        const simStepDiv = document.getElementById('simulation-step');
        
        simStepDiv.innerHTML = `
            <h6 class="mb-2">Paso 3.2: Número exacto de lados</h6>
            <p>Ingresa el número de lados del polígono regular:</p>
            <div class="form-group">
                <input type="number" id="sim-numeric-input" class="form-control" min="7" max="20" value="7">
                <button id="sim-submit-input" class="btn btn-primary mt-2">Enviar</button>
            </div>
        `;
        
        document.getElementById('sim-submit-input').addEventListener('click', function() {
            const numLados = parseInt(document.getElementById('sim-numeric-input').value);
            if (numLados && numLados >= 7) {
                completeSimulation(`Polígono Regular de ${numLados} lados`);
            } else {
                alert('Por favor, ingresa un número válido de lados (mínimo 7)');
            }
        });
    }
    
    // Completar simulación y mostrar resultado
    function completeSimulation(resultName) {
        // Actualizar progreso a 100%
        const progressBar = document.querySelector('#simulation-progress .progress-bar');
        progressBar.style.width = '100%';
        progressBar.setAttribute('aria-valuenow', 100);
        progressBar.textContent = '100%';
        
        // Buscar el resultado en el árbol de datos
        let resultData = null;
        
        // Función recursiva para buscar el resultado en el árbol
        function findResultInData(node) {
            if (node.result && node.name === resultName) {
                return node;
            }
            
            if (node.children) {
                for (const child of node.children) {
                    const found = findResultInData(child);
                    if (found) return found;
                }
            }
            
            return null;
        }
        
        // Buscar en los nodos de lados rectos
        const straightNode = treeData.children.find(c => c.name === "Tiene lados rectos");
        if (straightNode) {
            resultData = findResultInData(straightNode);
        }
        
        // Si no se encontró, buscar en los nodos de lados curvos
        if (!resultData) {
            const curvedNode = treeData.children.find(c => c.name === "Tiene lados curvos");
            if (curvedNode) {
                resultData = findResultInData(curvedNode);
            }
        }
        
        // Mostrar el resultado final
        const simStepDiv = document.getElementById('simulation-step');
        
        if (resultData && resultData.result) {
            const result = resultData.result;
            
            simStepDiv.innerHTML = `
                <div class="figure-info ${result.type || ''}">
                    <h4 class="text-success">¡Clasificación completa!</h4>
                    <h3>${result.name || resultName}</h3>
                    <p><strong>Propiedades:</strong></p>
                    <ul>
                        ${result.properties ? result.properties.map(prop => `<li>${prop}</li>`).join('') : ''}
                    </ul>
                </div>
            `;
        } else {
            // Si no encontramos los datos exactos, mostrar al menos el nombre
            simStepDiv.innerHTML = `
                <div class="figure-info">
                    <h4 class="text-success">¡Clasificación completa!</h4>
                    <h3>${resultName}</h3>
                    <p>Has identificado correctamente la figura geométrica.</p>
                </div>
            `;
        }
    }
    
    // Reiniciar simulación
    document.getElementById('sim-reset-btn').addEventListener('click', function() {
        startGuidedSimulation();
    });

    // Inicializar el árbol
    const root = d3.hierarchy(treeData);
    root.x0 = height / 2;
    root.y0 = 0;
    
    // Colapsar nodos inicialmente excepto el primero
    root.children.forEach(collapse);
    
    // Variable global para mantener referencia al árbol actual
    let currentTree = root;
    
    // Mostrar el árbol
    update(root);
}); 