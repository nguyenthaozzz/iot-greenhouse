import time
import json
import random
import paho.mqtt.client as mqtt

client = mqtt.Client()
client.connect("localhost", 1883, 60)

while True:
    data = {
        "temperature": round(random.uniform(25, 35), 1),
        "humidity": round(random.uniform(60, 90), 1),
        "soil": random.randint(300, 800),
        "light": random.randint(200, 1000)
    }
    client.publish("greenhouse/sensor", json.dumps(data))
    print("Published:", data)
    time.sleep(3)