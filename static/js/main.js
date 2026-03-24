document.addEventListener('DOMContentLoaded', () => {
    
    // --- DASHBOARD SLIDERS ---
    const sensitivitySlider = document.getElementById('sensitivity-slider');
    const sensitivityValue = document.getElementById('sensitivity-value');
    if (sensitivitySlider) {
        sensitivitySlider.addEventListener('input', (e) => {
            sensitivityValue.innerText = e.target.value + '%';
        });
    }

    const dwellSlider = document.getElementById('dwell-slider');
    const dwellValue = document.getElementById('dwell-value');
    if (dwellSlider) {
        dwellSlider.addEventListener('input', (e) => {
            dwellValue.innerText = (e.target.value / 10).toFixed(1) + 's';
        });
    }

    // --- REPORTS FORMAT TOGGLES & EXPORT ---
    let selectedExportFormat = 'pdf'; // Default format
    const formatCards = document.querySelectorAll('.format-card');
    
    if (formatCards.length > 0) {
        formatCards.forEach(card => {
            card.addEventListener('click', () => {
                formatCards.forEach(c => {
                    c.classList.remove('border-primary', 'bg-primary', 'bg-opacity-10');
                    c.classList.add('border-opacity-25');
                });
                card.classList.add('border-primary', 'bg-primary', 'bg-opacity-10');
                card.classList.remove('border-opacity-25');
                
                // Update selected format state
                selectedExportFormat = card.getAttribute('data-format');
            });
        });
    }

    const generateBtn = document.getElementById('generate-report-btn');
    if (generateBtn) {
        generateBtn.addEventListener('click', () => {
            // Trigger download
            window.location.href = '/export?format=' + selectedExportFormat;
        });
    }

    // --- PRIVACY GDPR TOGGLE ---
    const gdprToggle = document.getElementById('gdpr-toggle');
    const gdprStatus = document.getElementById('gdpr-status');
    const topbarGdpr = document.getElementById('topbar-gdpr');
    
    if (gdprToggle) {
        gdprToggle.addEventListener('change', (e) => {
            if (e.target.checked) {
                gdprStatus.innerHTML = '<i data-lucide="shield-check" style="width: 14px;"></i> ACTIVE';
                gdprStatus.className = 'badge bg-primary bg-opacity-10 text-primary px-3 py-2 d-inline-flex align-items-center gap-2';
                if(topbarGdpr) topbarGdpr.innerHTML = '<i data-lucide="shield-check" class="text-danger" style="fill: currentColor; width: 16px;"></i><span class="fw-bold text-muted text-uppercase" style="font-size: 0.7rem; letter-spacing: 1px;">GDPR Privacy Mode: Active</span>';
            } else {
                gdprStatus.innerHTML = '<i data-lucide="shield-alert" style="width: 14px;"></i> INACTIVE';
                gdprStatus.className = 'badge bg-danger bg-opacity-10 text-danger px-3 py-2 d-inline-flex align-items-center gap-2';
                if(topbarGdpr) topbarGdpr.innerHTML = '<i data-lucide="shield-alert" class="text-muted" style="width: 16px;"></i><span class="fw-bold text-muted text-uppercase" style="font-size: 0.7rem; letter-spacing: 1px;">GDPR Privacy Mode: Inactive</span>';
            }
            lucide.createIcons(); 
        });
    }

    // --- HEATMAP OVERLAY TOGGLE ---
    const heatmapBtn = document.getElementById('toggle-heatmap-btn');
    const heatmapOverlay = document.getElementById('heatmap-overlay');
    if (heatmapBtn && heatmapOverlay) {
        heatmapBtn.addEventListener('click', () => {
            heatmapOverlay.classList.toggle('d-none');
            if(heatmapOverlay.classList.contains('d-none')) {
                heatmapBtn.classList.replace('btn-primary', 'btn-outline-primary');
                heatmapBtn.innerText = 'Show Overlay';
            } else {
                heatmapBtn.classList.replace('btn-outline-primary', 'btn-primary');
                heatmapBtn.innerText = 'Hide Overlay';
            }
        });
    }
});

function forgotPassword() {
    alert("Please contact your IT Administrator at admin@precisionlens.ai to reset your credentials.");
}