import cron from 'node-cron';
import User from './users.model.js'; // Adjust the import based on your directory structure

// Schedule a task to run every minute
cron.schedule('* * * * *', async () => {
  const expirationTime = 5 * 60 * 1000; // 5 minutes in milliseconds
  const thresholdTime = Date.now() - expirationTime;

  try {
    // Find and delete users who are unconfirmed and older than 5 minutes
    const result = await User.deleteMany({
      isConfirmed: false,
      createdAt: { $lt: new Date(thresholdTime) },
    });

    console.log(`Deleted ${result.deletedCount} unconfirmed user(s) older than 5 minutes.`);
  } catch (error) {
    console.error('Error cleaning unconfirmed users:', error);
  }
});
