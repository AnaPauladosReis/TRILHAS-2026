# Questões Práticas – Funções e Procedimentos


| Tema | Foco |
|------|------|
| Strings | CONCAT, SUBSTRING, LOWER, UPPER |
| Data e Hora | NOW, CURDATE, DATE_FORMAT, DATEDIFF |
| Matemáticas | ROUND, FLOOR, CEIL, ABS |
| Procedures | CREATE PROCEDURE, CALL |
| UDFs | CREATE FUNCTION, RETURNS |

---

# 1. Manipulação de Strings com CONCAT

> Crie uma consulta que utilize CONCAT para gerar um identificador único combinando o nome e o ID de um cliente.

## ✅ Resposta

    SELECT CONCAT(id_cliente, '-', LOWER(nome)) AS identificador
    FROM clientes;

### Resultado esperado

| identificador |
|--------------|
| 1-joão silva |
| 2-maria souza |
| 3-ana oliveira |

### Explicação

- `CONCAT` une os valores em uma única string
- O separador `'-'` é inserido entre o ID e o nome
- `LOWER` padroniza o nome em letras minúsculas para uniformidade

---

# 2. Função SUBSTRING

> Extraia os três primeiros caracteres do nome de um produto na tabela produtos.

## ✅ Resposta

    SELECT nome, SUBSTRING(nome, 1, 3) AS prefixo
    FROM produtos;

### Resultado esperado

| nome | prefixo |
|------|---------|
| Monitor | Mon |
| Teclado | Tec |
| Mouse | Mou |

### Explicação

- `SUBSTRING(coluna, posição_inicial, comprimento)`
- Posição `1` = primeiro caractere (MySQL começa em 1, não em 0)
- Comprimento `3` = extrai 3 caracteres a partir da posição inicial

---

# 3. Uso de LOWER e UPPER

> Converta todos os nomes de clientes para letras maiúsculas em uma consulta SQL.

## ✅ Resposta

    SELECT id_cliente, UPPER(nome) AS nome_maiusculo
    FROM clientes;

### Resultado esperado

| id_cliente | nome_maiusculo |
|-----------|---------------|
| 1 | JOÃO SILVA |
| 2 | MARIA SOUZA |
| 3 | ANA OLIVEIRA |

### Aplicações

- `UPPER` → padronizar dados antes de comparações ou relatórios
- `LOWER` → normalizar e-mails e identificadores

---

# 4. Funções de Data e Hora

> Escreva uma consulta que utilize NOW para exibir a data e hora atuais, formatando a saída para DD/MM/AAAA HH:MM:SS com DATE_FORMAT.

## ✅ Resposta

    SELECT DATE_FORMAT(NOW(), '%d/%m/%Y %H:%i:%s') AS data_hora_formatada;

### Resultado esperado

| data_hora_formatada |
|--------------------|
| 15/05/2026 14:30:45 |

### Tabela de formatadores DATE_FORMAT

| Código | Significado |
|--------|------------|
| `%d` | Dia com dois dígitos |
| `%m` | Mês com dois dígitos |
| `%Y` | Ano com quatro dígitos |
| `%H` | Hora (00-23) |
| `%i` | Minutos |
| `%s` | Segundos |

---

# 5. Diferença de Datas com DATEDIFF

> Calcule o número de dias entre a data de hoje e a data de um pedido na tabela pedidos usando DATEDIFF.

## ✅ Resposta

    SELECT id_pedido,
           data_pedido,
           DATEDIFF(CURDATE(), data_pedido) AS dias_desde_pedido
    FROM pedidos;

### Resultado esperado

| id_pedido | data_pedido | dias_desde_pedido |
|-----------|------------|------------------|
| 101 | 2026-04-01 | 44 |
| 102 | 2026-03-15 | 61 |

### Aplicação prática

    -- Identificar pedidos atrasados há mais de 30 dias
    SELECT id_pedido, DATEDIFF(CURDATE(), data_pedido) AS atraso
    FROM pedidos
    WHERE status = 'pendente'
    AND DATEDIFF(CURDATE(), data_pedido) > 30;

---

# 6. Arredondamento com ROUND

> Arredonde o valor de um campo de preço para duas casas decimais usando ROUND.

## ✅ Resposta

    SELECT nome, preco, ROUND(preco, 2) AS preco_arredondado
    FROM produtos;

### Resultado esperado

