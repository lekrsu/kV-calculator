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
