let socket = io();

function renderCivilianTime(date) {
    let hour = date.getHours();
    let minute = date.getMinutes();
    if (hour > 12) {
        return `${hour - 12}:${minute}PM`;
    } else if (hour < 12) {
        return `${hour}:${minute}AM`;
    }
}


$(function() {

    let username;

    $('#username-input').on('submit', function() {
        let nameData = $('.user-input__name').val();
        username = nameData;
        $(this).parent().remove();
        let chatMsgLabel = `<label for="user-input">${username}, enter your message here:</label>`;
        $(chatMsgLabel).prependTo('#user-input');
    })

    $('#user-input').on('submit', function(e) {
        e.preventDefault();
        let msgData = $('.user-input__msg').val();
        let today = new Date();
        let currentTime = renderCivilianTime(today);
        let submittedInput = `<li class="chatbox__text">${username}: ${msgData} - ${currentTime}</li>`;
        let rawMsg = `${username}: ${msgData} - ${currentTime}`
        socket.emit('message', submittedInput);
        socket.emit('rawMessage', rawMsg);
        $('.user-input__msg').val('');
    })

});

socket.on('message', function(msg) {
    $(msg).hide().appendTo('#chatbox').fadeIn(1000);
});

socket.on('rawMessage', function(rawmsg) {
    
});