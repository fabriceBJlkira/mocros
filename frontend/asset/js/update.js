const form2 = document.getElementById('myform2');


// compression de l'image de input type files et le transformer en URL
var imageURL = null;
var WIDTH = 250;
document.getElementById('update_image').addEventListener('change', (event)=>{
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


// fonction to Update users
form2.addEventListener('submit', (e)=>{
    e.preventDefault()
    const nom = document.getElementById('update_nom')
    const email = document.getElementById('update_email')
    const password = document.getElementById('update_password')
    const id = document.getElementById('update_id')
    const image2 = document.getElementById('update_images')

    if (nom.value == '' || email.value == '' || password.value == '') {
        alert('Rempliser chaque champs')
    } else {
        xhr.onreadystatechange = ()=>{
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    const message = JSON.parse(xhr.responseText);
                    // averina alaina ny user
                    getUser(globalpage)
                    $('#paginate').html('')
                    $('#success2').text(message.message)
                } else {
                    alert('Impossible de contacter le serveur')
                }
            }
        }
        
        const data = new FormData()
        data.append('nom', nom.value)
        data.append('email', email.value)
        data.append('password', password.value)
        data.append('id', id.value)
        // donne a notre post image la variable global qui contient l'image sous forme URL
        imageURL !== null ? data.append('images', imageURL) : data.append('images', image2.value);
        
        xhr.open('POST', 'http://127.0.0.1:8000/update.php', true);
        xhr.setRequestHeader('Accept', 'Application/json')
        xhr.setRequestHeader('x-requested-with', 'xmlhttprequest')
        xhr.send(data);
        imageURL = null      
    }
});