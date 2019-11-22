import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql'
import appResolver from './resolver';

@Module({
  imports: [GraphQLModule.forRoot({
    typePaths: ['./**/*.gql'],
      definitions: {
        path: './src/schema.ts',
        outputAs: 'class',
      },
      playground: true,
  })],
  providers: [AppService,appResolver],
})
export class AppModule {}
