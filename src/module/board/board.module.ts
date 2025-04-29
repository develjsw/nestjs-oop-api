import { Module } from '@nestjs/common';
import { BoardController } from './board.controller';
import { BoardService } from './application/service/board.service';
import { MemberBoardStrategy } from './domain/strategy/member-board.strategy';
import { GuestBoardStrategy } from './domain/strategy/guest-board.strategy';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [AuthModule],
    controllers: [BoardController],
    providers: [BoardService, MemberBoardStrategy, GuestBoardStrategy],
    exports: []
})
export class BoardModule {}
