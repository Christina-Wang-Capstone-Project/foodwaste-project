import Geocoder from "react-native-geocoding";

export async function reverseGeoCodeAddress(input) {
    Geocoder.init(import.meta.env.VITE_GOOGLE_API_KEY, { language: "en" });
    try {
      let res = await Geocoder.from(input);
      var addressComponent = res.results[0].formatted_address;
      return addressComponent;
    } catch (e) {
      throw e;
    }
}
  
