const express = require('express');
const cors = require('cors');
const path = require('path');

const chatsRouter = require('./routes/chats');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/chats', chatsRouter);

app.get('/api/health', (req, res) => res.json({ ok: true, now: new Date().toISOString() }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Backend running at http://localhost:${PORT}`));
