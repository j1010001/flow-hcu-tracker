# HCU Reset Tracker

A simple web application that tracks and visualizes progress towards a target block height on the Flow blockchain. This tool is useful for monitoring the difference between current and target block height during Height-Coordinated Upgrade (HCU) on the Flow network.

## Features

- **Real-time Block Height Tracking**: Automatically fetches and displays the current block height from Flow's blockchain
- **Network Selection**: Toggle between Mainnet and Testnet
- **Progress Visualization**: Visual progress bar that changes color as you approach the target
- **Copy Functionality**: One-click copy for current block height
- **Auto-refresh**: Continuous tracking with automatic updates every second

## Usage

1. **Select Network**: Choose between Mainnet or Testnet using the dropdown
2. **Get Current Height**: Click the "Get Current Height" button to display the current block height
3. **Set Target Height**: Enter your target block height in the input field
4. **Start Tracking**: Click "Start Tracking" to begin monitoring the progress
5. **Stop Tracking**: Click "Stop Tracking" to pause the monitoring

The application will automatically calculate the remaining blocks and display the progress visually.

## Installation

No installation required! This is a client-side web application that runs in your browser.

To run it locally:

1. Clone this repository
   ```
   git clone https://github.com/your-username/hcu-reset-tracker.git
   cd hcu-reset-tracker
   ```

2. Open `index.html` in your web browser

## Development

If you want to modify or extend the application:

1. Install dependencies:
   ```
   npm install
   ```

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- Flow Blockchain REST API

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.