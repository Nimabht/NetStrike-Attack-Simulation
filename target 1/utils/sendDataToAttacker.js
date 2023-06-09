import axios from "axios";
import si from "systeminformation";

export default async (host, port) => {
  try {
    const ware_info = {
      os: await si.osInfo(),
      cpu: await si.cpu(),
      mem: await si.mem(),
      disk: await si.diskLayout(),
      network: await si.networkInterfaces(),
    };
    await axios.post("http://127.0.0.1:3000/target", {
      access_url: `http://${host}:${port}`,
      ware_info,
    });
  } catch (error) {}
};
