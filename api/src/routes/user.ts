import { Router } from "express";

import { asyncHandlerWrapper, bodyDtoValidator } from "@/middlewares";
import { createUser, getUsers } from "@/services/users";

import { CreateUserDto } from "@/dtos/users";

const router = Router();

router.get("/", getUsers);
router.post("/", bodyDtoValidator(CreateUserDto), asyncHandlerWrapper(createUser));

export default router;
