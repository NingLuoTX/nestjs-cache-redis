import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import { mock } from 'node:test';

const mockCacheManager = {
  get: jest.fn(),
  set: jest.fn(),
  del: jest.fn(),
  reset: jest.fn(),
};

describe('AppService', () => {
  let appService: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [],
      providers: [
        AppService,
        { provide: 'CACHE_MANAGER', useValue: mockCacheManager },
      ],
    }).compile();

    appService = module.get<AppService>(AppService);
  });

  it('should be defined', () => {
    expect(appService).toBeDefined();
  });

  it('should return "Hello World!"', async () => {
    const result = 'Hello World!';
    jest.spyOn(appService, 'getHello').mockImplementation(async () => result);
    expect(await appService.getHello()).toBe(result);
  });
});
