

const buttonAddProcedimentos = document.querySelector('#pitico');
const tabelaProcedimentos = document.querySelector('.tabelaProcedimentos');

buttonAddProcedimentos.addEventListener('click', function() {
  // Cria uma nova linha de procedimento
  const novaLinha = document.createElement('tr');
  novaLinha.classList.add('procedimento');

  // Define o conteúdo HTML da nova linha
  novaLinha.innerHTML = `
    <td colspan="1" style="padding-top: .5rem;">
      <textarea name="carenciadescricao" id="carenciadescricao"></textarea>
    </td>

    <td colspan="1" style="padding-top: .5rem;">
      <label for="copay" class="inactive">% Copay</label>
      <input 
        type="number" 
        name="copay" 
        id="copay"
        placeholder="% Copay"
        null>
    </td>

    <td colspan="1" style="padding-top: .5rem;">
      <label for="limite" class="inactive">Limite</label>
      <input 
        type="number" 
        name="limite" 
        id="limite"
        placeholder="Limite (R$)"
        null>
    </td>

    <td colspan="1" style="padding-top: .5rem;">
      <label for="franquia" class="inactive">Franquia</label>
      <input 
        type="text" 
        name="franquia" 
        id="franquia"
        placeholder="Franquia (R$)"
        title="Caso não haja, deixe em branco ou preencha com '0'">
    </td>

    <td colspan="1" style="padding-top: .5rem;">
      <input 
        type="number" 
        name="carencialimite" 
        id="carencialimite"
        null>
    </td>

    <td colspan="1" style="padding-top: .5rem;">
      <textarea name="carenciareducaoregra" id="carenciareducaoregra" placeholder="Condições de redução..."></textarea>
    </td>

    <td colspan="1" style="padding-top: .5rem;">
      <textarea name="congenereregra" id="congenereregra" placeholder="Condições de congêneres..."></textarea>
    </td>

    <td colspan="1" style="padding-top: .5rem;">
      <div class="button-remove" title="Remover procedimento(s)"
      style="margin: auto;">&times</div>
    </td>
  `;

  // Adiciona a nova linha à tabela de procedimentos
  tabelaProcedimentos.appendChild(novaLinha);
});

document.addEventListener('click', function(e) {
    if (e.target && e.target.classList.contains('button-remove')) {
      // Encontra o elemento da linha a ser removido
      var row = e.target.closest('tr');
      // Remove a linha
      row.parentNode.removeChild(row);
    }
  });

const buttonAddVigencia = document.getElementById('button-add-vigencia');
buttonAddVigencia.addEventListener('click', addVigencia);

function addVigencia() {
    var table = document.querySelector('.vigencias tbody');
    var newTr = document.createElement('tr');
    newTr.innerHTML = `
    <td colspan="30%">  
    <input 
        type="text" 
        name="newsales" 
        id="newsales"
        placeholder="Prazo de entrega"
        null>
        </td>
    <td colspan="30%">    
    <input 
        type="text" 
        name="cancel" 
        id="cancel"
        class="first"
        placeholder="Inserir prazo"
        null>
        </td>
    <td colspan="30%">    
    <input 
        type="text" 
        name="birthday" 
        id="birthday"
        class="first"
        placeholder="Inserir data"
        null>
        </td>
    <td colspan="10%">    
    <div class="button-remove" title="Remover vigência"
        style="margin: auto;">&times</div>
        </td>
    `;
    table.appendChild(newTr);
}
  
const buttonAddContato = document.getElementById('button-add-contato');
buttonAddContato.addEventListener('click', addContato);

function addContato () {
    var table = document.querySelector('.contato');
    var newTr = document.createElement('tr');
    newTr.innerHTML = `
    <td>
        <input 
        type="text" 
        name="nomecontato" 
        id="nomecontato"
        null>
    </td>
    <td>
        <input 
        type="email" 
        name="emailcontato" 
        id="emailcontato"
        null>
    </td>
    <td>
        <input 
        type="text" 
        name="telcontato" 
        id="telcontato"
        null>
    </td>
    <td>
        <input 
        type="text" 
        name="rolecontato" 
        id="rolecontato"
        class="first"
        null>
    </td>
    <td>
        <div class="button-remove" title="Remover contato"
            style="margin: auto;">&times</div>
    </td>
    `;
    table.appendChild(newTr);
}

