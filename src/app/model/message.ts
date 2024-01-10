export interface Message {
  show: boolean;
  text: string;
  severity: Severity;
}

//REM analogous of MUI Alert message types - can not be changed
export enum Severity {
  error = 'error',
  warning = 'warning',
  info = 'info',
  success = 'success',
}
