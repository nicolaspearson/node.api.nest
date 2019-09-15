import { Repository } from 'typeorm';

import { MockType } from './test-types';

export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(
  () => ({
    find: jest.fn(entities => entities),
  }),
) as any;
