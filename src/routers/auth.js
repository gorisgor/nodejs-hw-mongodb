import { Router } from 'express';

import {
  signupController,
  signinController,
  refreshController,
  signoutController,
  resetEmailController,
  resetPasswordController,
  getGoogleOAuthUrlController
} from '../controllers/auth.js';

import ctrlWrapper from '../utils/ctrlWrapper.js';
import validateBody from '../utils/validateBody.js';

import {
  userSignupSchema,
  userSigninSchema,
  sendResetEmailSchema,
  resetPasswordSchema,
  userLoginWithGoogleOAuthSchema,
} from '../validation/users.js';

const authRouter = Router();

authRouter.post(
  '/register',
  validateBody(userSignupSchema),
  ctrlWrapper(signupController),
);

authRouter.get('/get-oauth-url', ctrlWrapper(getGoogleOAuthUrlController));

authRouter.post("/confirm-google", validateBody(userLoginWithGoogleOAuthSchema), ctrlWrapper(loginWithGoogleOAuthController));

authRouter.post(
  '/login',
  validateBody(userSigninSchema),
  ctrlWrapper(signinController),
);

authRouter.post('/refresh', ctrlWrapper(refreshController));

authRouter.post('/logout', ctrlWrapper(signoutController));

authRouter.post(
  '/send-reset-email',
  validateBody(sendResetEmailSchema),
  ctrlWrapper(resetEmailController),
);

authRouter.post(
  '/reset-pwd',
  validateBody(resetPasswordSchema),
  ctrlWrapper(resetPasswordController),
);

export default authRouter;
