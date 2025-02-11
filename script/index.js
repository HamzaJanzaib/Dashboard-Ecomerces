const ctx = document.getElementById('myChart');

new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Sindh', 'Punjab', 'Balochistan', 'KPK', 'FATA', 'Other'],
        datasets: [{
            label: 'Our Sales',
            data: [2, 12, 3, 9, 2, 3],
            borderWidth: 1,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)', 
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)', 
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ]
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

// Conversion Chart
const conversionChart = new Chart(document.getElementById('conversionChart'), {
    type: 'doughnut',
    data: {
        datasets: [{
            data: [65.2, 34.8],
            backgroundColor: ['#ff6b6b', '#282E33'],
            borderWidth: 0
        }]
    },
    options: {
        cutout: '75%',
        plugins: {
            legend: {
                display: false
            }
        }
    }
});
