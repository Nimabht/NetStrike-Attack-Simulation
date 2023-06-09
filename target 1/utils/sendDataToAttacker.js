import axios from "axios";
export default async (os, host, port) => {
  try {
    await axios.post("http://127.0.0.1:3000/target", {
      access_url: `http://${host}:${port}`,
      os,
    });
  } catch (error) {}
};
