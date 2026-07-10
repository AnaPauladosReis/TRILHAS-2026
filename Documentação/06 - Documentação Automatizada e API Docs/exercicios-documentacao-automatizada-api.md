# Lista de Exercícios — Documentação Automatizada e API Docs

## Exercício 1: Vantagens da documentação automatizada de código

A documentação automatizada extrai conteúdo diretamente do código-fonte (docstrings, comentários estruturados ou especificações como OpenAPI), em vez de exigir que alguém escreva e mantenha um documento separado manualmente. Isso ataca diretamente a causa mais comum de desatualização da documentação, já discutida nos módulos anteriores: a distância entre onde o conhecimento é produzido (o código) e onde ele é registrado (um documento à parte).

**Benefícios práticos para uma equipe:**

- **Redução de erros:** como o conteúdo vem do próprio código, uma alteração na assinatura de uma função ou no contrato de um endpoint se reflete automaticamente na documentação após a próxima geração, eliminando a divergência entre o que está documentado e o que está implementado.

- **Economia de tempo:** o time não precisa redigir manualmente cada parâmetro, tipo de retorno ou exemplo de chamada — esse trabalho é feito uma única vez, na escrita do comentário ou da especificação, e reaproveitado automaticamente.

- **Manutenção simplificada:** a atualização da documentação passa a fazer parte do mesmo commit que altera o código, e não de uma tarefa separada que alguém precisa lembrar de fazer depois.

**Exemplo prático:** em uma equipe que mantém uma API REST com Swagger/OpenAPI, ao adicionar um novo parâmetro obrigatório em um endpoint, o próprio arquivo de especificação é atualizado junto com o código do endpoint. Times externos que consomem a API enxergam a mudança refletida na interface interativa do Swagger UI sem que ninguém precise abrir um documento à parte para atualizar a descrição daquele parâmetro.

---

## Exercício 2: Projeto MKDocs + Swagger para API fictícia de gerenciamento de usuários

**Estrutura de diretórios:**

```
gerenciamento-usuarios/
    mkdocs.yml
    docs/
        index.md
        api/
            openapi.yaml
            swagger-ui/
                index.html
                swagger-ui-bundle.js
                swagger-ui-standalone-preset.js
                swagger-ui.css
```

**Especificação OpenAPI** (`docs/api/openapi.yaml`):

```yaml
openapi: 3.0.0
info:
  title: API de Gerenciamento de Usuários
  description: API fictícia para cadastro e consulta de usuários
  version: 1.0.0
paths:
  /usuarios:
    get:
      tags:
        - Usuários
      summary: Lista todos os usuários
      responses:
        '200':
          description: Lista retornada com sucesso
          content:
            application/json:
              example:
                - id: 1
                  nome: "Ana Silva"
                  email: "ana@email.com"
    post:
      tags:
        - Usuários
      summary: Cadastra um novo usuário
      requestBody:
        content:
          application/json:
            example:
              nome: "Carlos Souza"
              email: "carlos@email.com"
      responses:
        '201':
          description: Usuário criado com sucesso
```

**Configuração no `mkdocs.yml`:**

```yaml
site_name: 'Documentação - Gerenciamento de Usuários'

theme:
  name: 'material'

nav:
  - Home: index.md
  - API:
      - Swagger UI: api/swagger-ui/index.html
      - OpenAPI (YAML): api/openapi.yaml
```

**Build e visualização:**

```bash
mkdocs build
mkdocs serve
```

Ao acessar `http://127.0.0.1:8000/api/swagger-ui/`, o Swagger UI carrega a especificação e exibe os dois endpoints (`GET /usuarios` e `POST /usuarios`) com botões para testar cada chamada diretamente do navegador.

---

## Exercício 3: API com endpoints de listar, criar e atualizar

