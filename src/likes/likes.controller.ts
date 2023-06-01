import {
  Controller,
  Param,
  ParseIntPipe,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { User } from 'src/auth/user.entity';
import { LikeService } from 'src/likes/likes.service';
// import { GetUser } from '../auth/get-user.decorator';

@Controller('movie')
@UseGuards(AccessTokenGuard)
export class LikesController {
  constructor(private readonly likeService: LikeService) {}

  // @Patch 데코레이터를 사용하여 updateLike 메서드를 PATCH 요청에 매핑
  @Patch('/:movieId/like')
  async updateLike(
    @Param('movieId', ParseIntPipe) movieId: number,
    @GetUser() user: User,
  ) {
    const userId = user.userId;

    return this.likeService.updateLike(movieId, userId);
  }
}
