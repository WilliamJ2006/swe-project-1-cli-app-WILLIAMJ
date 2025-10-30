const rounds = {
    wins: 0,
    losses: 0,
    ties: 0,
    matches: 0,
};

const play = (choice) => {
    const options = ['rock', 'paper', 'scissors'];
    // const compChoice = Math.floor(Math.random() * (3) + 1);
    // console.log(`Computer chose ${options[compChoice - 1]}`);
    const compChoice = Math.floor(Math.random() * (3));
    console.log(`\nYou choose ${options[choice - 1]}.\tThe Computer chooses ${options[compChoice]}.\n`);
    if ((choice === '1' && compChoice === 1) || (choice === '2' && compChoice === 2) || (choice === '3' && compChoice === 0)) {
        console.log('You Lose!');
        rounds.matches++;
        rounds.losses++;
    } else if ((choice === '1' && compChoice === 2) || (choice === '2' && compChoice === 0) || (choice === '3' && compChoice === 1)) {
        console.log('You Win!');
        rounds.matches++;
        rounds.wins++;
    } else {
        console.log("It's a Tie!")
        rounds.matches++;
        rounds.ties++;
    }
};

const viewStats = () => {
    console.log(`Matches: ${rounds.matches}\n Wins: ${rounds.wins}\n Losses: ${rounds.losses}\n Ties: ${rounds.ties}`);
};

module.exports = {
    play,
    viewStats,
};