import { BadRequestException, Injectable } from '@nestjs/common';
import { MemberBoardStrategy } from '../../domain/strategy/member-board.strategy';
import { GuestBoardStrategy } from '../../domain/strategy/guest-board.strategy';
import { BoardStrategyInterface } from '../../domain/strategy/interface/board-strategy.interface';

@Injectable()
export class BoardService {
    constructor(
        private readonly memberBoardStrategy: MemberBoardStrategy,
        private readonly guestBoardStrategy: GuestBoardStrategy
    ) {}

    async createBoard(boardType: string, memberId: number): Promise<void> {
        let strategy: BoardStrategyInterface;

        if (boardType === 'memberBoard') {
            strategy = this.memberBoardStrategy;
        } else if (boardType === 'guestBoard') {
            strategy = this.guestBoardStrategy;
        } else {
            throw new BadRequestException(`지원하지 않는 boardType: ${boardType}`);
        }

        await strategy.createBoard();
    }
}
