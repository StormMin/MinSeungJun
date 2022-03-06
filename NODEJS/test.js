const nodemailer = require("nodemailer");
const email = {
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "47d4e0cdacc6c8",
    pass: "9d8d49d7884ed4",
  },
};
const send = async (option) => {
  nodemailer.createTransport(email).sendMail(option, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log(info);
      return info.response;
    }
  });
};

let data = {
  from: "minsj47@gmail.com",
  to: "minsj47@gmail.com",
  subject: "테스트메일입니다",
  text: "node js 처음시작",
};

send(data);
