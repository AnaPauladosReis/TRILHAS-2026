# 📘 Trilha de Empreendedorismo — Módulo 08
## Lista de Exercícios de Fixação: Gestão de Projetos e Metodologias Ágeis

---

## Questão 1 — Diferenças entre SCRUM e Kanban: quando usar cada metodologia

### Análise Comparativa

O Módulo 08 descreve o SCRUM como focado em "entrega incremental de funcionalidades" por meio de ciclos (sprints), enquanto o Kanban foca na "visualização do fluxo de trabalho" de forma contínua. Mas as diferenças vão além da estrutura superficial:

| Dimensão | SCRUM | Kanban |
|---|---|---|
| **Cadência** | Sprints fixos (2-4 semanas) com início, meio e fim definidos | Fluxo contínuo — sem sprints; as tarefas entram e saem conforme a capacidade |
| **Planejamento** | Sprint Planning obrigatória antes de cada ciclo | Planejamento sob demanda — novas tarefas entram no backlog a qualquer momento |
| **Papéis** | Product Owner, Scrum Master, Time de Desenvolvimento | Não define papéis formais — qualquer pessoa pode pegar qualquer tarefa disponível |
| **Entregáveis** | Incremento de software funcional ao final de cada sprint | Entrega contínua conforme as tarefas são concluídas |
| **Mudança de requisitos** | Protegida dentro da sprint — mudanças na próxima | Aceita a qualquer momento — ideal para ambientes de alta variação |
| **Métricas centrais** | Velocity (pontos por sprint), burndown chart | Lead time, cycle time, throughput, WIP (Work In Progress) |
| **Reuniões formais** | Daily, Planning, Review, Retrospectiva | Nenhuma obrigatória — reuniões opcionais conforme necessidade |
| **Limite de WIP** | Implícito no tamanho da sprint | Explícito e central — número máximo de itens por coluna |

### Quando Usar Cada Metodologia

**SCRUM é mais adequado quando:**
- O projeto tem escopo razoavelmente definido, mas que evolui iterativamente (ex.: desenvolvimento de um novo produto digital).
- A equipe precisa de estrutura e cerimônias para manter foco e alinhamento — especialmente times iniciantes em metodologias ágeis.
- As entregas precisam ser previsíveis para stakeholders externos (investidores, clientes que aguardam funcionalidades específicas).
- O projeto tem uma visão de prazo total (ex.: lançar v1.0 em 3 meses).

**Kanban é mais adequado quando:**
- O trabalho é predominantemente de manutenção, suporte ou operação — onde novas demandas chegam imprevisível e continuamente.
- A equipe é pequena e madura, capaz de autogerenciar seu fluxo sem cerimônias formais.
- O gargalo está na visualização e no fluxo — mais do que no planejamento de escopo.
- A prioridade é a entrega mais rápida possível de cada item individualmente (tempo de ciclo), não a entrega de um conjunto de features numa data.

**Exemplo prático:**
Uma startup de e-commerce usa **SCRUM** para desenvolver novas funcionalidades do app (sprints de 2 semanas, planejamento de produto). O mesmo time usa **Kanban** para gerenciar bugs e tickets de suporte que chegam continuamente dos usuários — limitando WIP em 3 tickets simultâneos para evitar sobrecarga.

Gene Kim, em *The Unicorn Project*, ilustra exatamente esse dilema ao descrever a equipe de Maxine: quando trabalhavam em inovação (Unicorn Project), precisavam de foco e sprints estruturados; quando em operações (Data Hub), o fluxo contínuo de incidentes e correções exigia uma abordagem Kanban.

---

## Questão 2 — Responsabilidades do Product Owner no SCRUM e sua importância

### Definição e Papel Central

O Módulo 08 define o **Product Owner (PO)** como a pessoa que "define as prioridades e garante que a equipe está trabalhando no que é mais importante para o projeto." Mas a literatura especializada aprofunda significativamente esse papel.

