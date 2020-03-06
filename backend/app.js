const express = require("express");
const request = require("request");
const Joi = require("joi");
const fs = require("fs");

const app = express();
const port = 5000;

let data = fs.readFileSync("./credentials.json", "utf8", (err, data) => {
  if (err) throw err;
  return data;
});

const api = {
  key: "c384d4d023cb202a8ce2d7d750ccfb9f",
  base: "https://api.openweathermap.org/data/2.5/"
};

app.get(`/api/weather/:city`, (req, res) => {
  request(
    `${api.base}weather?q=${req.params.city}&units=metric&appid=${api.key}`,
    (error, response, body) => {
      if (!error && response.statusCode === 200) {
        let parsedBody = JSON.parse(body);
        res.send(parsedBody);
      }
    }
  );
});

app.post("/", (req, res) => {
  if (req.method === "POST") {
    let body = "";
    req.on("data", chunk => {
      body += chunk.toString();
      body = JSON.parse(body);
      const schema = Joi.object().keys({
        userName: Joi.string()
          .email({ minDomainAtoms: 2 })
          .trim(),
        password: Joi.string()
          .min(6)
          .max(100)
          .required()
      });
      let newData = JSON.parse(data);
      let foundUser = newData.users.find(
        user =>
          user.userName === body.userName && user.password === body.password
      );
      if (foundUser) {
        Joi.validate(body, schema, (err, result) => {
          if (err) {
            res.status(401);
          }
          res.send(result);
        });
      } else {
        return res.status(401);
      }
    });
    req.on("end", () => {
      res.end("ok");
    });
  }
});

app.listen(port, () => console.log(`Server listening on port ${port}`));
