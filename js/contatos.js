export const Contatos = {
    btnAdd: document.getElementById('button-add-contato'),
    tabela: document.querySelector('table.contato'),
    addContato() {
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
        Contatos.tabela.appendChild(newTr);
    },
}