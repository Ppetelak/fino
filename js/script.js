import { Procedimentos } from './procedimentos.js'
import { Vigencias } from './vigencias.js'
import { Contatos } from './contatos.js'
import { Administradora } from './administradora.js'
import { Checkbox } from './checkbox.js'

var spread

Procedimentos.btnAdd.onclick = () => {
    Procedimentos.criarLinha()
}

Vigencias.btnAdd.onclick = () => {
    Vigencias.addVigencia()
}

Contatos.btnAdd.onclick = () => {
    Contatos.addContato()
}

Administradora.select.addEventListener('change', () => {
    if (Administradora.select.value === 'Mount Hermon') {
        Administradora.logoMH.classList.remove('inactive');
        Administradora.logoCompar.classList.add('inactive');
        Administradora.logoClasse.classList.add('inactive');
    } else if (Administradora.select.value === 'Compar') {
        Administradora.logoMH.classList.add('inactive');
        Administradora.logoCompar.classList.remove('inactive');
        Administradora.logoClasse.classList.add('inactive');
    } else if (Administradora.select.value === 'Classe Administradora') {
        Administradora.logoMH.classList.add('inactive');
        Administradora.logoCompar.classList.add('inactive');
        Administradora.logoClasse.classList.remove('inactive');
    } else {
        Administradora.logoMH.classList.add('inactive');
        Administradora.logoCompar.classList.add('inactive');
        Administradora.logoClasse.classList.add('inactive');
    }
}
)

Checkbox.spread.onclick = () => {
    if (Checkbox.spread.checked) {
        Checkbox.spread.value = "Aprovado"
    } else {
        Checkbox.spread.value = "Não aprovado"
    }
}

Checkbox.comissao.onclick = () => {
    if (Checkbox.comissao.checked) {
        Checkbox.comissao.value = "Aprovado"
    } else {
        Checkbox.comissao.value = "Não aprovado"
    }
}

Checkbox.agenciamento.onclick = () => {
    if (Checkbox.agenciamento.checked) {
        Checkbox.agenciamento.value = "Aprovado"
    } else {
        Checkbox.agenciamento.value = "Não aprovado"
    }
}

Checkbox.assOPERADORA.onclick = () => {
    if (Checkbox.assOPERADORA.checked) {
        Checkbox.assOPERADORA.value = "Sim, assinado em:"
        Checkbox.assOPERADORAdata.placeholder = "Data da assinatura (dd/mm/AAAA)"
    } else {
        Checkbox.assOPERADORA.value = "Não. Previsão de assinatura:"
        Checkbox.assOPERADORAdata.placeholder = "Previsão da assinatura (dd/mm/AAAA)"
    }
}

Checkbox.assADM.onclick = () => {
    if (Checkbox.assADM.checked) {
        Checkbox.assADM.value = "Sim, assinado em:"
        Checkbox.assADMdata.placeholder = "Data da assinatura (dd/mm/AAAA)"
    } else {
        Checkbox.assADM.value = "Não. Previsão de assinatura:"
        Checkbox.assADMdata.placeholder = "Previsão da assinatura (dd/mm/AAAA)"
    }
}


document.addEventListener('click', function (e) {
    if (e.target && e.target.classList.contains('button-remove')) {
        // Encontra o elemento da linha a ser removido
        var row = e.target.closest('tr');
        // Remove a linha
        row.parentNode.removeChild(row);
    }
});

document.addEventListener('click', function (e) {
    if (e.target && e.target.classList.contains('button-duplicar')) {
        // Encontra o elemento da linha a ser removido
        duplicar()
    }
});

$("#button-add-entidade").click(function () {
    adicionarEntidade();
});


function adicionarEntidade() {
    var newRow = $("#entidades tbody tr:first").clone();
    newRow.find("input[type=text]").val("");
    newRow.find("select").val("");
    newRow.find("#outraentidade").addClass("inactive");
    $("#entidades tbody").append(newRow);

    // Associar função de seleção de entidade ao campo recém-criado
    newRow.find("select").change(function () {
        preencherCampos($(this).closest("tr"));
    });
}

// Chamada inicial da função para a linha existente
preencherCampos($("#entidades tbody tr:first"));

function preencherCampos(entidadeRow) {
    var selectedValue = entidadeRow.find("select").val();
    var descricao = "";
    var publico = "";
    var documentos = "";
    var taxa = "";

    switch (selectedValue) {
        case "ABRAER":
            descricao = "Associação Brasileira dos Estudantes do Ensino Regular";
            publico = "Estudantes do Ensino Regular";
            documentos = "Comprovante de Matrícula atual ou declaração da Instituição de Ensino Timbrada/Carimbada(Original) e ficha de Filiação Obrigatória.";
            taxa = "R$ 5,00";
            break;
        case "ABRAPPPE":
            descricao = "Associação dos Profissionais Provedores do Protocolo Pediasuit";
            publico = "Estudantes do Ensino Superior";
            documentos = "RG, CPF, Comprovante de residência, CTPS, Contracheque ou Carteira comprovando que é funcionário de Orgão Público";
            taxa = "R$ 5,00";
            break;
        case "IBEES":
            descricao = "Instituto Brasileiro dos Estudantes do Ensino Superior";
            publico = "Estudantes do Ensino Superior";
            documentos = "Comprovante de Matrícula atual ou declaração da Instituição de Ensino Timbrada/Carimbada(Original) e ficha de Filiação Obrigatória.";
            taxa = "R$ 5,00";
            break;
        case "INCAPEB":
            descricao = "Cabeleireiros e Profissionais da Estética e Beleza";
            publico = "Cabeleireiros e Profissionais da Estética e Beleza";
            documentos = "Comprovante de atuação como profissional da área ou sertificado de curso de aprfeioamento ou qualificação profissional do ramo.";
            taxa = "R$ 5,00";
            break;
        case "INFAP":
            descricao = "Instituto de Formação e Ação em Políticas Sociais para a Cidadania";
            publico = "Profissionais Liberais";
            documentos = "Comprovante através de carteira/registro nos conselhos pertinentes das profissões liberais, Certificado de Conclusão do Curso; Ficha de Filiação Obrigatória.";
            taxa = "R$ 5,00";
            break;
        case "ANACAV":
            descricao = "Associação Nacional Do Comércio Atacadista E Varejista";
            publico = "Comerciantes atacadistas e varejistas";
            documentos = "RG, CPF, Comprovante de residência, CTPS, Contracheque ou Carteira comprovando que é funcionário de Orgão Público";
            taxa = "R$ 5,00";
            break;
        case "Outra":
            entidadeRow.find("#outraentidade").removeClass("inactive");
            break;
    }

    entidadeRow.find("#descricaoentidade").val(descricao);
    entidadeRow.find("#publicoentidade").val(publico);
    entidadeRow.find("#documentosentidade").val(documentos);
    entidadeRow.find("#taxaentidade").val(taxa);
}

