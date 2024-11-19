// import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { CacheTTL, Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { CacheKey } from '@nestjs/cache-manager';
// import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller()
// We can also use the @UseInterceptors() decorator to bind the interceptor to a specific controller:
// @UseInterceptors(CacheInterceptor)
export class AppController {
  constructor(private readonly appService: AppService) {}

  // To cache the response of a specific endpoint, you can use the @CacheTTL() decorator and @CacheKey() decorator:
  @CacheKey('hello_route')
  @CacheTTL(6000)
  @Get()
  async getHello() {
    return this.appService.getHello();
  }
}
