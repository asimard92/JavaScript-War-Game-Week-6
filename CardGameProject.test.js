const expect = chai.expect
// The following test will tell the user how many cards are being used
// in the game of War. In this case, it is a standard 52 card deck.

describe ("How many cards are in my deck?", function(){
    it("Deck should have 52 cards", function(){
        // Arrange & Act
        let testDeck = new Deck()
        // Assert
        expect(testDeck.cards.length).to.equal(52);
    });
});