$(document).on("change", "select", function () {
    var entidadeRow = $(this).closest("tr");
    var selectedValue = $(this).val();

    if (selectedValue === "Outra") {
        entidadeRow.find("#outraentidade").removeClass("inactive");
    } else {
        entidadeRow.find("#outraentidade").addClass("inactive");
    }

    preencherCampos(entidadeRow);
});


document.addEventListener('click', function (e) {
    if (e.target && e.target.classList.contains('button-remove-plano')) {
        var botao = e.target;
        var tabela = botao.parentNode.parentNode.parentNode.parentNode.parentNode; 
        var tabelaID = tabela.getAttribute("id"); // Obtém o ID da tabela
        excluirPlano(tabelaID)
    }
});
  

function excluirPlano(planoId) {
    // Encontra o plano na lista de planos pelo ID
    var plano = document.getElementById(planoId);    
    plano.remove()
    atualizarIDs();
}

var buttonAddPlanos = document.getElementById('button-add-planos')
buttonAddPlanos.addEventListener('click', adicionarPlano)

//var contadorPlano = 1;
function atualizarIDs() {
    var planos = document.getElementsByClassName('plano');
    var counterPlanos = document.getElementsByClassName('counterPlanos')[0];
    for (var i = 0; i < planos.length; i++) {
        var plano = planos[i];
        var id = 'plano-' + (i + 1);
        plano.setAttribute('id', id);
    }
    var idPlanoInput = document.getElementsByClassName('idPlano')
    for (var y = 0; y < idPlanoInput.length; y++){
        var idPlano = idPlanoInput[y];
        idPlano.setAttribute('value', y + 1);
        counterPlanos.setAttribute('value', y + 1);
    }
    var idProcedimentos = document.getElementsByClassName('tabelaProcedimentos');
    for (var x = 0; x < idProcedimentos.length; x++){
        var Procedimento = idProcedimentos[x];
        var id = 'Procedimentos-'+ (x + 1);
        Procedimento.setAttribute('id', id);
    }
    counterPlanos.setAttribute('value', idPlanoInput.length);
}

