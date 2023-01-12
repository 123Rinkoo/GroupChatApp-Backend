window.onload = function () {
    axios.get('http://localhost:4000/getmessage ')
        .then(messages => {
            localStorage.setItem('msgArray', JSON.stringify(messages.data))
            ShowingMessage();
            // console.log('this is last id: ', messages)
        })
        .catch(err => console.log(err));
}

setInterval(() => {
    const messages = JSON.parse(localStorage.getItem('msgArray'));
    const lastmessageId = messages[messages.length - 1].id;
    // console.log('this is last id: ',lastmessageId)
    axios.get(`http://localhost:4000/getmessage?lastId=${lastmessageId}`)
        .then(messages => {
            const OldMessages = JSON.parse(localStorage.getItem('msgArray'));
            const MergedMessages = OldMessages.concat(messages.data);
            localStorage.setItem('msgArray', JSON.stringify(MergedMessages))
            ShowingMessage();
        })
        .catch(err => console.log(err));
}, 1000);

function ShowingMessage() {
    const messages = JSON.parse(localStorage.getItem('msgArray'));
    if(messages.length>20){
        var a=messages.length-20;
        // console.log(a, messages.length);
        const removeFirstTwenty = messages.splice(a);
        console.log(removeFirstTwenty);

        localStorage.setItem('msgArray', JSON.stringify(removeFirstTwenty));
        
    }
    const limitedmessage=JSON.parse(localStorage.getItem('msgArray'));

    id1 = document.getElementById('chatmessages');
    id1.innerHTML = "";

    for (i = 0; i < limitedmessage.length; i++) {
        id2 = `<div class="cm">
      <p>${limitedmessage[i].UserName}: ${limitedmessage[i].Message}</p>
    </div>
    <hr>`
        id1.innerHTML = id1.innerHTML + id2;
    }
}

function messages(event) {
    event.preventDefault();
    const token = localStorage.getItem('token');
    console.log(token);
    const message = event.target.message.value;
    event.target.message.value="";
    axios.post('http://localhost:4000/sendmessage', { key1: message }, { headers: { 'Authorization': token } })
        .then(result => {
            // window.location.href = 'chat.html'
        })
        .catch(err => console.log(err));
}