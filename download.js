function getPDF(){
    console.log("Download clicked");
    var username = document.getElementById("username").getAttribute('data-username');

    const postMessage = {
        Username: username,
    };
    fetch('http://127.0.0.1:5000/download', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postMessage)
    })
    .then(response => response.blob())
    .then(blob => {
        const link = document.createElement('a'); //creates link
        const url = window.URL.createObjectURL(blob); //link points to the pdf given back
 
        link.href = url; //link points to the URL 
        link.download = 'created.pdf' //download with the name created.pdf

        link.click(); //automatically click link to trigger download

        window.URL.revokeObjectURL(url);
    })
    console.log(postMessage);
}