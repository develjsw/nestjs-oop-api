import { Injectable } from '@nestjs/common';
import { BoardStrategyInterface } from './interface/board-strategy.interface';

@Injectable()
export class GuestBoardStrategy implements BoardStrategyInterface {
    async createBoard(): Promise<void> {
        // TODO : 비회원 게시판 로직 실행
    }
}
