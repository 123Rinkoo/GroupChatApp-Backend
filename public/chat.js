window.onload = function () {
    // axios.get('http://localhost:4000/getmessage')
    //     .then(messages => {
    //         localStorage.setItem('msgArray', JSON.stringify(messages.data))
    //         ShowingMessage();
    //         // console.log('this is last id: ', messages)
    //     })
    //     .catch(err => console.log(err));


    const token = localStorage.getItem('token');
    axios.get('http://localhost:4000/getAllGroups', { headers: { 'Authorization': token } })
        .then(groupdetails => {
            console.log(groupdetails.data.result);
            showingAllgroups(groupdetails.data.result);
        })
        .catch(err => {
            console.log(err);
        });
}

// setInterval(() => {
//     const messages = JSON.parse(localStorage.getItem('msgArray'));
//     const lastmessageId = messages[messages.length - 1].id;
//     // console.log('this is last id: ',lastmessageId)
//     axios.get(`http://localhost:4000/getmessage?lastId=${lastmessageId}`)
//         .then(messages => {
//             const OldMessages = JSON.parse(localStorage.getItem('msgArray'));
//             const MergedMessages = OldMessages.concat(messages.data);
//             localStorage.setItem('msgArray', JSON.stringify(MergedMessages))
//             ShowingMessage();
//         })
//         .catch(err => console.log(err));
// }, 1000); 

