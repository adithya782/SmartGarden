#include <WiFi.h>
#include <HTTPClient.h>
#include "config.h"

// int count = 0;
void setup() {
  // put your setup code here, to run once:
  pinMode(34,INPUT);
  WiFi.begin(ssid,password);
  Serial.begin(9600);
while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting...");
  }

  Serial.println("Connected to Wi-Fi");
}

void loop() {
  // put your main code here, to run repeatedly:
  int value = analogRead(34);
  // Serial.println(value);
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    http.begin(server);
    http.addHeader("Content-Type", "application/x-www-form-urlencoded");
    // String httpData = String(count);
    String httpData = "value=" + String(value);
    Serial.print("Data: ");
    Serial.println(httpData);
    int response = http.POST(httpData);
    if(response > 0){
      Serial.print("[HTTP] Server Response Code: ");
      Serial.println(response);

      String responseBody = http.getString();
      Serial.print("[HTTP] Server Message: ");
      Serial.println(responseBody);
    } else {
      Serial.print("[HTTP] Error sending POST code: ");
      Serial.println(response);
    }
    http.end();
    // count ++;
  }
  else {
    Serial.println("[Warning] Wi-Fi lost. Attempting reconnection...");
    WiFi.begin(ssid, password);
  }
  delay(1000);
  
  // delay(1000);
}

/*
#include <WiFi.h>

const char* ssid = "Your_wifi_ssid";
const char*  password = "Your_wifi_password";

void setup() {
  // put your setup code here, to run once:
  pinMode(34,INPUT);
  WiFi.begin(ssid,password);
  Serial.begin(9600);
while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting...");
  }

  Serial.println("Connected to Wi-Fi");
}

void loop() {
  // put your main code here, to run repeatedly:
  int value = analogRead(34);
  Serial.println(value);
  delay(1000);
}
*/