const modal = {
    open(){
        document.querySelector('.modal-overlay').classList.add('active')
    },
    close(){
        document.querySelector('.modal-overlay').classList.remove('active')
    }
}

var transactions = [
    {
        id: 1,
        description: 'Luz',
        value: -50000,
        date: '30/03/2021'
    },
    {
        id:2,
        description: 'Criação de Web site',
        value: 500000,
        date:'02/42/2021'
    },
    {
        id:3,
        description: 'Internet',
        value: -20000,
        date:'28/02/2021'
    },
    {
        id: 4,
        description: 'Agua',
        value: -6000,
        date:'28/04/2021'
    },


]

let Transaction = {
    incomes(){
        // tem a função de somar todas as entradas 
    },
    spend(){
        // tem a função de somar todos os gastos
    },
    total(){
        // tem a função ser o total entre os meus gastos e as minhas entradas
    }
}
const DOM = {
    ContainerTransaction: document.querySelector('#data-table tbody'),

    addTransaction(transaction, index){
        const tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHtmlTransaction(transaction)
        DOM.ContainerTransaction.appendChild(tr)
    },
    innerHtmlTransaction(transaction) {
        const Cssclass = transaction.value > 0 ? 'gain' : "spend"
        

        let html = `
                <td>
                    ${transaction.description}
                </td>
                <td class="${Cssclass}">
                    ${transaction.value}
                </td>
                <td>
                    ${transaction.date}
                </td>
                <td>
                    <img src="assets/minus.svg" alt="remover">
                </td>
            
                    `
                    return html
                }
}
for(var cont = 0; cont <= transactions.length; cont ++){
    DOM.addTransaction(transactions[cont])
}
const Utils = {
    formatCurency(value){
        const signal = Number(value < 0 ? '-' : '')
        value = String(value).replace(/\D/g, "")
        value = Number(value) / 100

        value = value.ToLocaleString("pt-BR",{style:"currency",currency:'BRL'})
        return signal + value
    }
}


