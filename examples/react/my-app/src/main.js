

function retrieveData(inParams, callback) {
    fetch('/search', {
        method:'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(inParams)
    })
    .then(function(response) {
        if(response.ok) {
            callback( response.json())
        }
    });
}