var modal = {
    open: function(message) {
        document.getElementById("modal-message").textContent = message;
        document.getElementById("modal-window").style.display = "block";
    },
    close: function() {
        document.getElementById("modal-window").style.display = "none";
    }
};

function seconds_to_hhmmss(seconds) {
    var h = Math.floor(seconds / 3600);
    var m = Math.floor((seconds % 3600) / 60);
    var s = Math.floor(seconds % 60);
    return { h: h, m: m, s: s };
}

var _get = {
    time: function() {
        var h = parseInt(document.getElementById("time-hours").value)  || 0;
        var m = parseInt(document.getElementById("time-minutes").value)  || 0;
        var s = parseInt(document.getElementById("time-seconds").value)  || 0;
        return h * 3600 + m * 60 + s;
    },
    distance: function() {
        var dropdownValue = document.getElementById("race-distance").value;
        var manualDistance = parseFloat(document.getElementById("distance-amount").value) || 0;
        
        if (dropdownValue === "other") {
            return manualDistance; // Use the manually entered distance
        } else if (dropdownValue) {
            return parseFloat(dropdownValue); // Use predefined race value
        }
        return 0; // Default if nothing is selected
    },
    pace: function() {
        var m = parseInt(document.getElementById("pace-minutes").value) || 0;
        var s = parseInt(document.getElementById("pace-seconds").value) || 0;
        return m * 60 + s;
    }
};

var calculate = {
    missingField: function() {
        var time = _get.time();
        var distance = _get.distance();
        var pace = _get.pace();

        var missing = [];

        if (!time) missing.push("time");
        if (!distance) missing.push("distance");
        if (!pace) missing.push("pace");

        if (missing.length > 1) {
            modal.open("Please enter values for at least two fields.");
            return;
        }

        if (!time) {
            var totalTime = distance * pace;
            var timeObj = seconds_to_hhmmss(totalTime);
            document.getElementById("time-hours").value = timeObj.h;
            document.getElementById("time-minutes").value = timeObj.m;
            document.getElementById("time-seconds").value = timeObj.s;
            modal.open("Time calculated successfully!");
        } else if (!distance) {
            var calculatedDistance = time / pace;
            document.getElementById("distance-amount").value = calculatedDistance.toFixed(2);
            document.getElementById("race-distance").value = "other"; // Set dropdown to "Other"
            modal.open("Distance calculated successfully!");
        } else if (!pace) {
            var calculatedPaceSec = time / distance;
            var paceObj = seconds_to_hhmmss(calculatedPaceSec);
            document.getElementById("pace-minutes").value = paceObj.m;
            document.getElementById("pace-seconds").value = paceObj.s;
            modal.open("Pace calculated successfully!");
        }
    }
};


function showResetButton() {
    document.getElementById("reset-button").style.display = "block";
}

function resetFields() {
    document.getElementById("time-hours").value = "";
    document.getElementById("time-minutes").value = "";
    document.getElementById("time-seconds").value = "";
    document.getElementById("race-distance").value = "";
    document.getElementById("distance-amount").value = "";
    document.getElementById("pace-minutes").value = "";
    document.getElementById("pace-seconds").value = "";

    document.getElementById("reset-button").style.display = "none"; // Hide button again
}

function setDistance() {
    var dropdown = document.getElementById("race-distance");
    var distanceInput = document.getElementById("distance-amount");

    if (dropdown.value === "other") {
        distanceInput.style.display = "inline-block"; // Show manual input
        distanceInput.value = ""; // Clear previous values
        distanceInput.focus(); // Auto-focus for user
    } else if (dropdown.value) {
        distanceInput.style.display = "none"; // Hide manual input
        distanceInput.value = dropdown.value; // Auto-fill with race distance
    } else {
        distanceInput.style.display = "none"; // Hide input if no selection
        distanceInput.value = ""; // Reset value
    }

    showResetButton(); // Show reset button when user interacts
}







