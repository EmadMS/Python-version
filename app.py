from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
@app.route('/dashboard')
def dashboard():
    return render_template('dashboard.html', current_page='dashboard')

@app.route('/heatmap')
def heatmap():
    return render_template('heatmap.html', current_page='heatmap')

@app.route('/comparison')
def comparison():
    # Mock data replacing the constant in ZoneComparison.tsx
    hourly_data = [
        {'time': '08:00', 'entrance': 20, 'checkout': 5},
        {'time': '10:00', 'entrance': 45, 'checkout': 15},
        {'time': '12:00', 'entrance': 75, 'checkout': 25},
        {'time': '14:00', 'entrance': 90, 'checkout': 35},
        {'time': '16:00', 'entrance': 85, 'checkout': 30},
        {'time': '18:00', 'entrance': 65, 'checkout': 80},
        {'time': '20:00', 'entrance': 40, 'checkout': 95},
        {'time': '22:00', 'entrance': 15, 'checkout': 60},
    ]
    return render_template('comparison.html', current_page='comparison', chart_data=hourly_data)

@app.route('/statistics')
def statistics():
    return render_template('statistics.html', current_page='statistics')

@app.route('/reports')
def reports():
    return render_template('reports.html', current_page='reports')

@app.route('/privacy')
def privacy():
    return render_template('privacy.html', current_page='privacy')

if __name__ == '__main__':
    app.run(debug=True, port=3000)