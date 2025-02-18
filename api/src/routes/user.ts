import { RequestHandler, Router } from "express";

import { getUsers, createUser } from "@/services/users";
import { bodyDtoValidator } from "@/middlewares/validator";
import { asyncHandlerWrapper } from "@/middlewares/async-handler";

import { CreateUserDto } from "@/dtos/users";
import { verifyUserToken } from "@/middlewares/verify-user-token";

const router = Router();

router.get("/", getUsers);
router.post("/", bodyDtoValidator(CreateUserDto), asyncHandlerWrapper(createUser));

export default router;
