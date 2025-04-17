/**
 * Clase DecisionTree: Estructura para manejar árboles de decisión
 * Esta clase permite cargar, navegar y procesar árboles de decisión
 * para aplicaciones de clasificación y diagnóstico.
 */
class DecisionTree {
    constructor() {
        this.root = null;
        this.currentNode = null;
        this.path = [];
    }

    /**
     * Carga un árbol de decisión desde un objeto JSON
     * @param {Object} treeData - Datos del árbol en formato JSON
     * @returns {Boolean} - Éxito de la operación
     */
    loadTree(treeData) {
        try {
            if (!treeData || !treeData.root) {
                console.error("Datos de árbol inválidos");
                return false;
            }
            
            this.root = treeData.root;
            this.currentNode = this.root;
            this.path = [];
            return true;
        } catch (error) {
            console.error("Error al cargar el árbol:", error);
            return false;
        }
    }

    /**
     * Reinicia el árbol a su estado inicial
     */
    reset() {
        this.currentNode = this.root;
        this.path = [];
    }

    /**
     * Responde a la pregunta actual y avanza al siguiente nodo
     * @param {String} answer - Respuesta seleccionada
     * @returns {Boolean} - Éxito de la operación
     */
    answerQuestion(answer) {
        if (!this.currentNode || !this.currentNode.options) {
            return false;
        }

        // Guardar la pregunta y respuesta en el camino
        this.path.push({
            question: this.currentNode.question,
            answer: answer
        });

        // Buscar la opción que corresponde a la respuesta
        const option = this.currentNode.options.find(opt => opt.answer === answer);
        
        if (!option) {
            return false;
        }

        // Si hay un resultado, hemos llegado a una hoja
        if (option.result) {
            this.currentNode = {
                result: option.result
            };
            return true;
        }

        // Si hay un siguiente nodo, avanzar
        if (option.next) {
            this.currentNode = option.next;
            return true;
        }

        return false;
    }

    /**
     * Verifica si hemos llegado a un resultado
     * @returns {Boolean} - true si estamos en un nodo hoja con resultado
     */
    hasResult() {
        return this.currentNode && this.currentNode.result !== undefined;
    }

    /**
     * Obtiene el resultado actual
     * @returns {String|null} - El resultado o null si no hay
     */
    getResult() {
        if (this.hasResult()) {
            return this.currentNode.result;
        }
        return null;
    }

    /**
     * Obtiene el camino recorrido hasta el momento
     * @returns {Array} - Array de objetos {question, answer}
     */
    getPath() {
        return this.path;
    }

    /**
     * Procesa automáticamente el árbol con un conjunto de respuestas
     * @param {Array} answers - Array de respuestas en orden
     * @returns {Boolean} - Éxito de la operación
     */
    processTree(answers) {
        if (!Array.isArray(answers) || answers.length === 0) {
            return false;
        }

        this.reset();
        
        let success = true;
        for (const answer of answers) {
            if (!this.answerQuestion(answer)) {
                success = false;
                break;
            }
            
            // Si ya llegamos a un resultado, parar
            if (this.hasResult()) {
                break;
            }
        }
        
        return success;
    }
} 