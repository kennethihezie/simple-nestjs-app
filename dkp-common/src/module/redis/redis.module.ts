import { Module, DynamicModule } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-ioredis-yet';
import { RedisCacheOptions } from 'src/interface';
import { REDIS_CACHE_OPTIONS } from 'src/constants/redis-cache.constants';
import { RedisService } from './services';

@Module({})
export class RedisCacheModule {
    static register(options: RedisCacheOptions): DynamicModule {
        console.log("OPTIONS", options);
        return {
            module: RedisCacheModule,
            global: true,
            imports: [
                CacheModule.registerAsync({
                    useFactory: async () => ({                        
                        store: redisStore({
                            host: options.host,
                            port: options.port
                        })
                    })
                })
            ],
            providers: [
                {
                    provide: REDIS_CACHE_OPTIONS,
                    useValue: options,
                },
                RedisService
            ],
            exports: [RedisCacheModule, RedisService],
        };
    }
}