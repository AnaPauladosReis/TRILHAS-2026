# 📚 Trilha de Estudos — Estrutura de Dados & MySQL

![Status](https://img.shields.io/badge/Status-Em%20Andamento-yellow?style=for-the-badge)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6%2B-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-pptxgenjs-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Ano](https://img.shields.io/badge/Ano-2026-blueviolet?style=for-the-badge)

> Repositório de estudos e exercícios práticos das trilhas de **Estrutura de Dados** e **MySQL**, cobrindo desde estruturas lineares e recursividade até modelagem relacional, otimização de consultas, segurança e automação com triggers e eventos.

---

## 🗂️ Estrutura de Pastas

```
📦 trilha-estudos
├── 📁 Estrutura de Dados
│   ├── 📁 02 Estrutura de Dados
│   │   └── assignment.js          # Vetores, listas, pilha, fila e fila circular
│   ├── 📁 03 Recursividade
│   │   └── assignment.js          # Fatorial, Fibonacci, Hanói, BST e listas encadeadas
│   ├── 📁 04 Estrutura de Dados não Lineares
│   │   └── assignment.js          # BST, AVL, Heap, Grafos (DFS/BFS/Dijkstra), Floyd-Warshall
│   └── 📁 05 Tabelas Hash
│       └── assignment.js          # Hashing, Chaining, Probing Linear, Dicionário
│
└── 📁 MySQL
    ├── 📁 01 - Introdução
    │   └── 01 - assignment         # Conceitos, arquitetura, InnoDB vs MyISAM, segurança
    ├── 📁 02 - Estruturação de Banco de Dados
    │   └── normalizacao.js         # Gerador de slides PPTX sobre normalização (pptxgenjs)
    ├── 📁 03 - Manipulação de Dados - DLM
    │   ├── exerciciospraticos.md   # INSERT, UPDATE, DELETE, WHERE, GROUP BY
    │   └── teorico.md              # Fundamentos teóricos de DML
    ├── 📁 04 - Relacionamento entre Tabelas
    │   ├── exerciciosPraticos.md   # PK, FK, CASCADE, JOINs, N:N
    │   └── exerciciosteoricos.md   # Teoria de cardinalidades e integridade referencial
    ├── 📁 05 - Consultas Avançadas
    │   ├── exerciciosPraticos_modulo05.md    # INNER/LEFT/RIGHT JOIN, subconsultas, agregação
    │   └── exerciciosTeóricos_modulo05.md    # Teoria de JOINs e funções de agregação
    ├── 📁 06 - Índices e Otimização de Consultas
    │   ├── exerciciosPraticos_modulo06.md    # CREATE INDEX, EXPLAIN, Full Table Scan
    │   └── exerciciosTeóricos_modulo06.md    # Teoria de índices e performance
    ├── 📁 07 - Segurança e Controle de Acesso
    │   ├── exerciciosPraticos_modulo07.md    # CREATE USER, GRANT, REVOKE, políticas de senha
    │   └── exerciciosTeóricos_modulo07.md    # Teoria de segurança e menor privilégio
    ├── 📁 08 - Backup e Restauração
    │   ├── exerciciosPraticos_modulo08.md    # mysqldump, LOAD DATA, cron jobs
    │   └── exerciciosTeóricos_modulo08.md    # Teoria de backup e logs binários
    ├── 📁 09 - Funções e Procedimentos
    │   ├── exerciciosPraticos_modulo09.md    # CONCAT, DATE_FORMAT, ROUND, PROCEDURE, UDF
    │   └── exerciciosTeóricos_modulo09.md    # Teoria de funções e stored procedures
    ├── 📁 10 - Triggers e Eventos
    │   ├── exerciciosPraticos_modulo10.md    # BEFORE/AFTER triggers, eventos agendados
    │   └── exerciciosTeóricos_modulo10.md    # Teoria de automação com triggers e eventos
    └── 📁 11 - Projeto Prático e Avaliações
        └── projeto_final_modulo11_poneiflores.md  # Projeto final integrado: Ponei Flores 🌸
```

---

## ✨ Funcionalidades por Módulo

### 🧱 Estrutura de Dados (JavaScript)

| Módulo | Conteúdo |
|--------|----------|
| **02 — Estruturas Lineares** | Vetores com busca e remoção; Lista Simplesmente e Duplamente Encadeada; Pilha com verificação de parênteses; Fila simples e Fila Circular |
| **03 — Recursividade** | Fatorial; Fibonacci (simples e com memoization); Percursos em árvore (pré/in/pós-ordem); Soma e contagem em listas; Busca em BST; Torre de Hanói com análise de complexidade |
| **04 — Estruturas Não Lineares** | BST completa (insert/search/remove); Árvore AVL com rotações; MaxHeap e Fila de Prioridade; Grafo com DFS, BFS e Dijkstra; Floyd-Warshall para todos os pares |
| **05 — Tabelas Hash** | Funções hash para inteiros e strings; Chaining com lista encadeada; Probing Linear com rehash; Dicionário; Comparação de performance; Hash com distribuição por multiplicação polinomial |

### 🗄️ MySQL

| Módulo | Conteúdo |
|--------|----------|
| **01 — Introdução** | Conceitos de SGBD; ACID vs BASE; Arquitetura MySQL; InnoDB vs MyISAM; CLI; Segurança; Buffer Pool |
| **02 — Normalização** | 1FN, 2FN, 3FN, BCNF; Anomalias; Geração de slides PPTX automatizada via Node.js |
| **03 — DML** | `INSERT`, `UPDATE`, `DELETE`, `SELECT`, `WHERE`, `ORDER BY`, `LIMIT`, `DISTINCT`, `GROUP BY` |
| **04 — Relacionamentos** | Chave primária e estrangeira; 1:1, 1:N, N:N; `ON DELETE CASCADE`; `ON UPDATE CASCADE`; Tabelas intermediárias |
| **05 — Consultas Avançadas** | `INNER JOIN`, `LEFT JOIN`, `RIGHT JOIN`, `FULL OUTER JOIN` (emulado); Subconsultas simples e correlacionadas; `COUNT`, `SUM`, `AVG`, `MAX`, `MIN`; `GROUP BY` + `HAVING` |
| **06 — Índices e Otimização** | `CREATE INDEX`, `UNIQUE INDEX`, índice composto; `EXPLAIN`; Full Table Scan; `LIMIT`; Evitar funções em colunas indexadas |
| **07 — Segurança** | `CREATE USER`, `ALTER USER`, `DROP USER`; `GRANT`, `REVOKE`; Menor privilégio; Restrição por host; Políticas de senha |
| **08 — Backup e Restauração** | `mysqldump`; backup completo, parcial e de todos os bancos; backup incremental com logs binários; `SELECT INTO OUTFILE`; `LOAD DATA INFILE`; automação com cron |
| **09 — Funções e Procedimentos** | `CONCAT`, `SUBSTRING`, `UPPER`, `LOWER`; `NOW`, `CURDATE`, `DATE_FORMAT`, `DATEDIFF`; `ROUND`, `FLOOR`, `CEIL`; `STORED PROCEDURE` com `IN`/`OUT`/`INOUT`; UDFs |
| **10 — Triggers e Eventos** | `BEFORE INSERT` (validação); `AFTER INSERT/DELETE` (log e atualização); `DROP TRIGGER`; `CREATE EVENT`; `event_scheduler`; limpeza automática de logs |
| **11 — Projeto Final** | Sistema completo **Ponei Flores 🌸**: modelagem, inserção, JOINs, subconsultas, stored procedure transacional, índices, EXPLAIN, trigger de auditoria, evento de manutenção |

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Versão | Uso |
|------------|--------|-----|
| **JavaScript (ES6+)** | — | Implementação de todas as estruturas de dados |
| **MySQL** | 8.0+ | SGBD utilizado em todos os módulos da trilha SQL |
| **Markdown** | — | Documentação dos exercícios teóricos e práticos |

---


## 📊 Visão Geral das Estruturas Implementadas

```
Estruturas de Dados
├── Lineares
│   ├── Vetor (busca linear, remoção por posição)
│   ├── Lista Simplesmente Encadeada
│   ├── Lista Duplamente Encadeada
│   ├── Pilha (Stack) com verificação de parênteses
│   └── Fila (Queue) + Fila Circular
├── Recursivas
│   ├── Fatorial e Fibonacci (+ memoization)
│   ├── Percursos em Árvore (pré/in/pós-ordem)
│   ├── Busca em BST
│   └── Torre de Hanói
├── Não Lineares
│   ├── BST (insert, search, remove)
│   ├── AVL (rotações, rebalanceamento)
│   ├── MaxHeap e Fila de Prioridade
│   └── Grafo (DFS, BFS, Dijkstra, Floyd-Warshall)
└── Hash
    ├── Hash por módulo (inteiros e strings)
    ├── Chaining (lista encadeada por bucket)
    ├── Probing Linear (com rehash)
    └── Hash polinomial (distribuição uniforme)
```

---

## 🌸 Projeto Final — Ponei Flores

O módulo 11 integra todos os conceitos da trilha MySQL em um sistema real de vendas para uma floricultura boutique.

| Componente | Implementação |
|------------|--------------|
| Modelagem | 4 tabelas normalizadas com PK e FK |
| Integridade | `ON DELETE CASCADE` e `RESTRICT` |
| Consultas | JOINs de 4 tabelas + subconsultas analíticas |
| Procedure | `registrar_pedido` com transação e validação de estoque |
| Índices | 4 índices estratégicos com análise via `EXPLAIN` |
| Trigger | Log automático de exclusões de pedidos |
| Evento | Limpeza de logs com mais de 60 dias a cada 24h |

---

## 👩‍💻 Créditos

Desenvolvido por **Ana Paula dos Reis**
Trilha: Estrutura de Dados & MySQL — 2026

---

*"Aprender é construir estruturas na mente — uma por vez."*
