let socket = io();


$(function() {

    let username = prompt('What is your name?');

    $('#user-input').on('submit', function(e) {
        e.preventDefault();
        let chatbox = $('#chatbox')
        //let nameData = $('.user-input__name').val();
        let msgData = $('.user-input__msg').val();
        let submittedInput = `<li class="chatbox__text">${username}: ${msgData}</li>`;
        socket.emit('message', submittedInput);
        //chatbox.append(submittedInput);
        $('.user-input__name').val('');
        $('.user-input__msg').val('');
    })

});

socket.on('message', function(msg) {
    $(msg).appendTo('#chatbox');
});