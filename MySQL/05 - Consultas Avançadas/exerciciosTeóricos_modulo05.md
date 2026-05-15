# Questões Teóricas – Consultas Avançadas (JOINs e Subconsultas)



## 📌 Visão Geral

| Tema | Descrição |
|------|----------|
| JOINs | Combinação de dados entre tabelas relacionadas |
| Subconsultas | Consultas aninhadas dentro de outra consulta |
| Agregação | Funções que processam conjuntos de valores |

---

# 1. INNER JOIN

> Explique o que é um INNER JOIN e cite um exemplo prático onde ele seria utilizado.

## ✅ Resposta

O INNER JOIN combina registros de duas ou mais tabelas retornando **apenas** as linhas que possuem correspondência em ambas as tabelas com base na condição definida.

Exemplo prático:

    SELECT clientes.nome, pedidos.valor_total
    FROM clientes
    INNER JOIN pedidos ON clientes.id_cliente = pedidos.id_cliente;

### 📌 Quando usar

- Quando se deseja apenas registros que possuem relação entre as tabelas
- Em relatórios de vendas onde só interessam clientes que fizeram pedidos
- Para verificar matrículas de alunos que possuem notas lançadas

Registros sem correspondência são **descartados** do resultado.

---

# 2. LEFT JOIN vs RIGHT JOIN

> Qual a diferença entre LEFT JOIN e RIGHT JOIN? Cite um exemplo prático para cada um.

## ✅ Resposta

### 📌 Comparação

| Tipo | Comportamento |
|------|--------------|
| LEFT JOIN | Retorna **todos** os registros da tabela à esquerda + correspondências da direita |
| RIGHT JOIN | Retorna **todos** os registros da tabela à direita + correspondências da esquerda |

Quando não há correspondência, o lado sem dados retorna `NULL`.

### Exemplo LEFT JOIN

    SELECT clientes.nome, pedidos.valor_total
    FROM clientes
    LEFT JOIN pedidos ON clientes.id_cliente = pedidos.id_cliente;

→ Lista **todos os clientes**, mesmo sem pedidos.

### Exemplo RIGHT JOIN

    SELECT clientes.nome, pedidos.valor_total
    FROM clientes
    RIGHT JOIN pedidos ON clientes.id_cliente = pedidos.id_cliente;

→ Lista **todos os pedidos**, mesmo sem cliente vinculado.

---

# 3. FULL OUTER JOIN no MySQL

> Explique como o FULL OUTER JOIN pode ser emulado no MySQL. Por que ele não é nativo?

## ✅ Resposta

O MySQL **não implementa** o FULL OUTER JOIN nativamente por razões de design do motor de consultas. Para obter o mesmo resultado, utiliza-se a combinação de LEFT JOIN e RIGHT JOIN com `UNION`:

    SELECT clientes.nome, pedidos.valor_total
    FROM clientes
    LEFT JOIN pedidos ON clientes.id_cliente = pedidos.id_cliente
    UNION
    SELECT clientes.nome, pedidos.valor_total
    FROM clientes
    RIGHT JOIN pedidos ON clientes.id_cliente = pedidos.id_cliente;

### 📌 Como funciona

- O LEFT JOIN traz todos os clientes (com ou sem pedidos)
- O RIGHT JOIN traz todos os pedidos (com ou sem clientes)
- O `UNION` une os dois resultados eliminando duplicatas

==O resultado final exibe todos os registros de ambas as tabelas, com NULL onde não houver correspondência==

---

# 4. Subconsultas Simples

> O que são subconsultas simples? Dê um exemplo onde uma subconsulta seria mais eficiente do que um JOIN.

## ✅ Resposta

Uma subconsulta simples é uma consulta SQL aninhada dentro de outra, executada de forma **independente** da consulta externa. Seu resultado é usado como valor ou condição para a consulta principal.

Exemplo — recuperar o cliente com o maior pedido:

    SELECT nome
    FROM clientes
    WHERE id_cliente = (
        SELECT id_cliente
        FROM pedidos
        ORDER BY valor_total DESC
        LIMIT 1
    );

### 📌 Quando a subconsulta é mais eficiente

- Quando se precisa de **um único valor escalar** para usar como filtro
- Evita a necessidade de agrupar e filtrar em um JOIN mais complexo
- Torna a leitura da consulta mais clara e direta

---

# 5. Subconsulta Simples vs Correlacionada

> Qual a diferença entre uma subconsulta simples e uma subconsulta correlacionada?

## ✅ Comparação

| Característica | Simples | Correlacionada |
|---------------|---------|----------------|
| Dependência | Independente da consulta externa | Depende de cada linha da consulta externa |
| Execução | Executada **uma única vez** | Executada **uma vez por linha** |
| Desempenho | Geralmente mais rápida | Pode ser mais lenta em grandes volumes |

### Exemplo Simples

    SELECT nome FROM clientes
    WHERE id_cliente = (SELECT id_cliente FROM pedidos ORDER BY valor_total DESC LIMIT 1);

### Exemplo Correlacionada

    SELECT nome, (
        SELECT SUM(valor_total)
        FROM pedidos
        WHERE pedidos.id_cliente = clientes.id_cliente
    ) AS total
    FROM clientes;

→ A subconsulta correlacionada referencia `clientes.id_cliente` da consulta externa, sendo reexecutada para cada cliente.

---

# 6. Funções de Agregação

> Explique o conceito de funções de agregação e liste as mais utilizadas no MySQL.

## ✅ Resposta

