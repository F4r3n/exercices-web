function calculus() {
    let leftValue = parseInt(document.getElementById('a').value, 10)
    let rightValue = parseInt(document.getElementById('b').value,10)

    let operation = document.getElementById('operation').value

    console.log(leftValue)
    console.log(rightValue)
    console.log(operation)
    document.getElementById("result").innerText = compute(leftValue, rightValue, operation).toString()
}

function compute(left, right, operation) {
    //return values depending on the operation
}