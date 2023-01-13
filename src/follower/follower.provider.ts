import { Follower } from "./entities/follower.entity";

export const FollowerProviders = [
  {
    provide: 'FOLLOWERS_REPOSITORY',
    useValue: Follower,
  }
];
