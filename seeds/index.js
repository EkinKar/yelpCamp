const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedhelpers");
const Campground = require("../models/campground");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const dbUrl = process.env.DB_URL || "mongodb://localhost:27017/yelp-camp";

mongoose.connect(dbUrl);

const db = mongoose.connection;
db.on("erroe", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 250; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "62d3094249b13a851943e373",
      title: `${sample(descriptors)} ${sample(places)}`,
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Debitis, nihil tempora vel aspernatur quod aliquam illum! Iste impedit odio esse neque veniam molestiae eligendi commodi minus, beatae accusantium, doloribus quo!",
      price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      images: [
        {
          url: "https://res.cloudinary.com/dir50a6kj/image/upload/v1658074131/YelpCamp/image-1_qoypzz.png",
          filename: "YelpCamp/image-1_qoypzz",
        },
        {
          url: "https://res.cloudinary.com/dir50a6kj/image/upload/v1658074126/YelpCamp/image-2_qvti4k.jpg",
          filename: "YelpCamp/image-2_qvti4k",
        },
      ],
    });

    await camp.save();
  }
};
seedDB().then(() => {
  mongoose.connection.close();
});
