import { Router } from "express";
import { getAllUsers, createUser, updateUser, deleteUser } from "../controllers/userController";
const userRouter = Router();

userRouter.route('/')
    .get(getAllUsers)
    .post(createUser)
    .patch(updateUser)
    .delete(deleteUser);

export default userRouter;