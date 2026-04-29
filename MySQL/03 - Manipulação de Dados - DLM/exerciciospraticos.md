# 📚 Exercícios Práticos de SQL – Tabela `funcionarios`

---

##  1. Criação da Tabela

Crie a tabela `funcionarios` com as colunas:
- id_funcionario (INT, chave primária)
- nome (VARCHAR)
- email (VARCHAR)
- cargo (VARCHAR)

    CREATE TABLE funcionarios (
        id_funcionario INT PRIMARY KEY,
        nome VARCHAR(100),
        email VARCHAR(100),
        cargo VARCHAR(50)
    );

---

##  2. Inserção de Dados (3 registros)

    INSERT INTO funcionarios (id_funcionario, nome, email, cargo) VALUES
    (1, 'Ana Silva', 'ana@email.com', 'Analista');

    INSERT INTO funcionarios (id_funcionario, nome, email, cargo) VALUES
    (2, 'João Souza', 'joao@email.com', 'Desenvolvedor');

    INSERT INTO funcionarios (id_funcionario, nome, email, cargo) VALUES
    (3, 'Maria Oliveira', 'maria@email.com', 'Analista');

---

##  3. Inserção de Múltiplos Registros (5 registros)

    INSERT INTO funcionarios (id_funcionario, nome, email, cargo) VALUES
    (4, 'Carlos Lima', 'carlos@email.com', 'Gerente'),
    (5, 'Fernanda Alves', 'fernanda@email.com', 'Analista'),
    (6, 'Lucas Rocha', 'lucas@email.com', 'Desenvolvedor'),
    (7, 'Patrícia Gomes', 'patricia@email.com', 'RH'),
    (8, 'João Pereira', 'joaop@email.com', 'Analista');

---

##  4. Uso de Valores Padrão (DEFAULT)

Adicionar coluna `cidade` com valor padrão "Não Informado":

    ALTER TABLE funcionarios
    ADD cidade VARCHAR(100) DEFAULT 'Não Informado';

Inserir registro sem informar cidade:

    INSERT INTO funcionarios (id_funcionario, nome, email, cargo)
    VALUES (9, 'Bruno Costa', 'bruno@email.com', 'Suporte');

Resultado esperado: cidade = "Não Informado"

---

##  5. Consulta com WHERE

    SELECT * FROM funcionarios
    WHERE cargo = 'Analista';

---

##  6. ORDER BY

    SELECT * FROM funcionarios
    ORDER BY nome ASC;

---

##  7. LIMIT

    SELECT * FROM funcionarios
    LIMIT 3;

---

##  8. DISTINCT

    SELECT DISTINCT cidade FROM funcionarios;

---

##  9. GROUP BY

    SELECT cargo, COUNT(*) AS total_funcionarios
    FROM funcionarios
    GROUP BY cargo;

---

##  10. UPDATE

Atualizar o cargo de todos os funcionários chamados João:

    UPDATE funcionarios
    SET cargo = 'Coordenador'
    WHERE nome LIKE 'João%';

---

##  11. DELETE

Remover todos os funcionários com cargo Analista:

    DELETE FROM funcionarios
    WHERE cargo = 'Analista';

