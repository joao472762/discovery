let modal = {
    remove(){
        document.querySelector('.modalOverlay').classList.remove('active')
    },
    active(){
        document.querySelector('.modalOverlay').classList.add('active')
    }
}

let transactions =[
    {
        description: 'conta de luz',
        value: -6000,
        date: '03/04/2021'
    },
    {
        description: 'Salário',
        value: +203034,
        date: '03/04/2021'
    },
    {
        description: 'Sitio',
        value: -30000,
        date: '03/04/2021'
    },
]

let Utils = {
    formatCurrency(value){
        value = value / 100

        value = value.toLocaleString('pt-br', {style:'currency', currency:'BRL'})

        return value
    }    
}

let Dom = {
    tbody: document.querySelector('tbody'),

    innerInTbody(transaction){
        let tr = Dom.createTr(transaction)
        Dom.tbody.appendChild(tr)
    },

    createTr(transaction){
        let tr = document.createElement('tr')
        tr.innerHTML = Dom.cotentTr(transaction)
        return tr

    },

    cotentTr(transaction){
        let Class = transaction.value <0 ?'spend' : 'gain'
        let html = 
        `
            <td>${transaction.description}</td>

            <td class='${Class}'>${Utils.formatCurrency(transaction.value)}</td>

            <td>${transaction.date}</td>

            <td><img src="assets/minus.svg" alt=""></td>
                    
    
        `
        return html
    },
    
}

let Status = {

    showAll(){
        Status.showAmount()
        Status.showSpend()
        Status.showTotal()
    },
    showAmount(){

        let {gain} = Status.results()

        document.querySelector('#displayAmount').innerHTML = Utils.formatCurrency(gain)
    },

    showSpend(){
        let {spend} = Status.results()

        document.querySelector("#displaySpends").innerHTML = Utils.formatCurrency(spend)
    },

    showTotal(){
        let {total} = Status.results()

        document.querySelector('#displayTotal').innerHTML = Utils.formatCurrency(total)
    },

    results(){
        let gain = 0 
        let spend = 0
        let total = 0
        for(key in transactions)
        {
           
            if(transactions[key].value <= 0){spend += transactions[key].value}

            else{
                gain += transactions[key].value
            }
            
        }
        total = gain + spend
        return {spend, gain, total}
        
    }
}

Status.showAll()
for(key in transactions){
    Dom.innerInTbody(transactions[key])
}
