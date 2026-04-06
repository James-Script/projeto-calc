const visor = document.querySelector('.visor');
const result = document.querySelector('.result');
const botoes = document.querySelectorAll('.btn');

let valorAtual = '0';
let valorAnterior = null;
let operador = null;
let novoNumero = false;

function atualizarVisor() {
  visor.textContent = valorAtual;

  visor.scrollLeft = visor.scrollWidth;
  result.scrollLeft = result.scrollWidth;
}

//  função de cálculo
function calcular() {
  if (valorAnterior === null || operador === null) return;

  let a = parseFloat(valorAnterior);
  let b = parseFloat(valorAtual);

  let resultado;

  switch (operador) {
    case '+': resultado = a + b; break;
    case '-': resultado = a - b; break;
    case '*': resultado = a * b; break;
    case '/': resultado = a / b; break;
  }

  // correção de precisão + limite de 5 dígitos
  resultado = parseFloat(resultado.toFixed(5));

  valorAtual = resultado.toString();
  valorAnterior = valorAtual;
}

botoes.forEach(botao => {
  botao.addEventListener('click', () => {

    // NÚMEROS
  if (botao.dataset.number !== undefined) {



  const onlyNumbers = valorAtual.replace(/\D/g, "");


  if (valorAtual === '0') {
    valorAtual = botao.dataset.number;
  } else {
    valorAtual += botao.dataset.number;
  }

  atualizarVisor();

  if (operador) {
    result.textContent = valorAnterior + ' ' + operador + ' ' + valorAtual;
  }
}

    // OPERADORES
    if (botao.dataset.operator !== undefined) {

      if (operador !== null) {
        calcular(); // faz conta anterior antes de continuar
      }

      operador = botao.dataset.operator;
      valorAnterior = valorAtual;
      valorAtual = '0';

      result.textContent = valorAnterior + ' ' + operador;
      atualizarVisor();
    }

    // LIMPAR
    if (botao.dataset.action === 'clear') {
      valorAtual = '0';
      valorAnterior = null;
      operador = null;
      result.textContent = '';
      atualizarVisor();
    }

    // IGUAL
    if (botao.dataset.action === 'calculate') {
      calcular();

       result.textContent += ' =';  // mantém a conta
      operador = null;

      novoNumero = true; // importante

      atualizarVisor();
    }

    // +/- (trocar sinal)
if (botao.dataset.action === 'toggle-sign') {
  if (valorAtual !== '0') {
    valorAtual = valorAtual.startsWith('-')
      ? valorAtual.slice(1)
      : '-' + valorAtual;
  }

  atualizarVisor();
}

// porcentagem
if (botao.dataset.action === 'percent') {
  valorAtual = (parseFloat(valorAtual) / 100).toString();
  atualizarVisor();
}

  });
});