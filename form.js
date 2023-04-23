const URL_ENDPOINT = 'http://localhost:3000/members';

class Member{
    constructor(firstName, lastName, email){
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }
}

function getMembers(){
    fetch(URL_ENDPOINT, {
        type: 'GET',
        contentType: "application/json",
      }).then(res => {
        if (res.ok) {
            return res.json();
        }
      }).then(data => data.map(members => {
          $('tbody').append(
              $(`
                  <tr>
                  <td>${members.id}</td>
                  <td>${members.firstName}</td>
                  <td>${members.lastName}</td>
                  <td>${members.email}</td>
                  <td><button class="btn btn-danger" onclick="deleteMember(${members.id})">Delete Member</button><td>
                  </tr>    
              `)
           )
      })
      )
}

//POST function
$("#addMember").click(function(){
    const member = new Member($("#firstName").val(), $("#lastName").val(), $("#email").val());
    createMember(member);
})


function createMember(member){
    return $.ajax({
        url: URL_ENDPOINT,
        data: JSON.stringify(member),
        dataType: "json",
        type: "POST",
        contentType:"application/json",
        crossDomain: true,
    }).then(
        getMembers()
    )
}

//DELETE function
function deleteMember(id){
    return $.ajax({
        url:`${URL_ENDPOINT}/${parseInt(id)}`,
        type: "DELETE",
    })
}
//PUT function
function updateMember(){
    let id = $("#memberId").val();

    $.ajax(`${URL_ENDPOINT}/${id}`,{
        method: 'PUT',
        data: {
            firstName: $('#updateFirstName').val(),
            lastName: $('#updateLastName').val(),
            email: $('#updateEmail').val(),
        }
    })
}

$('#updateMember').click(updateMember);
getMembers();