Em *The Unicorn Project*, Gene Kim ilustra o custo de um PO mal posicionado: o Product Manager do Data Hub estava tão sobrecarregado com reuniões, apresentações para executivos e negociações políticas que "responder às perguntas dos times de tecnologia" estava no final da sua lista de prioridades — gerando um gargalo que bloqueava todo o desenvolvimento. A diretora Maggie precisou intervir e reposicionar fisicamente o PO ao lado da equipe de engenharia para desbloquear o fluxo.

### Responsabilidades Detalhadas do Product Owner

**1. Gestão e Priorização do Backlog:**
O PO é dono do *Product Backlog* — a lista ordenada de tudo que o sistema deve fazer. Sua responsabilidade é garantir que os itens mais valiosos para o negócio estejam sempre no topo. Priorizar é escolher o que *não* fazer agora — tão importante quanto escolher o que fazer.

**2. Definição de Critérios de Aceite:**
Para cada User Story (história de usuário), o PO define os critérios de aceite: as condições específicas e verificáveis que determinam quando uma funcionalidade está "pronta". Sem critérios claros, o time não sabe quando pode marcar uma tarefa como concluída.

**3. Representação dos Stakeholders:**
O PO é a voz do cliente e dos stakeholders dentro da equipe — não o porta-voz da equipe para os stakeholders. Essa distinção é fundamental: o PO toma decisões de produto com autonomia, sem precisar escalar cada decisão para a diretoria.

**4. Refinamento Contínuo do Backlog (*Backlog Grooming*):**
Semanalmente, o PO trabalha com o time para detalhar, estimar e ordenar as histórias do backlog — garantindo que a Sprint Planning seja produtiva e não consuma tempo detalhando histórias que deveriam já estar prontas.

**5. Participação nas Cerimônias:**
O PO participa da Sprint Review (aceita ou rejeita as entregas com base nos critérios de aceite), da Sprint Planning (negocia o escopo com o time) e está disponível durante a sprint para responder dúvidas rapidamente.

### Por Que o Papel é Crítico

O PO é o "gargalo de decisão" do produto. Um PO ausente, indeciso ou sobrecarregado atrasa o time inteiro. Kim documenta que na Parts Unlimited, apenas 2,5% do tempo era gasto realmente desenvolvendo features — e grande parte do restante era espera por decisões de produto. Um bom PO elimina esse desperdício.

---

## Questão 3 — Como a programação em par (XP) melhora a qualidade do código

### O Que é e Por Que Funciona

O Módulo 08 define a **programação em par** como dois desenvolvedores trabalhando juntos no mesmo código, "aumentando a qualidade." Mas o mecanismo pelo qual isso acontece é mais profundo do que simplesmente "duas pessoas revisando."

A programação em par combina dois papéis simultâneos:
- **Driver (Piloto):** escreve o código ativamente.
- **Navigator (Co-piloto):** observa, pensa estrategicamente, antecipa problemas, sugere alternativas e faz perguntas em tempo real.

Essa divisão cria um ciclo de revisão *contínua* e *contextualizada* — muito mais eficaz do que uma revisão de código posterior, quando o contexto já foi esquecido.

### Como Melhora a Qualidade na Prática

**1. Detecção imediata de bugs:**
O Navigator detecta erros enquanto o Driver ainda está na mesma linha de raciocínio. O custo de corrigir um bug durante a programação em par é ordens de magnitude menor do que corrigir em produção. Gene Kim ilustra isso em *The Unicorn Project* quando Maxine resolve um race condition complexo em par com Tom: o segundo olhar de Tom questiona cada passo, confirmando a solução antes do commit.

**2. Disseminação de conhecimento:**
Não existe "conhecimento do fulano" — todo o código é conhecido por pelo menos dois desenvolvedores. Isso elimina o *bus factor* (o risco de uma parte do sistema virar "caixa preta" se um desenvolvedor sair da empresa).

**3. Refatoração corajosa:**
Com um co-piloto, o desenvolvedor tem mais confiança para refatorar código legado complexo — sabendo que um segundo julgamento está validando cada mudança. Sem par, a tendência é evitar tocar em código que funciona mas é difícil de entender.

