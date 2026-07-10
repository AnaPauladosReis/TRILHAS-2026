# Lista de Exercícios — Versionamento e Deploy da Documentação

## Exercício 1: Importância do controle de versão (Git) na documentação técnica

Documentação técnica sofre o mesmo problema que código-fonte sem versionamento: perda de histórico, dificuldade de reverter erros e ausência de rastreabilidade sobre quem alterou o quê e por quê. O Git resolve isso ao tratar cada arquivo Markdown como qualquer outro arquivo versionável, registrando um histórico completo de commits.

Isso traz três ganhos práticos diretos:

- **Rastreabilidade:** cada commit registra a mudança específica feita na documentação, junto a uma mensagem explicando o motivo — por exemplo, `git commit -m "Adiciona uma documentação inicial"`. Isso permite reconstruir, meses depois, por que uma seção foi reescrita ou removida.

- **Reversão segura:** se uma atualização da documentação introduzir uma informação incorreta (um endpoint de API documentado errado, por exemplo), é possível reverter para o commit anterior sem perder o restante do histórico.

- **Colaboração sem conflito:** times distribuídos podem editar páginas diferentes da documentação simultaneamente, e o Git resolve a maior parte das divergências automaticamente via merge, algo inviável em um documento compartilhado em um único arquivo binário.

Esse ganho conecta-se diretamente à prática de **revisão colaborativa** descrita no material: ao usar pull requests para alterações na documentação, a equipe aplica o mesmo rigor de revisão de código à revisão de conteúdo, reduzindo a chance de informação técnica incorreta chegar ao usuário final.

---

## Exercício 2: Criação do repositório Git e push da documentação inicial

**Passo 1 — Criar o repositório no GitHub** (via interface web) e copiar a URL de clone SSH, no formato:

```
git@github.com:seu-usuario/minha-documentacao.git
```

**Passo 2 — Clonar o repositório localmente:**

```bash
git clone git@github.com:seu-usuario/minha-documentacao.git
cd minha-documentacao
```

**Passo 3 — Criar o projeto MKDocs dentro do repositório clonado:**

```bash
mkdocs new .
```

**Passo 4 — Versionar e enviar a documentação inicial:**

```bash
git add .
git commit -m "Adiciona uma documentação inicial"
git push
```

A partir desse ponto, toda alteração feita nos arquivos dentro de `docs/` ou no `mkdocs.yml` segue o mesmo fluxo: `git add`, `git commit` com uma mensagem descritiva, e `git push` para sincronizar com o repositório remoto. É esse ciclo recorrente que sustenta a atualização contínua mencionada na seção 1.4 do material — a documentação só permanece confiável se as mudanças forem commitadas com a mesma disciplina aplicada ao código.

---

## Exercício 3: Deploy no GitHub Pages com `mkdocs gh-deploy`

**Pré-requisito:** o repositório precisa estar público (ou o usuário precisa ter permissão para ativar o GitHub Pages nas configurações do repositório).

**Passo 1 — Build e deploy em um único comando:**

```bash
mkdocs gh-deploy
```

Esse comando executa internamente o `mkdocs build`, gerando a pasta `site/` com os arquivos HTML estáticos, e em seguida envia esse conteúdo para o branch `gh-pages` do repositório — o branch que o GitHub Pages utiliza como fonte de publicação.

**Passo 2 — Verificar o processo na aba Actions** do repositório no GitHub. O fluxo aparece dividido em etapas (`build`, `report-build-status`, `deploy`), cada uma com seu tempo de execução e status de sucesso ou falha.

**Passo 3 — Acessar a documentação publicada** na URL gerada automaticamente pelo GitHub Pages:

```
https://seu-usuario.github.io/minha-documentacao/
```

**Verificação:** ao abrir o link, a página inicial (`index.md`) deve carregar com o tema configurado no `mkdocs.yml`, e a navegação lateral deve refletir exatamente a estrutura definida em `nav`. Caso a página retorne erro 404, geralmente o problema está nas configurações de **Pages** do repositório (seção *Build and deployment*), que precisam apontar para o branch `gh-pages` e a pasta raiz (`/root`).

---

## Exercício 4: Deploy contínuo com GitHub Actions

**Passo 1 — Criar o arquivo de workflow** em `.github/workflows/deploy.yml`, na raiz do repositório.

**Passo 2 — Estrutura mínima do workflow**, baseada no padrão de build-e-deploy descrito no material:

```yaml
name: deploy.yml

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Configurar Python
        uses: actions/setup-python@v5
        with:
          python-version: '3.x'

      - name: Instalar dependências
        run: pip install mkdocs mkdocs-material

      - name: Configuração e Build
        run: mkdocs gh-deploy --force
```

**Passo 3 — Commitar e enviar o workflow:**

```bash
git add .github/workflows/deploy.yml
git commit -m "Configura deploy contínuo via GitHub Actions"
git push
```

**Teste:** após o push, a aba **Actions** do repositório deve disparar automaticamente a execução do workflow (`on: push` no branch `main`). Qualquer alteração subsequente em arquivos de `docs/` ou no `mkdocs.yml`, seguida de um novo push para `main`, repete esse processo sem que seja necessário rodar `mkdocs build` ou `mkdocs gh-deploy` manualmente.

Esse fluxo elimina a etapa manual mencionada no material e aproxima a publicação da documentação dos princípios de **CI/CD**: cada commit no branch principal já carrega, embutida, a garantia de que a versão publicada está sincronizada com o conteúdo mais recente do repositório.

---

## Exercício 5: Organização de múltiplas versões da documentação

Quando um software mantém versões diferentes em produção simultaneamente (por exemplo, `v1` ainda usada por clientes antigos e `v2` já em uso pelos novos), publicar apenas a versão mais recente da documentação quebra a experiência de quem ainda depende da versão anterior — um endpoint de API documentado na `v2` pode simplesmente não existir na `v1` que o cliente está consumindo.

**Solução: plugin `mike`** (ferramenta de versionamento mantida pela comunidade MkDocs, citada no material como `mkdocs-versioning` em termos gerais de funcionalidade).

**Instalação:**

```bash
pip install mike
```

**Publicação de uma versão específica**, em vez do `mkdocs gh-deploy` tradicional:

```bash
mike deploy --push --update-aliases 2.0 latest
```

Esse comando publica a documentação atual como versão `2.0` e marca essa publicação também com o alias `latest`, que pode ser usado como atalho permanente para "a versão mais recente", sem que o usuário precise saber o número exato.

**Publicação de uma versão antiga, mantendo-a acessível:**

```bash
mike deploy --push 1.0
```

**Definição da versão padrão exibida ao acessar a raiz do site:**

```bash
mike set-default --push latest
```

**Resultado para o usuário:** o `mike` injeta automaticamente um seletor de versões no tema (compatível com o Material for MkDocs), exibido no topo da página, permitindo alternar entre `1.0`, `2.0` e `latest` sem sair do site. Internamente, cada versão fica publicada em um subdiretório próprio dentro do branch `gh-pages` (por exemplo, `/1.0/`, `/2.0/`), e o `mike` apenas organiza a navegação entre esses subdiretórios.

**Exemplo prático de uso:** uma biblioteca de código aberto que lança uma versão `3.0` com mudanças incompatíveis (*breaking changes*) pode manter a documentação da `2.x` publicada e acessível, evitando que desenvolvedores que ainda não migraram fiquem sem referência — situação comum em pacotes amplamente adotados, em que a atualização da base de usuários nunca é instantânea.
