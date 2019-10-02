export default interface TokenPayload {
  id: number;
  email: string;
  iat?: number;
  exp?: number;
}