function adicionarPlano() {
    var planosContainer = document.getElementById("planos")
    var novoPlano = document.createElement("table");
    novoPlano.className = "plano"
    novoPlano.id = 'plano';
    novoPlano.innerHTML = `<input type="hidden" name="idPlano" class="idPlano" for="idPlano" value="plano-1">
    <thead>
        <tr>
            <th colspan="6">
                <div class="input-wrapper">
                    <label for="nomeplano">Nome do Plano</label>
                    <input 
                    type="text" 
                    name="nomeplano" 
                    id="nomeplano"
                    placeholder="Nome do plano"
                    required>
                </div>
            </th>
            <th colspan="2">
                <div class="input-wrapper">
                    <label for="ansplano">ANS</label>
                    <input 
                    type="text" 
                    name="ansplano" 
                    id="ansplano"
                    required>
                </div>
            </th>
        </tr>

        <tr>
            <td colspan="2">
                <div class="input-wrapper">
                    <label for="contratoplano">Contratação</label>
                    <select name="contratoplano" id="contratoplano" required>
                        <option value="" disabled selected hidden>Selecionar</option>
                        <option value="Individual">Individual ou familiar</option>
                        <option value="Empresarial">Coletivo empresarial</option>
                        <option value="Adesão">Coletivo por adesão</option>
                    </select>
                </div>
                <div class="input-wrapper">
                    <label for="cooparticipacao">Cooparticipação</label>
                    <select name="cooparticipacao" id="cooparticipacao" required>
                        <option value="" disabled selected hidden>Selecionar</option>
                        <option value="Com Cooparticipação">Com Cooparticipação</option>
                        <option value="Sem cooparticipação">Sem Cooparticipação</option>
                    </select>
                </div>
            </td>
            <td colspan="3">
                <div class="input-wrapper">
                    <label for="coberturaplano">Cobertura</label>
                    <select name="coberturaplano" id="coberturaplano" required>
                        <option value="" disabled selected hidden>Selecionar</option>
                        <option value="Ambulatorial">Ambulatorial</option>
                        <option value="Ambulatorial + Hospitalar COM obstetrícia">Ambulatorial + Hospitalar COM obstetrícia</option>
                        <option value="Ambulatorial + Hospitalar COM obstetrícia + Odontológico">Ambulatorial + Hospitalar COM obstetrícia + Odontológico</option>
                        <option value="Ambulatorial + Hospitalar SEM obstetrícia">Ambulatorial + Hospitalar SEM obstetrícia</option>
                        <option value="Ambulatorial + Hospitalar SEM obstetrícia + Odontológico">Ambulatorial + Hospitalar SEM obstetrícia + Odontológico</option>
                        <option value="Ambulatorial + Odontológico">Ambulatorial + Odontológico</option>
                        <option value="Hospitalar COM obstetrícia">Hospitalar COM obstetrícia</option>
                        <option value="Hospitalar COM obstetrícia + Odontológico">Hospitalar COM obstetrícia + Odontológico</option>
                        <option value="Hospitalar SEM obstetrícia">Hospitalar SEM obstetrícia</option>
                        <option value="Hospitalar SEM obstetrícia + Odontológico">Hospitalar SEM obstetrícia + Odontológico</option>
                        <option value="Odontológico">Odontológico</option>
                    </select>
                </div>

                <div class="acomodacao">
                    <label for="acomodacaoplano">Acomodação</label>
                    <select name="acomodacaoplano" id="acomodacaoplano" required>
                        <option value="" disabled selected hidden>Selecionar</option>
                        <option value="Enfermaria">Enfermaria</option>
                        <option value="Apartamento">Apartamento</option>
                    </select>
                </div>
            </td>
            <td colspan="3">
                <div class="input-wrapper">
                    <label for="abrangenciaplano">Abrangência</label>
                    <select name="abrangenciaplano" id="abrangenciaplano" required>
                        <option value="" disabled selected hidden>Selecionar</option>
                        <option value="Nacional">Nacional</option>
                        <option value="Grupo de estados">Grupo de estados</option>
                        <option value="Estadual">Estadual</option>
                        <option value="Grupo de municípios">Grupo de municípios</option>
                        <option value="Municipal">Municipal</option>
                    </select>
                </div>
            </td>
        </tr>

        <tr>
            <td colspan="100%">
                <h3>área de Abrangência</h3>
            </td>
        </tr>

        <tr>
            <td colspan="100%" style="padding-top: .5rem;">
                <textarea name="areaabrangencia" id="areaabrangencia" style="width: 100%; height: 5rem; resize: vertical;" placeholder="Insira as localidades (se não se aplicar, deixe em branco)"></textarea>
            </td>
        </tr>
    </thead>

    <tbody class="tabelaProcedimentos" id="Procedimentos-1">
        <tr>
            <th scope="col" colspan="100%">
                <h3>procedimentos</h3>
            </th>
        </tr>

        <tr>
            <th scope="col" colspan="1">
                <h2>Descrição dos procedimentos</h2>
            </th>
            <th scope="col" colspan="3">
                <h2>Coparticipação</h2>
            </th>
            <th scope="col" colspan="1">
                <h2>Limite Carência (dias)</h2>
            </th>
            <th scope="col" colspan="1">
                <h2>Redução de carências</h2>
            </th>
            <th scope="col" colspan="1">
                <h2>Congêneres</h2>
            </th>
            <th scope="col" colspan="1">
                <h2>Excluir</h2>
            </th>
        </tr>

        <tr class="procedimento">
            <td colspan="1" style="padding-top: .5rem;">
                <div class="hide" id="idPlano" value=""></div>
                <textarea name="procedimentodescricao" id="procedimentodescricao" required></textarea>
            </td>

            <td colspan="1" style="padding-top: .5rem;">
                <input 
                type="number" 
                name="procedimentocopay" 
                id="procedimentocopay"
                placeholder="Valor (%)"
                required>
            </td>

            <td colspan="1" style="padding-top: .5rem;">
                <label for="limite" class="inactive">Limite</label>
                <input 
                type="number" 
                name="procedimentolimitecopay" 
                id="procedimentolimitecopay"
                placeholder="Limite (R$)"
                required>
            </td>

            <td colspan="1" style="padding-top: .5rem;">
                <label for="franquia" class="inactive">Franquia</label>
                <input 
                type="text" 
                name="procedimentofranquiacopay" 
                id="procedimentofranquiacopay"
                placeholder="Franquia (R$)"
                title="Caso não haja, deixe em branco ou preencha com '0'"
                required>
            </td>

            <td colspan="1" style="padding-top: .5rem;">
                <input 
                    type="number" 
                    name="procedimentolimitecarencia" 
                    id="procedimentolimitecarencia"
                    required>
            </td>

            <td colspan="1" style="padding-top: .5rem;">
                <textarea name="procedimentoreducaocarencia" id="procedimentoreducaocarencia" placeholder="Condições de redução..."></textarea>
            </td>

            <td colspan="1" style="padding-top: .5rem;">
                <textarea name="procedimentocongenere" id="procedimentocongenere" placeholder="Condições de congêneres..."></textarea>
            </td>
            <td colspan="1" style="padding-top: .5rem;">
                <div class="button-remove" title="Remover procedimento(s)"
                style="margin: auto;">&times</div>
            </td>
        </tbody>
        <tbody>    
        </tr>
        </div>

        <tr>
            <td colspan="100%">
                <div class="novoprocedimento">
                    <button class="button-add" id="pitico" type="button"> + </button>
                    <p>Adicionar procedimento</p>
                </button>
                </div>
            </td>
        </tr>
        </div>

        <tr>
            <td scope="col" colspan="100%">
                <h3>dependentes</h3>
            </td>
        </tr>

        <tr class="dependentes">
            <th scope="col" colspan="2"><h2>Parentesco</h2></th>
            <th scope="col" colspan="3"><h2>Condições</h2></th>
            <th scope="col" colspan="3"><h2>Documentos</h2></th>
        </tr>

        <tr>
            <td colspan="2" style="padding-top: .5rem;">
                <h2>
                    Cônjuges
                </h2>
            </td>

            <td colspan="3" style="padding-top: .5rem;">
                <input 
                type="text" 
                name="condicoesdependentes_conjuge" 
                id="condicoesdependentes_conjuge"
                placeholder="Condições"
                title="Caso não haja, deixe em branco."
                >
            </td>

            <td colspan="3" style="padding-top: .5rem;">
                <input 
                type="text" 
                name="documentosdependentes_conjuge" 
                id="documentosdependentes_conjuge"
                placeholder="Documentos"
                title="Caso não haja, deixe em branco."
                >
            </td>
        </tr>

        <tr>
            <td colspan="2">
                <h2>
                    Filhos
                </h2>
            </td>

            <td colspan="3">
                <input 
                type="text" 
                name="condicoesdependentes_filhos" 
                id="condicoesdependentes_filhos"
                placeholder="Condições"
                title="Caso não haja, deixe em branco."
                >
            </td>

            <td colspan="3">
                <input 
                type="text" 
                name="documentosdependentes_filhos" 
                id="documentosdependentes_filhos"
                placeholder="Documentos"
                title="Caso não haja, deixe em branco."
                >
            </td>
        </tr>

        <tr>
            <td colspan="2">
                <h2>
                    Netos
                </h2>
            </td>

            <td colspan="3">
                <input 
                type="text" 
                name="condicoesdependentes_netos" 
                id="condicoesdependentes_netos"
                placeholder="Condições"
                title="Caso não haja, deixe em branco."
                >
            </td>

            <td colspan="3">
                <input 
                type="text" 
                name="documentosdependentes_netos" 
                id="documentosdependentes_netos"
                placeholder="Documentos"
                title="Caso não haja, deixe em branco."
                >
            </td>
        </tr>

        <tr>
            <td colspan="2">
                <h2>
                    Pais
                </h2>
            </td>

            <td colspan="3">
                <input 
                type="text" 
                name="condicoesdependentes_pais" 
                id="condicoesdependentes_pais"
                placeholder="Condições"
                title="Caso não haja, deixe em branco."
                >
            </td>

            <td colspan="3">
                <input 
                type="text" 
                name="documentosdependentes_pais" 
                id="documentosdependentes_pais"
                placeholder="Documentos"
                title="Caso não haja, deixe em branco."
                >
            </td>
        </tr>

        <tr>
            <td colspan="2">
                <h2>
                    Outros
                </h2>
            </td>

            <td colspan="3">
                <input 
                type="text" 
                name="condicoesdependentes_outros" 
                id="condicoesdependentes_outros"
                placeholder="Condições"
                title="Caso não haja, deixe em branco."
                >
            </td>

            <td colspan="3">
                <input 
                type="text" 
                name="documentosdependentes_outros" 
                id="documentosdependentes_outros"
                placeholder="Documentos"
                title="Caso não haja, deixe em branco."
                >
            </td>
        </tr>

        <tr>
            <th scope="col" colspan="100%">
                <h3>
                    tabela de preços
                </h3>
            </th>
        </tr>

        <tr class="tabelaprecos">
            <th scope="col" colspan="4">
                <h2>
                    Faixa etária
                </h2>
            </th>

            <th scope="col" colspan="4">
                <h2>
                    Valor (%)
                </h2>
            </th>
        </tr>

        <tr>
            <td colspan="4">
                <h2>
                    00-18
                </h2>
            </td>
            <td colspan="4">
                <input 
                type="number" 
                name="fxetaria1" 
                id="fxetaria1"
                >
            </td>
        </tr>

        <tr>
            <td colspan="4">
                <h2>
                    19-23
                </h2>
            </td>
            <td colspan="4">
                <input 
                type="number" 
                name="fxetaria2" 
                id="fxetaria2"
                >
            </td>
        </tr>

        <tr>
            <td colspan="4">
                <h2>
                    24-28
                </h2>
            </td>
            <td colspan="4">
                <input 
                type="number" 
                name="fxetaria3" 
                id="fxetaria3"
                >
            </td>
        </tr>

        <tr>
            <td colspan="4">
                <h2>
                    29-33
                </h2>
            </td>
            <td colspan="4">
                <input 
                type="number" 
                name="fxetaria4" 
                id="fxetaria4"
                >
            </td>
        </tr>

        <tr>
            <td colspan="4">
                <h2>
                    34-38
                </h2>
            </td>
            <td colspan="4">
                <input 
                type="number" 
                name="fxetaria5" 
                id="fxetaria5"
                >
            </td>
        </tr>

        <tr>
            <td colspan="4">
                <h2>
                    39-43
                </h2>
            </td>
            <td colspan="4">
                <input 
                type="number" 
                name="fxetaria6" 
                id="fxetaria6"
                >
            </td>
        </tr>

        <tr>
            <td colspan="4">
                <h2>
                    44-48
                </h2>
            </td>
            <td colspan="4">
                <input 
                type="number" 
                name="fxetaria7" 
                id="fxetaria7"
                >
            </td>
        </tr>

        <tr>
            <td colspan="4">
                <h2>
                    49-53
                </h2>
            </td>
            <td colspan="4">
                <input 
                type="number" 
                name="fxetaria8" 
                id="fxetaria8"
                >
            </td>
        </tr>

        <tr>
            <td colspan="4">
                <h2>
                    54-58
                </h2>
            </td>
            <td colspan="4">
                <input 
                type="number" 
                name="fxetaria9" 
                id="fxetaria9"
                >
            </td>
        </tr>

        <tr>
            <td colspan="4">
                <h2>
                    59+
                </h2>
            </td>
            <td colspan="4">
                <input 
                type="number" 
                name="fxetaria10" 
                id="fxetaria10"
                >
            </td>
        </tr>

        <tr>
            <td colspan="100%">
                <h3>Observações sobre o plano</h3>
            </td>
        </tr>

        <tr>
            <td colspan="100%" style="padding-top: .5rem;">
                <textarea name="planoobs" id="planoobs" style="width: 100%; height: 5rem; resize: vertical;" placeholder="Escreva aqui..."></textarea>
            </td>
        </tr>

        <tr>
            <td colspan="4">
                <div class="duplicarplano" style="margin-top: 2rem;">
                    <button type="button" id="duplicarPlano" class="button-duplicar" title="Duplicar plano" data-plano-id="plano-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-copy"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path></svg>
                    </button>
                    <p>Duplicar este plano</p>
                </div>
            </td>

            <td colspan="4">
                <div class="excluirplano" id="excluirplano" style="margin-top: 2rem;">
                    <button type="button" class="button-remove-plano" id="button-remove-plano" title="Remover plano">&times</button>
                    <p>
                        Excluir este plano
                    </p>
                </div>
            </td>
            </div>
        </tr>
    </tbody>`;
    planosContainer.appendChild(novoPlano);
    /* const removeButton = novoPlano.querySelector('#button-remove-plano');
    removeButton.addEventListener('click', function () {
        novoPlano.remove()
    }); */
    var buttonAddProcedimentos = novoPlano.querySelector('#pitico')
    var ProcedimentosNovoPlano = novoPlano.querySelector('.tabelaProcedimentos')
    buttonAddProcedimentos.addEventListener('click', criarLinha)
    function criarLinha() {
        const novaLinha = document.createElement('tr');
        novaLinha.classList.add('procedimento');

        novaLinha.innerHTML = `
    <td colspan="1" style="padding-top: .5rem;">
    <div class="hide" id="idPlano" value=""></div>
    <textarea name="procedimentodescricao" id="procedimentodescricao"></textarea>
  </td>

  <td colspan="1" style="padding-top: .5rem;">
    <input 
    type="number" 
    name="procedimentocopay" 
    id="procedimentocopay"
    placeholder="% Copay"
    null>
  </td>

  <td colspan="1" style="padding-top: .5rem;">
    <label for="limite" class="inactive">Limite</label>
    <input 
    type="number" 
    name="procedimentolimitecopay" 
    id="procedimentolimitecopay"
    placeholder="Limite (R$)"
    null>
  </td>

  <td colspan="1" style="padding-top: .5rem;">
    <label for="franquia" class="inactive">Franquia</label>
    <input 
    type="text" 
    name="procedimentofranquiacopay" 
    id="procedimentofranquiacopay"
    placeholder="Franquia (R$)"
    title="Caso não haja, deixe em branco ou preencha com '0'">
  </td>

  <td colspan="1" style="padding-top: .5rem;">
    <input 
        type="number" 
        name="procedimentolimitecarencia" 
        id="procedimentolimitecarencia"
        null>
  </td>

  <td colspan="1" style="padding-top: .5rem;">
    <textarea name="procedimentoreducaocarencia" id="procedimentoreducaocarencia" placeholder="Condições de redução..."></textarea>
  </td>

  <td colspan="1" style="padding-top: .5rem;">
    <textarea name="procedimentocongenere" id="procedimentocongenere" placeholder="Condições de congêneres..."></textarea>
  </td>
  <td colspan="1" style="padding-top: .5rem;">
    <div class="button-remove" title="Remover procedimento(s)"
    style="margin: auto;">&times</div>
  </td>
  `;
        ProcedimentosNovoPlano.appendChild(novaLinha)
        
    }
    var botaoDuplicarPlano = novoPlano.querySelector('#duplicarPlano')
    botaoDuplicarPlano.addEventListener('click', duplicarPlano)
    atualizarIDs();
}


