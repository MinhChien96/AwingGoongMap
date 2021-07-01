"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("@goongmaps/goong-js/dist/goong-js.css");

require("@goongmaps/goong-geocoder/dist/goong-geocoder.css");

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _goongMapReact = _interopRequireWildcard(require("@goongmaps/goong-map-react"));

var _LocationOn = _interopRequireDefault(require("@material-ui/icons/LocationOn"));

var _goongGeocoderReact = _interopRequireDefault(require("@goongmaps/goong-geocoder-react"));

var _isEqual = _interopRequireDefault(require("lodash/isEqual"));

var _Style = require("./Style");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var GoongMap = function GoongMap(_ref) {
  var onAddPlace = _ref.onAddPlace,
      zoom = _ref.zoom,
      radius = _ref.radius,
      limit = _ref.limit,
      defaultGoongMap = _ref.defaultGoongMap,
      marker = _ref.marker,
      onLoad = _ref.onLoad,
      t = _ref.t,
      mapKey = _ref.mapKey,
      apiKey = _ref.apiKey;
  var mapRef = (0, _react.useRef)();
  var contentRef = (0, _react.useRef)();

  var _useState = (0, _react.useState)(_objectSpread(_objectSpread({}, defaultGoongMap), {}, {
    zoom: zoom
  })),
      _useState2 = _slicedToArray(_useState, 2),
      viewport = _useState2[0],
      setViewport = _useState2[1];

  var _useState3 = (0, _react.useState)(null),
      _useState4 = _slicedToArray(_useState3, 2),
      searching = _useState4[0],
      setSearching = _useState4[1];

  var _useState5 = (0, _react.useState)({}),
      _useState6 = _slicedToArray(_useState5, 2),
      changeMarkerByClickMap = _useState6[0],
      setChangeMarkerByClickMap = _useState6[1];

  var handleViewportChange = function handleViewportChange(viewport) {
    setViewport(function (prevState) {
      return _objectSpread(_objectSpread({}, prevState), viewport);
    });
  };

  var handleGeocoderViewportChange = function handleGeocoderViewportChange(viewport) {
    var geocoderDefaultOverrides = {
      transitionDuration: 1000
    };
    return handleViewportChange(_objectSpread(_objectSpread({}, viewport), geocoderDefaultOverrides));
  };

  var handleClickAddMarker = function handleClickAddMarker(event) {
    // target div.overlays khi click vào map, còn span.map-ctl khi click vào fullscreen
    if (event.target.className === 'overlays') {
      var lngLat = event.lngLat;

      var _lngLat = _slicedToArray(lngLat, 2),
          longitude = _lngLat[0],
          latitude = _lngLat[1];

      setChangeMarkerByClickMap({
        longitude: longitude,
        latitude: latitude
      });
      onAddPlace({
        longitude: longitude,
        latitude: latitude
      });
    }
  };

  var handleSearch = function handleSearch(place) {
    var _place$result$result = place.result.result,
        name = _place$result$result.name,
        geometry = _place$result$result.geometry;
    var location = geometry.location;
    var lng = location.lng,
        lat = location.lat;
    setSearching(name);
    onAddPlace({
      longitude: lng,
      latitude: lat
    });
  };

  var handleClearSearch = function handleClearSearch() {
    setSearching(null);
  };

  (0, _react.useEffect)(function () {
    if (!(0, _isEqual.default)(changeMarkerByClickMap, marker)) setViewport(function (prevState) {
      return _objectSpread(_objectSpread({}, prevState), marker);
    });
  }, [marker]);
  var translationText = {
    PlaceHolder: t('Place.SearchAddressHolder')
  };
  var classes = (0, _Style.useStyles)();
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_goongMapReact.default, _extends({
    ref: mapRef
  }, viewport, {
    width: "100%",
    height: "100%",
    scrollZoom: true,
    onLoad: onLoad,
    onViewportChange: handleViewportChange,
    onNativeClick: handleClickAddMarker,
    goongApiAccessToken: mapKey
  }), marker && /*#__PURE__*/_react.default.createElement(_goongMapReact.Marker, {
    longitude: marker.longitude,
    latitude: marker.latitude
  }, /*#__PURE__*/_react.default.createElement(_LocationOn.default, {
    fontSize: "large",
    className: classes.iconLocation
  })), /*#__PURE__*/_react.default.createElement(_goongMapReact.FullscreenControl, {
    className: classes.buttonFullScreen
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: classes.contentSearch,
    ref: contentRef
  }, /*#__PURE__*/_react.default.createElement(_goongGeocoderReact.default, {
    mapRef: mapRef,
    containerRef: contentRef,
    placeholder: translationText.PlaceHolder,
    radius: radius,
    limit: limit,
    onResult: handleSearch,
    onClear: handleClearSearch,
    inputValue: searching,
    onViewportChange: handleGeocoderViewportChange,
    goongApiAccessToken: apiKey
  })));
};

GoongMap.propTypes = {
  onAddPlace: _propTypes.default.func,
  zoom: _propTypes.default.number,
  radius: _propTypes.default.number,
  limit: _propTypes.default.number,
  defaultGoongMap: _propTypes.default.object,
  marker: _propTypes.default.object,
  onLoad: _propTypes.default.func,
  t: _propTypes.default.func.isRequired,
  mapKey: _propTypes.default.string.isRequired,
  apiKey: _propTypes.default.string.isRequired
};
GoongMap.defaultProps = {
  onAddPlace: function onAddPlace() {},
  zoom: 14,
  radius: 3000,
  limit: 5,
  defaultGoongMap: {
    latitude: 20.999881,
    longitude: 105.828481
  },
  marker: null,
  t: function t() {}
};
var _default = GoongMap;
exports.default = _default;