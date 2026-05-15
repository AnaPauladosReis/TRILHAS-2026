# Questões Práticas – Triggers e Eventos


| Tema | Foco |
|------|------|
| Triggers BEFORE | Validação antes da operação |
| Triggers AFTER | Ações após a operação |
| Log de Auditoria | Registro automático de ações |
| Eventos | Tarefas agendadas recorrentes |
| Boas Práticas | Performance e manutenção |

---

# 1. Trigger BEFORE — Validação de Estoque

> Crie um trigger que valide, antes de inserir um pedido na tabela pedidos, se a quantidade solicitada é menor ou igual ao estoque disponível.

## ✅ Resposta

    DELIMITER $$

    CREATE TRIGGER valida_estoque_pedido
    BEFORE INSERT ON pedidos
    FOR EACH ROW
    BEGIN
        DECLARE estoque_atual INT;

        SELECT estoque INTO estoque_atual
        FROM produtos
        WHERE id_produto = NEW.id_produto;

        IF NEW.quantidade > estoque_atual THEN
            SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Quantidade solicitada excede o estoque disponível.';
        END IF;
    END$$

    DELIMITER ;

### Explicação

- `BEFORE INSERT` executa o trigger **antes** de gravar o pedido
- `NEW.quantidade` acessa o valor que será inserido
- `SIGNAL SQLSTATE '45000'` cancela a operação e retorna uma mensagem de erro
- A transação é abortada se a validação falhar

---

# 2. Trigger AFTER — Atualização de Estoque

> Desenvolva um trigger que atualize o estoque na tabela produtos sempre que um novo pedido for registrado na tabela pedido_produto.

## ✅ Resposta

    DELIMITER $$

    CREATE TRIGGER atualiza_estoque_apos_pedido
    AFTER INSERT ON pedido_produto
    FOR EACH ROW
    BEGIN
        UPDATE produtos
        SET estoque = estoque - NEW.quantidade
        WHERE id_produto = NEW.id_produto;
    END$$

    DELIMITER ;

### Explicação

- `AFTER INSERT` é executado **após** o registro ser inserido com sucesso
- `NEW.quantidade` e `NEW.id_produto` referenciam os valores do registro recém-inserido
- O estoque é decrementado automaticamente, sem necessidade de código na aplicação

### Teste de funcionamento

    INSERT INTO pedido_produto (id_pedido, id_produto, quantidade) VALUES (1, 2, 3);
    SELECT estoque FROM produtos WHERE id_produto = 2;
    -- O estoque deve ter diminuído em 3 unidades

---

# 3. Registro de Logs com Trigger

> Crie um trigger que registre em log_acoes toda vez que um registro for excluído da tabela clientes. O log deve incluir data/hora e ID do cliente excluído.

## ✅ Resposta

    -- Criar a tabela de log (se não existir)
    CREATE TABLE IF NOT EXISTS log_acoes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        acao VARCHAR(255),
        data_hora DATETIME
    );

    DELIMITER $$

    CREATE TRIGGER log_cliente_excluido
    AFTER DELETE ON clientes
    FOR EACH ROW
    BEGIN
        INSERT INTO log_acoes (acao, data_hora)
        VALUES (
            CONCAT('Cliente excluído: ID=', OLD.id_cliente, ', Nome=', OLD.nome),
            NOW()
        );
    END$$

    DELIMITER ;

### Explicação

- `AFTER DELETE` executa após a exclusão ser confirmada
- `OLD.id_cliente` e `OLD.nome` acessam os valores do registro que foi removido
- `CONCAT` monta uma mensagem descritiva para o log

### Verificação

    DELETE FROM clientes WHERE id_cliente = 5;
    SELECT * FROM log_acoes ORDER BY data_hora DESC LIMIT 1;
    -- Deve exibir o log da exclusão do cliente 5

---

# 4. Exclusão de um Trigger

> Exclua o trigger que registra exclusões de clientes na tabela log_acoes.

## ✅ Resposta

    DROP TRIGGER log_cliente_excluido;

### Explicação

- O comando `DROP TRIGGER` remove permanentemente o trigger do banco
- Após a exclusão, exclusões na tabela `clientes` **não** gerarão mais logs automaticamente
- Os registros já gravados em `log_acoes` **não são afetados** — apenas futuras ações deixam de ser registradas

