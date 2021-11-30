let socket = io();

$(function() {

    $('#user-input').on('submit', function(e) {
        e.preventDefault();
        let chatbox = $('#chatbox')
        let nameData = $('.user-input__name').val();
        let msgData = $('.user-input__msg').val();
        socket.emit('message', msgData);
        let submittedInput = `<li class="chatbox__text">${nameData}: ${msgData}</li>`;
        chatbox.append(submittedInput);
        $('.user-input__name').val('');
        $('.user-input__msg').val('');
    })

});

socket.on('message', function(msg) {
    $('<li class="chatbox__text">').text(msg).appendTo('#chatbox');
});