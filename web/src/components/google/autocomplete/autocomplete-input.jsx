import {Input} from "@nextui-org/input";
import { useEffect, useRef } from "react";


const autocompleteOptions = {
    types: ['country']
};

function AutocompleteInput({ onPlaceChange }) {

    const autocompleteInputRef = useRef();

    useEffect(() => {
        const autocomplete = new window.google.maps.places.Autocomplete(autocompleteInputRef.current, autocompleteOptions);
        window.google.maps.event.addListener(autocomplete, 'place_changed', () => {
            const place = autocomplete.getPlace();
            if (place && place.geometry?.location) {
                const location = { lat: place.geometry.location.lat(), lng: place.geometry.location.lng(), address: place.formatted_address };
                onPlaceChange(location)
                console.debug(location) 
            }
        })

        return () => {
            window.google.maps.event.clearListeners(autocomplete, 'place_changed');
        }
    }, [])

  return (
    <div>
       <Input ref={autocompleteInputRef} type="text" label='Search' />
    </div>
  )
}

AutocompleteInput.defaultProps = {
    onPlaceChange: (location) => console.debug(location) 
}

export default AutocompleteInput;