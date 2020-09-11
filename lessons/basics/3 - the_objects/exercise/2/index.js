function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

function generateArray() {
    const span = document.getElementById("arraySpan")
    span.innerHTML = ""
    let array = document.createElement("table")
    array.classList.add("array1");
    let row = document.createElement("tr");
    const max = 100
    for(let i = 0; i < max/2; i++) {

        let cell = document.createElement("td");
        cell.innerText=getRandomInt(max);
        array.appendChild(cell);
        setTimeout(()=> cell.classList.add("animate"), i*10);

    }
    array.appendChild(row)
    span.appendChild(array)

    document.getElementById("max").style.display="block"
    document.getElementById("min").style.display="block"

}

function find(type) {
    const elements = document.getElementsByClassName("animate");
    const array = new Array(elements.length);
    for(let i = 0; i < array.length; ++i) {
        elements[i].style.backgroundColor="transparent";

        const parsed = parseInt(elements[i].innerText, 10);
        array[i] = parsed;
    }
    let id = 0;
    let correctID = 0;
    if(type === 0) {
        id = findMax(array);
        correctID = CHECK_max(array);
    }
    else if( type === 1) {
        id = findMin(array);
        correctID = CHECK_min(array);
    }

    if(id >= 0 && id < array.length) {
        elements[id].style.backgroundColor="red";
        elements[correctID].style.backgroundColor="green";
    }
}

function findMax(array) {
    return 0;
}

function findMin(array) {
    return 0;
}