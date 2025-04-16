import { IsNotEmpty, IsString } from 'class-validator';
import { BoardTypeEnum } from '../enum/board-type.enum';

export class CreateBoardDto {
    @IsNotEmpty()
    @IsString()
    boardType: BoardTypeEnum;

    @IsNotEmpty()
    @IsString()
    boardName: string;
}
