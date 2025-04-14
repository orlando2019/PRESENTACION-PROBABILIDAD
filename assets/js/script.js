// Configuración inicial
const treeData = {
    balls: { red: 2, blue: 3 },
    totalBalls: 5
};

// Función para simular una extracción
function simulateExtraction() {
    const results = {
        'Roja-Roja': 0,
        'Roja-Azul': 0,
        'Azul-Roja': 0,
        'Azul-Azul': 0
    };
    
    const numSimulations = parseInt(document.getElementById('num-simulations').value) || 100;
    
    for (let i = 0; i < numSimulations; i++) {
        // Primera extracción
        const firstBall = Math.random() < (treeData.balls.red / treeData.totalBalls) ? 'Roja' : 'Azul';
        
        // Segunda extracción (dependiente de la primera)
        let secondBall;
        if (firstBall === 'Roja') {
            // Quedan 1 roja y 3 azules
            secondBall = Math.random() < (1/4) ? 'Roja' : 'Azul';
        } else {
            // Quedan 2 rojas y 2 azules
            secondBall = Math.random() < (1/2) ? 'Roja' : 'Azul';
        }
        
        results[`${firstBall}-${secondBall}`]++;
    }
    
    displayResults(results, numSimulations);
}

// Función para mostrar los resultados
function displayResults(results, total) {
    const resultsDiv = document.getElementById('simulation-results');
    resultsDiv.innerHTML = `
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">Resultados de ${total} simulaciones:</h5>
                <ul class="list-group">
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        Roja-Roja
                        <span class="badge bg-primary rounded-pill">${(results['Roja-Roja'] / total * 100).toFixed(2)}%</span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        Roja-Azul
                        <span class="badge bg-primary rounded-pill">${(results['Roja-Azul'] / total * 100).toFixed(2)}%</span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        Azul-Roja
                        <span class="badge bg-primary rounded-pill">${(results['Azul-Roja'] / total * 100).toFixed(2)}%</span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        Azul-Azul
                        <span class="badge bg-primary rounded-pill">${(results['Azul-Azul'] / total * 100).toFixed(2)}%</span>
                    </li>
                </ul>
            </div>
        </div>
    `;
}

// Función para reiniciar la simulación
function resetSimulation() {
    document.getElementById('simulation-results').innerHTML = '';
    document.getElementById('num-simulations').value = '100';
}

// Dibujar el diagrama de árbol
function drawTree() {
    const width = 800;
    const height = 400;
    const margin = { top: 20, right: 90, bottom: 30, left: 90 };

    // Limpiar el contenedor antes de dibujar
    d3.select("#tree-diagram").html("");

    const svg = d3.select("#tree-diagram")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    const treeLayout = d3.tree()
        .size([height - margin.top - margin.bottom, width - margin.left - margin.right]);

    const root = d3.hierarchy({
        name: "Inicio",
        children: [
            {
                name: "Roja (2/5)",
                children: [
                    { name: "Roja (1/4)" },
                    { name: "Azul (3/4)" }
                ]
            },
            {
                name: "Azul (3/5)",
                children: [
                    { name: "Roja (1/2)" },
                    { name: "Azul (1/2)" }
                ]
            }
        ]
    });

    const nodes = treeLayout(root);

    // Agregar enlaces
    svg.selectAll(".link")
        .data(nodes.links())
        .enter()
        .append("path")
        .attr("class", "link")
        .attr("d", d3.linkHorizontal()
            .x(d => d.y)
            .y(d => d.x))
        .style("fill", "none")
        .style("stroke", "#ccc")
        .style("stroke-width", "2px");

    // Agregar nodos
    const node = svg.selectAll(".node")
        .data(nodes.descendants())
        .enter()
        .append("g")
        .attr("class", "node")
        .attr("transform", d => `translate(${d.y},${d.x})`);

    node.append("circle")
        .attr("r", 10)
        .style("fill", "#fff")
        .style("stroke", "#4a90e2")
        .style("stroke-width", "2px");

    node.append("text")
        .attr("dy", ".35em")
        .attr("x", d => d.children ? -13 : 13)
        .style("text-anchor", d => d.children ? "end" : "start")
        .text(d => d.data.name);
}

// Inicializar cuando el documento esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Dibujar el diagrama de árbol
    drawTree();
    
    // Agregar event listeners para los botones
    document.getElementById('simulate-btn').addEventListener('click', simulateExtraction);
    document.getElementById('reset-btn').addEventListener('click', resetSimulation);
}); 