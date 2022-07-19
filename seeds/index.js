const mongoose = require("mongoose");
const cities = require("./cities");
const axios = require("axios");
const { places, descriptors } = require("./seedhelpers");
const Campground = require("../models/campground");
mongoose.connect("mongodb://localhost:27017/yelpCamp");

const db = mongoose.connection;
db.on("erroe", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 10; i++) {
    const placeSeed = Math.floor(Math.random() * places.length);
    const descriptorsSeed = Math.floor(Math.random() * descriptors.length);
    const citySeed = Math.floor(Math.random() * cities.length);
    const priceSeed = Math.floor(Math.random() * 30 + 10);
    const camp = new Campground({
      author: "62d3094249b13a851943e373",
      title: `${descriptors[descriptorsSeed]} ${places[placeSeed]}`,
      location: `${cities[citySeed].city}, ${cities[citySeed].state}`,
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Debitis, nihil tempora vel aspernatur quod aliquam illum! Iste impedit odio esse neque veniam molestiae eligendi commodi minus, beatae accusantium, doloribus quo!",
      price: priceSeed,
      geometry: {
        type: "Point",
        coordinates: [-81.901693, 41.303921],
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
