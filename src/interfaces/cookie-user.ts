import User from '@app/entities/user.entity';

export default interface CookieUser {
  cookie: string;
  user: User;
}