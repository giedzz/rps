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

const showGif = (link) => {
    // <ul> element
    const parent = document.querySelector('#events');

    //<li> element
    const el = document.createElement('li');

    //<img> element
    const img = document.createElement('iframe');
    
    img.src = link;

    parent.appendChild(el);
    el.appendChild(img);

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
    document.getElementById('score').innerHTML = score;
};

const writeOponentScore = (oponentScore) =>{
    document.getElementById('oponent-score').innerHTML = oponentScore;
};

writeEvent('Welcome to RPS');

const sock = io();
sock.on('message', writeEvent);
sock.on('score', writeScore);
sock.on('oponentScore', writeOponentScore);
sock.on('gif', showGif);

document
    .querySelector('#chat-form')
    .addEventListener('submit', onFormSubmitted);

addButtonListeners();