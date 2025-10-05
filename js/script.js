// Main Application
class HackingCourse {
    constructor() {
        this.videos = this.initializeVideos();
        this.currentProgress = 0;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupScrollAnimations();
        this.loadProgress();
        this.updateOverallProgress();
        this.initializeTerminalAnimation();
        this.setupModuleInteractions();
    }

    // Initialize video data structure
    initializeVideos() {
        const videos = {};
        for (let i = 1; i <= 50; i++) {
            videos[i] = {
                watched: false,
                progress: 0,
                title: this.getVideoTitle(i)
            };
        }
        return videos;
    }

    // Get video title based on number
    getVideoTitle(videoNumber) {
        const titles = {
            1: "Course Introduction & The Ethical Hacking Mindset",
            2: "Setting Up Your Hacking Lab: Kali Linux Virtual Machine",
            3: "Creating Your Isolated Test Lab Environment",
            4: "Essential Linux Commands for Hackers",
            5: "Networking Fundamentals for Penetration Testing",
            6: "Installing & Configuring Essential Hacking Tools",
            7: "Setting Up Vulnerable Practice Machines",
            8: "Passive Reconnaissance Techniques",
            9: "WHOIS, DNS Enumeration & Footprinting",
            10: "Google Hacking Database (GHDB) & OSINT",
            11: "Social Media Intelligence (SOCMINT) Gathering",
            12: "Email Harvesting & Analysis",
            13: "Subdomain Enumeration Methods",
            14: "NMAP Mastery: Advanced Scanning Techniques",
            15: "SMB Enumeration & NetBIOS Attacks",
            16: "SNMP Enumeration & Configuration Analysis",
            17: "Vulnerability Scanning with Nessus/OpenVAS",
            18: "Web Application Scanning & Directory Bruteforcing",
            19: "Metasploit Framework Fundamentals",
            20: "Exploit Database Research & Usage",
            21: "Web Application Exploits: SQL Injection",
            22: "Cross-Site Scripting (XSS) Attacks",
            23: "File Inclusion Vulnerabilities (LFI/RFI)",
            24: "Buffer Overflow Basics",
            25: "Hacking WordPress",
            26: "Hacking Drupal",
            27: "Password Attacks: Bruteforce & Dictionary",
            28: "Hash Cracking Techniques & Tools",
            29: "Privilege Escalation Introduction",
            30: "Privilege Escalation: Linux Environments",
            31: "Privilege Escalation: Windows Environments",
            32: "Credential Dumping & Extraction",
            33: "Covering Your Tracks & Log Cleaning",
            34: "Wireless Networking Fundamentals",
            35: "WiFi Encryption & Security Protocols",
            36: "WPA/WPA2 Cracking Techniques",
            37: "Rogue Access Point Attacks",
            38: "Evil Twin Attacks & MITM",
            39: "Wireless Client Attacks",
            40: "Burp Suite Mastery",
            41: "Session Management Attacks",
            42: "Cross-Site Request Forgery (CSRF)",
            43: "XXE & Server-Side Request Forgery (SSRF)",
            44: "API Security Testing",
            45: "Social Engineering Framework",
            46: "Phishing Campaigns & Clone Sites",
            47: "Malicious Document Creation",
            48: "Firewall & IDS Evasion Techniques",
            49: "Network Sniffing & Traffic Analysis",
            50: "Course Conclusion & Challenge"
        };
        return titles[videoNumber] || `Video ${videoNumber}`;
    }

