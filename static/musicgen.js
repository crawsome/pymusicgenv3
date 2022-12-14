


// Handler to get random seed
$("button#random-seed").click(function() { 
    $.get('/random_seed', function (data) {
        var random = document.getElementById("random");
        random.value = data;
    });
    // If you want to post to the backend instead, do
    // $.post('/button');
});


// Handler for handling when user selects a key
function selectNote(e){
    var notes = document.querySelectorAll('.note');
    notes.forEach(note => {
        note.style.backgroundColor = "";
    });
    e.style.backgroundColor = "white"
}

// Handler for handling when user selects a tension
function selectNote(e){
    var tensions = document.querySelectorAll('.tension');
    tensions.forEach(tension => {
        tension.style.backgroundColor = "";
    });
    e.style.backgroundColor = "white"
}