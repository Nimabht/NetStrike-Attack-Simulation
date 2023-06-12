# Network final project

## Project Description

The Socket Attack Simulation is a scenario-based application that simulates a network attack environment. It consists of two sockets: an attacker socket built with Nest.js and a target socket built with Express.js. The purpose of this simulation is to demonstrate various attack techniques and their potential impact on a target system, while also monitoring the target's status and automatically restarting it if it crashes.

## Problem Statement

Understanding network security vulnerabilities and the consequences of network attacks is crucial in today's interconnected world. This simulation addresses the need for hands-on experience in identifying potential attack vectors, monitoring system status, and implementing recovery mechanisms.

## Key Features

### Registration and System Monitoring:

When the target socket starts running, it notifies the attacker socket that it has registered on the system and is currently running. The attacker socket saves the new target's information to a database and starts monitoring its status.

### Screenshot Capture:

The attacker socket can initiate a request to capture a screenshot of the target system's display, providing a visual representation of the target's current state.

### Remote Mouse Control:

The attacker socket has the capability to control the target system's mouse remotely, allowing for interaction with the target's graphical user interface.

### File Download:

The attacker socket can initiate file downloads from the target system, providing access to specific files or directories within the target's storage.

### System Path Retrieval:

The attacker socket can retrieve a comprehensive list of file paths within the target system's storage, enabling reconnaissance and potential exploitation.

### Python Program Execution:

The attacker socket can send Python programs to the target system and execute them. This feature provides the ability to run custom Python code on the target, expanding the range of possible actions and capabilities.

### Status Updates and Crash Recovery:

Each target socket sends a periodic "alive" signal to the attacker socket every 5 seconds, indicating that it is still operational. If a target socket crashes, the attacker socket automatically detects it and initiates the restart process.

# Installation

Install with npm

```bash
  cd .\attacker\
  npm install
  cd '..\target 1\'
  npm install
```

# Running (Dev)

```bash
  cd .\attacker\
  npm run start:dev
  cd '..\target 1\'
  npm run start:dev
```

# API Reference

### Load swagger ui

```http
  GET /api
```

### Get all targets

```http
  GET /target
```

### Take screenshot

```http
  GET /target/screenshot/:targetId
```

| Parameter  | Type     | Description   |
| :--------- | :------- | :------------ |
| `targetId` | `string` | **Required**. |

### Move mouse

```http
  GET /target/move-mouse/:targetId
```

| Parameter  | Type     | Description   |
| :--------- | :------- | :------------ |
| `targetId` | `string` | **Required**. |

### Download files

```http
  GET /target/download-files/:targetId?path=<path>
```

| Parameter  | Type     | Description   |
| :--------- | :------- | :------------ |
| `targetId` | `string` | **Required**. |
| `path`     | `string` | **Required**. |

### Get directory list

```http
  GET /target/ls/:targetId?path=<path>
```

| Parameter  | Type     | Description   |
| :--------- | :------- | :------------ |
| `targetId` | `string` | **Required**. |
| `path`     | `string` | **Required**. |

### Upload python file and execute it

```http
  POST /target/upload-file/:targetId
```

| Parameter  | Type        | Description   |
| :--------- | :---------- | :------------ |
| `targetId` | `string`    | **Required**. |
| `file.py`  | `Form-Data` | **Required**. |

# Stay in touch

- [LinedIn](https://www.linkedin.com/in/nimabeheshtaein/)
- [Email](mailto:nimabeheshtaein99@gmail.com)

# Authors

- [@nimabeheshtaein](https://github.com/Nimabht)
