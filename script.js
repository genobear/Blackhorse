// Boot Sequence Logic
function initBootSequence() {
    const bootSequence = document.getElementById('bootSequence');
    const bootContent = document.getElementById('bootContent');
    const bootTime = document.getElementById('bootTime');
    const progressBar = document.getElementById('progressBar');
    
    // Update boot time
    function updateBootTime() {
        const now = new Date();
        bootTime.textContent = now.toLocaleTimeString('en-US', { hour12: false });
    }
    
    // Boot messages
    const bootMessages = [
        { text: "Initializing BLACKHORSE System...", type: "system", delay: 100 },
        { text: "Loading core modules...", type: "normal", delay: 200 },
        { text: "[OK] Cryptographic engine loaded", type: "success", delay: 300 },
        { text: "[OK] Secure communications protocol v4.2", type: "success", delay: 150 },
        { text: "Establishing satellite uplink...", type: "normal", delay: 400 },
        { text: "Connecting to BLACKHORSE network...", type: "system", delay: 300 },
        { text: "[WARN] Detecting 3 potential threats in vicinity", type: "warning", delay: 200 },
        { text: "Applying countermeasures...", type: "normal", delay: 250 },
        { text: "[OK] Threat neutralized", type: "success", delay: 150 },
        { text: "Loading tactical operations database...", type: "normal", delay: 300 },
        { text: "Verifying security clearance...", type: "system", delay: 400 },
        { text: "[OK] CLEARANCE: ALPHA - ACCESS GRANTED", type: "success", delay: 200 },
        { text: "Initializing user interface...", type: "normal", delay: 150 },
        { text: "Loading mission parameters...", type: "normal", delay: 200 },
        { text: "[OK] All systems operational", type: "success", delay: 100 },
        { text: "\nWELCOME TO BLACKHORSE", type: "success", delay: 300 }
    ];
    
    let messageIndex = 0;
    let totalDelay = 0;
    
    // Add boot lines
    function addBootLine(text, type = "normal") {
        const line = document.createElement('div');
        line.className = `boot-line ${type}`;
        line.textContent = text;
        bootContent.appendChild(line);
        bootContent.scrollTop = bootContent.scrollHeight;
        
        // Play boot sound effect
        playBootSound(type);
    }
    
    // Boot sound effects
    function playBootSound(type) {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            switch(type) {
                case 'success':
                    oscillator.frequency.value = 880;
                    gainNode.gain.value = 0.05;
                    oscillator.start();
                    oscillator.stop(audioContext.currentTime + 0.08);
                    break;
                case 'warning':
                    oscillator.frequency.value = 440;
                    gainNode.gain.value = 0.06;
                    oscillator.start();
                    oscillator.stop(audioContext.currentTime + 0.1);
                    break;
                case 'error':
                    oscillator.frequency.value = 220;
                    gainNode.gain.value = 0.07;
                    oscillator.start();
                    oscillator.stop(audioContext.currentTime + 0.15);
                    break;
                case 'system':
                    oscillator.frequency.value = 1320;
                    gainNode.gain.value = 0.04;
                    oscillator.start();
                    oscillator.stop(audioContext.currentTime + 0.05);
                    break;
                default:
                    oscillator.frequency.value = 660;
                    gainNode.gain.value = 0.03;
                    oscillator.start();
                    oscillator.stop(audioContext.currentTime + 0.03);
            }
        } catch (e) {
            console.log('Boot audio failed:', e);
        }
    }
    
    // Type each message
    function typeNextMessage() {
        if (messageIndex < bootMessages.length) {
            const msg = bootMessages[messageIndex];
            totalDelay += msg.delay;
            
            setTimeout(() => {
                addBootLine(msg.text, msg.type);
                // Update progress bar
                const progress = ((messageIndex + 1) / bootMessages.length) * 100;
                progressBar.style.width = progress + '%';
                
                messageIndex++;
                typeNextMessage();
            }, msg.delay);
        } else {
            // Boot complete, hide boot sequence
            setTimeout(() => {
                bootSequence.classList.add('hidden');
                setTimeout(() => {
                    bootSequence.style.display = 'none';
                }, 500);
            }, 500);
        }
    }
    
    // Start boot sequence
    updateBootTime();
    setInterval(updateBootTime, 1000);
    
    // Add initial boot message
    addBootLine("BOOT SEQUENCE INITIATED...", "system");
    
    // Start typing messages
    setTimeout(typeNextMessage, 500);
}