**4. Redução de distrações:**
Trabalhar em par cria um compromisso social que reduz interrupções e distrações (checar e-mail, redes sociais). O estado de *flow* é mais facilmente atingido e mantido.

### Exemplo Prático: Quando a Programação em Par é Especialmente Benéfica

**Cenário — Integração com API de Pagamento:**

Um desenvolvedor júnior (Mateus) está implementando a integração com a API do PagSeguro pela primeira vez. Sem par, provavelmente gastaria horas navegando na documentação, cometendo erros em autenticação e testando manualmente cada endpoint.

Com um desenvolvedor sênior (Ana) como Navigator:
- Ana indica os padrões de autenticação OAuth antes de Mateus buscar na documentação.
- Quando Mateus escreve o tratamento de exceções, Ana questiona: "E se o timeout for 0? E se a resposta vier com encoding diferente?" — antecipando casos de borda.
- O resultado: integração implementada em 3 horas em vez de 2 dias, com cobertura de testes completa e Mateus aprendendo padrões que usará em todos os projetos futuros.

> Esse exemplo ilustra o **Terceiro Ideal** de Gene Kim em *The Unicorn Project*: **Melhoria do Trabalho Diário** — investir em melhorar a forma de trabalhar (programação em par, CI/CD, testes) eleva permanentemente a produtividade de toda a equipe.

---

## Questão 4 — Fases do ciclo de vida de um projeto de software com exemplos práticos

### Sistema de Referência: *RotaJá* — Gestão de Entregas para Pequenos Comércios

O Módulo 08 define 7 fases no ciclo de vida de projetos de software. Veja cada uma aplicada ao sistema fictício *RotaJá* (introduzido no Módulo 04):

---

**Fase 1 — Planejamento**
*Definir objetivos, escopo e recursos necessários.*

Para o RotaJá: levantamento dos objetivos de negócio (reduzir extravios em 70%, substituir controle por WhatsApp), definição do orçamento (R$ 80.000), cronograma (4 meses até MVP), composição da equipe (2 desenvolvedores, 1 designer UX, 1 PO). Criação do Product Backlog inicial e do roadmap de alto nível.

---

**Fase 2 — Análise de Requisitos**
*Levantar necessidades do cliente e transformá-las em especificações técnicas.*

Para o RotaJá: entrevistas com 15 lojistas de Joinville/SC. Descobertas: o lojista quer saber onde o entregador está em tempo real; o motoboy precisa receber a rota pelo celular sem precisar ligar para a loja; o cliente final quer confirmação de entrega. Transformadas em User Stories: "Como lojista, quero ver no mapa a posição do entregador em tempo real para saber quando o pedido chegará ao cliente."

---

**Fase 3 — Design**
*Projetar arquitetura, interfaces e interações entre componentes.*

Para o RotaJá: wireframes no Figma das 3 telas principais (dashboard do lojista, app do motoboy, tela de confirmação do cliente). Definição da arquitetura: backend em Node.js + PostgreSQL, mobile em React Native (iOS e Android), comunicação via WebSocket para rastreamento em tempo real. Definição das APIs de integração com Google Maps.

---

**Fase 4 — Desenvolvimento**
*Escrever código, implementar funcionalidades e integrar componentes.*

Para o RotaJá: sprints de 2 semanas no SCRUM. Sprint 1: autenticação e cadastro de lojistas. Sprint 2: criação e envio de ordens de entrega. Sprint 3: rastreamento GPS em tempo real. Sprint 4: confirmação por foto e histórico. Uso de CI/CD desde a Sprint 1 para evitar integração manual.

---

**Fase 5 — Testes**
*Verificar se o software funciona conforme especificado.*

Para o RotaJá: testes unitários para cada serviço do backend (cobertura mínima de 80%); testes de integração para o fluxo completo lojista→motoboy→cliente; testes de carga simulando 50 entregas simultâneas; testes de usabilidade com 5 lojistas reais usando o app pela primeira vez (sem orientação).

