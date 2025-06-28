# GEMINI.md

This file provides guidance to Gemini when working with code in this repository.

## Project Overview

Blackhorse is a spy-themed web application that simulates classified operations through an interactive circular selection wheel interface. The application features a tactical UI with operations like target tracking, network scanning, data analysis, and mission briefings.

## Architecture

This is a static web application with no build process or dependencies:

- **index.html**: Main HTML structure with modals for map display and call functionality
- **script.js**: Core application logic handling wheel selection, tactical operations, and interactive features
- **styles.css**: Complete CSS styling with spy-themed visual effects and responsive design
- **voice/**: Directory containing MP3 audio files for mission briefings
- **sounds/**: Directory containing sound effects for tactical operations

## Key Features

### Interactive Selection Wheel
- Central button activates circular selection wheel on hold/click
- 8 operational segments: Track Target, Scan Network, Intercept, Analyze, Encrypt, Deploy, Extract, Mission Briefing
- Touch and mouse input supported with visual feedback

### Tactical Operations
- **Track Target**: Displays satellite map with coordinates (requires Google Maps API)
- **Mission Briefing**: Triggers incoming call interface with audio playback
- **Other Operations**: Display placeholder functionality with status updates

### Audio System
- Web Audio API for tactical sound effects (beeps, activation sounds)
- MP3 briefing audio files with sequential playback
- Synthetic ring tone generation for incoming calls

## External Dependencies

- Google Maps JavaScript API (configured with API key in HTML)
- Web Audio API for sound generation
- Local MP3 files for briefing audio content

## Development Notes

- Pure vanilla JavaScript - no frameworks or build tools
- Responsive design with mobile-first approach
- CSS animations and visual effects throughout
- Touch-friendly interface with proper event handling
- No server required - can be opened directly in browser
