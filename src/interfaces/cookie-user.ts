import User from '@app/entities/user.entity';
import Token from '@app/interfaces/token';

export default interface CookieUser {
  cookie: string;
  token: Token;
  user: User;
}
