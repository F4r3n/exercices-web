function calculus() {
    const leftValue = parseInt(document.getElementById('a').value, 10)
    const rightValue = parseInt(document.getElementById('b').value, 10)

    const operation = document.getElementById('operation').value
    document.getElementById('result').innerText = compute(leftValue, rightValue, operation).toString()
}

function selectOnChange() {
    const operation = document.getElementById('operation').value
    if(operation === '!' || operation === 'fibonacci') {
        console.log(add(3))
        document.getElementById('b').style.visibility = 'hidden'
    }
}


function compute(left, right, operation) {
    //return values depending on the operation
   
}

