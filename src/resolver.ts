import { Resolver, Query, Args, Mutation } from "@nestjs/graphql";
import { AppService } from './app.service';

@Resolver()
export default class appResolver {
    constructor(
        private readonly appService: AppService,
    ){}

    @Query('getObjectS3')
    async getObjectS3(@Args('key') key:string): Promise<any> {
        return this.appService.getObjectS3(key)
    }

    @Mutation('uploadS3')
    async uploadS3(@Args('key') key:string, @Args('body') body:string): Promise<any> {
        return this.appService.uploadS3(key,body)
    }

    @Mutation('sendSMS')
    async sendSMS(@Args('phoneNumber') key:string, @Args('message') body:string): Promise<any> {
        return this.appService.sendSMS(key,body)
    }

    @Mutation('sendEmail')
    async sendEmail(@Args('key') key:string, @Args('body') body:string): Promise<any> {
        return this.appService.sendEmail(key,body)
    }
}