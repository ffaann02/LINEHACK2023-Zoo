import React, { useEffect, useRef, useContext, useState } from "react";
import { userContext } from "./App";

function Map({ origin, destination, apiKey }) {
  const { animal_name, setAnimal_name ,userProfileImage,userId,username} = useContext(userContext);
  const [destinationPosition, setDestinationPosition] = useState(destination);
  const mapRef = useRef(null);
  const directionsServiceRef = useRef(null);
  const directionsRendererRef = useRef(null);

  useEffect(() => {
    if (!origin || !destinationPosition) {
      return;
    }

    const googleMapScript = document.createElement("script");
    googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
    window.document.body.appendChild(googleMapScript);

    googleMapScript.addEventListener("load", () => {
        const bounds = new window.google.maps.LatLngBounds();
  bounds.extend(origin);
  bounds.extend(destinationPosition);
  const center = bounds.getCenter();
      const map = new window.google.maps.Map(mapRef.current, {
        center: center,
        zoom: 20,
      });
      

  

      directionsServiceRef.current = new window.google.maps.DirectionsService();
      directionsRendererRef.current = new window.google.maps.DirectionsRenderer();
      directionsRendererRef.current.setMap(map);

      // Define an array of marker objects
      const markers = [
        {
          position: { lat: 13.723385349706858, lng: 100.5305669347848 },
          title: "แคพีบาร่า",
          type: "Capybara",
          imageUrl: "https://sv1.picz.in.th/images/2023/02/24/eWUS1I.png",
          realimageUrl: "https://sv1.picz.in.th/images/2023/02/26/e0yv31.png"
      },
      {
          position: { lat: 13.723335371640975, lng: 100.53083211044937 },
          title: "กวาง",
          type: "Deer",
          imageUrl: "https://sv1.picz.in.th/images/2023/02/24/eWU7WZ.png",
          realimageUrl: "https://sv1.picz.in.th/images/2023/02/26/e0FEj1.png"
      },
      {
          position: { lat: 13.722991454348286, lng: 100.5307500289302 },
          title: "ช้าง",
          type: "Elephant",
          imageUrl: "https://sv1.picz.in.th/images/2023/02/24/eWUYAP.png",
          realimageUrl: "https://sv1.picz.in.th/images/2023/02/26/e0F592.png"
      },
      {
          position: { lat: 13.7228240095712, lng: 100.5304328772704 },
          title: "ยีราฟ",
          type: "Giraffe",
          imageUrl: "https://sv1.picz.in.th/images/2023/02/24/eWUzet.png",
          realimageUrl: "https://sv1.picz.in.th/images/2023/02/26/e0FQsg.png"
      }
      ,
      
      {
          position: { lat: 13.723161131600518, lng: 100.530515612486 },
          title: "แกะ",
          type: "Sheep",
          imageUrl: "https://sv1.picz.in.th/images/2023/02/24/eWUNke.png",
          realimageUrl: "https://sv1.picz.in.th/images/2023/02/26/e0FxZn.png"
      }
      ,
      {
          position: { lat: 13.723254900555679, lng: 100.53019386442533 },
          title: "แพนด้าแดง",
          type: "Red Panda",
          imageUrl: "https://sv1.picz.in.th/images/2023/02/24/eWU9nN.png",
          realimageUrl: "https://sv1.picz.in.th/images/2023/02/26/e0F1pE.png"
      }
      ,
      {
          position: { lat: 13.72249675828297, lng: 100.53089540660189 },
          title: "อิกัวนา",
          type: "Iguana",
          imageUrl: "https://sv1.picz.in.th/images/2023/02/24/eWUBOl.png",
          realimageUrl: "https://sv1.picz.in.th/images/2023/02/26/e0FR0S.png"
      }
      ,
      {
          position: { lat: 13.72256230474523, lng: 100.53132273176062 },
          title: "นกอีมู",
          type: "Emu",
          imageUrl: "https://sv1.picz.in.th/images/2023/02/24/eWUfak.png",
          realimageUrl: "https://sv1.picz.in.th/images/2023/02/26/e0FgrQ.png"
      }
      ,
      {
          position: { lat: 13.723748489668465, lng: 100.53087622954597 },
          title: "นกแก้ว",
          type: "Parrot",
          imageUrl: "https://sv1.picz.in.th/images/2023/02/24/eWUkzv.png",
          realimageUrl: "https://sv1.picz.in.th/images/2023/02/26/e0FcQV.png"
      }
      ,
      {
          position: { lat: 13.723374914390407, lng: 100.53108709422169 },
          title: "แอกโซลอเติล",
          type: "Axolotl",
          imageUrl: "https://sv1.picz.in.th/images/2023/02/24/eWU3xE.png",
          realimageUrl: "https://sv1.picz.in.th/images/2023/02/26/e0FZNN.png"
      }
      
      ];

      markers.forEach((marker) => {
        const image = {
          url: marker.imageUrl,
          size: new window.google.maps.Size(60, 60),
          origin: new window.google.maps.Point(0, 0),
          anchor: new window.google.maps.Point(40, 40),
          scaledSize: new window.google.maps.Size(40, 40),
          title: new window.google.maps.Size(40, 40),
        };

        const newMarker = new window.google.maps.Marker({
          position: marker.position,
          map: map,
          title: marker.title,
          icon: image,
        });

        const infoWindow = new window.google.maps.InfoWindow({
          content: `<h2>${marker.title}</h2>`,
          autoOpen: false,
        });

        // const originMarker = new window.google.maps.Marker({
        //     position: origin,
        //     map: map,
        //     title: "คุณ",
        //     icon: {
        //       url: userProfileImage,
        //       size: new window.google.maps.Size(40, 40),
        //       origin: new window.google.maps.Point(0, 0),
        //       anchor: new window.google.maps.Point(20, 20),
        //       scaledSize: new window.google.maps.Size(40, 40),
        //     },
        //   });

        infoWindow.open(map, newMarker);
        

        newMarker.addListener("click", () => {
          const newRequest = {
            origin,
            destination: marker.position,
            travelMode: window.google.maps.TravelMode.DRIVING,
          };
          setAnimal_name(marker.title);
          setDestinationPosition(marker.position);
          directionsServiceRef.current.route(newRequest, (result, status) => {
            if (status === window.google.maps.DirectionsStatus.OK) {
              directionsRendererRef.current.setDirections(result);
            }
          });
        });
      });

      const request = {
        origin,
        destination: destinationPosition,
        travelMode: window.google.maps.TravelMode.WALKING,
      };

      directionsServiceRef.current.route(request, (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          directionsRendererRef.current.setDirections(result);
        }
      });
    });
  }, [apiKey, origin, destinationPosition, setAnimal_name]);

  return (
    <div
      ref={mapRef}
      style={{ width: "100%", height: "100vh", position: "absolute", zIndex: "10" }}
    ></div>
  );
}

export default Map;

