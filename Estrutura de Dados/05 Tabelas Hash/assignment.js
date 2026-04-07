//Aluna: Ana Paula dos Reis
//Trilha: Estrutura de Dados
//Ano: 2026
//∘₊✧──────✧₊∘

// ==================== TABELAS HASH ====================
// Lista de Exercicios de Fixacao
// ------------------------------------------------------------
// 1. Implementacao de Funcoes de Hash
// ------------------------------------------------------------

// funcao hash para chave inteira e tabela de tamanho 10
function hashInteger(key, tableSize = 10) {
    return key % tableSize;
}

// funcao hash para strings: soma valores ASCII e aplica modulo
function hashString(key, tableSize = 10) {
    let sum = 0;
    for (let i = 0; i < key.length; i++) {
        sum += key.charCodeAt(i);
    }
    return sum % tableSize;
}

console.log("=== Exercicio 1: Funcoes de Hash ===");
console.log("hashInteger(42):", hashInteger(42));       // 2
console.log("hashString('casa'):", hashString("casa")); // soma 99+97+115+97=408 %10 = 8

// ------------------------------------------------------------
// 2. Encadeamento (Chaining)
// ------------------------------------------------------------
class NodeKV {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.next = null;
    }
}

class ChainingHashTable {
    constructor(capacity = 10) {
        this.capacity = capacity;
        this.table = new Array(capacity).fill(null);
        this.size = 0;
    }

    // funcao hash generica (funciona com string ou numero)
    _hash(key) {
        if (typeof key === 'number') {
            return key % this.capacity;
        } else {
            let sum = 0;
            for (let i = 0; i < key.length; i++) {
                sum += key.charCodeAt(i);
            }
            return sum % this.capacity;
        }
    }

    insert(key, value) {
        let index = this._hash(key);
        let newNode = new NodeKV(key, value);
        if (!this.table[index]) {
            this.table[index] = newNode;
        } else {
            // insere no inicio da lista (simplifica)
            newNode.next = this.table[index];
            this.table[index] = newNode;
        }
        this.size++;
    }

    search(key) {
        let index = this._hash(key);
        let current = this.table[index];
        while (current) {
            if (current.key === key) {
                return current.value;
            }
            current = current.next;
        }
        return null;
    }

    remove(key) {
        let index = this._hash(key);
        let current = this.table[index];
        let prev = null;
        while (current) {
            if (current.key === key) {
                if (prev) {
                    prev.next = current.next;
                } else {
                    this.table[index] = current.next;
                }
                this.size--;
                return true;
            }
            prev = current;
            current = current.next;
        }
        return false;
    }
}

console.log("\n=== Exercicio 2: Encadeamento ===");
let chTable = new ChainingHashTable(5);
chTable.insert("apple", "maca");
chTable.insert("banana", "banana");
chTable.insert(42, "resposta");
console.log("buscar 'apple':", chTable.search("apple")); // maca
console.log("buscar 42:", chTable.search(42));           // resposta
chTable.remove("apple");
console.log("buscar 'apple' apos remover:", chTable.search("apple")); // null

// ------------------------------------------------------------
// 3. Enderecamento Aberto (Probing Linear)
// ------------------------------------------------------------
class LinearProbingHashTable {
    constructor(capacity = 10) {
        this.capacity = capacity;
        this.table = new Array(capacity).fill(null);
        this.size = 0;
    }

    _hash(key) {
        if (typeof key === 'number') {
            return key % this.capacity;
        } else {
            let sum = 0;
            for (let i = 0; i < key.length; i++) {
                sum += key.charCodeAt(i);
            }
            return sum % this.capacity;
        }
    }

    insert(key, value) {
        if (this.size === this.capacity) {
            console.warn("Tabela cheia! Nao foi possivel inserir.");
            return false;
        }
        let index = this._hash(key);
        let start = index;
        while (this.table[index] !== null && this.table[index].key !== key) {
            index = (index + 1) % this.capacity;
            if (index === start) {
                console.warn("Tabela cheia! Nao foi possivel inserir.");
                return false;
            }
        }
        this.table[index] = { key, value };
        this.size++;
        return true;
    }

    search(key) {
        let index = this._hash(key);
        let start = index;
        while (this.table[index] !== null) {
            if (this.table[index].key === key) {
                return this.table[index].value;
            }
            index = (index + 1) % this.capacity;
            if (index === start) break;
        }
        return null;
    }

    remove(key) {
        let index = this._hash(key);
        let start = index;
        while (this.table[index] !== null) {
            if (this.table[index].key === key) {
                this.table[index] = null;
                this.size--;
                // rehash dos elementos seguintes (necessario para probing linear)
                this._rehashFrom(index);
                return true;
            }
            index = (index + 1) % this.capacity;
            if (index === start) break;
        }
        return false;
    }

    _rehashFrom(start) {
        let i = (start + 1) % this.capacity;
        while (this.table[i] !== null) {
            let entry = this.table[i];
            this.table[i] = null;
            this.size--;
            this.insert(entry.key, entry.value);
            i = (i + 1) % this.capacity;
        }
    }
}

console.log("\n=== Exercicio 3: Enderecamento Aberto (Probing Linear) ===");
let lpTable = new LinearProbingHashTable(5);
lpTable.insert("A", 1);
lpTable.insert("B", 2);
lpTable.insert("C", 3);
lpTable.insert("D", 4);
lpTable.insert("E", 5);
console.log("buscar 'C':", lpTable.search("C")); // 3
console.log("buscar 'Z':", lpTable.search("Z")); // null
lpTable.remove("C");
console.log("buscar 'C' apos remover:", lpTable.search("C")); // null
console.log("buscar 'D':", lpTable.search("D")); // 4 (ainda presente)

// ------------------------------------------------------------
// 4. Comparacao de Tecnicas de Tratamento de Colisoes
// ------------------------------------------------------------
function compareHashTables() {
    const NUM_INSERTS = 1000;
    const LOAD_FACTOR = 0.75;
    const CAPACITY = Math.ceil(NUM_INSERTS / LOAD_FACTOR);

    // gerar chaves aleatorias (numeros inteiros)
    let keys = Array.from({ length: NUM_INSERTS }, () => Math.floor(Math.random() * 1000000));

    // testar encadeamento
    let chaining = new ChainingHashTable(CAPACITY);
    let start = performance.now();
    for (let k of keys) {
        chaining.insert(k, `valor_${k}`);
    }
    let insertTimeChaining = performance.now() - start;

    start = performance.now();
    for (let k of keys) {
        chaining.search(k);
    }
    let searchTimeChaining = performance.now() - start;

    // testar enderecamento aberto
    let probing = new LinearProbingHashTable(CAPACITY);
    start = performance.now();
    for (let k of keys) {
        probing.insert(k, `valor_${k}`);
    }
    let insertTimeProbing = performance.now() - start;

    start = performance.now();
    for (let k of keys) {
        probing.search(k);
    }
    let searchTimeProbing = performance.now() - start;

    console.log("\n=== Exercicio 4: Comparacao de Desempenho ===");
    console.log(`Insercoes (${NUM_INSERTS}):`);
    console.log(`  Encadeamento: ${insertTimeChaining.toFixed(2)} ms`);
    console.log(`  Enderecamento Aberto: ${insertTimeProbing.toFixed(2)} ms`);
    console.log(`Buscas (${NUM_INSERTS}):`);
    console.log(`  Encadeamento: ${searchTimeChaining.toFixed(2)} ms`);
    console.log(`  Enderecamento Aberto: ${searchTimeProbing.toFixed(2)} ms`);
}
compareHashTables();

// ------------------------------------------------------------
// 5. Aplicacao Pratica: Dicionario (palavras e significados)
// ------------------------------------------------------------
class Dictionary {
    constructor() {
        this.hashTable = new ChainingHashTable(100); // capacidade inicial
    }

    addWord(word, meaning) {
        this.hashTable.insert(word, meaning);
    }

    getMeaning(word) {
        return this.hashTable.search(word);
    }

    removeWord(word) {
        return this.hashTable.remove(word);
    }

