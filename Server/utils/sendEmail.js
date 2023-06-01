import {createTransport} from "nodemailer"


export const SendEmail=async(to,subject,text)=>{
 
    var transporter = createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "cd772f9cc249d2",
          pass: "87e45c9ff8f2b5"
        }
      });


    await transporter.sendMail({
        to,subject,text,
    })
}