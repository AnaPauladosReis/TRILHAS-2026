# Questões Teóricas – Segurança e Controle de Acesso



## 📌 Visão Geral

| Tema | Descrição |
|------|----------|
| Controle de Acesso | Definição de quem pode acessar o quê |
| Permissões | Granularidade de operações permitidas |
| Segurança | Práticas para proteger dados e contas |

---

# 1. GRANT vs REVOKE

> Explique a diferença entre os comandos GRANT e REVOKE no MySQL. Dê exemplos de situações em que cada comando seria usado.

## ✅ Resposta

### 📌 Diferença principal

| Comando | Função |
|---------|--------|
| `GRANT` | **Concede** permissões a um usuário |
| `REVOKE` | **Remove** permissões previamente concedidas |

### Exemplo GRANT — quando usar

Ao contratar um novo analista que precisa consultar relatórios:

    GRANT SELECT ON meu_banco.relatorios TO 'analista'@'localhost';

### Exemplo REVOKE — quando usar

Ao encerrar o contrato do analista ou redefinir suas funções:

    REVOKE SELECT ON meu_banco.relatorios FROM 'analista'@'localhost';

==GRANT abre o acesso; REVOKE fecha. Ambos trabalham juntos no ciclo de vida das permissões==

---

# 2. Princípio do Menor Privilégio

> O que é o princípio do menor privilégio? Por que ele é importante em sistemas de banco de dados?

## ✅ Resposta

O **Princípio do Menor Privilégio** determina que cada usuário deve receber **apenas as permissões estritamente necessárias** para realizar suas funções, sem nenhum acesso adicional.

Exemplo de aplicação correta:

    -- Usuário de relatório: apenas SELECT
    GRANT SELECT ON meu_banco.vendas TO 'relatorio_user'@'localhost';

    -- Usuário de cadastro: apenas INSERT
    GRANT INSERT ON meu_banco.clientes TO 'cadastro_user'@'localhost';

### 📌 Por que é importante

- [x] Limita o dano causado por contas comprometidas
- [x] Evita alterações ou exclusões acidentais por usuários sem necessidade de escrita
- [x] Facilita a auditoria — fica claro quem pode fazer o quê
- [x] Reduz a superfície de ataque em caso de invasão

### ❌ Situação de risco sem o princípio

    GRANT ALL PRIVILEGES ON *.* TO 'usuario_qualquer'@'%';
    -- Acesso total ao banco inteiro, de qualquer lugar → altamente perigoso

---

# 3. Importância de Senhas Fortes

> Qual é a importância de usar senhas fortes em bancos de dados? Cite as características de uma senha segura.

## ✅ Resposta

A senha é a primeira linha de defesa contra acessos não autorizados. Senhas fracas são vulneráveis a ataques de força bruta, dicionário e engenharia social, podendo comprometer todo o banco de dados.

### 📌 Características de uma senha segura

| Critério | Exemplo |
|----------|---------|
| Mínimo de 8 caracteres | `MinhaSenh@2024!` (15 chars) |
| Letras maiúsculas | `M`, `S` |
| Letras minúsculas | `inha`, `enh` |
| Números | `2024` |
| Símbolos especiais | `@`, `!` |

### Como ativar política de senha forte no MySQL

    SET GLOBAL validate_password_policy = 'STRONG';

==Senhas fortes, combinadas com política ativa no banco, eliminam a maioria dos ataques de acesso==

---

# 4. Usuários Compartilhados

> Por que é recomendável evitar o uso de usuários compartilhados em bancos de dados?

## ✅ Resposta

Um usuário compartilhado é uma conta utilizada por múltiplas pessoas ou sistemas ao mesmo tempo. Essa prática representa um risco significativo de segurança e dificulta a governança do banco.

### ❌ Problemas com usuários compartilhados

- Impossível rastrear **quem** realizou uma ação específica (sem trilha de auditoria individual)
- Se a senha for comprometida, **todos** os usuários que a compartilham ficam expostos
- Revogar o acesso de uma pessoa exige trocar a senha para todos
- Violação de regulamentações como LGPD e GDPR, que exigem rastreabilidade individual

