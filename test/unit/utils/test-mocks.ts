import { Repository } from 'typeorm';

import { MockType } from './test-types';

export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(
  () => ({
    delete: jest.fn(() => true),
    find: jest.fn(entities => entities),
    findOne: jest.fn(entity => entity),
    save: jest.fn(entity => entity),
  }),
) as any;