var botaoDuplicarPlano = document.querySelector('#duplicarPlano')
botaoDuplicarPlano.addEventListener('click', duplicarPlano)



// Função para duplicar a tabela
// Função para duplicar a tabela
function duplicarPlano() {
    const tabelaOriginal = document.getElementById('plano-1');

    // Obtém os valores dos campos preenchidos
    const valores = Array.from(tabelaOriginal.querySelectorAll('input, select, textarea')).map((campo) => campo.value);

    // Cria uma cópia da tabela
    const tabelaCopia = tabelaOriginal.cloneNode(true);

    // Atualiza os valores dos campos na tabela copiada
    const camposCopiados = tabelaCopia.querySelectorAll('input, select, textarea');
    camposCopiados.forEach((campo, index) => {
    campo.value = valores[index];
    });

    // Adiciona a tabela copiada após a tabela original
    tabelaOriginal.parentNode.insertBefore(tabelaCopia, tabelaOriginal.nextSibling);
    var buttonAddProcedimentos = tabelaCopia.querySelector('#pitico')
    var ProcedimentosNovoPlano = tabelaCopia.querySelector('.tabelaProcedimentos')
    buttonAddProcedimentos.addEventListener('click', criarLinha)
    function criarLinha() {
        const novaLinha = document.createElement('tr');
        novaLinha.classList.add('procedimento');

        novaLinha.innerHTML = `
    <td colspan="1" style="padding-top: .5rem;">
    <div class="hide" id="idPlano" value=""></div>
    <textarea name="procedimentodescricao" id="procedimentodescricao"></textarea>
  </td>

  <td colspan="1" style="padding-top: .5rem;">
    <input 
    type="number" 
    name="procedimentocopay" 
    id="procedimentocopay"
    placeholder="% Copay"
    null>
  </td>

  <td colspan="1" style="padding-top: .5rem;">
    <label for="limite" class="inactive">Limite</label>
    <input 
    type="number" 
    name="procedimentolimitecopay" 
    id="procedimentolimitecopay"
    placeholder="Limite (R$)"
    null>
  </td>

  <td colspan="1" style="padding-top: .5rem;">
    <label for="franquia" class="inactive">Franquia</label>
    <input 
    type="text" 
    name="procedimentofranquiacopay" 
    id="procedimentofranquiacopay"
    placeholder="Franquia (R$)"
    title="Caso não haja, deixe em branco ou preencha com '0'">
  </td>

  <td colspan="1" style="padding-top: .5rem;">
    <input 
        type="number" 
        name="procedimentolimitecarencia" 
        id="procedimentolimitecarencia"
        null>
  </td>

  <td colspan="1" style="padding-top: .5rem;">
    <textarea name="procedimentoreducaocarencia" id="procedimentoreducaocarencia" placeholder="Condições de redução..."></textarea>
  </td>

  <td colspan="1" style="padding-top: .5rem;">
    <textarea name="procedimentocongenere" id="procedimentocongenere" placeholder="Condições de congêneres..."></textarea>
  </td>
  <td colspan="1" style="padding-top: .5rem;">
    <div class="button-remove" title="Remover procedimento(s)"
    style="margin: auto;">&times</div>
  </td>
  `;
        ProcedimentosNovoPlano.appendChild(novaLinha)
        
    }
    var botaoDuplicarPlano = tabelaCopia.querySelector('#duplicarPlano')
    botaoDuplicarPlano.addEventListener('click', duplicarPlano)
    atualizarIDs();
}


