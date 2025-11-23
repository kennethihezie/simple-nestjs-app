import { Inject, Injectable } from "@nestjs/common";
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';

@Injectable()
export class RedisService {
    constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {}

    async get(key: string): Promise<unknown> {
        return await this.cache.get(key)
    }

    async set(key: string, data: unknown, ttl?: number) {
        return await this.cache.set(key, data, ttl)
    }

    async del(key: string) {
        return await this.cache.del(key)
    }

    async clear() {
        return await this.cache.clear()
    }

    getCache(): Cache {
        return this.cache
    }
}