import { useEffect, useRef } from "react"

function Map({ className, center, markers}) {
    const mapRef = useRef();

    useEffect(() => {
        const googleMap = new window.google.maps.Map(mapRef.current, {
            center: center,
            zoom: 4,
            disableDefaultUI: true,
            mapTypeId: 'terrain'
        });
        
    
        if(markers) {
            markers.forEach(({ lat, lng, title, description, url }) => {
                const newMarker = new window.google.maps.Marker({
                    position: { lng, lat },
                    map: googleMap,
                    title,
                    icon: 'https://res.cloudinary.com/djfnazn3y/image/upload/v1715106542/Artio/yawfr4aqe2attuunus5c.png' ,
                })
                const contentString =
                '<div id="content">' +
                '<div id="siteNotice">' +
                "</div>" +
                `<h1 class="firstHeading font-semibold text-xl mb-4">${title}</h1>` +
                '<div id="bodyContent">' +
                `<p class="font-medium text-base">${description}</p>` +
                '<div class="my-4 bg-green-300 w-fit h-fit rounded-full drop-shadow-lg">' +
                `<a class="font-medium text-xl mx-5 text-black" href=${url}>Details</a>` +
                "</div>" +
                "</div>" +
                "</div>";
                const infowindow = new window.google.maps.InfoWindow({
                    content: contentString,
                    ariaLabel: "Uluru",
                  });
                newMarker.addListener("click", () => {
                    infowindow.open({
                        anchor: newMarker,
                        map: googleMap,
                    });
                });
            })
            
        }
        
    }, [center, markers])

  return (
    <div ref={mapRef} className={className}></div>
  )
}

Map.defaultProps = {
    className: ''
}

export default Map