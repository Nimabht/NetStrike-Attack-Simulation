import express from "express";
import robot from "robotjs";
import screenshot from "screenshot-desktop";
import fs from "fs";
import JSZip from "jszip";
import { exec } from "child_process";
import os from "os";
import path from "path";

const app = express();

app.use(express.json());

app.get("/screen-shot", async (req, res, next) => {
  try {
    const img = await screenshot();
    res.set("Content-Type", "image/png");
    res.set("Content-Disposition", "attachment; filename=screenshot.png");
    res.send(img);
  } catch (error) {
    next(error);
  }
});

app.post("/move-mouse", async (req, res, next) => {
  try {
    const { x, y } = req.body;
    robot.moveMouse(x, y);
    res.send("Mouse moved successfully");
  } catch (error) {
    next(error);
  }
});

app.get("/create-zip", async (req, res, next) => {
  try {
    const pathToZip = req.query.path;
    const zip = new JSZip();

    function addFilesToZip(folderPath, parentFolder) {
      const files = fs.readdirSync(folderPath);

      files.forEach((file) => {
        const filePath = `${folderPath}/${file}`;
        const stats = fs.statSync(filePath);

        if (stats.isDirectory()) {
          const newParent = `${parentFolder}/${file}`;
          addFilesToZip(filePath, newParent);
        } else {
          const fileData = fs.readFileSync(filePath);
          zip.file(`${parentFolder}/${file}`, fileData);
        }
      });
    }

    addFilesToZip(pathToZip, "");
    zip
      .generateAsync({ type: "nodebuffer" })
      .then((content) => {
        // Set response headers
        res.set("Content-Disposition", "attachment; filename=archive.zip");
        res.set("Content-Type", "application/zip");

        // Send the zip file content in the response

        console.log(content);
        res.send(content);
      })
      .catch((error) => {
        next(error);
      });
  } catch (error) {
    console.log(error.message);

    next(error);
  }
});

app.get("/give-ls", async (req, res, next) => {
  try {
    const rootDirectory = path.parse(process.cwd()).root;
    const pathToLs = path.join(rootDirectory, req.query.path);
    let command;
    if (os.platform() === "win32") {
      command = `dir "${pathToLs}"`;
    } else {
      command = `ls "${pathToLs}"`;
    }
    exec(command, (error, stdout, stderr) => {
      res.send(stdout);
    });
  } catch (error) {
    next(error);
  }
});

app.use((Error, req, res, next) => {
  res.status(400);
  res.send(Error.message);
});
export default app;
