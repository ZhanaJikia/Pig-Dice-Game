

var scores, roundScore, activePlayer, gamePlaying;

init();

var lastDice;

document.querySelector('.btn-roll').addEventListener('click', function() {
        if (gamePlaying) {
            // 1. random number
            var dice1 = Math.floor(Math.random() * 6) + 1;
            var dice2 = Math.floor(Math.random() * 6) + 1;


            // 2. display result
            document.getElementById('dice-1').style.display = 'block';
            document.getElementById('dice-2').style.display = 'block';

            document.getElementById('dice-1').src = './CSS/imgs/dice-' + dice1 + '.png';
            document.getElementById('dice-2').src = './CSS/imgs/dice-' + dice2 + '.png';

            if (dice1 !== 1 && dice2 !== 1) {
                // add score
                roundScore += dice1 + dice2;
                document.querySelector('#current-' + activePlayer).textContent = roundScore;
                } else {
                    nextPlayer();
                }
    } else {
        gamePlaying = false;
    }

});

document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {

        // add CURRENT score to GLOBAL score
        scores[activePlayer] += roundScore;

        // update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        var input = document.querySelector('.final-score').value;
        var winningScore;

        // undefined, null, 0 , '' are COERCED to false
        // anything else is COERCED to true

        if (input) {
            winningScore = input;

        } else {
            winningScore = 100;
        }

        // check who is winner
        if (scores[activePlayer] >= winningScore) {
            
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            hide();
            document.querySelector('.player-'+ activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-'+ activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;


        } else {

            nextPlayer();
        }
    }  else {

        gamePlaying = false;
    }

});


function nextPlayer () {

    activePlayer === 0 ?  activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    hide();

};


document.querySelector('.btn-new').addEventListener('click', init );


function init() {
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;


    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-'+ activePlayer + '-panel').classList.remove('winner');
    document.querySelector('.player-'+ activePlayer + '-panel').classList.remove('active');
    document.querySelector('.player-'+ activePlayer + '-panel').classList.add('active');

};

function hide() {
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
};