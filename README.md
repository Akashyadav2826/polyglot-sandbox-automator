# Polyglot Sandbox Automator

A containerized, automated code-execution platform developed as part of my B.Tech curriculum at Lovely Professional University.

## Features
- TypeScript REST API for code execution.
- Secure, isolated Python & Node.js runners using Docker containers.
- Automated lifecycle management (Setup, Build, Test, Clean).
- Orchestrated with Docker Compose.

## How to Run
Use the provided management script to handle the environment:

```bash
./scripts/manage.sh setup
./scripts/manage.sh build
./scripts/manage.sh test
## 🛠️ Technical Stack
*   **Backend**: Node.js with TypeScript.
*   **Containerization**: Docker & Docker Compose.
*   **Process Management**: Child Process spawning for Docker execution.
*   **Orchestration**: Redis (configured for task management).

## 📂 System Architecture
The system consists of a primary API container that communicates with the Docker socket to spin up "Runner" containers on demand.
1.  **API**: Handles incoming execution requests.
2.  **Runners**: Short-lived containers (Python/Node.js) that execute the code and return output.
3.  **Automation**: A shell script (`manage.sh`) that manages the entire lifecycle.

## 🔗 Project Documentation & Links
*   **Postman API Collection**: https://drive.google.com/file/d/1c9ZFweKe846CR6jIEDpGtW7379nLFWJz/view?usp=drive_link
*   **Docker Hub Image**: https://hub.docker.com/r/akash2826/polyglot-sandbox-automator-api
*   **Developer**: Akash Yadav
*   **University**: Lovely Professional University
*   **Graduation Year**: 2027