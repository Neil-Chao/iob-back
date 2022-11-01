import { Router } from 'express';
import {
	createBehaviorInstance
} from '../service/behaviorService'

const router = Router();

router.get('/', function (req, res, next) {
	res.send("hello, world!")
});

router.post('/createBehaviorInstance', async function (req, res) {
	const body = req.body
	const {
		uid,
		begin_time,
		light,
		type1,
	} = body
	await createBehaviorInstance(uid, begin_time, light, type1, body)
	res.send("finish")
});

export default router;
