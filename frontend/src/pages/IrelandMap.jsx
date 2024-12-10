import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Navbar from "./Navbar";

const IrelandAttractionsMap = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    // Initialize the map
    const map = L.map(mapRef.current).setView([53.41291, -8.24389], 7);

    // Add OpenStreetMap tile layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 18,
      attribution: "© OpenStreetMap contributors",
    }).addTo(map);

    // Set Ireland bounds
    const irelandBounds = [
      [51.222, -10.5], // Southwest corner
      [55.437, -5.34], // Northeast corner
    ];
    map.setMaxBounds(irelandBounds);
    map.on("drag", () => {
      map.panInsideBounds(irelandBounds, { animate: true });
    });

    // Add markers for attractions in Ireland
    const attractions = [
      {
        name: "Cliffs of Moher",
        lat: 52.9715,
        lng: -9.4309,
        link: "https://www.cliffsofmoher.ie/",
      },
      {
        name: "Dublin Castle",
        lat: 53.3429,
        lng: -6.2674,
        link: "https://www.dublincastle.ie/",
      },
      {
        name: "Giant's Causeway",
        lat: 55.2404,
        lng: -6.5113,
        link: "https://www.nationaltrust.org.uk/giants-causeway",
      },
      {
        name: "Blarney Castle",
        lat: 51.9378,
        lng: -8.5211,
        link: "https://www.blarneycastle.ie/",
      },
      {
        name: "Killarney National Park",
        lat: 51.883,
        lng: -9.5333,
        link: "https://www.killarneynationalpark.ie/",
      },
      {
        name: "Ring of Kerry",
        lat: 51.883,
        lng: -9.983,
        link: "https://theringofkerry.com/",
      },
      {
        name: "Kilmainham Gaol",
        lat: 53.3444,
        lng: -6.2981,
        link: "https://www.kilmainhamgaolmuseum.ie/",
      },
      {
        name: "Trinity College Dublin",
        lat: 53.3441,
        lng: -6.2675,
        link: "https://www.visittrinity.ie/trinity-trails/",
      },
      {
        name: "The Rock of Cashel",
        lat: 52.521,
        lng: -7.8805,
        link: "https://www.cashel.ie/rock-of-cashel/",
      },
      {
        name: "Newgrange",
        lat: 53.7001,
        lng: -6.4626,
        link: "https://www.newgrange.com/",
      },
      {
        name: "Aran Islands",
        lat: 53.0919,
        lng: -9.4375,
        link: "https://www.aranislands.ie/",
      },
      {
        name: "Dingle Peninsula",
        lat: 52.1407,
        lng: -10.2158,
        link: "https://dingle-peninsula.ie/explore/arts-culture-heritage-dingle-peninsula.html",
      },
      {
        name: "Muckross House",
        lat: 51.8936,
        lng: -9.5124,
        link: "https://www.muckross-house.ie/",
      },
      {
        name: "The Burren",
        lat: 53.084,
        lng: -9.2004,
        link: "https://www.burrennationalpark.ie/",
      },
      {
        name: "Dunluce Castle",
        lat: 55.2114,
        lng: -6.5219,
        link: "https://discovernorthernireland.com/things-to-do/dunluce-castle-p675491",
      },
      {
        name: "Sligo Abbey",
        lat: 54.2671,
        lng: -8.4781,
        link: "https://heritageireland.ie/places-to-visit/sligo-abbey/",
      },
      {
        name: "Malahide Castle",
        lat: 53.4549,
        lng: -6.2049,
        link: "https://www.malahidecastleandgardens.ie/",
      },
      {
        name: "Cork City Gaol",
        lat: 51.8926,
        lng: -8.5015,
        link: "https://corkcitygaol.com/",
      },
      {
        name: "Glendalough",
        lat: 53.0233,
        lng: -6.3447,
        link: "https://www.glendalough.ie/",
      },
      {
        name: "Kinsale",
        lat: 51.7114,
        lng: -8.5221,
        link: "https://www.kinsale.ie/",
      },
      {
        name: "Tara Hill",
        lat: 52.736,
        lng: -6.436,
        link: "https://www.hilloftara.org/",
      },
      {
        name: "Powerscourt House",
        lat: 52.9246,
        lng: -6.1961,
        link: "https://powerscourt.com/",
      },
      {
        name: "Blennerville Windmill",
        lat: 52.2163,
        lng: -9.6223,
        link: "https://blennerville-windmill.ie/",
      },
      {
        name: "Cahir Castle",
        lat: 52.3572,
        lng: -7.8028,
        link: "https://heritageireland.ie/places-to-visit/cahir-castle/",
      },
      {
        name: "St. Patrick's Cathedral",
        lat: 53.3331,
        lng: -6.2483,
        link: "https://www.stpatrickscathedral.ie/",
      },
      {
        name: "Dublin Zoo",
        lat: 53.3524,
        lng: -6.3064,
        link: "https://www.dublinzoo.ie/",
      },
      {
        name: "Lough Gur",
        lat: 52.4178,
        lng: -8.5221,
        link: "https://loughgur.com/",
      },
      {
        name: "The Hill of Uisneach",
        lat: 53.4261,
        lng: -7.2774,
        link: "https://uisneach.ie/",
      },
      {
        name: "Belfast City Hall",
        lat: 54.595,
        lng: -5.933,
        link: "https://www.belfastcity.gov.uk/things-to-do/visit-belfast/visit-belfast-city-hall",
      },
      {
        name: "Carrick-a-Rede Rope Bridge",
        lat: 55.211,
        lng: -6.3376,
        link: "https://www.nationaltrust.org.uk/carrick-a-rede",
      },
      {
        name: "Donegal Castle",
        lat: 54.6557,
        lng: -8.1126,
        link: "https://heritageireland.ie/places-to-visit/donegal-castle/",
      },
      {
        name: "Bunratty Castle",
        lat: 52.7014,
        lng: -8.8618,
        link: "https://www.bunrattycastle.ie/",
      },
      {
        name: "Ballycroy National Park",
        lat: 54.0924,
        lng: -9.5354,
        link: "https://www.nationalparks.ie/wild-nephin/",
      },
      {
        name: "The Old Jameson Distillery",
        lat: 53.3474,
        lng: -6.2678,
        link: "https://www.jamesonwhiskey.com/en-IE/visit-us/jameson-distillery-bow-st",
      },
      {
        name: "Hook Head Lighthouse",
        lat: 52.1578,
        lng: -6.9449,
        link: "https://hookheritage.ie/",
      },
      {
        name: "Kilkenny Castle",
        lat: 52.6541,
        lng: -7.2553,
        link: "https://kilkennycastle.ie/",
      },
      {
        name: "Kinsale Harbour",
        lat: 51.7115,
        lng: -8.5215,
        link: "https://www.kinsale.ie/",
      },
      {
        name: "Sally Gap",
        lat: 53.202,
        lng: -6.4276,
        link: "https://visitwicklow.ie/listing/sally-gap/",
      },
      {
        name: "Slieve League Cliffs",
        lat: 54.622,
        lng: -8.6258,
        link: "https://www.sliabhliag.com/",
      },
      {
        name: "Cork City",
        lat: 51.8969,
        lng: -8.4863,
        link: "https://www.purecork.ie/",
      },
      {
        name: "Galway Cathedral",
        lat: 53.273,
        lng: -9.053,
        link: "https://www.galwaycathedral.ie/",
      },
      {
        name: "Portmarnock Beach",
        lat: 53.4411,
        lng: -6.1289,
        link: "https://www.fingal.ie/portmarnock-beach",
      },
    ];

    attractions.forEach((attraction) => {
      L.marker([attraction.lat, attraction.lng]).addTo(map).bindPopup(`
          <b>${attraction.name}</b><br>
          <a href="${attraction.link}" target="_blank">Visit website</a>
        `);
    });

    // Cleanup on component unmount
    return () => {
      map.remove();
    };
  }, []);

  // Helper function to parse coordinates or find attraction
  const getCoordinates = (input, attractions) => {
    input = input.trim().toLowerCase();

    // Check if input is a coordinate
    if (input.includes(",")) {
      const [lat, lng] = input.split(",").map((value) => value.trim());
      if (!isNaN(lat) && !isNaN(lng)) {
        return { lat: parseFloat(lat), lng: parseFloat(lng) };
      }
    }

    // Check for matching attraction name
    const attraction = attractions.find((a) => a.name.toLowerCase() === input);
    return attraction ? { lat: attraction.lat, lng: attraction.lng } : null;
  };

  const calculateDistance = () => {
    // alert("yes");
    const sourceInput = document.getElementById("source").value;
    const destinationInput = document.getElementById("destination").value;

    const sourceCoordinates = getCoordinates(sourceInput, attractions);
    alert(sourceCoordinates);
    const destinationCoordinates = getCoordinates(
      destinationInput,
      attractions
    );

    if (!sourceCoordinates || !destinationCoordinates) {
      alert("Please enter valid location names or coordinates.");
      return;
    }

    const sourceLatLng = L.latLng(sourceCoordinates.lat, sourceCoordinates.lng);
    const destinationLatLng = L.latLng(
      destinationCoordinates.lat,
      destinationCoordinates.lng
    );

    const distance = sourceLatLng.distanceTo(destinationLatLng);
    alert(`Distance: ${distance.toFixed(2)} meters.`);
  };

  return (
    <div>
      <Navbar /> {/* Navbar is called before the map */}
      <h2>Attractions in Ireland</h2>
      <div id="map" ref={mapRef} style={{ height: "500px" }}></div>
      <div>
        <input
          id="source"
          type="text"
          placeholder="Enter source location or coordinates"
          style={{
            width: "300px",
            padding: "10px",
            margin: "5px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
        <input
          id="destination"
          type="text"
          placeholder="Enter destination location or coordinates"
          style={{
            width: "300px",
            padding: "10px",
            margin: "5px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
        <button
          style={{
            padding: "10px 20px",
            borderRadius: "5px",
            backgroundColor: "#4caf50",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            marginTop: "10px",
          }}
          onClick={calculateDistance}
        >
          Calculate Distance
        </button>
      </div>
    </div>
  );
};

export default IrelandAttractionsMap;
