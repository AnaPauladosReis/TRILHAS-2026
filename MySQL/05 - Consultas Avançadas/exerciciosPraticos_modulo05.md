# Questões Práticas – Consultas Avançadas (JOINs e Subconsultas)


| Tema | Foco |
|------|------|
| JOINs | INNER, LEFT, RIGHT, FULL OUTER |
| Subconsultas | Simples e Correlacionadas |
| Agregação | COUNT, SUM, AVG, MAX, MIN |
| Agrupamento | GROUP BY e HAVING |

---

# 1. INNER JOIN

> Crie uma consulta que liste o nome dos clientes e os valores dos pedidos realizados, exibindo apenas aqueles que possuem pedidos registrados.

## ✅ Resposta

    SELECT clientes.nome, pedidos.valor_total
    FROM clientes
    INNER JOIN pedidos ON clientes.id_cliente = pedidos.id_cliente;

### Explicação

- O INNER JOIN retorna apenas os registros com correspondência em ambas as tabelas
- Clientes sem pedidos **não** aparecem no resultado
- É o tipo de JOIN mais restritivo

### Resultado esperado

| nome | valor_total |
|------|------------|
| João Silva | 150.00 |
| Maria Souza | 200.00 |

---

# 2. LEFT JOIN

> Escreva uma consulta que liste todos os clientes e os valores de seus pedidos. Caso o cliente não tenha realizado pedidos, exiba NULL na coluna do valor total.

## ✅ Resposta

    SELECT clientes.nome, pedidos.valor_total
    FROM clientes
    LEFT JOIN pedidos ON clientes.id_cliente = pedidos.id_cliente;

### Explicação

- O LEFT JOIN retorna **todos** os registros da tabela à esquerda (`clientes`)
- Para clientes sem pedidos, `valor_total` aparece como `NULL`
- Útil para identificar clientes inativos

### Resultado esperado

| nome | valor_total |
|------|------------|
| João Silva | 150.00 |
| Maria Souza | 200.00 |
| Ana Oliveira | NULL |

---

# 3. RIGHT JOIN

> Crie uma consulta para listar todos os pedidos e os nomes dos clientes que os realizaram. Se o pedido não estiver associado a um cliente, exiba NULL na coluna do nome do cliente.

## ✅ Resposta

    SELECT clientes.nome, pedidos.valor_total
    FROM clientes
    RIGHT JOIN pedidos ON clientes.id_cliente = pedidos.id_cliente;

### Explicação

- O RIGHT JOIN retorna **todos** os registros da tabela à direita (`pedidos`)
- É a inversão lógica do LEFT JOIN
- Pedidos sem cliente vinculado exibem `NULL` no nome

### Resultado esperado

| nome | valor_total |
|------|------------|
| João Silva | 150.00 |
| Maria Souza | 200.00 |
| NULL | 350.00 |

---

# 4. FULL OUTER JOIN

> Emule um FULL OUTER JOIN utilizando UNION, para exibir todos os clientes e pedidos, mesmo que não possuam correspondência.

## ✅ Resposta

    SELECT clientes.nome, pedidos.valor_total
    FROM clientes
    LEFT JOIN pedidos ON clientes.id_cliente = pedidos.id_cliente
    UNION
    SELECT clientes.nome, pedidos.valor_total
    FROM clientes
    RIGHT JOIN pedidos ON clientes.id_cliente = pedidos.id_cliente;

### Explicação

- O MySQL **não possui** suporte nativo ao FULL OUTER JOIN
- A emulação combina LEFT JOIN + RIGHT JOIN com `UNION`
- O `UNION` elimina duplicatas automaticamente

### Resultado esperado

| nome | valor_total |
|------|------------|
| João Silva | 150.00 |
| Maria Souza | 200.00 |
| Ana Oliveira | NULL |
| NULL | 350.00 |

---

# 5. Subconsulta Simples em SELECT

> Escreva uma consulta que recupere o nome do cliente que realizou o pedido de maior valor.

## ✅ Resposta

    SELECT nome
    FROM clientes
    WHERE id_cliente = (
        SELECT id_cliente
        FROM pedidos
        ORDER BY valor_total DESC
        LIMIT 1
    );

