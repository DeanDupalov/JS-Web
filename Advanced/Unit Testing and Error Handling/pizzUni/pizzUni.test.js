const {expect, assert} = require('chai');
const {pizzUni} = require('./pizzUni');


describe('Tests pizzUni', () => {

    describe("test makeAnOrder", () => {
        // the object includes {orderedPizza: ‘the name of the pizza’, orderedDrink: ‘the name of the drink’}
        // the function checks if there are ordered pizza and a drink.
        // Then the function returns confirmation message for your order

        it('test if orderObg has orderedPizza prop should return message', () => {
            let order = {orderedPizza: 'Margarita',}
            expect(pizzUni.makeAnOrder(order)).to.be.equal(`You just ordered ${order.orderedPizza}`)
        });
        it('test if orderObg has orderedDrink prop should return message and add drink in it', () => {
            let order = {orderedPizza: 'Margarita', orderedDrink: 'Coca Cola'}
            expect(pizzUni.makeAnOrder(order)).to.be.equal(`You just ordered ${order.orderedPizza} and ${order.orderedDrink}.`)
        });

        it('if orderObj has mot orderedPizza prop should raise', () => {
            let order = {orderedDrink: 'Coca Cola'};
            expect(()=>pizzUni.makeAnOrder(order)).to.throw('You must order at least 1 Pizza to finish the order.')
        })
        it('no order should raise', () => {

            expect(()=>pizzUni.makeAnOrder()).to.throw()
        })
        it('invalid input should raise', () => {
            expect(()=>pizzUni.makeAnOrder([])).to.throw()
            expect(()=>pizzUni.makeAnOrder('orderedDrink')).to.throw()
            expect(()=>pizzUni.makeAnOrder(1233)).to.throw()
        })


    });
    describe('test getRemainingWork', () => {


        it('if all ready should return "All orders are complete!"', () => {
            let orders = [{pizzaName: 'Margarita', status: 'ready'},]
            expect(pizzUni.getRemainingWork(orders)).to.be.equal("All orders are complete!");
        });
        it('if one order is preparing should return massage', () => {
            let orders = [{pizzaName: 'Margarita', status: 'ready'}, {pizzaName: 'Peperoni', status: 'preparing'}];
            expect(pizzUni.getRemainingWork(orders)).to.be.equal('The following pizzas are still preparing: Peperoni.');
        });
        it('if all orders are preparing ready should return massage', () => {
            let orders = [{pizzaName: 'Margarita', status: 'preparing'}, {pizzaName: 'Peperoni', status: 'preparing'}];

            expect(pizzUni.getRemainingWork(orders)).to.be.equal('The following pizzas are still preparing: Margarita, Peperoni.');
        });

        it('if empty array', () => {
            expect(pizzUni.getRemainingWork([])).to.be.equal("All orders are complete!");
        });
    });
    describe('test orderType', () => {

        // o	the function first checks what is the type of the order (‘Carry Out’ , ‘Delivery’)
        // o	if the type of the order is ‘Carry Out’ you get 10% discount
        // o	then the function returns the total sum of the order
        it('if type of order is "Carry Out" should have 10% discount', () => {
            expect(pizzUni.orderType(10, "Carry Out")).to.equal(9);
            expect(pizzUni.orderType(20, "Carry Out")).to.equal(18);
        });

        it('if type of order is "Delivery" returns the sum', () => {
            expect(pizzUni.orderType(10, "Delivery")).to.equal(10);
            expect(pizzUni.orderType(20, "Delivery")).to.equal(20);
        })

        it('if no input should return undefined', () => {
            expect(pizzUni.orderType()).to.be.undefined;

        })
        it('if one input should return undefined', () => {
            expect(pizzUni.orderType(10)).to.be.undefined;
        })
        it('if typeOfOrder is not familiar command should return undefined', () => {
            expect(pizzUni.orderType(10, 'test')).to.be.undefined;
        })

    });
});