# Questões Práticas – Segurança e Controle de Acesso


| Tema | Foco |
|------|------|
| Usuários | CREATE, ALTER e DROP USER |
| Permissões | GRANT e REVOKE |
| Segurança | Senhas, host e menor privilégio |
| Auditoria | Revisão de contas e acessos |

---

# 1. Criação de Usuários

> Crie dois usuários no MySQL: um com acesso local (localhost) e outro com acesso remoto (%).

## ✅ Resposta

    -- Usuário com acesso apenas local
    CREATE USER 'usuario_local'@'localhost' IDENTIFIED BY 'Senha$Local123!';

    -- Usuário com acesso remoto (qualquer host)
    CREATE USER 'usuario_remoto'@'%' IDENTIFIED BY 'Senha$Remota456!';

### Explicação

| Usuário | Host | Significado |
|---------|------|-------------|
| `usuario_local` | `localhost` | Só pode conectar do próprio servidor |
| `usuario_remoto` | `%` | Pode conectar de qualquer endereço IP |

- O `localhost` é mais seguro pois restringe o acesso ao servidor local
- O `%` é necessário para aplicações em servidores diferentes do banco

---

# 2. Alteração de Usuários

> Modifique a senha do usuário usuario_local para uma senha forte, seguindo as práticas recomendadas.

## ✅ Resposta

    ALTER USER 'usuario_local'@'localhost' IDENTIFIED BY 'Nov@Senha$F0rte2024!';

### Características da senha forte utilizada

- [x] Mais de 8 caracteres
- [x] Letra maiúscula: `N`, `S`, `F`
- [x] Letras minúsculas: `ov`, `enha`, `orte`
- [x] Número: `0`, `2024`
- [x] Símbolo especial: `@`, `$`, `!`

==Senhas fortes são a primeira barreira contra acessos não autorizados==

---

# 3. Exclusão de Usuários

> Exclua o usuário usuario_remoto do banco de dados.

## ✅ Resposta

    DROP USER 'usuario_remoto'@'%';

### Explicação

- O `DROP USER` remove **permanentemente** a conta do MySQL
- Todas as permissões concedidas ao usuário também são removidas automaticamente
- A operação não pode ser desfeita

### Verificação após exclusão

    SELECT user, host FROM mysql.user;
    -- usuario_remoto não deve mais aparecer na listagem

---

# 4. Concessão de Permissões

> Conceda permissão de leitura (SELECT) na tabela clientes para usuario_local. Conceda todas as permissões no banco loja para admin_user.

## ✅ Resposta

    -- Permissão de leitura em tabela específica
    GRANT SELECT ON meu_banco.clientes TO 'usuario_local'@'localhost';

    -- Todas as permissões no banco loja
    GRANT ALL PRIVILEGES ON loja.* TO 'admin_user'@'localhost';

    -- Aplicar as permissões imediatamente
    FLUSH PRIVILEGES;

### Comparação de escopo

| Comando | Escopo | Nível de acesso |
|---------|--------|----------------|
| `GRANT SELECT ON banco.clientes` | Tabela específica | Somente leitura |
| `GRANT ALL PRIVILEGES ON loja.*` | Banco completo | Acesso total |

---

# 5. Revogação de Permissões

> Revogue a permissão de leitura (SELECT) na tabela clientes do usuário usuario_local.

## ✅ Resposta

    REVOKE SELECT ON meu_banco.clientes FROM 'usuario_local'@'localhost';

### Verificação

    SHOW GRANTS FOR 'usuario_local'@'localhost';
    -- SELECT em meu_banco.clientes não deve mais aparecer

### Explicação

- O `REVOKE` remove permissões sem excluir o usuário
- Permissões em outras tabelas ou bancos **não são afetadas**
- Após revogar, o usuário perde acesso imediatamente

---

# 6. Configuração de Permissões por Host

> Crie um usuário chamado usuario_servidor com permissão de acessar o banco de dados apenas do servidor local.

## ✅ Resposta

    CREATE USER 'usuario_servidor'@'localhost' IDENTIFIED BY 'Srv$Senha2024!';

    GRANT SELECT, INSERT, UPDATE ON meu_banco.* TO 'usuario_servidor'@'localhost';

### Explicação

- Ao especificar `localhost`, o banco rejeita conexões desse usuário vindas de outros IPs
- Mesmo que a senha seja descoberta, o acesso externo ainda é bloqueado pelo host
- É uma camada extra de segurança além da autenticação por senha

