export const Vigencias = {
    btnAdd: document.getElementById('button-add-vigencia'),
    tabela: document.querySelector('.vigencias tbody'),
    addVigencia() {
        var newTr = document.createElement('tr');
        newTr.innerHTML = `
        <td>
            <input 
            type="number" 
            name="newsales" 
            id="newsales"
            min="01"
            max="31"
            placeholder="Dia do mês (número)"
            null>
        </td>

        <td>
            <input 
            type="number" 
            name="cancel" 
            id="cancel"
            class="first"
            min="01"
            max="31"
            placeholder="Dia do mês (número)"
            null>
        </td>

        <td>
            <input 
            type="number" 
            name="faturamento" 
            id="faturamento"
            class="first"
            min="01"
            max="31"
            placeholder="Dia do mês (número)"
            null>
        </td>

        <td>
            <input 
            type="text" 
            name="birthday" 
            id="birthday"
            class="first"
            placeholder="Dia e mês do ano"
            null>
        </td>

        <td colspan="10%">
            <div class="button-remove" title="Remover vigência"
            style="margin: auto;">&times</div>
            </td>
        `;
        Vigencias.tabela.appendChild(newTr);
    },
}