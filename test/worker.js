self.postMessage("hello from worker");

self.onmessage = function (event) {
  console.log("Received message from main thread:", event.data);
  self.postMessage("Message received: " + event.data);
};