function ShowingMessage() {
    const messages = JSON.parse(localStorage.getItem('msgArray'));
    if (messages.length > 20) {
        var a = messages.length - 20;
        // console.log(a, messages.length);
        const removeFirstTwenty = messages.splice(a);
        console.log(removeFirstTwenty);

        localStorage.setItem('msgArray', JSON.stringify(removeFirstTwenty));

    }
    const limitedmessage = JSON.parse(localStorage.getItem('msgArray'));

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

// function messages(event) {
//     event.preventDefault();
//     const token = localStorage.getItem('token');
//     console.log(token);
//     const message = event.target.message.value;
//     event.target.message.value = "";
//     axios.post('http://localhost:4000/sendmessage', { key1: message }, { headers: { 'Authorization': token } })
//         .then(result => {
//             // window.location.href = 'chat.html'
//         })
//         .catch(err => console.log(err));
// }

function createGroup() {
    // console.log("its coming");
    const id1 = document.getElementById('hello');
    const id2 = `<div class="modal-body" id="Groupform">
    <form onsubmit="creatingGroup(event)" >
    
    <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Group Name</label>
    <input type="text" class="form-control" id="exampleInputEmail1" name="GroupName"  aria-describedby="emailHelp" placeholder="enter new group name" required>
    </div>
    
    <button type="submit" class="btn btn-success">Create Group</button>
    <button type="button" class="btn btn-light" onclick="closingGroupform()">Close</button><br>
    <div id="notify"></div>
    </form>
    
    </div>`
    id1.innerHTML = id2;
}

function creatingGroup(event) {
    event.preventDefault();
    const token = localStorage.getItem('token');
    const name = event.target.GroupName.value;
    event.target.GroupName.value = "";
    axios.post('http://localhost:4000/creategroup', { key1: name }, { headers: { 'Authorization': token } })
        .then(result => {
            // window.location.href = 'chat.html'
            console.log(result.data.GroupDetail);
            showingthisGroup(result.data.GroupDetail);
        })
        .catch(err => console.log(err));
}

function closingGroupform() {
    const id1 = document.getElementById('Groupform');
    id1.style = "display: none";
}

function showingthisGroup(GroupDetail) {
    // console.log(GroupDetail)
    const id1 = document.getElementById('Yourgroups');
    const id2 = `<h5>Group Name: <span class="badge bg-warning">${GroupDetail.Name}</span>&nbsp &nbsp &nbsp<button type="button"
    class="btn btn-primary btn-sm">Enter</button>&nbsp
    <button type="button" class="btn btn-primary btn-sm">Add Member</button>
</h5>`
    id1.innerHTML = id1.innerHTML + id2;
}
function showingAllgroups(AllGroups) {
    const id1 = document.getElementById('Yourgroups');
    for (i = 0; i < AllGroups.length; i++) {

        if (AllGroups[i].IsAdmin == true) {
            const id2 = `<form onsubmit="addmemberform(event)"><h5>Group Name: <span class="badge bg-warning">${AllGroups[i].GroupName}</span>&nbsp &nbsp &nbsp 
            
            <button type="button"class="btn btn-primary btn-sm" value="${AllGroups[i].ChatGroupId}" onclick="GroupMsgs(event)">Enter</button>&nbsp
            <input type="hidden" name="groupname"id="inputID" value="${AllGroups[i].GroupName}" >

            <input type="hidden" name="ChatGroupId"id="inputID" value="${AllGroups[i].ChatGroupId}" >
            <button type="submit"class="btn btn-primary btn-sm" onclick="">Add Member</button>

</h5></form>`
            id1.innerHTML = id1.innerHTML + id2;
        }
        else {
            const id2 = `<h5>Group Name: <span class="badge bg-warning">${AllGroups[i].GroupName}</span>&nbsp &nbsp &nbsp <button type="button"
    class="btn btn-primary btn-sm" value="${AllGroups[i].ChatGroupId}" onclick="GroupMsgs(event)">Enter</button>&nbsp</h5>`
            id1.innerHTML = id1.innerHTML + id2;
        }
    }
}

function GroupMsgs(event) {
    event.preventDefault();
    localStorage.setItem('ChatGroupId', event.target.value);
    console.log("hello",event.target.value);
    window.location.href = 'GroupMSG.html';
}

function addmemberform(event) {
    event.preventDefault();
    const groupname = event.target.groupname.value;
    const Groupid = event.target.ChatGroupId.value;
    // console.log(groupname);


    const id1 = document.getElementById('addmember');
    const id2 = `<div class="modal-body" id="Groupform">
    <form onsubmit="addmember(event)">
    
    <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Member Email</label>
    <input type="text" class="form-control" id="exampleInputEmail1" name="emailId"  aria-describedby="emailHelp" placeholder="Email address" required> 
    </div>

    <input type="hidden" name="groupname" 
    id="inputID" value="${groupname}">

    <input type="hidden" name="Groupid" 
    id="inputID" value="${Groupid}">
    
    <button type="submit" class="btn btn-success">Add Member</button>
    <button type="button" class="btn btn-light" onclick="closingGroupform()">Close</button><br>
    <div id="notify"></div>
    </form>
    
    </div>`
    id1.innerHTML = id2;
}

function addmember(event) {
    event.preventDefault();
    const groupname = event.target.groupname.value;
    const emailid = event.target.emailId.value;
    const Groupid = event.target.Groupid.value;
    console.log(emailid, groupname, Groupid);
    event.target.emailId.value = "";
    axios.post('http://localhost:4000/addmember', { key1: groupname, key2: emailid, key3: Groupid })
        .then(result => {
            console.log(result.data.message);
            notification(result.data.message);
        })
        .catch(err => {
            console.log(err.response.data.message);
            errnotification(err.response.data.message);
        });
}

function notification(message) {
    const id1 = document.getElementById('notify');
    id1.innerHTML = "";
    let id2 = `<div class="alert alert-success" role="alert">
      ${message}!
    </div>`
    id1.innerHTML = id2;
    setTimeout(() => {
        id1.innerHTML = "";
    }, 3000);
}

function errnotification(message) {
    const id1 = document.getElementById('notify');
    id1.innerHTML = "";
    let id2 = `<div class="alert alert-danger" role="alert">
      ${message}!
    </div>`
    id1.innerHTML = id2;
    setTimeout(() => {
        id1.innerHTML = "";
    }, 2000);
}