//declaracion variables golabales
let reserva;
let deleteCart;
let userBooked;
let buttonSubmit;

//Nuestra reserva la guardamos en el localStorage
if (JSON.parse(localStorage.getItem('reserva'))){
    reserva = JSON.parse(localStorage.getItem('reserva'))
    }else{
    localStorage.setItem('reserva', JSON.stringify([]))
    reserva = JSON.parse(localStorage.getItem('reserva'))
}

//---------------page Booked---------------------//
//Funcion suma
//reduce ciclo de producto mas acum. Monto total mas fee 0.1
const totalReserved = () => {
    return reserva.reduce((acumulador, prod) => acumulador + ((prod.price * 0.1 + prod.price) * prod.cantidad, 0 ))
}

const body = document.getElementById('bookedInProgress');
//desplegamos reserva en el Dom
if(reserva.length == 0){
    const noBookedSelection = 
    `
    <h1 class="title subTAdapt">You are not selected any room</h1>
    <a class="" href="../index.html">
        <button class="btn">Back</button>
    <a/>
    `
    body.innerHTML += noBookedSelection; 
    }else{
    const summary = `
    <h1 class="subT">Booked Selection</h1>
    <div id='tBody'></div>
    <a id="filter" class="btn" href="../index.html">Back</a>
    <a href="#Form" class="btn">End Booked</a>
    `
    body.innerHTML += summary
    const tbody = document.getElementById('tBody')
    for (let i = 0; i < reserva.length; i++) {
        const element = reserva[i];
        const { id, category, name, price, img, cantidad } = element;
        const reservaFinal = `
        <div id=${id}>
            <img src="${img}" alt="Imagen de la room">    
            <div class="head">${name}</div>
            <div class="subT">${category}</div>
            <div>${cantidad}</div>
            <div class="price">$${price.toLocaleString()}- Euros</div>
            <div>Precio*Q: $${(cantidad * price).toLocaleString()}</div>
            <button id='delete' class='btn'>Delete</button>
        </div>`
        tbody.innerHTML += reservaFinal
    }

    //Evento borrar reserva
    deleteCart = document.getElementById('delete')

    deleteCart.onclick = () => {
        reserva = []
        tbody.innerHTML = ``
        localStorage.setItem('reserva', JSON.stringify(reserva))
        console.log(reserva)
    }
}

//---------------Form---------------------//

//Nuestro formulario es guardado en el localStorage
if (JSON.parse(localStorage.getItem('userBooked'))){
    reserva = JSON.parse(localStorage.getItem('userBooked'))
    }else{
    localStorage.setItem('userBooked', JSON.stringify([]))
    reserva = JSON.parse(localStorage.getItem('userBooked'))
}
//Completar formulario
function endBooked() {
    class user {
        constructor(name,surname,email,phone,text){
            this.name = name,
            this.surname = surname,
            this.email = email,
            this.phone = phone,
            this.text = text
        }
    }
    let name = document.getElementById('name');
    let surname = document.getElementById('surname');
    let email = document.getElementById('email');
    let phone = document.getElementById('phone');
    let text = document.getElementById('dato');
    
    userBooked = new user(name.value, surname.value, email.value, phone.value, text.value)
    
    while ((((userBooked.name == '') || (userBooked.surname == '')) || (userBooked.email == '')) || (userBooked.phone == '')){
        //alert('Sorry, but you must complete the form to submit!!!')
        Swal.fire({
            title: 'Sorry, but you must complete the form to be able to send it!!!',
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            }
          })
        userBooked += new user(name.value, surname.value, email.value, phone.value, text.value)
        
    }
    localStorage.setItem('userBooked', JSON.stringify(userBooked))
    console.log(userBooked);
    console.log(reserva)
}

buttonSubmit = document.getElementById('buttonSubmit');

buttonSubmit.onclick = (e) => {
    e.preventDefault()
    endBooked()
}

