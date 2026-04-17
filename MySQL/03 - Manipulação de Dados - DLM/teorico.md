[01] INSERT INTO vs. UPDATE
--------------------------------------------------------------------------------
LOGICA: O 'INSERT' cria algo novo; o 'UPDATE' modifica algo que ja existe.
POR QUE:
- Use INSERT INTO quando voce quer adicionar uma linha inteira de dados na 
  tabela (ex: cadastrar um novo cliente).
- Use UPDATE quando a linha ja esta la, mas uma informacao mudou (ex: o cliente
  mudou de telefone).

[02] DELETE vs. TRUNCATE
--------------------------------------------------------------------------------
LOGICA: O 'DELETE' e um bisturi; o 'TRUNCATE' e uma marreta.
POR QUE:
- DELETE remove linhas especificas (ou todas) e o banco registra cada remocao, 
  o que permite desfazer (rollback) em alguns casos. Ele e mais lento.
- TRUNCATE esvazia a tabela inteira de uma vez, "resetando" a estrutura. 
  E muito mais rapido, mas apaga TUDO e nao permite filtrar com WHERE.

[03] A IMPORTANCIA DO 'WHERE'
--------------------------------------------------------------------------------
LOGICA: Seguranca e precisao.
POR QUE: Sem o WHERE, o comando UPDATE ou DELETE sera aplicado a TODAS as linhas 
da tabela. Se voce esquecer o WHERE num comando de deletar usuario, voce apaga 
a empresa inteira. O WHERE e o "filtro" que garante que voce so mexa no que 
realmente deseja.

[04] UTILIDADE DO 'ORDER BY'
--------------------------------------------------------------------------------
LOGICA: Organizacao visual e priorizacao.
POR QUE: Tabelas de bancos de dados nao garantem ordem. O ORDER BY coloca os 
resultados em ordem alfabetica (ASC) ou numerica (DESC).
EXEMPLO: Listar os produtos do mais barato para o mais caro.

[05] PALAVRA-CHAVE 'DEFAULT'
--------------------------------------------------------------------------------
LOGICA: O valor "Padrao".
POR QUE: Serve para quando voce nao quer (ou nao tem) um valor especifico para 
uma coluna no momento do cadastro. 
EXEMPLO: Se voce criar uma coluna 'status' com DEFAULT 'Ativo', sempre que 
inserir um usuario sem dizer o status, ele ja comeca como 'Ativo'.

[06] CLAUSULA 'DISTINCT'
--------------------------------------------------------------------------------
LOGICA: Filtro anti-repeticao.
POR QUE: Se voce tem uma tabela de vendas e quer saber quais cidades compraram 
de voce, mas nao quer ver o nome "Sao Paulo" repetido 500 vezes, o DISTINCT 
limpa os duplicados e mostra apenas os valores unicos.

[07] COMO FUNCIONA O 'GROUP BY'
--------------------------------------------------------------------------------
LOGICA: Agrupar para contar ou somar.
POR QUE: Ele junta linhas que possuem o mesmo valor em grupos. 
EXEMPLO: "Quero saber o total vendido POR categoria". O GROUP BY separa as 
categorias e permite que voce use funcoes como SUM (soma) ou COUNT (contagem) 
em cada grupo.

[08] IMPACTO DA FALTA DE INDICES
--------------------------------------------------------------------------------
LOGICA: Performance e tempo.
POR QUE: Sem indices, o banco precisa ler TODAS as paginas de dados (Full Table 
Scan) para achar um registro, como ler um livro inteiro para achar uma palavra. 
Com indices, ele vai direto na pagina certa. O impacto e a lentidao extrema em 
bancos de dados grandes.

[09] OPERADORES: COMPARACAO E LOGICOS
--------------------------------------------------------------------------------
COMPARACAO (Testam valores):
1. '=' (Igual): Verifica se o valor e exatamente aquele.
2. '>' (Maior que): Filtra numeros ou datas maiores que o ponto de corte.

LOGICOS (Combinam condicoes):
1. 'AND': So retorna o dado se TODAS as condicoes forem verdadeiras.
2. 'OR' : Retorna o dado se PELO MENOS UMA condicao for verdadeira.

[10] HAVING vs. WHERE
--------------------------------------------------------------------------------
LOGICA: O momento do filtro.
POR QUE: 
- O WHERE filtra as linhas ANTES de qualquer agrupamento. 
- O HAVING e usado para filtrar os resultados DEPOIS que o GROUP BY ja somou 
  ou contou os dados. 
DIFERENCA: Voce nao pode usar funcoes como SUM() no WHERE, mas pode no HAVING.