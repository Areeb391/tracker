from flask import Flask, request, render_template, jsonify

app = Flask(__name__)
location_data = {"lat": 0.0, "lng": 0.0}

@app.route('/')
def home():
    return render_template('map.html')

@app.route('/update_location', methods=['POST'])
def update_location():
    data = request.json
    location_data['lat'] = data['lat']
    location_data['lng'] = data['lng']
    return jsonify({"status": "Location updated"})

@app.route('/get_location')
def get_location():
    return jsonify(location_data)

if __name__ == '__main__':
    app.run(debug=True,host='0.0.0.0' , port=5000)