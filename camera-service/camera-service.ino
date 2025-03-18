#include <Arduino.h>
#include <SPI.h>
#include "esp_camera.h"
#include <WiFi.h>
#include <WebSocketsClient.h>
#include "Base64.h"  // Base64 encoding library

#define CAMERA_MODEL_AI_THINKER // Define your camera model
#include "camera_pins.h"

////////////////TO Be changed///////////

// WiFi credentials
const char* ssid = "Redmi Note 12";  // University WiFi SSID
const char* password = "Hansaka123@";  // Your password


// WebSocket server address and port
const char *ws_host = "192.168.157.203";  // Change this to your WebSocket server IP
const uint16_t ws_port = 8764;

///////////TO be changed//////////////


WebSocketsClient webSocket;

void onWebSocketEvent(WStype_t type, uint8_t *payload, size_t length) {
  switch (type) {
    case WStype_DISCONNECTED:
      Serial.println("WebSocket Disconnected!");
      break;
    case WStype_CONNECTED:
      Serial.println("WebSocket Connected!");
      break;
    case WStype_TEXT:
      Serial.printf("Received message: %s\n", payload);
      break;
    case WStype_BIN:
      Serial.println("Binary message received");
      break;
    case WStype_ERROR:
      Serial.println("WebSocket Error!");
      break;
  }
}

void setup() {
  Serial.begin(115200);

  // --- Camera Configuration ---
  camera_config_t config;
  config.ledc_channel = LEDC_CHANNEL_0;
  config.ledc_timer = LEDC_TIMER_0;
  config.pin_d0 = Y2_GPIO_NUM;
  config.pin_d1 = Y3_GPIO_NUM;
  config.pin_d2 = Y4_GPIO_NUM;
  config.pin_d3 = Y5_GPIO_NUM;
  config.pin_d4 = Y6_GPIO_NUM;
  config.pin_d5 = Y7_GPIO_NUM;
  config.pin_d6 = Y8_GPIO_NUM;
  config.pin_d7 = Y9_GPIO_NUM;
  config.pin_xclk = XCLK_GPIO_NUM;
  config.pin_pclk = PCLK_GPIO_NUM;
  config.pin_vsync = VSYNC_GPIO_NUM;
  config.pin_href = HREF_GPIO_NUM;
  config.pin_sscb_sda = SIOD_GPIO_NUM;
  config.pin_sscb_scl = SIOC_GPIO_NUM;
  config.pin_pwdn = PWDN_GPIO_NUM;
  config.pin_reset = RESET_GPIO_NUM;
  config.xclk_freq_hz = 20000000;

  config.frame_size = FRAMESIZE_QVGA;  // Lower resolution to ensure smooth transmission
  config.pixel_format = PIXFORMAT_JPEG;
  config.jpeg_quality = 15;  // Higher compression for faster transmission
  config.fb_count = 2;  // Increase buffer count if PSRAM is available

  if (psramFound()) {
    config.jpeg_quality = 15;  // Increase compression to speed up transmission
    config.fb_count = 3;
    config.grab_mode = CAMERA_GRAB_LATEST;
  } else {
    config.frame_size = FRAMESIZE_VGA;
    config.fb_location = CAMERA_FB_IN_DRAM;
  }

  // Initialize the camera
  esp_err_t err = esp_camera_init(&config);
  if (err != ESP_OK) {
    Serial.printf("Camera init failed with error 0x%x", err);
    return;
  }
  Serial.println("Camera ready");

  // --- WiFi Connection ---
  WiFi.begin(ssid, password);
  Serial.print("Connecting to WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(100);
    Serial.print(".");
  }
  Serial.println("\nConnected! IP address: " + WiFi.localIP().toString());

  // --- WebSocket Client Setup ---
  webSocket.begin(ws_host, ws_port, "/");
  webSocket.onEvent(onWebSocketEvent);
  webSocket.setReconnectInterval(3000);  // Faster reconnection if disconnected
}

void loop() {
  webSocket.loop();  // Maintain WebSocket connection

  // Capture a frame
  camera_fb_t *fb = esp_camera_fb_get();
  if (!fb) {
    Serial.println("Camera capture failed");
    delay(100);  // Reduce delay for faster retry
    return;
  }

  // Convert image buffer to Base64 string
  String base64Image = base64::encode(fb->buf, fb->len);   //encoding the image to a text

  // Send Base64 image over WebSocket
  webSocket.sendTXT(base64Image); //sending to the websocket

  // Release memory
  esp_camera_fb_return(fb);
}