/* MÁSCARAS DE INPUT */

/* identificação da operadora */
new Cleave('#cnpj', {
    delimiters: ['.', '.', '/', '-'],
    blocks: [2, 3, 3, 4, 2],
    numericOnly: true
});

new Cleave('#ans', {
    delimiters: ['-'],
    blocks: [5, 1],
    numericOnly: true
});

new Cleave('#cep', {
    delimiters: ['-'],
    blocks: [5, 3],
    numericOnly: true
});

new Cleave('#atendimento', {
    /* phone: true,
    phoneRegionCode: 'BR', */
    numericOnly: true,
    prefix: '(',
    delimiters: [') ', '-'],
    blocks: [3, 5, 4]
});

new Cleave('#ouvidoria', {
    /* phone: true,
    phoneRegionCode: 'BR', */
    numericOnly: true,
    prefix: '(',
    delimiters: [') ', '-'],
    blocks: [3, 5, 4]
});

/* planos */
new Cleave('#ansplano', {
    delimiters: ['.', '/', '-'],
    blocks: [3, 3, 2, 1],
    numericOnly: true
});


/* contato */
new Cleave('#telcontato', {
    /* phone: true,
    phoneRegionCode: 'BR', */
    numericOnly: true,
    prefix: '(',
    delimiters: [') ', '-'],
    blocks: [3, 5, 4]
});

