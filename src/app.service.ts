import { Injectable } from '@nestjs/common';
import {  S3, SES, SNS } from 'aws-sdk';

@Injectable()
export class AppService {
  private readonly snsClient: SNS;
  private readonly sesClient: SES;
  private readonly s3Client:  S3;

  constructor() {
    const config: object = {
      region: 'us-east-1',
      accessKeyId: 'AKIAYHBRIW66LSCJCVTA',
      secretAccessKey: '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',
    }

    this.snsClient = new SNS(config);
    this.sesClient = new SES(config);
    this.s3Client = new S3(config);
  }

  async uploadS3(key:string,message:string): Promise<any> {
    var params = {Bucket: 'bucket', Key: key, Body: message};
    try {
      await this.s3Client.upload(params);
      return 'successful';
    } catch (error) {
      return 'error';
    }
  }

  async getObjectS3(key:string): Promise<any> {
    var params = {
      Bucket: 'bucket', 
      Key: key,
    };
    try {
      await this.s3Client.getObject(params);
      return 'successful';
    } catch (error) {
      return 'error';
    }
  };

  sendSMS(phoneNumber:string,message:string): void {
    this.snsClient.publish({
        Message: message,
        PhoneNumber: phoneNumber,
    }, function(err, data) {
        if (err) {
          return console.log(err);
        }
        return console.log(data);
    });
  }

  sendEmail(message:string,subject:string): void {
    this.sesClient.sendEmail({
        Source: 'albert@dreamcode.io',
        Destination: {
            ToAddresses: [
                'albertwilliams.xyz@gmail.com',
                'albertjwilliams.xyz@gmail.com',
            ]
        },
        Message: {
            Body: {
                Html: {
                    Data: message,
                }
            },
            Subject: {
                Data: subject,
            },
        }
    }, function(err, data) {
        if (err) {
            return console.log(err, err.stack);
        }
        return console.log(data);
    });
  }
}

    
    
