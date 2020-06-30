# bleno-kibo

Simulation of a Kibo using the bleno Node module.

The Node application consists of a web server and a Bluetooth Low Energy peroipheral simulation.

The server serves an HTML page where a MIDI controller can be connected using the JavaScript Web MIDI API. MIDI Note and Controller messages are sent from the client to the server. Probably through a socket connection. The server sends the messages as BLE notifications to listening BLE central devices.

Note: Bleno is set up here for Mac OS Catalina. As explained in this article:

https://punchthrough.com/how-to-use-node-js-to-speed-up-ble-app-development/

- MIDI over Bluetooth LE
  - https://tigoe.github.io/SoundExamples/midi-ble.html
- MIDI BLE Tutorial
  - https://learn.sparkfun.com/tutorials/midi-ble-tutorial/create-a-basic-ble-peripheral
  