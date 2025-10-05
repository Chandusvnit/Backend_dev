import dotenv from "dotenv";

dotenv.config({
    path : "./.env",
});

let myname = process.env.database;
console.log("Value : ,"  , myname);

console.log("Start with backend new project ");