---

# 7. Princípio do Menor Privilégio

> Configure um usuário chamado relatorio_user com acesso somente à tabela relatorios com permissão de leitura.

## ✅ Resposta

    CREATE USER 'relatorio_user'@'localhost' IDENTIFIED BY 'Rel@t0rio$2024!';

    GRANT SELECT ON meu_banco.relatorios TO 'relatorio_user'@'localhost';

### Princípio aplicado

- [x] Usuário criado com escopo restrito ao necessário
- [x] Apenas `SELECT` concedido — sem `INSERT`, `UPDATE` ou `DELETE`
- [x] Acesso limitado a uma única tabela, não ao banco inteiro

### Por que isso importa

| Permissão | relatorio_user pode? |
|-----------|---------------------|
| Ler dados de `relatorios` | ✅ Sim |
| Inserir dados | ❌ Não |
| Alterar dados | ❌ Não |
| Acessar outras tabelas | ❌ Não |

---

# 8. Auditoria de Usuários

> Liste todos os usuários criados no banco de dados e suas permissões utilizando os comandos adequados.

## ✅ Resposta

    -- Listar todos os usuários e seus hosts
    SELECT user, host FROM mysql.user;

    -- Ver permissões de um usuário específico
    SHOW GRANTS FOR 'usuario_local'@'localhost';

    -- Ver permissões do usuário atual
    SHOW GRANTS;

### Exemplo de resultado esperado

| user | host |
|------|------|
| usuario_local | localhost |
| usuario_servidor | localhost |
| relatorio_user | localhost |
| admin_user | localhost |
| root | localhost |

==A auditoria regular identifica usuários com permissões excessivas ou contas obsoletas==

---

# 9. Políticas de Senhas

> Ative a política de senhas fortes no MySQL e aplique ao usuário usuario_local.

## ✅ Resposta

    -- Ativar política de senha forte globalmente
    SET GLOBAL validate_password_policy = 'STRONG';

    -- Aplicar nova senha forte ao usuário
    ALTER USER 'usuario_local'@'localhost' IDENTIFIED BY 'P0litica$Forte2024!';

    -- Verificar a configuração da política
    SHOW VARIABLES LIKE 'validate_password%';

### Níveis de política de senha no MySQL

| Nível | Requisitos |
|-------|-----------|
| `LOW` | Apenas comprimento mínimo |
| `MEDIUM` | Comprimento + números + maiúsculas + minúsculas |
| `STRONG` | Tudo acima + símbolos especiais + dicionário |

---

# 10. Configuração em Ambientes de Produção

> Configure dois usuários em um banco de produção: um apenas para leitura e outro para inserção e alteração.

## ✅ Resposta

    -- Usuário somente leitura
    CREATE USER 'leitor_prod'@'localhost' IDENTIFIED BY 'Leitor$Prod2024!';
    GRANT SELECT ON producao.* TO 'leitor_prod'@'localhost';

    -- Usuário para escrita (sem DELETE para segurança extra)
    CREATE USER 'escritor_prod'@'localhost' IDENTIFIED BY 'Escritor$Prod2024!';
    GRANT INSERT, UPDATE ON producao.* TO 'escritor_prod'@'localhost';

    -- Aplicar as permissões
    FLUSH PRIVILEGES;

### Justificativa da configuração

- ❌ `DELETE` não foi concedido ao `escritor_prod` → evita remoção acidental de dados críticos
- ✅ Separar leitura e escrita reduz o impacto de uma conta comprometida
- ✅ Cada usuário acessa apenas o que sua função exige

### Resumo dos perfis

| Usuário | SELECT | INSERT | UPDATE | DELETE |
|---------|--------|--------|--------|--------|
| `leitor_prod` | ✅ | ❌ | ❌ | ❌ |
| `escritor_prod` | ❌ | ✅ | ✅ | ❌ |

---

## Conclusão

- ✔️ CREATE/ALTER/DROP USER gerenciam o ciclo de vida das contas
- ✔️ GRANT e REVOKE controlam o que cada usuário pode fazer
- ✔️ O menor privilégio reduz o risco de danos acidentais ou maliciosos
- ✔️ Senhas fortes e restrição por host são camadas essenciais de segurança
- ✔️ Auditorias regulares mantêm o controle de acesso atualizado e seguro
