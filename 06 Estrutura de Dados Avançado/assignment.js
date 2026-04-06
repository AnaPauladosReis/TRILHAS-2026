//Aluna: Ana Paula dos Reis
//Trilha: Estrutura de Dados
//Ano: 2026
//∘₊✧──────✧₊∘

// ==================== UNION-FIND E ARVORES B/B+ ====================
// Lista de Exercicios (modulo extra: Union-Find, Arvores B e B+)

// ------------------------------------------------------------
// 1. Implementacao de Union-Find (Disjoint Set Union)
// ------------------------------------------------------------

// aqui eu guardo quem e o pai e o rank
let parent = [];
let rank = [];

function makeSet(n) {
    for (let i = 0; i < n; i++) {
        parent[i] = i; // no comeco todo mundo e pai de si mesmo
        rank[i] = 0;
    }
}

function find(i) {
    // se nao for o pai dele mesmo, vai subindo e ja grudando no topo
    if (parent[i] === i) {
        return i;
    }
    parent[i] = find(parent[i]); 
    return parent[i];
}

function union(i, j) {
    let rootI = find(i);
    let rootJ = find(j);

    if (rootI !== rootJ) {
        // o menor gruda no maior
        if (rank[rootI] < rank[rootJ]) {
            parent[rootI] = rootJ;
        } else if (rank[rootI] > rank[rootJ]) {
            parent[rootJ] = rootI;
        } else {
            parent[rootI] = rootJ;
            rank[rootJ] = rank[rootJ] + 1;
        }
        return true;
    }
    return false;
}

// Testando componentes conectados
function countComponents(n, edges) {
    makeSet(n);
    let count = n;
    for (let i = 0; i < edges.length; i++) {
        if (union(edges[i][0], edges[i][1])) {
            count--; // toda vez que junto dois, diminui o total de grupos
        }
    }
    return count;
}

let connections = [[0, 1], [1, 2], [3, 4]];
console.log("Grupos conectados:", countComponents(5, connections)); // deve dar 2

// ------------------------------------------------------------
// 2. Aplicacao de Union-Find: Algoritmo de Kruskal (MST) e deteccao de ciclo
// ------------------------------------------------------------

function findMST(n, edges) {
    // ordenando as arestas pelo peso usando um bubble sort simples
    for (let i = 0; i < edges.length; i++) {
        for (let j = 0; j < edges.length - 1; j++) {
            if (edges[j][2] > edges[j+1][2]) {
                let temp = edges[j];
                edges[j] = edges[j+1];
                edges[j+1] = temp;
            }
        }
    }

    makeSet(n);
    let mst = [];
    let totalWeight = 0;

    for (let i = 0; i < edges.length; i++) {
        let u = edges[i][0];
        let v = edges[i][1];
        let w = edges[i][2];

        // se as raizes sao diferentes, nao faz ciclo!
        if (find(u) !== find(v)) {
            union(u, v);
            mst.push(edges[i]);
            totalWeight += w;
        }
    }
    return mst;
}

// Teste de Ciclo
function hasCycle(n, edges) {
    makeSet(n);
    for (let i = 0; i < edges.length; i++) {
        if (!union(edges[i][0], edges[i][1])) {
            return true; // se ja estao no mesmo grupo e tentei unir, deu ciclo
        }
    }
    return false;
}

let graphEdges = [[0, 1, 10], [0, 2, 6], [0, 3, 5], [1, 3, 15], [2, 3, 4]];
console.log("MST:", findMST(4, graphEdges));



// ------------------------------------------------------------
// 3. Arvore B (B-Tree) com grau minimo t=3
// ------------------------------------------------------------
// simplificando a estrutura pra mostrar como fica
// a arvore b e cheia de regras de divisao
class BTreeNode {
    constructor(isLeaf) {
        this.keys = [];
        this.children = [];
        this.leaf = isLeaf;
    }
}

// o codigo de insercao e muito longo, mas a ideia e:
// se o no ta cheio, divide e sobe o do meio.




// ------------------------------------------------------------
// 4. Arvore B+ (BPlusTree) com grau minimo t=2
// ------------------------------------------------------------
class BPlusNode {
    constructor(leaf = false) {
        this.leaf = leaf;
        this.keys = [];
        this.children = [];   // para internos; para folhas, next pointer
        this.next = null;     // ponteiro para proxima folha
    }
}

class BPlusTree {
    constructor(t) {
        this.t = t;
        this.root = new BPlusNode(true);
    }

    // insercao
    insert(key) {
        let root = this.root;
        if (root.keys.length === 2 * this.t - 1) {
            let newRoot = new BPlusNode(false);
            newRoot.children.push(this.root);
            this._splitChild(newRoot, 0);
            this.root = newRoot;
        }
        this._insertNonFull(this.root, key);
    }

