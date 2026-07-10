# Lista de Exercícios — Criação de Documentação com MKDocs

## Exercício 1: Estrutura de diretórios padrão de um projeto MKDocs

A estrutura mínima gerada por `mkdocs new` é:

```
meu-projeto/
    mkdocs.yml
    docs/
        index.md
```

E, conforme o projeto cresce em seções, ela tende a se organizar assim:

```
meu-projeto/
    mkdocs.yml
    docs/
        index.md
        introducao/
            inicio.md
        guia-do-usuario/
            instalacao.md
            configuracao.md
```

**Propósito de cada elemento:**

- **`mkdocs.yml`:** arquivo de configuração central do projeto. Define o nome do site (`site_name`), a descrição, o tema visual, os plugins ativos e a estrutura de navegação (`nav`). É equivalente ao "arquivo de build" da documentação — nada relacionado a conteúdo fica aqui, apenas a forma como o conteúdo será montado e exibido.

- **`docs/`:** diretório raiz que concentra todo o conteúdo escrito em Markdown. É a pasta que o MKDocs varre para gerar as páginas HTML.

- **`docs/index.md`:** página inicial do site, exibida quando alguém acessa a raiz da documentação (equivalente a um `index.html`).

- **Subdiretórios (`introducao/`, `guia-do-usuario/`):** servem para agrupar páginas por tema ou etapa do produto, evitando que o diretório `docs/` fique com dezenas de arquivos soltos sem hierarquia. Essa separação física geralmente acompanha a separação lógica feita depois no `nav`, dentro do `mkdocs.yml`.

Essa divisão reflete diretamente o conceito de **componentes lógicos** discutido em arquitetura de software: assim como um sistema separa funcionalidades em módulos coesos (pagamento, catálogo, autenticação), a documentação separa conteúdo em seções coesas (introdução, instalação, referência), facilitando manutenção e localização de informação.

---

## Exercício 2: Criar projeto MKDocs com página `sobre.md` e configurar navegação

**Criação do projeto:**

```bash
mkdocs new meu-projeto
cd meu-projeto
```

**Criação da nova página** dentro de `docs/`:

```markdown
<!-- docs/sobre.md -->
# Sobre o Projeto

Este projeto tem como objetivo demonstrar a criação de documentação técnica
utilizando o MKDocs, abordando configuração de tema, navegação e plugins.

## Equipe responsável

- Desenvolvimento: Equipe Técnica
- Documentação: Equipe de Conteúdo
```

**Configuração da navegação** no `mkdocs.yml`:

```yaml
site_name: 'Meu Projeto'
site_description: 'Documentação técnica do projeto'

theme:
  name: 'material'

nav:
  - Home: index.md
  - Sobre: sobre.md
```

**Validação local:**

```bash
mkdocs serve
```

Ao acessar `http://127.0.0.1:8000/`, a barra lateral passa a exibir dois itens — "Home" e "Sobre" — na ordem definida em `nav`, e não na ordem alfabética dos arquivos. Esse comportamento é a base para qualquer documentação maior: o `nav` desacopla a estrutura de pastas no disco da ordem de leitura apresentada ao visitante.

---

## Exercício 3: Personalização da paleta de cores do tema Material

A customização de cores acontece dentro da chave `theme`, sob `palette`, no `mkdocs.yml`:

```yaml
site_name: 'Meu Projeto'

theme:
  name: 'material'
  palette:
    primary: 'deep purple'
    accent: 'lime'
```

- **`primary`:** define a cor predominante do site (cabeçalho, barra de navegação, elementos de destaque estrutural).
- **`accent`:** define a cor usada em elementos interativos, como links e botões em estado de foco ou hover.

**Teste local:**

```bash
mkdocs serve
```

Ao recarregar `http://127.0.0.1:8000/` no navegador, o cabeçalho e a navegação devem refletir imediatamente a nova combinação de cores, sem necessidade de reiniciar o processo do `mkdocs serve` — o servidor de desenvolvimento observa alterações no `mkdocs.yml` e recompila a página automaticamente.

Esse tipo de personalização é relevante quando a documentação precisa seguir a identidade visual de uma empresa ou produto: trocar `primary` e `accent` para as cores da marca aproxima o site de documentação da experiência visual do próprio produto, reforçando a percepção de que ambos pertencem ao mesmo ecossistema.

---

## Exercício 4: Instalação e configuração do plugin de SEO

**Instalação via pip:**

```bash
pip install mkdocs-meta-descriptions-plugin
```

**Registro no `mkdocs.yml`:**

```yaml
site_name: 'Meu Projeto'

theme:
  name: 'material'

plugins:
  - search
  - meta-descriptions
```

**Por que isso ajuda na otimização para motores de busca:**

Motores de busca como o Google indexam páginas com base em diversos sinais, e um dos mais relevantes é a **meta description** — o resumo curto exibido abaixo do título nos resultados de busca. Sem esse plugin, cada página gerada pelo MKDocs não possui uma descrição própria, e o motor de busca tende a extrair um trecho aleatório do corpo do texto, o que reduz a taxa de cliques mesmo quando a página é relevante para a pesquisa feita.

O `meta-descriptions` automatiza a geração dessas descrições a partir do conteúdo de cada página Markdown, garantindo que toda página da documentação tenha um resumo coerente nos resultados de busca — algo que, em uma documentação extensa com dezenas de páginas, seria inviável escrever manualmente em cada uma.

**Exemplo prático de impacto:** uma documentação de API pública que aparece no Google com a descrição genérica de outra página, ou sem descrição alguma, perde competitividade frente a concorrentes que indexam corretamente. Esse tipo de ajuste é parte do trabalho conhecido como **SEO técnico**, que cuida da estrutura e dos metadados do site, distinto do SEO de conteúdo, que trata da escrita em si.

---

## Exercício 5: Pesquisa de outro plugin e exemplo de aplicação

**Plugin escolhido: `mkdocs-git-revision-date-localized-plugin`**

Esse plugin lê o histórico do Git e exibe automaticamente, no rodapé de cada página, a data da última modificação do arquivo correspondente.

**Instalação:**

```bash
pip install mkdocs-git-revision-date-localized-plugin
```

**Configuração no `mkdocs.yml`:**

```yaml
plugins:
  - search
  - git-revision-date-localized:
      type: date
      locale: pt-BR
```

**Como isso melhora a documentação:**

Um dos problemas centrais apontados desde o Módulo 01 é a desatualização silenciosa da documentação — o leitor não tem como saber se o que está lendo ainda corresponde à versão atual do sistema. Esse plugin resolve parte do problema ao expor, de forma automática e sem esforço manual, quando aquela página específica foi alterada por último.

**Exemplo de aplicação:** em uma documentação de API que descreve endpoints de pagamento, um desenvolvedor que está integrando o sistema consegue verificar, ao final da página, que o conteúdo foi atualizado há dois dias — e não há seis meses. Isso aumenta a confiança no material e evita que o time de suporte receba perguntas repetidas sobre se um endpoint específico já reflete a versão mais recente da API.

Diferente de uma data digitada manualmente no topo do arquivo, esse dado vem diretamente do commit no repositório, então não existe risco de alguém esquecer de atualizá-lo — a informação está sempre sincronizada com a realidade do código versionado.
