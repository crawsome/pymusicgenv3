



// Handler for handling when user selects a key
function selectKey(e){
    var notes = document.querySelectorAll('.key');
    notes.forEach(note => {
        note.style.backgroundColor = "";
    });
    e.style.backgroundColor = "white"

    // Update key in backend
    $.post('/update_key', {"key":e.dataset.value}, function (data) {
        // Do nothing for now
        
    });
}

// Handler for handling when user selects a tension
function selectTension(e){
    var tensions = document.querySelectorAll('.tension');
    tensions.forEach(tension => {
        tension.style.backgroundColor = "";
    });
    e.style.backgroundColor = "white"

    // Update key in backend
    $.post('/update_tension', {"tension":e.dataset.value}, function (data) {
        // Do nothing for now
       
    });
}

// Handler for selecting a note duration
function selectDuration(e) {
    // Update duration in backend
    $.post('/select_duration', {'isActive':e.checked, 'name':e.name}, function (data) {
        // Do nothing for now
        
    });
    
}


// Randomize functions
// -------------------

// Main function to randomize all values 
function randomizeAll () {
    randomKey();
    randomTension();
    randomNoteDuration();
    randomSeed();
}

// Randomize key
function randomKey() {
    var keys = document.querySelectorAll('.key');
    var i = Math.floor(Math.random() * keys.length);

    selectKey(keys.item(i));
}

// Randomize tension
function randomTension() {
    var tensions = document.querySelectorAll('.tension');
    var i = Math.floor(Math.random() * tensions.length);

    selectTension(tensions.item(i));
}

// Randomize note durations
function randomNoteDuration() {
    var durations = document.querySelectorAll('.duration');
    durations.forEach(duration => {
        var i = Math.random();
        if (i > .5) {
            duration.checked = true;
            selectDuration(duration);
        } else {
            duration.checked = false;
            selectDuration(duration);
        }
    });
}

// Generate random seed
function randomSeed(e) {
    $.get('/random_seed', function (data) {
        var random = document.getElementById("random");
        random.value = data;
    });
}


