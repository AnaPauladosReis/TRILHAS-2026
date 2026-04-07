//Aluna: Ana Paula dos Reis
//Trilha: Estrutura de Dados
//Ano: 2026
//∘₊✧──────✧₊∘

// ==================== ESTRUTURAS DE DADOS NÃO LINEARES ====================
// Lista de Exercicios de Fixacao

// ------------------------------------------------------------
// 1. Arvores Binarias e BST
// ------------------------------------------------------------

// No da arvore binaria
class TreeNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

// Percursos recursivos
function inOrder(node) {
    if (node === null) return;
    inOrder(node.left);
    console.log(node.value);
    inOrder(node.right);
}

function preOrder(node) {
    if (node === null) return;
    console.log(node.value);
    preOrder(node.left);
    preOrder(node.right);
}

function postOrder(node) {
    if (node === null) return;
    postOrder(node.left);
    postOrder(node.right);
    console.log(node.value);
}

// Arvore Binaria de Busca (BST)
class BST {
    constructor() {
        this.root = null;
    }

    insert(value) {
        this.root = this._insertRec(this.root, value);
    }

    _insertRec(node, value) {
        if (node === null) return new TreeNode(value);
        if (value < node.value) {
            node.left = this._insertRec(node.left, value);
        } else if (value > node.value) {
            node.right = this._insertRec(node.right, value);
        }
        return node;
    }

    search(value) {
        return this._searchRec(this.root, value);
    }

    _searchRec(node, value) {
        if (node === null) return false;
        if (value === node.value) return true;
        if (value < node.value) return this._searchRec(node.left, value);
        return this._searchRec(node.right, value);
    }

    remove(value) {
        this.root = this._removeRec(this.root, value);
    }

    _removeRec(node, value) {
        if (node === null) return null;
        if (value < node.value) {
            node.left = this._removeRec(node.left, value);
        } else if (value > node.value) {
            node.right = this._removeRec(node.right, value);
        } else {
            // no com um filho ou nenhum
            if (node.left === null) return node.right;
            if (node.right === null) return node.left;
            // no com dois filhos: pega o sucessor in-order (menor da direita)
            let minNode = this._findMin(node.right);
            node.value = minNode.value;
            node.right = this._removeRec(node.right, minNode.value);
        }
        return node;
    }

    _findMin(node) {
        while (node.left !== null) node = node.left;
        return node;
    }
}

console.log("=== Exercicio 1: Arvores Binarias e BST ===");
let bst = new BST();
[15, 6, 18, 3, 7, 17, 20].forEach(v => bst.insert(v));
console.log("In-order:");
inOrder(bst.root);
console.log("Pre-order:");
preOrder(bst.root);
console.log("Post-order:");
postOrder(bst.root);
console.log("Buscar 7:", bst.search(7));   // true
console.log("Buscar 10:", bst.search(10)); // false
bst.remove(15);
console.log("Apos remover 15, in-order:");
inOrder(bst.root);

// ------------------------------------------------------------
// 2. Arvore AVL
// ------------------------------------------------------------
class AVLNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
        this.height = 1;
    }
}

class AVLTree {
    constructor() {
        this.root = null;
    }

    getHeight(node) {
        return node ? node.height : 0;
    }

    updateHeight(node) {
        node.height = 1 + Math.max(this.getHeight(node.left), this.getHeight(node.right));
    }

    getBalance(node) {
        return node ? this.getHeight(node.left) - this.getHeight(node.right) : 0;
    }

    rotateRight(y) {
        let x = y.left;
        let T2 = x.right;
        x.right = y;
        y.left = T2;
        this.updateHeight(y);
        this.updateHeight(x);
        return x;
    }

    rotateLeft(x) {
        let y = x.right;
        let T2 = y.left;
        y.left = x;
        x.right = T2;
        this.updateHeight(x);
        this.updateHeight(y);
        return y;
    }

    insert(value) {
        this.root = this._insertRec(this.root, value);
    }

