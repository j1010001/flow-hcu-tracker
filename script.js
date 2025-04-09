let intervalId = null;
let targetHeight = null;
let initialBlocksRemaining = null;
let currentNetwork = {
    mainnet: 'https://rest-mainnet.onflow.org/v1/blocks?height=final',
    testnet: 'https://rest-testnet.onflow.org/v1/blocks?height=final'
};

function updateNetwork() {
    if (intervalId) {
        stopTracking();
    }
    document.getElementById('currentHeight').textContent = '';
    document.getElementById('result').innerHTML = '';
    document.getElementById('inputValue').value = '';
}

async function getCurrentBlockHeight() {
    const network = document.getElementById('networkSelect').value;
    const response = await fetch(currentNetwork[network], {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        },
        mode: 'cors'
    });
    
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const blocks = await response.json();
    return Number(blocks[0].header.height);
}

function updateProgressBar(currentHeight, targetHeight) {
    const progressFill = document.getElementById('progressFill');
    const currentBlocksRemaining = targetHeight - currentHeight;
    const percentage = ((initialBlocksRemaining - currentBlocksRemaining) / initialBlocksRemaining) * 100;
    progressFill.style.width = `${percentage}%`;
    
    if (percentage > 75) {
        progressFill.style.backgroundColor = '#FF0000';
    } else if (percentage > 50) {
        progressFill.style.backgroundColor = '#FF6633';
    } else if (percentage > 25) {
        progressFill.style.backgroundColor = '#CCCC00';
    } else {
        progressFill.style.backgroundColor = '#00CC00';
    }
}

async function calculateResult() {
    const resultDiv = document.getElementById('result');
    
    try {
        const blockHeight = await getCurrentBlockHeight();
        const calculatedResult = targetHeight - blockHeight;

        if(calculatedResult <= 0) {
            stopTracking();
        }
        
        updateProgressBar(blockHeight, targetHeight);
        
        resultDiv.innerHTML = `Current Block Height: ${blockHeight}<br>
                             Target Height: ${targetHeight}<br>
                             Blocks Remaining: ${calculatedResult}`;
    } catch (error) {
        resultDiv.innerHTML = `Error: ${error.message}`;
        console.error('Full error:', error);
    }
}

function stopTracking() {
    if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
        document.getElementById('result').innerHTML += '<br>Tracking stopped';
    }
}

async function startTracking() {
    if (intervalId) {
        clearInterval(intervalId);
    }

    targetHeight = Number(document.getElementById('inputValue').value);
    if (!targetHeight) {
        document.getElementById('result').innerHTML = 'Please enter a valid target height';
        return;
    }

    try {
        const currentHeight = await getCurrentBlockHeight();
        initialBlocksRemaining = targetHeight - currentHeight;
        calculateResult();
        intervalId = setInterval(calculateResult, 1000);
    } catch (error) {
        document.getElementById('result').innerHTML = `Error: ${error.message}`;
    }
}

async function showCurrentHeight() {
    try {
        const currentHeight = await getCurrentBlockHeight();
        const heightDisplay = document.getElementById('currentHeight');
        heightDisplay.textContent = currentHeight;
    } catch (error) {
        document.getElementById('result').innerHTML = `Error: ${error.message}`;
    }
}

function copyHeight() {
    const heightText = document.getElementById('currentHeight').textContent;
    if (heightText) {
        navigator.clipboard.writeText(heightText).then(() => {
            const heightDisplay = document.getElementById('currentHeight');
            const originalText = heightDisplay.textContent;
            heightDisplay.textContent = 'Copied!';
            setTimeout(() => {
                heightDisplay.textContent = originalText;
            }, 1000);
        });
    }
}

// Only export if we're in Node.js environment (for testing)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        updateNetwork,
        getCurrentBlockHeight,
        updateProgressBar,
        calculateResult,
        stopTracking,
        startTracking,
        showCurrentHeight,
        copyHeight,
        currentNetwork
    };
} 