const express = require("express");

const app = express();

const { cars } = require("./cars");

app.get("/", (req, res) => {
  res.status(200).send('<h1>Home Page</h1><a href="/api/allcars">All cars</a>');
});

// get all cars
app.get("/api/allcars", (req, res) => {
  res.status(200).json(cars);
});

// get one car
app.get("/api/allcars/:id", (req, res) => {
  const { id } = req.params;
  const requestedCar = cars.find((car) => car.id === Number(id));

  //   If the product is not available
  if (!requestedCar) {
    res.status(404).send("Requested product does not exist.");
  }

  res.json(requestedCar);
});

// query the api i.e search on your own terms
app.get("/api/v1/query", (req, res) => {
  const { search, limit } = req.query;
  let sortedCars = [...cars];

  if (search) {
    sortedCars.filter((car) => car.make.startsWith(search));
  }

  if (limit) {
    return (sortedCars = sortedCars.slice(0, Number(limit)));
  }

  res.status(200).json(sortedCars);
});

app.all("*", (req, res) => {
  res.status(404).send("The resource is not available");
});

app.listen(5000, (req, res) => {
  console.log("yes we have lift off on port 5000...");
});
