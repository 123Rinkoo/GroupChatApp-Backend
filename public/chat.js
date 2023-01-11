window.onload = function () {
    axios.get('http://localhost:4000/getmessage')
        .then(messages => ShowingMessage(messages.data))
        .catch(err => console.log(err));
}

// setInterval(() => {
//     window.location.href = 'chat.html'
// }, 1000);

function ShowingMessage(messages) {
    id1 = document.getElementById('chatmessages');
  for(i=0; i<messages.length; i++)
  {
      id2 = `<div class="cm">
      <p>${messages[i].UserName}: ${messages[i].Message}</p>
    </div>
    <hr>`
    id1.innerHTML=id1.innerHTML+id2;
  }
}

function messages(event) {
    event.preventDefault();
    const token = localStorage.getItem('token');
    console.log(token);
    const message = event.target.message.value;
    axios.post('http://localhost:4000/sendmessage', { key1: message }, { headers: { 'Authorization': token } })
        .then(result => {
            window.location.href = 'chat.html'
        })
        .catch(err => console.log(err));
}