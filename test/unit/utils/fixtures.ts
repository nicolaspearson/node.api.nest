import CreateHeroDto from '@app/dto/hero.create.dto';
import UpdateHeroDto from '@app/dto/hero.update.dto';
import LoginUserDto from '@app/dto/user.login.dto';
import RegisterUserDto from '@app/dto/user.register.dto';
import Hero from '@app/entities/hero.entity';
import User from '@app/entities/user.entity';
import CookieUser from '@app/interfaces/cookie-user';

export const user: User = {
  id: 1,
  firstName: 'Peter',
  lastName: 'Piper',
  emailAddress: 'peter.piper@test.com',
  password: 'super-secret',
  enabled: true,
  createdAt: new Date('2019-01-01 00:00:00'),
  updatedAt: new Date('2019-01-01 00:00:00'),
  deletedAt: undefined,
};

export const cookieUser: CookieUser = {
  user,
  cookie: 'COOKIE',
  token: { accessToken: 'fakeAccessToken' },
};

export const registeredUser: User = {
  id: 2,
  firstName: 'John',
  lastName: 'Doe',
  emailAddress: 'john.doe@test.com',
  password: 'secret',
  enabled: true,
};

export const registerUserDto: RegisterUserDto = {
  firstName: 'John',
  lastName: 'Doe',
  emailAddress: 'john.doe@test.com',
  password: 'secret',
};

export const loggedInUser: User = {
  id: 3,
  firstName: 'Jane',
  lastName: 'Doe',
  emailAddress: 'john.doe@test.com',
  password: '$2b$10$jnsjA8THPbsfwOx3ka8K8O/1EML8Dm9RMDPLCFmUCV20PUrHbpkva',
  enabled: true,
};

export const loginUserDto: LoginUserDto = {
  emailAddress: 'jane.doe@test.com',
  password: 'secret',
};

export const heroOne: Hero = {
  id: 1,
  name: 'Iron Man',
  identity: 'Tony Stark',
  hometown: 'New York',
  age: 35,
  createdAt: new Date('2019-01-01 00:00:00'),
  updatedAt: new Date('2019-01-01 00:00:00'),
  deletedAt: undefined,
};

export const heroTwo: Hero = {
  id: 2,
  name: 'Hulk',
  identity: 'Bruce Banner',
  hometown: 'Chicago',
  age: 41,
  createdAt: new Date('2019-01-01 00:00:00'),
  updatedAt: new Date('2019-01-01 00:00:00'),
  deletedAt: undefined,
};

export const createHeroDto: CreateHeroDto = {
  name: 'Thor',
  identity: 'Unknown',
  hometown: 'Asgard',
  age: 240,
};

export const updateHeroDto: UpdateHeroDto = {
  id: 2,
  name: 'Hulk',
  identity: 'Bruce Banner',
  hometown: 'Chicago',
  age: 41,
};
