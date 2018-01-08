import { ENV } from './../core/env.config';

interface AuthConfig {
  CLIENT_ID: string;
  CLIENT_DOMAIN: string;
  AUDIENCE: string;
  REDIRECT: string;
  SCOPE: string;
  NAMESPACE: string;
};

export const AUTH_CONFIG: AuthConfig = {
  CLIENT_ID: 'EYExN0PNdUxSxmNIMF9nv5qDr46JIjJk',
  CLIENT_DOMAIN: 'ranotes.auth0.com',
  AUDIENCE: 'http://localhost:8083/api/', 
  REDIRECT: `${ENV.BASE_URI}/callback`,
  SCOPE: 'openid profile',
  NAMESPACE: 'http://rannotes.com/roles'
};