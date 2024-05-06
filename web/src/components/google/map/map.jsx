import { useEffect, useRef } from "react"

function Map({ className, center, markers}) {
    const mapRef = useRef();

    useEffect(() => {
        const googleMap = new window.google.maps.Map(mapRef.current, {
            center: center,
            zoom: 15
        });
        if(markers) {
            markers.forEach(({ lat, lng, title }) => {
                new window.google.maps.Marker({
                    position: { lng, lat },
                    map: googleMap,
                    title
                })
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