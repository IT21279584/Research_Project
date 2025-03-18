import asyncio
import websockets
import firebase_admin
from firebase_admin import credentials, db

# Firebase initialization
cred = credentials.Certificate("serviceAccountKey.json")
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://cultivation-monitor-default-rtdb.asia-southeast1.firebasedatabase.app/'
})

# Reference to the Firebase database
ref = db.reference("/image_data")

# This will store the last 3 messages
last_messages = []


async def forward_message_to_other_servers(message):
    try:
        # Connect to WebSocket servers on ports 8766 and 8768
        async with websockets.connect("ws://localhost:8765") as ws_8765:
            await ws_8765.send(message)
        async with websockets.connect("ws://localhost:8766") as ws_8766:
            await ws_8766.send(message)
        async with websockets.connect("ws://localhost:8767") as ws_8767:
            await ws_8767.send(message)
        async with websockets.connect("ws://localhost:8768") as ws_8768:
            await ws_8768.send(message)
        async with websockets.connect("ws://localhost:8769") as ws_8769:
            await ws_8769.send(message)
        async with websockets.connect("ws://localhost:8770") as ws_8770:
            await ws_8770.send(message)
    except Exception as e:
        print(f"Error forwarding message: {e}")


async def handle_websocket(websocket):
    async for message in websocket:
        try:
            # Save the received message to a text file (non-blocking)
            with open("received_messages.txt", "a") as f:
                f.write(message + "\n")  # Append the message to the file

            print("Received message via WebSocket")

            # Add the message to the last_messages list
            last_messages.insert(0, message)  # Insert at the beginning

            # Keep only the last 3 messages
            if len(last_messages) > 3:
                last_messages.pop()  # Remove the oldest message

            # Update Firebase with the last 3 messages (non-blocking)
            asyncio.create_task(update_firebase(last_messages))

            # Forward the message to other servers (non-blocking)
            asyncio.create_task(forward_message_to_other_servers(message))

            await websocket.send("Message forwarded to other servers.")

            # Ensure a minimum cycle time of 1 second
            await asyncio.sleep(1)

        except Exception as e:
            error_msg = f"Error during inference: {str(e)}"
            print(error_msg)
            await websocket.send(str({"error": error_msg}))


async def update_firebase(messages):
    try:
        for i, msg in enumerate(messages, start=1):
            ref.child(str(i)).set(msg)  # Set message with ID 1, 2, 3
    except Exception as e:
        print(f"Error updating Firebase: {e}")


async def main():
    async with websockets.serve(handle_websocket, "0.0.0.0", 8764):
        print("WebSocket Server running on ws://0.0.0.0:8764")
        await asyncio.Future()

if __name__ == "__main__":
    asyncio.run(main())
