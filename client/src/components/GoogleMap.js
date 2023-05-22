import React, { useEffect, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { useParams } from "react-router-dom";
import MapSearch from "./MapSearch";
import ResultList from "./ResultList";
import ReviewForm from "./ReviewForm";

const AdvancedJsApiLoaderGoogleMap = (props) => {
  // may need to comment out script in client/public/index.html
  const [lawFirmData, setLawFirmData] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [coordinates, setCoordinates] = useState({
    lng: null,
    lat: null,
  });
  let { searchQueryParam } = useParams();

  const loader = new Loader({
    apiKey: "AIzaSyDIra1juLYvG4k4dRXvlnyna2_Xxvh35-A",
    libraries: ["places"],
  });

  const fetchLawFirmData = (lawFirmPlaceId) => {
    // Perform the API call to fetch law firm data using the Google Maps Places API
    const request = {
      placeId: lawFirmPlaceId,
      fields: ["name", "formatted_address"], // Add more fields as needed
    };

    const service = new google.maps.places.PlacesService(map);
    service.getDetails(request, (place, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        setLawFirmData(place);
      } else {
        console.error("Error fetching law firm data", status);
      }
    });
  };

  const getLocation = () => {
    console.log(navigator);
    if (!navigator.geolocation) {
      setStatus("Geolocation is not supported by your browser");
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setStatus(null);
          setCoordinates({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => {
          setStatus("Unable to retrieve your location");
        }
      );
    }
  };

  let searchBox;
  useEffect(() => {
    getLocation();
    setSearchQuery(searchQueryParam);
    loader.load().then(() => {
      searchBox = new google.maps.places.SearchBox();
    });
  }, []);

  useEffect(
    () => {
      console.log("searchQuery:", searchQuery);
      setError("");
      if (coordinates.lat && coordinates.lng) {
        loader.load().then(() => {
          const request = {
            query: searchQuery,
            location: coordinates,
            radius: "500",
          };

          const map = new google.maps.Map(document.getElementById("map"), {
            center: coordinates,
            zoom: 11.2,
          });

          const service = new google.maps.places.PlacesService(map);
          if (searchQuery && coordinates.lat && coordinates.lng) {
            service.textSearch(request, function (results, status) {
              if (status === google.maps.places.PlacesServiceStatus.OK) {
                setSearchResults(results);
                results.forEach((result) => {
                  const resultContent =
                    `<p>${result.name}</p>` + `<p>${result.formatted_address}</p>`;

                  const infowindow = new google.maps.InfoWindow({
                    content: resultContent,
                    ariaLabel: result.name,
                  });

                  const marker = new google.maps.Marker({
                    position: new google.maps.LatLng(
                      result.geometry.location.lat(),
                      result.geometry.location.lng()
                    ),
                    map: map,
                  });

                  marker.addListener("click", () => {
                    infowindow.open({
                      anchor: marker,
                      map,
                    });
                  });
                });

                map.setCenter(results[0].geometry.location);
              } else {
                setError("No results found, please try again.");
              }
            });
          } else if (coordinates.lat && coordinates.lng) {
            new google.maps.Marker({
              position: new google.maps.LatLng(coordinates.lat, coordinates.lng),
            });
          }
        });
      }
    },
    [searchQuery, coordinates]
    //[coordinates]
  );

  useEffect(() => {
    console.log("useeffect");
    if (searchLocation) {
      console.log("location found");
      loader
        .load()
        .then(() => {
          const autocomplete = new google.maps.places.AutocompleteService();
          const results = autocomplete.getPlacePredictions({ input: searchLocation });
          console.log(results);
          return results;
        })
        .then((results) => {
          console.log("then", results);
        });
    }
  }, [searchLocation]);

  return (
    <>
      {searchBox}

      {status ? (
        <div>
          <h3>Location status: {status}</h3>
          <p>Please enter your location</p>
          <MapSearch setQuery={setSearchLocation} />
        </div>
      ) : null}

      <div className="grid-x">
        <div className="cell small-4">
          {coordinates.lat && coordinates.lng ? (
            <div>
              <div className="background">
                {lawFirmData ? (
                  <ReviewForm result={lawFirmData} />
                ) : (
                  <p>Loading law firm data...</p>
                )}
                <p className="error">{error}</p>

                <MapSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
              </div>
              <div id="map" style={{ height: 400 }}></div>
            </div>
          ) : (
            <h3>Map Loading while finding your location...</h3>
          )}
        </div>
        <div className="cell-small-3">
          <div className="cell-small-4">
            <h2>Result List</h2>
            <ResultList searchResults={searchResults} />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdvancedJsApiLoaderGoogleMap;
