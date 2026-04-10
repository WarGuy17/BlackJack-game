import {dealer} from '../Javascript/variables.js';
import {player1} from '../Javascript/variables.js';
import {makeCards,shuffleDeck,dealHand,countScore,updateScore,hitPlayer} from '../Javascript/functions.js';
import {cards} from '../Javascript/variables.js';

const page = document.body;
const titleRow = page.querySelector('#topPage');//top of the page
const mainPage = page.querySelector('#mainPage');//main page
const dealerScore = page.querySelector('#dealerScore');//section where dealer score resides
const playerScore = page.querySelector('#yourScore');//section where player score resides
const dealerBox = page.querySelector('.dealerBox');//this holds the dealer's cards
const userBox = page.querySelector('.userBox');//this holds the players cards
const narrator = page.querySelector('#narratorSpeech');//this is the p element that holds the narrator speech
const dealCards = page.querySelector('#drawButton');//this is the deal hand button
const hitButton = page.querySelector('#hitButton');//this is the hit button
const stayButton = page.querySelector('#stayButton');//this is the stay button
const playAgain = page.querySelector('#playAgainButton');//this is the play again button

//this function renders the score that each player has or updates it in the u.i.

function renderScore(){
    dealerScore.innerHTML = dealer.score;
    playerScore.innerHTML = player1.score;
}

//bug is fixed where hit button and stay button wouldn't disappear after the game ended and play again button came back.
//bug is fixed where the narrator was overridden reading the wrong line when the player won from dealer busting.
//had to many checks the whoWon overridden the checkForBustOrBlackJack

//this function checks to see if either player or dealer busted or got blackjack

function checkForBustOrBlackJack(user,deal){
    if(user.score > 21){
        narrator.innerHTML = `Sorry try again you busted at ${user.score}`;
        playAgain.hidden = false;
        hitButton.hidden = true;
        stayButton.hidden = true;
        dealCards.hidden = true;
        return;
    }
    else if(deal.score > 21){
        narrator.innerHTML = `YOU WON!!!! Dealer busted at ${deal.score}`;
        playAgain.hidden = false;
        hitButton.hidden = true;
        stayButton.hidden = true;
        dealCards.hidden = true;
        return;
    }
    else if(user.score === 21){
        narrator.innerHTML = `You won! You got a BlackJack!`;
        playAgain.hidden = false;
        hitButton.hidden = true;
        stayButton.hidden = true;
        dealCards.hidden = true;
        return;
    }
    else if(deal.score === 21){
        narrator.innerHTML = `You lost! Dealer got a blackjack.`;
        playAgain.hidden = false;
        hitButton.hidden = true;
        stayButton.hidden = true;
        dealCards.hidden = true;
        return;
    }
}

//bug was fixed buttons hit and stay are turned off and play again button is turned on.

//this function looks for who won if player stays and the dealer stays

function whoWon(playerOne, playerTwo){
    const winningNumber = 21;
    const playerOneNumber = winningNumber - playerOne.score;
    const playerTwoNumber = winningNumber - playerTwo.score;

    if(playerOneNumber < playerTwoNumber){
        narrator.innerHTML = 'You won!';
        hitButton.hidden = true;
        stayButton.hidden = true;
        playAgain.hidden = false;
    }

    else if(playerOneNumber > playerTwoNumber){
        narrator.innerHTML = 'You lost';
        hitButton.hidden = true;
        stayButton.hidden = true;
        playAgain.hidden = false;
    }

    else{
        narrator.innerHTML = `You tied!`;
        hitButton.hidden = true;
        stayButton.hidden = true;
        playAgain.hidden = false;
    }
}

console.log(cards.length);

//this is the logic that decids if the dealer hits or stays

function dealerHitOrStay(player, dealer){
    if(dealer.score <= 15){//will hit if score is below or equal to 15
        hitPlayer(dealer);
        renderCardAfterHit(dealer, dealerBox, dealer.hand.length);
        updateScore(dealer, dealer.hand.length);
        renderScore();
        checkForBustOrBlackJack(player, dealer);
    }
    else if(dealer.score > 15 && dealer.score < 21){//updated to check if its more than 15 and less than 21 to run.
        checkForBustOrBlackJack(player,dealer);
        whoWon(player, dealer);
    }
}

//this resets the game initialized by the playAgain button at the top

function resetGame(){
    narrator.innerHTML = '';
    dealer.hand = [];
    player1.hand = [];
    player1.score = 0;
    dealer.score = 0;
    renderScore();
    userBox.innerHTML = '';
    dealerBox.innerHTML = '';
    hitButton.hidden = true;
    stayButton.hidden = true;
    dealCards.hidden = false;
    playAgain.hidden = true;
    shuffleDeck();
    console.log(cards.length);
    gameCycle();
}

//this function checks if each card includes the suit name and to give it a class or style based off of that.

