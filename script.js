const moves = ['Камень', 'Ножницы', 'Бумага'];
const history = [];
const maxHistory = 5;
const fullHistory = [];
const buttons = {
    'rock': 'Камень',
    'scissors': 'Ножницы',
    'paper': 'Бумага'
};
function getRandomMove() {
    return moves[Math.floor(Math.random() * moves.length)];
}
function determineWinner(user, bot) {
    if (user === bot) return 'Ничья!';
    if (
        (user === 'Камень' && bot === 'Ножницы') ||
        (user === 'Ножницы' && bot === 'Бумага') ||
        (user === 'Бумага' && bot === 'Камень')
    ) {
        return 'Вы выиграли!';
    }
    return 'Бот выиграл!';
}
function updateHistory(userMove) {
    history.push(userMove);
    if (history.length > maxHistory) history.shift();
    const list = document.getElementById('history-list');
    list.innerHTML = '';
    history.forEach((move, idx) => {
        const li = document.createElement('li');
        li.textContent = `${idx + 1}. ${move}`;
        list.appendChild(li);
    });
}
function updateFullHistory(userMove, botMove) {
    fullHistory.push({ user: userMove, bot: botMove });
    const list = document.getElementById('full-history-list');
    list.innerHTML = '';
    fullHistory.forEach((item, idx) => {
        const li = document.createElement('li');
        li.innerHTML = `<span>Ход ${idx + 1}:</span> <span>Игрок — <b>${item.user}</b></span> <span>Бот — <b>${item.bot}</b></span>`;
        list.appendChild(li);
    });
}
function predictNextMove() {
    if (history.length < 3) {
        return getRandomMove();
    }
    const freq = { 'Камень': 0, 'Ножницы': 0, 'Бумага': 0 };
    history.forEach(move => { freq[move] = (freq[move] || 0) + 1; });
    const maxFreq = Math.max(...Object.values(freq));
    const mostCommonMoves = Object.keys(freq).filter(move => freq[move] === maxFreq);
    const predicted = mostCommonMoves[Math.floor(Math.random() * mostCommonMoves.length)];
    if (predicted === 'Камень') return 'Бумага';
    if (predicted === 'Ножницы') return 'Камень';
    return 'Ножницы';
}
function play(userMove) {
    const botMove = predictNextMove();
    document.getElementById('bot-move').textContent = `Бот выбрал: ${botMove}`;
    const result = determineWinner(userMove, botMove);
    document.getElementById('result').textContent = result;
    history.push(userMove);
    if (history.length > maxHistory) history.shift();
    updateFullHistory(userMove, botMove);
}
Object.keys(buttons).forEach(id => {
    document.getElementById(id).addEventListener('click', () => {
        play(buttons[id]);
    });
}); 