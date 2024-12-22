from typing import Union

import firebase_admin
from firebase_admin import credentials, db
from fastapi import FastAPI, Response
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
import json, uvicorn
from asyncio import sleep, Event, CancelledError, create_task
import random
from contextlib import asynccontextmanager
import time


cred = credentials.Certificate("iot-smarthydroponic-firebase-adminsdk-zqnhu-f905df0a48.json")
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://iot-smarthydroponic-default-rtdb.asia-southeast1.firebasedatabase.app/'
})

shutdown_event = Event()
sensorsDataRef = db.reference('sensorsData/')
dhtSensorRef = db.reference('sensorsData/DHT')

app = FastAPI()

# simulate microcontrollers
async def microController():
    try:
        while not shutdown_event.is_set():
            sensorsDataRef.push(
                {'humidity': str(random.random()), 
                 'temperature': str(random.random()), 
                 'waterHeight' : str(random.random()), 
                 'waterQuality' : str(random.random()), 
                 'timestamp': time.time()})
            await sleep(3)  # Use asyncio sleep here
    except CancelledError:
        print("Microcontroller simulation cancelled")

app.add_middleware(
    CORSMiddleware, 
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

        
@app.on_event("startup")
async def startup_event():
    create_task(microController())

@app.on_event("shutdown")
async def shutdown_event_handler():
    shutdown_event.set()  # Signal the microcontroller loop to stop
    print("Shutdown event triggered, stopping background tasks...")

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/firebase")
def firebase_root():
    return sensorsDataRef.get()

@app.post("/firebase-post")
async def post_root():
    sensorsDataRef.push(f"dht={random.random()}&ultra={random.random()}&tds={random.random()}")

# @app.get("/random")
# async def root():
#     return StreamingResponse(numberGenerator(), media_type="text/event-stream")



if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)