import json
import io
import csv
from flask import Flask, render_template, request, redirect, url_for, session, flash, send_file
from functools import wraps

app = Flask(__name__)
app.secret_key = 'super_secret_precision_lens_key'

def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'user' not in session:
            return redirect(url_for('login'))
        return f(*args, **kwargs)
    return decorated_function

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        
        with open('users.json', 'r') as f:
            users = json.load(f)
            
        if username in users and users[username] == password:
            session['user'] = username
            return redirect(url_for('dashboard'))
        else:
            flash('Invalid username or password. Please try again.')
            
    return render_template('login.html')

@app.route('/logout')
def logout():
    session.pop('user', None)
    return redirect(url_for('login'))

@app.route('/')
@app.route('/dashboard')
@login_required
def dashboard():
    return render_template('dashboard.html', current_page='dashboard')

@app.route('/heatmap')
@login_required
def heatmap():
    return render_template('heatmap.html', current_page='heatmap')

@app.route('/comparison')
@login_required
def comparison():
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
@login_required
def statistics():
    return render_template('statistics.html', current_page='statistics')

@app.route('/reports')
@login_required
def reports():
    return render_template('reports.html', current_page='reports')

@app.route('/privacy')
@login_required
def privacy():
    return render_template('privacy.html', current_page='privacy')

# --- NEW: EXPORT ROUTE ---
@app.route('/export')
@login_required
def export():
    fmt = request.args.get('format', 'pdf')
    
    if fmt == 'csv':
        # Generate a real CSV file
        si = io.StringIO()
        cw = csv.writer(si)
        cw.writerow(['Zone Name', 'Category', 'Footfall', 'Avg Dwell', 'Conversion %'])
        cw.writerow(['Entrance', 'Primary Hub', '14208', '02:45', '8.4%'])
        cw.writerow(['Main Checkout', 'Transactional', '5870', '06:12', '92.1%'])
        
        output = io.BytesIO()
        output.write(si.getvalue().encode('utf-8'))
        output.seek(0)
        return send_file(output, as_attachment=True, download_name='precision_lens_report.csv', mimetype='text/csv')
    
    elif fmt == 'xlsx':
        # Return a dummy XLSX file to trigger download
        output = io.BytesIO(b"Dummy XLSX Content")
        output.seek(0)
        return send_file(output, as_attachment=True, download_name='precision_lens_report.xlsx', mimetype='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
        
    else: # Default to PDF
        # Return a dummy PDF file to trigger download
        output = io.BytesIO(b"%PDF-1.4\n%Dummy PDF Content\n")
        output.seek(0)
        return send_file(output, as_attachment=True, download_name='precision_lens_report.pdf', mimetype='application/pdf')

if __name__ == '__main__':
    app.run(debug=True, port=3000)