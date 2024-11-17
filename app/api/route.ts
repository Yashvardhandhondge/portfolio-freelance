import type { NextApiRequest, NextApiResponse } from 'next'
import nodemailer from 'nodemailer';

interface FormData{
    name: string,
    email: string,
    message: string
}
console.log(process.env.EMAIL_USER);
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
){
    if(req.method === 'POST'){
        const {name,email,message}: FormData = req.body;
        const transporter = nodemailer.createTransport({
            service:"Gmail",
            auth:{
                user: process.env.EMAIL_USER,  
                pass: process.env.EMAIL_PASS, 
            }
        });
        const mailOptions ={
            from:email,
            to: 'yashvardhandhondge@gmail.com',
            subject: `Message from ${name}`,
            text: `You have a new message:\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        };

        try{
            await transporter.sendMail(mailOptions);
            res.status(200).json({message: 'Email sent successfully'});
        }catch(err){
            res.status(500).json({message: 'Error sending email'});
        }
    }else{
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}