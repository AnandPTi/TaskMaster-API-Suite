const cron = require("node-cron");
const twilio = require("twilio");
const User = require("../models/user.model");
const Task = require("../models/task.model");

const twilioClient = twilio(
  "ACf******************f04ddd",
  "ffed**************a4f"
);

cron.schedule("0 * * * *", async () => {
  try {
    const users = await User.find().sort({ priority: 1 });

    let previousUserCalled = false;

    for (const user of users) {
      if (previousUserCalled) {
        console.log(`Previous user already attended the call. Skipping calling ${user.name}`);
        continue; // Skip calling this user if the previous user attended the call
      }

      const highPriorityTasks = await Task.find({
        userId: user._id,
        status: { $ne: "DONE" }, // Only consider tasks that are not marked as DONE
        due_date: { $lt: new Date() }
      }).countDocuments();

      if (highPriorityTasks > 0) {
        await twilioClient.calls.create({
          to: user.phone_number,
          from: "+132*****534",
          url: "https://api.twilio.com/2010-04-01/Accounts/ACff6ca***************21f04ddd/Calls.json",
        });
        console.log(`Call initiated for user ${user.name}`);
        previousUserCalled = true;
      }
    }

    console.log("Voice calls initiated successfully.");
  } catch (error) {
    console.error("Error initiating voice calls:", error);
  }
});

