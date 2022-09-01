const socket = io();

const spanNotification  = document.getElementById('spanNotification');
const usersList         = document.getElementById('usersList');
const sendMessage       = document.getElementById('sendMessage');
const messageInput      = document.getElementById('messageInput');
const messagesContainer = document.getElementById('messagesContainer');

const userName = new URLSearchParams(window.location.search).get("userName");

socket.emit('joinMessage', { userName });

socket.on('notification', data => {
  spanNotification.innerHTML = data;
});

socket.on('allMessage', data => {
  data.forEach(message => {
    messageText = `
      <li class="clearfix">
        <div class="message-data text-right">
          <span class="message-data-time">${message.author.id}:</span>
        </div>
        <div class="message other-message float-right">${message.text.mensaje}</div>
      </li>`;

    messagesContainer.innerHTML += messageText;
  });
});

socket.on('message', data => {
  const message = `
    <li class="clearfix">
      <div class="message-data text-right">
        <span class="message-data-time">${data.author.id}:</span>
      </div>
      <div class="message other-message float-right">${data.text.mensaje}</div>
    </li>`;
  messagesContainer.innerHTML += message;
});

socket.on('users', data => {
  const users = data
    .map(user => {
      const userTemplate = `
        <li class="clearfix">
          <img src=${user.avatar} alt="avatar">
          <div class="about">
            <div class="name">${user.userName}</div>
            <div class="status"><i class="fa fa-circle online"></i>Online</div>
          </div>
        </li>`;
      return userTemplate;
    })
    .join('');

  usersList.innerHTML = users;
});

sendMessage.addEventListener('click', () => {
  socket.emit('messageInput', messageInput.value);
  messageInput.value = "";
});