export interface AuthConnect {
  email: string;
  pwd: string;
}

export interface AuthUserSettingsChange extends AuthConnect {
  pwdOld: string;
  displayName: string;
}
