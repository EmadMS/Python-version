document.addEventListener('DOMContentLoaded', () => {
    // Fetch data from our Python Flask API
    fetch('/api/data')
        .then(response => response.json())
        .then(data => {
            // Initialize charts with the fetched data
            initComparisonChart(data.hourlyData);
            initRegressionChart();
        })
        .catch(error => console.error('Error fetching chart data:', error));
});

/**
 * Renders the Bar Chart on the Zone Comparison Page
 */
function initComparisonChart(hourlyData) {
    const canvas = document.getElementById('comparisonChart');
    if (!canvas) return; // Exit if not on the Comparison page

    const ctx = canvas.getContext('2d');
    
    // Extract data for Chart.js
    const labels = hourlyData.map(d => d.time);
    const entranceData = hourlyData.map(d => d.entrance);
    const checkoutData = hourlyData.map(d => d.checkout);

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Entrance (Zone Alpha)',
                    data: entranceData,
                    backgroundColor: '#545f73',
                    borderRadius: 4,
                    barPercentage: 0.6
                },
                {
                    label: 'Checkout (Zone Beta)',
                    data: checkoutData,
                    backgroundColor: '#ba1b24',
                    borderRadius: 4,
                    barPercentage: 0.6
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { 
                    display: false // Hide Y axis to match the original React design
                },
                x: { 
                    grid: { display: false },
                    ticks: {
                        font: { weight: 'bold', size: 10 },
                        color: '#566166'
                    }
                }
            },
            plugins: {
                legend: { display: false },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    titleColor: '#2a3439',
                    bodyColor: '#566166',
                    borderColor: 'rgba(0,0,0,0.05)',
                    borderWidth: 1,
                    padding: 10,
                    boxPadding: 4,
                    usePointStyle: true
                }
            }
        }
    });
}

/**
 * Renders the Scatter Plot on the Statistics Page
 */
function initRegressionChart() {
    const canvas = document.getElementById('regressionChart');
    if (!canvas) return; // Exit if not on the Statistics page

    // Mocking scatter plot data (Matching your original React Math)
    const generateData = (points) => Array.from({length: points}, () => ({
        x: Math.floor(Math.random() * 50) + 10,
        y: Math.floor(Math.random() * 100) + 50
    }));

    const ctx = canvas.getContext('2d');
    new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Linear Model',
                data: generateData(50),
                backgroundColor: '#545f73',
                pointRadius: 4,
                pointHoverRadius: 6
            }, {
                label: 'Power Model',
                data: generateData(50),
                backgroundColor: '#ba1b24',
                pointRadius: 4,
                pointHoverRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: { 
                    title: { 
                        display: true, 
                        text: 'VISITOR FLOW', 
                        font: { weight: 'bold', size: 10, family: 'Inter' },
                        color: '#a9b4b9'
                    },
                    grid: { color: 'rgba(0,0,0,0.03)' }
                },
                y: { 
                    title: { 
                        display: true, 
                        text: 'DWELL TIME (MIN)', 
                        font: { weight: 'bold', size: 10, family: 'Inter' },
                        color: '#a9b4b9'
                    },
                    grid: { color: 'rgba(0,0,0,0.03)' }
                }
            },
            plugins: {
                legend: {
                    position: 'top',
                    align: 'end',
                    labels: { 
                        boxWidth: 8, 
                        boxHeight: 8,
                        usePointStyle: true,
                        font: { size: 10, weight: 'bold' }
                    }
                }
            }
        }
    });
}