Gene Kim, em *The Unicorn Project*, ilustra o impacto de testes inadequados quando a equipe do Data Hub passa semanas em testes manuais que poderiam ser automatizados: "Maxine fica pensando em quantos desses ótimos testes poderiam ser automatizados. Isso libertaria os times de QA de trabalho tedioso, demorado e propenso a erros."

---

**Fase 6 — Entrega e Implantação**
*Instalar o software no ambiente de produção e entregar ao cliente.*

Para o RotaJá: deploy automatizado na AWS via pipeline CI/CD. Onboarding dos primeiros 10 clientes-piloto com treinamento de 30 minutos. Monitoramento dos primeiros 7 dias com alerta imediato para qualquer erro em produção via Sentry/Datadog.

---

**Fase 7 — Manutenção**
*Corrigir bugs, atualizar funcionalidades e oferecer suporte contínuo.*

Para o RotaJá: ciclos mensais de atualização com as features mais solicitadas pelos usuários. SLA de suporte: bugs críticos corrigidos em 4 horas; bugs não-críticos em 48 horas. Monitoramento contínuo de uptime, performance e satisfação (NPS medido mensalmente).

---

## Questão 5 — Quadro Kanban para projeto de desenvolvimento de aplicativo móvel

### Projeto: *MedLink* — App de Telemedicina para Pacientes Crônicos

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    KANBAN — MedLink App (Sprint Atual)                       │
│                         WIP Limit: máx. 3 por coluna                        │
├───────────────────────┬────────────────────────┬────────────────────────────┤
│      📋 A FAZER       │    🔄 EM PROGRESSO     │       ✅ CONCLUÍDO         │
│      (Backlog)        │    (WIP: 3/3)          │                            │
├───────────────────────┼────────────────────────┼────────────────────────────┤
│                       │                        │                            │
│ 6. Tela de histórico  │ 3. Integração com      │ 1. Configuração do         │
│    de consultas       │    câmera para          │    ambiente de             │
│    (prioridade: alta) │    videochamada         │    desenvolvimento         │
│    Estimativa: 5 dias │    Dev: Mateus          │    (React Native + Expo)   │
│                       │    Prazo: 22/05         │    ✓ Testes passando       │
│                       │                        │                            │
│ 7. Notificações push  │ 4. Tela de login        │ 2. Wireframes aprovados    │
│    de lembretes de    │    com autenticação     │    pelo cliente            │
│    medicamentos       │    biométrica           │    (Figma — todas as       │
│    Estimativa: 3 dias │    Dev: Ana + Lucas     │    telas principais)       │
│                       │    Prazo: 23/05         │    ✓ Aceite do PO          │
│                       │                        │                            │
│ 8. Integração com     │ 5. Dashboard de        │                            │
│    planos de saúde    │    sinais vitais do    │                            │
│    para cobrança      │    paciente            │                            │
│    Estimativa: 8 dias │    Dev: Carla           │                            │
│                       │    Prazo: 24/05         │                            │
│                       │                        │                            │
│ 9. Relatório de       │                        │                            │
│    prescrições em PDF │                        │                            │
│    Estimativa: 2 dias │                        │                            │
│                       │                        │                            │
│ 10. Modo offline para │                        │                            │
│    áreas sem internet │                        │                            │
│    Estimativa: 6 dias │                        │                            │
└───────────────────────┴────────────────────────┴────────────────────────────┘

