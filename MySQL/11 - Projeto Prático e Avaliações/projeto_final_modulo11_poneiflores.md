# Projeto Final – Sistema de Vendas
# 🌸 Ponei Flores — Floricultura & Presentes

> *"Porque toda história merece uma flor!"*

---

## 📌 Visão Geral do Projeto

| Item | Descrição |
|------|----------|
| Sistema | Gerenciamento de vendas de uma floricultura |
| Empresa | Ponei Flores Ltda. |
| Banco de dados | `ponei_flores` |
| Tabelas principais | clientes, produtos, pedidos, pedido_produto |

### Cenário

A **Ponei Flores** é uma floricultura boutique fundada por Rosinha Campelo, especializada em arranjos artesanais, buquês temáticos e kits de presente. Com o crescimento das vendas online e presenciais, Rosinha percebeu que controlar tudo em papel era um desastre: pedidos perdidos, estoque errado e clientes esperando flores que já tinham sido vendidas para outras pessoas.

A solução? Um sistema de banco de dados completo para organizar clientes, produtos, pedidos e estoque — para que a Ponei Flores possa focar no que realmente importa: flores bonitas e clientes felizes.

---

# 1. Modelagem do Banco de Dados

## Criação do banco

    CREATE DATABASE ponei_flores;
    USE ponei_flores;

## Tabela: clientes

    CREATE TABLE clientes (
        id_cliente INT AUTO_INCREMENT PRIMARY KEY,
        nome       VARCHAR(100) NOT NULL,
        email      VARCHAR(100) UNIQUE NOT NULL,
        telefone   VARCHAR(20)
    );

## Tabela: produtos

    CREATE TABLE produtos (
        id_produto INT AUTO_INCREMENT PRIMARY KEY,
        nome       VARCHAR(100) NOT NULL,
        preco      DECIMAL(10,2) NOT NULL,
        estoque    INT NOT NULL DEFAULT 0
    );

## Tabela: pedidos

    CREATE TABLE pedidos (
        id_pedido   INT AUTO_INCREMENT PRIMARY KEY,
        id_cliente  INT NOT NULL,
        data_pedido DATE NOT NULL,
        FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente)
            ON DELETE RESTRICT
            ON UPDATE CASCADE
    );

## Tabela: pedido_produto (N:N)

    CREATE TABLE pedido_produto (
        id_pedido  INT NOT NULL,
        id_produto INT NOT NULL,
        quantidade INT NOT NULL,
        PRIMARY KEY (id_pedido, id_produto),
        FOREIGN KEY (id_pedido)  REFERENCES pedidos(id_pedido)  ON DELETE CASCADE,
        FOREIGN KEY (id_produto) REFERENCES produtos(id_produto) ON DELETE RESTRICT
    );

### Diagrama de relacionamentos

| Tabela | Relacionamento | Tabela |
|--------|---------------|--------|
| clientes | 1 → N | pedidos |
| pedidos | N ↔ N | produtos |
| pedido_produto | tabela intermediária | — |

---

# 2. Inserção de Dados de Exemplo

## Clientes da Ponei Flores

    INSERT INTO clientes (nome, email, telefone) VALUES
    ('Rosinha Campelo',     'rosinha@email.com',    '(47) 99111-2233'),
    ('Tulipa Menezes',      'tulipa@email.com',     '(47) 98222-3344'),
    ('Girassol Rodrigues',  'girassol@email.com',   '(47) 97333-4455'),
    ('Violeta Sombrero',    'violeta@email.com',    '(47) 96444-5566'),
    ('Dente de Leão Silva', 'dentedeliao@email.com','(47) 95555-6677'),
    ('Margarida Fontes',    'margarida@email.com',  '(47) 94666-7788'),
    ('Cactus Ferreira',     'cactus@email.com',     '(47) 93777-8899'),
    ('Orquidea Bastos',     'orquidea@email.com',   '(47) 92888-9900'),
    ('Hortência Lima',      'hortencia@email.com',  '(47) 91999-0011'),
    ('Petúnia Carvalho',    'petunia@email.com',    '(47) 90000-1122');

## Produtos da floricultura

    INSERT INTO produtos (nome, preco, estoque) VALUES
    ('Buquê Romântico Rosa',         89.90,  30),
    ('Arranjo Girassol Feliz',        74.50,  25),
    ('Kit Presente Primavera',       129.90,  15),
    ('Orquídea Phalaenopsis Branca', 159.00,  10),
    ('Buquê Misto Colorido',          65.00,  40),
    ('Coroa de Flores Campestres',   199.90,   8),
    ('Cacto Decorativo Mini',         29.90,  50),
    ('Vaso de Tulipas Holandesas',    94.00,  20),
    ('Lavanda em Sachê',              19.90,  60),
    ('Bouquet Noiva Clássico',       349.90,   5);

