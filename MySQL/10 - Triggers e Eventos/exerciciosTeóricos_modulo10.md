# Questões Teóricas – Triggers e Eventos



## 📌 Visão Geral

| Tema | Descrição |
|------|----------|
| Triggers | Procedimentos disparados automaticamente por eventos em tabelas |
| Eventos | Tarefas SQL agendadas para execução periódica |
| Automação | Redução de dependências externas e manutenção proativa |

---

# 1. Conceito de Triggers

> Explique o que são triggers no MySQL e cite pelo menos duas vantagens do seu uso.

## ✅ Resposta

Um **trigger** é um procedimento armazenado especial que é executado **automaticamente** pelo banco de dados sempre que um evento específico ocorre em uma tabela: `INSERT`, `UPDATE` ou `DELETE`. Diferente de procedures, triggers não podem ser chamados manualmente — eles são disparados pela própria operação sobre a tabela.

### 📌 Duas vantagens principais

**Vantagem 1 — Automação de processos internos:**
Regras que precisam ser aplicadas a cada modificação no banco são garantidas automaticamente, sem depender da aplicação:

    -- A cada venda, o estoque é atualizado automaticamente
    CREATE TRIGGER atualiza_estoque
    AFTER INSERT ON vendas FOR EACH ROW
    BEGIN
        UPDATE produtos SET estoque = estoque - NEW.quantidade
        WHERE id_produto = NEW.id_produto;
    END;

**Vantagem 2 — Auditoria e rastreabilidade:**
Logs de alterações são gerados automaticamente, garantindo rastreabilidade sem depender da aplicação:

    -- A cada exclusão de cliente, um log é gerado automaticamente
    CREATE TRIGGER log_exclusao_cliente
    AFTER DELETE ON clientes FOR EACH ROW
    BEGIN
        INSERT INTO log_acoes (acao, data_hora)
        VALUES (CONCAT('Cliente excluído: ', OLD.nome), NOW());
    END;

==Triggers garantem que regras críticas sejam aplicadas independentemente de qual sistema ou usuário realize a operação==

---

# 2. Tipos de Triggers: BEFORE vs AFTER

> Qual a diferença entre triggers BEFORE e AFTER? Cite exemplos de situações em que cada um seria utilizado.

## ✅ Resposta

### 📌 Comparação

| Aspecto | BEFORE | AFTER |
|---------|--------|-------|
| Quando executa | **Antes** da operação ser confirmada | **Depois** que a operação foi confirmada |
| Pode cancelar a operação | ✅ Sim (com SIGNAL) | ❌ Não (operação já ocorreu) |
| Acesso a NEW | ✅ Sim (pode modificar valores) | ✅ Sim (somente leitura) |
| Acesso a OLD | ✅ Sim | ✅ Sim |
| Uso principal | Validação e transformação de dados | Ações consequentes e logs |

### Exemplo BEFORE — validar antes de inserir

    CREATE TRIGGER valida_quantidade
    BEFORE INSERT ON pedidos FOR EACH ROW
    BEGIN
        IF NEW.quantidade <= 0 THEN
            SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Quantidade deve ser maior que zero.';
        END IF;
    END;

### Exemplo AFTER — atualizar após confirmar

    CREATE TRIGGER atualiza_saldo
    AFTER INSERT ON pagamentos FOR EACH ROW
    BEGIN
        UPDATE contas SET saldo = saldo - NEW.valor
        WHERE id_conta = NEW.id_conta;
    END;

---

# 3. Vantagens dos Eventos no MySQL

> Liste três vantagens de usar eventos no MySQL em vez de cron jobs externos.

## ✅ Resposta

### ✅ Vantagem 1 — Integração nativa com o banco

Eventos são definidos e gerenciados diretamente no MySQL, sem necessidade de configurar scripts externos, servidores de tarefas ou acesso ao sistema operacional:

    CREATE EVENT limpa_logs
    ON SCHEDULE EVERY 1 DAY
    DO DELETE FROM log_acoes WHERE data_hora < NOW() - INTERVAL 30 DAY;

### ✅ Vantagem 2 — Portabilidade entre ambientes

O evento é parte do banco de dados e é replicado junto com ele. Com cron jobs externos, ao migrar o servidor, os agendamentos precisam ser reconfigurados manualmente no novo ambiente.

### ✅ Vantagem 3 — Gerenciamento centralizado

É possível listar, habilitar, desabilitar e excluir eventos com comandos SQL simples, sem sair do ambiente do banco:

    SHOW EVENTS;
    ALTER EVENT limpa_logs DISABLE;
    DROP EVENT limpa_logs;

### Comparação resumida

| Aspecto | Eventos MySQL | Cron Jobs externos |
|---------|--------------|-------------------|
| Configuração | SQL puro | Shell/SO |
| Portabilidade | ✅ Junto com o banco | ❌ Precisa reconfigurar |
| Acesso a dados | Direto | Via conexão |
| Gerenciamento | `SHOW EVENTS` | Arquivo crontab |

---

# 4. Validação com Triggers

> Como um trigger pode ser usado para validar dados antes de uma operação ser realizada? Explique com um exemplo teórico.