### Verificação

    SHOW TRIGGERS LIKE 'clientes';
    -- O trigger log_cliente_excluido não deve aparecer

---

# 5. Limpeza Automática com Eventos

> Crie um evento que limpe registros da tabela log_acoes com mais de 60 dias, executado diariamente às 23h59.

## ✅ Resposta

    -- Ativar o agendador de eventos (se necessário)
    SET GLOBAL event_scheduler = ON;

    CREATE EVENT limpa_logs_antigos
    ON SCHEDULE EVERY 1 DAY
    STARTS (CURDATE() + INTERVAL 1 DAY + INTERVAL 23 HOUR + INTERVAL 59 MINUTE)
    DO
        DELETE FROM log_acoes
        WHERE data_hora < NOW() - INTERVAL 60 DAY;

### Explicação dos parâmetros

| Parâmetro | Função |
|-----------|--------|
| `EVERY 1 DAY` | Executa a cada 24 horas |
| `STARTS` | Define quando o evento começa a ser executado |
| `NOW() - INTERVAL 60 DAY` | Filtra registros com mais de 60 dias |

### Verificação

    SHOW EVENTS;
    -- O evento limpa_logs_antigos deve aparecer como ENABLED

---

# 6. Geração Automática de Relatórios

> Configure um evento que gere relatórios mensais de vendas, inserindo informações na tabela relatorios todo dia 1º de cada mês à meia-noite.

## ✅ Resposta

    CREATE EVENT gera_relatorio_mensal
    ON SCHEDULE EVERY 1 MONTH
    STARTS '2026-06-01 00:00:00'
    DO
        INSERT INTO relatorios (descricao, data_geracao, total_vendas)
        SELECT
            CONCAT('Relatório mensal - ', DATE_FORMAT(NOW(), '%m/%Y')),
            NOW(),
            SUM(valor_total)
        FROM pedidos
        WHERE MONTH(data_pedido) = MONTH(NOW() - INTERVAL 1 MONTH)
        AND YEAR(data_pedido) = YEAR(NOW() - INTERVAL 1 MONTH);

### Explicação

- `EVERY 1 MONTH` faz o evento repetir mensalmente
- `STARTS '2026-06-01 00:00:00'` define o início na próxima virada de mês
- A consulta interna agrega as vendas do mês anterior ao momento de execução

---

# 7. Ativação do Agendador de Eventos

> Ative o agendador de eventos no MySQL e verifique se ele está funcionando corretamente.

## ✅ Resposta

    -- Ativar o agendador de eventos
    SET GLOBAL event_scheduler = ON;

    -- Verificar se está ativo
    SHOW VARIABLES LIKE 'event_scheduler';

### Resultado esperado

| Variable_name | Value |
|---------------|-------|
| event_scheduler | ON |

### Para ativar permanentemente (no my.cnf)

    [mysqld]
    event_scheduler = ON

### Listar eventos existentes

    SHOW EVENTS;

==O agendador deve estar ativo para que qualquer evento criado seja executado automaticamente==

---

# 8. Modificação de um Trigger Existente

> Altere um trigger existente para incluir a validação de um novo campo antes de realizar a inserção.

## ✅ Resposta

No MySQL, triggers **não podem ser alterados** com `ALTER TRIGGER`. É necessário excluir e recriar:

    -- Passo 1: Remover o trigger existente
    DROP TRIGGER IF EXISTS valida_estoque_pedido;

    -- Passo 2: Recriar com a nova validação (adiciona verificação de valor_total > 0)
    DELIMITER $$

    CREATE TRIGGER valida_estoque_pedido
    BEFORE INSERT ON pedidos
    FOR EACH ROW
    BEGIN
        DECLARE estoque_atual INT;

        -- Validação 1: quantidade vs estoque
        SELECT estoque INTO estoque_atual
        FROM produtos WHERE id_produto = NEW.id_produto;

        IF NEW.quantidade > estoque_atual THEN
            SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Quantidade excede o estoque disponível.';
        END IF;

        -- Validação 2 (nova): valor_total deve ser positivo
        IF NEW.valor_total <= 0 THEN
            SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'O valor total do pedido deve ser maior que zero.';
        END IF;
    END$$

    DELIMITER ;

