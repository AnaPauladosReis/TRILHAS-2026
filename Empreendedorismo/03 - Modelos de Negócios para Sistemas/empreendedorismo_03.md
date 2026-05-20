# 📘 Trilha de Empreendedorismo — Módulo 03
## Lista de Exercícios de Fixação: Modelos de Negócios para Sistemas



## Questão 1 — Diferença entre Business Model Canvas e Lean Startup

Embora frequentemente usados juntos, o **Business Model Canvas (BMC)** e a **Lean Startup** são ferramentas com naturezas e propósitos distintos — complementares, não concorrentes.

| Dimensão | Business Model Canvas | Lean Startup |
|---|---|---|
| **Natureza** | Ferramenta de mapeamento e documentação | Metodologia de processo e validação |
| **Foco** | Estrutura do negócio (o quê) | Processo de descoberta do negócio (como) |
| **Resultado** | Documento visual com 9 blocos | Ciclo contínuo de aprendizagem |
| **Tempo** | Estático no momento da criação; atualizado conforme aprendizado | Dinâmico e iterativo por natureza |
| **Origem** | Alex Osterwalder & Yves Pigneur | Eric Ries — *The Lean Startup* |

O Módulo 03 define o BMC como uma "ferramenta visual que ajuda a mapear e estruturar um negócio" com 9 blocos, enquanto a Lean Startup é "um modelo focado na validação rápida de ideias para reduzir o desperdício e aumentar a eficiência."

Jamie Pride, em *Unicorn Tears*, reforça o papel central do BMC: ele é descrito como "o padrão de facto para documentação de modelos de negócio" — a ferramenta mais recomendada para que fundadores comuniquem seu modelo a investidores, equipe e parceiros.

### Como usar cada ferramenta no planejamento de um sistema

**Business Model Canvas** é mais adequado quando:
- Você precisa comunicar o modelo de negócio de forma clara e visual a stakeholders.
- Quer explorar variações do modelo (assinatura vs. freemium vs. licença única) antes de decidir.
- Precisa alinhar time, investidores e parceiros em torno de uma visão comum do negócio.

**Lean Startup** é mais adequada quando:
- Você ainda está testando se o problema que o sistema resolve é real e relevante.
- Precisa de um processo estruturado para coletar feedback de usuários reais de forma rápida e barata.
- Quer reduzir o risco de desenvolver um sistema completo que ninguém vai usar.

> **Uso integrado ideal:** usa-se o BMC para documentar as *hipóteses* do modelo de negócio, e a Lean Startup (ciclo Build-Measure-Learn) para *validar* ou *refutar* essas hipóteses com dados reais — atualizando o Canvas conforme o aprendizado avança.

---

## Questão 2 — Business Model Canvas: Sistema de Gerenciamento de Estoque para Pequenas Empresas

> **Produto fictício:** *StockSimples* — Sistema SaaS de gestão de estoque para micro e pequenas empresas do comércio varejista.

### 🟦 Business Model Canvas — StockSimples

**1. Segmentos de Clientes**
Micro e pequenas empresas varejistas com faturamento de até R$ 4,8 milhões/ano (MEI, ME e EPP), especialmente lojistas de moda, eletrodomésticos, pet shop, farmácias independentes e materiais de construção. Empresas com 1 a 20 funcionários que ainda controlam estoque em planilhas Excel ou cadernos.

**2. Propostas de Valor**
- **Simplicidade radical:** interface intuitiva que qualquer lojista usa sem treinamento técnico.
- **Controle em tempo real:** alertas automáticos de estoque mínimo, evitando ruptura e excesso de capital parado.
- **Integração com vendas:** sincronização automática com frente de caixa e emissão de NF-e.
- **Relatórios acionáveis:** giro de estoque, curva ABC e previsão de demanda em linguagem acessível.

**3. Canais**
- **Aquisição:** Google Ads segmentado por região e nicho, parcerias com CDL e ACIM (Joinville/SC), marketing boca a boca incentivado com desconto por indicação.
- **Entrega:** plataforma web responsiva + aplicativo mobile (iOS e Android).
- **Suporte:** chat in-app com IA + atendimento humano via WhatsApp nos planos pagos.