## ✅ Resposta

Um trigger `BEFORE INSERT` ou `BEFORE UPDATE` pode interceptar a operação, verificar as condições desejadas e, se a validação falhar, lançar um erro com `SIGNAL SQLSTATE`, que cancela a operação antes que qualquer dado seja gravado.

### Exemplo teórico — Validação de preço mínimo

Cenário: a empresa não permite cadastrar produtos com preço menor que R$ 1,00.

    CREATE TRIGGER valida_preco_produto
    BEFORE INSERT ON produtos
    FOR EACH ROW
    BEGIN
        IF NEW.preco < 1.00 THEN
            SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'O preço do produto não pode ser menor que R$1,00.';
        END IF;
    END;

### Fluxo de execução

1. Aplicação tenta inserir produto com `preco = 0.50`
2. Trigger `BEFORE INSERT` é disparado
3. A condição `NEW.preco < 1.00` é verdadeira
4. `SIGNAL` lança o erro — a inserção é **cancelada**
5. Banco retorna mensagem de erro para a aplicação

==BEFORE triggers são a única forma de impedir uma operação antes que ela aconteça==

---

# 5. Impacto de Triggers na Performance

> Quais são os cuidados a serem tomados ao criar triggers para evitar impactos negativos na performance do banco de dados?

## ✅ Resposta

Triggers são executados **a cada operação** na tabela associada. Em tabelas com alto volume de inserções, atualizações ou exclusões, um trigger mal escrito pode se tornar um gargalo crítico.

### ❌ Práticas que prejudicam a performance

- Subconsultas pesadas dentro do trigger (`SELECT COUNT(*)` ou `SUM()` completos)
- Múltiplas atualizações em tabelas diferentes
- Triggers encadeados (trigger que dispara outro trigger)
- Lógica de negócio complexa com muitas condições

### ✅ Boas práticas para preservar a performance

- [x] Manter o corpo do trigger o mais simples possível
- [x] Usar incrementos diretos (`+1`) em vez de recalcular totais com `COUNT(*)`
- [x] Evitar consultas que percorrem tabelas grandes dentro do trigger
- [x] Testar com `EXPLAIN` e medir o tempo de execução antes de colocar em produção
- [x] Monitorar com `SHOW PROCESSLIST` em produção para detectar lentidões

### Exemplo: otimização de contador

    -- ❌ Lento: recalcula COUNT(*) a cada INSERT
    UPDATE clientes SET total_pedidos =
        (SELECT COUNT(*) FROM pedidos WHERE id_cliente = NEW.id_cliente)
    WHERE id_cliente = NEW.id_cliente;

    -- ✅ Rápido: apenas incrementa
    UPDATE clientes SET total_pedidos = total_pedidos + 1
    WHERE id_cliente = NEW.id_cliente;

---

# 6. Automatização de Tarefas com Eventos

> Explique como eventos podem ser usados para automatizar a manutenção do banco de dados. Dê um exemplo prático.

## ✅ Resposta

Eventos no MySQL funcionam como um **agendador interno**, permitindo que tarefas SQL sejam executadas automaticamente em intervalos regulares ou em datas específicas, sem qualquer intervenção externa.

### Aplicações de manutenção automatizada

- Limpeza periódica de logs e dados temporários
- Arquivamento de registros antigos
- Geração de relatórios consolidados
- Atualização de estatísticas ou indicadores

### Exemplo prático — Limpeza de carrinhos abandonados

Em um e-commerce, carrinhos não finalizados há mais de 24 horas são removidos automaticamente:

    SET GLOBAL event_scheduler = ON;

    CREATE EVENT limpa_carrinhos_abandonados
    ON SCHEDULE EVERY 1 DAY
    STARTS CURDATE() + INTERVAL 1 DAY
    DO
        DELETE FROM carrinhos
        WHERE data_criacao < NOW() - INTERVAL 1 DAY
        AND status = 'abandonado';

Isso libera espaço em disco e mantém a tabela enxuta sem qualquer ação humana.

---

# 7. Ativação do Agendador de Eventos

> Por que o agendador de eventos pode estar desativado por padrão no MySQL? Como ativá-lo?

## ✅ Resposta

O MySQL desativa o agendador de eventos (`event_scheduler`) por padrão por razões de **segurança e consumo de recursos**. Um agendador ativo consome um thread dedicado e executa queries automaticamente, o que em servidores compartilhados ou com configurações padrão pode gerar riscos de carga inesperada ou execuções indesejadas.

### Como ativar temporariamente (sessão atual)

    SET GLOBAL event_scheduler = ON;

### Como verificar o status

    SHOW VARIABLES LIKE 'event_scheduler';

### Como ativar permanentemente (arquivo my.cnf)

    [mysqld]
    event_scheduler = ON

### Estados possíveis

| Valor | Significado |
|-------|------------|
| `ON` | Agendador ativo, eventos são executados |
| `OFF` | Agendador desativo, eventos não são executados |
| `DISABLED` | Agendador não pode ser ativado sem reiniciar o MySQL |

