import { prisma } from "main-db";
import redis from "redis";
import sendgrid from "@sendgrid/mail";
import Queue from "bull";
import { configDotenv } from "dotenv";

configDotenv();
sendgrid.setApiKey(process.env.SENDGRID_API_KEY!);

const client = redis.createClient();
const streamName = "email_reminder_notifications";
const groupName = "reminder_service_group";
const consumerName = "reminder_consumer_1";

const reminderQueue = new Queue("reminder_queue", {
  redis: { host: "localhost", port: 6379 },
});

async function createConsumerGroup() {
  try {
    await client.connect();
    await client.xGroupCreate(streamName, groupName, "0", { MKSTREAM: true });
    console.log(`Consumer group '${groupName}' created.`);
  } catch (error) {
    if (error instanceof Error && error.message.includes("BUSYGROUP")) {
      console.log(`Consumer group '${groupName}' already exists.`);
    } else {
      console.error("Error creating consumer group:", error);
    }
  }
}

async function processMessages() {
  while (true) {
    try {
      const response = await client.xReadGroup(
        groupName,
        consumerName,
        [{ key: streamName, id: ">" }],
        { COUNT: 10, BLOCK: 5000 }
      );

      if (!response) continue;

      for (const stream of response) {
        for (const message of stream.messages) {
          const id = message.id;
          const { reminderId, scheduledAt, contactMethod } = message.message;

          try {
            const reminder = await prisma.reminder.findUnique({
              where: { id: reminderId },
              include: { user: true },
            });

            if (!reminder) {
              console.error(`Reminder not found: ${reminderId}`);
              continue;
            }

            const scheduledTime = new Date(scheduledAt).getTime();
            const currentTime = Date.now();
            const delay = scheduledTime - currentTime;

            if (delay > 0) {
              console.log(
                `Reminder ${reminderId} is scheduled for later. Adding to Bull queue with delay: ${delay}ms`
              );

              await reminderQueue.add(
                "sendReminder",
                { reminderId, contactMethod },
                { delay }
              );
            } else {
              await sendReminder(reminder, contactMethod);
            }

            await client.xAck(streamName, groupName, id);
          } catch (error) {
            console.error(`Error processing reminder ${reminderId}:`, error);
          }
        }
      }
    } catch (error) {
      console.error("Error processing messages:", error);
    }
  }
}

reminderQueue.process("sendReminder", async (job) => {
  const { reminderId, contactMethod } = job.data;
  const reminder = await prisma.reminder.findUnique({
    where: { id: reminderId },
    include: { user: true },
  });

  if (!reminder) {
    console.error(`Reminder not found: ${reminderId}`);
    return;
  }

  console.log(`Processing delayed reminder ${reminderId} via ${contactMethod}`);
  await sendReminder(reminder, contactMethod);
});

async function sendReminder(reminder: any, contactMethod: string) {
  switch (contactMethod) {
    case "email":
      await sendEmail(reminder.user.email, reminder);
      break;
    case "sms":
      await sendSMS(reminder.user.phoneNumber, reminder);
      break;
    case "push":
      await sendPushNotification(reminder.user.pushToken, reminder);
      break;
    default:
      console.error(`Unsupported contact method: ${contactMethod}`);
  }
}

async function sendEmail(email: string, reminder: any) {
  if (!email) {
    console.error("No email found for reminder:", reminder.id);
    return;
  }

  const message = {
    to: email,
    from: process.env.SENDGRID_SENDER_EMAIL!,
    subject: "Reminder Notification",
    text: `Reminder for commitment: ${reminder.commitmentId}`,
  };

  try {
    await sendgrid.send(message);
    console.log(`Email sent to ${email} for reminder: ${reminder.id}`);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

async function sendSMS(phoneNumber: string, reminder: any) {
  if (!phoneNumber) {
    console.error("No phone number found for reminder:", reminder.id);
    return;
  }

  console.log(
    `Simulating SMS to ${phoneNumber}: Reminder for commitment ${reminder.commitmentId}`
  );
}

async function sendPushNotification(pushToken: string, reminder: any) {
  if (!pushToken) {
    console.error("No push token found for reminder:", reminder.id);
    return;
  }

  console.log(
    `Simulating push notification to ${pushToken}: Reminder for commitment ${reminder.commitmentId}`
  );
}

(async () => {
  await createConsumerGroup();
  await processMessages();
})();
