const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth");
const contactRoutes = require("./routes/contact");
const bookingRoutes = require("./routes/booking"); // ✅ add this
const adminRoutes = require("./routes/admin");
const testimonialRoutes = require("./routes/testimonials");
const path = require("path");
const progressRoutes = require('./routes/progressRoutes');
const cron = require('node-cron');
const warningRoutes = require('./routes/warning');
const Warning = require("./models/Warning");




dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

mongoose
  .connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use('/api/progress', progressRoutes);
app.use("/api/warning", warningRoutes);

// Setup CRON to auto-delete daily at midnight
cron.schedule('0 0 * * *', async () => {
  try {
    await Warning.deleteMany();
    console.log("⚠️ Warning message deleted at midnight");
  } catch (error) {
    console.error("Error deleting warning:", error);
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
