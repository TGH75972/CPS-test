let startTime;
let endTime;
let clicks = 0;
let testRunning = false;
let testDuration = 1; 

document.querySelectorAll('.timerButton').forEach(button => {
    button.addEventListener('click', function() {
        testDuration = parseInt(this.getAttribute('data-time'));
        alert(`Test duration set to ${testDuration} second${testDuration > 1 ? 's' : ''}`);
    });
});

document.getElementById('startButton').addEventListener('click', function() {
    if (!testRunning) {
        testRunning = true;
        clicks = 0;
        startTime = Date.now();
        document.getElementById('clickArea').innerHTML = '<button id="clickTarget">Click Here!</button>';
        document.getElementById('clickTarget').addEventListener('click', countClick);
        setTimeout(endTest, testDuration * 1000);
    }
});

function countClick(event) {
    clicks++;
    updateCPS();
    createShockwave(event);
    document.getElementById('clickTarget').style.color = 'transparent';
    document.getElementById('clickTarget').style.backgroundColor = 'transparent';
}

function updateCPS() {
    endTime = Date.now();
    let secondsPassed = (endTime - startTime) / 1000;
    let cps = (clicks / secondsPassed).toFixed(2);
    document.getElementById('cps').textContent = cps;
    document.getElementById('totalClicks').textContent = clicks;
}

function createShockwave(event) {
    const shockwave = document.createElement('div');
    shockwave.className = 'shockwave';
    shockwave.style.left = `${event.clientX - 100}px`;
    shockwave.style.top = `${event.clientY - 100}px`;
    document.body.appendChild(shockwave);
    shockwave.addEventListener('animationend', () => shockwave.remove());
}

function endTest() {
    testRunning = false;
    alert(`Time's up! Total Clicks: ${clicks}, CPS: ${(clicks / testDuration).toFixed(2)}`);
    document.getElementById('clickArea').innerHTML = '<button id="startButton">Start Test</button>';
    document.getElementById('startButton').addEventListener('click', function() {
        if (!testRunning) {
            testRunning = true;
            clicks = 0;
            startTime = Date.now();
            document.getElementById('clickArea').innerHTML = '<button id="clickTarget">Click Here!</button>';
            document.getElementById('clickTarget').addEventListener('click', countClick);
            setTimeout(endTest, testDuration * 1000);
        }
    });
}