### ✅ Prática recomendada

    -- Cada pessoa ou sistema deve ter sua própria conta
    CREATE USER 'dev_joao'@'localhost' IDENTIFIED BY 'Senha$Joao2024!';
    CREATE USER 'dev_maria'@'localhost' IDENTIFIED BY 'Senha$Maria2024!';
    CREATE USER 'sistema_erp'@'localhost' IDENTIFIED BY 'Senha$Erp2024!';

---

# 5. Riscos de Permissões Desnecessárias

> Quais são os riscos de conceder permissões desnecessárias a um usuário? Explique como evitar esses riscos.

## ✅ Resposta

Conceder permissões além do necessário viola o Princípio do Menor Privilégio e expõe o banco a riscos graves.

### ❌ Riscos

- Um usuário com `DELETE` pode remover dados críticos acidentalmente ou maliciosamente
- Um usuário com `DROP` pode destruir tabelas inteiras
- Credenciais comprometidas de um usuário com `ALL PRIVILEGES` resultam em controle total do banco pelo invasor
- Dificulta a rastreabilidade de incidentes

### ✅ Como evitar

- [x] Mapear as necessidades reais de cada função antes de conceder permissões
- [x] Conceder permissões específicas por tabela, não no banco inteiro
- [x] Revisar periodicamente as permissões com auditoria
- [x] Remover permissões quando o usuário muda de função

### Exemplo seguro

    -- ❌ Inseguro: acesso total
    GRANT ALL PRIVILEGES ON *.* TO 'usuario'@'%';

    -- ✅ Seguro: apenas o necessário
    GRANT SELECT, INSERT ON loja.pedidos TO 'usuario'@'localhost';

---

# 6. Restrição de Acesso por Host

> Explique como a restrição de acesso por host pode aumentar a segurança do banco de dados.

## ✅ Resposta

O **host** define de qual endereço IP ou máquina um usuário pode se conectar ao banco. Restringir o host adiciona uma camada de segurança independente da senha.

### 📌 Tipos de host

| Valor de host | Significado |
|--------------|-------------|
| `localhost` | Apenas conexões locais (mesmo servidor) |
| `192.168.1.10` | Apenas do IP específico |
| `192.168.1.%` | Qualquer IP da sub-rede |
| `%` | Qualquer endereço (menos seguro) |

### Exemplo de restrição segura

    -- Usuário só pode conectar do servidor de aplicação
    CREATE USER 'app_user'@'192.168.1.10' IDENTIFIED BY 'App$Senha2024!';

### Benefício

Mesmo que a senha seja descoberta, um invasor externo não consegue se conectar se seu IP não estiver autorizado no host do usuário.

==Host restrito + senha forte = autenticação em dois fatores por natureza==

---

# 7. Permissões Comuns no MySQL

> Descreva as permissões comuns em MySQL (SELECT, INSERT, UPDATE, DELETE) e dê exemplos de suas aplicações.

## ✅ Resposta

### 📌 Permissões e aplicações

| Permissão | Operação permitida | Exemplo de uso |
|-----------|-------------------|----------------|
| `SELECT` | Consultar dados | Relatórios, dashboards, leitura de catálogo |
| `INSERT` | Inserir novos registros | Cadastro de clientes, criação de pedidos |
| `UPDATE` | Modificar registros existentes | Atualizar endereço, alterar status de pedido |
| `DELETE` | Remover registros | Cancelar pedidos, excluir registros obsoletos |

### Exemplos práticos

    -- Usuário de relatórios: apenas SELECT
    GRANT SELECT ON loja.* TO 'analista'@'localhost';

    -- Usuário de atendimento: cadastro e atualização, sem exclusão
    GRANT SELECT, INSERT, UPDATE ON loja.clientes TO 'atendente'@'localhost';

    -- Administrador: acesso completo
    GRANT ALL PRIVILEGES ON loja.* TO 'admin'@'localhost';

---

# 8. Auditoria de Usuários e Permissões

> O que é uma auditoria de usuários e permissões? Por que é importante realizá-la regularmente?

## ✅ Resposta

A **auditoria de usuários e permissões** é o processo de revisar periodicamente as contas existentes no banco de dados e as permissões atribuídas a cada uma, identificando excessos, contas obsoletas ou configurações inadequadas.

