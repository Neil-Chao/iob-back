import { Router } from 'express';
import {
    searchLatestBehavior
} from "../dao/mysql/behaviorMapper"

const router = Router();

router.get('/', function (req, res) {
    res.send("finish")
});

router.get('/searchLatestBehavior', function (req, res) {
    searchLatestBehavior()
    res.send("finish")
});

export default router;