import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class AppService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async getHello() {
    // await this.cacheManager.set('key', 'value', 5000);
    // await this.cacheManager.set('key_del', 'deleted');
    const isCached = await this.cacheManager.get('cached_item');
    console.log(`From cache ${isCached}`);
    // Note: the ttl is optional, defaults to the `ttl` property in the config, or 0 if no ttl is specified.
    // The ttl is in milliseconds, so 1000 = 1 second
    // It seems that the ttl is not working!!! But the `ttl` property in the config is working fine.
    await this.cacheManager.set('cached_item', { key: 32 }, 10000);

    // await this.cacheManager.del('key_del');
    // await this.cacheManager.reset();

    // const value = await this.cacheManager.get('key');
    // console.log(value);
    const cachedItem = await this.cacheManager.get('cached_item');
    console.log(cachedItem);

    return 'Hello World!';
  }
}
