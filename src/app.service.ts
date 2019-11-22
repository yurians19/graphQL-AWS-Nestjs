import { Injectable } from '@nestjs/common';
import {  S3, SES, SNS } from 'aws-sdk';

@Injectable()
export class AppService {
  private readonly snsClient: SNS;
  private readonly sesClient: SES;
  private readonly s3Client:  S3;
  private readonly bucket: string = 'dreamcode-cmk-98-bucket';

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
    var params = {Bucket: this.bucket, Key: key, Body: message};
    try {
      const res = await this.s3Client.upload(params).promise();
      return res.Key;
    } catch (error) {
      return error.toString();
    }
  }

  async getObjectS3(key:string): Promise<any> {
    let params = {
      Bucket: this.bucket, 
      Key: key,
    };
    try {
      const res = await this.s3Client.getObject(params).promise();
      return res.Body.toString();
    } catch (error) {
      return error.toString();
    }
  };

  async sendSMS(phoneNumber:string,message:string): Promise<any> {
    let params = {
      Message: message,
      PhoneNumber: phoneNumber,
  };
    try {
      const res = await this.snsClient.publish(params).promise();
      return res.MessageId;
    } catch (error) {
      return error.toString();
    }
  }

  async sendEmail(message:string,subject:string): Promise<any> {
    let params = {
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
        };
        try {
          const res = await this.sesClient.sendEmail(params).promise();
          return res.MessageId;
        } catch (error) {
          return error.toString();
        }
    }
}

    
    
