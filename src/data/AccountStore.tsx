import { Store } from "pullstate";

export const AccountStore = new Store({
    
    profile: {
        firstname: "Eve",
        surname: "Holt",
        avatar: "/alan.jpg",
    },
    cards: [
        
        {
            id: 1,
            type: "visa",
            description: "Current Account",
            number: "4859 2390 5635 7347",
            expiry: "11/22",
            secret: "483",
            color: "blue",
            balance: "38.21",
            transactions: [
                {
                    name: "Credit Card Payment",
                    amount: "850",
                    deposit: true
                },
                {
                    name: "Restaurant expense",
                    amount: "8500",
                    deposit: false
                },
                {
                    name: "SuperMarket",
                    amount: "50000",
                    deposit: false
                },
                {
                    name: "Apple",
                    amount: "1000",
                    deposit: false
                },
            ]
        },
        {
            id: 2,
            type: "mastercard",
            description: "Savings",
            number: "7349 1284 6790 4587",
            expiry: "05/23",
            secret: "590",
            color: "black",
            balance: "120.90",
            transactions: [
                {
                    name: "Joe Bloggs",
                    amount: "120.90",
                    deposit: true
                }
            ]
        }
    ],
});

export const addCardToAccount = (newCard) => {

    AccountStore.update(s => { s.cards = [ ...s.cards, newCard ]; });
}

export const addTransactionToCard = (newTransaction, cardID) => {

    AccountStore.update(s => { 
        s.cards.find((c, index) => (parseInt(c.id) === parseInt(cardID)) ? s.cards[index].transactions = [ ...s.cards[index].transactions, newTransaction ] : false ) 
    });

    if (newTransaction.deposit) {
        
        AccountStore.update(s => { 
            s.cards.find((c, index) => (parseInt(c.id) === parseInt(cardID)) ? s.cards[index].balance = (parseFloat(s.cards[index].balance) + parseFloat(newTransaction.amount)) : false ) 
        });
    } else {

        AccountStore.update(s => { 
            s.cards.find((c, index) => (parseInt(c.id) === parseInt(cardID)) ? s.cards[index].balance = (parseFloat(s.cards[index].balance) - parseFloat(newTransaction.amount)) : false ) 
        });
    }
}

// export const removeFromCart = productIndex => {

//     AccountStore.update(s => { s.product_ids.splice(productIndex, 1) });
// }