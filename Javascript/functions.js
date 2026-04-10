import {suits} from '../Javascript/variables.js';//imports suits array from variables.js
import {faces} from '../Javascript/variables.js';//imports faces array from variables.js
import {cards} from '../Javascript/variables.js';//imports card array that is empty from variables.js

//this function makes the cards from the suits and faces array.

export function makeCards() {
    for(let face of faces){
        for(let suit of suits){
            cards.push(`${face} of ${suit}`);
        }
    }
}

//this function shuffles the deck using the fisher-yates 

export function shuffleDeck(){
    for(let i = cards.length - 1; i > 0; i--){
        let j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]]
    }
}

//pushes two cards from the deck into the hand and takes two cards out of the cards.

export function dealHand(player){
    player.hand.push(cards[0], cards[1]);
    cards.shift();
    cards.shift();
}

//this is how the program will reference how to score the cards.

const scoreTable = {
    '2': 2,
    '3': 3,
    '4': 4,
    '5': 5,
    '6': 6,
    '7': 7,
    '8': 8,
    '9': 9,
    '10': 10,
    'Jack': 10,
    'Queen': 10,
    'King': 10,
    'Ace': 11,
}

//*BUG countScore counts the hand each time it is called only can call it once.
//*PROBLEM SOLVED made a separate function the initial count will be countScore
//this is how the program scores the cards.

export function countScore(player){
    console.log(player.name);
    if(player.name === 'Dealer'){
        console.log('only should do once.')
        for(let i = 0; i <= player.hand.length - 1; i++){
            if(i === 1){
                console.log(player.hand);
                let faceDeal = player.hand[i].split(' ')[0];
                player.score += scoreTable[faceDeal];
            }
        }
    }
    else if(player.name === 'Player'){
        for(let hand of player.hand){
            let face = hand.split(' ')[0];
            player.score += scoreTable[face];
        }
    }

}

//this is how the program updates the player or dealer score using number of cards as an argument

export function updateScore(player, numOfCards){
    const handPosition = numOfCards - 1;//moves to the last position of the array.
    const face = player.hand[handPosition].split(' ')[0];//goes to the position and takes the first string of the position
    player.score += scoreTable[face];//references the table and assigns it a number and adds and equals to the score.
}

//this pushes one card into the players hand and takes one out of the deck.

export function hitPlayer(player){
    player.hand.push(cards[0]);
    cards.shift();
}

//this one asks the player to hit or stay and counts their cards. function can only be used when interacting with alert() or prompt()

function hitOrStay(player,numOfCards){
    console.log(numOfCards);
    console.log(player.hand, player.score);
    let input;
    console.log(input);
    if(input === 'stay'){
         alert(`You stayed at ${player.score}`);
         return;
    }
    else if(input === 'hit'){
        hitPlayer(player);
        const updatedCardCount = numOfCards + 1;
        updateScore(player,updatedCardCount);
        alert(`You just got ${player.hand[numOfCards]}`);
        console.log(player.hand, player.score);
        checkIfBustOrBlackJack(player, player.score);
    }
}

//checks dealer for bust or blackjack. function can only be used when interacting with browser

export function dealerCheckBustOrBlackJack(player, number){
    if(number > 21){
        alert(`Dealer just busted with ${player.score}`);
    }
    else if(number < 21){
        alert(`Dealer's new score is ${player.score}`);
        dealerHitOrStay(player, player.hand.length);
    }
    else if(number === 21){
        alert(`Dealer just hit BlackJack! Try again.`);
        return;
    }
}

//this is the playGame function where all functions are called along with alerts. Only used in browser mode.

function playGame(playerOne, playerTwo){
    alert(`Hello welcome to blackjack! We are making your cards now.`);
    makeCards();
    alert(`Perfect! Now just to shuffle the deck.`);
    shuffleDeck();
    alert(`Alright all done now lets deal you and the dealer your hands.`);
    dealHand(playerOne);
    dealHand(playerTwo);
    countScore(playerOne);
    countScore(playerTwo);
    alert(`Alright so you are showing ${playerOne.hand} and the dealer is showing ${playerTwo.hand[0]}.`);
    hitOrStay(playerOne, playerOne.hand.length);
    alert(`So you're staying at ${playerOne.score} and the dealer is showing a ${playerTwo.hand[0]}. Lets flip the card over.....`);
    alert(`It's a ${playerTwo.hand[1]}`)
    dealerHitOrStay(playerTwo, playerTwo.hand.length);
}