Funções de agregação processam um **conjunto de valores** e retornam um único resultado estatístico. São amplamente usadas em relatórios e análises de dados.

### 📌 Funções mais utilizadas

| Função | Descrição | Exemplo |
|--------|-----------|---------|
| `COUNT` | Conta registros | `SELECT COUNT(*) FROM pedidos` |
| `SUM` | Soma valores | `SELECT SUM(valor_total) FROM pedidos` |
| `AVG` | Calcula média | `SELECT AVG(valor_total) FROM pedidos` |
| `MAX` | Maior valor | `SELECT MAX(valor_total) FROM pedidos` |
| `MIN` | Menor valor | `SELECT MIN(valor_total) FROM pedidos` |

==Funções de agregação ignoram valores NULL por padrão (exceto COUNT(*))==

---

# 7. GROUP BY

> Qual a função do GROUP BY em uma consulta SQL? Em quais casos ele deve ser utilizado?

## ✅ Resposta

O `GROUP BY` organiza os registros em grupos com base em uma ou mais colunas, permitindo aplicar funções de agregação a cada grupo separadamente.

Exemplo:

    SELECT clientes.nome, SUM(pedidos.valor_total) AS total_vendas
    FROM clientes
    JOIN pedidos ON clientes.id_cliente = pedidos.id_cliente
    GROUP BY clientes.nome;

### 📌 Quando utilizar

- [x] Para calcular totais, médias ou contagens por categoria
- [x] Em relatórios de vendas agrupados por vendedor, produto ou período
- [x] Quando se deseja um resultado por grupo e não por linha individual

Toda coluna no `SELECT` que não esteja dentro de uma função de agregação **deve** estar no `GROUP BY`.

---

# 8. HAVING vs WHERE

> O que é a cláusula HAVING? Como ela difere da cláusula WHERE?

## ✅ Resposta

### 📌 Diferença principal

| Cláusula | Momento de aplicação | Contexto |
|----------|---------------------|---------|
| `WHERE` | Antes da agregação | Filtra linhas individuais |
| `HAVING` | Após a agregação | Filtra grupos gerados pelo GROUP BY |

### Exemplo com WHERE (filtra linhas antes de agrupar)

    SELECT nome, SUM(valor_total) AS total
    FROM clientes
    JOIN pedidos ON clientes.id_cliente = pedidos.id_cliente
    WHERE pedidos.valor_total > 100
    GROUP BY nome;

### Exemplo com HAVING (filtra grupos após agregar)

    SELECT clientes.nome, SUM(pedidos.valor_total) AS total_vendas
    FROM clientes
    JOIN pedidos ON clientes.id_cliente = pedidos.id_cliente
    GROUP BY clientes.nome
    HAVING total_vendas > 200;

==Use WHERE para filtrar registros individuais e HAVING para filtrar resultados agregados==

---

# 9. Cenários com GROUP BY e Agregação

> Cite dois cenários práticos onde você utilizaria a combinação de GROUP BY e funções de agregação.

## ✅ Resposta

### Cenário 1 — E-commerce: Receita por Cliente

Identificar quanto cada cliente gastou no total para segmentação de marketing:

    SELECT clientes.nome, SUM(pedidos.valor_total) AS receita_total
    FROM clientes
    JOIN pedidos ON clientes.id_cliente = pedidos.id_cliente
    GROUP BY clientes.nome
    ORDER BY receita_total DESC;

### Cenário 2 — Sistema Acadêmico: Média de Notas por Disciplina

Calcular a média das notas de todos os alunos em cada disciplina:

    SELECT disciplinas.nome, AVG(notas.valor) AS media_turma
    FROM disciplinas
    JOIN notas ON disciplinas.id_disciplina = notas.id_disciplina
    GROUP BY disciplinas.nome;

### 📌 Outros cenários comuns

- ❌ Sem GROUP BY → resultado seria uma única linha com o total geral
- ✔️ Com GROUP BY → resultado detalhado por grupo, essencial para relatórios

---

# 10. Importância dos JOINs

> Explique a importância dos JOINs em bancos de dados relacionais. Como eles contribuem para evitar redundâncias e promover eficiência?

## ✅ Resposta

Os JOINs são fundamentais nos bancos de dados relacionais porque permitem **combinar dados distribuídos em diferentes tabelas** com base em relacionamentos definidos por chaves primárias e estrangeiras.

### ✅ Benefícios

- [x] Eliminam a necessidade de duplicar dados entre tabelas
- [x] Permitem consultar informações relacionadas de forma integrada
- [x] Mantêm a normalização do banco sem perder a capacidade de análise
- [x] Reduzem o tamanho do banco ao evitar repetição de dados

### ❌ Sem JOINs (problema)

Seria necessário armazenar o nome do cliente em cada linha da tabela de pedidos, gerando redundância e risco de inconsistência.

### ✅ Com JOINs (solução)

O nome fica apenas na tabela `clientes` e é recuperado dinamicamente quando necessário:

    SELECT clientes.nome, pedidos.valor_total
    FROM clientes
    INNER JOIN pedidos ON clientes.id_cliente = pedidos.id_cliente;

==JOINs são a base do modelo relacional: normalização dos dados + consulta integrada==

---

## Conclusão

- ✔️ INNER JOIN retorna apenas correspondências entre tabelas
- ✔️ LEFT/RIGHT JOIN preservam todos os registros de um lado da relação
- ✔️ Subconsultas permitem consultas dinâmicas e aninhadas
- ✔️ Funções de agregação com GROUP BY e HAVING possibilitam análises poderosas