    // percorre todas as listas e exibe as palavras (apenas para demonstracao)
    listAll() {
        console.log("Dicionario:");
        for (let i = 0; i < this.hashTable.capacity; i++) {
            let current = this.hashTable.table[i];
            while (current) {
                console.log(`  ${current.key}: ${current.value}`);
                current = current.next;
            }
        }
    }
}

console.log("\n=== Exercicio 5: Dicionario com Tabela Hash ===");
let dict = new Dictionary();
dict.addWord("casa", "Lugar onde se mora");
dict.addWord("carro", "Veiculo automotor");
dict.addWord("computador", "Maquina eletronica para processar dados");
console.log("Significado de 'casa':", dict.getMeaning("casa"));
console.log("Significado de 'aviao':", dict.getMeaning("aviao"));
dict.removeWord("carro");
console.log("Apos remover 'carro':");
dict.listAll();

// ------------------------------------------------------------
// 6. Analise de Desempenho com Diferentes Tamanhos de Tabela
// ------------------------------------------------------------
function performanceAnalysis() {
    const NUM_INSERTS = 500;
    const SIZES = [50, 100, 250];
    // gerar chaves aleatorias
    let keys = Array.from({ length: NUM_INSERTS }, () => Math.floor(Math.random() * 1000000));

    console.log("\n=== Exercicio 6: Analise de Desempenho ===");
    for (let size of SIZES) {
        let table = new ChainingHashTable(size);
        let start = performance.now();
        for (let k of keys) {
            table.insert(k, k);
        }
        let insertTime = performance.now() - start;

        // medir busca media (buscar cada chave)
        let totalSearch = 0;
        start = performance.now();
        for (let k of keys) {
            table.search(k);
            totalSearch += performance.now() - start;
            start = performance.now();
        }
        let avgSearch = totalSearch / keys.length;

        // medir remocao media
        let totalRemove = 0;
        start = performance.now();
        for (let k of keys) {
            table.remove(k);
            totalRemove += performance.now() - start;
            start = performance.now();
        }
        let avgRemove = totalRemove / keys.length;

        console.log(`Tamanho da tabela: ${size}`);
        console.log(`  Tempo total de insercao: ${insertTime.toFixed(2)} ms`);
        console.log(`  Tempo medio de busca: ${avgSearch.toFixed(4)} ms`);
        console.log(`  Tempo medio de remocao: ${avgRemove.toFixed(4)} ms`);
    }
}
performanceAnalysis();

// ------------------------------------------------------------
// 7. Funcao de Hash Personalizada para Strings
// ------------------------------------------------------------
function customStringHash(key, tableSize) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
        hash = (hash * 31 + key.charCodeAt(i)) % tableSize;
    }
    return hash;
}

// teste de distribuicao com 1000 strings aleatorias
function testHashDistribution() {
    const TABLE_SIZE = 100;
    const NUM_STRINGS = 1000;
    let strings = [];
    // gerar strings aleatorias de tamanho variavel (a..z)
    for (let i = 0; i < NUM_STRINGS; i++) {
        let len = Math.floor(Math.random() * 10) + 3;
        let str = "";
        for (let j = 0; j < len; j++) {
            str += String.fromCharCode(97 + Math.floor(Math.random() * 26));
        }
        strings.push(str);
    }

    let distribution = new Array(TABLE_SIZE).fill(0);
    let collisions = 0;
    for (let s of strings) {
        let idx = customStringHash(s, TABLE_SIZE);
        if (distribution[idx] > 0) collisions++;
        distribution[idx]++;
    }

    console.log("\n=== Exercicio 7: Funcao de Hash Personalizada ===");
    console.log(`Total de strings testadas: ${NUM_STRINGS}`);
    console.log(`Numero de colisoes: ${collisions}`);
    console.log(`Proporcao de colisoes: ${(collisions / NUM_STRINGS * 100).toFixed(2)}%`);
    console.log("Distribuicao dos indices (primeiros 20 posicoes):");
    for (let i = 0; i < Math.min(20, TABLE_SIZE); i++) {
        console.log(`  indice ${i}: ${distribution[i]} elementos`);
    }
}
testHashDistribution();