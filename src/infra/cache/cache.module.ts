import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { redisConfig } from '../config/redis.config';
import { RedisProvider } from './provider/redis.provider';
import { CacheService } from './service/cache.service';
import { HashCacheService } from './service/hash-cache.service';
import { ListCacheService } from './service/list-cache.service';
import { SetCacheService } from './service/set-cache.service';

@Module({
    imports: [ConfigModule.forFeature(redisConfig)],
    providers: [
        RedisProvider,
        /*
           [ 인터페이스 기반 의존성 주입 ]
           - 모듈 간 의존성 최소화를 위해 구체적인 클래스(CacheService)를 직접 주입받지 않고, 인터페이스(CacheServiceInterface)를 통해 주입받음
           - TypeScript는 인터페이스가 런타임에 존재하지 않기 때문에, `provide`와 `useClass`를 이용해 의존성을 주입해야 함
           - 예를 들어, `ICacheService`를 주입받아야 하는 서비스가 있으면, 아래처럼 실제 구현체(CacheService)와 연결해줌
           - 이후 `@Inject('ICacheService')`를 사용해 주입 가능

           - 사용 예시 -
           constructor(@Inject('ICacheService') private readonly cacheService: ICacheService) {}
       */
        { provide: 'ICacheService', useClass: CacheService },
        { provide: 'IHashCacheService', useClass: HashCacheService },
        { provide: 'IListCacheService', useClass: ListCacheService },
        { provide: 'ISetCacheService', useClass: SetCacheService }
    ],
    exports: ['ICacheService', 'IHashCacheService', 'IListCacheService', 'ISetCacheService']
})
export class CacheModule {}
