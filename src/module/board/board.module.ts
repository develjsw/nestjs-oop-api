import { Module } from '@nestjs/common';
import { BoardController } from './board.controller';
import { BoardService } from './application/service/board.service';
import { MemberBoardStrategy } from './domain/strategy/member-board.strategy';
import { GuestBoardStrategy } from './domain/strategy/guest-board.strategy';

@Module({
    imports: [],
    controllers: [BoardController],
    providers: [BoardService, MemberBoardStrategy, GuestBoardStrategy],
    exports: []
})
export class BoardModule {}
