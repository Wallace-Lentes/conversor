var conversao = {

  categorias: ['comprimento', 'peso', 'temperatura' ],

  unidade: {
    comprimento: ['metros', 'centimetros', 'polegadas' ],
    peso: ['quilograma', 'gramas', 'libras'],
    temperatura: ['celsius', 'fahrenheit', 'kelvin'],
  },

  fator: {
    comprimento: {
      M: 1.00,
      C: 100.00,
      P: 39.3701,
    },
    peso: {
      Q: 1,
      G: 1000,
      L: 2.20462,
    },
    temperatura: {
      F: {
        C: function (entrada) {
          return (entrada - 32) * 5 / 9;
        },
        K: function (entrada) {
          return (entrada - 32) * 5 / 9 + 273.15;
        },
      },
      C: {
        F: function (entrada) {
          return (entrada * 9 / 5) + 32;
        },
        K: function (entrada) {
          return entrada + 273.15;
        },
      },
      K: {
        F: function (entrada) {
          return (entrada - 273.15) * 9 / 5 + 32;
        },
        C: function (entrada) {
          return entrada - 273.15;
        },
      },
    },
  },
};

function converter(categoria) {
  var entrada, origem, destino, resultado;

  switch (categoria) {
    case 'comprimento':
      entrada = parseFloat(document.getElementById('comprimentoEntrada').value);
      origem = document.getElementById('comprimentoMedidas').value;
      destino = '';

      if (document.getElementById('comprimentoMetro').checked)
        destino = 'M';
      else if (document.getElementById('comprimentoCentimetro').checked)
        destino = 'C';
      else if (document.getElementById('comprimentoPolegada').checked)
        destino = 'P';

      if (destino !== '') {
        resultado = entrada * conversao.fator.comprimento[destino] / conversao.fator.comprimento[origem];

        if (destino === 'M')
        resultado = resultado.toFixed(4) + ' metros';
      else if (destino === 'C')
        resultado = resultado.toFixed(2) + ' centimetros';
      else if (destino === 'P')
        resultado = resultado.toFixed(4) + ' polegadas';


        document.getElementById('comprimentoResultado').textContent = 'Resultado: ' + resultado ;
      } else {
        alert('Selecione uma medida para conversão.');
      }
      break;

    case 'peso':
      entrada = parseFloat(document.getElementById('pesoEntrada').value);
      origem = document.getElementById('pesoMedidas').value;
      destino = '';

      if (document.getElementById('pesoQuilogramas').checked)
        destino = 'Q';
      else if (document.getElementById('pesoGramas').checked)
        destino = 'G';
      else if (document.getElementById('pesoLibras').checked)
        destino = 'L';

      if (destino !== '') {
        resultado =  conversao.fator.peso[destino] / conversao.fator.peso[origem];

        if (destino === 'Q')
          resultado = resultado.toFixed(1) + ' Kg';
        else if (destino === 'G')
          resultado = resultado.toFixed(1) + ' g';
        else if (destino === 'L')
          resultado = resultado.toFixed(1) + ' Lb';

        document.getElementById('pesoResultado').textContent = 'Resultado: ' + resultado;
      } else {
        alert('Selecione uma medida para conversão.');
      }
      break;

    case 'temperatura':
      entrada = parseFloat(document.getElementById('temperaturaEntrada').value);
      origem = document.getElementById('temperaturaMedidas').value;
      destino = '';

      if (document.getElementById('temperaturaFahrenheit').checked)
        destino = 'F';
      else if (document.getElementById('temperaturaCelcius').checked)
        destino = 'C';
      else if (document.getElementById('temperaturaKelvin').checked)
        destino = 'K';

      if (destino !== '') {
        resultado = conversao.fator.temperatura[origem][destino](entrada);

        if (destino === 'C')
          resultado = resultado.toFixed(1) + ' °C';
        else if (destino === 'F')
          resultado = resultado.toFixed(1) + ' °F';
        else if (destino === 'K')
          resultado = resultado.toFixed(1) + ' K';

        document.getElementById('temperaturaResultado').textContent = 'Resultado: ' + resultado;
      } else {
        alert('Selecione uma medida para conversão.');
      }
      break;
  }
}
function selecionarCategoria() {

   // Limpar os resultados anteriores
   document.getElementById('comprimentoResultado').textContent = '';
   document.getElementById('pesoResultado').textContent = '';
   document.getElementById('temperaturaResultado').textContent = '';
   
  var categoriaSelecionada = document.getElementById("categoria").value;
  var categorias = document.getElementsByClassName("categoria");

  for (var i = 0; i < categorias.length; i++) {
    var categoria = categorias[i];
    if (categoria.id === categoriaSelecionada) {
      categoria.style.display = "block";
    } else {
      categoria.style.display = "none";
    }
  }
}

// Executar a função uma vez no carregamento da página para exibir a categoria inicialmente selecionada
selecionarCategoria();


// Função para selecionar apenas um checkbox por categoria
function selecionarCheckbox(categoria, checkboxSelecionado) {
  var checkboxes = document.querySelectorAll(`#${categoria} input[type="checkbox"]`);

  checkboxes.forEach(function (checkbox) {
    checkbox.checked = false;
  });

  checkboxSelecionado.checked = true;
}

// Função para lidar com a seleção de checkboxes
function checkboxSelecionado(categoria, checkboxId) {
  var checkboxSelecionado = document.getElementById(checkboxId);
  selecionarCheckbox(categoria, checkboxSelecionado);
}
