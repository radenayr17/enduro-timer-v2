import { Router } from "express";

import { loginUser } from "@/services/users";
import { bodyDtoValidator } from "@/utils/validator";
import { asyncHandlerWrapper } from "@/utils/async-handler";

import { LoginDto } from "@/dtos/users";

const router = Router();

router.post("/login", bodyDtoValidator(LoginDto), asyncHandlerWrapper(loginUser));

export default router;
