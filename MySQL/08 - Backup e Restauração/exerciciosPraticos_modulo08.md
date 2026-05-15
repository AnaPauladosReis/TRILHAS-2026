# Questões Práticas – Backup e Restauração


| Tema | Foco |
|------|------|
| Backup | mysqldump, completo e incremental |
| Restauração | Banco específico e todos os bancos |
| Exportação | SELECT INTO OUTFILE (CSV) |
| Importação | LOAD DATA INFILE |
| Automação | Cron jobs para backups periódicos |

---

# 1. Backup Completo de um Banco de Dados

> Realize um backup completo do banco de dados biblioteca e salve-o em um arquivo chamado biblioteca_backup.sql.

## ✅ Resposta

    mysqldump -u usuario -p biblioteca > biblioteca_backup.sql

### Explicação dos parâmetros

| Parâmetro | Função |
|-----------|--------|
| `-u usuario` | Define o usuário do MySQL |
| `-p` | Solicita a senha interativamente |
| `biblioteca` | Nome do banco a ser salvo |
| `> biblioteca_backup.sql` | Redireciona a saída para o arquivo |

### O arquivo gerado contém

- Instruções `CREATE TABLE` para recriar a estrutura
- Instruções `INSERT INTO` com todos os dados das tabelas
- Comentários com data, versão do MySQL e configurações

---

# 2. Backup de Tabelas Específicas

> Crie um backup que contenha apenas as tabelas livros e autores do banco de dados biblioteca.

## ✅ Resposta

    mysqldump -u usuario -p biblioteca livros autores > backup_livros_autores.sql

### Explicação

- Após o nome do banco, listam-se as tabelas desejadas separadas por espaço
- Apenas as tabelas `livros` e `autores` serão incluídas no arquivo
- Útil quando se precisa migrar ou restaurar apenas parte do banco

### Quando usar

- Restaurar tabelas corrompidas sem afetar o resto do banco
- Migrar tabelas específicas para outro servidor
- Gerar backups menores e mais rápidos de tabelas críticas

---

# 3. Backup de Todos os Bancos de Dados

> Utilize o comando apropriado para criar um backup de todos os bancos de dados do servidor e salve o arquivo como backup_total.sql.

## ✅ Resposta

    mysqldump -u usuario -p --all-databases > backup_total.sql

### Explicação

- A flag `--all-databases` instrui o mysqldump a exportar todos os bancos presentes no servidor
- O arquivo gerado inclui instruções `CREATE DATABASE` e `USE` para cada banco
- Ideal para migrações completas de servidor ou backups de segurança totais

### Comparação de escopo

| Comando | O que salva |
|---------|-------------|
| `mysqldump ... banco` | Um banco específico |
| `mysqldump ... banco tabela1` | Tabelas específicas |
| `mysqldump ... --all-databases` | Todos os bancos do servidor |

---

# 4. Backup Incremental Usando Logs Binários

> Habilite logs binários no MySQL e explique como usar o arquivo de log para criar um backup incremental.

## ✅ Resposta

###  Passo 1 — Habilitar logs binários no MySQL

Editar o arquivo `my.cnf` (ou `my.ini` no Windows):

    [mysqld]
    log_bin = /var/log/mysql/mysql-bin.log
    server-id = 1

Reiniciar o serviço:

    systemctl restart mysql

###  Passo 2 — Gerar o backup incremental a partir do log

    mysqlbinlog /var/log/mysql/mysql-bin.000001 > backup_incremental.sql

###  Passo 3 — Aplicar o incremental sobre um backup completo

    mysql -u usuario -p biblioteca < backup_incremental.sql

### Fluxo recomendado

| Tipo | Frequência | Ferramenta |
|------|-----------|-----------|
| Backup completo | Semanal | `mysqldump` |
| Backup incremental | Diário | `mysqlbinlog` |

---

# 5. Restauração de um Banco de Dados

> Restaure o banco de dados biblioteca a partir do arquivo biblioteca_backup.sql.

## ✅ Resposta

    -- Criar o banco se não existir
    mysql -u usuario -p -e "CREATE DATABASE IF NOT EXISTS biblioteca;"

    -- Restaurar o banco a partir do backup
    mysql -u usuario -p biblioteca < biblioteca_backup.sql

### Explicação

- O operador `<` redireciona o conteúdo do arquivo para ser executado no MySQL
- O banco `biblioteca` deve existir antes da restauração (ou ser criado antes)
- Todos os dados e estruturas são recriados a partir do arquivo `.sql`

### Verificação após restauração

    mysql -u usuario -p biblioteca -e "SHOW TABLES;"
    -- As tabelas devem aparecer conforme o backup

---

# 6. Restauração de Todos os Bancos de Dados

> Realize a restauração de todos os bancos de dados usando o arquivo backup_total.sql.

## ✅ Resposta

    mysql -u usuario -p < backup_total.sql

### Explicação

- Como o arquivo `backup_total.sql` contém instruções `CREATE DATABASE` e `USE`, o MySQL cria e popula os bancos automaticamente
- Não é necessário especificar um banco de destino na linha de comando
- Útil para migração completa de servidor

