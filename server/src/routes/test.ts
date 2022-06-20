import express from 'express';
const router = express.Router();

router.get('/', (req: any, res: any) => {
	res.status(200).json({ message: 'Test Success' });
});
router.post('/', (req: any, res: any) => {
	const { email, password } = req.body;
	try {
		res.status(400).json({ email, password });
	} catch (error) {
		res.json(400).json({ message: 'something went wrong' });
	}
});
export default router;