    // Setup all event listeners
    setupEventListeners() {
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Video play button handlers
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('play-btn')) {
                this.handleVideoPlay(e.target);
            }
        });

        // Progress circle clicks
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('progress-circle') || 
                e.target.closest('.progress-circle')) {
                const circle = e.target.classList.contains('progress-circle') ? 
                    e.target : e.target.closest('.progress-circle');
                this.toggleVideoProgress(circle);
            }
        });

        // Module header clicks for expand/collapse
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('module-header') || 
                e.target.closest('.module-header')) {
                const header = e.target.classList.contains('module-header') ? 
                    e.target : e.target.closest('.module-header');
                this.toggleModule(header.parentElement);
            }
        });

        // CTA button handler
        const ctaButton = document.querySelector('.cta-button');
        if (ctaButton) {
            ctaButton.addEventListener('click', () => {
                this.scrollToCourse();
            });
        }

        // Save progress before unload
        window.addEventListener('beforeunload', () => {
            this.saveProgress();
        });
    }

    // Setup module interactions
    setupModuleInteractions() {
        // Open first module by default
        const firstModule = document.querySelector('.module');
        if (firstModule) {
            this.toggleModule(firstModule, true);
        }
    }

    // Handle video play button click
    handleVideoPlay(button) {
        const videoCard = button.closest('.video-card');
        const videoNumber = parseInt(videoCard.dataset.video);
        
        // Create video modal
        this.createVideoModal(videoNumber);
        
        // Mark as started
        this.updateVideoProgress(videoNumber, 10);
    }

    // Create video modal for playback
    createVideoModal(videoNumber) {
        // Remove existing modal if any
        const existingModal = document.getElementById('video-modal');
        if (existingModal) {
            existingModal.remove();
        }

        const modal = document.createElement('div');
        modal.id = 'video-modal';
        modal.className = 'video-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${this.getVideoTitle(videoNumber)}</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="video-container">
                    <div class="video-placeholder-modal">
                        <div class="placeholder-content">
                            <div class="placeholder-icon">🎥</div>
                            <h4>Video Content</h4>
                            <p>Video embed will be added here</p>
                            <div class="placeholder-info">
                                <strong>Video ${videoNumber}</strong><br>
                                Replace this placeholder with your actual video embed code
                            </div>
                            <div class="video-actions">
                                <button class="action-btn mark-watched" data-video="${videoNumber}">
                                    Mark as Watched
                                </button>
                                <button class="action-btn mark-progress" data-video="${videoNumber}">
                                    Mark 50% Progress
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <div class="video-navigation">
                        ${videoNumber > 1 ? 
                            `<button class="nav-btn prev" data-video="${videoNumber - 1}">← Previous</button>` : 
                            '<button class="nav-btn prev disabled" disabled>← Previous</button>'
                        }
                        ${videoNumber < 50 ? 
                            `<button class="nav-btn next" data-video="${videoNumber + 1}">Next →</button>` : 
                            '<button class="nav-btn next disabled" disabled>Next →</button>'
                        }
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Add modal styles
        this.addModalStyles();

        // Setup modal event listeners
        this.setupModalEvents(modal, videoNumber);
    }

    // Add modal styles dynamically
    addModalStyles() {
        if (document.getElementById('modal-styles')) return;

        const styles = `
            .video-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.9);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                backdrop-filter: blur(10px);
            }

            .modal-content {
                background: var(--card-bg);
                border: 2px solid var(--neon-green);
                border-radius: 15px;
                width: 90%;
                max-width: 800px;
                max-height: 90vh;
                overflow: hidden;
                box-shadow: 0 0 50px rgba(0, 255, 0, 0.3);
            }

            .modal-header {
                background: rgba(0, 255, 0, 0.1);
                padding: 1rem 1.5rem;
                border-bottom: 1px solid var(--neon-green);
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .modal-header h3 {
                color: var(--neon-green);
                margin: 0;
                font-family: 'Orbitron', sans-serif;
            }

            .modal-close {
                background: none;
                border: none;
                color: var(--neon-green);
                font-size: 2rem;
                cursor: pointer;
                line-height: 1;
                padding: 0;
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .modal-close:hover {
                color: var(--neon-pink);
                transform: scale(1.1);
            }

            .video-container {
                padding: 2rem;
            }

            .video-placeholder-modal {
                background: rgba(0, 0, 0, 0.5);
                border: 2px dashed var(--neon-green);
                border-radius: 10px;
                padding: 3rem 2rem;
                text-align: center;
                color: var(--neon-green);
            }

            .placeholder-icon {
                font-size: 4rem;
                margin-bottom: 1rem;
            }

            .placeholder-content h4 {
                color: var(--text-primary);
                margin-bottom: 1rem;
                font-family: 'Orbitron', sans-serif;
            }

            .placeholder-info {
                background: rgba(0, 255, 0, 0.1);
                padding: 1rem;
                border-radius: 5px;
                margin: 1.5rem 0;
                border-left: 3px solid var(--neon-green);
            }

            .video-actions {
                display: flex;
                gap: 1rem;
                justify-content: center;
                flex-wrap: wrap;
            }

            .action-btn {
                background: var(--neon-green);
                color: var(--dark-bg);
                border: none;
                padding: 10px 20px;
                border-radius: 5px;
                cursor: pointer;
                font-family: 'Share Tech Mono', monospace;
                font-weight: bold;
                transition: all 0.3s ease;
            }

            .action-btn:hover {
                background: var(--neon-blue);
                transform: translateY(-2px);
            }

            .modal-footer {
                padding: 1rem 1.5rem;
                border-top: 1px solid rgba(0, 255, 0, 0.2);
                background: rgba(0, 0, 0, 0.3);
            }

            .video-navigation {
                display: flex;
                justify-content: space-between;
            }

            .nav-btn {
                background: rgba(0, 255, 0, 0.2);
                color: var(--neon-green);
                border: 1px solid var(--neon-green);
                padding: 10px 20px;
                border-radius: 5px;
                cursor: pointer;
                font-family: 'Share Tech Mono', monospace;
                transition: all 0.3s ease;
            }

            .nav-btn:hover:not(.disabled) {
                background: var(--neon-green);
                color: var(--dark-bg);
            }

            .nav-btn.disabled {
                opacity: 0.5;
                cursor: not-allowed;
            }

            @media (max-width: 768px) {
                .modal-content {
                    width: 95%;
                    margin: 1rem;
                }

                .video-container {
                    padding: 1rem;
                }

                .video-actions {
                    flex-direction: column;
                }

                .action-btn {
                    width: 100%;
                }
            }
        `;

        const styleSheet = document.createElement('style');
        styleSheet.id = 'modal-styles';
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
    }

    // Setup modal event listeners
    setupModalEvents(modal, currentVideo) {
        // Close modal
        modal.querySelector('.modal-close').addEventListener('click', () => {
            modal.remove();
        });

        // Close on background click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.parentNode) {
                modal.remove();
            }
        });

        // Mark as watched
        modal.querySelector('.mark-watched').addEventListener('click', () => {
            this.updateVideoProgress(currentVideo, 100);
            this.showNotification(`Video ${currentVideo} marked as watched!`);
            modal.remove();
        });

        // Mark 50% progress
        modal.querySelector('.mark-progress').addEventListener('click', () => {
            this.updateVideoProgress(currentVideo, 50);
            this.showNotification(`Video ${currentVideo} progress updated to 50%!`);
        });

        // Navigation buttons
        modal.querySelectorAll('.nav-btn:not(.disabled)').forEach(btn => {
            btn.addEventListener('click', () => {
                const targetVideo = parseInt(btn.dataset.video);
                modal.remove();
                setTimeout(() => {
                    this.createVideoModal(targetVideo);
                }, 300);
            });
        });
    }

    // Toggle module expand/collapse
    toggleModule(moduleElement, forceOpen = false) {
        const isActive = moduleElement.classList.contains('active');
        
        // Close all modules first
        document.querySelectorAll('.module').forEach(mod => {
            mod.classList.remove('active');
            mod.querySelector('.module-content').style.display = 'none';
            mod.querySelector('.module-toggle').textContent = '+';
        });

        // Open clicked module if it wasn't active
        if (!isActive || forceOpen) {
            moduleElement.classList.add('active');
            moduleElement.querySelector('.module-content').style.display = 'block';
            moduleElement.querySelector('.module-toggle').textContent = '−';
        }
    }

    // Toggle video progress
    toggleVideoProgress(progressCircle) {
        const videoCard = progressCircle.closest('.video-card');
        const videoNumber = parseInt(videoCard.dataset.video);
        
        const currentProgress = this.videos[videoNumber].progress;
        let newProgress;
        
        if (currentProgress === 100) {
            newProgress = 0;
        } else if (currentProgress === 0) {
            newProgress = 100;
        } else {
            newProgress = 100;
        }
        
        this.updateVideoProgress(videoNumber, newProgress);
    }

    // Update video progress
    updateVideoProgress(videoNumber, progress) {
        this.videos[videoNumber].progress = progress;
        this.videos[videoNumber].watched = progress === 100;
        
        this.updateVideoUI(videoNumber);
        this.updateModuleProgress(videoNumber);
        this.updateOverallProgress();
        this.saveProgress();
    }

    // Update video UI
    updateVideoUI(videoNumber) {
        const videoCard = document.querySelector(`[data-video="${videoNumber}"]`);
        if (!videoCard) return;

        const progress = this.videos[videoNumber].progress;
        const progressCircle = videoCard.querySelector('.progress-circle');
        const progressText = videoCard.querySelector('.progress-text');
        
        // Update progress circle
        progressCircle.style.background = 
            `conic-gradient(var(--neon-green) ${progress}%, rgba(0, 255, 0, 0.1) ${progress}%)`;
        progressText.textContent = `${progress}%`;
        
        // Update visual state
        if (progress === 100) {
            videoCard.classList.add('completed');
            videoCard.querySelector('.play-btn').style.background = 'var(--neon-blue)';
        } else if (progress > 0) {
            videoCard.classList.add('in-progress');
            videoCard.querySelector('.play-btn').style.background = 'var(--neon-pink)';
        } else {
            videoCard.classList.remove('completed', 'in-progress');
            videoCard.querySelector('.play-btn').style.background = 'var(--neon-green)';
        }
    }

    // Update module progress
    updateModuleProgress(videoNumber) {
        const moduleElement = document.querySelector(`[data-video="${videoNumber}"]`).closest('.module');
        if (!moduleElement) return;

        const moduleVideos = moduleElement.querySelectorAll('.video-card');
        let completed = 0;
        let total = moduleVideos.length;

        moduleVideos.forEach(video => {
            const vidNum = parseInt(video.dataset.video);
            if (this.videos[vidNum].progress === 100) {
                completed++;
            }
        });

        const statsElement = moduleElement.querySelector('.module-stats');
        if (statsElement) {
            statsElement.textContent = `${total} videos • ${completed}/${total} completed`;
        }
    }

    // Update overall progress
    updateOverallProgress() {
        let totalVideos = 0;
        let completedVideos = 0;

        Object.values(this.videos).forEach(video => {
            totalVideos++;
            if (video.progress === 100) {
                completedVideos++;
            }
        });

        const overallProgress = totalVideos > 0 ? Math.round((completedVideos / totalVideos) * 100) : 0;
        this.currentProgress = overallProgress;

        // Update progress bar
        const progressFill = document.querySelector('.progress-fill');
        const progressPercent = document.querySelector('.progress-percent');
        
        if (progressFill) {
            progressFill.style.width = `${overallProgress}%`;
        }
        
        if (progressPercent) {
            progressPercent.textContent = `${overallProgress}%`;
        }
    }

    // Save progress to localStorage
    saveProgress() {
        try {
            localStorage.setItem('hackingCourseProgress', JSON.stringify(this.videos));
        } catch (e) {
            console.warn('Could not save progress to localStorage:', e);
        }
    }

    // Load progress from localStorage
    loadProgress() {
        try {
            const saved = localStorage.getItem('hackingCourseProgress');
            if (saved) {
                const savedVideos = JSON.parse(saved);
                Object.keys(savedVideos).forEach(key => {
                    if (this.videos[key]) {
                        this.videos[key] = { ...this.videos[key], ...savedVideos[key] };
                    }
                });
                
                // Update UI with loaded progress
                Object.keys(this.videos).forEach(videoNumber => {
                    this.updateVideoUI(parseInt(videoNumber));
                    this.updateModuleProgress(parseInt(videoNumber));
                });
            }
        } catch (e) {
            console.warn('Could not load progress from localStorage:', e);
        }
    }

    // Setup scroll animations
    setupScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Observe all sections for fade-in animation
        document.querySelectorAll('section').forEach(section => {
            section.classList.add('fade-in');
            observer.observe(section);
        });
    }

    // Initialize terminal animation
    initializeTerminalAnimation() {
        const terminalLines = document.querySelectorAll('.terminal-line');
        let delay = 0;

        terminalLines.forEach((line, index) => {
            setTimeout(() => {
                line.style.opacity = '1';
                line.style.transform = 'translateY(0)';
            }, delay);
            delay += 800; // 0.8 seconds between lines
        });
    }

    // Scroll to course section
    scrollToCourse() {
        const courseSection = document.getElementById('course');
        if (courseSection) {
            courseSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    // Show notification
    showNotification(message) {
        // Remove existing notification
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        
        // Add notification styles
        if (!document.getElementById('notification-styles')) {
            const styles = `
                .notification {
                    position: fixed;
                    top: 100px;
                    right: 20px;
                    background: var(--neon-green);
                    color: var(--dark-bg);
                    padding: 15px 20px;
                    border-radius: 5px;
                    font-family: 'Share Tech Mono', monospace;
                    font-weight: bold;
                    z-index: 10001;
                    transform: translateX(400px);
                    transition: transform 0.3s ease;
                    box-shadow: 0 5px 15px rgba(0, 255, 0, 0.3);
                }

                .notification.show {
                    transform: translateX(0);
                }
            `;
            const styleSheet = document.createElement('style');
            styleSheet.id = 'notification-styles';
            styleSheet.textContent = styles;
            document.head.appendChild(styleSheet);
        }

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => notification.classList.add('show'), 100);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }, 3000);
    }
}

// Additional utility functions
function initializePage() {
    // Add loading animation
    document.body.style.opacity = '0';
    
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
        
        // Initialize the main application
        window.hackingCourse = new HackingCourse();
        
        // Add some interactive effects
        addInteractiveEffects();
    }, 100);
}

// Add interactive background effects
function addInteractiveEffects() {
    // Add cursor trail effect
    document.addEventListener('mousemove', (e) => {
        createParticle(e.clientX, e.clientY);
    });

    function createParticle(x, y) {
        if (Math.random() > 0.3) return; // Only create particles sometimes
        
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: var(--neon-green);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            left: ${x}px;
            top: ${y}px;
            opacity: 0.7;
        `;
        
        document.body.appendChild(particle);
        
        // Animate particle
        const animation = particle.animate([
            { transform: 'scale(1)', opacity: 0.7 },
            { transform: 'scale(0)', opacity: 0 }
        ], {
            duration: 1000,
            easing: 'ease-out'
        });
        
        animation.onfinish = () => particle.remove();
    }
}

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializePage);
} else {
    initializePage();
}

// Export for global access
window.HackingCourse = HackingCourse;