### ⚠️ Atenção

- Bancos existentes com o mesmo nome serão sobrescritos
- Recomenda-se testar primeiro em um ambiente de desenvolvimento antes de restaurar em produção

---

# 7. Exportação de Dados para CSV

> Exporte os dados da tabela clientes para um arquivo CSV chamado clientes.csv, configurando corretamente os separadores, aspas e quebras de linha.

## ✅ Resposta

    SELECT id_cliente, nome, email
    INTO OUTFILE '/var/lib/mysql-files/clientes.csv'
    FIELDS TERMINATED BY ','
    ENCLOSED BY '"'
    LINES TERMINATED BY '\n'
    FROM clientes;

### Explicação dos parâmetros

| Parâmetro | Função |
|-----------|--------|
| `FIELDS TERMINATED BY ','` | Separa os campos com vírgula |
| `ENCLOSED BY '"'` | Envolve cada campo entre aspas duplas |
| `LINES TERMINATED BY '\n'` | Cada registro em uma nova linha |

### Exemplo do arquivo gerado

    "1","João Silva","joao@email.com"
    "2","Maria Souza","maria@email.com"
    "3","Ana Oliveira","ana@email.com"

---

# 8. Importação de Dados de um Arquivo CSV

> Importe os dados contidos no arquivo clientes.csv para a tabela clientes do banco de dados biblioteca.

## ✅ Resposta

    LOAD DATA INFILE '/var/lib/mysql-files/clientes.csv'
    INTO TABLE clientes
    FIELDS TERMINATED BY ','
    ENCLOSED BY '"'
    LINES TERMINATED BY '\n';

### Pré-requisitos

- [x] O arquivo deve estar no diretório permitido pelo MySQL (`secure_file_priv`)
- [x] A tabela `clientes` deve existir com as colunas na mesma ordem do arquivo
- [x] O usuário deve ter a permissão `FILE`

### Verificação após importação

    SELECT COUNT(*) FROM clientes;
    -- O número de registros deve corresponder ao arquivo CSV

---

# 9. Automatização de Backups

> Configure um cron job para realizar backups automáticos do banco de dados biblioteca diariamente às 2h da manhã, salvando em /backups.

## ✅ Resposta

###  Passo 1 — Criar o diretório de backups

    mkdir -p /backups
    chmod 700 /backups

###  Passo 2 — Configurar o arquivo de credenciais (seguro)

    # Arquivo: /root/.my.cnf
    [client]
    user=usuario
    password=SenhaForte123!

    chmod 600 /root/.my.cnf

###  Passo 3 — Adicionar o cron job

    crontab -e

    # Linha a adicionar:
    0 2 * * * mysqldump biblioteca > /backups/biblioteca_$(date +\%F).sql

### Interpretação do cron

| Campo | Valor | Significado |
|-------|-------|-------------|
| Minuto | `0` | No minuto zero |
| Hora | `2` | Às 2h da manhã |
| Dia do mês | `*` | Todo dia |
| Mês | `*` | Todo mês |
| Dia da semana | `*` | Qualquer dia |

### Resultado gerado

    /backups/biblioteca_2026-05-15.sql
    /backups/biblioteca_2026-05-16.sql
    ...

---

# 10. Teste de Restauração em Ambiente de Desenvolvimento

> Faça o upload do backup do banco biblioteca para um servidor de teste e restaure para verificar a integridade dos dados.

## ✅ Resposta

###  Passo 1 — Transferir o backup para o servidor de teste

    scp /backups/biblioteca_backup.sql usuario@servidor-teste:/tmp/

###  Passo 2 — Criar o banco no servidor de teste

    mysql -u usuario -p -e "CREATE DATABASE biblioteca_teste;"

###  Passo 3 — Restaurar o backup

    mysql -u usuario -p biblioteca_teste < /tmp/biblioteca_backup.sql

###  Passo 4 — Verificar a integridade

    mysql -u usuario -p biblioteca_teste -e "SHOW TABLES;"
    mysql -u usuario -p biblioteca_teste -e "SELECT COUNT(*) FROM livros;"
    mysql -u usuario -p biblioteca_teste -e "SELECT COUNT(*) FROM autores;"

### O que verificar

- [x] Todas as tabelas foram criadas corretamente
- [x] A contagem de registros corresponde ao banco original
- [x] As consultas retornam resultados consistentes
- [x] Relacionamentos entre tabelas estão íntegros

==Testes regulares de restauração garantem que o backup é realmente utilizável em caso de emergência==

---

## Conclusão

- ✔️ mysqldump é a principal ferramenta para backups lógicos no MySQL
- ✔️ Backups de tabelas específicas otimizam tempo e espaço quando necessário
- ✔️ Logs binários permitem recuperação incremental e point-in-time
- ✔️ SELECT INTO OUTFILE e LOAD DATA INFILE integram o banco com sistemas externos
- ✔️ Cron jobs automatizam backups e eliminam o risco de esquecimento humano
- ✔️ Testes regulares de restauração são tão importantes quanto o backup em si
