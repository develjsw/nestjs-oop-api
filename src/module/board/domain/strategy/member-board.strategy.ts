import { Injectable } from '@nestjs/common';
import { BoardStrategyInterface } from './interface/board-strategy.interface';

@Injectable()
export class MemberBoardStrategy implements BoardStrategyInterface {
    async createBoard(): Promise<void> {
        console.log('회원 게시판 로직 실행');
    }
}