function showAlert(message) {
    var modal = document.getElementById("myModal");
    var modalMessage = document.getElementById("modal-message");
    var closeBtn = document.getElementsByClassName("close")[0];
    var okBtn = document.getElementById("modal-ok-button"); // Adicionado
  
    modal.style.display = "block";
    modalMessage.innerHTML = message;
  
    closeBtn.onclick = function () {
      modal.style.display = "none";
    };
  
    okBtn.onclick = function () { // Adicionado
      modal.style.display = "none";
    };
  
    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    };
  }
 
  
  
 
  



var dadosAddOperadora;
var dadosAddContatos;
var dadosAddPlanos;
var dadosAddEntidades;
var dadosAddVigencias;
var dadosAddGerais;
var dadosAddComerciais;
var dadosAddProcedimentos;


var addRegistroBotao = document.getElementById('previa');
addRegistroBotao.addEventListener('click', function (e) {
    e.preventDefault();

    // Função para verificar os campos obrigatórios antes de prosseguir para a próxima função
    function verificarCamposObrigatorios() {
        var camposRequired = document.querySelectorAll("#fino [required]");
        var todosPreenchidos = true;

        camposRequired.forEach(function(campo) {
            if (!campo.value) {
                todosPreenchidos = false;
                campo.classList.add("campo-vazio"); // Adiciona uma classe CSS para realçar o campo inválido
            } else {
                campo.classList.remove("campo-vazio"); // Remove a classe CSS caso o campo tenha sido preenchido
            }
        });

        if (!todosPreenchidos) {
            showAlert("Por favor, preencha todos os campos obrigatórios.");
            return Promise.reject(); // Rejeita a Promise para interromper a execução das funções subsequentes
        }

        return Promise.resolve(); // Resolve a Promise para continuar para a próxima função
    }

    var functions = [
        verificarCamposObrigatorios,
        addOperadora,
        addContatos,
        addVigencias,
        addDadosComerciais,
        addPlano,
        addEntidades,
        addDadosGerais, 
        enviarDados
    ];
    // Função para executar as funções sequencialmente usando Promises
    function executeSequentiallyPromises(functions) {
        return functions.reduce(function (promise, func) {
            return promise.then(func);
        }, Promise.resolve());
    }
    // Função para testar erros nas demais funções
    /* function executeSequentiallyPromises(functions) {
        return functions.reduce(function (promise, func) {
          return promise.then(func).catch(function (error) {
            console.error("Erro em uma das funções:", error);
          });
        }, Promise.resolve());
    } */
    

    // Executar as funções sequencialmente
    executeSequentiallyPromises(functions)
    .then(function () {
        var dominio = window.location.host;
        var protocolo = window.location.protocol;
        var link = protocolo + '//' + dominio + '/renderizar';
        window.open(link, '_blank');
    })
});



function addOperadora () {
    var tabelaInicial = document.getElementById('dadosiniciais')
    var tabelaDados = document.getElementById('operadora')
    var tabelaResponsavel = document.getElementById('responsavel')
    var operadora = {
        administradora: tabelaInicial.querySelector('#administradora').value,
        modelo: tabelaInicial.querySelector('#estipulante').value,
        razaosocial: tabelaDados.querySelector('#razaosocial').value,
        cnpj: tabelaDados.querySelector('#cnpj').value,
        nomefantasia: tabelaDados.querySelector('#nomefantasia').value,
        ans: tabelaDados.querySelector('#ans').value,
        endereco: tabelaDados.querySelector('#endereco').value,
        numeroendereco: tabelaDados.querySelector('#numeroendereco').value,
        complementoendereco: tabelaDados.querySelector('#complementoendereco').value,
        cidade: tabelaDados.querySelector('#cidade').value,
        cep: tabelaDados.querySelector('#cep').value,
        estado: tabelaDados.querySelector('#estado').value,
        site: tabelaDados.querySelector('#site').value,
        atendimento: tabelaDados.querySelector('#atendimento').value,
        ouvidoria: tabelaDados.querySelector('#ouvidoria').value,
        nomeresponsavel: tabelaResponsavel.querySelector('#nomeresponsavel').value,
        localresponsavel: tabelaResponsavel.querySelector('#localresponsavel').value,
        dataresponsavel: tabelaResponsavel.querySelector('#dataresponsavel').value
    }
    dadosAddOperadora = operadora

}