==Sem o event_scheduler ativo, eventos criados com CREATE EVENT ficam registrados mas nunca são executados==

---

# 8. Exclusão de Triggers

> Qual é a sintaxe para excluir um trigger no MySQL? O que acontece com os dados afetados por triggers excluídos?

## ✅ Resposta

### Sintaxe de exclusão

    DROP TRIGGER nome_do_trigger;

    -- Sem erro se não existir:
    DROP TRIGGER IF EXISTS nome_do_trigger;

### O que acontece após a exclusão

- O trigger é **removido permanentemente** do banco de dados
- Operações futuras na tabela associada **não dispararão** mais o trigger
- Os **dados já gravados** por ações anteriores do trigger **permanecem intactos**
- Nenhum dado é desfeito ou revertido pela exclusão do trigger

### Exemplo

    DROP TRIGGER IF EXISTS log_cliente_excluido;

    -- Verificar que foi removido:
    SHOW TRIGGERS LIKE 'clientes';
    -- Nenhum resultado deve aparecer para esse trigger

==Excluir um trigger não afeta dados existentes — apenas impede que novas ações automáticas ocorram==

---

# 9. Melhores Práticas para Triggers

> Quais são as melhores práticas para a criação de triggers? Explique como elas podem beneficiar a manutenção do banco de dados.

## ✅ Resposta

### ✅ Prática 1 — Manter triggers simples e focados

Cada trigger deve ter uma única responsabilidade clara. Triggers com múltiplas lógicas são difíceis de depurar e manter.

### ✅ Prática 2 — Documentar a finalidade no código

    -- Trigger: log_cliente_excluido
    -- Finalidade: Registrar em log_acoes cada exclusão de cliente
    -- Tabela: clientes | Evento: DELETE | Timing: AFTER
    -- Criado em: 2026-05-15 | Autor: DBA Team
    CREATE TRIGGER log_cliente_excluido ...

### ✅ Prática 3 — Testar em homologação antes de produção

Triggers afetam todas as operações na tabela. Um erro em um trigger pode bloquear inserções, atualizações ou exclusões em produção.

### ✅ Prática 4 — Evitar triggers encadeados

Um trigger que dispara outro trigger pode criar loops, comportamentos imprevisíveis e dificuldade extrema de depuração.

### ✅ Prática 5 — Monitorar impacto em performance

Usar `SHOW PROCESSLIST` e analisar tempos de resposta após adicionar triggers em tabelas de alto volume.

### Benefícios dessas práticas

- [x] Facilita a manutenção e onboarding de novos desenvolvedores
- [x] Reduz o risco de bugs silenciosos em produção
- [x] Mantém o banco previsível e auditável

---

# 10. Planejamento de Eventos

> Por que é importante planejar eventos no banco de dados? Cite situações em que um evento mal configurado pode gerar problemas.

## ✅ Resposta

Eventos executam queries automaticamente sem supervisão humana. Um evento mal configurado pode causar desde perda de dados até degradação grave de performance, especialmente em horários de pico.

### 📌 Por que planejar é essencial

- [x] Definir o **horário correto** — evitar picos de carga (não agendar backups pesados em horário comercial)
- [x] Definir a **frequência adequada** — um evento que roda a cada segundo pode travar o banco
- [x] Garantir **idempotência** — o evento deve ser seguro para rodar múltiplas vezes sem efeitos colaterais

### ❌ Situações problemáticas por eventos mal configurados

| Problema | Causa | Consequência |
|----------|-------|--------------|
| DELETE sem WHERE correto | `DELETE FROM log_acoes` sem filtro de data | Apaga todos os logs |
| Intervalo muito curto | `EVERY 1 SECOND` em tabela grande | Tranca o banco com lock contínuo |
| Horário de pico | Relatório pesado às 09:00 em dia útil | Degrada performance para usuários |
| Sem tratamento de erro | Falha silenciosa sem log | Dados inconsistentes sem diagnóstico |

### Exemplo de evento bem planejado

    -- Executa às 02:00 (baixo tráfego), apenas apaga o necessário
    CREATE EVENT limpa_logs_planejado
    ON SCHEDULE EVERY 1 DAY
    STARTS (CURDATE() + INTERVAL 1 DAY + INTERVAL 2 HOUR)
    DO
        DELETE FROM log_acoes
        WHERE data_hora < NOW() - INTERVAL 90 DAY
        LIMIT 1000; -- Limita para não bloquear a tabela por tempo excessivo

==Planejar eventos é tão importante quanto criá-los — um evento errado pode causar mais dano do que nenhum evento==

---

## Conclusão

- ✔️ Triggers BEFORE validam e podem cancelar operações antes de ocorrerem
- ✔️ Triggers AFTER executam ações consequentes como logs e atualizações relacionadas
- ✔️ NEW e OLD permitem acessar valores antes e depois da operação
- ✔️ Eventos substituem cron jobs externos com gerenciamento nativo no MySQL
- ✔️ Triggers devem ser simples, documentados e testados para não prejudicar a performance
- ✔️ Eventos mal planejados podem causar danos graves — frequência, horário e lógica devem ser cuidadosamente definidos
