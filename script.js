const modal = {
    open() {
        document.querySelector('.modal-overlay').classList.add('active')
    },

    close() {
        document.querySelector('.modal-overlay').classList.remove('active')
    }
}
let transactions = JSON.parse(localStorage.getItem("devFinances")) || []




let Utils = {
    formatCureecy(value){
        value = value / 100
        value = value.toLocaleString  
        ('pt-br',{style:'currency',currency:'BRL'})

        return value
    }
}

let Dom = {

    tbody: window.document.querySelector('#tbody'),

    addInTbody(transactions,index){
        let tr = Dom.createTr(transactions,index)
        Dom.tbody.appendChild(tr)
    },
    remove(index){
        transactions.splice(index,1)
        localStorage.setItem('devFinances', JSON.stringify(transactions))
        app.update()
    },

    createTr(transactions,index) {
        let html = Dom.contentTr(transactions,index)
        let tr = document.createElement('tr')
        tr.innerHTML = html
        tr.dataset.index = index
        return tr
    },

    contentTr(transactions,index) {
        let clas = transactions.value < 0 ? "spend": "gain"
        let html = `
                <td>
                    ${transactions.description}
                </td>

                <td class="${clas}">
                     ${Utils.formatCureecy(transactions.value)}
                </td>

                <td>
                    ${transactions.date}
                </td>

                <td>
                    <img onclick=Dom.remove(${index}) src="assets/minus.svg" alt="remover">
                </td>           
            `
            return(html)
    },
  
}


let statusInfo = {

    amountDisplay: window.document.getElementById("displayAmount"),

    spendDisplay: window.document.getElementById('displaySpend'),

    totalDisplay: window.document.getElementById('displayTotal'),

    allResults(){
        let amount = 0
        let spend = 0 
        let total = 0
        
        for(key in transactions){
            transactions[key].value <0 ? spend += transactions[key].value : amount+= transactions[key].value
        }
        total = amount + spend
        return {
            amount,
            spend,
            total
        }
    },
    resultAmount(){
        let {amount} = statusInfo.allResults()
        this.amountDisplay.innerHTML = Utils.formatCureecy(amount)
    },
    resultSpend(){
        let {spend} = statusInfo.allResults()
        statusInfo.spendDisplay.innerHTML = Utils.formatCureecy(spend)
    },

    resultTotal(){
        let {total} = statusInfo.allResults()
        statusInfo.totalDisplay.innerHTML = Utils.formatCureecy(total)
    },
    showStatus(){
        statusInfo.resultAmount()
        statusInfo.resultSpend()
        statusInfo.resultTotal()
    }
 
}




let app = {
    init(){
        for(key in transactions)
        Dom.addInTbody(transactions[key])

        statusInfo.showStatus()
    },
    update(){
        document.querySelector('tbody').innerHTML = ''
        app.init()
        modal.close()
    }
}

app.init()


let Format = {

    description: window.document.querySelector('#descripition'),

    amount: window.document.querySelector("#amount"),

    date: window.document.querySelector('#date'),

    getValues(){

        return {
            description:Format.description.value,
            amount: Format.amount.value,
            date: Format.date.value
        }
    },

    checkField(){
        let {description,amount,date} = Format.getValues()
        if(description.trim() === '' ||  amount.trim() === '' || date.trim() === ''){
            throw new Error('por favar preencha todos os dados')
        }

    },
    formatFields(){
        let {description,amount,date} = Format.getValues()

        amount = amount * 100

        date = date.replace(/-/g, '')

        date = (`${date[6]}${date[7]}/${date[4]}${date[5]}/${date[0]}${date[1]}${date[2]}${date[3]}`)

        return{
            description,
            amount,
            date,
        }
    
    },
    newTransaction(description='',value=0,date){
        return {
            description,
            value,
            date,
        }
    },
    updateArray(){
        
        let {description,amount,date} = Format.formatFields()

        let list = Format.newTransaction(description,amount,date)
        transactions.push(list)
        localStorage.setItem('devFinances', JSON.stringify(transactions))

    
    
    },

    submit(event){
        try {
             //checar se os campos estão preenchidos
            Format.checkField()
            //fomatar os valores
            Format.formatFields()
            //colocar os dados na minha lista
            Format.updateArray()
            app.update()
         //
        } catch (error) {
            window.alert(error.message)
        }
       
    },

    
}