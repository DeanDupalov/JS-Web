const {expect, assert} = require('chai');
const {cinema} = require('./cinema');


describe('Tests cinema', () => {


    describe("test showMovies", () => {
        it('given arr with 2 movies should return new arr separated by a comma and space', () => {
            expect(cinema.showMovies(['movie1', 'movie2'])).to.equals(['movie1, movie2'].join(', '));
        });
        it('given arr with 1 movie should return new arr separated by a comma and space', () => {
            expect(cinema.showMovies(['movie1'])).to.equals(['movie1'].join(', '));
        });
        it('if given empty array should return the message "There are currently no movies to show."', () => {
            expect(cinema.showMovies([])).to.equal("There are currently no movies to show.");
        });

        it('if no input given should raise', () => {
            expect(() => cinema.showMovies()).to.throw();
        });
        it('if obj given should raise', () => {
            expect(() => cinema.showMovies()).to.throw();
        });
        it('if string given should raise', () => {
            expect(() => cinema.showMovies()).to.throw();
        });

    });
    describe('test ticketPrice', () => {


        it('if Premiere  should return price 12.00', () => {
            expect(cinema.ticketPrice('Premiere')).to.be.equal(12.00);
        });
        it('if Normal should return price 7.50', () => {
            expect(cinema.ticketPrice('Normal')).to.be.equal(7.50);

        });
        it('if Discount should return price 5.50', () => {
            expect(cinema.ticketPrice('Discount')).to.be.equal(5.50);

        });
        it('if empty string given should raise', () => {
            expect(() => cinema.ticketPrice('')).to.throw('Invalid projection type');

        });
        it('if projectionType is not present should raise("Invalid projection type")', () => {
            expect(() => cinema.ticketPrice('VIP')).to.throw('Invalid projection type');

        });
        it('if no input should raise("Invalid projection type")', () => {
            expect(() => cinema.ticketPrice('VIP')).to.throw('Invalid projection type');

        });



    });
    describe('test swapSeatsInHall', () => {


        it('when given tow nums smaller than 20 should return "Successful change of seats in the hall."', () => {
            expect(cinema.swapSeatsInHall(1,2)).to.be.equal("Successful change of seats in the hall.")
            expect(cinema.swapSeatsInHall(2, 1)).to.be.equal("Successful change of seats in the hall.")
        });
        it('when given tow nums1, 20 should return "Successful change of seats in the hall."', () => {
            expect(cinema.swapSeatsInHall(1,20)).to.be.equal("Successful change of seats in the hall.")

        });
        it('when two equal seats given should return "Unsuccessful change of seats in the hall."', () => {
            expect(cinema.swapSeatsInHall(5, 5)).to.equal("Unsuccessful change of seats in the hall.");
        });
        it('float number should return "Unsuccessful change of seats in the hall."', () => {
            expect(cinema.swapSeatsInHall(1.5, 5)).to.equal("Unsuccessful change of seats in the hall.");
        });
        it('float numbers should return "Unsuccessful change of seats in the hall."', () => {
            expect(cinema.swapSeatsInHall(1.5, 5.5)).to.equal("Unsuccessful change of seats in the hall.");
        });
        it('one number is missing should return "Unsuccessful change of seats in the hall."', () => {
            expect(cinema.swapSeatsInHall(1)).to.equal("Unsuccessful change of seats in the hall.");
        });
        it('one of the numbers is greater than 20 should return "Unsuccessful change of seats in the hall."', () => {
            expect(cinema.swapSeatsInHall(1,21)).to.equal("Unsuccessful change of seats in the hall.");
        });
        it('one of the numbers is negative should return "Unsuccessful change of seats in the hall."', () => {
            expect(cinema.swapSeatsInHall(-1,20)).to.equal("Unsuccessful change of seats in the hall.");
        });
        it('two numbers is negative should return "Unsuccessful change of seats in the hall."', () => {
            expect(cinema.swapSeatsInHall(-1,-20)).to.equal("Unsuccessful change of seats in the hall.");
        });
        it('one of the numbers is zero should return "Unsuccessful change of seats in the hall."', () => {
            expect(cinema.swapSeatsInHall(0,20)).to.equal("Unsuccessful change of seats in the hall.");
        });
        it('one of the numbers is not an int should return "Unsuccessful change of seats in the hall."', () => {
            expect(cinema.swapSeatsInHall('1',20)).to.equal("Unsuccessful change of seats in the hall.");
        });
        it('two of the numbers is not an int should return "Unsuccessful change of seats in the hall."', () => {
            expect(cinema.swapSeatsInHall('1','20')).to.equal("Unsuccessful change of seats in the hall.");
        });
        it('one of the numbers is arr should return "Unsuccessful change of seats in the hall."', () => {
            expect(cinema.swapSeatsInHall(['1'],20)).to.equal("Unsuccessful change of seats in the hall.");
        });

    });
});