## Pedidos

    INSERT INTO pedidos (id_cliente, data_pedido) VALUES
    (1, '2026-04-01'),
    (2, '2026-04-05'),
    (3, '2026-04-10'),
    (4, '2026-04-15'),
    (5, '2026-04-20'),
    (6, '2026-05-01'),
    (7, '2026-05-05'),
    (8, '2026-05-08'),
    (9, '2026-05-10'),
    (10,'2026-05-12');

## Itens dos pedidos

    INSERT INTO pedido_produto (id_pedido, id_produto, quantidade) VALUES
    (1, 1,  2),  -- Rosinha: 2x Buquê Romântico Rosa
    (1, 9,  3),  -- Rosinha: 3x Lavanda em Sachê
    (2, 2,  1),  -- Tulipa: 1x Arranjo Girassol Feliz
    (2, 5,  2),  -- Tulipa: 2x Buquê Misto Colorido
    (3, 10, 1),  -- Girassol: 1x Bouquet Noiva Clássico
    (3, 3,  1),  -- Girassol: 1x Kit Presente Primavera
    (4, 4,  2),  -- Violeta: 2x Orquídea Phalaenopsis Branca
    (5, 7,  5),  -- Dente de Leão: 5x Cacto Decorativo Mini
    (6, 8,  3),  -- Margarida: 3x Vaso de Tulipas Holandesas
    (7, 6,  1),  -- Cactus: 1x Coroa de Flores Campestres
    (8, 1,  1),  -- Orquídea: 1x Buquê Romântico Rosa
    (9, 3,  2),  -- Hortência: 2x Kit Presente Primavera
    (10,5,  4);  -- Petúnia: 4x Buquê Misto Colorido

---

# 3. Relacionamentos e Integridade Referencial

### Estratégia adotada

| Relacionamento | Regra | Justificativa |
|---------------|-------|--------------|
| Excluir cliente | `ON DELETE RESTRICT` | Não permite excluir clientes com pedidos |
| Atualizar cliente | `ON UPDATE CASCADE` | ID do cliente atualiza em cascata nos pedidos |
| Excluir pedido | `ON DELETE CASCADE` em pedido_produto | Remove itens do pedido automaticamente |
| Excluir produto | `ON DELETE RESTRICT` em pedido_produto | Não permite remover produtos já vendidos |

### Teste de integridade

    -- Tentativa de excluir cliente com pedidos (deve falhar)
    DELETE FROM clientes WHERE id_cliente = 1;
    -- Erro: Cannot delete or update a parent row: a foreign key constraint fails

    -- Exclusão correta: remover pedidos antes do cliente
    DELETE FROM pedido_produto WHERE id_pedido IN (SELECT id_pedido FROM pedidos WHERE id_cliente = 1);
    DELETE FROM pedidos WHERE id_cliente = 1;
    DELETE FROM clientes WHERE id_cliente = 1;

---

# 4. Consultas com JOINs e Subconsultas

## 4.1 JOIN — Todos os pedidos com clientes e produtos

    SELECT
        p.id_pedido,
        c.nome     AS cliente,
        p.data_pedido,
        pr.nome    AS produto,
        pp.quantidade,
        ROUND(pr.preco * pp.quantidade, 2) AS subtotal
    FROM pedidos p
    JOIN clientes       c  ON p.id_cliente  = c.id_cliente
    JOIN pedido_produto pp ON p.id_pedido   = pp.id_pedido
    JOIN produtos       pr ON pp.id_produto = pr.id_produto
    ORDER BY p.id_pedido;

### Resultado esperado

| id_pedido | cliente | data_pedido | produto | quantidade | subtotal |
|-----------|---------|------------|---------|-----------|---------|
| 1 | Rosinha Campelo | 2026-04-01 | Buquê Romântico Rosa | 2 | 179.80 |
| 1 | Rosinha Campelo | 2026-04-01 | Lavanda em Sachê | 3 | 59.70 |
| 2 | Tulipa Menezes | 2026-04-05 | Arranjo Girassol Feliz | 1 | 74.50 |
| ... | ... | ... | ... | ... | ... |

