import { User } from './entities/UserEntity';

export const UserProviders = [
  {
    provide: 'USER_REPOSITORY',
    useValue: User,
  }
];