$(document).ready(function() {
  // Função para adicionar nova entidade
  function adicionarEntidade() {
    var newRow = $("#entidades tbody tr:first").clone();
    newRow.find("input[type=text]").val("");
    newRow.find("select").val("");
    newRow.find("#outraentidade").addClass("inactive");
    $("#entidades tbody").append(newRow);

    // Remover classe "inactive" e associar função de seleção de entidade ao campo recém-criado
    newRow.find("select").on("change", function() {
      var selectedValue = $(this).val();
      var descricao = "";
      var publico = "";
      var documentos = "";
      var taxa = "";

      switch(selectedValue) {
        case "ABRAER - Associacao Brasileira dos Estudantes do Ensino Regular":
          descricao = "Descrição da ABRAER";
          publico = "Público-alvo da ABRAER";
          documentos = "Documentos necessários da ABRAER";
          taxa = "Valor associativo da ABRAER";
          break;
        case "ABRAPPPE - Associação dos Profissionais Provedores do Protocolo Pediasuit":
          descricao = "Descrição da ABRAPPPE";
          publico = "Público-alvo da ABRAPPPE";
          documentos = "Documentos necessários da ABRAPPPE";
          taxa = "Valor associativo da ABRAPPPE";
          break;
        // Adicionar mais opções de acordo com a lista de entidades
        case "Outra":
          newRow.find("#outraentidade").removeClass("inactive");
          break;
      }

      newRow.find("#descricaoentidade").val(descricao);
      newRow.find("#publicoentidade").val(publico);
      newRow.find("#documentosentidade").val(documentos);
      newRow.find("#taxaentidade").val(taxa);
    });
  }

  // Chamada inicial da função para a linha existente
  adicionarEntidade();

  // Função para lidar com o botão de adicionar nova entidade
  $("#button-add-entidade").click(function() {
    adicionarEntidade();
  });

  // Função para lidar com a seleção da entidade "Outra"
  $(document).on("change", "select", function() {
    var selectedValue = $(this).val();

    if (selectedValue === "Outra") {
      $(this).closest("tr").find("#outraentidade").removeClass("inactive");
    } else {
      $(this).closest("tr").find("#outraentidade").addClass("inactive");
    }
  });
});