function addPlano (){
    const counterIdPlano = parseInt(document.getElementsByClassName('counterPlanos')[0].value, 10)
    const planos = [];
    const procedimentosConjunto = [];
    for (let i = 1; i <= counterIdPlano; i++){
        var idPlano = 'plano-' + i.toString();
        var tabelaAtual = document.getElementById(idPlano);
        var plano = {
            idPlano: 'Procedimentos-' + i,
            nomeplano: tabelaAtual.querySelector('#nomeplano').value,
            ansplano: tabelaAtual.querySelector('#ansplano').value,
            contratoplano: tabelaAtual.querySelector('#contratoplano').value,
            coberturaplano: tabelaAtual.querySelector('#coberturaplano').value,
            abrangenciaplano: tabelaAtual.querySelector('#abrangenciaplano').value,
            areaabrangencia: tabelaAtual.querySelector('#areaabrangencia').value,
            acomodacaoplano: tabelaAtual.querySelector('#acomodacaoplano').value,
            cooparticipacao: tabelaAtual.querySelector('#cooparticipacao').value,
            condicoesdependentes_conjuge: tabelaAtual.querySelector('#condicoesdependentes_conjuge').value,
            documentosdependentes_conjuge: tabelaAtual.querySelector('#documentosdependentes_conjuge').value,
            condicoesdependentes_filhos: tabelaAtual.querySelector('#condicoesdependentes_filhos').value,
            documentosdependentes_filhos: tabelaAtual.querySelector('#documentosdependentes_filhos').value,
            condicoesdependentes_netos: tabelaAtual.querySelector('#condicoesdependentes_netos').value,
            documentosdependentes_netos: tabelaAtual.querySelector('#documentosdependentes_netos').value,
            condicoesdependentes_pais: tabelaAtual.querySelector('#condicoesdependentes_pais').value,
            documentosdependentes_pais: tabelaAtual.querySelector('#documentosdependentes_pais').value,
            condicoesdependentes_outros: tabelaAtual.querySelector('#condicoesdependentes_outros').value,
            documentosdependentes_outros: tabelaAtual.querySelector('#documentosdependentes_outros').value,
            fxetaria1: Number(tabelaAtual.querySelector('#fxetaria1').value).toFixed(2),
            fxetaria2: Number(tabelaAtual.querySelector('#fxetaria2').value).toFixed(2),
            fxetaria3: Number(tabelaAtual.querySelector('#fxetaria3').value).toFixed(2),
            fxetaria4: Number(tabelaAtual.querySelector('#fxetaria4').value).toFixed(2),
            fxetaria5: Number(tabelaAtual.querySelector('#fxetaria5').value).toFixed(2),
            fxetaria6: Number(tabelaAtual.querySelector('#fxetaria6').value).toFixed(2),
            fxetaria7: Number(tabelaAtual.querySelector('#fxetaria7').value).toFixed(2),
            fxetaria8: Number(tabelaAtual.querySelector('#fxetaria8').value).toFixed(2),
            fxetaria9: Number(tabelaAtual.querySelector('#fxetaria9').value).toFixed(2),
            fxetaria10: Number(tabelaAtual.querySelector('#fxetaria10').value).toFixed(2),
            fxetaria1spread: (Number(Math.ceil(Number(tabelaAtual.querySelector('#fxetaria1').value) * spread * 100) / 100).toFixed(2)).toString(),
            fxetaria2spread: (Number(Math.ceil(Number(tabelaAtual.querySelector('#fxetaria2').value) * spread * 100) / 100).toFixed(2)).toString(),
            fxetaria3spread: (Number(Math.ceil(Number(tabelaAtual.querySelector('#fxetaria3').value) * spread * 100) / 100).toFixed(2)).toString(),
            fxetaria4spread: (Number(Math.ceil(Number(tabelaAtual.querySelector('#fxetaria4').value) * spread * 100) / 100).toFixed(2)).toString(),
            fxetaria5spread: (Number(Math.ceil(Number(tabelaAtual.querySelector('#fxetaria5').value) * spread * 100) / 100).toFixed(2)).toString(),
            fxetaria6spread: (Number(Math.ceil(Number(tabelaAtual.querySelector('#fxetaria6').value) * spread * 100) / 100).toFixed(2)).toString(),
            fxetaria7spread: (Number(Math.ceil(Number(tabelaAtual.querySelector('#fxetaria7').value) * spread * 100) / 100).toFixed(2)).toString(),
            fxetaria8spread: (Number(Math.ceil(Number(tabelaAtual.querySelector('#fxetaria8').value) * spread * 100) / 100).toFixed(2)).toString(),
            fxetaria9spread: (Number(Math.ceil(Number(tabelaAtual.querySelector('#fxetaria9').value) * spread * 100) / 100).toFixed(2)).toString(),
            fxetaria10spread: (Number(Math.ceil(Number(tabelaAtual.querySelector('#fxetaria10').value) * spread * 100) / 100).toFixed(2)).toString(),
            planoobs: tabelaAtual.querySelector('#planoobs').value,
            };
        planos.push(plano);
        var idProcedimento = 'Procedimentos-' + i.toString();
        var tabelaProcedimento = document.querySelector('#Procedimentos-'+ i);
        var linhas = tabelaProcedimento.querySelectorAll('.procedimento');
        var procedimentos = [];
        linhas.forEach(function(linha) {
        var procedimento = {
            idPlanoProcedimento: idProcedimento,
            procedimentodescricao: linha.querySelector('textarea[name="procedimentodescricao"]').value,
            procedimentocopay: linha.querySelector('input[name="procedimentocopay"]').value,
            procedimentolimitecarencia: linha.querySelector('input[name="procedimentolimitecarencia"]').value,
            procedimentoreducaocarencia: linha.querySelector('textarea[name="procedimentoreducaocarencia"]').value,
            procedimentocongenere: linha.querySelector('textarea[name="procedimentocongenere"]').value
        };
        procedimentos.push(procedimento);
        });
        procedimentosConjunto.push(procedimentos)
    }
    dadosAddPlanos = planos
    dadosAddProcedimentos = procedimentosConjunto
}

