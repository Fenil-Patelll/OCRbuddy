const AWS = require('aws-sdk');
const sns = new AWS.SNS();

exports.handler = async (event, context) => {
  try {
    const body = JSON.parse(event.body)
    const { email, pdfUrl } = body

    // Check if the SNS topic for the user's email already exists
    const emailPart = email.split('@');
    const topicName = `pdf_notification_${emailPart[0]}`;
    const topics = await sns.listTopics().promise();
    const existingTopic = topics.Topics.find((topic) => topic.TopicArn.includes(topicName));

    let topicArn;
    if (existingTopic) {
      // Use the existing topic if it already exists
      topicArn = existingTopic.TopicArn;
    } else {
      // Create a new topic if it doesn't exist
      const createTopicResult = await sns.createTopic({ Name: topicName }).promise();
      topicArn = createTopicResult.TopicArn;
    }

    // Subscribe the user's email to the topic if not already subscribed
    const protocol = 'email';
    const endpoint = email;

    // Publishing the PDF URL to the SNS topic
    const subject = 'Generated PDF URL';
    const message = `Here is the link to your generated PDF: ${pdfUrl}`;

    const publishParams = {
      TopicArn: topicArn,
      Subject: subject,
      Message: message,
    };

    async function checkSubscriptionStatus(topicArn, email) {
      try {
        const listSubscriptionsParams = {
          TopicArn: topicArn,
        };

        const subscriptions = await sns.listSubscriptionsByTopic(listSubscriptionsParams).promise();

        const subscribed = subscriptions.Subscriptions.some((subscription) => {
          return subscription.Endpoint === email;
        });

        return subscribed;
      } catch (error) {
        console.error('Error checking subscription status:', error);
        throw error;
      }
    }

    const subscribed = await checkSubscriptionStatus(topicArn, email);

    if (subscribed) {
      await sns.publish(publishParams).promise();
      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
          'Access-Control-Allow-Methods': 'OPTIONS,POST',
          'Content-Type':'application/json'
        },
        body: JSON.stringify({ success: true, message: 'Email notification sent successfully!' }),
      };
    } else {
      const subscribeResponse = await sns.subscribe({
        Protocol: protocol,
        TopicArn: topicArn,
        Endpoint: endpoint,
      }).promise();

      if (!subscribeResponse.SubscriptionArn) {
        return {
          statusCode: 200,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
            'Access-Control-Allow-Methods': 'OPTIONS,POST',
            'Content-Type':'application/json'
          },
          body: JSON.stringify({ success: false, message: 'Please Check your MailBox and confirm the email subscription, and Press Send Email' }),
        };
      }
      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
          'Access-Control-Allow-Methods': 'OPTIONS,POST',
          'Content-Type':'application/json'
        },
        body: JSON.stringify({ success: false, message: 'Please Check your MailBox and confirm the email subscription, and Press Send Email' }),
      };
    }
  } catch (error) {
    console.error('Error sending email notification:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
        'Access-Control-Allow-Methods': 'OPTIONS,POST',
        'Content-Type':'application/json'
      },
      body: JSON.stringify({ success: false, message: 'Error sending email notification' }),
    };
  }
};
