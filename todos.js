var input = document.querySelector('input');
var ul = document.getElementById('list');
var button = document.querySelector('#btn');
var comp = document.getElementsByClassName('fa-check-circle');
var circ = document.getElementsByClassName('fa-circle');
var del = document.getElementsByClassName('fa-trash');
var clear = document.querySelector('.clear');
var li = document.querySelector('.item');
var text = document.querySelector('.text');
var list = [];
var id = 0;

document.addEventListener("keypress", function(event) {
    if (event.keyCode === 13) {
        var listItem = input.value;
        if (listItem) {
            addItem(listItem, id, false, false);
            list.push({
                name: listItem,
                id: id,
                done: false,
                trash: false
            });
            //to add item in localStorage
            localStorage.setItem("todo", JSON.stringify(list));
            id++;
        }
        input.value = "";
    }
});

function addItem(listItem, id, done, trash) {
    if (trash) { return; }
    const DONE = done ? "fa-check-circle" : "fa-circle";
    const LINE = done ? "lineThrough" : "";

    const item = `<li class="item">
                    <i class="far ${DONE} co fa-1x" job="complete" id="${id}"></i>
                    <p class="text ${LINE}">${listItem}</p>
                    <i class="fa fa-trash de fa-1x" job="delete" id="${id}"></i>
                      </li>`;
    ul.insertAdjacentHTML("beforeend", item);
}


//target the items created dynamically
ul.addEventListener("click", function(event) {
    const e = event.target;
    const eJob = e.attributes.job.value;
    if (eJob == "complete") {
        toggle(e);
    } else if (eJob == "delete") {
        remove(e);
    }
    //to add item in localStorage
    //to update values in list, updated due to toggle, remove
    localStorage.setItem("todo", JSON.stringify(list));

})

//on toggle, value will get true/false and list should be updated.
function toggle(e) {
    e.classList.toggle("fa-check-circle"); //to check task
    e.classList.toggle("fa-circle");  //to uncheck task
    e.parentNode.querySelector(".text").classList.toggle("lineThrough");
    list[e.id].done = list[e.id].done ? false : true; //remember we have defined id attribute to icons where id number is stored.
}

function remove(e) {
    e.parentNode.parentNode.removeChild(e.parentNode);
    list[e.id].trash = true; //remember we have defined id attribute to icons where id number is stored.
}

//to get item from localStorage
let data = localStorage.getItem("todo");
if (data) {
    list = JSON.parse(data);
    id = list.length;
    loadlist(list); //if(trash:false) function works well; else some items cannot be retreived having (trash:true).
} else {
    list = [];
    id = 0;
}
//load items from localStorage
function loadlist(array) {
    array.forEach(function(item) {
        addItem(item.name, item.id, item.done, item.trash);
    });
}
//clear the localStorage
clear.addEventListener("click", function() {
    localStorage.clear();
    location.reload();
})
