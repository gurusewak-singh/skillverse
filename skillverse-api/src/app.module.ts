import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { APP_PIPE } from '@nestjs/core';
import { UsersModule } from './users/users.module'; // <-- Import UsersModule
import { GraphQLModule } from '@nestjs/graphql'; // <-- Import GraphQLModule
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'; // <-- Import ApolloDriver
import { join } from 'path';
import { LedgerModule } from './ledger/ledger.module';

@Module({
  imports: [
    AuthModule,
    UsersModule, // <-- Add UsersModule here
    GraphQLModule.forRoot<ApolloDriverConfig>({
      // <-- Configure GraphQL
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: true, // Enables the GraphQL Playground IDE in browser
    }), LedgerModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