function addEntidades() {
    const tabela = document.querySelector('[data-table-id="entidades"]');
    const counterEntidades = tabela.rows.length - 1;
    const entidades = [];
    for (let i = 1; i <= counterEntidades; i++) {
      const linha = tabela.rows[i];
      var nomeEntidade;
      var entidadeNomeCheck = linha.querySelector('[name="nomeentidade"]').value
      if (entidadeNomeCheck === "Outra"){
        nomeEntidade = linha.querySelector('[name="outraentidade"]').value
      } else
      {
        nomeEntidade = linha.querySelector('[name="nomeentidade"]').value
      }
      const entidade = {
        nomeentidade: nomeEntidade,
        descricaoentidade: linha.querySelector('[name="descricaoentidade"]').value,
        publicoentidade: linha.querySelector('[name="publicoentidade"]').value,
        documentosentidade: linha.querySelector('[name="documentosentidade"]').value,
        taxaentidade: linha.querySelector('[name="taxaentidade"]').value
      };
  
      entidades.push(entidade);
    }
    dadosAddEntidades = entidades;
}

function addVigencias() {
    const tabela = document.querySelector('[data-table-id="vigencias"]');
    const counterVigencias = tabela.rows.length - 1;
    const vigencias = [];
    for (let i= 1 ; i <= counterVigencias; i++) {
        const linha = tabela.rows[i];
        const vigencia = {
            fechamentodavenda : linha.querySelector('#newsales').value,
            cancelamento: linha.querySelector('#cancel').value,
            faturamento: linha.querySelector('#faturamento').value,
            aniversariocontrato: linha.querySelector('#birthday').value
        };
        vigencias.push(vigencia);
    }
    dadosAddVigencias = vigencias;
}

function addContatos () {
    const tabelaContatos = document.querySelector('[data-table-id="contato"]');
    const counterContato = tabelaContatos.rows.length - 1;
    const contatos = [];
    for(let i=1; i <= counterContato; i++ ) {
        const linhaContato = tabelaContatos.rows[i];
        const contato = {
            nomecontato: linhaContato.querySelector('#nomecontato').value,
            emailcontato: linhaContato.querySelector('#emailcontato').value,
            telcontato: linhaContato.querySelector('#telcontato').value,
            rolecontato: linhaContato.querySelector('#rolecontato').value
        }
        contatos.push(contato);
    }
    dadosAddContatos = contatos
}

function addDadosGerais () {
    var form = document.querySelector('form');
    var dadosGerais = {
        docoperadora: form.querySelector('[name="docoperadora"]:checked').value,
        enviopropostas: form.querySelector('[name="enviopropostas"]:checked').value,
        layoutpropostas: form.querySelector('[name="layoutpropostas"]').value,
        assOPERADORA: form.querySelector('[name="assOPERADORA"]').value,
        assOPERADORAdata: form.querySelector('[name="assOPERADORAdata"]').value,
        assADM: form.querySelector('[name="assADM"]').value,
        assADMdata: form.querySelector('[name="assADMdata"]').value,
        logooperadora: form.querySelector('[name="logooperadora"]:checked').value,
        manualmarca: form.querySelector('[name="manualmarca"]:checked').value,
        modelodeclaracao: form.querySelector('[name="modelodeclaracao"]:checked').value,
        designobs: form.querySelector('#designobs').value
    }
    dadosAddGerais = dadosGerais;
}

function addDadosComerciais () {
    var tabela = document.querySelector('#condicoescomerciais')
    var dadosComerciais = {
        negspread: tabela.querySelector('[name="negspread"]').value,
        spreadvalor: tabela.querySelector('[name="spreadvalor"]').value,
        negcomissao: tabela.querySelector('[name="negcomissao"]').value,
        comissaovalor: tabela.querySelector('[name="comissaovalor"]').value,
        negagenciamento: tabela.querySelector('[name="negagenciamento"]').value,
        agenciamentovalor: tabela.querySelector('[name="agenciamentovalor"]').value,
        negoutro: tabela.querySelector('[name="negoutro"]').value,
        negoutrovalor: tabela.querySelector('[name="negoutrovalor"').value,
        negobs: tabela.querySelector('[name="negobs"]').value
    }
    spread = Number(((dadosComerciais.spreadvalor)/100)+1);
    dadosAddComerciais = dadosComerciais;
}

function enviarDados () {
    var jsonOperadora = JSON.stringify(dadosAddOperadora)
    var jsonPlanos = JSON.stringify(dadosAddPlanos)
    var jsonEntidades = JSON.stringify(dadosAddEntidades)
    var jsonVigencias = JSON.stringify(dadosAddVigencias)
    var jsonContatos = JSON.stringify(dadosAddContatos)
    var jsonDadosGerais = JSON.stringify(dadosAddGerais)
    var jsonDadosComerciais = JSON.stringify(dadosAddComerciais)
    var jsonDadosProcedimentos = JSON.stringify(dadosAddProcedimentos)
    $.ajax({
        url: '/add-registro',
        type: 'POST',
        header: 'contentType: application/json',
        data: {operadora: jsonOperadora, planos: jsonPlanos, entidades: jsonEntidades, contatos: jsonContatos, vigencias: jsonVigencias, gerais: jsonDadosGerais, comerciais: jsonDadosComerciais, procedimentos: jsonDadosProcedimentos},
        sucess: function (response){
            console.log('JSON enviado com sucesso!', response)
        },
        erros: function(error) {
            console.error('Erro ao enviar o JSON:', error)
        }
    })
}

/* ÁREA DE TESTES */
