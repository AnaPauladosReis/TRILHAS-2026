# Lista de Exercícios — Estudos de Caso e Aplicações Práticas

## Exercício 1: Estrutura de documentação para um sistema de biblioteca acadêmica

**Projeto escolhido:** sistema de gerenciamento de empréstimos de uma biblioteca acadêmica, com cadastro de livros, usuários e controle de devoluções.

**Estrutura de diretórios:**

```
biblioteca-docs/
    mkdocs.yml
    docs/
        index.md
        instalacao.md
        configuracao.md
        api/
            livros.md
            usuarios.md
            emprestimos.md
```

**Conteúdo do `mkdocs.yml`:**

```yaml
site_name: 'Documentação - Sistema de Biblioteca'
site_description: 'Guia de instalação, configuração e uso da API do sistema de biblioteca'

theme:
  name: 'material'

nav:
  - Início: index.md
  - Instalação: instalacao.md
  - Configuração: configuracao.md
  - API:
      - Livros: api/livros.md
      - Usuários: api/usuarios.md
      - Empréstimos: api/emprestimos.md
```

**Trecho de `instalacao.md`:**

```markdown
# Instalação

1. Clone o repositório do projeto.
2. Instale as dependências com `pip install -r requirements.txt`.
3. Configure o banco de dados conforme descrito em [Configuração](configuracao.md).
4. Execute o servidor com `python manage.py runserver`.
```

**Trecho de `api/emprestimos.md`:**

```markdown
# API de Empréstimos

## Registrar empréstimo

`POST /emprestimos`

| Campo | Tipo | Descrição |
|---|---|---|
| livro_id | integer | ID do livro emprestado |
| usuario_id | integer | ID do usuário responsável |
| data_devolucao | date | Data prevista de devolução |
```

Essa divisão segue a lógica de **organização e fácil navegação** descrita no material: cada seção do sistema (instalação, configuração, e cada recurso da API) vira uma página própria, e o `nav` agrupa os recursos da API sob um mesmo item de menu, evitando uma lista plana com dezenas de páginas sem hierarquia.

---

## Exercício 2: Divisão de trabalho colaborativo com controle de versão

**Cenário:** documentação de um sistema de gerenciamento de inventário, dividida entre quatro integrantes.

| Integrante | Responsabilidade | Branch de trabalho |
|---|---|---|
| Aluno 1 | Setup do ambiente e instalação | `docs/instalacao` |
| Aluno 2 | Endpoints da API | `docs/api-endpoints` |
| Aluno 3 | Tutoriais para usuário final | `docs/tutoriais` |
| Aluno 4 | Manutenção e revisão geral | revisa todos os PRs |

**Fluxo de trabalho com Git:**

```bash
# Cada integrante parte da branch principal
git checkout main
git pull origin main
git checkout -b docs/instalacao

# Após escrever o conteúdo
git add docs/instalacao.md
git commit -m "Adiciona guia de instalação do ambiente"
git push origin docs/instalacao
```

Cada integrante então abre um **pull request** da própria branch para `main`, e o Aluno 4 (responsável pela revisão) avalia o conteúdo antes de aprovar o merge.

**Por que esse fluxo evita conflitos:** como cada pessoa trabalha em um arquivo ou seção diferente (`instalacao.md`, `api/*.md`, `tutoriais.md`), a chance de dois integrantes editarem a mesma linha do mesmo arquivo simultaneamente é baixa, reduzindo a necessidade de resolução manual de conflitos de merge — o tipo de organização que só é viável porque a documentação vive em arquivos de texto versionáveis, e não em um documento único compartilhado.

---

## Exercício 3: Estudo de caso — documentação de um sistema de pedidos com Swagger

**Contexto:** uma equipe de e-commerce precisa documentar o sistema de pedidos, que expõe uma API REST consumida por um aplicativo mobile e por um painel administrativo web.

**Desafio:** dois times diferentes (mobile e web) consumiam a mesma API, mas recorriam a mensagens no chat da equipe para tirar dúvidas sobre parâmetros e formatos de resposta, gerando retrabalho e informações divergentes entre os dois times.

**Solução adotada:**

1. A equipe estruturou o projeto MKDocs com uma seção dedicada à API, seguindo o padrão do Módulo 06:
   ```
   docs/
       api/
           openapi.yaml
           swagger-ui/
   ```

2. Cada endpoint do sistema de pedidos (`/pedidos`, `/pedidos/{id}`, `/pedidos/{id}/status`) foi descrito na especificação OpenAPI, com exemplos reais de requisição e resposta.

