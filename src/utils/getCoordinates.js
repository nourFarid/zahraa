//Function to get coordinates
const axios = require("axios");
// Function to get coordinates
const getCoordinates = async (placeName) => {
  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
    placeName
  )}&format=json`;

  const response = await axios.get(url);
  const firstResult = response.data[0];

  if (firstResult) {
    const { lat, lon } = firstResult;
    return { latitude: parseFloat(lat), longitude: parseFloat(lon) };
  } else {
    throw new Error("No results found.");
  }
};

// Function to calculate distance
const calculateDistance = (coord1, coord2) => {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = (coord2.latitude - coord1.latitude) * (Math.PI / 180);
  const dLon = (coord2.longitude - coord1.longitude) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(coord1.latitude * (Math.PI / 180)) *
      Math.cos(coord2.latitude * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in kilometers
  return distance;
};

// Example: Get coordinates for Helwan University
async function getCoordinatesAndCalculateDistance(place) {
  let helwanCoordinates; // Declare a variable to store the coordinates

  try {
    helwanCoordinates = await getCoordinates("جامعة حلوان");
    console.log("Coordinates for جامعة حلوان:", helwanCoordinates);

    const placeCoordinates = await getCoordinates(place);
    console.log(`Coordinates for ${place}:`, placeCoordinates);

    // Calculate the distance between the two places
    const distance = calculateDistance(helwanCoordinates, placeCoordinates);
    
    console.log(
      `Distance between Helwan University and ${place}: ${distance.toFixed(
        2
      )} km \n`
    );

    return     distance.toFixed(2);
  } catch (error) {
    console.error("Error:", error.message);
  }
}
module.exports = { getCoordinatesAndCalculateDistance };