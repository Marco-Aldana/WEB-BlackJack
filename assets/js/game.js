/*
* 2C = Two of Clubs (treboles)
* 2D = Two of Diamonds
* 2H = Two of Hearts
* 2S = Two of Spades
*/

const myModule = (()=>{
    'use strict'
    const types = ['C', 'D', 'H', 'S'],
        specials = ['A', 'J', 'Q', 'K'];

        let deck = [], 
            playerScores = [];

    //html references
    const btnNewGame = document.querySelector('#btnNewGame'),
        btnGetCard = document.querySelector('#btnGetCard'),
        btnStop = document.querySelector('#btnStop');

    const HTMLScores = document.querySelectorAll('small'),
        divCardsPlayers = document.querySelectorAll('.divCards');

    //this function initializes the game
    const initGame = (numPlayers = 2) =>{
        deck = createDeck();
        playerScores = [];
        for(let i = 0; i < numPlayers; i++){
            playerScores.push(0);
        }
        HTMLScores.forEach(elem => elem.innerText = 0);
        divCardsPlayers.forEach(elem => elem.innerHTML = '');
        btnGetCard.disabled = false;
        btnStop.disabled = false;
    }

    //this function creates a new deck
    const createDeck = () => {
        deck = [];
        for(let i = 2; i <= 10; i++){
            for(let type of types){
                deck.push(i + type);
            }
        }
        for(let type of types){
            for(let special of specials){
                deck.push(special + type);
            }
        }
        return _.shuffle(deck);
    }

   
    //this function allows to take a card
    const takeCard = () => {
        if(deck.length === 0){
            throw 'There is no more cards in the deck';
        }
        return deck.pop();
    }

    //this function allows to know the value of the card
    const valueCard = (card) => {
        const value = card.substring(0, card.length - 1);
        return (isNaN(value)) ? 
            (value === 'A') ? 11 : 10
            : value * 1;
    }

    //turn: 0 = first player and the last will be the computer
    const addPoints = (turn, card) => {
        playerScores[turn] = playerScores[turn] + valueCard(card);
        HTMLScores[turn].innerText = playerScores[turn];
        return playerScores[turn];
    }

    const createCard = (card, turn) => {
        const imgCard = document.createElement('img');
            imgCard.src = `assets/cards/${card}.png`;
            imgCard.classList.add('mycss-card');
            divCardsPlayers[turn].append(imgCard);
    }

    const determineWinner = () => {
        const [minPoints, computerScore] = playerScores;

        setTimeout(() => {
            if(computerScore === minPoints){
                alert('Draw');
            }else if(minPoints > 21){
                alert('You lose');
            }else if(computerScore > 21){
                alert('You win');
            }else{
                alert('You lose');
            }
        }, 100);
    }

    //computer turn
    const computerTurn = (minPoints) => {
        let computerScore = 0;
        do{
            const card = takeCard();
            computerScore = addPoints(playerScores.length - 1, card);
            createCard(card, playerScores.length - 1);
        }while((computerScore < minPoints) && (minPoints <= 21));
        determineWinner();
    }

    //events
    btnGetCard.addEventListener('click', () => {
        const card = takeCard();
        const playerScore = addPoints(0, card);
        createCard(card, 0);

        if(playerScore > 21){
            console.warn('You lose');
            btnGetCard.disabled = true;
            btnStop.disabled = true;
            computerTurn(playerScore);
        }else if(playerScore === 21){   
            console.warn('21, great!');
            btnGetCard.disabled = true;
            btnStop.disabled = true;
            computerTurn(playerScore);
        }
    });

    btnNewGame.addEventListener('click', () => {
        initGame();
    }
    );

    btnStop.addEventListener('click', () => {
        btnGetCard.disabled = true;
        btnStop.disabled = true;
        computerTurn(playerScores[0]);
    }
    );

    return {
        newGame: initGame
    };
})();
