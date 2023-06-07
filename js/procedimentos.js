export const Procedimentos = {
    btnAdd: document.querySelector('#pitico'),
    tabela: document.querySelector('.tabelaProcedimentos'),
    criarLinha() {
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
    Procedimentos.tabela.appendChild(novaLinha)
    },
}