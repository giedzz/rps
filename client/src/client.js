const writeEvent = (text) => {
    // <ul> element
    const parent = document.querySelector('#events');

    //<li> element
    const el = document.createElement('li');
    el.innerHTML = text;

    parent.appendChild(el);

    //scroll to the bottom
    chatWindow = document.getElementById('events'); 
    var xH = chatWindow.scrollHeight; 
    chatWindow.scrollTo(0, xH);
};

const onFormSubmitted = (e) =>{
    e.preventDefault();

    const input = document.querySelector('#chat');
    const text = input.value;
    input.value = '';

    sock.emit('message', text);
};

const addButtonListeners = () => {
    ['rock', 'paper', 'scissors'].forEach((id)=>{
        const button = document.getElementById(id);
        button.addEventListener('click', ()=>{
            sock.emit('turn', id);
        });
    });
};

const writeScore = (score) => {
    const scoreEl = document.getElementById('score');
    scoreEl.innerHTML = score;
};

writeEvent('Welcome to RPS');

const sock = io();
sock.on('message', writeEvent);
sock.on('score', writeScore);

document
    .querySelector('#chat-form')
    .addEventListener('submit', onFormSubmitted);

addButtonListeners();