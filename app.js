const express = require('express');
const db = require('./database.js');  // Import the connection pool from database.js
const app = express();

const port = 3000;

app.use(express.json());  // Middleware to parse JSON bodies

// Route to get users
app.get('/users', async (req, res) => {
    const userId = req.query.id;  // Use req.query.id to get the ID from query parameters

    try {
        if (userId) {
            // If userId is provided, fetch the specific user
            const [results] = await db.query('SELECT * FROM users WHERE id = ?', [userId]);
            if (results.length === 0) {
                return res.status(404).json({ message: 'User not found' });
            }s
            res.json(results[0]);
        } else {
            // If no userId is provided, fetch all users
            const [results] = await db.query('SELECT * FROM users');
            res.json(results);
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// Route to get all room alerts or a specific room alert by ID or room_no
app.get('/roomAlerts', async (req, res) => {
    const { id, room_no } = req.query;  // Use req.query to get parameters

    try {
        let query = 'SELECT * FROM room_alerts WHERE 1=1';  // Base query
        const queryParams = [];

        if (id) {
            query += ' AND id = ?';
            queryParams.push(id);
        }
        if (room_no) {
            query += ' AND room_no = ?';
            queryParams.push(room_no);
        }

        const [results] = await db.query(query, queryParams);
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// Route to get all devices or a specific device by ID
app.get('/devices', async (req, res) => {
    const deviceId = req.query.id;  // Use req.query.id to get the ID from query parameters

    try {
        if (deviceId) {
            // If deviceId is provided, fetch the specific device
            const [results] = await db.query('SELECT * FROM devices WHERE id = ?', [deviceId]);
            if (results.length === 0) {
                return res.status(404).json({ message: 'Device not found' });
            }
            res.json(results[0]);
        } else {
            // If no deviceId is provided, fetch all devices
            const [results] = await db.query('SELECT * FROM devices');
            res.json(results);
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Route to get all pinned card schedules or a specific pinned card schedule by ID
app.get('/pinnedCardSchedule', async (req, res) => {
    const scheduleId = req.query.id;  // Use req.query.id to get the ID from query parameters

    try {
        if (scheduleId) {
            // If scheduleId is provided, fetch the specific pinned card schedule
            const [results] = await db.query('SELECT * FROM pinned_card_schedule WHERE id = ?', [scheduleId]);
            if (results.length === 0) {
                return res.status(404).json({ message: 'Pinned card schedule not found' });
            }
            res.json(results[0]);
        } else {
            // If no scheduleId is provided, fetch all pinned card schedules
            const [results] = await db.query('SELECT * FROM pinned_card_schedule');
            res.json(results);
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Route to get a specific user by ID
app.get('/users?id', async (req, res) => {
    const userId = req.params.id;
    try {
        const [results] = await db.query('SELECT * FROM users WHERE id = ?', [userId]);
        if (results.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(results[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// Route to get all notifications or a specific notification by ID
app.get('/notification', async (req, res) => {
    const notificationId = req.query.id;  // Use req.query.id to get the ID from query parameters

    try {
        if (notificationId) {
            // If notificationId is provided, fetch the specific notification
            const [results] = await db.query('SELECT * FROM notification WHERE id = ?', [notificationId]);
            if (results.length === 0) {
                return res.status(404).json({ message: 'Notification not found' });
            }
            res.json(results[0]);
        } else {
            // If no notificationId is provided, fetch all notifications
            const [results] = await db.query('SELECT * FROM notification');
            res.json(results);
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
