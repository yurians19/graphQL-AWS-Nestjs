
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
export abstract class IMutation {
    abstract uploadS3(key?: string, body?: string): string | Promise<string>;

    abstract sendSMS(phoneNumber?: string, message?: string): string | Promise<string>;

    abstract sendEmail(key?: string, body?: string): string | Promise<string>;
}

export abstract class IQuery {
    abstract getObjectS3(key?: string): string | Promise<string>;
}
