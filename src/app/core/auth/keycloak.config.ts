import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
  createInterceptorCondition,
  IncludeBearerTokenCondition,
  INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG,
  includeBearerTokenInterceptor,
  provideKeycloak
} from 'keycloak-angular';

import { environment } from '../../../environments/environment';

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const apiUrlPattern = environment.apiUrl
  ? new RegExp(`^${escapeRegExp(environment.apiUrl)}(?:/.*)?$`, 'i')
  : /a^/;

const apiCondition =
  createInterceptorCondition<IncludeBearerTokenCondition>({
    urlPattern: apiUrlPattern,
    bearerPrefix: 'Bearer'
  });

export const keycloakProviders = [
  provideKeycloak({
    config: {
      url: environment.keycloakUrl,
      realm: 'inventory',
      clientId: 'angular-client'
    },
    initOptions: {
      onLoad: 'login-required',
      flow: 'standard',
      silentCheckSsoRedirectUri:
        `${window.location.origin}/assets/silent-check-sso.html`
    },
    providers: [
      {
        provide: INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG,
        useValue: [apiCondition]
      }
    ]
  }),
  provideHttpClient(
    withInterceptors([includeBearerTokenInterceptor])
  )
];