**4. Relacionamento com Clientes**
- Onboarding automatizado com tutorial interativo (primeiros 7 dias).
- Comunidade online de usuários para troca de boas práticas.
- Atendimento personalizado para planos Enterprise (acima de 5 lojas).
- *Customer Success* ativo: contato proativo quando métricas indicam risco de churn.

**5. Fontes de Receita**
- **Freemium:** até 100 SKUs, 1 usuário — gratuito (conversão para pago).
- **Plano Básico:** R$ 79/mês — até 1.000 SKUs, 3 usuários, 1 caixa integrado.
- **Plano Pro:** R$ 149/mês — SKUs ilimitados, 10 usuários, múltiplos caixas, relatórios avançados.
- **Plano Enterprise:** R$ 349/mês — múltiplas filiais, API aberta, suporte prioritário.

**6. Recursos Principais**
- Plataforma de software em nuvem (AWS ou Azure).
- Equipe de desenvolvimento de produto (back-end, front-end, mobile).
- Base de dados de clientes e histórico de transações (ativo estratégico).
- Marca e reputação via reviews no Google e App Store.

**7. Atividades Principais**
- Desenvolvimento contínuo do produto (sprints quinzenais).
- Suporte e retenção de clientes (churn abaixo de 3%/mês).
- Marketing de conteúdo educando lojistas sobre gestão de estoque.
- Integrações com parceiros (PDVs, marketplaces, ERPs).

**8. Parcerias Principais**
- **Provedores de nuvem** (AWS, Google Cloud): infraestrutura escalável.
- **Parceiros de PDV** (Linx, Stone, Cielo): integração nativa com caixas populares no Brasil.
- **Associações Comerciais** (CDL, Sebrae): canal de distribuição com credibilidade para PMEs.
- **Contadores e assessorias fiscais:** canal de indicação para clientes varejistas.

**9. Estrutura de Custos**
- **Custos fixos:** salários de desenvolvedores, infraestrutura em nuvem, ferramentas de suporte.
- **Custos variáveis:** CAC via Google Ads, comissões de parceiros.
- **Custo crítico a monitorar:** LTV/CAC ratio — o modelo é viável somente se o valor do cliente ao longo do tempo for pelo menos 3x o custo de aquisição (metodologia de Pride).

---

## Questão 3 — Ciclo Build-Measure-Learn aplicado a um aplicativo de saúde

### Contexto: App *VitaCheck* — Monitoramento de Sinais Vitais para Pacientes Crônicos

#### 🔨 BUILD — Construir o MVP

**Hipótese inicial:** pacientes com hipertensão e diabetes têm dificuldade em registrar e acompanhar seus sinais vitais de forma consistente, prejudicando o controle médico.

**MVP com apenas três funcionalidades:**
- Registro manual de pressão arterial e glicemia com data e hora.
- Histórico em gráfico simples dos últimos 30 dias.
- Lembrete configurável para medir na hora certa.

O que **não** incluir no MVP: integração com wearables, relatórios em PDF, compartilhamento com médico, IA preditiva — essas funcionalidades são testadas apenas se o MVP validar a hipótese central.

Jamie Pride alerta em *Unicorn Tears*: o MVP deve ter "o mínimo de funcionalidades que o cliente pagaria" — e a disciplina de não adicionar features durante a produção é fundamental: *"Perfection is the enemy of success."*

#### 📊 MEASURE — Medir

**Métricas definidas antes do lançamento:**
- Taxa de registro diário: % de usuários que registram pelo menos 1 medição por dia nos primeiros 14 dias.
- Retenção D7 e D30: % de usuários que ainda usam o app após 7 e 30 dias.
- NPS (Net Promoter Score): disposição de recomendar o app.
- Taxa de conversão para plano pago: % que aceita R$ 14,90/mês após trial.

**Métodos de coleta:** analytics in-app (Firebase ou Mixpanel), entrevistas qualitativas com 10-15 usuários por ciclo, pesquisa pós-onboarding via e-mail.

#### 🧠 LEARN — Aprender e Pivotar ou Perseverar

