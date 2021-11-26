const clear = document.querySelector('.clear')
const dateElement = document.querySelector('#date')
const list = document.getElementById("list")
const input = document.querySelector('#input')
const check = 'fa-check-circle'
const uncheck = 'fa-circle'
const lineThrough = 'line-Through'
let LIST,id

//get item and check isnt empty
let data = localStorage.getItem('TODO')
if(data){
    LIST = JSON.parse(data)
    id = LIST.length
    loadList(LIST)
}else {
    LIST = []
    id = 0
}

function loadList(array) {
    array.forEach(function(item){
        addToDo(item.name,item.id,item.done,item.trash)
    })
}

//Mostrar elemento fecha 
const today = new Date()
let options = {weekday: 'long',  month: 'short', day:'numeric'}
dateElement.innerHTML = today.toLocaleDateString('es-MX',options)


//agregarTarea

function addToDo(toDo, id, done, trash){
    if (trash) {return} //si existe trash entonces retorna si existe es true si no es false

    const DONE = done ? check : uncheck // si done es verdadero aplica ? si es falso :
    const LINE = done ? lineThrough : '' // si donde es verdaero tambien aplica subrayado
    const item = `   
                     <li class="item">
                        <i class="far ${DONE} co" data="complete" id="${id}"></i>
                        <p class="text ${LINE}">${toDo}</p>
                        <i class="fas fa-trash de" data="delete" id="${id}"></i> 
                    </li>
                `
     // const position ='beforeend'
    list.insertAdjacentHTML("beforeend",item)
}

//addToDo('Drink cofee',1,false,false)
//agregar tarea usando tecla de enter


document.addEventListener('keyup', function(event) {
    if(event.keyCode == 13) {
        const toDo = input.value
        if(toDo){ //si no está vacio
            addToDo(toDo,id,false,false) // false y false es la plantilla presideñada
            LIST.push ({
                name : toDo,
                id : id,
                done : false,
                trash : false
            })
            //add item to localstorage
            localStorage.setItem('TODO',JSON.stringify(LIST))
            id++
            input.value = ''
        }
    }
})



list.addEventListener('click', function(event){
    const element = event.target
    const elementData = element.attributes.data.value
    console.log(elementData)

    if ( elementData == 'complete'){
        completeToDo(element)
    }else if (elementData == 'delete'){
        removeToDo(element)
    }
    //add item to localstorage
    localStorage.setItem('TODO',JSON.stringify(LIST))

})


function completeToDo(element) {
    element.classList.toggle(check) 
    element.classList.toggle(uncheck)
    element.parentNode.querySelector('.text').classList.toggle(lineThrough)
    LIST[element.id].done = LIST[element.id].done ?false : true 
}

function removeToDo(element) {
    element.parentNode.parentNode.removeChild(element.parentNode)
    LIST[element.id].trash = true

}
// function completeToDo(element) {
//     element.classlist.toggle(uncheck)
//     element.classlist.toggle(check)
// }

