import { Injectable } from "@nestjs/common";
import {ConfigService} from '@nestjs/config';
import {Transporter, createTransport} from 'nodemailer';

@Injectable()
export class EmailService {
    private transporter: Transporter;
    constructor(private configService: ConfigService){
        this.transporter = createTransport({
            host: "smtp.gmail.com",
            port: 465,
            auth: {
                user: "macanhhao0347683890@gmail.com",
                pass: "xhfe diig olbk hvez"
            }
        })
    }

    async sendEmail(to: string, subject: string, text: string, html?: string): Promise<any> {
        try {
            const optionEmail = {
                from: "macanhhao0347683890@gmail.com",
                to,
                subject,
                text,
                html
            }
            return await this.transporter.sendMail(optionEmail);
        } catch (error) {
            throw new Error(error.message);
        }
    }

}