### Explicação

- A subconsulta interna busca o `id_cliente` do pedido de maior valor
- A consulta externa usa esse ID para recuperar o nome do cliente
- `ORDER BY ... DESC` + `LIMIT 1` garante pegar apenas o maior valor

### Resultado esperado

| nome |
|------|
| Maria Souza |

---

# 6. Subconsulta Simples em INSERT

> Adicione um novo pedido para o cliente que possui o pedido de maior valor. Utilize uma subconsulta para encontrar o cliente.

## ✅ Resposta

    INSERT INTO pedidos (id_cliente, valor_total)
    VALUES (
        (SELECT id_cliente FROM pedidos ORDER BY valor_total DESC LIMIT 1),
        500.00
    );

### Explicação

- A subconsulta identifica dinamicamente o `id_cliente` do maior pedido
- O `INSERT` usa esse resultado para vincular o novo pedido
- Evita hardcoding de IDs, tornando a consulta mais robusta

---

# 7. Subconsulta Correlacionada

> Liste os nomes dos clientes e o total de valores de seus pedidos utilizando uma subconsulta correlacionada.

## ✅ Resposta

    SELECT nome, (
        SELECT SUM(valor_total)
        FROM pedidos
        WHERE pedidos.id_cliente = clientes.id_cliente
    ) AS total_pedidos
    FROM clientes;

### Explicação

- A subconsulta correlacionada é executada **uma vez por linha** da consulta externa
- Ela referencia `clientes.id_cliente` da consulta principal
- Clientes sem pedidos retornam `NULL` em `total_pedidos`

### Resultado esperado

| nome | total_pedidos |
|------|--------------|
| João Silva | 150.00 |
| Maria Souza | 200.00 |
| Ana Oliveira | NULL |

---

# 8. Função de Agregação COUNT

> Crie uma consulta que conte o número total de pedidos realizados.

## ✅ Resposta

    SELECT COUNT(*) AS total_pedidos
    FROM pedidos;

### Explicação

- `COUNT(*)` conta **todos** os registros da tabela
- O alias `AS total_pedidos` nomeia a coluna de resultado
- Para contar apenas valores não nulos, use `COUNT(coluna)`

### Resultado esperado

| total_pedidos |
|--------------|
| 2 |

---

# 9. Função de Agregação com GROUP BY

> Liste o total de vendas por cliente (nome e total vendido).

## ✅ Resposta

    SELECT clientes.nome, SUM(pedidos.valor_total) AS total_vendas
    FROM clientes
    JOIN pedidos ON clientes.id_cliente = pedidos.id_cliente
    GROUP BY clientes.nome;

### Explicação

- `SUM()` soma os valores agrupados por cliente
- `GROUP BY` organiza os registros em grupos pelo nome do cliente
- O JOIN garante que apenas clientes com pedidos apareçam

### Resultado esperado

| nome | total_vendas |
|------|-------------|
| João Silva | 150.00 |
| Maria Souza | 200.00 |

---

# 10. Função de Agregação com GROUP BY e HAVING

> Liste os clientes que realizaram vendas superiores a 200, exibindo o nome do cliente e o total vendido.

## ✅ Resposta

    SELECT clientes.nome, SUM(pedidos.valor_total) AS total_vendas
    FROM clientes
    JOIN pedidos ON clientes.id_cliente = pedidos.id_cliente
    GROUP BY clientes.nome
    HAVING total_vendas > 200;

### Explicação

- `HAVING` filtra os grupos **após** a agregação (diferente do `WHERE`, que filtra antes)
- Apenas clientes com total superior a 200 aparecem no resultado
- Combina `GROUP BY` + `SUM()` + `HAVING` para análise filtrada

### Resultado esperado

| nome | total_vendas |
|------|-------------|
| Maria Souza | 200.00 |

---

## Conclusão

- ✔️ JOINs permitem combinar dados de múltiplas tabelas de forma eficiente
- ✔️ Subconsultas simplificam consultas complexas e dinâmicas
- ✔️ Funções de agregação são essenciais para análise e relatórios
- ✔️ GROUP BY + HAVING possibilita filtros poderosos sobre dados agrupados
