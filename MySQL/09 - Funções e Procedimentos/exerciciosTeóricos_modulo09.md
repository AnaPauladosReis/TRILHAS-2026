# Questões Teóricas – Funções e Procedimentos



## 📌 Visão Geral

| Tema | Descrição |
|------|----------|
| Funções nativas | Strings, datas e matemática |
| Stored Procedures | Lógica armazenada no banco |
| UDFs | Funções personalizadas pelo usuário |

---

# 1. Definição de Funções

> O que são funções no MySQL e quais os tipos mais comuns?

## ✅ Resposta

Funções no MySQL são rotinas pré-definidas ou criadas pelo usuário que recebem parâmetros, executam uma operação e retornam um único valor. Elas podem ser usadas diretamente em instruções `SELECT`, `WHERE` e `ORDER BY`.

### 📌 Tipos mais comuns

| Categoria | Funções principais | Exemplo |
|-----------|-------------------|---------|
| Strings | `CONCAT`, `SUBSTRING`, `UPPER`, `LOWER`, `LENGTH` | `CONCAT('Olá', ' ', 'Mundo')` |
| Data e Hora | `NOW`, `CURDATE`, `DATE_FORMAT`, `DATEDIFF` | `DATEDIFF(CURDATE(), data)` |
| Matemáticas | `ROUND`, `FLOOR`, `CEIL`, `ABS`, `MOD` | `ROUND(3.14159, 2)` |
| Agregação | `COUNT`, `SUM`, `AVG`, `MAX`, `MIN` | `SUM(valor_total)` |
| Definidas pelo usuário | UDFs criadas com `CREATE FUNCTION` | `calcular_desconto(200, 10)` |

==Funções encapsulam operações reutilizáveis e tornam as consultas mais expressivas e organizadas==

---

# 2. Função CONCAT

> Explique como a função CONCAT pode ser usada para manipular dados em relatórios.

## ✅ Resposta

A função `CONCAT` une dois ou mais valores (strings, números ou colunas) em uma única string. É amplamente usada para formatar saídas em relatórios e gerar campos calculados.

### Usos práticos em relatórios

**Gerar identificadores legíveis:**

    SELECT CONCAT(id_cliente, '-', LOWER(nome)) AS identificador
    FROM clientes;
    -- Resultado: 1-joão silva

**Montar endereços completos:**

    SELECT CONCAT(rua, ', ', numero, ' - ', cidade) AS endereco_completo
    FROM clientes;
    -- Resultado: Rua das Flores, 42 - São Paulo

**Formatar nomes completos:**

    SELECT CONCAT(primeiro_nome, ' ', sobrenome) AS nome_completo
    FROM funcionarios;

### 📌 Variante: CONCAT_WS

`CONCAT_WS(separador, val1, val2, ...)` — versão que ignora valores `NULL` automaticamente:

    SELECT CONCAT_WS(' | ', nome, email, cidade) AS dados_cliente
    FROM clientes;

---

# 3. Funções de Data e Hora

> Qual a diferença entre NOW e CURDATE? Cite exemplos de suas aplicações.

## ✅ Resposta

### 📌 Comparação

| Função | Retorna | Exemplo de resultado |
|--------|---------|---------------------|
| `NOW()` | Data **e hora** atuais | `2026-05-15 14:30:45` |
| `CURDATE()` | Apenas a **data** atual | `2026-05-15` |

### Aplicações de NOW

    -- Registrar o momento exato de criação de um pedido
    INSERT INTO pedidos (id_cliente, criado_em) VALUES (1, NOW());

    -- Exibir data e hora formatadas
    SELECT DATE_FORMAT(NOW(), '%d/%m/%Y %H:%i:%s') AS agora;

### Aplicações de CURDATE

    -- Listar pedidos do dia atual
    SELECT * FROM pedidos WHERE DATE(data_pedido) = CURDATE();

    -- Calcular dias desde um evento
    SELECT DATEDIFF(CURDATE(), data_nascimento) / 365 AS idade_anos
    FROM clientes;

==Use NOW() quando a hora importa; use CURDATE() quando apenas a data é relevante==

---

# 4. Arredondamento: ROUND, FLOOR e CEIL

> Qual é a diferença entre as funções ROUND, FLOOR e CEIL? Em que situações cada uma é mais adequada?

## ✅ Resposta

### 📌 Comparação

| Função | Comportamento | Resultado para 123.456 |
|--------|--------------|----------------------|
| `ROUND(123.456, 2)` | Arredonda matematicamente | 123.46 |
| `FLOOR(123.456)` | Sempre arredonda para baixo | 123 |
| `CEIL(123.456)` | Sempre arredonda para cima | 124 |

