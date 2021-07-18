const modal = {
    open(){
        document.querySelector('.modal-overlay').classList.add('active')
    },
    close(){
        document.querySelector('.modal-overlay').classList.remove('active')
    }
}
var newTransaction;
var gain = 0
var description;
var value;
var amount;
var date;
var spend = 0 
var id = 0

function save(){
    modal.close();

    description = window.document.querySelector('#descripition').value
    
    date = window.document.querySelector('#date').value

    amount = window.document.querySelector('#amount').value
    amount  = amount * 100

    id ++

    newTransaction = createNewTrasation(id,description, amount,reverse(date))

    transactions.push(newTransaction)

    transactions[transactions.length -1].value <= 0 ? spend += newTransaction.value : gain += newTransaction.value
    
    DOM.addTransaction(transactions[transactions.length - 1])

    Transaction.incomes()
    Transaction.spend()
    Transaction.total()
    
}

var transactions = [
    {
        id: 1,
        description: 'Luz',
        value: -50000,
        date: '30/03/2021'
    },
    

]
function createNewTrasation(id=0, description='', value=0, date){
    return{
        id,
        description,
        value,
        date
    }
}


for(key in transactions){
    transactions[key].value <= 0 ?
    spend += transactions[key].value : gain += transactions[key].value
    

}

const Utils = {
    formatCurency(value){
        var formatValue = value / 100
        formatValue = formatValue.toLocaleString('pt-BR',{style: 'currency', currency: 'BRl'})
        return formatValue

    }
}

let Transaction = {
    incomes(){
        // tem a função de somar todas as entradas 
        window.document.querySelector('#amounts').innerHTML = `${Utils.formatCurency(gain)}`
        

    },
    spend(){
        // tem a função de somar todos os gastos
        window.document.querySelector('#spend').innerHTML = (`${Utils.formatCurency(spend)}`)
    },
    total(){
        // tem a função ser o total entre os meus gastos e as minhas entradas
        window.document.querySelector('#total').innerHTML = ` ${Utils.formatCurency(gain+spend)}`
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
                    ${Utils.formatCurency(transaction.value)}
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

Transaction.incomes()
Transaction.spend()
Transaction.total()

for(var cont = 0; cont <= transactions.length; cont ++){
    DOM.addTransaction(transactions[cont])
}
const Form = {
    submit(event){
        event.preventDefault()
    }
}





