import { Module, OnModuleInit } from '@nestjs/common';
import { DiscoveryModule, DiscoveryService, MetadataScanner, Reflector } from '@nestjs/core';
import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper';

@Module({
    imports: [DiscoveryModule],
    providers: [],
    exports: []
})
export class DiscoveryClientModule implements OnModuleInit {
    constructor(
        private readonly metadataScanner: MetadataScanner,
        private readonly discoveryService: DiscoveryService,
        private readonly reflector: Reflector
    ) {}

    onModuleInit(): any {
        this.viewRegisteredAllInstance();
    }

    private viewRegisteredAllInstance(): void {
        const instanceWrappers: InstanceWrapper[] = [
            ...this.discoveryService.getControllers(),
            ...this.discoveryService.getProviders()
        ]
            .filter((instanceWrapper: InstanceWrapper): boolean => instanceWrapper.isDependencyTreeStatic())
            .filter(({ instance }: InstanceWrapper) => instance && Object.getPrototypeOf(instance));

        instanceWrappers.forEach(({ instance }: InstanceWrapper): void => {
            const prototype = Object.getPrototypeOf(instance);
            const methodNames: string[] = this.metadataScanner.getAllMethodNames(prototype); // controller, provider에 선언된 method list

            console.log(methodNames);

            // methodNames.forEach((methodName: string) => {
            //     const method = prototype[methodName];
            //     console.log(method);
            //
            //     const metaData = Reflect.getMetadata('메타 데이터 키', method);
            //     console.log(metaData);
            // });
        });
    }
}
