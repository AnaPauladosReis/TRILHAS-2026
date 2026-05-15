# Questões Práticas – Índices e Otimização de Consultas


| Tema | Foco |
|------|------|
| Índices | Simples, Único e Composto |
| Performance | EXPLAIN e Full Table Scan |
| Otimização | Boas práticas de escrita SQL |
| Aplicabilidade | JOINs, LIMIT e agregações |

---

# 1. Criação de Índices

> Crie um índice básico na coluna nome da tabela clientes e explique como esse índice pode melhorar a performance em uma consulta SELECT.

## ✅ Resposta

    CREATE INDEX idx_nome_cliente ON clientes(nome);

    SELECT * FROM clientes WHERE nome = 'João Silva';

### Explicação

- Sem o índice, o banco faz uma varredura completa da tabela (Full Table Scan)
- Com o índice, o banco acessa diretamente os registros correspondentes ao nome buscado
- O desempenho melhora proporcionalmente ao tamanho da tabela

### Impacto

| Situação | Comportamento |
|----------|--------------|
| Sem índice | Analisa **todas** as linhas da tabela |
| Com índice | Acessa diretamente os registros pelo nome |

---

# 2. Índice Único

> Crie um índice único na coluna email da tabela clientes para garantir que não existam emails duplicados. Explique a importância desse índice para a integridade dos dados.

## ✅ Resposta

    CREATE UNIQUE INDEX idx_email_cliente ON clientes(email);

### Importância

- [x] Garante que cada e-mail seja cadastrado apenas uma vez
- [x] Impede inserções ou atualizações com e-mails já existentes
- [x] Atua como uma segunda camada de integridade além da validação na aplicação

### Comportamento ao inserir duplicata

    INSERT INTO clientes (nome, email) VALUES ('Ana', 'joao@email.com');
    -- Erro: Duplicate entry 'joao@email.com' for key 'idx_email_cliente'

==O índice UNIQUE combina performance de busca com garantia de unicidade==

---

# 3. Índices Compostos

> Crie um índice composto nas colunas nome e cidade da tabela clientes. Explique como esse índice pode otimizar uma consulta que filtra clientes por nome e cidade simultaneamente.

## ✅ Resposta

    CREATE INDEX idx_nome_cidade ON clientes(nome, cidade);

    SELECT * FROM clientes
    WHERE nome = 'João Silva' AND cidade = 'São Paulo';

### Explicação

- O índice composto cobre ambas as colunas em uma única estrutura
- A consulta com `nome AND cidade` usa o índice de forma completa
- A **ordem das colunas** no índice é fundamental

### Quando o índice é (ou não) usado

| Consulta | Usa o índice? |
|----------|--------------|
| `WHERE nome = ?` | ✅ Sim (primeira coluna) |
| `WHERE nome = ? AND cidade = ?` | ✅ Sim (ambas as colunas) |
| `WHERE cidade = ?` | ❌ Não (ordem incorreta) |

---

# 4. Análise de Performance com EXPLAIN

> Execute o comando EXPLAIN em uma consulta com JOIN entre clientes e pedidos. Interprete os campos: type, key, rows e Extra.

## ✅ Resposta

    EXPLAIN SELECT clientes.nome, pedidos.valor_total
    FROM clientes
    JOIN pedidos ON clientes.id_cliente = pedidos.id_cliente;

### Interpretação dos campos

| Campo | O que indica | Valor ideal |
|-------|-------------|-------------|
| `type` | Tipo de busca realizada | `index` ou `const` |
| `key` | Índice utilizado na consulta | Nome do índice criado |
| `rows` | Quantidade de linhas analisadas | Quanto menor, melhor |
| `Extra` | Informações adicionais do plano | Evitar `Using full table scan` |

### Exemplo de saída interpretada

- `type: ALL` → Full Table Scan, sem índice → ruim
- `type: ref` → Uso de índice em JOIN → bom
- `key: idx_id_cliente` → índice sendo aproveitado
- `rows: 2` → apenas 2 linhas analisadas → eficiente

---

# 5. Uso de Índices em JOINs

> Crie um índice na coluna id_cliente da tabela pedidos e demonstre como ele melhora a performance de uma consulta com JOIN.

## ✅ Resposta

    CREATE INDEX idx_id_cliente ON pedidos(id_cliente);

    SELECT clientes.nome, pedidos.valor_total
    FROM clientes
    JOIN pedidos ON clientes.id_cliente = pedidos.id_cliente;

### Explicação

- Sem o índice, o banco percorre toda a tabela `pedidos` para cada linha de `clientes`
- Com o índice, o banco localiza diretamente os pedidos do cliente usando a chave indexada
- O ganho de performance é expressivo em tabelas com muitos registros

### Comparação

| Situação | Linhas analisadas |
|----------|------------------|
| Sem índice | N × M (produto cartesiano parcial) |
| Com índice | Apenas as linhas correspondentes |

---

# 6. Evitar Full Table Scans

> Crie um índice na coluna nome da tabela clientes e compare o plano de execução de uma consulta SELECT com e sem índice.

## ✅ Resposta

###  Sem índice

    EXPLAIN SELECT * FROM clientes WHERE nome = 'Maria Souza';
    -- type: ALL → Full Table Scan (todas as linhas analisadas)

