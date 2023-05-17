import { PrismaClient } from "@prisma/client";
import express from "express";

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

// Countries
app.get("/api/countries", async (req, res) => {
  let countries = [];
  const { cityCode } = req.query;
  try {
    // Check if the query params contain a country code
    if (cityCode) {
      // Find the country with the specified code
      countries = await prisma.countries.findMany({
        where: { country_code: cityCode as string },
      });
    } else {
      // Find all countries
      countries = await prisma.countries.findMany();
    }
    // Send the countries back to the client
    res.json(countries);
  } catch (error) {
    // Send an error message back to the client
    res.status(500).json({
      message: "Something went wrong",
    });
  }
});

app.get("/api/countries/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const countries = await prisma.countries.findUnique({
      where: { id: id },
    });
    res.json(countries);
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
});

// Provinces

app.get("/api/provinces", async (req, res) => {
  let provinces = [];
  const { provinceCode } = req.query;
  try {
    // Check if the query params contain a province code
    if (provinceCode) {
      // Find the province with the specified code
      provinces = await prisma.provinces.findMany({
        where: { province_code: provinceCode as string },
      });
    } else {
      // Find all provinces
      provinces = await prisma.provinces.findMany();
    }
    // Send the provinces back to the client
    res.json(provinces);
  } catch (error) {
    // Send an error message back to the client
    res.status(500).json({
      message: "Something went wrong",
    });
  }
});

app.get("/api/provinces/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const provinces = await prisma.provinces.findUnique({
      where: { id: id },
    });
    res.json(provinces);
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
});

// Cities
app.get("/api/cities", async (req, res) => {
  let cities = [];
  const { streetCode, provinceCode } = req.query;
  try {
    // Check if the query params contain a city code
    if (streetCode) {
      // Find the city with the specified code
      cities = await prisma.cities.findMany({
        where: { street_code: +streetCode },
      });
    } else if (provinceCode) {
      // Find all cities in the specified province
      cities = await prisma.cities.findMany({
        where: { province_code: provinceCode as string },
      });
    } else {
      // Find all cities
      cities = await prisma.cities.findMany();
    }
    // Send the cities back to the client
    res.json(cities);
  } catch (error) {
    // Send an error message back to the client
    res.status(500).json({
      message: "Something went wrong",
    });
  }
});

app.get("/api/cities/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const cities = await prisma.cities.findUnique({
      where: { id: id },
    });
    res.json(cities);
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
});

app.listen(3005, () =>
  console.log("REST API server ready at: http://localhost:3000")
);
