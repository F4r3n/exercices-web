function drawShape() {
    const radius = parseInt(document.getElementById('radius').value, 10)
    let array = new Array(radius*4)
    for(let i = 0; i < array.length; ++i) {
        array[i] = new Array(radius*4);
    }
    fillShape(array, radius, array.length)

    let div = document.getElementById('result')
    div.innerHTML = ""
    for(let i = 0; i < array.length; ++i) {
        var p = document.createElement("p")
        p.style.marginTop="0.6em"
        p.style.marginBottom="0.6em"

        for(let j = 0; j < array[i].length; ++j) {
            if(array[i][j] !== '' ) {
                p.appendChild(document.createTextNode(array[i][j]))
            }
            else {
                p.innerHTML += '.'
            }
        }
        div.appendChild(p)
    }
}

//Fill the array with a value different than '' to draw the shape.
// To fill an array use []. For example with an array = [1, 2, 3]. array[0] => 1

function fillShape(array, radius, arrayLength) {
    //Fill the array

}