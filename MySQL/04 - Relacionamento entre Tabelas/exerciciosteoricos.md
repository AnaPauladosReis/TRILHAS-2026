# Questões Teóricas – Banco de Dados Relacional



## 📌 Visão Geral

| Tema | Descrição |
|------|----------|
|  Banco de Dados | Organização estruturada de dados |
|  Relacionamentos | Conexão entre tabelas |
|  Integridade | Consistência dos dados |

---

# 1. Definição de Relacionamentos

> Explique o conceito de relacionamento entre tabelas e como as chaves primárias e estrangeiras são usadas para implementá-los.

## ✅ Resposta

Relacionamento entre tabelas é a forma de conectar dados que estão distribuídos em diferentes tabelas dentro de um banco de dados.

- A **chave primária (Primary Key)** identifica unicamente cada registro.
- A **chave estrangeira (Foreign Key)** cria a ligação entre tabelas.

Exemplo:

    CLIENTES (id_cliente PK)
    PEDIDOS (id_pedido PK, id_cliente FK)

 Isso permite associar um pedido a um cliente específico.

---

# 2. Chave Primária

> Quais são as principais características de uma chave primária? Por que ela é essencial em um banco de dados relacional?

## ✅ Resposta

### 📌 Características

- [x] Única  
- [x] Não nula  
- [x] Imutável (idealmente)  

###  Importância

Sem chave primária:

- ❌ Registros duplicados  
- ❌ Falta de identificação  
- ❌ Problemas em relacionamentos  

==Ela garante organização e integridade dos dados==

---

# 3. Chave Estrangeira

> O que é uma chave estrangeira? Explique sua importância na criação de relacionamentos entre tabelas.

## ✅ Resposta

A chave estrangeira é um campo que referencia a chave primária de outra tabela.

Exemplo:

    FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente)

### 📌 Importância

-  Cria relacionamento entre tabelas  
-  Mantém consistência  
-  Evita dados inválidos  

---

# 4. Integridade Referencial

> O que é integridade referencial? Cite exemplos práticos de como ela é aplicada em um banco de dados.

## ✅ Resposta

Integridade referencial garante que os dados relacionados permaneçam consistentes.

###  Exemplos

- ❌ Inserir pedido com cliente inexistente  
- ❌ Deletar cliente com pedidos vinculados  

Comportamentos possíveis:

    ON DELETE RESTRICT
    ON DELETE CASCADE
    ON DELETE SET NULL

---

# 5. Tipos de Relacionamentos

> Diferencie os relacionamentos 1:1, 1:N e N:M, dando exemplos práticos para cada tipo.

##  Comparação

| Tipo | Relação | Exemplo |
|------|--------|--------|
| 1:1 | Um para um | Pessoa ↔ CPF |
| 1:N | Um para muitos | Cliente → Pedidos |
| N:M | Muitos para muitos | Alunos ↔ Cursos |

### 📌 Explicação

- **1:1** → relação exclusiva  
- **1:N** → um para vários  
- **N:M** → vários para vários  

---

# 6. Exclusão e Atualização em Cascata

> Explique as diferenças entre ON DELETE CASCADE e ON UPDATE CASCADE. Quando é apropriado usar cada um?

## ✅ Resposta

    ON DELETE CASCADE
    ON UPDATE CASCADE

### 📌 Diferença

| Comando | Função |
|--------|-------|
| DELETE CASCADE | Remove registros relacionados |
| UPDATE CASCADE | Atualiza automaticamente |

###  Uso

- DELETE CASCADE → quando quer apagar tudo junto  
- UPDATE CASCADE → quando chave pode mudar  

---

# 7. Tabelas Intermediárias

> Qual é a função de uma tabela intermediária em um relacionamento N:M? Explique sua estrutura e aplicabilidade.

## ✅ Resposta

A tabela intermediária resolve o relacionamento muitos-para-muitos.

Exemplo:

    ALUNOS_CURSOS (
      id_aluno FK,
      id_curso FK
    )

### 📌 Função

-  Conectar tabelas  
-  Permitir múltiplas relações  

---

# 8. Vantagens dos Relacionamentos

> Quais são os benefícios de organizar dados em tabelas relacionadas em vez de armazenar tudo em uma única tabela?

## ✅ Resposta

### ✅ Benefícios

- [x] Menos redundância  
- [x] Mais organização  
- [x] Melhor manutenção  
- [x] Maior integridade  

---

# 9. Problemas sem Relacionamentos

> O que pode acontecer em um banco de dados que não utiliza relacionamentos corretamente? Dê exemplos de inconsistências que podem surgir.

##  Resposta

Sem relacionamentos:

- ❌ Dados inconsistentes  
- ❌ Duplicidade  
- ❌ Erros de referência  

###  Exemplos

- Pedido com cliente inexistente  
- Cliente duplicado  
- Dados divergentes  

==Isso compromete a confiabilidade do sistema==

---

# 10. Aplicabilidade Prática

> Em quais situações práticas você utilizaria relacionamentos 1:N e N:M? Explique com base em sistemas reais, como e-commerce ou gestão acadêmica.

## ✅ Resposta

###  E-commerce

- 1:N → Cliente → Pedidos  
- N:M → Produtos ↔ Pedidos  

###  Sistema Acadêmico

- 1:N → Professor → Turmas  
- N:M → Alunos ↔ Disciplinas  

---

##  Conclusão

- ✔️ Relacionamentos conectam tabelas  
- ✔️ PK identifica registros  
- ✔️ FK cria vínculos  
- ✔️ Integridade evita erros  