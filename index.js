const fecha = document.querySelector('#fecha')
const lista = document.querySelector('#lista')
const elemento = document.querySelector('#elemento')
const input = document.querySelector('#input')
const botonEnter = document.querySelector('#boton-enter')
const check = 'fa-check-circle'
const uncheck = 'fa-circle'
const lineThrough = 'line-through'
const LIST =[]

let id = 0 // para que inicie en 0 cada tarea tendra un id diferente

//creacion de fecha actualizada 

const FECHA = new Date ()
fecha.innerHTML = FECHA.toLocaleDateString('es-MX',{weekday: 'long', month: 'short', day:'numeric'})







// funcion de agregar tarea 

function agregarTarea( tarea,id,realizado,eliminado) {
    if(eliminado) {return} // si existe eliminado es true si no es false 

    const REALIZADO = realizado ? check : uncheck // si realizado es verdadero check si no uncheck

    const LINE = realizado ? lineThrough : '' 

    const elemento = `
                        <li id="elemento">
                        <i class="far ${REALIZADO}" job="complete" id="${id}"></i>
                        <p class="${LINE}">${tarea}</p>
                        <i class="fas fa-trash de" job="delete" id="${id}"></i> 
                        </li>
                    `
    lista.insertAdjacentHTML("beforeend",elemento)

}


// crear un evento para escuchar el enter y para habilitar el boton 

botonEnter.addEventListener('click', ()=> {
    const tarea = input.value
    if(tarea){
        agregarTarea(tarea,id,false,false)
        LIST.push({
            name : tarea,
            id : id,
            realizado : false,
            eliminado : false
        })
        id++
        input.value = ''
    }

})

document.addEventListener('keyup', function (event) {
    if (event.key=='Enter'){
        const tarea = input.value
        if(tarea) {
            agregarTarea(tarea,id,false,false)
        LIST.push({
            nombre : tarea,
            id : id,
            realizado : false,
            eliminado : false
        })
        id++
        input.value = ''
        console.log(LIST)
        }
    }
    
})


document.addEventListener('click',function(event){
    const element = event.target 
    console.log(element)
})