    _insertRec(node, value) {
        if (node === null) return new AVLNode(value);
        if (value < node.value) {
            node.left = this._insertRec(node.left, value);
        } else if (value > node.value) {
            node.right = this._insertRec(node.right, value);
        } else {
            return node; // duplicados nao sao inseridos
        }

        this.updateHeight(node);
        let balance = this.getBalance(node);

        // Casos de desbalanceamento
        if (balance > 1 && value < node.left.value) {
            return this.rotateRight(node);
        }
        if (balance < -1 && value > node.right.value) {
            return this.rotateLeft(node);
        }
        if (balance > 1 && value > node.left.value) {
            node.left = this.rotateLeft(node.left);
            return this.rotateRight(node);
        }
        if (balance < -1 && value < node.right.value) {
            node.right = this.rotateRight(node.right);
            return this.rotateLeft(node);
        }
        return node;
    }

    remove(value) {
        this.root = this._removeRec(this.root, value);
    }

    _removeRec(node, value) {
        if (node === null) return null;
        if (value < node.value) {
            node.left = this._removeRec(node.left, value);
        } else if (value > node.value) {
            node.right = this._removeRec(node.right, value);
        } else {
            if (node.left === null || node.right === null) {
                let child = node.left ? node.left : node.right;
                if (child === null) {
                    node = null;
                } else {
                    node = child;
                }
            } else {
                let minNode = this._findMin(node.right);
                node.value = minNode.value;
                node.right = this._removeRec(node.right, minNode.value);
            }
        }

        if (node === null) return null;
        this.updateHeight(node);
        let balance = this.getBalance(node);

        // Rebalanceamento
        if (balance > 1 && this.getBalance(node.left) >= 0) {
            return this.rotateRight(node);
        }
        if (balance > 1 && this.getBalance(node.left) < 0) {
            node.left = this.rotateLeft(node.left);
            return this.rotateRight(node);
        }
        if (balance < -1 && this.getBalance(node.right) <= 0) {
            return this.rotateLeft(node);
        }
        if (balance < -1 && this.getBalance(node.right) > 0) {
            node.right = this.rotateRight(node.right);
            return this.rotateLeft(node);
        }
        return node;
    }

    _findMin(node) {
        while (node.left !== null) node = node.left;
        return node;
    }

    inOrder(node) {
        if (node === null) return;
        this.inOrder(node.left);
        console.log(node.value);
        this.inOrder(node.right);
    }
}

console.log("\n=== Exercicio 2: Arvore AVL ===");
let avl = new AVLTree();
[10, 20, 30, 40, 50, 25].forEach(v => avl.insert(v));
console.log("AVL in-order:");
avl.inOrder(avl.root);
avl.remove(30);
console.log("Apos remover 30:");
avl.inOrder(avl.root);

// ------------------------------------------------------------
// 3. Heaps e Fila de Prioridade
// ------------------------------------------------------------
class MaxHeap {
    constructor() {
        this.heap = [];
    }

    insert(value) {
        this.heap.push(value);
        this._heapifyUp(this.heap.length - 1);
    }

    removeMax() {
        if (this.isEmpty()) return null;
        let max = this.heap[0];
        let last = this.heap.pop();
        if (this.heap.length > 0) {
            this.heap[0] = last;
            this._heapifyDown(0);
        }
        return max;
    }

    isEmpty() {
        return this.heap.length === 0;
    }

    _heapifyUp(index) {
        let parent = Math.floor((index - 1) / 2);
        while (index > 0 && this.heap[index] > this.heap[parent]) {
            [this.heap[index], this.heap[parent]] = [this.heap[parent], this.heap[index]];
            index = parent;
            parent = Math.floor((index - 1) / 2);
        }
    }

    _heapifyDown(index) {
        let largest = index;
        let left = 2 * index + 1;
        let right = 2 * index + 2;
        if (left < this.heap.length && this.heap[left] > this.heap[largest]) {
            largest = left;
        }
        if (right < this.heap.length && this.heap[right] > this.heap[largest]) {
            largest = right;
        }
        if (largest !== index) {
            [this.heap[index], this.heap[largest]] = [this.heap[largest], this.heap[index]];
            this._heapifyDown(largest);
        }
    }
}