```yaml
openapi: 3.0.0
info:
  title: API de Produtos
  description: API para gerenciamento de produtos de uma loja online
  version: 1.0.0
paths:
  /produtos:
    get:
      tags:
        - Produtos
      summary: Lista todos os produtos
      responses:
        '200':
          description: Lista retornada com sucesso
          content:
            application/json:
              example:
                - id: 1
                  nome: "Mouse sem fio"
                  preco: 89.90
    post:
      tags:
        - Produtos
      summary: Cadastra um novo produto
      requestBody:
        content:
          application/json:
            example:
              nome: "Teclado mecânico"
              preco: 259.90
      responses:
        '201':
          description: Produto criado com sucesso

  /produtos/{id}:
    put:
      tags:
        - Produtos
      summary: Atualiza um produto existente
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: integer
      requestBody:
        content:
          application/json:
            example:
              nome: "Teclado mecânico RGB"
              preco: 279.90
      responses:
        '200':
          description: Produto atualizado com sucesso
        '404':
          description: Produto não encontrado
```

**Geração e visualização:**

```bash
mkdocs build
mkdocs serve
```

Ao abrir o Swagger UI, os três endpoints aparecem agrupados sob a tag `Produtos`, cada um com seu próprio exemplo de corpo de requisição e os códigos de resposta esperados — incluindo o `404` no endpoint de atualização, que documenta explicitamente o comportamento de erro quando o `id` informado não existe.

---

## Exercício 4: Pesquisa sobre Sphinx e integração com MKDocs

O **Sphinx** é a ferramenta de documentação automatizada mais usada em projetos Python, gerando documentação a partir de *docstrings* — comentários estruturados escritos diretamente dentro das funções, classes e módulos do código.

**Exemplo de docstring que o Sphinx interpreta:**

```python
def calcular_desconto(preco, percentual):
    """
    Calcula o preço final de um produto após aplicar um desconto.

    :param preco: Valor original do produto.
    :param percentual: Percentual de desconto a ser aplicado.
    :return: Valor final com o desconto já aplicado.
    """
    return preco - (preco * percentual / 100)
```

O Sphinx lê essa docstring e gera automaticamente uma página HTML com a descrição da função, seus parâmetros e o valor de retorno — sem que ninguém precise escrever essa página manualmente.

**Como integrar ao MKDocs:**

A integração mais direta é feita com o plugin `mkdocstrings`, que traz a capacidade do Sphinx (leitura de docstrings) diretamente para dentro do fluxo do MKDocs, em vez de manter dois sites de documentação separados.

```bash
pip install mkdocstrings[python]
```

```yaml
plugins:
  - search
  - mkdocstrings
```

Dentro de uma página Markdown, basta referenciar o módulo desejado:

```markdown
# Referência da API

::: meu_pacote.calcular_desconto
```

O MKDocs renderiza automaticamente a documentação daquela função no mesmo tema visual do restante do site, unificando guias de uso escritos manualmente com referência técnica gerada a partir do código — sem depender de duas ferramentas publicando em lugares diferentes.

---

## Exercício 5: Adição do endpoint de exclusão de produto

Trecho adicionado ao arquivo `docs/api/openapi.yaml` da API de produtos:

```yaml
  /produtos/{id}:
    put:
      tags:
        - Produtos
      summary: Atualiza um produto existente
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: integer
      requestBody:
        content:
          application/json:
            example:
              nome: "Teclado mecânico RGB"
              preco: 279.90
      responses:
        '200':
          description: Produto atualizado com sucesso
        '404':
          description: Produto não encontrado

    delete:
      tags:
        - Produtos
      summary: Exclui um produto existente
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: integer
      responses:
        '204':
          description: Produto excluído com sucesso
        '404':
          description: Produto não encontrado
```

**Atualização automática da documentação:**

Como o Swagger UI lê o arquivo `openapi.yaml` diretamente ao carregar a página, basta salvar a alteração e rodar novamente:

```bash
mkdocs build
mkdocs serve
```

O novo método `DELETE` aparece automaticamente agrupado junto aos demais métodos do endpoint `/produtos/{id}` na interface do Swagger UI, sem que seja necessário editar nenhum arquivo HTML manualmente — a interface inteira é reconstruída a partir da especificação YAML, que é exatamente a vantagem central da documentação automatizada de API: alterar a especificação já é, por si só, atualizar a documentação.
