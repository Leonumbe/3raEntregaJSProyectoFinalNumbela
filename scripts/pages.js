//declaracion variables golabales
let reserva;
let deleteCart;
let userBooked;
let buttonSubmit;
let fee = 0.1;

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
    <h1 id="bookedSelection"class="subT  h1adapted">Booked Selection</h1>
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
        <div id=${id} >
            <img class="imgBooked" src="${img}" alt="Imagen de la room"> 
            <div class='boxBooked'>
                <div class="head">Name: ${name}</div>
                <div class="subT">Category: ${category}</div>
                <div>Quantity booked: ${cantidad}</div>
                <div class="price">Price per night: $${price.toLocaleString()}- Euros</div>
                <div>Total Amount: $ ${(cantidad * price * localStorage.getItem("dateTotal")).toLocaleString()}- Euros</div>
            </div>
            <button id='delete' class='btn'>Delete</button>
        </div>
        `
        tbody.innerHTML += reservaFinal
    }

    //Evento borrar reserva
    deleteCart = document.getElementById('delete')

    deleteCart.onclick = () => {
        reserva = []
        tbody.innerHTML = ``
        localStorage.setItem('reserva', JSON.stringify(reserva))
        checkIn = '';
        checkOut = '';
        dateTotal = '';
        pasajeroSelect = ''
        userBooked = {};
        localStorage.setItem('check-in',JSON.stringify(checkIn))
        localStorage.setItem('check-out',JSON.stringify(checkOut))
        localStorage.setItem('dateTotal',JSON.stringify(dateTotal))
        localStorage.setItem('pasajeros',JSON.stringify(pasajeroSelect))
        localStorage.setItem('userBooked', JSON.stringify(userBooked))
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
    Swal.fire({
        title: 'Great, your booked were processed correctly!!!',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })
}

//-----------------------check-in-out-------------------------------//

//Cargo guests
let guests = [ '', 1, 2];
let pasajeros = document.getElementById('pasajeros'); 

function opciones(arrayGuests, opcion){
    let guestsChoose = "";
    for (let i = 0; i <arrayGuests.length; i++){
        guestsChoose += "<option>" + arrayGuests[i] + "</option>";
    }
    opcion.innerHTML = guestsChoose
} 
opciones(guests, pasajeros)

//Guests select
function obtenerPasajero(){
    let pasajeroSelect = document.getElementById("pasajeros");
    localStorage.setItem(pasajeroSelect.id, pasajeroSelect.value)
}

Date
let actualDate;
function fechaActualizada(){
    actualDate = new Date();
    console.log(actualDate.getTime())
}
fechaActualizada()

//Date
let checkIn = document.getElementById("check-in");
let checkOut = document.getElementById("check-out");

function obtenerFecha(){   
    localStorage.setItem(checkIn.id, checkIn.value);
    localStorage.setItem(checkOut.id, checkOut.value);
   
    let checkInDate = new Date(checkIn.value);
    let checkOutDate = new Date(checkOut.value);
    //console.log(checkInDate.getTime())

    if (checkInDate.getTime() < actualDate.getTime()) {
       alert("error, debe elegir una fecha vigente para su checkin"+"\n"+actualDate)
        checkInDate = new Date(checkIn.value);
    }if((checkOutDate <= actualDate)||(checkOutDate == checkInDate )) {
       alert("error, debe elegir una fecha posterior a la fecha de checkin"+"\n"+checkInDate)
        checkOutDate = new Date(checkIn.value);
    }else{
    let dateTotal = checkOutDate - checkInDate;
    localStorage.setItem("dateTotal", Math.floor(dateTotal / (1000 * 60 * 60 * 24)));
    alert("Ha reservado esta habitacion por "+dateTotal/(1000 * 60 * 60 * 24)+" noche/s")
    }
    //ver validacion
    // if (localStorage.getItem(dateTotal) == NaN) {
    //     alert("debe definir fechas")
    // } else {
    //     alert("Ha reservado esta habitacion por "+dateTotal/(1000 * 60 * 60 * 24)+" noche/s") 
    // }
    
}

function pasajeroDatos(){
    obtenerPasajero()
    obtenerFecha()
  
    if(checkIn.value,checkOut.value,pasajeros.value === null || checkIn.value,checkOut.value,pasajeros.value === ''){
        alert("Select a date and guests to continue")
    }else{
        window.location.href = "#bookedInProgress";
    }
}


