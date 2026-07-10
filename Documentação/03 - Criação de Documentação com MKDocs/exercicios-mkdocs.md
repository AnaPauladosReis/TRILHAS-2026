# Lista de Exercícios — MKDocs

## Exercício 1: O que é o MKDocs e suas vantagens

O MKDocs é um gerador de sites estáticos voltado especificamente para documentação técnica, que transforma arquivos Markdown em páginas HTML navegáveis, com barra lateral automática, servidor local para pré-visualização e exportação pronta para deploy.

A vantagem central em relação a outras ferramentas de documentação está na barreira de entrada. Editores de texto rico (como Word ou wikis tradicionais) misturam conteúdo e formatação dentro do mesmo arquivo, dificultando o versionamento. Já o MKDocs trata a documentação como **código**: o conteúdo fica em arquivos `.md` simples, versionáveis em Git, e a apresentação visual fica isolada no tema e no `mkdocs.yml`. Isso aproxima a prática de documentação do próprio fluxo de trabalho de desenvolvimento de software, no qual a "fonte da verdade" mora no repositório, junto ao código que ela descreve.

**Outras vantagens citadas no material:**
- **Curva de aprendizado baixa:** quem já escreve Markdown não precisa aprender HTML/CSS para publicar.
- **Temas como o "Material for MkDocs":** entregam uma interface profissional sem esforço de design.
- **Servidor local em tempo real:** permite revisar o resultado visual antes de publicar, reduzindo o ciclo entre escrever e validar.
- **Saída em HTML estático:** o site final não depende de banco de dados ou backend, podendo ser hospedado em qualquer servidor web ou serviço de páginas estáticas (como GitHub Pages).

Na prática de mercado, esse modelo é chamado de **"docs as code"** (documentação tratada como código): o mesmo pull request que altera uma funcionalidade pode atualizar a documentação correspondente, e ambos passam pela mesma revisão. Isso reduz diretamente o problema de desatualização apontado no Módulo 01 — quando a documentação vive fora do repositório, ela tende a ficar esquecida.

---

## Exercício 2: Instalação e criação do projeto "Documentação do Meu Projeto"

Sequência de comandos no terminal, conforme o fluxo apresentado no material:

```bash
# Verificar se o Python está instalado
python --version

# Instalar o MKDocs via pip
pip install mkdocs

# Criar o projeto
mkdocs new "documentacao-do-meu-projeto"
cd documentacao-do-meu-projeto
```

Após a criação, o diretório terá a estrutura padrão:
```
documentacao-do-meu-projeto/
    mkdocs.yml      # Arquivo de configuração
    docs/
        index.md    # Página inicial
```

Edição do `mkdocs.yml` para configurar nome do site e tema:

```yaml
site_name: 'Documentação do Meu Projeto'

theme:
  name: 'material'
```

Para validar a configuração, basta subir o servidor local:

```bash
mkdocs serve
```

E acessar `http://127.0.0.1:8000/` no navegador. Qualquer alteração salva nos arquivos `.md` é refletida automaticamente na página aberta, sem necessidade de reiniciar o servidor.

---

## Exercício 3: Documentação de exemplo com título, lista ordenada e bloco de código

Conteúdo do arquivo `docs/index.md`:

```markdown
# Guia de Instalação do Projeto

Este guia descreve os passos necessários para configurar o ambiente de
desenvolvimento do projeto.

## Passos de instalação

1. Clone o repositório do projeto.
2. Instale as dependências do ambiente.
3. Execute o servidor local para validar a instalação.

## Exemplo de execução

\`\`\`bash
git clone https://github.com/usuario/projeto.git
cd projeto
pip install -r requirements.txt
python app.py
\`\`\`
```

Para visualizar o resultado:

```bash
mkdocs serve
```

Ao acessar `http://127.0.0.1:8000/`, o título aparece formatado como cabeçalho principal, a lista numerada é renderizada com numeração automática, e o bloco de código exibe o destaque de sintaxe (*syntax highlighting*) referente à linguagem `bash` informada após as três crases.

---

## Exercício 4: Configuração de navegação personalizada no `mkdocs.yml`

Para que o MKDocs deixe de gerar a navegação automaticamente a partir da estrutura de pastas e passe a seguir uma ordem definida manualmente, utiliza-se a chave `nav`:

```yaml
site_name: 'Documentação Atualizada do Projeto'
site_description: 'Guia completo de uso e configuração do sistema'

theme:
  name: 'material'

nav:
  - Início: index.md
  - Guia de Instalação: instalacao.md
```

É necessário criar o arquivo correspondente à nova página dentro de `docs/`:

```markdown
# Guia de Instalação

## Pré-requisitos

- Python 3.10 ou superior
- Git instalado

## Etapas

1. Clone o repositório.
2. Instale as dependências com `pip install -r requirements.txt`.
3. Execute `mkdocs serve` para validar localmente.
```

Estrutura final do projeto:
```
meu-projeto/
    mkdocs.yml
    docs/
        index.md
        instalacao.md
```

Com essa alteração, a barra lateral passa a exibir "Início" e "Guia de Instalação" na ordem definida em `nav`, em vez de seguir a ordem alfabética padrão dos arquivos. Esse controle manual é especialmente relevante quando a documentação cresce e exige uma hierarquia lógica de leitura — por exemplo, separando documentação de instalação, de uso e de referência de API em seções distintas.

---

## Exercício 5: Como o Markdown facilita a criação de conteúdo

O Markdown resolve um problema prático da escrita técnica: formatar texto sem sair do teclado e sem depender de um editor visual complexo. A sintaxe usa caracteres comuns (`#`, `-`, `` ` ``, `[]()`) para representar elementos como títulos, listas e links, e qualquer ferramenta capaz de interpretar esses símbolos — como o MKDocs — transforma o texto puro em HTML estilizado.

**Três vantagens diretas:**

1. **Foco no conteúdo, não na formatação:** o autor escreve `# Título` em vez de abrir um menu e clicar em "Heading 1". Isso reduz a fricção entre ter uma ideia e registrá-la, e elimina inconsistências visuais comuns em editores WYSIWYG (estilos de título variando entre páginas, por exemplo).

2. **Versionamento e revisão como código:** por ser texto puro, um arquivo `.md` pode ser versionado em Git como qualquer arquivo de código-fonte. É possível visualizar exatamente o que mudou em um `diff`, abrir *pull requests* para revisar alterações na documentação e reverter uma mudança específica — algo praticamente inviável em um documento binário do Word.

3. **Portabilidade entre ferramentas:** o mesmo arquivo Markdown pode ser renderizado pelo MKDocs, pelo GitHub, por um editor de notas ou por outro gerador de documentação estática (como Docusaurus ou Hugo), sem qualquer conversão. Isso evita que a documentação fique presa a uma ferramenta proprietária específica.

Essa combinação — sintaxe leve mais compatibilidade com fluxos de versionamento — é o motivo pelo qual o Markdown se tornou o padrão de fato para documentação técnica em repositórios de código, do `README.md` de um projeto pequeno até bases de documentação completas geradas com MKDocs.
