export default class Token {
  constructor(token?: string) {
    if (token) {
      this.accessToken = token;
    }
  }
  public accessToken: string;
}
