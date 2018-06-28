import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

import { UsersModule } from './users/users.module';
import { HospitalsModule } from './hospitals/hospitals.module';
import { OperationsModule } from './operations/operations.module';
import { RolesModule } from './roles/roles.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TypeOrmModule.forRoot(), UsersModule, RolesModule, HospitalsModule, OperationsModule, AuthModule],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