// Initialize boot sequence on page load
initBootSequence();

document.addEventListener('DOMContentLoaded', function() {
    const centerButton = document.querySelector('.center-button');
    const selectionWheel = document.querySelector('.selection-wheel');
    const wheelSegments = document.querySelectorAll('.wheel-segment');
    const selectedToolDisplay = document.getElementById('selectedTool');
    const activityLog = document.querySelector('.activity-log');
    const statusText = document.querySelector('.status-text');
    const statusDot = document.querySelector('.status-dot');
    const threatLevel = document.querySelector('.threat-medium');
    
    let isSelecting = false;
    let selectedSegment = null;
    let touchStartTime = 0;
    const HOLD_DURATION = 200;
    
    // Create a single audio context for all tactical sounds
    let audioContext = null;
    try {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) {
        console.log('Failed to create audio context:', e);
    }
    
    function playTacticalSound(type = 'beep') {
        if (!audioContext) return;
        
        try {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            switch(type) {
                case 'select':
                    oscillator.frequency.value = 1200;
                    gainNode.gain.value = 0.1;
                    oscillator.start();
                    oscillator.stop(audioContext.currentTime + 0.05);
                    break;
                case 'activate':
                    oscillator.frequency.value = 800;
                    gainNode.gain.value = 0.15;
                    oscillator.start();
                    oscillator.stop(audioContext.currentTime + 0.1);
                    break;
                case 'beep':
                default:
                    oscillator.frequency.value = 1000;
                    gainNode.gain.value = 0.1;
                    oscillator.start();
                    oscillator.stop(audioContext.currentTime + 0.02);
            }
        } catch (e) {
            console.log('Audio playback failed:', e);
        }
    }
    
    function addActivityLog(message) {
        const now = new Date();
        const timestamp = now.toTimeString().slice(0, 8);
        
        const logEntry = document.createElement('div');
        logEntry.className = 'log-entry';
        logEntry.innerHTML = `
            <span class="timestamp">${timestamp}</span>
            <span class="message">${message}</span>
        `;
        
        const activityTicker = document.getElementById('activityTicker');
        activityTicker.querySelector('.ticker-item').textContent = `${message} • System Active • Target Acquired: X7429 • Encryption: AES-256 • Location: Classified`;
        
        document.body.classList.add('glitch');
        setTimeout(() => document.body.classList.remove('glitch'), 500);
    }
    
    function calculateAngle(centerX, centerY, pointX, pointY) {
        const angle = Math.atan2(pointY - centerY, pointX - centerX) * 180 / Math.PI;
        return (angle + 90 + 360) % 360;
    }
    
    function getClosestSegment(angle) {
        let closestSegment = null;
        let minDiff = 360;
        
        wheelSegments.forEach(segment => {
            const segmentAngle = parseInt(segment.dataset.angle);
            let diff = Math.abs(angle - segmentAngle);
            if (diff > 180) diff = 360 - diff;
            
            if (diff < minDiff) {
                minDiff = diff;
                closestSegment = segment;
            }
        });
        
        return minDiff < 45 ? closestSegment : null;
    }
    
    function highlightSegment(segment) {
        wheelSegments.forEach(s => s.classList.remove('highlighted', 'active'));
        if (segment) {
            segment.classList.add('highlighted');
            playTacticalSound('beep');
        }
    }
    
    function selectSegment(segment) {
        if (!segment) return;
        
        wheelSegments.forEach(s => s.classList.remove('active'));
        segment.classList.add('active');
        
        const action = segment.dataset.action;
        const text = segment.querySelector('.segment-text').textContent;
        
        selectedToolDisplay.textContent = text;
        playTacticalSound('activate');
        
        addActivityLog(`Operation selected: ${text}`);
        
        setTimeout(() => {
            executeAction(action);
        }, 500);
    }
    
    function executeAction(action) {
        // Clear any ongoing scan intervals when switching to a new action
        if (scanInterval) clearInterval(scanInterval);
        if (scanBeepInterval) clearInterval(scanBeepInterval);
        
        switch(action) {
            case 'track':
                addActivityLog('Initializing satellite tracking...');
                statusText.textContent = 'TRACKING ACTIVE';
                statusDot.style.background = '#ffaa00';

                const scanAudio = document.getElementById('scanSound');
                const lockAudio = document.getElementById('lockSound');

                addActivityLog('Initializing satellite tracking...');
                statusText.textContent = 'TRACKING ACTIVE';
                statusDot.style.background = '#ffaa00';

                scanAudio.play(); // Start scan sound immediately

                const mapModal = document.getElementById('mapModal');
                mapModal.style.display = 'block'; // Show map modal immediately

                const trackingOverlay = document.getElementById('trackingOverlay');
                trackingOverlay.style.display = 'block'; // Ensure tracking overlay is visible

                // After a delay for scanning animation/sound
                setTimeout(() => {
                    scanAudio.pause(); // Pause scan sound
                    scanAudio.currentTime = 0; // Reset scan sound

                    // Hide tracking overlay
                    trackingOverlay.style.display = 'none';

                    // Display coordinates
                    const lat = 51.107638105738964;
                    const lon = -2.5227070142185544;
                    document.getElementById('latDisplay').textContent = lat;
                    document.getElementById('lonDisplay').textContent = lon;

                    // Play target acquired sound
                    lockAudio.play();

                    // Display map and marker
                    if (window.map) {
                        const targetLocation = { lat: parseFloat(lat), lng: parseFloat(lon) };
                        window.map.setCenter(targetLocation);
                        window.map.setZoom(16);
                        new google.maps.Marker({
                            position: targetLocation,
                            map: window.map,
                            title: 'Target Location',
                            icon: {
                                url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iOCIgc3Ryb2tlPSIjMDBmZjQxIiBzdHJva2Utd2lkdGg9IjIiLz4KPGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMyIgZmlsbD0iIzAwZmY0MSIvPgo8L3N2Zz4=',
                                scaledSize: new google.maps.Size(40, 40)
                            }
                        });
                    }
                }, 6000); // 6 seconds for scanning sound/animation
                break;
                
            case 'scan':
                scanNetwork();
                break;
                
            case 'intercept':
                addActivityLog('Communications intercept - PLACEHOLDER');
                statusText.textContent = 'INTERCEPTING...';
                setTimeout(() => {
                    addActivityLog('No active communications detected');
                    statusText.textContent = 'SYSTEM ACTIVE';
                }, 2000);
                break;
                
            case 'analyze':
                addActivityLog('Data analysis module - PLACEHOLDER');
                statusText.textContent = 'ANALYZING...';
                setTimeout(() => {
                    addActivityLog('Insufficient data for analysis');
                    statusText.textContent = 'SYSTEM ACTIVE';
                }, 2500);
                break;
                
            case 'encrypt':
                addActivityLog('File encryption - PLACEHOLDER');
                statusText.textContent = 'ENCRYPTING...';
                setTimeout(() => {
                    addActivityLog('No files selected for encryption');
                    statusText.textContent = 'SYSTEM ACTIVE';
                }, 2000);
                break;
                
            case 'deploy':
                addActivityLog('Agent deployment - PLACEHOLDER');
                statusText.textContent = 'DEPLOYING...';
                statusDot.style.background = '#ff0040';
                setTimeout(() => {
                    addActivityLog('Deployment cancelled - insufficient clearance');
                    statusText.textContent = 'SYSTEM ACTIVE';
                    statusDot.style.background = '#00ff41';
                }, 3000);
                break;
                
            case 'extract':
                addActivityLog('Data extraction - PLACEHOLDER');
                statusText.textContent = 'EXTRACTING...';
                setTimeout(() => {
                    addActivityLog('No target device connected');
                    statusText.textContent = 'SYSTEM ACTIVE';
                }, 2000);
                break;
                
            case 'briefing':
                addActivityLog('Initiating mission briefing...');
                statusText.textContent = 'BRIEFING INCOMING';
                statusDot.style.background = '#ffaa00';
                
                setTimeout(() => {
                    const callModal = document.getElementById('callModal');
                    callModal.style.display = 'block';
                    
                    // Start ring tone immediately - we have user interaction from wheel selection
                    startRingTone();
                    
                    // Start auto-dismiss timer
                    startAutoDismissTimer();
                    
                    playTacticalSound('select');
                }, 1000);
                break;
        }
    }
    
    function startSelection(e) {
        e.preventDefault();
        touchStartTime = Date.now();
        
        setTimeout(() => {
            if (Date.now() - touchStartTime >= HOLD_DURATION && !isSelecting) {
                isSelecting = true;
                centerButton.classList.add('active');
                selectionWheel.classList.add('active');
                playTacticalSound('select');
                addActivityLog('Selection wheel activated');
            }
        }, HOLD_DURATION);
    }
    
    function updateSelection(e) {
        if (!isSelecting) return;
        
        e.preventDefault();
        const rect = selectionWheel.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        let clientX, clientY;
        if (e.type.includes('touch')) {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        } else {
            clientX = e.clientX;
            clientY = e.clientY;
        }
        
        const angle = calculateAngle(centerX, centerY, clientX, clientY);
        const segment = getClosestSegment(angle);
        
        if (segment !== selectedSegment) {
            selectedSegment = segment;
            highlightSegment(segment);
        }
    }
    
    function endSelection(e) {
        e.preventDefault();
        
        if (isSelecting && selectedSegment) {
            selectSegment(selectedSegment);
        }
        
        isSelecting = false;
        centerButton.classList.remove('active');
        selectionWheel.classList.remove('active');
        wheelSegments.forEach(s => s.classList.remove('highlighted'));
        selectedSegment = null;
        touchStartTime = 0;
    }
    
    centerButton.addEventListener('mousedown', startSelection);
    centerButton.addEventListener('touchstart', startSelection);
    
    document.addEventListener('mousemove', updateSelection);
    document.addEventListener('touchmove', updateSelection);
    
    document.addEventListener('mouseup', endSelection);
    document.addEventListener('touchend', endSelection);
    
    wheelSegments.forEach(segment => {
        segment.addEventListener('click', function(e) {
            e.stopPropagation();
            selectSegment(this);
        });
    });
    
    addActivityLog('System initialization complete');
    addActivityLog('All operations standing by');

    // Call-related variables
    let callTimer = null;
    let callStartTime = null;
    let currentAudio = null;
    let autoDismissTimer = null;

    function startRingTone() {
        console.log('Starting ring tone...');
        const ringToneAudio = document.getElementById('ringTone');
        if (ringToneAudio) {
            ringToneAudio.play().catch(e => console.error("Error playing ringtone:", e));
        }
    }

    function stopRingTone() {
        console.log('Stopping ring tone...');
        const ringToneAudio = document.getElementById('ringTone');
        if (ringToneAudio) {
            ringToneAudio.pause();
            ringToneAudio.currentTime = 0;
        }
    }

    function answerCall() {
    const callModal = document.getElementById('callModal');
    const activeCallModal = document.getElementById('activeCallModal');
    const statusText = document.querySelector('.status-text');
    
    // Clear auto-dismiss timer
    if (autoDismissTimer) {
        clearTimeout(autoDismissTimer);
        autoDismissTimer = null;
    }
    
    // Stop ring tone
    stopRingTone();
    
    callModal.style.display = 'none';
    activeCallModal.style.display = 'block';
    
    statusText.textContent = 'CALL ACTIVE';
    
    callStartTime = Date.now();
    callTimer = setInterval(updateCallDuration, 1000);
    
    addActivityLog('Secure transmission established');
    playTacticalSound('activate');
    
    // Start playing briefing audio immediately
    playBriefingAudio();
    }

    function declineCall() {
    const callModal = document.getElementById('callModal');
    const statusText = document.querySelector('.status-text');
    const statusDot = document.querySelector('.status-dot');
    
    // Clear auto-dismiss timer
    if (autoDismissTimer) {
        clearTimeout(autoDismissTimer);
        autoDismissTimer = null;
    }
    
    // Stop ring tone
    stopRingTone();
    
    callModal.style.display = 'none';
    statusText.textContent = 'SYSTEM ACTIVE';
    statusDot.style.background = '#00ff41';
    
    addActivityLog('Transmission declined');
    playTacticalSound('beep');
    }

    function endCall() {
    const activeCallModal = document.getElementById('activeCallModal');
    const statusText = document.querySelector('.status-text');
    const statusDot = document.querySelector('.status-dot');
    
    activeCallModal.style.display = 'none';
    statusText.textContent = 'SYSTEM ACTIVE';
    statusDot.style.background = '#00ff41';
    
    if (callTimer) {
        clearInterval(callTimer);
        callTimer = null;
    }
    
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        currentAudio = null;
    }
    
    addActivityLog('Secure transmission terminated');
    playTacticalSound('beep');
    }

    function updateCallDuration() {
    if (!callStartTime) return;
    
    const elapsed = Math.floor((Date.now() - callStartTime) / 1000);
    const minutes = Math.floor(elapsed / 60);
    const seconds = elapsed % 60;
    
    const callDuration = document.getElementById('callDuration');
    callDuration.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    function playBriefingAudio() {
    const briefingPart1 = document.getElementById('briefingPart1');
    const briefingPart2 = document.getElementById('briefingPart2');
    const audioStatus = document.getElementById('audioStatus');
    
    console.log('Starting briefing audio playback...');
    console.log('BriefingPart1 element:', briefingPart1);
    console.log('BriefingPart2 element:', briefingPart2);
    console.log('Audio status element:', audioStatus);
    
    if (!briefingPart1) {
        console.log('BriefingPart1 element not found');
        audioStatus.textContent = 'Audio elements not found';
        return;
    }
    
    currentAudio = briefingPart1;
    audioStatus.textContent = 'Playing briefing part 1...';
    
    // Set up event handlers first
    briefingPart1.onended = function() {
        console.log('Part 1 ended, starting part 2');
        if (briefingPart2) {
            currentAudio = briefingPart2;
            audioStatus.textContent = 'Playing briefing part 2...';
            
            briefingPart2.onended = function() {
                console.log('Part 2 ended');
                audioStatus.textContent = 'Briefing complete - Awaiting orders';
                currentAudio = null;
            };
            
            briefingPart2.onerror = function(e) {
                console.log('Part 2 error:', e);
                audioStatus.textContent = 'Part 2 audio file error';
            };
            
            // Try to play part 2
            briefingPart2.play().then(() => {
                console.log('Part 2 playing successfully');
            }).catch(e => {
                console.log('Part 2 playback failed:', e);
                audioStatus.textContent = 'Part 2 playback failed';
            });
        }
    };
    
    briefingPart1.onerror = function(e) {
        console.log('Part 1 error:', e);
        audioStatus.textContent = 'Part 1 audio file error';
    };
    
    // Reset and try to play part 1
    briefingPart1.currentTime = 0;
    briefingPart1.volume = 0.8;
    
    console.log('Attempting to play Part 1...');
    const playPromise = briefingPart1.play();
    
    if (playPromise !== undefined) {
        playPromise.then(() => {
            console.log('Part 1 playing successfully');
        }).catch(e => {
            console.log('Part 1 playback failed:', e);
            audioStatus.textContent = 'Briefing audio failed to play - check browser permissions';
        });
    }
    }

    function startAutoDismissTimer() {
        // Clear any existing timer
        if (autoDismissTimer) {
            clearTimeout(autoDismissTimer);
        }
        
        // Set timer for 60 seconds
        autoDismissTimer = setTimeout(() => {
            // Auto-decline the call
            const callModal = document.getElementById('callModal');
            if (callModal.style.display === 'block') {
                declineCall();
                
                // Show angry text message after 3 seconds
                setTimeout(() => {
                    showTextNotification();
                }, 3000);
            }
        }, 20000); // 20 seconds
    }
    
    function showTextNotification() {
        // Create toast notification container
        const toast = document.createElement('div');
        toast.className = 'iphone-toast';
        toast.innerHTML = `
            <div class="toast-icon">💬</div>
            <div class="toast-content">
                <div class="toast-header">
                    <span class="toast-app">Messages</span>
                    <span class="toast-time">now</span>
                </div>
                <div class="toast-sender">KAREN BOWMAN</div>
                <div class="toast-message">ANSWER YOUR PHONE AGENT! THIS IS TREASON!</div>
            </div>
        `;
        
        document.body.appendChild(toast);
        
        // Trigger animation
        setTimeout(() => {
            toast.classList.add('show');
        }, 100);
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 5000);
        
        // Play iPhone text message sound
        const textSound = document.getElementById('textMessageSound');
        if (textSound) {
            textSound.play().catch(e => {
                console.error("Error playing text message sound:", e);
                // Fallback to tactical sound if iPhone sound fails
                playTacticalSound('activate');
            });
        } else {
            // Fallback to tactical sound if audio element not found
            playTacticalSound('activate');
        }
        
        addActivityLog('Urgent message received from KAREN BOWMAN');
    }
    
    // Make functions globally accessible
    window.answerCall = answerCall;
    window.declineCall = declineCall;
    window.endCall = endCall;
    window.closeScanModal = closeScanModal;
    
    // Add touch support for modal buttons
    function addTouchSupport() {
        // Answer/Decline call buttons
        const answerBtn = document.querySelector('.answer-btn');
        const declineBtn = document.querySelector('.decline-btn');
        const endCallBtn = document.querySelector('.end-call-btn');
        const closeMapBtn = document.querySelector('.close-map');
        const closeScanBtn = document.querySelector('.close-scan');
        
        // Helper function to handle both click and touch
        function addTouchHandler(element, handler) {
            if (!element) return;
            
            // Remove onclick attribute to prevent conflicts
            element.removeAttribute('onclick');
            
            // Add event listeners for both click and touch
            element.addEventListener('click', handler);
            element.addEventListener('touchend', function(e) {
                e.preventDefault(); // Prevent default touch behavior
                handler();
            });
        }
        
        // Add handlers to all buttons
        addTouchHandler(answerBtn, answerCall);
        addTouchHandler(declineBtn, declineCall);
        addTouchHandler(endCallBtn, endCall);
        addTouchHandler(closeMapBtn, window.closeMap);
        addTouchHandler(closeScanBtn, closeScanModal);
    }
    
    // Call when modals are shown
    const originalAnswerCall = answerCall;
    answerCall = function() {
        originalAnswerCall();
        setTimeout(addTouchSupport, 100); // Add touch support after modal is shown
    };
    
    // Add touch support when call modal is shown
    const originalExecuteAction = executeAction;
    executeAction = function(action) {
        originalExecuteAction(action);
        if (action === 'briefing' || action === 'track' || action === 'scan') {
            setTimeout(addTouchSupport, 1500); // Add touch support after modal appears
        }
    };

    // Network Scan Functionality
    const deviceNames = [
        'BTR-80 Comms', 'Silo Door Control', 'UAV Uplink', 'Enemy Comms Relay',
        'Field Ops Terminal', 'Encrypted Satellite Link', 'Drone Control Unit',
        'Automated Sentry', 'Supply Drop Beacon', 'Jammer Array',
        'Reconnaissance Drone', 'Mobile Command Post', 'Secure Data Server',
        'Tactical Network Hub', 'Remote Sensor Grid', 'Artillery Targeting System',
        'Infantry Comms', 'Vehicle Tracking Unit', 'Air Defense Radar',
        'Logistics Management System', 'Medical Evac Beacon', 'Forward Observation Post',
        'Electronic Warfare Suite', 'Cyber Warfare Node', 'Biometric Scanner',
        'Automated Resupply Drone', 'Underground Bunker Access', 'Covert Listening Post',
        'High-Altitude Surveillance', 'Subterranean Sensor', 'Naval Command Link',
        'Submarine Sonar', 'Coastal Defense System', 'Missile Launch Control',
        'Nuclear Facility Access', 'Biohazard Containment', 'Chemical Agent Dispenser',
        'Neural Interface Device', 'Weather Manipulation Array', 'Time Displacement Unit',
        'Quantum Entanglement Comms', 'Dark Matter Reactor', 'Singularity Containment',
        'Temporal Anomaly Detector', 'Interdimensional Gateway', 'Alien Artifact Analysis',
        'Exotic Weapon Prototype', 'Cloaking Device Emitter', 'Wormhole Generator'
    ];

    function getRandomIpAddress() {
        return Array(4).fill(0).map(() => Math.floor(Math.random() * 256)).join('.');
    }

    function getRandomStatus() {
        const statuses = ['ENCRYPTED', 'UNSECURE', 'OFFLINE'];
        return statuses[Math.floor(Math.random() * statuses.length)];
    }

    let scanInterval;
    let scanDuration = 5000; // 5 seconds for scanning
    let scanStartTime;
    let scanBeepInterval; // Add separate interval for beep sounds

    function scanNetwork() {
        const scanModal = document.getElementById('scanModal');
        const scanResults = document.getElementById('scanResults');
        const scanStatusMessage = document.getElementById('scanStatusMessage');
        const statusText = document.querySelector('.status-text');
        const statusDot = document.querySelector('.status-dot');

        // Clear any existing intervals first
        if (scanInterval) clearInterval(scanInterval);
        if (scanBeepInterval) clearInterval(scanBeepInterval);

        scanResults.innerHTML = ''; // Clear previous results
        scanStatusMessage.textContent = 'Scanning for devices...';
        scanModal.style.display = 'block';
        statusText.textContent = 'SCANNING...';
        statusDot.style.background = '#ffaa00'; // Yellow for scanning

        addActivityLog('Network scan initiated');
        playTacticalSound('activate');

        let scanCount = 0;
        scanStartTime = Date.now();

        // Play beep sounds during scanning
        scanBeepInterval = setInterval(() => {
            playTacticalSound('beep');
        }, 500); // Beep every 500ms

        scanInterval = setInterval(() => {
            if (Date.now() - scanStartTime > scanDuration) {
                clearInterval(scanInterval);
                clearInterval(scanBeepInterval); // Stop beep sounds
                displayScanResult();
                return;
            }

            const device = deviceNames[Math.floor(Math.random() * deviceNames.length)];
            const ip = getRandomIpAddress();
            const status = getRandomStatus();
            let statusClass = '';
            if (status === 'ENCRYPTED') statusClass = 'status-encrypted';
            else if (status === 'UNSECURE') statusClass = 'status-unsecure';
            else if (status === 'OFFLINE') statusClass = 'status-offline';

            const scanItem = document.createElement('div');
            scanItem.className = 'scan-item';
            scanItem.innerHTML = `
                <span class="device-name">${device}</span>
                <span class="ip-address"> [${ip}] </span>
                <span class="status ${statusClass}">${status}</span>
            `;
            scanResults.prepend(scanItem); // Add to top for scrolling effect

            // Keep only a certain number of items visible
            if (scanResults.children.length > 15) {
                scanResults.removeChild(scanResults.lastChild);
            }
            scanCount++;
        }, 100); // Update every 100ms
    }

    function displayScanResult() {
        const scanStatusMessage = document.getElementById('scanStatusMessage');
        const statusText = document.querySelector('.status-text');
        const statusDot = document.querySelector('.status-dot');

        scanStatusMessage.textContent = 'Unsecured Comms Channel Detected on 144.500 MHz';
        scanStatusMessage.style.color = 'var(--danger-red)';
        scanStatusMessage.style.textShadow = '0 0 15px var(--danger-red)';

        statusText.textContent = 'THREAT DETECTED';
        statusDot.style.background = 'var(--danger-red)'; // Red for threat

        addActivityLog('Critical vulnerability detected: Unsecured Comms Channel');
        playTacticalSound('activate'); // Play a more urgent sound

        // Optionally, close the modal after a delay or wait for user to close
        // setTimeout(() => {
        //     closeScanModal();
        // }, 10000);
    }

    function closeScanModal() {
        const scanModal = document.getElementById('scanModal');
        const statusText = document.querySelector('.status-text');
        const statusDot = document.querySelector('.status-dot');

        clearInterval(scanInterval); // Stop any ongoing scan
        clearInterval(scanBeepInterval); // Stop beep sounds
        scanModal.style.display = 'none';
        statusText.textContent = 'SYSTEM ACTIVE';
        statusDot.style.background = '#00ff41'; // Green for active
        addActivityLog('Network scan concluded');
    }
});

window.closeMap = function() {
    document.getElementById('mapModal').style.display = 'none';
    const statusText = document.querySelector('.status-text');
    const statusDot = document.querySelector('.status-dot');
    statusText.textContent = 'SYSTEM ACTIVE';
    statusDot.style.background = '#00ff41';
};

function initMap() {
    window.map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 40.7128, lng: -74.0060 },
        zoom: 13,
        mapTypeId: 'satellite',
        disableDefaultUI: true,
        styles: [
            {
                featureType: "all",
                elementType: "labels",
                stylers: [{ visibility: "off" }]
            }
        ]
    });
}