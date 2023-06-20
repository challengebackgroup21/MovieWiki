import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { GetCurrentUser } from 'src/auth/common/decorators';
import { AccessTokenGuard } from 'src/auth/guards';
import { UpdateMovieDto } from './dto/update-movie-dto';
import { Movie } from './movie.entity';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private moviesService: MoviesService) {}

  // 영화 검색
  @Get('search')
  search(@Query('option') option: string, @Query('query') query: string) {
    return this.moviesService.search(option, query);
  }

  // 인기 영화 리스트 조회
  @Get('/like')
  getLikedMovieList(@Query('cnt', ParseIntPipe) likedListLength: number) {
    return this.moviesService.getLikedMovieList(likedListLength);
  }

  // 영화 상세 정보 조회
  @Get('/:movieId')
  getMovieById(@Param('movieId', ParseIntPipe) movieId: number): Promise<any> {
    return this.moviesService.getMovieById(movieId);
  }

  // 영화 상세 정보 수정
  @Patch('/:movieId')
  @UseGuards(AccessTokenGuard)
  updateMovieData(
    @Param('movieId', ParseIntPipe) movieId: number,
    @Body() updateMovieDto: UpdateMovieDto,
    @GetCurrentUser() user: any,
  ): Promise<any> {
    return this.moviesService.updateMovieData(
      movieId,
      updateMovieDto,
      user.auth,
    );
  }
}