    _insertNonFull(node, key) {
        if (node.leaf) {
            let i = node.keys.length - 1;
            node.keys.push(0);
            while (i >= 0 && key < node.keys[i]) {
                node.keys[i+1] = node.keys[i];
                i--;
            }
            node.keys[i+1] = key;
        } else {
            let i = node.keys.length - 1;
            while (i >= 0 && key < node.keys[i]) i--;
            i++;
            let child = node.children[i];
            if (child.keys.length === 2 * this.t - 1) {
                this._splitChild(node, i);
                if (key > node.keys[i]) i++;
            }
            this._insertNonFull(node.children[i], key);
        }
    }

    _splitChild(parent, index) {
        let t = this.t;
        let child = parent.children[index];
        let newChild = new BPlusNode(child.leaf);
        parent.children.splice(index+1, 0, newChild);
        // sobe a chave do meio para o pai (apenas a primeira do noh direito)
        let mid = t - 1;
        parent.keys.splice(index, 0, child.keys[mid]);

        newChild.keys = child.keys.splice(mid, t); // remove a partir de mid
        // na B+, a chave do meio nao fica na folha? Cuidado: implementacao simplificada
        // Para B+: folhas contem todas as chaves, internos apenas indices.
        // Vamos ajustar: nao remover a chave mid do child se for folha
        if (child.leaf) {
            // na B+, folha mantem todas as chaves, e sobe a primeira do novo noh
            parent.keys[index] = newChild.keys[0];
            // ligacao encadeada
            newChild.next = child.next;
            child.next = newChild;
        } else {
            // internos: a chave mid sobe e child perde essa chave
            child.keys.pop(); // remove o elemento que subiu
        }
        if (!child.leaf) {
            newChild.children = child.children.splice(t, t);
        }
    }

    printLevels() {
        let queue = [this.root];
        while (queue.length) {
            let node = queue.shift();
            console.log(node.leaf ? "Folha:" : "Interno:", node.keys);
            if (!node.leaf) {
                for (let child of node.children) queue.push(child);
            }
        }
    }

    // percurso em ordem das folhas
    printLeaves() {
        let node = this.root;
        while (!node.leaf) node = node.children[0];
        let result = [];
        while (node) {
            result.push(...node.keys);
            node = node.next;
        }
        console.log("Folhas encadeadas:", result);
    }
}

console.log("\n=== Exercicio 4: Arvore B+ (t=2) ===");
let bplus = new BPlusTree(2);
let valoresBplus = [15, 5, 25, 10, 20, 30, 35];
for (let v of valoresBplus) {
    bplus.insert(v);
    console.log(`Apos inserir ${v}:`);
    bplus.printLevels();
    bplus.printLeaves();
    console.log("---");
}

// ------------------------------------------------------------
// 5. Analise de Desempenho (comparacao conceitual)
// ------------------------------------------------------------
console.log("\n=== Exercicio 5: Analise de Desempenho ===");
console.log("Comparacao B-tree vs AVL para grandes conjuntos:");
console.log("- B-tree: altura O(log_t n) com t grande (ex: 100), acessos em disco reduzidos");
console.log("- AVL: altura O(log2 n), mais acessos de memoria, mas em disco perde devido a muitas paginas");
console.log("Para dados muito grandes (nao cabem em RAM), B-tree vence por usar nodes grandes e reduzir I/O.");
console.log("Bancos de dados preferem B-tree porque indexam em blocos (pages) e minimizam seek em disco.");

// ------------------------------------------------------------
// 6. Aplicacao de Arvores B em Banco de Dados
// ------------------------------------------------------------
console.log("\n=== Exercicio 6: Aplicacao em Banco de Dados ===");
console.log("Uma arvore B eh usada como indice de banco de dados:");
console.log("- Cada noh da arvore corresponde a uma pagina de disco (tipicamente 4KB).");
console.log("- As chaves sao os valores dos atributos indexados (ex: ID, CPF).");
console.log("- As folhas apontam para os registros (ROWID ou offset no arquivo).");
console.log("Beneficios:");
console.log("- Busca por chave: O(log_t n) paginas lidas, muito eficiente.");
console.log("- Insercoes/remocoes mantem balanceamento com poucos reajustes.");
console.log("- Varredura ordenada: percorre folhas encadeadas.");
console.log("\nSimulacao conceitual (milhoes de registros):");
console.log("Suponha t=100 (cada no com ~200 chaves), altura ~3 para 10^6 registros.");
console.log("Busca: 3 acessos a disco, comparado a ~20 acessos em AVL.");

// funcao auxiliar para simular busca em B-tree
function simulateBTreeSearch(numRecords, t) {
    let height = Math.ceil(Math.log(numRecords) / Math.log(t));
    console.log(`Com t=${t}, registros=${numRecords}, altura estimada ~${height}`);
}
simulateBTreeSearch(1_000_000, 100);
simulateBTreeSearch(1_000_000, 2);