**Cenário A — positivo:** retenção D30 acima de 40%, NPS acima de 50 → **perseverar** e avançar para a próxima funcionalidade mais solicitada.

**Cenário B — negativo:** usuários abandonam após 3 registros → **pivot**: o problema não é o registro, mas a interpretação dos dados. Novo MVP: visualização clara e comparação com metas médicas.

> Como ressalta Pride: *"Um pivot é redefinir o problema ou endereçá-lo com uma solução diferente. Sua capacidade de pivotar depende de quão rapidamente você reconhece que seu modelo não está funcionando."*

---

## Questão 4 — O que é o MVP e por que é importante para o desenvolvimento de sistemas

### Definição

O **MVP (Produto Mínimo Viável)** é, segundo o Módulo 03, "uma versão simplificada do produto com apenas as funcionalidades essenciais para que ele possa ser testado com os primeiros usuários." O objetivo é lançá-lo o mais rápido possível, colher feedbacks reais e evoluir o produto com base nesses insights.

Jamie Pride complementa: o MVP é "o produto com o mínimo de funcionalidades que um cliente pagaria", desenvolvido após validação extensiva com clientes sobre o problema e a proposta de valor. O MVP não é um produto inacabado — é deliberadamente mínimo, mas funcional e valioso para o early adopter.

### Por que o MVP é importante?

**1. Economia de tempo e recursos:**
Desenvolver um sistema completo antes de validar a hipótese central é o erro mais caro que uma startup pode cometer. Pride documenta o caso de um fundador que "gastou centenas de milhares de dólares em desenvolvedores terceirizados sem nenhum plano, mercado ou cliente" — um erro terminal para a startup.

**2. Feedback real substitui suposições:**
A percepção interna do time sobre o que os usuários querem raramente coincide com o que eles realmente precisam. O MVP coloca o produto nas mãos de usuários reais, gerando dados que substituem opiniões.

**3. Redução de risco de escala prematura:**
Pride cita Marc Andreessen: startups têm essencialmente duas vidas — antes e depois do *product/market fit*. Escalar antes de atingir o fit é receita para desperdício de capital.

**4. Disciplina de foco:**
O processo de definir o MVP força o time a responder: *qual é a única funcionalidade sem a qual o produto não existe?* Isso elimina features desnecessárias.

### Exemplos Práticos

**Dropbox:** antes de construir o produto, o fundador criou apenas um vídeo demonstrativo. A lista de espera gerada validou a demanda — sem uma linha de código.

**Airbnb:** os fundadores alugaram um colchão inflável no próprio apartamento e criaram um site rudimentar. Validaram que pessoas pagam para dormir em casa de estranhos com custo próximo de zero.

**Sistema de Gestão:** uma startup que deseja lançar um ERP completo pode iniciar com um único módulo — controle financeiro básico — e lançar módulos adicionais somente após validar que clientes usam e pagam pelo módulo inicial.

---

## Questão 5 — Ideia de software com validação de ideias e prototipagem

### 💡 *ManutenAI* — Gestão de Ordens de Serviço para Técnicos Autônomos

**Problema:** técnicos autônomos de manutenção (eletricistas, encanadores, ar-condicionado) perdem 2-3 horas/dia em burocracia: anotações em papel, WhatsApp para agendamento, sem histórico de clientes ou controle de peças.

**Solução:** app mobile para gestão de OS com criação por voz (IA transcreve), histórico de clientes, controle de peças, geração de orçamentos e cobrança via Pix integrado.

### Validação da Ideia (antes de qualquer código)

**Pesquisa qualitativa:**
Entrevistar 20 técnicos autônomos de Joinville/SC. Perguntas-chave (metodologia de Pride): *Como você gerencia suas ordens hoje? Quanto tempo perde com burocracia? Já pagou por algum app de gestão? Quanto pagaria?*

**Teste de disposição de pagar:**
Criar landing page simples com botão "Quero me cadastrar — R$ 29/mês" e veicular anúncios no Facebook para técnicos autônomos. Se ≥5% clicarem, a hipótese de demanda é promissora.

