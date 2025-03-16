import React, { useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import Navbar from "./Navbar";

const IrelandAttractionsMap = () => {
  const mapRef = useRef(null);
  const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  useEffect(() => {
    const loader = new Loader({
      apiKey: googleMapsApiKey,
      version: "weekly",
    });

    loader.load().then(() => {
      const google = window.google;
      const map = new google.maps.Map(mapRef.current, {
        center: { lat: 53.41291, lng: -8.24389 },
        zoom: 7,
        restriction: {
          latLngBounds: {
            north: 55.937,
            south: 51.222,
            west: -10.5,
            east: -5.34,
          },
        },
      });

      const attractions = [
        { name: "Cliffs of Moher", lat: 52.9715, lng: -9.4309, link: "https://www.cliffsofmoher.ie/" },
        { name: "Dublin Castle", lat: 53.3429, lng: -6.2674, link: "https://www.dublincastle.ie/" },
        { name: "Giant's Causeway", lat: 55.2404, lng: -6.5113, link: "https://www.nationaltrust.org.uk/giants-causeway" },
        { name: "Blarney Castle", lat: 51.9378, lng: -8.5211, link: "https://www.blarneycastle.ie/" },
        { name: "Killarney National Park", lat: 51.883, lng: -9.5333, link: "https://www.killarneynationalpark.ie/" },
        { name: "Ring of Kerry", lat: 51.883, lng: -9.983, link: "https://theringofkerry.com/" },
        { name: "Kilmainham Gaol", lat: 53.3444, lng: -6.2981, link: "https://www.kilmainhamgaolmuseum.ie/" },
        { name: "Trinity College Dublin", lat: 53.3441, lng: -6.2675, link: "https://www.visittrinity.ie/trinity-trails/" },
        { name: "The Rock of Cashel", lat: 52.521, lng: -7.8805, link: "https://www.cashel.ie/rock-of-cashel/" },
        { name: "Newgrange", lat: 53.7001, lng: -6.4626, link: "https://www.newgrange.com/" },
        { name: "Aran Islands", lat: 53.0919, lng: -9.4375, link: "https://www.aranislands.ie/" },
        { name: "Dingle Peninsula", lat: 52.1407, lng: -10.2158, link: "https://dingle-peninsula.ie/" },
        { name: "Muckross House", lat: 51.8936, lng: -9.5124, link: "https://www.muckross-house.ie/" },
        { name: "The Burren", lat: 53.084, lng: -9.2004, link: "https://www.burrennationalpark.ie/" },
        { name: "Dunluce Castle", lat: 55.2114, lng: -6.5219, link: "https://discovernorthernireland.com/dunluce-castle" },
        { name: "Sligo Abbey", lat: 54.2671, lng: -8.4781, link: "https://heritageireland.ie/places-to-visit/sligo-abbey/" },
        { name: "Malahide Castle", lat: 53.4549, lng: -6.2049, link: "https://www.malahidecastleandgardens.ie/" },
        { name: "Cork City Gaol", lat: 51.8926, lng: -8.5015, link: "https://corkcitygaol.com/" },
        { name: "Glendalough", lat: 53.0233, lng: -6.3447, link: "https://www.glendalough.ie/" },
        { name: "Kinsale", lat: 51.7114, lng: -8.5221, link: "https://www.kinsale.ie/" },
        { name: "Tara Hill", lat: 52.6991, lng: -6.2177, link: "https://www.hilloftara.org/" },
        { name: "Powerscourt House", lat: 52.9246, lng: -6.1961, link: "https://powerscourt.com/" },
        { name: "Blennerville Windmill", lat: 52.2163, lng: -9.6223, link: "https://blennerville-windmill.ie/" },
        { name: "Cahir Castle", lat: 52.3572, lng: -7.8028, link: "https://heritageireland.ie/places-to-visit/cahir-castle/" },
        { name: "St. Patrick's Cathedral", lat: 53.3331, lng: -6.2483, link: "https://www.stpatrickscathedral.ie/" },
        { name: "Dublin Zoo", lat: 53.3524, lng: -6.3064, link: "https://www.dublinzoo.ie/" },
        { name: "Lough Gur", lat: 52.4178, lng: -8.5221, link: "https://loughgur.com/" },
        { name: "The Hill of Uisneach", lat: 53.4261, lng: -7.2774, link: "https://uisneach.ie/" },
        { name: "Belfast City Hall", lat: 54.595, lng: -5.933, link: "https://www.belfastcity.gov.uk/visit-belfast-city-hall" },
        { name: "Carrick-a-Rede Rope Bridge", lat: 55.211, lng: -6.3376, link: "https://www.nationaltrust.org.uk/carrick-a-rede" },
        { name: "Donegal Castle", lat: 54.6557, lng: -8.1126, link: "https://heritageireland.ie/places-to-visit/donegal-castle/" },
        { name: "Bunratty Castle", lat: 52.7014, lng: -8.8618, link: "https://www.bunrattycastle.ie/" },
        { name: "Ballycroy National Park", lat: 54.0924, lng: -9.5354, link: "https://www.nationalparks.ie/wild-nephin/" },
      ];

      attractions.forEach((attraction) => {
        const marker = new google.maps.Marker({
          position: { lat: attraction.lat, lng: attraction.lng },
          map,
          title: attraction.name,
        });

        const infoWindow = new google.maps.InfoWindow({
          content: `
            <div>
              <b style="color: black;">${attraction.name}</b><br>
              <a href="${attraction.link}" target="_blank">Visit website</a><br>
              <a href="https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                attraction.name
              )}" target="_blank">Get Directions</a>
            </div>
          `,
        });

        marker.addListener("click", () => {
          infoWindow.open(map, marker);
        });
      });
    });
  }, [googleMapsApiKey]);

  return (
    <div>
      <Navbar />
      <h2>Attractions in Ireland</h2>
      <div id="map" ref={mapRef} style={{ height: "500px", width: "100%" }}></div>
      <input
          style={{
            width: "300px",
            backgroundColor: "#82b37f",
            border: "none"       
          }}
        />
        <input
          style={{
            width: "300px",
            backgroundColor: "#82b37f",
            border: "none"       
          }}
        />
    </div>
  );
};

export default IrelandAttractionsMap;