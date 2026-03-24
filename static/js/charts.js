let regressionChartInstance = null;

document.addEventListener('DOMContentLoaded', () => {
    if (typeof window.comparisonChartData !== 'undefined') {
        initComparisonChart(window.comparisonChartData);
    }
    if (document.getElementById('regressionChart')) {
        initRegressionChart();
    }
});

function initComparisonChart(chartData) {
    const canvas = document.getElementById('comparisonChart');
    if (!canvas) return; 

    const labels = chartData.map(d => d.time);
    const entranceData = chartData.map(d => d.entrance);
    const checkoutData = chartData.map(d => d.checkout);

    new Chart(canvas.getContext('2d'), {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                { label: 'Entrance', data: entranceData, backgroundColor: '#545f73', borderRadius: 4 },
                { label: 'Checkout', data: checkoutData, backgroundColor: '#ba1b24', borderRadius: 4 }
            ]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            scales: { y: { display: false }, x: { grid: { display: false } } },
            plugins: { legend: { display: false } }
        }
    });
}

function generateScatterData(points, multiplier = 1) {
    return Array.from({length: points}, () => ({
        x: Math.floor(Math.random() * 50) + 10,
        y: (Math.floor(Math.random() * 100) + 50) * multiplier
    }));
}

function initRegressionChart() {
    const canvas = document.getElementById('regressionChart');
    if (!canvas) return; 

    const ctx = canvas.getContext('2d');
    regressionChartInstance = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [
                { label: 'Linear Model', data: generateScatterData(50), backgroundColor: '#545f73' }, 
                { label: 'Power Model', data: generateScatterData(50), backgroundColor: '#ba1b24' }
            ]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            scales: {
                x: { title: { display: true, text: 'VISITOR FLOW' } },
                y: { title: { display: true, text: 'DWELL TIME' } }
            }
        }
    });
}

function toggleStats(mode) {
    const liveBtn = document.getElementById('btn-live');
    const histBtn = document.getElementById('btn-historic');
    const densityVal = document.getElementById('density-val');

    if (mode === 'live') {
        liveBtn.className = 'btn btn-white shadow-sm fw-bold text-primary text-uppercase';
        histBtn.className = 'btn btn-light fw-bold text-muted text-uppercase';
        densityVal.innerText = '42.8k';
        if(regressionChartInstance) {
            regressionChartInstance.data.datasets[0].data = generateScatterData(50, 1);
            regressionChartInstance.data.datasets[1].data = generateScatterData(50, 1);
            regressionChartInstance.update();
        }
    } else {
        histBtn.className = 'btn btn-white shadow-sm fw-bold text-primary text-uppercase';
        liveBtn.className = 'btn btn-light fw-bold text-muted text-uppercase';
        densityVal.innerText = '38.1k'; 
        if(regressionChartInstance) {
            regressionChartInstance.data.datasets[0].data = generateScatterData(50, 0.7); 
            regressionChartInstance.data.datasets[1].data = generateScatterData(50, 0.7);
            regressionChartInstance.update();
        }
    }
}