Legenda:
🔴 Bloqueado  |  🟡 Em revisão  |  🟢 Pronto para deploy  |  WIP = Work In Progress
```

**Observações sobre a aplicação do Kanban:**

- O limite de **WIP 3/3 em "Em Progresso"** está no máximo — nenhuma nova tarefa deve entrar nessa coluna até que uma seja movida para "Concluído".
- As tarefas 3, 4 e 5 têm responsáveis designados e prazo visível — criando *accountability* sem necessidade de reunião de status.
- O Kanban revela instantaneamente o gargalo: se "Em Progresso" sempre estiver cheia enquanto "Concluído" cresce lentamente, o problema está na execução; se "A Fazer" cresce mais rápido que "Concluído", o problema está na capacidade do time.

---

## Questão 6 — Como a integração contínua (CI) melhora o fluxo de trabalho ágil

### Definição e Contexto

O Módulo 08 define a **Integração Contínua** como prática que "contribui para a organização e previsibilidade do desenvolvimento, permitindo que alterações no sistema sejam validadas de forma frequente."

Gene Kim demonstra em *The Unicorn Project* o impacto transformador da CI através da cena em que Adam e Shannon implementam integração contínua para o Data Hub — um sistema que todos achavam "arcaico e desatualizado":

> *"Maxine reconhece a ferramenta de CI imediatamente. Todo mundo acha que o Data Hub é tão arcaico e atrasado, e no entanto agora está rodando sob integração contínua. Eles agora têm práticas técnicas melhores que a maioria do Phoenix."*

A conquista não foi tecnológica — foi cultural e processual. A CI transformou um sistema legado em um pipeline moderno de entrega, sem reescrever o produto.

### Como a CI Funciona na Prática

**Pipeline de CI típico (automatizado a cada commit):**

```
Desenvolvedor faz commit
         ↓
    [1] Build automatizado
    (compila o código, verifica dependências)
         ↓
    [2] Testes unitários
    (executa centenas de testes em segundos)
         ↓
    [3] Testes de integração
    (verifica comunicação entre serviços)
         ↓
    [4] Análise estática de código
    (SonarQube, ESLint — detecta bad smells e vulnerabilidades)
         ↓
    [5] Cobertura de testes
    (bloqueia deploy se cobertura cair abaixo de 80%)
         ↓
    [6] Notificação: ✅ aprovado ou ❌ falhou
    (Slack, e-mail, painel visível para o time)
