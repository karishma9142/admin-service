import  express from 'express';
import { isAdmin, IsAuth } from '../middleware/isAuth.js';
import { getPendingRestaurant, getPendingRiders, verifyRestaurant, verifyRider } from '../controllers/admin.js';

const router = express.Router();

router.get("/admin/restaurant/pending" , IsAuth , isAdmin,getPendingRestaurant);
router.get("/admin/rider/pending" , IsAuth,isAdmin,getPendingRiders);
router.patch("/verify/rider/:id" , IsAuth,isAdmin,verifyRider);
router.patch("/verify/restaurant/:id" , IsAuth,isAdmin,verifyRestaurant)

export default router;