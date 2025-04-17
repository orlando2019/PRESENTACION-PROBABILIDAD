document.addEventListener('DOMContentLoaded', function() {
    // Verificación de carga de scripts
    console.log("Script principal cargado correctamente");
    
    // Comprobar si las funciones/objetos de los otros scripts están disponibles
    if (window.location.pathname.includes('geometria.html')) {
        if (typeof DecisionTree === 'undefined') {
            console.error("Error: La clase DecisionTree no está cargada. Verifica que decisionTree.js se cargó correctamente.");
        } else {
            console.log("DecisionTree cargado correctamente");
        }
    }
    
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
                    {name: "Roja (2/4)", value: 0.3},
                    {name: "Azul (2/4)", value: 0.3}
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
            if (d.data.name.includes("Roja")) return "#d6292c";
            if (d.data.name.includes("Azul")) return "#1e56a0";
            return "#fff";
        });

    // Añadir texto a los nodos
    node.append("text")
        .attr("dy", ".35em")
        .attr("x", d => d.children ? -13 : 13)
        .style("text-anchor", d => d.children ? "end" : "start")
        .text(d => d.data.name);

    // Función para calcular la probabilidad teórica
    function calculateProbability(first, second) {
        if (first === 'Roja' && second === 'Roja') return '1/10';
        if (first === 'Roja' && second === 'Azul') return '3/10';
        if (first === 'Azul' && second === 'Roja') return '3/10';
        if (first === 'Azul' && second === 'Azul') return '3/10';
    }

    // Inicializar MathJax
    if (window.MathJax) {
        MathJax.typeset();
    }

    // Smooth scroll para la navegación
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Establecer el año actual de forma dinámica
    document.getElementById('current-year').textContent = new Date().getFullYear();
}); 