**Value Proposition Ad-lib (Osterwalder/Pride):**
> *O ManutenAI ajuda técnicos autônomos que querem profissionalizar seu serviço, reduzindo o tempo gasto com burocracia, e aumentando a capacidade de atender mais clientes por dia, ao contrário do controle manual por WhatsApp e caderninho.*

### Prototipagem

**Baixa fidelidade (Semana 1-2):** esboços em papel das telas principais — apresentar a 5 técnicos observando comportamento.

**Alta fidelidade (Semana 3-4):** wireframes interativos no Figma simulando o fluxo completo — testar com 10 técnicos em sessões de usabilidade de 30 minutos.

**MVP funcional (Semana 5-8):** apenas criação de OS por texto (voz fica para v2), histórico básico de clientes e geração de PDF de orçamento — lançar para 20 técnicos-piloto gratuitamente por 30 dias.

> Seguindo o conselho de Pride: *"Trate seu protótipo como o roteiro do seu produto. Não desvie do script durante a produção."*

---

## Questão 6 — Case de sucesso: Airbnb e o uso estratégico do MVP

### Como o MVP foi construído e validado

Os fundadores Brian Chesky e Joe Gebbia, sem dinheiro para pagar o aluguel em 2008, perceberam que uma grande conferência de design lotou os hotéis de San Francisco. Criaram um site rudimentar chamado *Air Bed & Breakfast* com fotos do próprio apartamento, um colchão inflável e café da manhã incluso. Custo de desenvolvimento: praticamente zero.

**Resultado:** 3 hóspedes pagaram pela experiência. A hipótese central foi validada — pessoas pagam para se hospedar em casas de particulares.

**O que o MVP não tinha:** sistema de avaliações, verificação de identidade, seguro, pagamento integrado, mapa de busca, filtros. Todas essas features foram adicionadas progressivamente *após* a validação da hipótese central.

### Por que o MVP foi decisivo

Assim como Pride documenta em *Unicorn Tears*, o Airbnb não foi o primeiro a pensar em hospedagem alternativa. O diferencial foi a **execução disciplinada**: validar a hipótese com custo mínimo antes de investir em desenvolvimento, e iterar com base em feedback real.

Se os fundadores tivessem construído primeiro a plataforma completa, teriam gasto meses e centenas de milhares de dólares antes de saber se alguém usaria o serviço. O MVP inverteu essa lógica: *validar antes de construir*.

---

## Questão 7 — Esboço de protótipo para sistema de gestão de tarefas

### 🗂️ *FlowTask* — Gestão de Tarefas para Equipes de Manutenção Industrial

**Contexto:** times de manutenção em indústrias de Joinville precisam de ferramenta simples para gerenciar ordens de serviço, prazos e responsáveis — sem a complexidade de ferramentas como Jira ou SAP.

### Esboço das Telas Principais

```
┌──────────────────────────────────────────────────────┐
│  TELA 1: DASHBOARD — KANBAN                          │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐           │
│  │ A FAZER  │  │ EM ANDTO │  │CONCLUÍDO │           │
│  │   (8)    │  │   (3)    │  │  (12)    │           │
│  └──────────┘  └──────────┘  └──────────┘           │
│  [+ Nova Tarefa]    [Filtrar: Responsável / Data]    │
└──────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────┐
│  TELA 2: CARD DE TAREFA                              │
│  Título: Revisão bomba hidráulica linha 3            │
│  Responsável: João Silva    Prazo: 23/05/2026        │
│  Prioridade: 🔴 Alta        Setor: Manutenção        │
│  Descrição: [campo de texto livre]                   │
│  Anexos: [foto] [documento]                          │
│  [Mover para Em Andamento]  [Comentar]               │
└──────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────┐
│  TELA 3: CRIAR NOVA TAREFA                           │
│  Título: _______________________________             │
│  Responsável: [dropdown]   Prazo: [datepicker]       │
│  Prioridade: ○ Baixa  ○ Média  ● Alta                │
│  Descrição: [área de texto]                          │
│  [Cancelar]                    [Criar Tarefa]        │
└──────────────────────────────────────────────────────┘
```

### Estratégia de Apresentação para Coleta de Feedback

**Método: Think-Aloud Usability Testing**