3. O Swagger UI foi referenciado diretamente no `nav` do `mkdocs.yml`, tornando a documentação interativa acessível pelo mesmo site usado para os guias de instalação e configuração.

**Como a documentação automatizada facilitou o processo:**

Antes da integração, qualquer alteração em um endpoint exigia atualizar manualmente um documento separado, e era comum esse documento ficar desatualizado em relação ao código real. Com o Swagger UI integrado, a especificação `openapi.yaml` passou a ser editada pelo próprio time de backend como parte do mesmo pull request que alterava o endpoint — a documentação deixou de ser uma tarefa extra e passou a ser parte do código.

**Resultado:** os times de mobile e web passaram a testar diretamente os endpoints pelo Swagger UI antes de implementar a integração no próprio aplicativo, reduzindo perguntas repetidas no chat da equipe e eliminando divergências entre o que estava documentado e o que a API realmente retornava.

---

## Exercício 4: Processo de revisão de documentação com Git e pull requests

**Passo 1 — Contribuição de um membro da equipe:**

```bash
git checkout -b docs/atualiza-guia-instalacao
# edição do arquivo docs/instalacao.md
git add docs/instalacao.md
git commit -m "Atualiza guia de instalação com novo passo de configuração do .env"
git push origin docs/atualiza-guia-instalacao
```

**Passo 2 — Abertura do pull request** no GitHub, da branch `docs/atualiza-guia-instalacao` para `main`, com uma descrição explicando o que foi alterado e por quê.

**Passo 3 — Revisão por outro membro da equipe:**

O revisor abre a aba "Files changed" do pull request, que exibe o `diff` exato entre a versão anterior e a nova versão do arquivo. Nessa etapa, o revisor pode:

- Aprovar diretamente, se o conteúdo estiver correto e claro;
- Deixar comentários em linhas específicas, apontando trechos que precisam de ajuste (por exemplo, um comando incorreto ou uma explicação pouco clara);
- Solicitar mudanças (`Request changes`), bloqueando o merge até que os ajustes sejam feitos.

**Passo 4 — Ajustes e nova revisão**, caso necessário:

```bash
# após ajustar o conteúdo conforme os comentários
git add docs/instalacao.md
git commit -m "Ajusta comando de configuração conforme revisão"
git push origin docs/atualiza-guia-instalacao
```

O pull request é atualizado automaticamente com o novo commit, e o revisor pode aprovar a versão corrigida.

**Passo 5 — Merge na branch principal**, finalizando a contribuição.

Esse processo aplica à documentação o mesmo rigor normalmente reservado à revisão de código, reduzindo a chance de informação tecnicamente incorreta ou mal escrita chegar até o usuário final sem que ninguém além do autor original tenha lido o conteúdo.

---

## Exercício 5: Documentação de API fictícia com OpenAPI e Swagger no MKDocs

**Sistema fictício:** API de reservas de salas de reunião.

**Especificação OpenAPI** (`docs/api/openapi.yaml`):

```yaml
openapi: 3.0.0
info:
  title: API de Reservas de Salas
  description: API para gerenciamento de reservas de salas de reunião
  version: 1.0.0
paths:
  /salas:
    get:
      tags:
        - Salas
      summary: Lista todas as salas disponíveis
      responses:
        '200':
          description: Lista retornada com sucesso
          content:
            application/json:
              example:
                - id: 1
                  nome: "Sala Azul"
                  capacidade: 8

  /reservas:
    post:
      tags:
        - Reservas
      summary: Cria uma nova reserva
      requestBody:
        content:
          application/json:
            example:
              sala_id: 1
              usuario: "joao@empresa.com"
              data_inicio: "2026-06-22T09:00:00"
              data_fim: "2026-06-22T10:00:00"
      responses:
        '201':
          description: Reserva criada com sucesso
          content:
            application/json:
              example:
                id: 101
                sala_id: 1
                status: "confirmada"
        '409':
          description: Conflito de horário com outra reserva existente
```

**Configuração no `mkdocs.yml`:**

```yaml
site_name: 'API de Reservas de Salas'

theme:
  name: 'material'

nav:
  - Home: index.md
  - API:
      - Swagger UI: api/swagger-ui/index.html
      - OpenAPI (YAML): api/openapi.yaml
```

**Geração e visualização:**

```bash
mkdocs build
mkdocs serve
```

Ao acessar o Swagger UI gerado, o endpoint `POST /reservas` exibe não apenas o exemplo de sucesso (`201`), mas também o código `409` para conflito de horário — um detalhe importante, já que ele documenta explicitamente uma regra de negócio (não é possível reservar a mesma sala em horários sobrepostos) sem que o desenvolvedor precise inferir esse comportamento testando a API manualmente.