/* const selectEntidade = document.querySelectorAll('select[name="nomeentidade"]');
selectEntidade.forEach(select => {
  select.addEventListener('change', preencherCampos)
})

function preencherCampos() {
    const select = document.getElementById("nomeentidade");
    const optionSelecionada = select.options[select.selectedIndex].value;
    
    const descricao = document.getElementById("descricaoentidade");
    const publico = document.getElementById("publicoentidade");
    const documentos = document.getElementById("documentosentidade");
    const taxa = document.getElementById("taxaentidade");
    
    switch (optionSelecionada) {
      case "ABRAER - Associacao Brasileira dos Estudantes do Ensino Regular":
        descricao.value = "Descrição da ABRAER";
        publico.value = "Público-alvo da ABRAER";
        documentos.value = "Documentos necessários para a ABRAER";
        taxa.value = "Valor associativo da ABRAER";
        break;
      case "ABRAPPPE - Associação dos Profissionais Provedores do Protocolo Pediasuit":
        descricao.value = "Descrição da ABRAPPPE";
        publico.value = "Público-alvo da ABRAPPPE";
        documentos.value = "Documentos necessários para a ABRAPPPE";
        taxa.value = "Valor associativo da ABRAPPPE";
        break;
      case "IBEES - Instituto Brasileiro dos Estudantes do Ensino Superior":
        descricao.value = "Descrição da IBEES";
        publico.value = "Público-alvo da IBEES";
        documentos.value = "Documentos necessários para a IBEES";
        taxa.value = "Valor associativo da IBEES";
        break;
      case "INCAPEB - Cabeleireiros e Profissionais da Estética e Beleza":
        descricao.value = "Descrição da INCAPEB";
        publico.value = "Público-alvo da INCAPEB";
        documentos.value = "Documentos necessários para a INCAPEB";
        taxa.value = "Valor associativo da INCAPEB";
        break;
      case "INFAP - Instituto de Formação e Ação em Políticas Sociais para a Cidadania":
        descricao.value = "Descrição da INFAP";
        publico.value = "Público-alvo da INFAP";
        documentos.value = "Documentos necessários para a INFAP";
        taxa.value = "Valor associativo da INFAP";
        break;
      case "ANACAV - Associação Nacional Do Comércio Atacadista E Varejista":
        descricao.value = "Descrição da ANACAV";
        publico.value = "Público-alvo da ANACAV";
        documentos.value = "Documentos necessários para a ANACAV";
        taxa.value = "Valor associativo da ANACAV";
        break;
      case "Outra":
        descricao.value = "";
        publico.value = "";
        documentos.value = "";
        taxa.value = "";
        break;
      default:
        descricao.value = "";
        publico.value = "";
        documentos.value = "";
        taxa.value = "";
    }
}




// Seleciona o botão de adicionar entidade
const buttonAddEntidade = document.getElementById('button-add-entidade');

// Adiciona um ouvinte de evento para o botão de adicionar entidade
buttonAddEntidade.addEventListener('click', function() {
  // Seleciona a tabela de entidades
  const tableEntidades = document.querySelector('.entidades tbody');

  // Cria uma nova linha na tabela de entidades
  const novaLinha = tableEntidades.insertRow();

  // Adiciona as colunas à nova linha
  const colunaNome = novaLinha.insertCell();
  const colunaDescricao = novaLinha.insertCell();
  const colunaPublicoAlvo = novaLinha.insertCell();
  const colunaDocumentos = novaLinha.insertCell();
  const colunaValor = novaLinha.insertCell();
  const colunaRemover = novaLinha.insertCell();

  // Adiciona o HTML às colunas da nova linha
  colunaNome.innerHTML = `
    <select name="nomeentidade" id="nomeentidade" >
      <option value="" disabled selected hidden>Selecione a entidade</option>
      <option value="ABRAER - Associacao Brasileira dos Estudantes do Ensino Regular">ABRAER - Associacao Brasileira dos Estudantes do Ensino Regular</option>
      <option value="ABRAPPPE - Associação dos Profissionais Provedores do Protocolo Pediasuit">ABRAPPPE - Associação dos Profissionais Provedores do Protocolo Pediasuit</option>
      <option value="IBEES - Instituto Brasileiro dos Estudantes do Ensino Superior">IBEES - Instituto Brasileiro dos Estudantes do Ensino Superior</option>
      <option value="INCAPEB - Cabeleireiros e Profissionais da Estética e Beleza">INCAPEB - Cabeleireiros e Profissionais da Estética e Beleza</option>
      <option value="INFAP - Instituto de Formação e Ação em Políticas Sociais para a Cidadania">INFAP - Instituto de Formação e Ação em Políticas Sociais para a Cidadania</option>
      <option value="ANACAV - Associação Nacional Do Comércio Atacadista E Varejista">ANACAV - Associação Nacional Do Comércio Atacadista E Varejista</option>
      <option value="Outra">Outra</option>
    </select>
    <input type="text" name="outraentidade" id="outraentidade" class="inactive" placeholder="Insira o nome da entidade" null>
  `;
  colunaDescricao.innerHTML = '<input type="text" name="descricaoentidade" id="descricaoentidade" null>';
  colunaPublicoAlvo.innerHTML = '<input type="text" name="publicoentidade" id="publicoentidade" class="first" null>';
  colunaDocumentos.innerHTML = '<input type="text" name="documentosentidade" id="documentosentidade" null>';
  colunaValor.innerHTML = '<input type="text" name="taxaentidade" id="taxaentidade" null>';
  colunaRemover.innerHTML = `<div class="button-remove" title="Remover entidade"
  style="margin: auto;">&times</div>`;
  var selectElement = tableEntidades.querySelectorAll("select[name=nomeentidade]");
  var lastSelectElement = selectElement[selectElement.length - 1];
  lastSelectElement.addEventListener("change", preencherCampos)
}) */


