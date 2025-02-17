import { Router } from "express";

import { getUsers, createUser } from "@/services/users";
import { bodyDtoValidator } from "@/utils/validator";
import { asyncHandlerWrapper } from "@/utils/async-handler";

import { CreateUserDto } from "@/dtos/users";

const router = Router();

router.get("/", getUsers);
router.post("/", bodyDtoValidator(CreateUserDto), asyncHandlerWrapper(createUser));

export default router;
