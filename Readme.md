# TaskMaster API Suite

TaskMaster API Suite is a comprehensive solution for managing tasks and subtasks efficiently. It provides a set of APIs to create, update, delete tasks, and retrieve them based on various filters like priority and due date. The suite also includes cron jobs for automating priority adjustments and voice calls for overdue tasks.

## Features

- Create, update, and delete tasks
- Filter tasks by priority and due date
- Manage subtasks associated with tasks
- Automate priority adjustments based on due dates
- Initiate voice calls using Twilio for overdue tasks

## Setup

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Create a `.env` file based on the provided `.env.example` file.
4. Update the environment variables in the `.env` file with your configurations.
5. Start the server using `npm start`.

## Environment Variables

The following environment variables which are required:

- `PORT`: Port number for the server
- `MONGODB_URI`: MongoDB connection URI
- `JWT_SECRET`: Secret key for JWT token generation
- `TWILIO_ACCOUNT_SID`: Twilio account SID
- `TWILIO_AUTH_TOKEN`: Twilio authentication token
- `TWILIO_PHONE_NUMBER`: Twilio phone number

## Usage

1. Use Postman or any API testing tool to access the APIs I have used Thunderclient.
2. Authenticate using JWT token for authorized access.
3. Explore the available endpoints for task and subtask management.

## Cron Jobs

- Cron logic for changing task priority based on due dates is automatically executed.
- Cron logic for initiating voice calls for overdue tasks is triggered as per the configured schedule.

