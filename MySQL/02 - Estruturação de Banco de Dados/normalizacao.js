const pptxgen = require("pptxgenjs");
const path = require("path");

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.title = "Normalização de Banco de Dados";

// Fonts
const FONT_TITLE = "Arial Black";
const FONT_SUB = "Arial";
const FONT_BODY = "Calibri";

// Colors
const C = {
  darkBlue: "021C30",
  deepBlue: "065A82",
  teal: "1C7293",
  lightTeal: "2EC4B6",
  white: "FFFFFF",
  offWhite: "F4F8FB",
  lightGray: "E2EEF5",
  midGray: "7D99AA",
  darkGray: "2D3748",
  accent: "F4A429",
  red: "E05A4E",
  green: "34A85A",
};

// Helper: slide padrão
function makeSlide(title) {
  const s = pres.addSlide();
  s.background = { color: C.offWhite };

  // Header
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 0.7,
    fill: { color: C.deepBlue }
  });

  s.addText(title, {
    x: 0.5, y: 0.15,
    fontSize: 22,
    bold: true,
    color: C.white,
    fontFace: FONT_TITLE
  });

  return s;
}

// Helper: card
function card(s, { x, y, w, h, title, text, color }) {
  s.addShape(pres.shapes.RECTANGLE, {
    x, y, w, h,
    fill: { color: C.white },
    line: { color: C.lightGray }
  });

  s.addShape(pres.shapes.RECTANGLE, {
    x, y, w, h: 0.08,
    fill: { color: color || C.teal }
  });

  if (title) {
    s.addText(title, {
      x: x + 0.2,
      y: y + 0.15,
      w: w - 0.4,
      fontSize: 14,
      bold: true,
      color: color || C.deepBlue,
      fontFace: FONT_SUB
    });
  }

  if (text) {
    s.addText(text, {
      x: x + 0.2,
      y: y + 0.5,
      w: w - 0.4,
      fontSize: 12,
      color: C.darkGray,
      fontFace: FONT_BODY
    });
  }
}

// ───────── CAPA
{
  const s = pres.addSlide();
  s.background = { color: C.darkBlue };

  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 0.3, h: 5.6,
    fill: { color: C.lightTeal }
  });

  s.addText("NORMALIZAÇÃO", {
    x: 0.7, y: 1.5,
    fontSize: 42,
    bold: true,
    color: C.white,
    fontFace: FONT_TITLE
  });

  s.addText("Banco de Dados", {
    x: 0.7, y: 2.3,
    fontSize: 24,
    color: C.lightTeal,
    fontFace: FONT_SUB
  });
}

// ───────── O QUE É
{
  const s = makeSlide("O que é Normalização?");

  s.addText(
    "Processo de organizar dados para reduzir redundância e evitar inconsistências.",
    {
      x: 0.7, y: 1.5, w: 8.5,
      fontSize: 16,
      align: "center"
    }
  );

  card(s, {
    x: 0.7, y: 2.3, w: 2.6, h: 2,
    title: "Redundância",
    text: "Evita repetir dados",
    color: C.red
  });

  card(s, {
    x: 3.7, y: 2.3, w: 2.6, h: 2,
    title: "Integridade",
    text: "Dados consistentes",
    color: C.green
  });

  card(s, {
    x: 6.7, y: 2.3, w: 2.6, h: 2,
    title: "Manutenção",
    text: "Mais fácil alterar",
    color: C.teal
  });
}

// ───────── FORMAS NORMAIS
{
  const s = makeSlide("Formas Normais");

  const steps = ["1FN", "2FN", "3FN", "BCNF"];

  steps.forEach((st, i) => {
    card(s, {
      x: 0.7 + i * 2.2,
      y: 2,
      w: 2,
      h: 2,
      title: st,
      text: "Regras progressivas"
    });
  });
}

// ───────── 1FN
{
  const s = makeSlide("1FN");

  card(s, {
    x: 1, y: 2,
    w: 8, h: 2,
    title: "Regra",
    text: "Cada campo deve conter um único valor (atômico).",
    color: C.teal
  });
}

// ───────── 2FN
{
  const s = makeSlide("2FN");

  card(s, {
    x: 1, y: 2,
    w: 8, h: 2,
    title: "Regra",
    text: "Todos os atributos dependem da chave completa.",
    color: C.accent
  });
}

// ───────── 3FN
{
  const s = makeSlide("3FN");

  card(s, {
    x: 1, y: 2,
    w: 8, h: 2,
    title: "Regra",
    text: "Remover dependências transitivas.",
    color: C.green
  });
}

// ───────── ANOMALIAS
{
  const s = makeSlide("Anomalias");

  const list = [
    "Inserção: não consegue inserir sem outro dado",
    "Atualização: inconsistência",
    "Exclusão: perda de dados"
  ];

  list.forEach((t, i) => {
    card(s, {
      x: 1,
      y: 1.5 + i * 1.2,
      w: 8,
      h: 1,
      title: "",
      text: t,
      color: C.red
    });
  });
}

// ───────── VANTAGENS
{
  const s = makeSlide("Vantagens");

  const list = [
    "Menos redundância",
    "Mais organização",
    "Facilidade de manutenção",
    "Dados confiáveis"
  ];

  list.forEach((t, i) => {
    card(s, {
      x: 1,
      y: 1.5 + i * 1,
      w: 8,
      h: 0.8,
      text: "• " + t,
      color: C.green
    });
  });
}

// ───────── CONCLUSÃO
{
  const s = pres.addSlide();
  s.background = { color: C.darkBlue };

  s.addText("CONCLUSÃO", {
    x: 1, y: 1.5,
    fontSize: 36,
    bold: true,
    color: C.white
  });

  s.addText(
    "A normalização melhora a qualidade e a estrutura dos dados.",
    {
      x: 1, y: 2.5,
      fontSize: 18,
      color: C.lightTeal
    }
  );
}

// ───────── SAVE
pres.writeFile({
  fileName: path.join(__dirname, "normalizacao_bd.pptx")
})
.then(() => console.log("✅ PPT top gerado"))
.catch(err => console.error(err));