Recrutar 5-8 usuários representativos (supervisores de manutenção, engenheiros de projetos) e entregar um roteiro com tarefas específicas:
- *"Crie uma tarefa urgente e atribua ao técnico João Silva com prazo para amanhã."*
- *"Encontre todas as tarefas atrasadas do setor de manutenção."*
- *"Mova uma tarefa de 'A Fazer' para 'Concluído'."*

**Instrução ao usuário:** *"Pense em voz alta enquanto realiza as tarefas. Não existe resposta certa ou errada — estamos testando o sistema, não você."*

**Dados coletados:** tempo para completar cada tarefa, pontos de hesitação ou erro, gravação de tela com permissão.

**Entrevista pós-teste:** o que foi mais fácil? O que causou dificuldade? O que funcionou diferente do esperado? Usaria no trabalho diário? Quanto pagaria por mês?

> Esta abordagem alinha-se com o que Pride chama de **design thinking centrado no cliente**: *"Não há respostas dentro do edifício — saia e fale com seus clientes."*

---

## Questão 8 — Como a prototipagem reduz riscos em projetos de desenvolvimento de software

### A Prototipagem como Gestão de Risco

O principal risco em qualquer projeto de software é o **risco de relevância**: construir algo que os usuários não querem, não entendem ou não pagam. A prototipagem mitiga esse risco antes de comprometer orçamento e equipe com desenvolvimento.

Pride documenta em *Unicorn Tears* o caso de um fundador que "gastou centenas de milhares de dólares em desenvolvedores terceirizados sem qualquer plano, mercado ou cliente." A ausência de prototipagem foi a causa direta da falha.

### Estratégia em Três Níveis

**Nível 1 — Protótipo de Papel (custo: zero)**
Esboçar os fluxos principais em papel ou quadro branco antes de abrir qualquer ferramenta de design. Apresentar a 5-10 usuários potenciais. Risco eliminado: entender se a estrutura lógica faz sentido para o usuário.

**Nível 2 — Wireframe Interativo no Figma (custo: dias, não meses)**
Criar protótipos clicáveis simulando o fluxo real. Ferramentas como Figma, Balsamiq ou Keynotopia (citado por Pride) permitem criar "apps falsos" que parecem reais ao usuário. Risco eliminado: identificar problemas de UX e lógica sem escrever código.

**Nível 3 — MVP Funcional (custo: semanas, não anos)**
Desenvolver apenas o fluxo central — "a única funcionalidade mais importante que o cliente pagaria" (Pride). Risco eliminado: confirmar product/market fit antes de investir em desenvolvimento completo.

### Benefícios por Tipo de Risco

| Risco | Como a Prototipagem Mitiga |
|---|---|
| Requisitos mal compreendidos | Usuário *vê* e *interage* com o protótipo, revelando gaps entre o que foi pedido e o que foi entendido |
| Features desnecessárias | O protótipo força priorização — só entra no fluxo o que o usuário realmente precisa |
| Retrabalho de desenvolvimento | Ajustes no Figma custam minutos; no código produzido, custam dias ou semanas |
| Desalinhamento do time | O protótipo é a "linguagem comum" entre designers, devs e stakeholders — substitui documentos de 100 páginas |
| Resistência à adoção | Usuários envolvidos na prototipagem tornam-se defensores do produto |

---

## Questão 9 — Exemplo fictício de produto digital usando Lean Startup

### 🎓 *OficioDigital* — Cursos Técnicos Online para Trabalhadores da Indústria

**Problema:** trabalhadores industriais (torneiros, soldadores, operadores de CNC) precisam de atualização técnica constante, mas cursos presenciais têm horários rígidos incompatíveis com turnos. Não existe plataforma EAD especializada em conteúdo técnico-industrial acessível.

**Hipótese central:** trabalhadores industriais pagariam por cursos técnicos online curtos (microlearning), acessíveis pelo celular, nos momentos entre turnos.

### MVP Inicial — Lean Startup Aplicado

O MVP do *OficioDigital* não é uma plataforma EAD completa. É:

- **Um único curso:** "Leitura e Interpretação de Desenho Técnico Mecânico" — 8 videoaulas de 10 minutos.
- **Hospedagem:** YouTube privado, acesso por link exclusivo.
- **Matrícula:** formulário Google + pagamento via Pix manual.
- **Certificado:** PDF gerado no Canva, enviado por e-mail.

Total investido: R$ 3.000 em produção de vídeo. Nenhum sistema desenvolvido.

### Ciclo Build-Measure-Learn

**BUILD:** produzir as 8 aulas e disponibilizar para os primeiros 30 alunos.

**MEASURE:**
- Taxa de conclusão do curso.
- NPS dos primeiros alunos.
- Disposição de pagar por um segundo curso (R$ 49,90).
- Horários de acesso — quando os trabalhadores acessam? (valida hipótese do microlearning).

**LEARN:**

*Resultado positivo:* 70% concluem, NPS 72, 60% querem o próximo curso → **perseverar**: produzir mais 3 cursos e testar assinatura mensal de R$ 39,90.

*Resultado negativo:* apenas 20% concluem, feedback indica conteúdo muito teórico → **pivot**: reformatar com demonstrações práticas no chão de fábrica, com instrutores que são trabalhadores experientes (peer-to-peer learning).

> Este exemplo demonstra o princípio central que Pride extrai de Eric Ries: a Lean Startup não é sobre *falhar rápido na empresa* — é sobre *iterar rápido no produto*, incorporando a voz do cliente em cada ciclo até encontrar o encaixe entre problema e solução.

---

## Questão 10 — Três vantagens do Business Model Canvas para planejar um sistema de software

### Vantagem 1: Visão Sistêmica em Uma Única Página

O BMC permite que fundadores, desenvolvedores, investidores e parceiros vejam **simultaneamente** todos os elementos do negócio — clientes, valor, receita, custos, canais — sem precisar ler um plano de negócios de 50 páginas.

**Impacto no sucesso do projeto:** projetos de software fracassam frequentemente porque desenvolvedores constroem o que *tecnicamente* foi solicitado, sem entender *por que* aquela funcionalidade importa para o negócio. Com o BMC visível para o time, cada decisão de produto pode ser ancorada nos blocos do Canvas: "Essa feature serve qual segmento? Resolve qual dor? Está alinhada com nossa proposta de valor?"

Pride confirma: o BMC tornou-se "o meio padrão para comunicar modelos de negócio entre investidores e startups" — o que significa que um projeto estruturado com o Canvas é mais fácil de financiar, contratar e escalar.

---

### Vantagem 2: Exploração e Comparação de Variações de Modelo

O BMC incentiva ativamente o teste de diferentes configurações *antes* de comprometer recursos com desenvolvimento. Pride descreve isso explicitamente: "Você pode ter três ou quatro opções diferentes. Cobra assinatura? Vai pelo modelo freemium? Taxa anual? Taxa única? Explorar essas variações ajuda a encontrar a combinação que melhor se adapta ao seu negócio."

**Impacto no sucesso do projeto:** a escolha do modelo de monetização afeta diretamente a arquitetura do sistema. Um SaaS com cobrança por usuário tem requisitos técnicos diferentes de um sistema com licença perpétua. Definir isso no Canvas *antes* de codificar evita retrabalho arquitetural custoso no futuro.

---

### Vantagem 3: Identificação Precoce de Incoerências e Dependências Críticas

Ao preencher os 9 blocos, incoerências ficam evidentes: uma proposta de valor sofisticada com estrutura de custo incompatível; canais que não alcançam o segmento definido; atividades que exigem recursos que a empresa não tem.

**Impacto no sucesso do projeto:** essas incoerências, identificadas no Canvas em horas, custariam meses de desenvolvimento para serem descobertas no código. Um sistema de saúde que depende de integração com planos de saúde (parceria principal), mas cujo fundador nunca mapeou como estabeleceria essa parceria, pode ter seu lançamento bloqueado por um requisito que o Canvas teria evidenciado desde o início.

> Como sintetiza Osterwalder — referenciado por Pride: um modelo de negócio define "como uma organização cria, entrega e captura valor." O BMC torna esse processo visual, colaborativo e iterável — qualidades essenciais para qualquer projeto de software bem-sucedido.