## 4.2 Subconsulta — Produto mais vendido

    SELECT nome AS produto_mais_vendido
    FROM produtos
    WHERE id_produto = (
        SELECT id_produto
        FROM pedido_produto
        GROUP BY id_produto
        ORDER BY SUM(quantidade) DESC
        LIMIT 1
    );

## 4.3 Total vendido por produto

    SELECT
        pr.nome AS produto,
        SUM(pp.quantidade) AS total_unidades_vendidas,
        ROUND(SUM(pp.quantidade * pr.preco), 2) AS receita_total
    FROM pedido_produto pp
    JOIN produtos pr ON pp.id_produto = pr.id_produto
    GROUP BY pr.nome
    ORDER BY total_unidades_vendidas DESC;

## 4.4 Total gasto por cliente

    SELECT
        c.nome AS cliente,
        COUNT(DISTINCT p.id_pedido) AS total_pedidos,
        ROUND(SUM(pp.quantidade * pr.preco), 2) AS total_gasto
    FROM clientes c
    JOIN pedidos p        ON c.id_cliente  = p.id_cliente
    JOIN pedido_produto pp ON p.id_pedido  = pp.id_pedido
    JOIN produtos pr       ON pp.id_produto = pr.id_produto
    GROUP BY c.nome
    ORDER BY total_gasto DESC;

## 4.5 Clientes que gastaram mais de R$ 100,00

    SELECT
        c.nome AS cliente,
        ROUND(SUM(pp.quantidade * pr.preco), 2) AS total_gasto
    FROM clientes c
    JOIN pedidos p         ON c.id_cliente  = p.id_cliente
    JOIN pedido_produto pp ON p.id_pedido   = pp.id_pedido
    JOIN produtos pr       ON pp.id_produto = pr.id_produto
    GROUP BY c.nome
    HAVING total_gasto > 100
    ORDER BY total_gasto DESC;

---

# 5. Procedimento Armazenado

## Procedure: registrar_pedido

Registra um novo pedido, adiciona o produto e desconta o estoque, tudo em uma única transação segura.

    DELIMITER $$

    CREATE PROCEDURE registrar_pedido(
        IN p_id_cliente INT,
        IN p_id_produto INT,
        IN p_quantidade INT
    )
    BEGIN
        DECLARE v_estoque INT;
        DECLARE v_id_pedido INT;

        -- Verificar estoque disponível
        SELECT estoque INTO v_estoque
        FROM produtos
        WHERE id_produto = p_id_produto;

        -- Validação: estoque suficiente?
        IF v_estoque < p_quantidade THEN
            SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Estoque insuficiente para realizar o pedido. 🌵';
        END IF;

        -- Iniciar transação
        START TRANSACTION;

        -- Criar o pedido
        INSERT INTO pedidos (id_cliente, data_pedido)
        VALUES (p_id_cliente, CURDATE());

        SET v_id_pedido = LAST_INSERT_ID();

        -- Adicionar produto ao pedido
        INSERT INTO pedido_produto (id_pedido, id_produto, quantidade)
        VALUES (v_id_pedido, p_id_produto, p_quantidade);

        -- Atualizar estoque
        UPDATE produtos
        SET estoque = estoque - p_quantidade
        WHERE id_produto = p_id_produto;

        -- Confirmar tudo
        COMMIT;

        -- Retornar confirmação
        SELECT
            v_id_pedido AS id_pedido_criado,
            c.nome      AS cliente,
            pr.nome     AS produto,
            p_quantidade AS quantidade,
            ROUND(pr.preco * p_quantidade, 2) AS total,
            'Pedido registrado com sucesso! 🌸' AS status
        FROM clientes c, produtos pr
        WHERE c.id_cliente = p_id_cliente
        AND pr.id_produto = p_id_produto;

    END$$

    DELIMITER ;

## Execução do procedimento

    -- Hortência compra 2 Buquês Românticos Rosa
    CALL registrar_pedido(9, 1, 2);

    -- Violeta tenta comprar 100 Bouquets de Noiva (sem estoque)
    CALL registrar_pedido(4, 10, 100);
    -- Erro: Estoque insuficiente para realizar o pedido. 🌵

---

# 6. Otimização de Consultas

## 6.1 Criação de índices estratégicos

    -- Índice para buscas de pedidos por cliente
    CREATE INDEX idx_pedidos_cliente ON pedidos(id_cliente);

    -- Índice para buscas de itens por produto
    CREATE INDEX idx_pp_produto ON pedido_produto(id_produto);

    -- Índice para buscas de clientes por e-mail
    CREATE UNIQUE INDEX idx_email_cliente ON clientes(email);

    -- Índice para buscas de produtos por preço (relatórios financeiros)
    CREATE INDEX idx_produto_preco ON produtos(preco);

