const modal = {
    open(){
        document.querySelector('.modal-overlay').classList.add('active')
    },
    close(){
        document.querySelector('.modal-overlay').classList.remove('active')
    }
}

let transactions = [
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
let dom = {

    newtbody(){
        var tbody = document.getElementById('tbody')
        tbody.appendChild(dom.addTransaction())
    }, 

    addTransaction(transaction){
        var tr = document.createElement('tr')
        tr.innerHTML = dom.transactionData(transaction)
        return tr
    },
    transactionData(transaction){
        let html = `                       
            <td>
                ${transactions.description}
            </td>
            <td class="spend">
                -R$ ${transaction.value}
            </td>
            <td>
                ${transaction.date}
            </td>
            <td>
                <img src="assets/minus.svg" alt="remover">
             `
             return html

    }
 
}
dom.addTransaction(transactions[0])