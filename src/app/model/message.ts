export interface Message {
  text: string;
  severity: Severity;
}

//REM analogous of MUI Alert message types
export enum Severity {
  error = "error",
  warning = "warning",
  info = "info",
  success = "success",
}