| nome | preco | preco_arredondado |
|------|-------|------------------|
| Monitor | 1299.999 | 1300.00 |
| Teclado | 89.555 | 89.56 |
| Mouse | 45.124 | 45.12 |

### Explicação

- `ROUND(valor, casas_decimais)` arredonda seguindo a regra matemática padrão
- Valores com `≥ 5` na casa seguinte arredondam para cima, `< 5` para baixo

---

# 7. FLOOR e CEIL

> Use FLOOR para arredondar para baixo e CEIL para arredondar para cima o valor de total de vendas.

## ✅ Resposta

    SELECT valor_total,
           FLOOR(valor_total) AS arredondado_baixo,
           CEIL(valor_total)  AS arredondado_cima
    FROM pedidos;

### Resultado esperado

| valor_total | arredondado_baixo | arredondado_cima |
|-------------|------------------|-----------------|
| 123.456 | 123 | 124 |
| 89.001 | 89 | 90 |
| 200.000 | 200 | 200 |

### Quando usar cada um

| Função | Comportamento | Uso típico |
|--------|--------------|-----------|
| `ROUND` | Arredonda matematicamente | Preços, médias |
| `FLOOR` | Sempre para baixo | Cálculo de parcelas inteiras |
| `CEIL` | Sempre para cima | Estimativas conservadoras, frete |

---

# 8. Criação de Procedimentos Armazenados

> Crie um procedimento armazenado que insira um novo pedido na tabela pedidos, recebendo como entrada o ID do cliente e a data do pedido.

## ✅ Resposta

    DELIMITER $$

    CREATE PROCEDURE inserir_pedido(
        IN p_id_cliente INT,
        IN p_data_pedido DATE
    )
    BEGIN
        INSERT INTO pedidos (id_cliente, data_pedido, status)
        VALUES (p_id_cliente, p_data_pedido, 'pendente');
    END$$

    DELIMITER ;

### Explicação

- `DELIMITER $$` muda o delimitador para que o `;` interno não encerre o comando prematuramente
- `IN` define parâmetros de entrada
- O corpo do procedimento é delimitado por `BEGIN ... END`

---

# 9. Execução de Procedimentos Armazenados

> Execute o procedimento criado no exercício anterior para adicionar um pedido com seus parâmetros.

## ✅ Resposta

    CALL inserir_pedido(3, '2026-05-15');

### Verificação após execução

    SELECT * FROM pedidos ORDER BY id_pedido DESC LIMIT 1;
    -- O novo pedido do cliente 3 deve aparecer com data 2026-05-15

### Explicação

- `CALL` é o comando para executar um procedimento armazenado
- Os parâmetros são passados na ordem declarada no `CREATE PROCEDURE`
- O procedimento pode ser executado quantas vezes necessário com diferentes parâmetros

---

# 10. Criação de UDF (Função Definida pelo Usuário)

> Crie uma função que calcule o valor total de um pedido aplicando um desconto percentual e use-a em uma consulta.

## ✅ Resposta

    DELIMITER $$

    CREATE FUNCTION calcular_desconto(
        valor DECIMAL(10,2),
        desconto DECIMAL(10,2)
    )
    RETURNS DECIMAL(10,2)
    DETERMINISTIC
    BEGIN
        RETURN valor - (valor * desconto / 100);
    END$$

    DELIMITER ;

### Usando a função em uma consulta

    SELECT id_pedido,
           valor_total,
           calcular_desconto(valor_total, 10) AS valor_com_desconto_10pct
    FROM pedidos;

### Resultado esperado

| id_pedido | valor_total | valor_com_desconto_10pct |
|-----------|-------------|--------------------------|
| 101 | 200.00 | 180.00 |
| 102 | 150.00 | 135.00 |

### Explicação

- `RETURNS DECIMAL(10,2)` define o tipo do valor retornado
- `DETERMINISTIC` indica que para os mesmos parâmetros a função sempre retorna o mesmo resultado
- A função pode ser usada diretamente em `SELECT`, `WHERE` e `ORDER BY`

---

## Conclusão

- ✔️ Funções de string permitem formatar e manipular dados diretamente nas consultas
- ✔️ Funções de data facilitam cálculos temporais como atrasos e prazos
- ✔️ Funções matemáticas garantem precisão em cálculos financeiros
- ✔️ Stored Procedures encapsulam lógica reutilizável e reduzem código duplicado
- ✔️ UDFs criam cálculos personalizados reutilizáveis em qualquer consulta