// Fila de prioridade baseada no max-heap
class PriorityQueue {
    constructor() {
        this.heap = new MaxHeap();
    }

    enqueue(value) {
        this.heap.insert(value);
    }

    dequeue() {
        return this.heap.removeMax();
    }

    isEmpty() {
        return this.heap.isEmpty();
    }
}

console.log("\n=== Exercicio 3: Heaps e Fila de Prioridade ===");
let heap = new MaxHeap();
heap.insert(5);
heap.insert(3);
heap.insert(8);
heap.insert(1);
heap.insert(10);
console.log("Removendo max (esperado 10):", heap.removeMax());
console.log("Removendo max (esperado 8):", heap.removeMax());

let pq = new PriorityQueue();
pq.enqueue(20);
pq.enqueue(15);
pq.enqueue(30);
console.log("Fila de prioridade dequeue (maior):", pq.dequeue());
console.log("Proximo maior:", pq.dequeue());

// ------------------------------------------------------------
// 4. Grafos: DFS, BFS, Dijkstra (direcionado)
// ------------------------------------------------------------
class Graph {
    constructor(directed = false) {
        this.directed = directed;
        this.adjList = new Map();
    }

    addVertex(v) {
        if (!this.adjList.has(v)) this.adjList.set(v, []);
    }

    addEdge(v, w, weight = 1) {
        this.addVertex(v);
        this.addVertex(w);
        this.adjList.get(v).push({ node: w, weight });
        if (!this.directed) {
            this.adjList.get(w).push({ node: v, weight });
        }
    }

    // DFS recursivo
    dfs(start, visited = new Set()) {
        visited.add(start);
        console.log(start);
        let neighbors = this.adjList.get(start) || [];
        for (let neighbor of neighbors) {
            if (!visited.has(neighbor.node)) {
                this.dfs(neighbor.node, visited);
            }
        }
    }

    // BFS usando fila
    bfs(start) {
        let visited = new Set();
        let queue = [start];
        visited.add(start);
        while (queue.length > 0) {
            let v = queue.shift();
            console.log(v);
            let neighbors = this.adjList.get(v) || [];
            for (let neighbor of neighbors) {
                if (!visited.has(neighbor.node)) {
                    visited.add(neighbor.node);
                    queue.push(neighbor.node);
                }
            }
        }
    }

    // Dijkstra (apenas para grafos direcionados com pesos nao negativos)
    dijkstra(start) {
        let distances = new Map();
        let prev = new Map();
        let visited = new Set();
        let pq = new PriorityQueueDist(); // fila de prioridade baseada em distancia

        for (let v of this.adjList.keys()) {
            distances.set(v, Infinity);
            prev.set(v, null);
        }
        distances.set(start, 0);
        pq.enqueue(start, 0);

        while (!pq.isEmpty()) {
            let { node: u } = pq.dequeue();
            if (visited.has(u)) continue;
            visited.add(u);
            let neighbors = this.adjList.get(u) || [];
            for (let neighbor of neighbors) {
                let v = neighbor.node;
                let weight = neighbor.weight;
                let alt = distances.get(u) + weight;
                if (alt < distances.get(v)) {
                    distances.set(v, alt);
                    prev.set(v, u);
                    pq.enqueue(v, alt);
                }
            }
        }
        return { distances, prev };
    }
}

// Fila de prioridade auxiliar para Dijkstra (min-heap)
class PriorityQueueDist {
    constructor() {
        this.heap = [];
    }

    enqueue(node, priority) {
        this.heap.push({ node, priority });
        this._heapifyUp(this.heap.length - 1);
    }

    dequeue() {
        if (this.isEmpty()) return null;
        let min = this.heap[0];
        let last = this.heap.pop();
        if (this.heap.length > 0) {
            this.heap[0] = last;
            this._heapifyDown(0);
        }
        return min;
    }

