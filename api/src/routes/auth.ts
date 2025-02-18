import { Router } from "express";

import { loginUser } from "@/services/auth";
import { asyncHandlerWrapper, bodyDtoValidator } from "@/middlewares/";

import { LoginDto } from "@/dtos/users";

const router = Router();

router.post("/login", bodyDtoValidator(LoginDto), asyncHandlerWrapper(loginUser));

export default router;
