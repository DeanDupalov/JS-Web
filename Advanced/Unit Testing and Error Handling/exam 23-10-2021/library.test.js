const {expect, assert} = require('chai');
const {library} = require('./library');


describe('Tests library', () => {

    describe("test calcPriceOfBook", () => {
        // The function calculates the price of the book depending on the year of publication
        // The standard price of the book is 20 BGN
        // If the year of publication is less than or equal to 1980, there is a 50% percent discount from the standard price
        // The function calculated price of the book and return: `Price of {nameOfBook} is {price}`
        // You need to validate the input, if nameOfBook is not a string, or the year is not an integer number, throw an error: "Invalid input"

        it('if invalid book given should throw', () => {
            expect(() => library.calcPriceOfBook(123, 2020)).to.throw('Invalid input');
            expect(() => library.calcPriceOfBook(['Book1'], 2020)).to.throw('Invalid input');
        });
        it('if invalid year given should throw', () => {
            expect(() => library.calcPriceOfBook('Book1', 20.20)).to.throw('Invalid input');
            expect(() => library.calcPriceOfBook('Book1', '2020')).to.throw('Invalid input');
        });
        it('when given book whit year after 1980 should return massage', () => {
            expect(library.calcPriceOfBook('Book1', 2021)).to.be.equal(`Price of Book1 is 20.00`);
        });
        it('when given book whit year before 1980 should return massage and price 50% lower', () => {
            expect(library.calcPriceOfBook('Book1', 1950)).to.be.equal(`Price of Book1 is 10.00`);
        });
        it('when given book is year before 1980 should return massage and price 50% lower', () => {
            expect(library.calcPriceOfBook('Book1', 1980)).to.be.equal(`Price of Book1 is 10.00`);
        });
        it('when given book is year before 1981 should return massage and normal price', () => {
            expect(library.calcPriceOfBook('Book1', 1981)).to.be.equal(`Price of Book1 is 20.00`);
        });

    });

    describe('test findBook', () => {
        // The array includes all available books in the library (["Troy", "Life Style", "Torronto", etc.])
        // If the length of the booksArr array is zero, throw an error in the following format: "No books currently available"
        // The function checks whether the submitted string desiredBook is present in the array booksArr.
        // If present in the array, the function return: "We found the book you want."
        // Otherwise the function return: "The book you are looking for is not here!"
        // There is no need for validation for the input, you will always be given an array and string

        it('if booksArr is 0 should throw "No books currently available"', () => {
            expect(() => library.findBook([], 'Book')).to.throw("No books currently available");
        });
        it('if the book is present should return "We found the book you want."', () => {
            expect(library.findBook(['Book1', 'Book2', 'Book3'], 'Book2')).to.equal("We found the book you want.");
        });
        it('if the book is not present should return "The book you are looking for is not here!"', () => {
            expect(library.findBook(['Book1', 'Book2', 'Book3'], 'Book4')).to.equal("The book you are looking for is not here!");
        });

    });

    describe('test arrangeTheBooks', () => {
        // You need to validate the input, if the countBooks is not an integer number, or is a negative number, throw an error: "Invalid input"
        // The library has 5 shelves, each shelf can hold 8 books. Distribute the books on the shelves
        // If all the books are arranged on the shelves, return: "Great job, the books are arranged."
        // Otherwise, if no space has been reached, return: "Insufficient space, more shelves need to be purchased."

        it('if invalid input string should throw "Invalid input"', () => {
            expect(() => library.arrangeTheBooks('5')).to.throw("Invalid input");
            expect(() => library.arrangeTheBooks('Book')).to.throw("Invalid input");
            expect(() => library.arrangeTheBooks([])).to.throw("Invalid input");

        });
        it('if invalid input negative number should throw "Invalid input"', () => {
            expect(() => library.arrangeTheBooks(-1)).to.throw("Invalid input");
        });
        it('if invalid input floating number should throw "Invalid input"', () => {
            expect(() => library.arrangeTheBooks(1.1)).to.throw("Invalid input");
        });
        it('when have space should throw "Great job, the books are arranged."', () => {
            expect(library.arrangeTheBooks(5)).to.equal("Great job, the books are arranged.");
            expect(library.arrangeTheBooks(10)).to.equal("Great job, the books are arranged.");
            expect(library.arrangeTheBooks(20)).to.equal("Great job, the books are arranged.");
            expect(library.arrangeTheBooks(30)).to.equal("Great job, the books are arranged.");
        });

        it('when have one space should throw "Great job, the books are arranged."', () => {
            expect(library.arrangeTheBooks(39)).to.equal("Great job, the books are arranged.");
        });
        it('when all 40 slots are fool should throw "Insufficient space, more shelves need to be purchased."', () => {
            expect(library.arrangeTheBooks(40)).to.equal("Great job, the books are arranged.");
        });

        it('when no space should throw "Insufficient space, more shelves need to be purchased."', () => {
            expect(library.arrangeTheBooks(41)).to.equal("Insufficient space, more shelves need to be purchased.");
        });



    });
});