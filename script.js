document.addEventListener('DOMContentLoaded', function() {
    // Configuración del diagrama de árbol
    const margin = {top: 20, right: 90, bottom: 30, left: 90};
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3.select("#tree-diagram")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Datos para el diagrama de árbol
    const treeData = {
        name: "Inicio",
        children: [
            {
                name: "Roja (2/5)",
                children: [
                    {name: "Roja (1/4)", value: 0.1},
                    {name: "Azul (3/4)", value: 0.3}
                ]
            },
            {
                name: "Azul (3/5)",
                children: [
                    {name: "Roja (1/2)", value: 0.3},
                    {name: "Azul (1/2)", value: 0.3}
                ]
            }
        ]
    };

    // Configuración del layout del árbol
    const treeLayout = d3.tree()
        .size([height, width]);

    const root = d3.hierarchy(treeData);
    const nodes = treeLayout(root);

    // Dibujar los enlaces
    svg.selectAll(".link")
        .data(nodes.descendants().slice(1))
        .enter()
        .append("path")
        .attr("class", "link")
        .attr("d", d => {
            return "M" + d.y + "," + d.x
                + "C" + (d.y + d.parent.y) / 2 + "," + d.x
                + " " + (d.y + d.parent.y) / 2 + "," + d.parent.x
                + " " + d.parent.y + "," + d.parent.x;
        });

    // Dibujar los nodos
    const node = svg.selectAll(".node")
        .data(nodes.descendants())
        .enter()
        .append("g")
        .attr("class", "node")
        .attr("transform", d => "translate(" + d.y + "," + d.x + ")");

    // Añadir círculos a los nodos
    node.append("circle")
        .attr("r", 10)
        .style("fill", d => {
            if (d.data.name.includes("Roja")) return "#e74c3c";
            if (d.data.name.includes("Azul")) return "#3498db";
            return "#fff";
        });

    // Añadir texto a los nodos
    node.append("text")
        .attr("dy", ".35em")
        .attr("x", d => d.children ? -13 : 13)
        .style("text-anchor", d => d.children ? "end" : "start")
        .text(d => d.data.name);

    // Simulación de extracción
    const simulateBtn = document.getElementById('simulate-btn');
    const resultsDiv = document.getElementById('simulation-results');
    let simulationCount = 0;
    let results = {
        "Roja-Roja": 0,
        "Roja-Azul": 0,
        "Azul-Roja": 0,
        "Azul-Azul": 0
    };

    simulateBtn.addEventListener('click', function() {
        simulationCount++;
        
        // Simular la primera extracción
        const firstDraw = Math.random() < 0.4 ? 'Roja' : 'Azul';
        
        // Simular la segunda extracción basada en la primera
        let secondDraw;
        if (firstDraw === 'Roja') {
            secondDraw = Math.random() < 0.25 ? 'Roja' : 'Azul';
        } else {
            secondDraw = Math.random() < 0.5 ? 'Roja' : 'Azul';
        }

        // Actualizar resultados
        results[`${firstDraw}-${secondDraw}`]++;

        // Calcular frecuencias relativas
        const frequencies = {
            "Roja-Roja": (results["Roja-Roja"] / simulationCount).toFixed(3),
            "Roja-Azul": (results["Roja-Azul"] / simulationCount).toFixed(3),
            "Azul-Roja": (results["Azul-Roja"] / simulationCount).toFixed(3),
            "Azul-Azul": (results["Azul-Azul"] / simulationCount).toFixed(3)
        };

        // Mostrar resultados
        resultsDiv.innerHTML = `
            <h4>Resultados de la Simulación (${simulationCount} intentos):</h4>
            <div class="row">
                <div class="col-md-6">
                    <p><strong>Última extracción:</strong></p>
                    <p>Primera extracción: ${firstDraw}</p>
                    <p>Segunda extracción: ${secondDraw}</p>
                    <p>Probabilidad teórica: ${calculateProbability(firstDraw, secondDraw)}</p>
                </div>
                <div class="col-md-6">
                    <p><strong>Frecuencias relativas:</strong></p>
                    <p>Roja-Roja: ${frequencies["Roja-Roja"]} (teórica: 0.1)</p>
                    <p>Roja-Azul: ${frequencies["Roja-Azul"]} (teórica: 0.3)</p>
                    <p>Azul-Roja: ${frequencies["Azul-Roja"]} (teórica: 0.3)</p>
                    <p>Azul-Azul: ${frequencies["Azul-Azul"]} (teórica: 0.3)</p>
                </div>
            </div>
        `;

        // Resaltar el camino en el diagrama
        highlightPath(firstDraw, secondDraw);
    });

    // Función para calcular la probabilidad teórica
    function calculateProbability(first, second) {
        if (first === 'Roja' && second === 'Roja') return '1/10';
        if (first === 'Roja' && second === 'Azul') return '3/10';
        if (first === 'Azul' && second === 'Roja') return '3/10';
        if (first === 'Azul' && second === 'Azul') return '3/10';
    }

    // Función para resaltar el camino en el diagrama
    function highlightPath(first, second) {
        // Resetear todos los colores
        svg.selectAll(".link")
            .style("stroke", "#ccc")
            .style("stroke-width", 2);

        svg.selectAll(".node circle")
            .style("fill", d => {
                if (d.data.name.includes("Roja")) return "#e74c3c";
                if (d.data.name.includes("Azul")) return "#3498db";
                return "#fff";
            });

        // Resaltar el camino seleccionado
        const path = nodes.descendants().filter(d => {
            if (d.data.name.includes(first) && d.depth === 1) return true;
            if (d.data.name.includes(second) && d.depth === 2) return true;
            return false;
        });

        path.forEach(d => {
            if (d.parent) {
                svg.selectAll(".link")
                    .filter(link => link.source === d.parent && link.target === d)
                    .style("stroke", "#2ecc71")
                    .style("stroke-width", 3);
            }
        });
    }

    // Inicializar MathJax
    if (window.MathJax) {
        MathJax.typeset();
    }

    // Smooth scroll para la navegación
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    function resetSimulation() {
        document.getElementById('simulation-results').innerHTML = '';
    }
}); 