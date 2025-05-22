import requests

import time

import random



# Continually simulate location updates

while True:

    lat = 19.07 + random.uniform(-0.01, 0.01)  # Approx around Mumbai

    lng = 72.87 + random.uniform(-0.01, 0.01)

    try:

        res = requests.post('http://127.0.0.1:5000/update_location', json={"lat": lat, "lng": lng})

        print(f"Sent location: {lat}, {lng}")

    except Exception as e:

        print("Failed to send location:", e)

    time.sleep(5)