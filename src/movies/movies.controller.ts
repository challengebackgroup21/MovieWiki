import { Controller } from '@nestjs/common';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private moviesService: MoviesService) {}

  //   @Post('/:movieId/record')
  //   createMovieRecord(
  //     @Body() createMovieRecordDto: CreateMovieRecordDto,
  //     @Param('movieId') movieId: number,
  //   ) {
  //     return this.moviesService.createMovieRecord(createMovieRecordDto, movieId);
  //   }
}