



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

// Reset all input values
function resetAll() {

    // Get all tags
    var bpmeasBox = document.getElementById('bpmeas');
    var bpminBox = document.getElementById('bpmin');
    var keys = document.querySelectorAll('.key');
    var tensions = document.querySelectorAll('.tension');
    var durations = document.querySelectorAll('.duration');
    var random = document.getElementById("random");
    var frequencies = document.querySelectorAll(".frequency");

    // Reset all tags
    bpmeasBox.value = "";
    bpminBox.value = "";
    random.value = "";
    keys.forEach(key => {
        key.style.backgroundColor = "";
    });
    tensions.forEach(tension => {
        tension.style.backgroundColor = "";
    });
    durations.forEach(duration => {
        duration.checked = false;
    });
    frequencies.forEach(frequency => {
        frequency.value = 0;
    });

}


// -------------------
// Randomize functions
// -------------------

// Main function to randomize all values 
function randomizeAll () {
    randomKey();
    randomTension();
    randomNoteDuration();
    randomSeed();
    randomBeatPerMinute();
    randomBeatPerMeasure();
    randomFrequencies();
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

// Generate random frequencies
// DOES NOT UPDATE BACKEND
function randomFrequencies() {
    var frequencies = document.querySelectorAll('.frequency');

    frequencies.forEach(frequency => {
        var checkbox = frequency.previousElementSibling.children[0];
        if (checkbox.checked) {
            if (checkbox.id == "chord" || checkbox.id == "32nd") {
                frequency.value = Math.floor(Math.random()*4) + 1;
            } else if (checkbox.id == "Sixteenth" || checkbox.id == "Eighth" || checkbox.id == "Quarter") {
                frequency.value = Math.floor(Math.random()*8) + 1;
            } else if (checkbox.id == "Half") {
                frequency.value = Math.floor(Math.random()*3) + 1;
            } else if (checkbox.id == "Whole") {
                frequency.value = Math.floor(Math.random()*2) + 1;
            }
        } else {
            checkbox.checked = false;
            frequency.value = 0;
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

// Generate random beats/measure
// DOES NOT UPDATE BACKEND
function randomBeatPerMeasure() {
    const beats_per_meas = [3, 4, 6, 8];
    var i = Math.floor(Math.random() * beats_per_meas.length)
    var box = document.getElementById('bpmeas');
    box.value = beats_per_meas[i];
    
}

// Generate random beats/minute
// DOES NOT UPDATE BACKEND
function randomBeatPerMinute() {
    const beats_per_min = [60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 180, 200, 220];
    var i = Math.floor(Math.random() * beats_per_min.length)
    var box = document.getElementById("bpmin");
    box.value = beats_per_min[i];
}