    isEmpty() {
        return this.heap.length === 0;
    }

    _heapifyUp(index) {
        let parent = Math.floor((index - 1) / 2);
        while (index > 0 && this.heap[index].priority < this.heap[parent].priority) {
            [this.heap[index], this.heap[parent]] = [this.heap[parent], this.heap[index]];
            index = parent;
            parent = Math.floor((index - 1) / 2);
        }
    }

    _heapifyDown(index) {
        let smallest = index;
        let left = 2 * index + 1;
        let right = 2 * index + 2;
        if (left < this.heap.length && this.heap[left].priority < this.heap[smallest].priority) {
            smallest = left;
        }
        if (right < this.heap.length && this.heap[right].priority < this.heap[smallest].priority) {
            smallest = right;
        }
        if (smallest !== index) {
            [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
            this._heapifyDown(smallest);
        }
    }
}

console.log("\n=== Exercicio 4: Grafos (DFS, BFS, Dijkstra) ===");
let g = new Graph(false); // nao direcionado
g.addEdge(1, 2);
g.addEdge(1, 3);
g.addEdge(2, 4);
g.addEdge(3, 4);
g.addEdge(4, 5);
console.log("DFS a partir de 1:");
g.dfs(1);
console.log("BFS a partir de 1:");
g.bfs(1);

let dGraph = new Graph(true); // direcionado com pesos
dGraph.addEdge('A', 'B', 4);
dGraph.addEdge('A', 'C', 2);
dGraph.addEdge('B', 'C', 1);
dGraph.addEdge('C', 'B', 3);
dGraph.addEdge('B', 'D', 5);
dGraph.addEdge('C', 'D', 8);
dGraph.addEdge('D', 'E', 6);
dGraph.addEdge('E', 'D', 2);
console.log("Dijkstra de A:");
let result = dGraph.dijkstra('A');
console.log("Distancias:", Object.fromEntries(result.distances));
console.log("Predecessores:", Object.fromEntries(result.prev));

// ------------------------------------------------------------
// 5. Caminhos Minimos: Dijkstra (source to all) e Floyd-Warshall
// ------------------------------------------------------------
function floydWarshall(vertices, edges) {
    // vertices: array com os nomes dos vertices
    // edges: array de { from, to, weight }
    let n = vertices.length;
    let dist = Array(n).fill().map(() => Array(n).fill(Infinity));
    let next = Array(n).fill().map(() => Array(n).fill(null));

    // Indices dos vertices
    let index = new Map();
    vertices.forEach((v, i) => index.set(v, i));

    // Inicializa distancias
    for (let i = 0; i < n; i++) dist[i][i] = 0;
    for (let e of edges) {
        let u = index.get(e.from);
        let v = index.get(e.to);
        if (e.weight < dist[u][v]) {
            dist[u][v] = e.weight;
            next[u][v] = v;
        }
    }

    // Algoritmo de Floyd-Warshall
    for (let k = 0; k < n; k++) {
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                if (dist[i][k] + dist[k][j] < dist[i][j]) {
                    dist[i][j] = dist[i][k] + dist[k][j];
                    next[i][j] = next[i][k];
                }
            }
        }
    }

    return { dist, next, index };
}

console.log("\n=== Exercicio 5: Caminhos Minimos (Floyd-Warshall) ===");
let vertices = ['A', 'B', 'C', 'D'];
let edges = [
    { from: 'A', to: 'B', weight: 1 },
    { from: 'A', to: 'C', weight: 4 },
    { from: 'B', to: 'C', weight: 2 },
    { from: 'B', to: 'D', weight: 6 },
    { from: 'C', to: 'D', weight: 3 }
];
let fw = floydWarshall(vertices, edges);
console.log("Matriz de distancias:");
for (let i = 0; i < vertices.length; i++) {
    let row = [];
    for (let j = 0; j < vertices.length; j++) {
        row.push(fw.dist[i][j] === Infinity ? '∞' : fw.dist[i][j]);
    }
    console.log(`${vertices[i]}:`, row.join(' '));
}