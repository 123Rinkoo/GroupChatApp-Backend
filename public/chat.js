function messages(event){
    event.preventDefault();
    const token=localStorage.getItem('token');
    console.log(token);
    const message=event.target.message.value;
    axios.post('http://localhost:4000/sendmessage', {key1: message }, {headers: {'Authorization': token}} )
    .then()
    .catch()

}