### Quando usar cada uma

**ROUND** — para valores financeiros com precisão:

    SELECT ROUND(preco * 1.1, 2) AS preco_com_imposto FROM produtos;

**FLOOR** — para garantir que nunca se excede um limite (ex: parcelas):

    SELECT FLOOR(valor_total / 3) AS valor_parcela FROM pedidos;

**CEIL** — para estimativas conservadoras (ex: frete, horas cobradas):

    SELECT CEIL(distancia_km / 100) AS blocos_frete FROM entregas;

---

# 5. Vantagens dos Procedimentos Armazenados

> Liste três vantagens de usar procedimentos armazenados em um banco de dados MySQL.

## ✅ Resposta

### ✅ Vantagem 1 — Redução de redundância e reutilização de código

O mesmo procedimento pode ser chamado por diferentes aplicações ou módulos com `CALL`, eliminando a necessidade de reescrever a mesma lógica SQL em cada ponto:

    CALL gerar_relatorio_vendas('2026-01-01', '2026-12-31');

### ✅ Vantagem 2 — Melhoria de performance

O código de um procedimento é **compilado e armazenado** no servidor na primeira execução. Nas chamadas subsequentes, o plano de execução já está otimizado, reduzindo o tempo de processamento.

### ✅ Vantagem 3 — Maior segurança e controle de acesso

Usuários podem ter permissão para **executar** um procedimento sem ter acesso direto às tabelas envolvidas. Isso protege os dados e centraliza a lógica de negócio no banco:

    GRANT EXECUTE ON PROCEDURE inserir_pedido TO 'app_user'@'localhost';

### Outras vantagens

- [x] Centralização da lógica de negócio no banco
- [x] Facilita manutenção — alterações em um único lugar
- [x] Reduz o tráfego de rede ao enviar apenas o `CALL` em vez de múltiplas queries

---

# 6. Parâmetros de Procedimentos: IN, OUT e INOUT

> Qual a diferença entre os tipos de parâmetros IN, OUT e INOUT em procedimentos armazenados?

## ✅ Resposta

### 📌 Comparação

| Tipo | Direção | Pode ler? | Pode modificar para fora? |
|------|---------|-----------|--------------------------|
| `IN` | Entrada | ✅ Sim | ❌ Não |
| `OUT` | Saída | ❌ Não | ✅ Sim |
| `INOUT` | Entrada e saída | ✅ Sim | ✅ Sim |

### Exemplo com IN (somente entrada)

    CREATE PROCEDURE buscar_cliente(IN p_id INT)
    BEGIN
        SELECT * FROM clientes WHERE id_cliente = p_id;
    END;

    CALL buscar_cliente(1);

### Exemplo com OUT (retorna valor para o chamador)

    CREATE PROCEDURE contar_pedidos(IN p_id INT, OUT p_total INT)
    BEGIN
        SELECT COUNT(*) INTO p_total FROM pedidos WHERE id_cliente = p_id;
    END;

    CALL contar_pedidos(1, @total);
    SELECT @total;

### Exemplo com INOUT (lê e modifica)

    CREATE PROCEDURE aplicar_desconto(INOUT p_valor DECIMAL(10,2), IN desconto DECIMAL(10,2))
    BEGIN
        SET p_valor = p_valor - (p_valor * desconto / 100);
    END;

    SET @preco = 200.00;
    CALL aplicar_desconto(@preco, 10);
    SELECT @preco; -- Resultado: 180.00

---

# 7. Execução de Procedimentos Armazenados

> Qual comando é usado para executar um procedimento armazenado e como ele funciona?

## ✅ Resposta

O comando `CALL` é utilizado para executar um procedimento armazenado, passando os parâmetros necessários na ordem em que foram declarados.

### Sintaxe

    CALL nome_procedimento(parametro1, parametro2, ...);

### Exemplos

    -- Sem parâmetros
    CALL listar_todos_clientes();

    -- Com parâmetros IN
    CALL listar_pedidos_cliente(1);

    -- Com parâmetros OUT
    CALL contar_pedidos(1, @resultado);
    SELECT @resultado;

### Como funciona internamente

1. O MySQL localiza o procedimento pelo nome no banco atual
2. Valida os parâmetros passados
3. Executa o bloco `BEGIN ... END` com os valores fornecidos
4. Retorna os resultados (SELECT interno) ou valores OUT

==CALL é para procedures o que SELECT é para funções — a forma de acioná-las==

---

# 8. Funções Definidas pelo Usuário (UDFs)

> O que são UDFs e como elas diferem de procedimentos armazenados?

## ✅ Resposta

