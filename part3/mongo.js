const mongoose = require("mongoose");

if (process.argv.length < 3) {
    console.log("Give password as an argument");
    process.exit();
}

const password = process.argv[2];

const url = `mongodb+srv://hscottvocodes:${password}@cluster0.mnokkoo.mongodb.net/personApp?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set("strictQuery", false);

mongoose.connect(url);

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
});

const Person = mongoose.model("Person", personSchema);

// const person = new Person({
//   name: "css is easy",
//   number: "true",
// });
// person.save().then((result) => {
//   console.log("Person saved!");
//   mongoose.connection.close();
// });

Person.find({}).then((result) => {
    result.forEach((person) => {
        console.log(person);
    });
    mongoose.connection.close();
});
