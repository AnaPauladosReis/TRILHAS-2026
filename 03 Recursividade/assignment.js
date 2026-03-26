//Aluna: Ana Paula dos Reis
//Trilha: Estrutura de Dados
//Ano: 2026
//∘₊✧──────✧₊∘

// ==================== RECURSIVIDADE ====================
// Lista de Exercicios de Fixacao 
// Cada exercicio implementado de forma recursiva, com analise de desempenho

// ------------------------------------------------------------
// 1. Fatorial Recursivo
// ------------------------------------------------------------
function factorial(n) {
    // caso base: fatorial de 0 ou 1 eh 1
    if (n <= 1) return 1;
    // chamada recursiva: n * fatorial(n-1)
    return n * factorial(n - 1);
}
// Complexidade de tempo: O(n) - ha n chamadas recursivas
// Espaco: O(n) - pilha de chamadas

console.log("=== Exercicio 1: Fatorial ===");
console.log("5! =", factorial(5)); // 120
console.log("0! =", factorial(0)); // 1

// ------------------------------------------------------------
// 2. Sequencia de Fibonacci (recursivo + memoization)
// ------------------------------------------------------------
// versao recursiva simples (ineficiente)
function fibonacciRecursivo(n) {
    if (n === 0) return 0;
    if (n === 1) return 1;
    return fibonacciRecursivo(n - 1) + fibonacciRecursivo(n - 2);
}
// Complexidade: O(2^n) - exponencial

// versao otimizada com memoization (programacao dinamica)
function fibonacciMemo(n, memo = {}) {
    if (n in memo) return memo[n];
    if (n === 0) return 0;
    if (n === 1) return 1;
    memo[n] = fibonacciMemo(n - 1, memo) + fibonacciMemo(n - 2, memo);
    return memo[n];
}
// Complexidade: O(n) - cada valor calculado uma vez

console.log("\n=== Exercicio 2: Fibonacci ===");
console.log("Fib(10) recursivo:", fibonacciRecursivo(10));   // 55
console.log("Fib(10) com memo:", fibonacciMemo(10));        // 55
console.log("Fib(20) com memo:", fibonacciMemo(20));        // 6765

// ------------------------------------------------------------
// 3. Travessia em Arvores Binarias (pre-order, in-order, post-order)
// ------------------------------------------------------------
class TreeNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

// funcoes de percurso recursivas
function preOrder(node) {
    if (node === null) return;
    console.log(node.value);
    preOrder(node.left);
    preOrder(node.right);
}

function inOrder(node) {
    if (node === null) return;
    inOrder(node.left);
    console.log(node.value);
    inOrder(node.right);
}

function postOrder(node) {
    if (node === null) return;
    postOrder(node.left);
    postOrder(node.right);
    console.log(node.value);
}

// construindo uma arvore de exemplo
let root = new TreeNode(10);
root.left = new TreeNode(5);
root.right = new TreeNode(15);
root.left.left = new TreeNode(3);
root.left.right = new TreeNode(7);
root.right.right = new TreeNode(20);

console.log("\n=== Exercicio 3: Travessia em Arvore ===");
console.log("Pre-order:");
preOrder(root);   // 10, 5, 3, 7, 15, 20
console.log("In-order:");
inOrder(root);    // 3, 5, 7, 10, 15, 20
console.log("Post-order:");
postOrder(root);  // 3, 7, 5, 20, 15, 10

// ------------------------------------------------------------
// 4. Soma dos Elementos de uma Lista Encadeada (recursiva)
// ------------------------------------------------------------
class ListNode {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

function sumLinkedList(node) {
    if (node === null) return 0;
    return node.value + sumLinkedList(node.next);
}

// criando lista: 2 -> 4 -> 6 -> 8
let head = new ListNode(2);
head.next = new ListNode(4);
head.next.next = new ListNode(6);
head.next.next.next = new ListNode(8);

console.log("\n=== Exercicio 4: Soma Lista Encadeada ===");
console.log("Soma dos elementos:", sumLinkedList(head)); // 20

// ------------------------------------------------------------
// 5. Busca em Arvore Binaria de Busca (recursiva)
// ------------------------------------------------------------
function buscaBST(node, valor) {
    if (node === null) return false;
    if (node.value === valor) return true;
    if (valor < node.value) {
        return buscaBST(node.left, valor);
    } else {
        return buscaBST(node.right, valor);
    }
}
// Complexidade de tempo: O(h) onde h = altura da arvore
// Pior caso O(n) (arvore degenerada), melhor caso O(log n) (balanceada)

console.log("\n=== Exercicio 5: Busca em BST ===");
console.log("Existe 7?", buscaBST(root, 7));   // true
console.log("Existe 12?", buscaBST(root, 12)); // false

// ------------------------------------------------------------
// 6. Torre de Hanói
// ------------------------------------------------------------
function hanoi(n, origem, destino, auxiliar) {
    if (n === 1) {
        console.log(`Mover disco 1 de ${origem} para ${destino}`);
        return 1; // retorna 1 movimento
    }
    let movimentos = 0;
    movimentos += hanoi(n - 1, origem, auxiliar, destino);
    console.log(`Mover disco ${n} de ${origem} para ${destino}`);
    movimentos += 1;
    movimentos += hanoi(n - 1, auxiliar, destino, origem);
    return movimentos;
}
// Numero total de movimentos: 2^n - 1
// Complexidade de tempo: O(2^n)

console.log("\n=== Exercicio 6: Torre de Hanói (3 discos) ===");
let totalMov = hanoi(3, 'A', 'C', 'B');
console.log(`Total de movimentos: ${totalMov}`); // 7

// ------------------------------------------------------------
// 7. Contagem de Nós em uma Lista Encadeada (recursiva)
// ------------------------------------------------------------
function countNodes(node) {
    if (node === null) return 0;
    return 1 + countNodes(node.next);
}
// Complexidade de tempo: O(n) - percorre cada no uma vez
// Complexidade de espaco: O(n) - pilha de chamadas recursivas

console.log("\n=== Exercicio 7: Contagem de Nós ===");
console.log("Numero de nos na lista:", countNodes(head)); // 4

// ------------------------------------------------------------
// Analises extras solicitadas nos enunciados
// ------------------------------------------------------------
console.log("\n--- Analises de Complexidade ---");
console.log("1. Fatorial: O(n) tempo, O(n) espaco");
console.log("2. Fibonacci recursivo simples: O(2^n); com memoization: O(n)");
console.log("3. Percursos em arvore: O(n) tempo, O(n) espaco (pior caso)");
console.log("4. Soma lista encadeada: O(n) tempo, O(n) espaco");
console.log("5. Busca BST: O(h) tempo, O(h) espaco, onde h = altura da arvore");
console.log("6. Hanoi: O(2^n) tempo, O(n) espaco (profundidade da recursao)");
console.log("7. Contagem nos: O(n) tempo, O(n) espaco");