var socket = io.connect('http://192.168.1.71:6677',{'forceNew':true}); //Se configura la ip

socket.on('message', function(data){
    console.log(data);
    render(data);
});

function render(data){
    const html = data.map(function(message, index){
        return (`
            <div class="message">
                <strong>${message.nickname}:</strong>
                <p class="lead">${message.text}</p><hr>
            </div>
        `);
    }).join(' ');

    document.getElementById('message').innerHTML = html;

}

function addMessage(e){
    const message = {
        nickname: document.getElementById('nickname').value,
        text: document.getElementById('text').value
    };

    // document.getElementById('nickname').style.display = 'none';
    socket.emit('add-message', message);

    return false;
}