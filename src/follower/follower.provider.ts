import { Follower } from "./entities/follower.entity";

export const FollowerProviders = [
  {
    provide: 'FOLLOWER_REPOSITORY',
    useValue: Follower,
  }
];
