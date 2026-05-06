#  Questões Práticas – Relacionamentos em Banco de Dados


| Tema | Foco |
|------|------|
|  Chaves | PK e FK |
|  Relacionamentos | 1:1, 1:N, N:N |
|  Integridade | CASCADE |
|  Consultas | JOIN |

---

# 1. Chave Primária e Estrangeira

> Crie duas tabelas chamadas clientes e pedidos. Configure:
> ○ id_cliente como chave primária na tabela clientes.
> ○ id_cliente como chave estrangeira na tabela pedidos, referenciando clientes. Qual a importância de definir essas chaves corretamente?

## ✅ Resposta

    CREATE TABLE clientes (
        id_cliente INT PRIMARY KEY,
        nome VARCHAR(100)
    );

    CREATE TABLE pedidos (
        id_pedido INT PRIMARY KEY,
        id_cliente INT,
        FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente)
    );

###  Importância

- [x] Garante identificação única  
- [x] Permite relacionamento entre tabelas  
- [x] Evita dados órfãos  

Sem isso, o banco perde consistência

---

# 2. Integridade Referencial

> Configure a tabela pedidos para que a exclusão de um cliente também exclua automaticamente os pedidos associados (ON DELETE CASCADE). Explique como isso ajuda a manter a integridade dos dados.

## ✅ Resposta

    CREATE TABLE pedidos (
        id_pedido INT PRIMARY KEY,
        id_cliente INT,
        FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente)
        ON DELETE CASCADE
    );

###  Explicação

- Ao excluir um cliente → seus pedidos também são excluídos  
- Evita registros órfãos  
- Mantém consistência automática  

---

# 3. Tipos de Relacionamentos (1:N)

> Desenvolva um relacionamento 1:N entre clientes e pedidos. Insira 10 registros em cada tabela e demonstre como listar todos os pedidos de um cliente específico usando uma consulta SQL.

## ✅ Resposta

###  Inserções

    INSERT INTO clientes VALUES
    (1,'Ana'),(2,'João'),(3,'Maria'),(4,'Carlos'),(5,'Paula'),
    (6,'Lucas'),(7,'Fernanda'),(8,'Bruno'),(9,'Rafaela'),(10,'Pedro');

    INSERT INTO pedidos VALUES
    (1,1),(2,1),(3,2),(4,3),(5,3),
    (6,4),(7,5),(8,6),(9,7),(10,8);

###  Consulta

    SELECT * FROM pedidos
    WHERE id_cliente = 1;

---

# 4. Relacionamento N:N

> Crie as tabelas produtos, pedidos e a tabela intermediária pedido_produto. Insira registros nas tabelas e demonstre como listar todos os produtos de um pedido.

## ✅ Resposta

    CREATE TABLE produtos (
        id_produto INT PRIMARY KEY,
        nome VARCHAR(100)
    );

    CREATE TABLE pedido_produto (
        id_pedido INT,
        id_produto INT,
        quantidade INT,
        FOREIGN KEY (id_pedido) REFERENCES pedidos(id_pedido),
        FOREIGN KEY (id_produto) REFERENCES produtos(id_produto)
    );

###  Inserção

    INSERT INTO produtos VALUES (1,'Mouse'),(2,'Teclado'),(3,'Monitor');

    INSERT INTO pedido_produto VALUES
    (1,1,2),
    (1,2,1),
    (2,3,1);

###  Consulta

    SELECT * FROM pedido_produto
    WHERE id_pedido = 1;

---

# 5. Consulta com JOIN

> Realize uma consulta SQL para retornar os nomes dos clientes, os produtos comprados e a quantidade de cada produto em um pedido.

## ✅ Resposta

    SELECT c.nome, p.nome, pp.quantidade
    FROM clientes c
    JOIN pedidos pe ON c.id_cliente = pe.id_cliente
    JOIN pedido_produto pp ON pe.id_pedido = pp.id_pedido
    JOIN produtos p ON pp.id_produto = p.id_produto;

---

# 6. Exclusão em Cascata

> Demonstre o comportamento de uma exclusão em cascata na tabela clientes, excluindo um cliente e verificando se os pedidos relacionados foram removidos.

## ✅ Resposta

    DELETE FROM clientes WHERE id_cliente = 1;

    SELECT * FROM pedidos;

 Os pedidos do cliente 1 serão automaticamente removidos.

---

# 7. Atualização em Cascata

> Configure a tabela pedidos para que a alteração do id_cliente na tabela clientes atualize automaticamente os registros relacionados. Teste com um exemplo prático.

## ✅ Resposta

    FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente)
    ON UPDATE CASCADE

###  Teste

    UPDATE clientes SET id_cliente = 100 WHERE id_cliente = 2;

 Os pedidos vinculados também serão atualizados.

---

# 8. Cardinalidades

> Explique e configure exemplos práticos para os tipos de cardinalidades 1:1, 1:N e N:M, criando tabelas e inserindo registros.

## ✅ Resposta

###  Tipos

| Tipo | Exemplo |
|------|--------|
| 1:1 | Usuário ↔ Perfil |
| 1:N | Cliente → Pedidos |
| N:N | Pedido ↔ Produto |

###  Exemplo 1:1

    CREATE TABLE usuario (
        id INT PRIMARY KEY
    );

    CREATE TABLE perfil (
        id INT PRIMARY KEY,
        FOREIGN KEY (id) REFERENCES usuario(id)
    );

---

# 9. Tabelas Intermediárias

> Crie uma consulta para listar todos os pedidos contendo um produto específico usando a tabela intermediária pedido_produto.

## ✅ Resposta

    SELECT * FROM pedido_produto
    WHERE id_produto = 1;

---

# 10. Boas Práticas em Relacionamentos

> Analise um banco de dados existente (pode ser fictício) e identifique como os relacionamentos foram estruturados. Proponha melhorias para garantir integridade e eficiência.

## ✅ Resposta

###  Problemas comuns

- ❌ Falta de chaves estrangeiras  
- ❌ Dados duplicados  
- ❌ Ausência de integridade referencial  

### ✅ Melhorias

- [x] Definir PK e FK corretamente  
- [x] Usar CASCADE quando necessário  
- [x] Normalizar tabelas  
- [x] Evitar redundância  

---

##  Conclusão

- ✔️ Relacionamentos bem definidos evitam erros  
- ✔️ Integridade referencial mantém consistência  
- ✔️ Modelagem correta facilita manutenção  