### Comandos de auditoria

    -- Listar todos os usuários
    SELECT user, host FROM mysql.user;

    -- Ver permissões de um usuário específico
    SHOW GRANTS FOR 'usuario_local'@'localhost';

### 📌 Por que é importante

- [x] Identificar contas de ex-funcionários que não foram removidas
- [x] Detectar permissões concedidas além do necessário
- [x] Garantir conformidade com normas como LGPD, ISO 27001 e PCI-DSS
- [x] Prevenir acessos indevidos antes que causem danos

### Frequência recomendada

- Revisão mensal em ambientes de produção
- Revisão imediata após desligamento de funcionários ou mudanças de função

---

# 9. Boas Práticas em Ambiente Multiusuário

> Quais práticas devem ser seguidas ao conceder permissões em um ambiente multiusuário?

## ✅ Resposta

Em ambientes com múltiplos usuários (desenvolvedores, analistas, sistemas automatizados), o gerenciamento de permissões exige disciplina e padronização.

### ✅ Boas práticas

- [x] **Princípio do menor privilégio**: cada usuário acessa apenas o que precisa
- [x] **Contas individuais**: nunca compartilhar credenciais entre pessoas ou sistemas
- [x] **Restrição por host**: limitar o IP de origem de cada conexão
- [x] **Senhas fortes com política ativa**: usar `validate_password_policy = 'STRONG'`
- [x] **Auditorias periódicas**: revisar permissões regularmente
- [x] **Revogação imediata**: remover acessos de usuários desligados sem demora
- [x] **Separação de ambientes**: usuários de desenvolvimento não devem ter acesso à produção

### Exemplo de organização por perfil

| Perfil | Permissões típicas |
|--------|--------------------|
| Analista de dados | `SELECT` em tabelas específicas |
| Desenvolvedor (dev) | `SELECT`, `INSERT`, `UPDATE` em banco de teste |
| Sistema de aplicação | `SELECT`, `INSERT`, `UPDATE` em tabelas da aplicação |
| DBA / Administrador | `ALL PRIVILEGES` com acesso restrito por IP |

---

# 10. Configuração em Ambiente de Produção com Equipes

> Considere um ambiente com equipe de desenvolvedores e equipe de administradores. Como configurar usuários e permissões para garantir segurança e eficiência?

## ✅ Resposta

### Estratégia de configuração

    -- Desenvolvedores: acesso ao banco de desenvolvimento apenas
    CREATE USER 'dev_team'@'192.168.1.%' IDENTIFIED BY 'Dev$Team2024!';
    GRANT SELECT, INSERT, UPDATE ON desenvolvimento.* TO 'dev_team'@'192.168.1.%';

    -- Administradores: acesso completo ao banco de produção, restrito por IP
    CREATE USER 'dba_admin'@'10.0.0.1' IDENTIFIED BY 'Dba$Admin2024!';
    GRANT ALL PRIVILEGES ON producao.* TO 'dba_admin'@'10.0.0.1';

    -- Sistema de aplicação em produção: apenas operações necessárias
    CREATE USER 'app_producao'@'10.0.0.5' IDENTIFIED BY 'App$Prod2024!';
    GRANT SELECT, INSERT, UPDATE ON producao.* TO 'app_producao'@'10.0.0.5';

    FLUSH PRIVILEGES;

### 📌 Princípios aplicados

| Regra | Aplicação |
|-------|-----------|
| Menor privilégio | Devs não acessam produção; app não tem DELETE |
| Host restrito | Cada usuário limitado ao IP da sua origem |
| Contas individuais por função | Dev, DBA e sistema têm contas separadas |
| Senhas fortes | Todas as senhas seguem política STRONG |

==Separação entre ambientes e funções é a base de uma configuração segura em produção==

---

## Conclusão

- ✔️ GRANT e REVOKE controlam precisamente o que cada usuário pode fazer
- ✔️ O princípio do menor privilégio minimiza riscos de acessos indevidos
- ✔️ Senhas fortes e restrição por host formam camadas complementares de segurança
- ✔️ Contas individuais garantem rastreabilidade e accountability
- ✔️ Auditorias regulares mantêm o controle de acesso alinhado com as necessidades reais
