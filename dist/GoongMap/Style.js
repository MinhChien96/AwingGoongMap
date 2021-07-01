"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useStyles = void 0;

var _styles = require("@material-ui/core/styles");

var useStyles = (0, _styles.makeStyles)(function (theme) {
  return {
    iconLocation: {
      color: 'red',
      transform: 'translate(-20px,-40px)'
    },
    contentSearch: {
      position: 'absolute',
      top: 10,
      left: 10,
      zIndex: 9
    },
    buttonFullScreen: {
      right: 10,
      top: 10
    }
  };
});
exports.useStyles = useStyles;