function colorCardSuit(card, cardElement){
    if(card.includes('Diamonds')){
        return cardElement.classList.add('diamonds');
    }
    else if(card.includes('Spades')){
        return cardElement.classList.add('spades');
    }
    else if(card.includes('Clubs')){
        return cardElement.classList.add('clubs');
    }
    else if(card.includes('Hearts')){
        return cardElement.classList.add('hearts');
    }
    else {return console.log("it didn't work.")}
}

//this function makes the hand of the player come to life and puts them in their respective boxes.

function renderCards(player, box){
    const newHand = player.hand;
    for(let i = 0; i <= newHand.length - 1; i++){
            if(player.name === 'Dealer' && i === 0){
                const cardElement = document.createElement('div');
                colorCardSuit(newHand[i], cardElement);
                cardElement.classList.add('hidden');
                cardElement.innerHTML = newHand[1];
            }
            else {
                const cardElement = document.createElement('div');//makes a div element in the document and names it cardElement, does it for how many cards there are.
                colorCardSuit(newHand[i], cardElement);
                cardElement.classList.add('card');//attaches a class called card to it
                cardElement.innerHTML = newHand[i];//the innerHTML or text will be updated by the iterator looking inside the hand.
                box.appendChild(cardElement);//it will be placed inside the box each card.
            }
    }
}



//this updates the cards after every hit and renders them on screen.

function renderCardAfterHit(player, box, cards){
    const cardElement = document.createElement('div');//creates a card element with div
    const handPosition = cards - 1; //finds the updated card
    colorCardSuit(player.hand[handPosition], cardElement);
    cardElement.classList.add('card');//makes a class so it can be stayled by the card css
    cardElement.innerHTML = player.hand[handPosition];//gives the element value at this position
    box.appendChild(cardElement);//attaches it into the box of choice
}

function startGame(){
    const startWindow = document.createElement('div');
    const startButton = document.createElement('button');
    const overlay = document.createElement('overlay');
    startWindow.innerHTML = 'Welcome to Blackjack created by Justin Tweed press Start Game to play'
    startButton.innerHTML = 'Start Game';
    startWindow.classList.add('startWindow');
    startButton.classList.add('button');
    overlay.classList.add('overlay');
    document.body.appendChild(overlay);
    document.body.appendChild(startWindow);
    startWindow.appendChild(startButton);
    makeCards();//makes cards in the beginning of game. **bug is attached to this on making cards every time the program runs.
    shuffleDeck();//shuffles the deck malfunctions because of the above bug.
    hitButton.hidden = true;
    stayButton.hidden = true;
    playAgain.hidden = true;
    startButton.addEventListener('click', () => {
        startButton.classList.add('hidden');
        startWindow.classList.add('hidden');
        overlay.classList.add('hidden');
    })
}


function gameCycle(){
    if(cards.length === 0){
        startGame();
    }
    else if(cards.length < 10){
        cards.length = 0;
        startGame();
    }
}

gameCycle();




//this resets the game when the user clicks the button using the resetGame function above.

playAgain.addEventListener('click', resetGame);

//this function deals cards after every round. It has to reset nearly everything. Might move some of this over to reset game.

dealCards.addEventListener('click', () => {//this is the deal hand button
    let clickCounter = 0;//sets clickCounter back to zero so dealCards button can be re-enabled
    player1.score = 0;//resets the score of both to zero
    dealer.score = 0;
    renderScore();//shows the new score
    narrator.innerHTML = '';//resets the narrator message
    dealHand(player1);
    dealHand(dealer);
    countScore(player1);
    countScore(dealer);
    renderCards(player1, userBox);
    renderCards(dealer, dealerBox);
    renderScore();
    checkForBustOrBlackJack(player1, dealer);
    clickCounter += 1;
    if(narrator.innerHTML){
        hitButton.hidden = true;
        stayButton.hidden = true;
        dealHand.hidden = true;
        playAgain.hidden = false;
        clickCounter -= 1;
    }
    console.log(clickCounter);
    if(clickCounter === 1){
        dealCards.hidden = true;
        hitButton.hidden = false;
        stayButton.hidden = false;
        playAgain.hidden = true;
    }
});

//this is the hit button if it is pushed it will hit the player and render the score and check for blackjack or bust.

hitButton.addEventListener('click', () => {//this is the hit button.
    hitPlayer(player1);
    renderCardAfterHit(player1, userBox, player1.hand.length);
    updateScore(player1, player1.hand.length);
    renderScore();
    checkForBustOrBlackJack(player1, dealer);
});

//this is the stay button if it is pushed it will tell the dealer to continue it's turn.

stayButton.addEventListener('click', () => {
    hitButton.disabled = true;
    stayButton.disabled = true;
    dealerHitOrStay(player1,dealer);
    dealerHitOrStay(player1,dealer);
    dealerHitOrStay(player1, dealer);
});