```

### Exemplo Prático: CI no RotaJá

Sem CI: um desenvolvedor passa 3 dias implementando o módulo de rastreamento GPS. Ao fazer merge com o trabalho do colega (que alterou a autenticação), descobrem que as mudanças são incompatíveis. Levam 2 dias para resolver o conflito — 5 dias de trabalho desperdiçado.

Com CI: a cada commit (várias vezes ao dia), o pipeline executa automaticamente. A incompatibilidade é detectada em minutos após o primeiro commit problemático — o desenvolvedor ainda tem contexto fresco para resolver em 30 minutos.

Esse é o **Segundo Ideal** de Kim: **Foco, Fluxo e Alegria** — o desenvolvedor trabalha em funcionalidades que geram valor, com feedback rápido que permite corrigir erros imediatamente, sem os longos períodos de incerteza que drenam a energia e a motivação do time.

Segundo Forsgren, Humble e Kim em *Accelerate* (referenciado por Kim no *The Unicorn Project*): "O tempo de deployment, a frequência de deployment e o tempo para resolver problemas são preditivos de desempenho de entrega de software, desempenho operacional e desempenho organizacional — e se correlacionam com burnout e engajamento de funcionários."

---

## Questão 7 — Como testes automatizados contribuem para o controle de qualidade

### O Custo do Bug em Diferentes Fases

O controle de qualidade via testes automatizados pode ser entendido através de uma curva de custo: quanto mais tarde um bug é encontrado, mais caro ele é para corrigir.

| Fase de Detecção | Custo Relativo |
|---|---|
| Durante desenvolvimento (testes unitários) | 1x |
| Na revisão de código | 5x |
| Em testes de integração | 10x |
| Em QA manual (pré-produção) | 25x |
| Em produção (usuário reporta) | 100x |

*Fonte: IBM Systems Sciences Institute, referenciado amplamente na literatura de qualidade de software.*

### Tipos de Testes Automatizados e Seus Papéis

**1. Testes Unitários:**
Testam a menor unidade de código (uma função, um método) isoladamente. Executam em milissegundos — um projeto com 1.000 testes unitários roda em menos de 1 minuto. São a primeira linha de defesa contra regressões.

Gene Kim ilustra isso em *The Unicorn Project* quando Maxine resolve o race condition de Tom: ela cria um teste unitário que reproduz o problema 100% das vezes, depois escreve o código que faz o teste passar. Isso é **TDD (Test-Driven Development)** — escrever o teste antes do código — uma prática do XP que garante que todo código seja testável desde o início.

**2. Testes de Integração:**
Verificam a comunicação entre componentes — por exemplo, se a API do RotaJá responde corretamente quando o banco de dados está lento. Mais lentos que os unitários, mas cobrem cenários que os testes isolados não podem.

**3. Testes End-to-End (E2E):**
Simulam o comportamento real do usuário — abrindo o app, fazendo login, criando uma entrega, confirmando via foto. São os mais lentos (minutos) e os mais frágeis (qualquer mudança de UI pode quebrá-los), mas testam o fluxo completo como o usuário experimenta.

**4. Testes de Performance/Carga:**
Verificam como o sistema se comporta sob stress — por exemplo, se o RotaJá suporta 500 entregas simultâneas sem degradar o rastreamento GPS. Essenciais antes de lançamentos de marketing que gerem picos de uso.

### Por Que Testes Automatizados São Especialmente Importantes em Startups

Em *The Unicorn Project*, Maxine fica perturbada ao ver a equipe de QA da Parts Unlimited executando testes manualmente a partir de documentos Word — repetindo os mesmos passos dezenas de vezes, testando cada field de cada formulário com valores absurdos: *"Maxine fica pensando em quantos desses ótimos testes poderiam ser automatizados. Isso libertaria os times de QA de trabalho tedioso, demorado e propenso a erros, e liberaria seu gênio para encontrar mais formas de quebrar o código."*

Para startups com equipes pequenas, testes automatizados são multiplicadores de força: um time de 3 desenvolvedores com 90% de cobertura de testes entrega com mais confiança do que um time de 10 sem testes — porque cada mudança é validada automaticamente, sem depender de QA manual para cada release.

---

## Questão 8 — Simulação de Sprint SCRUM: módulo de login

### Sprint Planning — Módulo de Login do Sistema *RotaJá*

**Sprint Goal (Objetivo da Sprint):**
> *"Ao final desta sprint, o lojista conseguirá criar uma conta, fazer login com e-mail/senha e recuperar sua senha por e-mail — com segurança adequada e testes automatizados cobrindo todos os fluxos críticos."*

**Duração:** 2 semanas (10 dias úteis)
**Time:** 2 desenvolvedores (Dev A — back-end; Dev B — front-end/mobile) + 1 PO

---

### Backlog da Sprint (User Stories e Tarefas)

**US-01 — Cadastro de Lojista**
*"Como novo lojista, quero criar uma conta com meu e-mail e senha para acessar o sistema."*

| Tarefa | Responsável | Estimativa |
|---|---|---|
| Criar endpoint POST /auth/register (validação, hash de senha) | Dev A | 4h |
| Criar tela de cadastro mobile (campos, validação, UX) | Dev B | 6h |
| Enviar e-mail de confirmação de conta (SendGrid) | Dev A | 3h |
| Testes unitários do endpoint (happy path + erros) | Dev A | 2h |
| Testes de UI da tela de cadastro | Dev B | 2h |
| **Subtotal US-01** | | **17h** |

---

**US-02 — Login com E-mail e Senha**
*"Como lojista cadastrado, quero fazer login com meu e-mail e senha para acessar o painel."*

| Tarefa | Responsável | Estimativa |
|---|---|---|
| Criar endpoint POST /auth/login (JWT + refresh token) | Dev A | 5h |
| Implementar armazenamento seguro do token no app | Dev B | 3h |
| Criar tela de login mobile (campos, feedback de erro, loading) | Dev B | 5h |
| Testes unitários (login com credenciais válidas, inválidas, conta não ativada) | Dev A | 3h |
| **Subtotal US-02** | | **16h** |

---

**US-03 — Recuperação de Senha**
*"Como lojista que esqueceu sua senha, quero receber um e-mail com link para redefinição."*

| Tarefa | Responsável | Estimativa |
|---|---|---|
| Endpoint POST /auth/forgot-password (geração de token temporário) | Dev A | 3h |
| Endpoint POST /auth/reset-password (validação do token, update da senha) | Dev A | 3h |
| Telas de recuperação e redefinição mobile | Dev B | 5h |
| Template de e-mail HTML responsivo | Dev B | 2h |
| Testes dos fluxos de recuperação | Dev A | 2h |
| **Subtotal US-03** | | **15h** |

---

**Buffer e Qualidade (10% do total)**
| Item | Estimativa |
|---|---|
| Code review entre Dev A e Dev B | 4h |
| Ajustes de feedback do PO (Sprint Review) | 2h |
| Documentação técnica da API (Swagger) | 2h |
| **Subtotal Buffer** | **8h** |

---

### Resumo da Sprint

| Métrica | Valor |
|---|---|
| Total de horas estimadas | 56h |
| Capacidade do time (2 devs × 10 dias × 4h faturáveis/dia) | 80h |
| Buffer disponível | 24h (para imprevistos) |
| Velocidade estimada em Story Points | 24 pontos |

**Daily Scrum (15 min/dia):**
- O que fiz ontem? | O que farei hoje? | Há impedimentos?
- Qualquer dependência entre Dev A (back-end) e Dev B (front-end) é identificada e resolvida no mesmo dia — evitando bloqueios.

**Sprint Review (último dia):**
- Demonstração ao vivo dos 3 fluxos (cadastro, login, recuperação) para o PO e stakeholders.
- PO aceita ou solicita ajustes com base nos critérios de aceite definidos na Planning.

**Retrospectiva:**
- O que foi bem? | O que poderia melhorar? | O que faremos diferente na próxima sprint?

---

## Questão 9 — Ferramenta de integração contínua: GitHub Actions

### O que é o GitHub Actions

O **GitHub Actions** é a plataforma de CI/CD integrada ao GitHub — o repositório de código mais utilizado do mundo. Lançado em 2019, tornou-se rapidamente uma das ferramentas de CI mais adotadas por startups e empresas de todos os tamanhos, justamente por estar embutido no mesmo ambiente onde o código é hospedado.

### Por Que Escolher o GitHub Actions

- **Zero configuração de infraestrutura:** não é necessário manter um servidor de CI próprio (Jenkins) ou pagar por uma plataforma externa (CircleCI, Travis CI). Está disponível no mesmo plano GitHub gratuito para repositórios públicos.
- **YAML como linguagem de configuração:** os pipelines são definidos em arquivos `.yml` versionados no próprio repositório — o pipeline é código, não configuração externa.
- **Marketplace de Actions:** mais de 20.000 ações prontas para usar — deploy para AWS, notificação no Slack, cobertura de testes, análise de segurança, etc.

### Como Implementar no Projeto RotaJá

**Arquivo: `.github/workflows/ci.yml`**

```yaml
name: CI — RotaJá Backend

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-test:
    runs-on: ubuntu-latest

    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_PASSWORD: postgres
        options: >-
          --health-cmd pg_isready
          --health-interval 10s

    steps:
      - name: Checkout do código
        uses: actions/checkout@v4

      - name: Configurar Node.js 20
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Instalar dependências
        run: npm ci

      - name: Executar testes unitários
        run: npm test -- --coverage
        env:
          DATABASE_URL: postgresql://postgres:postgres@localhost/rotaja_test

      - name: Verificar cobertura mínima (80%)
        run: npm run coverage:check

      - name: Análise de qualidade (ESLint)
        run: npm run lint

      - name: Notificar Slack em caso de falha
        if: failure()
        uses: rtCamp/action-slack-notify@v2
        env:
          SLACK_WEBHOOK: ${{ secrets.SLACK_WEBHOOK }}
          SLACK_MESSAGE: '❌ CI falhou no RotaJá!'
