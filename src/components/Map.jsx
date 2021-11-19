import React, { useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";

import { Button, Box } from "@chakra-ui/react";
import MainHeading from "./MainHeading";

const Map = () => {
  const mapRef = useRef();

  useEffect(() => {
    const loader = new Loader({
      apiKey: "YOUR_API_KEY",
      version: "weekly",
    });

    loader.load().then((google) => {
      console.log("API LOADED");

      const parkCoords = { lat: -12.23611796591263, lng: -76.91001322915511 };

      const map = new google.maps.Map(document.getElementById("map"), {
        center: parkCoords,
        zoom: 17,
      });

      const parkMarker = new google.maps.Marker({
        position: parkCoords,
        map: map,
      });

      const ds = new google.maps.DirectionsService();
      const dr = new google.maps.DirectionsRenderer();
      dr.setMap(map);
      mapRef.current = { ds, dr, parkCoords, map, google, parkMarker };
    });
  }, []);

  const route = () => {
    const { ds, dr, parkCoords, map, google, parkMarker } = mapRef.current;

    const geo = navigator.geolocation;
    geo.getCurrentPosition(({ coords }) => {
      const myCoords = {
        lat: coords.latitude,
        lng: coords.longitude,
      };
      // new google.maps.Marker({
      //   position: myCoords,
      //   map: map,
      // });
      const request = {
        origin: myCoords,
        destination: parkCoords,
        travelMode: "DRIVING",
      };

      ds.route(request, (result, status) => {
        if (status == "OK") {
          parkMarker.setMap(null);
          dr.setDirections(result);
        }
      });
    });
  };

  return (
    <div>
      <MainHeading text="Mapa" />

      <Box pb="2" textAlign="end">
        <Button onClick={route} colorScheme="teal">
          Trazar ruta
        </Button>
      </Box>

      <div id="map" style={{ height: "500px" }}></div>
    </div>
  );
};

export default Map;
