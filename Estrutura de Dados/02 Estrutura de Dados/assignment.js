//Aluna: Ana Paula dos Reis
//Trilha: Estrutura de Dados
//Ano: 2026
//∘₊✧──────✧₊∘

// ==================== 1. VETORES ====================

let array = [10, 23, 45, 67, 89, 12, 34, 56, 78, 90];

// busca um numero no vetor
function searchNumber(array, number) {
    for (let i = 0; i < array.length; i++) {
        if (array[i] === number) {
            return i; // retorna posicao encontrada
        }
    }
    return -1; // nao encontrado
}

// remove elemento em posicao especifica
function removeAtPosition(array, position) {
    if (position >= 0 && position < array.length) {
        array.splice(position, 1);
        return true;
    }
    return false;
}

// ==================== 2. LISTA SIMPLESMENTE ENCADEADA ====================

class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class SinglyLinkedList {
    constructor() {
        this.head = null;
    }

    insertAtBeginning(value) {
        let newNode = new Node(value);
        newNode.next = this.head;
        this.head = newNode;
    }

    insertAtEnd(value) {
        let newNode = new Node(value);
        if (!this.head) {
            this.head = newNode;
            return;
        }
        let current = this.head;
        while (current.next) {
            current = current.next;
        }
        current.next = newNode;
    }

    removeAtPosition(position) {
        if (!this.head) return false;
        if (position === 0) {
            this.head = this.head.next;
            return true;
        }
        let current = this.head;
        let previous = null;
        let count = 0;
        while (current && count < position) {
            previous = current;
            current = current.next;
            count++;
        }
        if (current) {
            previous.next = current.next;
            return true;
        }
        return false;
    }

    searchByValue(value) {
        let current = this.head;
        let pos = 0;
        while (current) {
            if (current.value === value) return pos;
            current = current.next;
            pos++;
        }
        return -1;
    }
}

// ==================== 3. LISTA DUPLAMENTE ENCADEADA ====================

class DoublyNode {
    constructor(value) {
        this.value = value;
        this.prev = null;
        this.next = null;
    }
}

class DoublyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
    }

    insertAtBeginning(value) {
        let newNode = new DoublyNode(value);
        if (!this.head) {
            this.head = this.tail = newNode;
        } else {
            newNode.next = this.head;
            this.head.prev = newNode;
            this.head = newNode;
        }
    }

    removeFromEnd() {
        if (!this.tail) return false;
        if (this.head === this.tail) {
            this.head = this.tail = null;
        } else {
            this.tail = this.tail.prev;
            this.tail.next = null;
        }
        return true;
    }

    traverseBothDirections() {
        console.log("Ordem direta:");
        let current = this.head;
        while (current) {
            console.log(current.value);
            current = current.next;
        }
        console.log("Ordem reversa:");
        current = this.tail;
        while (current) {
            console.log(current.value);
            current = current.prev;
        }
    }
}

// ==================== 4. PILHA (STACK) ====================

class Stack {
    constructor(maxSize = 10) {
        this.items = [];
        this.maxSize = maxSize;
    }

    push(value) {
        if (this.isFull()) return false;
        this.items.push(value);
        return true;
    }

    pop() {
        if (this.isEmpty()) return null;
        return this.items.pop();
    }

    isEmpty() {
        return this.items.length === 0;
    }

    isFull() {
        return this.items.length >= this.maxSize;
    }
}

// verifica parenteses balanceados
function checkParentheses(expression) {
    let stack = new Stack(expression.length);
    for (let char of expression) {
        if (char === '(') {
            stack.push(char);
        } else if (char === ')') {
            if (stack.isEmpty()) return false;
            stack.pop();
        }
    }
    return stack.isEmpty();
}

// ==================== 5. FILA (QUEUE) ====================

class Queue {
    constructor() {
        this.items = [];
    }

    enqueue(value) {
        this.items.push(value);
    }

    dequeue() {
        if (this.isEmpty()) return null;
        return this.items.shift();
    }

    isEmpty() {
        return this.items.length === 0;
    }

    size() {
        return this.items.length;
    }
}

// fila circular
class CircularQueue {
    constructor(capacity) {
        this.items = new Array(capacity);
        this.capacity = capacity;
        this.front = 0;
        this.rear = 0;
        this.count = 0;
    }

    enqueue(value) {
        if (this.isFull()) return false;
        this.items[this.rear] = value;
        this.rear = (this.rear + 1) % this.capacity;
        this.count++;
        return true;
    }

    dequeue() {
        if (this.isEmpty()) return null;
        let value = this.items[this.front];
        this.front = (this.front + 1) % this.capacity;
        this.count--;
        return value;
    }

    isEmpty() {
        return this.count === 0;
    }

    isFull() {
        return this.count === this.capacity;
    }
}

// simulacao atendimento banco com fila simples
function bankSimulation() {
    let queue = new Queue();
    // chegada de clientes
    queue.enqueue("Cliente 1");
    queue.enqueue("Cliente 2");
    queue.enqueue("Cliente 3");
    
    console.log("Atendendo clientes:");
    while (!queue.isEmpty()) {
        let client = queue.dequeue();
        console.log(`Atendendo ${client}`);
    }
    console.log("Fila vazia. Fim do expediente.");
}

// ==================== TESTES RÁPIDOS (opcional) ====================
console.log("=== Testes Vetores ===");
console.log("Posicao do 45:", searchNumber(array, 45));
removeAtPosition(array, 2);
console.log("Vetor apos remover indice 2:", array);

console.log("\n=== Testes Lista Simples ===");
let list = new SinglyLinkedList();
list.insertAtBeginning(10);
list.insertAtEnd(20);
list.insertAtEnd(30);
console.log("Buscar 20:", list.searchByValue(20));
list.removeAtPosition(1);
console.log("Apos remover pos 1, busca 20:", list.searchByValue(20));

console.log("\n=== Testes Lista Dupla ===");
let doublyList = new DoublyLinkedList();
doublyList.insertAtBeginning(5);
doublyList.insertAtBeginning(3);
doublyList.insertAtBeginning(1);
doublyList.removeFromEnd();
doublyList.traverseBothDirections();

console.log("\n=== Testes Pilha ===");
let stack = new Stack(3);
stack.push(1);
stack.push(2);
stack.push(3);
console.log("Cheia?", stack.isFull());
console.log("Pop:", stack.pop());
console.log("Vazia?", stack.isEmpty());
console.log("Parenteses balanceados? ((1+2)*(3/4)):", checkParentheses("((1+2)*(3/4))"));
console.log("Parenteses balanceados? (1+2)):", checkParentheses("(1+2))"));

console.log("\n=== Testes Fila ===");
let circularQ = new CircularQueue(3);
circularQ.enqueue("A");
circularQ.enqueue("B");
circularQ.enqueue("C");
console.log("Fila circular cheia?", circularQ.isFull());
console.log("Dequeue:", circularQ.dequeue());
circularQ.enqueue("D");
console.log("Dequeue:", circularQ.dequeue());
console.log("Dequeue:", circularQ.dequeue());
console.log("Dequeue:", circularQ.dequeue());

bankSimulation();