import AWS from 'aws-sdk';

const ses = new AWS.SES({region: 'ap-south-1'});

async function sendMail(event, context) {
  const record = event.Records[0];
  console.log("record: " + record);

  const email = JSON.parse(record.body);
  const { subject, body, recipient } = email;

  const params = {
    Source: "satyakiroy001@gmail.com",
    Destination: {
      ToAddresses: [
        recipient
      ]
    },
    Message: {
      Body: {
        Text: {
          Data: body
        }
      },
      Subject: {
        Data: subject
      }
    }
  };

  try {
    const result = await ses.sendEmail(params).promise();
    console.log(result);
    return result;
  } catch (e) {
    console.log(e);
  }
}

export const handler = sendMail;


