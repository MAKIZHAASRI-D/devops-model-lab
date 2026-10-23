
const fs = require("fs");
const path = require("path");
const assert = require("assert");

const htmlPath = path.join(__dirname, "..", "index.html");
const html = fs.readFileSync(htmlPath, "utf8");

assert(html.includes("<!DOCTYPE html>"),
    "HTML document declaration is missing");

assert(html.includes('<html lang="en">'),
    "HTML language attribute is missing");

assert(html.includes("<title>Jenkins CI/CD Pipeline</title>"),
    "Page title is missing");

assert(html.includes("<h1>Welcome to CI/CD Pipeline</h1>"),
    "Main heading is missing");

assert(html.includes("<button onclick=\"showMessage()\">Click Me</button>"),
    "Button or button handler is missing");

assert(html.includes('id="message"'),
    "Message element is missing");

assert(html.includes("font-family"),
    "CSS styling is missing");

assert(html.includes("function showMessage()"),
    "Message handler is missing");

assert(html.includes('document.getElementById("message").textContent'),
    "Message element is not updated by the handler");

assert(html.includes("Application is working successfully!"),
    "Success message is missing");

console.log("All HTML application tests passed!");
