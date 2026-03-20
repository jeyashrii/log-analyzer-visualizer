# Log Monitoring Dashboard

This is a simple full stack log monitoring dashboard built with React, Node.js, Express, and MongoDB.

The backend continuously simulates logs and stores them in MongoDB. Each log includes a timestamp, level, service, and message.

The frontend shows the logs in a table with filtering support for log level, service, and search text. It also supports refreshing to display newly generated logs.

A log stats API is implemented to return the number of INFO, WARN, and ERROR logs within the last few seconds, along with total log count and error rate. These stats are displayed in the UI using a bar chart.

# Screenshots and video attachements

![alt text](image.png)
![alt text](image-1.png)

https://drive.google.com/file/d/1HeEDg_DsczocxqjAmKefKu1cWm8Q5C7l/view?usp=sharing

## Run the project

Start the backend server from the backend folder.

```bash
npm install
npm run dev
```

Start the app from the frontend folder.

```bash
npm install
npm run dev

```
