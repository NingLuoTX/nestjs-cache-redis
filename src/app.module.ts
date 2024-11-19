import { Module } from '@nestjs/common';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
// import type { RedisClientOptions } from 'redis';
// import * as redisStore from 'cache-manager-redis-store';
import { redisStore } from 'cache-manager-redis-store';

// By default, the cache module uses the memory store.
// The default expiration time of the cache is 5 seconds.

@Module({
  // imports: [CacheModule.register({ ttl: 36000, isGlobal: true })],
  imports: [
    CacheModule.register({
      // This is work around for the issue: https://github.com/dabroek/node-cache-manager-redis-store/issues/40
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      store: async () =>
        await redisStore({
          // Store-specific configuration:
          socket: {
            host: 'localhost',
            port: 6379,
          },
        }),
      ttl: 36000,
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  // providers: [AppService],
  // To reduce the amount of required boilerplate, you can bind CacheInterceptor to all endpoints globally:
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}

// If you want to use a different store, you can pass the store configuration to the register() method.
// The following example shows how to use the redis store:
// import { Module } from '@nestjs/common';
// import { CacheModule } from '@nestjs/cache';
// import * as redisStore from 'cache-manager-redis-store';

// @Module({
//   imports: [
//     CacheModule.register({
//       store: redisStore,
//       host: 'localhost',
//       port: 6379,
//     }),
//   ],
// })
// export class AppModule {}

// The following example shows how to use the memory store:
// import { Module } from '@nestjs/common';
// import { CacheModule } from '@nestjs/cache';

// @Module({
//   imports: [CacheModule.register()],
// })
// export class AppModule {}
// The following example shows how to use the memory store with a custom configuration:
// import { Module } from '@nestjs/common';
// import { CacheModule } from '@nestjs/cache';

// @Module({
//   imports: [
//     CacheModule.register({
//       ttl: 5, // seconds
//       max: 10, // maximum number of items in cache
//     }),
//   ],
// })
// export class AppModule {}

// The following example shows how to use the memory store with a global scope:
// import { Module } from '@nestjs/common';
// import { CacheModule } from '@nestjs/cache';

// @Module({
//   imports: [
//     CacheModule.register({
//       ttl: 5, // seconds
//       max: 10, // maximum number of items in cache
//       isGlobal: true,
//     }),
//   ],
// })
// export class AppModule {}

// The following example shows how to use the memory store with a custom scope:
// import { Module } from '@nestjs/common';
// import { CacheModule } from '@nestjs/cache';

// @Module({
//   imports: [
//     CacheModule.register({
//       ttl: 5, // seconds
//       max: 10, // maximum number of items in cache
//       scope: CacheModule,
//     }),
//   ],
// })
// export class AppModule {}

// The following example shows how to use the memory store with a custom scope and a global scope:
// import { Module } from '@nestjs/common';
// import { CacheModule } from '@nestjs/cache';

// @Module({
//   imports: [
//     CacheModule.register({
//       ttl: 5, // seconds
//       max: 10, // maximum number of items in cache
//       scope: CacheModule,
//       isGlobal: true,
//     }),
//   ],
// })
// export class AppModule {}

// The following example shows how to use the memory store with a custom scope and a global scope:
// import { Module } from '@nestjs/common';

// @Module({
//   imports: [
//     CacheModule.registerAsync({
//       useFactory: () => ({
//         ttl: 5, // seconds
//         max: 10, // maximum number of items in cache
//       }),
//     }),
//   ],
// })
// export class AppModule {}

// The following example shows how to use the memory store with a custom scope and a global scope:
// import { Module } from '@nestjs/common';

// @Module({
//   imports: [
//     CacheModule.registerAsync({
//       imports: [ConfigModule],
//       useFactory: async (configService: ConfigService) => ({
//         ttl: configService.get('CACHE_TTL'),
//       }),
//       inject: [ConfigService],
//     }),
//   ],
// })
// export class AppModule {}

// The following example shows how to use the memory store with a custom scope and a global scope:
// import { Module } from '@nestjs/common';

// @Module({
//   imports: [
//     CacheModule.registerAsync({
//       imports: [ConfigModule],
//       useFactory: async (configService: ConfigService) => ({
//         ttl: configService.get('CACHE_TTL'),
//         max: configService.get('CACHE_MAX'),
//       }),
//       inject: [ConfigService],
//     }),
//   ],
// })
// export class AppModule {}

// The following example shows how to use the memory store with a custom scope and a global scope:
// import { Module } from '@nestjs/common';

// @Module({
//   imports: [
//     CacheModule.registerAsync({
//       imports: [ConfigModule],
//       useFactory: async (configService: ConfigService) => ({
//         ttl: configService.get('CACHE_TTL'),
//         max: configService.get('CACHE_MAX'),
//         store: redisStore,
//         host: 'localhost',
//         port: 6379,
//       }),
//       inject: [ConfigService],
//     }),
//   ],
// })
// export class AppModule {}

// The following example shows how to use the memory store with a custom scope and a global scope:
// import { Module } from '@nestjs/common';

// @Module({
//   imports: [
//     CacheModule.registerAsync({
//       imports: [ConfigModule],
//       useFactory: async (configService: ConfigService) => ({
//         ttl: configService.get('CACHE_TTL'),
//         max: configService.get('CACHE_MAX'),
//         store: redisStore,
//         host: 'localhost',
//         port: 6379,
//         scope: 'global',
//       }),
//       inject: [ConfigService],
//     }),
//   ],
// })
// export class AppModule {}
