const visor = document.querySelector('.visor');
const result = document.querySelector('.result');
const botoes = document.querySelectorAll('.btn');

let valorAtual = '0';
let valorAnterior = null;
let operador = null;

function atualizarVisor() {
  visor.textContent = valorAtual;
}

// 🔥 função de cálculo
function calcular() {
  if (valorAnterior === null || operador === null) return;

  let a = parseFloat(valorAnterior);
  let b = parseFloat(valorAtual);

  switch (operador) {
    case '+': valorAtual = (a + b).toString(); break;
    case '-': valorAtual = (a - b).toString(); break;
    case '*': valorAtual = (a * b).toString(); break;
    case '/': valorAtual = (a / b).toString(); break;
  }

  valorAnterior = valorAtual;
}

botoes.forEach(botao => {
  botao.addEventListener('click', () => {

    // 🔢 NÚMEROS
    if (botao.dataset.number !== undefined) {
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

    // ➕ OPERADORES
    if (botao.dataset.operator !== undefined) {

      if (operador !== null) {
        calcular(); // 🔥 faz conta anterior antes de continuar
      }

      operador = botao.dataset.operator;
      valorAnterior = valorAtual;
      valorAtual = '0';

      result.textContent = valorAnterior + ' ' + operador;
      atualizarVisor();
    }

    // 🧹 LIMPAR
    if (botao.dataset.action === 'clear') {
      valorAtual = '0';
      valorAnterior = null;
      operador = null;
      result.textContent = '';
      atualizarVisor();
    }

    // 🟰 IGUAL
    if (botao.dataset.action === 'calculate') {
      calcular();

      result.textContent = valorAtual + ' = ' ;
      operador = null;
      atualizarVisor();
    }

  });
});