```

**Como isso funciona na prática:**
A cada `git push` ou Pull Request, o GitHub Actions automaticamente executa este pipeline. Se qualquer etapa falhar — compilação, testes, lint — o merge é bloqueado e o time é notificado. Nenhum código quebrado entra na branch principal.

**Resultado para o time:** em vez de "funciona na minha máquina", o pipeline garante que o código funciona em um ambiente limpo e padronizado — eliminando a categoria inteira de bugs causados por diferenças de configuração local.

---

## Questão 10 — Como o ciclo de vida do projeto se adapta às metodologias ágeis

### O Ciclo Tradicional vs. o Ciclo Ágil

O ciclo de vida tradicional (Waterfall/Cascata) executa as 7 fases do Módulo 08 **sequencialmente** — cada fase é concluída antes da próxima começar. O ciclo ágil as executa **iterativamente** — todas as fases ocorrem em miniatura dentro de cada sprint.

### Adaptação das 7 Fases ao SCRUM e XP

**Planejamento → Sprint Planning + Release Planning**
No SCRUM, o planejamento não acontece uma vez — acontece a cada 2 semanas. O Release Planning define o roadmap de alto nível (quais funcionalidades em quais sprints), enquanto a Sprint Planning define o detalhe da próxima sprint. Isso elimina o "Big Design Up Front" do Waterfall, onde meses de planejamento frequentemente resultam em specs que não refletem a realidade do cliente.

**Análise de Requisitos → Refinamento Contínuo do Backlog**
No ambiente ágil, os requisitos não são levantados uma única vez — evoluem continuamente. O Product Owner refina o backlog semanalmente, adicionando detalhes às histórias à medida que o produto ganha forma e os usuários fornecem feedback. Isso elimina o problema clássico do Waterfall de specs obsoletos: o que foi especificado em janeiro raramente reflete as necessidades de julho.

**Design → Design Emergente (XP)**
O XP rejeita o design monolítico upfront. Em vez disso, o design emerge incrementalmente — cada sprint adiciona funcionalidades sobre a arquitetura existente, que é continuamente refatorada para acomodar novos requisitos. Isso evita o que Gene Kim chama de "complected systems" — sistemas onde "para mudar uma coisa, você é forçado a mudar três outras."

**Desenvolvimento → Sprints com Entregáveis Funcionais**
No SCRUM, cada sprint produz um incremento de software *potencialmente liberável* — não um módulo incompleto esperando outras partes para funcionar. Isso é radicalmente diferente do Waterfall, onde o primeiro entregável real aparece apenas no final do projeto.

**Testes → Testes Contínuos (CI + TDD)**
No XP, os testes são escritos *antes* do código (TDD). No SCRUM com CI, cada commit dispara uma suíte completa de testes automatizados. O resultado: bugs são encontrados em minutos, não em meses — como demonstrado extensamente em *The Unicorn Project*.

**Entrega e Implantação → CD (Entrega Contínua)**
No Waterfall, a implantação era um evento traumático no final do projeto — frequentemente com semanas de problemas de integração. Com CD (Continuous Delivery), cada sprint pode resultar em um deploy em produção. A Amazon já realizava 136.000 deploys por dia em 2013 — citado por Kim — graças a essa abordagem.

**Manutenção → Parte do Ciclo, Não o Fim**
No modelo ágil, não existe uma "fase de manutenção" separada do desenvolvimento. A correção de bugs e as melhorias contínuas fazem parte do backlog regular — priorizadas junto com novas funcionalidades. Isso cria um produto em evolução contínua, em vez de um software que "foi entregue" e envelheceu.

> Como sintetiza Gene Kim em *The Unicorn Project*: *"O objetivo é claro: habilitar deploys rápidos e seguros em produção."* As metodologias ágeis — SCRUM, Kanban e XP — não são fins em si mesmas. São meios para alcançar o que realmente importa: **valor entregue ao cliente com velocidade, qualidade e segurança**.

---
