import express from 'express';
const router = express.Router();

router.get('/', (req: any, res: any) => {
	res.status(200).json({ message: 'Test Success' });
});
export default router;
