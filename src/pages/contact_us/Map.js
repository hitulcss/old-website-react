// import React from "react";
// import { compose, withProps } from "recompose";
// import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";

// const MyMapComponent = compose(
//     withProps({
//         googleMapURL: `https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyBBsAxhtmjp7gpqaxa1yYLF_OuXV3wMFWk`,
//         loadingElement: <div style={{ height: `100%` }} />,
//         containerElement: <div style={{ height: `400px` }} />,
//         mapElement: <div style={{ height: `100%` }} />,
//     }),
//     withScriptjs,
//     withGoogleMap
// )((props) => (
//     <GoogleMap
//         defaultZoom={8}
//         defaultCenter={{ lat: -34.397, lng: 150.644 }}
//     >
//         {props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} />}
//     </GoogleMap>
// ));

// export default MyMapComponent;

import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const MapContainer = () => {
    const mapStyles = {
        height: "400px",
        width: "400",
    };

    const defaultCenter = {
        lat: -34.397,
        lng: 150.644,
    };

    return (
        <LoadScript googleMapsApiKey="AIzaSyA6_LKhL3isLPQbAiyqtq4iyoun-lf0nek">
            <GoogleMap mapContainerStyle={mapStyles} zoom={8} center={defaultCenter}>
                <Marker position={defaultCenter} />
            </GoogleMap>
        </LoadScript>
    );
};

export default MapContainer;