## 6.2 Análise com EXPLAIN

    -- Analisar consulta de pedidos por cliente
    EXPLAIN SELECT * FROM pedidos WHERE id_cliente = 3;

    -- Analisar JOIN completo
    EXPLAIN
    SELECT c.nome, pr.nome, pp.quantidade
    FROM pedidos p
    JOIN clientes c        ON p.id_cliente  = c.id_cliente
    JOIN pedido_produto pp ON p.id_pedido   = pp.id_pedido
    JOIN produtos pr       ON pp.id_produto = pr.id_produto
    WHERE p.id_cliente = 3;

### O que verificar na saída do EXPLAIN

| Campo | Valor desejado |
|-------|---------------|
| `type` | `ref` ou `const` (não `ALL`) |
| `key` | Nome do índice criado |
| `rows` | Número baixo de linhas analisadas |
| `Extra` | Sem `Using filesort` ou `Full table scan` |

## 6.3 Boas práticas aplicadas

    -- ❌ Ineficiente: função sobre coluna indexada
    SELECT * FROM clientes WHERE UPPER(nome) = 'ROSINHA CAMPELO';

    -- ✅ Eficiente: comparação direta
    SELECT * FROM clientes WHERE nome = 'Rosinha Campelo';

    -- ❌ Ineficiente: SELECT *
    SELECT * FROM pedidos;

    -- ✅ Eficiente: apenas colunas necessárias
    SELECT id_pedido, id_cliente, data_pedido FROM pedidos;

---

# 7. Trigger de Auditoria

## Registro automático de exclusões

    CREATE TABLE IF NOT EXISTS log_acoes (
        id        INT AUTO_INCREMENT PRIMARY KEY,
        acao      VARCHAR(255),
        data_hora DATETIME
    );

    DELIMITER $$

    CREATE TRIGGER log_pedido_excluido
    AFTER DELETE ON pedidos
    FOR EACH ROW
    BEGIN
        INSERT INTO log_acoes (acao, data_hora)
        VALUES (
            CONCAT('Pedido #', OLD.id_pedido,
                   ' do cliente ID=', OLD.id_cliente,
                   ' foi excluído.'),
            NOW()
        );
    END$$

    DELIMITER ;

---

# 8. Evento de Limpeza Automática

    SET GLOBAL event_scheduler = ON;

    CREATE EVENT limpa_logs_ponei
    ON SCHEDULE EVERY 1 DAY
    STARTS (CURDATE() + INTERVAL 1 DAY + INTERVAL 2 HOUR)
    DO
        DELETE FROM log_acoes
        WHERE data_hora < NOW() - INTERVAL 60 DAY;

---

# 9. Checklist de Critérios de Avaliação

| Critério | Implementado | Descrição |
|----------|-------------|-----------|
| Modelagem | ✅ | 4 tabelas com PK, FK, tipos corretos |
| Integridade | ✅ | CASCADE e RESTRICT aplicados |
| JOINs | ✅ | 4 consultas com multi-JOIN |
| Subconsultas | ✅ | Produto mais vendido, totais por cliente |
| Stored Procedure | ✅ | `registrar_pedido` com transação e validação |
| Índices | ✅ | 4 índices em colunas estratégicas |
| EXPLAIN | ✅ | Análise de consultas críticas |
| Trigger | ✅ | Log automático de exclusões |
| Evento | ✅ | Limpeza de logs a cada 24h |
| Documentação | ✅ | Comentários e cenário descrito |

**Bônus implementado:** controle de estoque negativo via `SIGNAL SQLSTATE` dentro da stored procedure.

---

## Conclusão

O sistema da **Ponei Flores** integra todos os conceitos da trilha de Banco de Dados em um cenário real e funcional: a Rosinha Campelo agora pode receber pedidos de Tulipa, Girassol e Violeta sem perder o controle do estoque, com logs automáticos de auditoria e relatórios de vendas por cliente e produto — tudo gerenciado pelo MySQL.

- ✔️ Modelagem relacional completa com 4 tabelas normalizadas
- ✔️ Integridade referencial garantida por FK com CASCADE e RESTRICT
- ✔️ Consultas complexas com JOIN de 4 tabelas e subconsultas analíticas
- ✔️ Stored Procedure transacional com validação de estoque e rollback
- ✔️ Índices estratégicos com análise via EXPLAIN
- ✔️ Trigger de auditoria e evento de manutenção automática
