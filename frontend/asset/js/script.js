const xhr = new XMLHttpRequest();
const form = document.getElementById('myform');
// variable global izay miovaova a chaaque click sur le pagination
var globalpage = 1;

// get users
function getUser(page = null) {
    xhr.onreadystatechange = ()=>{
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                // code jquery to fetch user
                $('#blocUser').html('')
                const users = JSON.parse(xhr.responseText);
                // console.log(users.page);
                let page = users.page
                if (users.message) {
                    // si la base est vide
                    $('#blocUser').append('<h5>'+users.message+'</h5>');
                } else {
                    $.each(users.data, function (key, item){
                        $('#blocUser').append('<div class="col-lg-4 col-md-6 col-sm-12">\
                            <div class="card" style="margin-top:2%;">\
                                <div class="card-header text-center">\
                                    <img src="'+item.images+'" class="img-fluid" alt="">\
                                </div>\
                                <div class="card-body">\
                                    <div class="group_element_client">\
                                        <h5>Name :</h5>\
                                        <p>'+item.nom+'</p>\
                                    </div>\
                                    <div class="group_element_client">\
                                        <h5>email :</h5>\
                                        <p>'+item.email+'</p>\
                                    </div>\
                                </div>\
                                <div class="card-footer">\
                                    <div class="row">\
                                        <div class="col-6">\
                                            <button id="delete'+item.id+'" class="btn btn-outline-danger btn-block" onclick="deleteUser(delete'+item.id+')">Supprimer</button>\
                                        </div>\
                                        <div class="col-6">\
                                            <button id="update'+item.id+'" class="btn btn-secondary btn-block updateID" onclick="updateUser(update'+item.id+')">Update</button>\
                                        </div>\
                                    </div>\
                                </div>\
                            </div>\
                        </div>');
                    });
                    
                    for (let index = 1; index <= page; index++) {
                        // $('#paginate').html('')
                        $('#paginate').append('<div class="text-center" style="">\
                        <div class="text-center">\
                            <button class="btn btn-success" id="'+index+'" onclick="getPage('+index+')">'+index+'</button>\
                        </div>\
                        </div>');
                    };
                }

            } else {
                alert('Impossible de contacter le serveur')
            }
        }
    }
    var realPage = 0;
    // teste si la page est encore null ou pas
    page === null ? realPage = 1 : realPage = page;
    xhr.open('GET', 'http://127.0.0.1:8000?page='+realPage, true);
    xhr.setRequestHeader('x-requested-with', 'xmlhttprequest')
    xhr.send();
}
// fonction maka page
const getPage = (id)=>{
    globalpage = id;
    getUser(id)
    $('#paginate').html('')
}

getUser()

// compression de l'image de input type files et le transformer en URL
var imageURL = null;
var WIDTH = 250;
document.getElementById('image').addEventListener('change', (event)=>{
    let img_file = event.target.files[0]
    const reader = new FileReader()
        reader.readAsDataURL(img_file)
        reader.onload = (ev)=>{
            const url = ev.target.result  
            // initialisation de nouvelle imageURL
            const image = document.createElement('img');
            image.src = url

            // create a new image 
            image.onload = (event)=>{
                let canvas = document.createElement('canvas')
                let ratio = (WIDTH / event.target.width)
                canvas.width = WIDTH;
                canvas.height = (event.target.height * ratio)
                const context = canvas.getContext('2d')
                context.drawImage(image, 0, 0, canvas.width, canvas.height)

                // new url
                const new_URL = canvas.toDataURL('image/jpeg', 90)
                // rendement de l'url a notre variable global
                imageURL = new_URL
            }
        }
})

// fonction to post new users
form.addEventListener('submit', (e)=>{
    e.preventDefault()
    const nom = document.getElementById('nom')
    const email = document.getElementById('email')
    const password = document.getElementById('password')
    const image = document.getElementById('image')
    if (nom.value == '' || email.value == '' || password.value == '' || image.value == '') {
        alert('Rempliser chaque champs')
    } else {
        xhr.onreadystatechange = ()=>{
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    const message = JSON.parse(xhr.responseText);
                    // refa lasa le data de alana ny doner
                    nom.value = ''         
                    email.value = ''         
                    password.value = ''         
                    image.value = ''
                    // averina alaina ny user
                    getUser(globalpage)
                    $('#paginate').html('')
                    $('#success').text(message.message)
                } else {
                    alert('Impossible de contacter le serveur')
                }
            }
        }
        
        const data = new FormData()
        data.append('nom', nom.value)
        data.append('email', email.value)
        data.append('password', password.value)
        // donne a notre post image la variable global qui contient l'image sous forme URL
        data.append('images', imageURL)
        
        xhr.open('POST', 'http://127.0.0.1:8000', true);
        xhr.setRequestHeader('x-requested-with', 'xmlhttprequest')
        xhr.send(data);      
    }
});

// get user to update

function updateUser(event) {
    // get the id of button
    let firstID = event.id; // return updateID

    // translate firstID to number
    let index = firstID.replace('update', '') // return ID

    const realID = index;
    xhr.onreadystatechange = ()=>{
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                // code jquery to fetch user
                $('#modalupdate').modal('show')
                const users = JSON.parse(xhr.responseText);

                if (users.message) {
                    // si la base est vide
                    $('#modalupdates').append('<h5>'+users.message+'</h5>');
                } else {
                    // sinon
                    $('#update_nom').val(users.data[0].nom)
                    $('#update_email').val(users.data[0].email)
                    $('#update_password').val(users.data[0].password)
                    $('#update_id').val(users.data[0].id)
                    $('#update_image').val(null)
                    $('#update_images').val(users.data[0].images)
                }
            } else {
                alert('Impossible de contacter le serveur')
            }
        }
    }
    
    xhr.open('GET', 'http://127.0.0.1:8000/update.php?id='+realID, true);
    xhr.setRequestHeader('x-requested-with', 'xmlhttprequest')
    xhr.send();
    $('#update_nom').val('')
    $('#update_email').val('')
    $('#update_password').val('')
    $('#update_id').val('')
    $('#update_image').val(null)
    $('#update_images').val('')
}

// delete users

function deleteUser(event) {
    // get the id of button
    let firstID = event.id; // return deleteID

    // translate firstID to number
    let index = firstID.replace('delete', '') // return ID

    const realID = index;
    xhr.onreadystatechange = ()=>{
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                $('#modaldelete').modal('show')
                getUser(globalpage)
                $('#paginate').html('')
            } else {
                alert('Impossible de contacter le serveur')
            }
        }
    }
    
    xhr.open('GET', 'http://127.0.0.1:8000/delete.php?id='+realID, true);
    xhr.setRequestHeader('x-requested-with', 'xmlhttprequest')
    xhr.send();

}