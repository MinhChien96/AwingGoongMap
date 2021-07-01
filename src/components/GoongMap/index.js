import '@goongmaps/goong-js/dist/goong-js.css';
import '@goongmaps/goong-geocoder/dist/goong-geocoder.css';
import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import MapGL, { Marker, FullscreenControl } from '@goongmaps/goong-map-react';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Geocoder from '@goongmaps/goong-geocoder-react';
import isEqual from 'lodash/isEqual';

import { useStyles } from './Style';

const GoongMap = ({
    onAddPlace,
    zoom,
    radius,
    limit,
    defaultGoongMap,
    marker,
    onLoad,
    t,
    mapKey,
    apiKey,
}) => {
    const mapRef = useRef();
    const contentRef = useRef();
    const [viewport, setViewport] = useState({
        ...defaultGoongMap,
        zoom,
    });
    const [searching, setSearching] = useState(null);
    const [changeMarkerByClickMap, setChangeMarkerByClickMap] = useState({});

    const handleViewportChange = (viewport) => {
        setViewport((prevState) => ({
            ...prevState,
            ...viewport,
        }));
    };

    const handleGeocoderViewportChange = (viewport) => {
        const geocoderDefaultOverrides = { transitionDuration: 1000 };

        return handleViewportChange({
            ...viewport,
            ...geocoderDefaultOverrides,
        });
    };

    const handleClickAddMarker = (event) => {
        // target div.overlays khi click vào map, còn span.map-ctl khi click vào fullscreen
        if (event.target.className === 'overlays') {
            const { lngLat } = event;
            const [longitude, latitude] = lngLat;
            setChangeMarkerByClickMap({ longitude, latitude });
            onAddPlace({ longitude, latitude });
        }
    };

    const handleSearch = (place) => {
        const { name, geometry } = place.result.result;
        const { location } = geometry;
        const { lng, lat } = location;
        setSearching(name);
        onAddPlace({ longitude: lng, latitude: lat });
    };

    const handleClearSearch = () => {
        setSearching(null);
    };

    useEffect(() => {
        if (!isEqual(changeMarkerByClickMap, marker))
            setViewport((prevState) => ({ ...prevState, ...marker }));
    }, [marker]);

    const translationText = {
        PlaceHolder: t('Place.SearchAddressHolder'),
    };

    const classes = useStyles();

    return (
        <>
            <MapGL
                ref={mapRef}
                {...viewport}
                width='100%'
                height='100%'
                scrollZoom
                onLoad={onLoad}
                onViewportChange={handleViewportChange}
                onNativeClick={handleClickAddMarker}
                goongApiAccessToken={mapKey}
            >
                {marker && (
                    <Marker
                        longitude={marker.longitude}
                        latitude={marker.latitude}
                    >
                        <LocationOnIcon
                            fontSize='large'
                            className={classes.iconLocation}
                        />
                    </Marker>
                )}
                <FullscreenControl className={classes.buttonFullScreen} />
            </MapGL>
            <div className={classes.contentSearch} ref={contentRef}>
                <Geocoder
                    mapRef={mapRef}
                    containerRef={contentRef}
                    placeholder={translationText.PlaceHolder}
                    radius={radius}
                    limit={limit}
                    onResult={handleSearch}
                    onClear={handleClearSearch}
                    inputValue={searching}
                    onViewportChange={handleGeocoderViewportChange}
                    goongApiAccessToken={apiKey}
                />
            </div>
        </>
    );
};

GoongMap.propTypes = {
    onAddPlace: PropTypes.func,
    zoom: PropTypes.number,
    radius: PropTypes.number,
    limit: PropTypes.number,
    defaultGoongMap: PropTypes.object,
    marker: PropTypes.object,
    onLoad: PropTypes.func,
    t: PropTypes.func.isRequired,
    mapKey: PropTypes.string.isRequired,
    apiKey: PropTypes.string.isRequired,
};

GoongMap.defaultProps = {
    onAddPlace: () => {},
    zoom: 14,
    radius: 3000,
    limit: 5,
    defaultGoongMap: {
        latitude: 20.999881,
        longitude: 105.828481,
    },
    marker: null,
    t: () => {},
};

export default GoongMap;
