const socket=io('http://localhost:8000');

const form=document.getElementById('form');
const msginp=document.getElementById('text');
const msgcontainer=document.querySelector('.container');
var audio=new Audio('Ting-sound-effect.mp3');

const append=(message,position)=>{
    const msgelement=document.createElement('div');
    msgelement.innerText=message;
    msgelement.classList.add('msg');
    msgelement.classList.add(position);
    msgcontainer.append(msgelement);
    if(position=='left')
    {
        audio.play();
    }
}
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message=msginp.value;
    append(`You : ${message}`,'right');
    socket.emit('send',message);
    msginp.value="";
})
const name=prompt("Enter name to join IChat!");
socket.emit('new-user-joined',name);

socket.on('user-joined',name=>{
    append(`${name} joined the chat`,'right');
})

socket.on('receive',data=>{
    append(`${data.name} : ${data.message}` ,'left');
})

socket.on('left',name=>{
    append(`${name} left the chat`,'right');
})