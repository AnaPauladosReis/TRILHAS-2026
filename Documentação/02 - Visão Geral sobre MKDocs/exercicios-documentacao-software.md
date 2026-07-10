# Lista de Exercícios — Documentação de Software

## Exercício 1: Importância da documentação técnica e impacto no desenvolvimento futuro

A documentação técnica registra o funcionamento interno do sistema — arquitetura, diagramas de classes, fluxo de dados e descrições de algoritmos — voltada a quem precisa manter ou estender o código (desenvolvedores, administradores e engenheiros). Sua função central é desacoplar o conhecimento do sistema da memória de uma pessoa específica.

Isso conecta diretamente com a distinção entre **arquitetura** e **design** trazida em *Head First Software Architecture*: a arquitetura define a estrutura — como as paredes e colunas de uma casa, elementos caros e difíceis de alterar depois de construídos —, enquanto o design trata de decisões mais maleáveis, como acabamentos. A documentação técnica deve registrar principalmente decisões estruturais: estilo arquitetural escolhido (monolito, microsserviços, orientado a eventos), características arquiteturais que o sistema precisa suportar (escalabilidade, testabilidade, disponibilidade) e as decisões arquiteturais que têm implicações de longo prazo, como o tipo de banco de dados ou a forma de comunicação entre serviços.

**Exemplo prático:** em um sistema migrado de monolito para microsserviços, a documentação técnica deve registrar por que a decomposição em serviços foi feita daquela forma (granularidade dos serviços, se a comunicação é síncrona ou assíncrona, se há bancos de dados por serviço ou compartilhados). Sem esse registro, um novo integrante da equipe pode reverter ou contradizer decisões que já haviam sido avaliadas e descartadas — o equivalente a derrubar uma parede estrutural sem saber que ela sustenta o telhado.

Um formato recomendado para registrar decisões arquiteturais é o **ADR (Architectural Decision Record)**, citado no material de apoio como ferramenta de colaboração: cada decisão importante é registrada com seu contexto, alternativas consideradas e justificativa, funcionando como histórico vivo do porquê das escolhas técnicas.

---

## Exercício 2: Estrutura de documentação de API para uma loja online (CRUD de produtos)

Considerando que a documentação de API deve descrever endpoints, métodos HTTP, parâmetros de requisição/resposta e exemplos de uso, segue uma estrutura aplicada a uma API REST de produtos:

### 1. Visão Geral
- Propósito da API e domínio de negócio (gestão de catálogo de produtos)
- URL base: `https://api.lojaonline.com/v1`
- Formato de dados: `application/json`
- Autenticação: Bearer Token (JWT)

### 2. Recursos e Endpoints

**Adicionar produto**
```
POST /produtos
```
| Campo | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| nome | string | sim | Nome do produto |
| preco | number | sim | Preço em centavos |
| estoque | integer | sim | Quantidade disponível |

Resposta `201 Created`:
```json
{ "id": "p_001", "nome": "Mouse sem fio", "preco": 8990, "estoque": 50 }
```

**Editar produto**
```
PUT /produtos/{id}
```
Recebe o mesmo corpo do cadastro; retorna `200 OK` com o recurso atualizado ou `404 Not Found` caso o `id` não exista.

**Excluir produto**
```
DELETE /produtos/{id}
```
Retorna `204 No Content` em caso de sucesso.

**Listar/consultar produtos**
```
GET /produtos
GET /produtos/{id}
```
Suporta parâmetros de paginação (`page`, `limit`) e filtro (`categoria`, `disponivel`).

### 3. Códigos de erro
| Código | Significado |
|---|---|
| 400 | Payload inválido |
| 401 | Token ausente ou expirado |
| 404 | Produto não encontrado |
| 409 | Conflito (ex.: SKU duplicado) |

### 4. Exemplos de uso (cURL)
```bash
curl -X POST https://api.lojaonline.com/v1/produtos \
  -H "Authorization: Bearer TOKEN" \
  -d '{"nome":"Teclado mecânico","preco":25990,"estoque":10}'
```

Essa estrutura segue a lógica de **componentes lógicos** descrita no material de arquitetura: o módulo de catálogo de produtos é um bloco de funcionalidade isolado, e a documentação de API expõe o contrato externo desse bloco sem revelar sua implementação interna — exatamente a separação entre o que o sistema expõe (interface) e como ele resolve internamente (arquitetura/design).

---

## Exercício 3: Tutorial para o usuário final — cadastro de conta em plataforma de e-commerce

Este exercício corresponde à **documentação do usuário**, cujo propósito é orientar o uso do software com linguagem simples e acessível, sem termos técnicos de implementação.

