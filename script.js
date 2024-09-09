function replaceCommas(input) {
    input.value = input.value.replace(/,/g, '.').replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');
}

function toggleWheelInput() {
    const speedType = document.getElementById('speed-type').value;
    const wheelSizeSection = document.getElementById('wheel-size-section');
    
    if (speedType === 'rpm') {
        wheelSizeSection.style.display = 'none';
    } else {
        wheelSizeSection.style.display = 'block';
    }
}

function calculateKV() {
    const voltage = parseFloat(document.getElementById('voltage').value);
    const speed = parseFloat(document.getElementById('speed').value);
    const speedType = document.getElementById('speed-type').value;
    let kv = 0;

    if (isNaN(voltage) || isNaN(speed)) {
        alert('Please enter valid numbers for both voltage and speed.');
        return;
    }

    if (speedType === 'rpm') {
        kv = speed / voltage;
    } else {
        const wheelSize = parseFloat(document.getElementById('wheel-size').value);
        const unitType = document.getElementById('unit-type').value;

        if (isNaN(wheelSize)) {
            alert('Please enter a valid wheel size.');
            return;
        }

        let wheelSizeInMeters = 0;
        if (unitType === 'inches') {
            wheelSizeInMeters = wheelSize * 0.0254;
        } else {
            wheelSizeInMeters = wheelSize / 1000;
        }

        const wheelCircumference = Math.PI * wheelSizeInMeters;
        const rpm = (speed * 1000) / (60 * wheelCircumference);

        kv = rpm / voltage;
    }

    document.getElementById('kv-output').innerText = kv.toFixed(2);
}

function calculateSpeed() {
    const kv = parseFloat(document.getElementById('reverse-kv').value);
    const voltage = parseFloat(document.getElementById('reverse-voltage').value);
    const wheelSize = parseFloat(document.getElementById('reverse-wheel-size').value);
    const unitType = document.getElementById('reverse-unit-type').value;

    if (isNaN(kv) || isNaN(voltage)) {
        alert('Please enter valid numbers for kV and voltage.');
        return;
    }

    const rpm = kv * voltage;
    document.getElementById('rpm-output').innerText = rpm.toFixed(2);

    // If wheel size is missing, only output RPM and skip speed calculation
    if (isNaN(wheelSize)) {
        document.getElementById('speed-output').innerText = "N/A (Wheel size required)";
        return;
    }

    let wheelSizeInMeters = 0;
    if (unitType === 'inches') {
        wheelSizeInMeters = wheelSize * 0.0254;
    } else {
        wheelSizeInMeters = wheelSize / 1000;
    }

    const wheelCircumference = Math.PI * wheelSizeInMeters;
    const speed = (rpm * wheelCircumference * 60) / 1000;

    document.getElementById('speed-output').innerText = speed.toFixed(2);
}

