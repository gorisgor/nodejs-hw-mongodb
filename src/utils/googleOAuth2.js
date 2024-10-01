import { OAuth2Client } from "google-auth-library";
import * as path from 'node:path';
import { readFile } from 'fs/promises';

import {env} from './env.js';

const clientId = env("GOOGLE_OAUTH_CLIENT_ID");
const clientSecret = env('GOOGLE_OAUTH_CLIENT_SECRET');

const oAuthConfigPath = path.resolve("googleOAuth.json");

const oAuthConfig = JSON.parse(await readFile(oAuthConfigPath));

const redirectUri = oAuthConfig.web.redirect_uris[0];

const googleOAuthClient = new OAuth2Client({
    clientId,
    clientSecret,
    redirectUri,
});

export const validateCode = async code => {
    const response = await googleOAuthClient.getToken(code);
    if(!response.tokens.id_token) {
        throw createHttpError(401);
    }
    const ticket = await googleOAuthClient.verifyIdToken({
        idToken: response.tokens.id_token
    });

    return ticket;
};

export const generateGoogleOAuthUrl = ()=> {
    const url = googleOAuthClient.generateAuthUrl({
        scope: [
            "https://www.googleapis.com/auth/userinfo.email",
            "https://www.googleapis.com/auth/userinfo.profile",
        ]
    });

    return url;
};