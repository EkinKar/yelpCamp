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

async function seedImg() {
  try {
    const resp = await axios.get("https://api.unsplash.com/photos/random", {
      params: {
        client_id: "QM7RUXBTmtBNuyvsUiCXrq5SdvdVUfHtVf_3_y8yVio",
        collections: 1114848,
      },
    });
    return resp.data.urls.small;
  } catch (err) {
    console.error(err);
  }
}

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 10; i++) {
    // setup
    const placeSeed = Math.floor(Math.random() * places.length);
    const descriptorsSeed = Math.floor(Math.random() * descriptors.length);
    const citySeed = Math.floor(Math.random() * cities.length);
    const priceSeed = Math.floor(Math.random() * 30);

    // seed data into campground
    const camp = new Campground({
      image: await seedImg(),
      title: `${descriptors[descriptorsSeed]} ${places[placeSeed]}`,
      location: `${cities[citySeed].city}, ${cities[citySeed].state}`,
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Debitis, nihil tempora vel aspernatur quod aliquam illum! Iste impedit odio esse neque veniam molestiae eligendi commodi minus, beatae accusantium, doloribus quo!",
      price: priceSeed,
    });

    await camp.save();
  }
};
seedDB().then(() => {
  mongoose.connection.close();
});
