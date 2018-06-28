import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Operations } from './entity/operations.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Operations])],
  controllers: [],
  providers: [],
})
export class OperationsModule {}