###  Criação do índice

    CREATE INDEX idx_nome_cliente ON clientes(nome);

###  Com índice

    EXPLAIN SELECT * FROM clientes WHERE nome = 'Maria Souza';
    -- type: ref → uso direto do índice
    -- rows: 1 → apenas 1 linha analisada

### Conclusão

- ❌ Full Table Scan analisa 100% das linhas, independente do resultado
- ✅ Com índice, o banco navega diretamente até os registros relevantes
- O impacto é proporcional: quanto maior a tabela, maior o ganho

---

# 7. Limitação de Registros com LIMIT

> Execute uma consulta que retorne apenas os 5 primeiros clientes ordenados por nome. Explique como o LIMIT melhora a performance.

## ✅ Resposta

    SELECT nome, cidade
    FROM clientes
    ORDER BY nome
    LIMIT 5;

### Explicação

- O `LIMIT` instrui o banco a parar de processar assim que atingir o número de registros desejado
- Sem `LIMIT`, o banco processa e retorna todos os registros da tabela
- Combinado com um índice em `nome`, a consulta se torna ainda mais eficiente

### Impacto do LIMIT

| Consulta | Registros processados |
|----------|----------------------|
| Sem LIMIT (10.000 registros) | 10.000 linhas |
| Com LIMIT 5 | Para ao encontrar os 5 primeiros |

---

# 8. Evitar Operações em Colunas

> Otimize uma consulta que filtra clientes usando UPPER(nome) para evitar operações que impeçam o uso de índices.

## ✅ Resposta

###  Ineficiente (impede uso do índice)

    SELECT * FROM clientes WHERE UPPER(nome) = 'JOÃO SILVA';

###  Eficiente (usa o índice normalmente)

    SELECT * FROM clientes WHERE nome = 'João Silva';

### Explicação

- Aplicar funções como `UPPER()`, `LOWER()` ou `DATE()` sobre colunas indexadas **desativa** o índice
- O banco passa a fazer Full Table Scan mesmo com índice criado
- A solução é padronizar os dados na inserção e remover a função do filtro

### Regra prática

- ❌ Evite: `WHERE UPPER(coluna) = ?`
- ✅ Prefira: `WHERE coluna = ?` com dados já padronizados

---

# 9. Criação de Índices Apropriados

> Crie índices nas colunas categoria e preco da tabela produtos. Explique como esses índices melhoram consultas com filtros nessas colunas.

## ✅ Resposta

    CREATE INDEX idx_categoria ON produtos(categoria);
    CREATE INDEX idx_preco ON produtos(preco);

    SELECT nome, preco
    FROM produtos
    WHERE categoria = 'Eletrônicos' AND preco < 500.00;

### Explicação

- O índice em `categoria` acelera filtros por tipo de produto
- O índice em `preco` acelera filtros por faixa de preço e ordenações
- Para filtros que usam **ambas as colunas juntas**, um índice composto seria ainda mais eficiente:

        CREATE INDEX idx_categoria_preco ON produtos(categoria, preco);

### Cenários de uso

| Consulta | Índice mais útil |
|----------|-----------------|
| `WHERE categoria = ?` | `idx_categoria` |
| `WHERE preco < ?` | `idx_preco` |
| `WHERE categoria = ? AND preco < ?` | `idx_categoria_preco` (composto) |

---

# 10. Identificação de Gargalos com EXPLAIN

> Analise uma consulta complexa com EXPLAIN, identifique possíveis gargalos e proponha melhorias.

## ✅ Resposta

###  Consulta problemática

    EXPLAIN
    SELECT clientes.nome, SUM(pedidos.valor_total) AS total
    FROM clientes
    JOIN pedidos ON clientes.id_cliente = pedidos.id_cliente
    WHERE UPPER(clientes.nome) = 'MARIA SOUZA'
    GROUP BY clientes.nome;

###  Gargalos identificados

- ❌ `UPPER(clientes.nome)` impede uso do índice → Full Table Scan em `clientes`
- ❌ Ausência de índice em `pedidos.id_cliente` → varredura completa em `pedidos`
- ❌ `SELECT *` implícito → mais dados trafegados do que o necessário

###  Consulta otimizada

    -- Criar índices necessários
    CREATE INDEX idx_nome_cliente ON clientes(nome);
    CREATE INDEX idx_id_cliente_pedidos ON pedidos(id_cliente);

    -- Consulta otimizada
    SELECT clientes.nome, SUM(pedidos.valor_total) AS total
    FROM clientes
    JOIN pedidos ON clientes.id_cliente = pedidos.id_cliente
    WHERE clientes.nome = 'Maria Souza'
    GROUP BY clientes.nome;

### Resultado após otimização

- ✅ `type: ref` em ambas as tabelas (índices sendo usados)
- ✅ `rows` reduzido drasticamente
- ✅ `Extra` sem menção a Full Table Scan

---

## Conclusão

- ✔️ Índices simples aceleram buscas em colunas frequentemente filtradas
- ✔️ Índices únicos garantem integridade e performance simultaneamente
- ✔️ Índices compostos otimizam consultas com múltiplos filtros
- ✔️ EXPLAIN é a ferramenta essencial para diagnóstico de performance
- ✔️ Evitar funções em colunas indexadas e usar LIMIT são boas práticas fundamentais
