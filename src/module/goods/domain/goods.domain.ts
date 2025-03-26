// TypeORM → Prisma ORM 변경과 같은 상황에서 Entity에 의존 시킬 수 없기 때문에 Domain 객체 생성
export class GoodsDomain {
    constructor(
        public readonly goodsId: number,
        public name: string,
        public price: number,
        public readonly createAt: Date,
        public updateAt?: Date
    ) {}
}