### Como criar sua conta

1. **Acesse a página inicial** e clique em **"Criar conta"**, no canto superior direito.
2. **Preencha seus dados:**
   - Nome completo
   - E-mail válido (será usado para login e confirmação)
   - Senha (mínimo de 8 caracteres, com letras e números)
3. **Aceite os termos de uso** marcando a caixa de confirmação.
4. Clique em **"Cadastrar"**.
5. **Confirme seu e-mail:** você receberá uma mensagem com um link de verificação. Clique nele para ativar a conta.
6. Pronto — faça login com o e-mail e a senha cadastrados.

> **Dica:** Se não receber o e-mail de confirmação em alguns minutos, verifique a caixa de spam ou solicite o reenvio na própria tela de login.

### Problemas comuns
- **"E-mail já cadastrado":** use a opção "Esqueci minha senha" para recuperar o acesso.
- **Link de confirmação expirado:** solicite um novo link na tela de cadastro.

Esse tutorial segue as orientações do material da trilha quanto a **clareza e objetividade**, evitando linguagem voltada a desenvolvedores e priorizando passos sequenciais e visuais (no caso de uma versão final, com prints de tela em cada etapa).

---

## Exercício 4: Exemplo de boas práticas aplicadas — clareza, organização e uso de exemplos

Trecho de documentação de uma função de autenticação, demonstrando a aplicação conjunta das três práticas:

### Função: `autenticarUsuario(email, senha)`

**Clareza:** a descrição evita ambiguidade sobre o comportamento da função.

> Valida as credenciais de um usuário e retorna um token de acesso válido por 24 horas. Caso as credenciais estejam incorretas, retorna erro `401`.

**Organização:** a informação é dividida em blocos com títulos, facilitando a leitura e a navegação (parâmetros, retorno, exceções).

**Parâmetros**
| Nome | Tipo | Descrição |
|---|---|---|
| email | string | E-mail cadastrado do usuário |
| senha | string | Senha em texto puro (criptografada no transporte) |

**Retorno**
```json
{ "token": "eyJhbGciOi...", "expiraEm": "2026-06-20T10:00:00Z" }
```

**Exceções**
- `401 Unauthorized`: credenciais inválidas
- `429 Too Many Requests`: limite de tentativas excedido

**Exemplo prático:**
```javascript
const resposta = await autenticarUsuario("ana@email.com", "senha123");
console.log(resposta.token);
```

A combinação dessas três práticas evita o problema mais comum em documentações mal estruturadas: o leitor encontrar a informação certa, mas não conseguir aplicá-la por falta de um exemplo concreto, ou perder tempo procurando a seção relevante por ausência de organização visual.

---

## Exercício 5: Diferenças entre documentação técnica, de usuário e de API

| Critério | Documentação Técnica | Documentação do Usuário | Documentação de API |
|---|---|---|---|
| **Público-alvo** | Desenvolvedores, administradores, engenheiros | Usuário final | Desenvolvedores que integram sistemas externos |
| **Propósito** | Explicar o funcionamento interno do software | Explicar como usar as funcionalidades | Explicar como consumir/integrar os serviços expostos |
| **Conteúdo típico** | Arquitetura, diagramas de classes e fluxo de dados, configurações de servidores | Tutoriais, FAQs, manuais, vídeos | Endpoints, métodos HTTP, parâmetros, exemplos de chamadas |
| **Nível de detalhe** | Estrutural e técnico | Operacional e prático | Contratual (entrada/saída) |

A diferença de propósito explica por que a desatualização de cada tipo gera um risco distinto:

- **Documentação técnica** desatualizada leva decisões arquiteturais erradas a se repetirem — por exemplo, uma equipe reintroduzir acoplamento forte entre serviços porque a documentação não registrou que aquele desenho já havia sido testado e descartado por motivos de escalabilidade.
- **Documentação do usuário** desatualizada gera abandono do produto: se um tutorial mostra uma tela que não existe mais, o usuário perde confiança na ferramenta antes mesmo de usá-la.
- **Documentação de API** desatualizada quebra integrações de terceiros sem aviso: um endpoint alterado sem atualização do contrato documentado pode interromper sistemas externos que dependem dele em produção, gerando custo direto para outras equipes ou empresas.

Em termos de arquitetura, os três tipos também correspondem a camadas diferentes de abstração do mesmo sistema: a documentação técnica descreve a estrutura interna (como as paredes de uma casa), a de API descreve o que é exposto para fora (as portas e janelas pelas quais se entra e sai), e a do usuário descreve a experiência de quem mora ali, sem precisar entender a fundação.
