import { Router } from "express";

import { loginUser } from "@/services/auth";
import { bodyDtoValidator } from "@/middlewares/validator";
import { asyncHandlerWrapper } from "@/middlewares/async-handler";

import { LoginDto } from "@/dtos/users";

const router = Router();

router.post("/login", bodyDtoValidator(LoginDto), asyncHandlerWrapper(loginUser));

export default router;
