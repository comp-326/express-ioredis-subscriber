import express from 'express';
import RedisClient from './redis';
const port = process.env.PORT || 3000;

const app = express();
const users: any[] = [];
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const subscriber = RedisClient;
subscriber.getMessage(async (channel: string, data: any) => {
	users.push(JSON.parse(data))
});

subscriber.subscribe('users');
app.get('/', (req, res) => {
	res.status(200).json({ users });
});

app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
