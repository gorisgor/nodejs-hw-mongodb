import { Router } from 'express';

import {
  signupController,
  signinController,
  refreshController,
  signoutController,
  resetEmailController,
} from '../controllers/auth.js';

import ctrlWrapper from '../utils/ctrlWrapper.js';
import validateBody from '../utils/validateBody.js';

import { userSignupSchema, userSigninSchema, sendResetEmailSchema } from '../validation/users.js';

const authRouter = Router();

authRouter.post(
  '/register',
  validateBody(userSignupSchema),
  ctrlWrapper(signupController),
);

authRouter.post(
  '/login',
  validateBody(userSigninSchema),
  ctrlWrapper(signinController),
);

authRouter.post('/refresh', ctrlWrapper(refreshController));

authRouter.post('/logout', ctrlWrapper(signoutController));

authRouter.post('/send-reset-email', validateBody(sendResetEmailSchema), ctrlWrapper(resetEmailController));

export default authRouter;
