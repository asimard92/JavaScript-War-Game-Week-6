console.log("This is War 💥");

// Here are my variables in which I need my cards to be displayed. They need a suit, a rank, and a value.
const cardSuit = ['♣', '♦' , '❤️', '♠'];
const cardRank = ['Ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
const cardValueMap = {
    'Ace' : 1,
    '2': 2,
    '3': 3,
    '4': 4,
    '5': 5,
    '6': 6,
    '7': 7,
    '8': 8,
    '9': 9,
    '10': 10,
    'J': 11,
    'Q': 12,
    'K': 13 
  }

  // Each card will have a suit, a rank and a value. For example a Jack of Hearts value is 11. 
class Card {
    constructor(cardSuit, cardRank, cardValue) {
        this.cardSuit = cardSuit;
        this.cardRank = cardRank;
        this.cardValue = cardValue;
    }
}

// Our players will receive half the deck of cards, their name and deck will be displayed
// and they will start out with a score of zero and work up as the rounds play. 

class Player {

    constructor(name) {
        this.Name = name;
        this.PlayerDeck = [];
        this.PlayerScore = 0;
}

    addNewDeck(deck) {
        this.playerDeck = deck;
    }
}

// Creating our two players Tom Nook and his nephews Timmy and Tommy Nook (they're twins, 
// they always play together).

let playerOne = new Player("Tom Nook");
console.log(playerOne);

let playerTwo = new Player("Timmy & Tommy Nook");
console.log(playerTwo);


class Deck {

    constructor (cards = freshDeck()) {
        this.cards = cards;
    }

    get numberOfCards (){
        return this.cards.length;
    }

    // This is the method to shuffle the deck, the cards are dealt at random to each player. 
    shuffle() {
        for (let i = this.numberOfCards - 1; i > 0; i --) {
            const newIndex = Math.floor(Math.random() * (this.numberOfCards));
            const oldValue = this.cards[newIndex];
            this.cards[newIndex] = this.cards[i];
            this.cards[i] = oldValue;
        }
    }
}
// Instead of four separate arrays (because of 4 suits), flatmap will flatten all of them. 
function freshDeck() {
    return cardSuit.flatMap(suit => {
      return cardRank.map(value => {
        return new Card(suit, value);
      });
    });
}

// The new game starts out with each player getting half the shuffled deck of cards which is 26 each in this game. 
function newGame(playerOne, playerTwo) {
    const deck = new Deck(); 
    deck.shuffle();
    const middleOfDeck = (deck.numberOfCards / 2);
    playerOne.addNewDeck(deck.cards.slice(0, middleOfDeck));
    playerTwo.addNewDeck(deck.cards.slice(middleOfDeck, deck.numberOfCards));
}

// This function shows the output of each round, it displays each player dropping down a card. 
function roundOutput(playerOne, playerTwo, roundNum) {
    console.log(`${playerOne.Name} drops a: ${playerOne.playerDeck[roundNum].cardRank} of ${playerOne.playerDeck[roundNum].cardSuit}`);
    console.log(`${playerTwo.Name} drop a: ${playerTwo.playerDeck[roundNum].cardRank} of ${playerTwo.playerDeck[roundNum].cardSuit}`); 
}

// This function shows the results of each card played, if Tom Nook drops a 3 and Timmy and Tommy drop a 2 then 
// Tom Nook wins the round. If they both drop a card of the same value, the round ends in a zie resulting in zero points awarded. 
function playRoundResults(playerOne, playerTwo) {
    for (let i = 0; i < playerOne.playerDeck.length; i++) {
        roundOutput(playerOne, playerTwo, i);
      if (cardValueMap[playerOne.playerDeck[i].cardRank] > cardValueMap[playerTwo.playerDeck[i].cardRank]) {
        playerOne.PlayerScore += 1 ;
        console.log(`${playerOne.Name} Won The Round`);
      } else if (cardValueMap[playerOne.playerDeck[i].cardRank] < cardValueMap[playerTwo.playerDeck[i].cardRank]) {
        playerTwo.PlayerScore += 1 ;
        console.log(`${playerTwo.Name} Won The Round`);
      } else {
        console.log('Tie, Zero Points!');
      }
      // The function below displays the points at the end of each round and the current score. 
    console.log(`    Score: ${playerOne.Name}:  ${playerOne.PlayerScore}
    ${playerTwo.Name}: ${playerTwo.PlayerScore}
    `);
    }
  }

  // At the end of all the cards being flipped over, the scores are tallied, if  player ones score is higher than 
  // player two's then player one wins and displays their score and vice versa. If the score is equal then it shows a tie. 
  // In either case, someone gets a trophy!
  function finalScore(playerOne, playerTwo) {
    if (playerOne.PlayerScore > playerTwo.PlayerScore) {
      console.log( "🏆" + `${playerOne.Name} has won the game with a final score of: ${playerOne.PlayerScore}`);
    } else if (playerOne.PlayerScore < playerTwo.PlayerScore) {
      console.log( "🏆" + `${playerTwo.Name} has won the game with a final score of: ${playerTwo.PlayerScore}`);
    } else {
      console.log( "🏆" + `${playerOne.Name} and ${playerTwo.Name} have tied!`);
    }
  } 

  // These functions will start our game!
  newGame(playerOne, playerTwo);

  playRoundResults(playerOne, playerTwo);
  
  finalScore(playerOne, playerTwo);

