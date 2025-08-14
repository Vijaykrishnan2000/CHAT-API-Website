# CHAT-API Website

[![License](https://img.shields.io/github/license/Vijaykrishnan2000/CHAT-API-Website)](LICENSE)
[![Issues](https://img.shields.io/github/issues/Vijaykrishnan2000/CHAT-API-Website)](https://github.com/Vijaykrishnan2000/CHAT-API-Website/issues)

## Overview

**CHAT-API Website** is an external chatbot platform designed to connect users with Salesforce Agents via REST API integration. This project enables seamless, real-time communication between web users and Salesforce-powered support agents, making it ideal for customer support, lead generation, and service automation.

## Features

- **Live Chat Interface:** Modern web-based chat interface for users.
- **Salesforce Integration:** Connects to Salesforce Agents using secure REST APIs.
- **Real-Time Messaging:** Enables instant messaging between users and agents.
- **Authentication:** Secure session management for users and agents.
- **Customizable UI:** Easily modify the chat frontend for your brand.
- **Scalable Architecture:** Built to handle multiple simultaneous chat sessions.

## Architecture

- **Frontend:** Interactive chat website (built with modern web technologies).
- **Backend/API:** Handles REST API communication with Salesforce, manages sessions, and message routing.
- **Salesforce Agents:** Receives and responds to chat requests from the website via Salesforce REST API endpoints.

## Getting Started
- **SalesforceProxy:** Update your Connected App credentials in the salesforceProxy.js file under netlify/functions.

### Prerequisites

- Node.js and npm (for backend/frontend dependencies)
- Salesforce account with Connected APP, REST API Credentials
- Configuration details for Salesforce REST API (Client ID, Secret, etc.)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Vijaykrishnan2000/CHAT-API-Website.git
   cd CHAT-API-Website
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Salesforce Integration:**
   - Edit the configuration file (e.g., `.env` or `config.js`) with your Salesforce API credentials and endpoints.

4. **Run the application:**
   ```bash
   npm start
   ```
   - The chat website should now be running locally.

## Usage

- Visit the website in your browser.
- Start a chat session as a user.
- Salesforce agents receive and respond to messages via the integrated REST API.

## REST API Integration

- **Authentication:** OAuth 2.0 flow with Salesforce for secure API access.
- **Endpoints:** The backend communicates with Salesforce chat endpoints to route messages.
- **Session Handling:** Each chat is managed as a unique session.

## Customization

- Update frontend styles for branding.
- Extend backend logic to support additional Salesforce objects or workflows.
- Add more features like file upload, chat history, or advanced analytics.

## Contributing

Contributions are welcome! Please submit issues or pull requests for improvements, bug fixes, or new features.

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/my-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/my-feature`)
5. Open a Pull Request

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

For questions, suggestions, or support, please open an [issue](https://github.com/Vijaykrishnan2000/CHAT-API-Website/issues) or contact [Vijaykrishnan2000](https://github.com/Vijaykrishnan2000).