---

# 9. Teste de Performance de um Trigger

> Execute um teste de performance em um trigger acionado frequentemente e proponha melhorias.

## ✅ Resposta

### Cenário problemático — trigger com lógica pesada

    -- Trigger atual com lógica excessiva (problema)
    CREATE TRIGGER log_pesado
    AFTER INSERT ON pedidos
    FOR EACH ROW
    BEGIN
        INSERT INTO log_acoes (acao, data_hora)
        VALUES (CONCAT('Pedido: ', NEW.id_pedido), NOW());

        -- Problema: recalcula total de pedidos a cada INSERT (caro)
        UPDATE clientes
        SET total_pedidos = (SELECT COUNT(*) FROM pedidos WHERE id_cliente = NEW.id_cliente)
        WHERE id_cliente = NEW.id_cliente;
    END;

### Problemas identificados

- ❌ Subconsulta `COUNT(*)` executada a cada INSERT gera carga extra
- ❌ UPDATE em `clientes` para cada linha inserida é custoso em volume alto

### Trigger otimizado

    CREATE TRIGGER log_otimizado
    AFTER INSERT ON pedidos
    FOR EACH ROW
    BEGIN
        -- Log simples sem subconsulta
        INSERT INTO log_acoes (acao, data_hora)
        VALUES (CONCAT('Pedido inserido: ID=', NEW.id_pedido), NOW());

        -- Incremento direto em vez de recalcular COUNT(*)
        UPDATE clientes
        SET total_pedidos = total_pedidos + 1
        WHERE id_cliente = NEW.id_cliente;
    END;

### Melhoria de performance

| Aspecto | Antes | Depois |
|---------|-------|--------|
| Subconsulta COUNT | A cada INSERT | Eliminada |
| Atualização do contador | Recalcula tudo | Incremento direto (+1) |

---

# 10. Documentação de um Evento

> Documente detalhadamente um evento que gere relatórios automáticos, explicando finalidade, comportamento esperado e benefícios.

## ✅ Resposta

### Documentação do Evento: `gera_relatorio_mensal`

**Nome:** `gera_relatorio_mensal`

**Finalidade:** Gerar automaticamente um resumo das vendas do mês anterior, inserindo o resultado na tabela `relatorios` no primeiro dia de cada mês à meia-noite.

**Código do evento:**

    CREATE EVENT gera_relatorio_mensal
    ON SCHEDULE EVERY 1 MONTH
    STARTS '2026-06-01 00:00:00'
    DO
        INSERT INTO relatorios (descricao, data_geracao, total_vendas)
        SELECT
            CONCAT('Relatório - ', DATE_FORMAT(NOW() - INTERVAL 1 MONTH, '%m/%Y')),
            NOW(),
            COALESCE(SUM(valor_total), 0)
        FROM pedidos
        WHERE MONTH(data_pedido) = MONTH(NOW() - INTERVAL 1 MONTH)
        AND YEAR(data_pedido) = YEAR(NOW() - INTERVAL 1 MONTH);

**Comportamento esperado:**
- Executa no dia 1º de cada mês às 00:00:00
- Agrega o total de vendas do mês anterior
- Insere uma linha em `relatorios` com descrição, data de geração e total

**Benefícios:**
- [x] Elimina a necessidade de scripts externos ou intervenção manual
- [x] Garante que os relatórios sejam sempre gerados, mesmo sem presença humana
- [x] Dados históricos ficam armazenados no banco para consultas futuras

**Pré-requisitos:**
- Event Scheduler ativo: `SET GLOBAL event_scheduler = ON`
- Tabela `relatorios` criada com colunas `descricao`, `data_geracao` e `total_vendas`

---

## Conclusão

- ✔️ Triggers BEFORE permitem validar e bloquear operações inválidas antes de ocorrerem
- ✔️ Triggers AFTER automatizam ações consequentes como logs e atualizações de saldo
- ✔️ NEW e OLD permitem acessar os valores da linha afetada dentro do trigger
- ✔️ Eventos substituem cron jobs externos para tarefas periódicas internas ao banco
- ✔️ Triggers devem ser simples — lógica complexa prejudica performance e manutenção
