let socket = io();


$(function() {

    let username;

    /* let username = prompt('What is your name?');
    let chatMsgLabel = `<label for="user-input">${username}, enter your message here:</label>`;
    $(chatMsgLabel).prependTo('#user-input'); */

    $('#username-input').on('submit', function() {
        let nameData = $('.user-input__name').val();
        username = nameData;
        $(this).parent().remove();
        let chatMsgLabel = `<label for="user-input">${username}, enter your message here:</label>`;
        $(chatMsgLabel).prependTo('#user-input');
    })

    $('#user-input').on('submit', function(e) {
        e.preventDefault();
        let chatbox = $('#chatbox')
        //let nameData = $('.user-input__name').val();
        let msgData = $('.user-input__msg').val();
        let submittedInput = `<li class="chatbox__text">${username}: ${msgData}</li>`;
        socket.emit('message', submittedInput);
        //chatbox.append(submittedInput);
        //$('.user-input__name').val('');
        $('.user-input__msg').val('');
    })

});

socket.on('message', function(msg) {
    $(msg).hide().appendTo('#chatbox').fadeIn(1000);
});