As **User-Defined Functions (UDFs)** são funções criadas pelo próprio desenvolvedor para encapsular cálculos ou transformações personalizadas que não existem nas funções nativas do MySQL.

### 📌 Diferenças entre UDF e Procedure

| Aspecto | UDF (FUNCTION) | Procedure |
|---------|---------------|-----------|
| Retorno | Obrigatório (1 valor) | Opcional (via OUT ou SELECT) |
| Uso em SELECT | ✅ Sim | ❌ Não diretamente |
| Altera dados | ❌ Não recomendado | ✅ Sim |
| Execução | Dentro de consultas | Com `CALL` |
| Tipo de uso | Cálculos e transformações | Processos e operações DML |

### Exemplo de UDF

    CREATE FUNCTION calcular_desconto(valor DECIMAL(10,2), desconto DECIMAL(10,2))
    RETURNS DECIMAL(10,2)
    DETERMINISTIC
    BEGIN
        RETURN valor - (valor * desconto / 100);
    END;

    -- Uso direto em SELECT
    SELECT nome, calcular_desconto(preco, 15) AS preco_final FROM produtos;

---

# 9. Aplicações de Funções Personalizadas

> Explique uma situação prática onde a criação de uma UDF seria mais vantajosa do que usar uma função padrão.

## ✅ Resposta

### Cenário: Cálculo de Margem de Lucro Específica da Empresa

Uma empresa de e-commerce aplica uma fórmula proprietária de margem de lucro que considera custo, impostos e comissões de marketplace. Essa lógica não existe em nenhuma função nativa do MySQL.

**Sem UDF (repetição em toda consulta):**

    SELECT nome,
           ((preco_venda - custo - (preco_venda * 0.12) - (preco_venda * 0.08)) / preco_venda) * 100
           AS margem_pct
    FROM produtos;

**Com UDF (limpo, reutilizável e fácil de manter):**

    CREATE FUNCTION calcular_margem(venda DECIMAL(10,2), custo DECIMAL(10,2))
    RETURNS DECIMAL(5,2)
    DETERMINISTIC
    BEGIN
        RETURN ((venda - custo - (venda * 0.12) - (venda * 0.08)) / venda) * 100;
    END;

    SELECT nome, calcular_margem(preco_venda, custo) AS margem_pct
    FROM produtos;

### Vantagens nesse cenário

- [x] Se a alíquota de imposto mudar, basta alterar a função em um único lugar
- [x] A consulta fica mais legível e intuitiva
- [x] A função pode ser usada em relatórios, views e outras procedures

---

# 10. Funções vs Procedimentos Armazenados

> Compare funções e procedimentos armazenados em termos de retorno de valores e uso em consultas.

## ✅ Resposta

### 📌 Comparação completa

| Aspecto | FUNCTION | PROCEDURE |
|---------|----------|-----------|
| Retorno | Obrigatório — sempre retorna 1 valor com `RETURN` | Opcional — pode usar `OUT`, `INOUT` ou `SELECT` interno |
| Uso em `SELECT` | ✅ Pode ser usada diretamente: `SELECT minha_funcao(param)` | ❌ Não pode ser usada em `SELECT` |
| Execução | Implícita, dentro de expressões SQL | Explícita, com `CALL nome()` |
| Altera dados | ❌ Não recomendado (viola o conceito de função pura) | ✅ Pode executar `INSERT`, `UPDATE`, `DELETE` |
| Transações | ❌ Não pode controlar transações | ✅ Pode usar `COMMIT`, `ROLLBACK` |
| Complexidade | Ideal para cálculos e transformações simples | Ideal para processos complexos e multi-etapas |

### Regra de escolha

- Precisa de um **valor calculado** para usar em uma consulta → **FUNCTION**
- Precisa **executar um processo** (inserir, atualizar, gerar relatório) → **PROCEDURE**

### Exemplo comparativo

    -- FUNCTION: calcula e retorna um valor, usável em SELECT
    SELECT calcular_desconto(200.00, 10) AS preco_final;

    -- PROCEDURE: executa uma ação, chamada com CALL
    CALL inserir_pedido(5, CURDATE());

==Funções calculam; procedures executam. Usar a ferramenta certa simplifica o código e respeita as boas práticas do banco==

---

## Conclusão

- ✔️ Funções nativas cobrem strings, datas e matemática de forma eficiente
- ✔️ UDFs permitem criar cálculos personalizados reutilizáveis em consultas
- ✔️ Stored Procedures encapsulam processos complexos com parâmetros IN, OUT e INOUT
- ✔️ CALL executa procedures; SELECT executa funções diretamente
- ✔️ A escolha entre FUNCTION e PROCEDURE depende se o objetivo é calcular ou executar
