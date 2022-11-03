function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import propTypes from 'prop-types';
import React, { Component } from 'react';
import videojs from 'video.js';
import '../pannellum/css/video-js.css';
import '../pannellum/css/pannellum.css';
import '../pannellum/css/style-textInfo.css';
import '../pannellum/js/libpannellum.js';
import '../pannellum/js/RequestAnimationFrame';
import '../pannellum/js/pannellum.js';
import '../pannellum/js/videojs-pannellum-plugin';

var PannellumVideo = /*#__PURE__*/function (_Component) {
  _inheritsLoose(PannellumVideo, _Component);

  function PannellumVideo(props) {
    var _this;

    _this = _Component.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_this), "renderVideo", function (state) {
      var children = _this.props.children; // make the array of sub components, even if its one, it become array of one 

      var hotspots = [].concat(children);
      var hotspotArray = [];

      if (Array.isArray(hotspots)) {
        hotspots.map(function (hotspot) {
          switch (hotspot.props.type) {
            case "info":
              return hotspotArray.push({
                "id": Math.random().toString(36).substr(2, 9),
                "type": hotspot.props.type,
                "pitch": hotspot.props.pitch ? hotspot.props.pitch : 10,
                "yaw": hotspot.props.yaw ? hotspot.props.yaw : 10,
                "text": hotspot.props.text ? hotspot.props.text : "",
                "URL": hotspot.props.URL ? hotspot.props.URL : ""
              });

            case "custom":
              return hotspotArray.push({
                "id": Math.random().toString(36).substr(2, 9),
                "pitch": hotspot.props.pitch ? hotspot.props.pitch : 10,
                "yaw": hotspot.props.yaw ? hotspot.props.yaw : 10,
                "cssClass": hotspot.props.cssClass ? hotspot.props.cssClass : 'tooltipcss',
                "createTooltipFunc": hotspot.props.tooltip ? hotspot.props.tooltip : _this.hotspotTooltip,
                "createTooltipArgs": hotspot.props.tooltipArg ? hotspot.props.tooltipArg : {},
                "clickHandlerFunc": hotspot.props.handleClick ? hotspot.props.handleClick : _this.handleClickHotspot,
                "clickHandlerArgs": hotspot.props.handleClickArg ? hotspot.props.handleClickArg : {
                  name: "test"
                }
              });

            default:
              return [];
          }
        });
      }

      if (state === "update") {
        _this.video = videojs(_this.videoNode);
        var cuurentHS = [].concat(_this.video.pnlmViewer.getConfig().hotSpots);

        _this.video.pnlmViewer.setYaw(_this.props.yaw);

        _this.video.pnlmViewer.setPitch(_this.props.pitch);

        _this.video.pnlmViewer.setHfov(_this.props.hfov);

        _this.video.pnlmViewer.setHfovBounds([_this.props.minHfov, _this.props.maxHfov]); //remove all hotspots


        cuurentHS.map(function (hs) {
          return _this.video.pnlmViewer.removeHotSpot(hs.id);
        }); // Adding new hotspots

        hotspotArray.map(function (hs) {
          return _this.video.pnlmViewer.addHotSpot(hs);
        }); // setting new video

        _this.video.src({
          type: 'video/mp4',
          src: _this.props.video
        });

        return _this.video.play();
      } else {
        _this.video = videojs(_this.videoNode, {
          loop: _this.props.loop,
          autoplay: _this.props.autoplay,
          controls: _this.props.controls,
          muted: _this.props.muted,
          plugins: {
            pannellum: {
              yaw: _this.props.yaw,
              pitch: _this.props.pitch,
              hfov: _this.props.hfov,
              minHfov: _this.props.minHfov,
              maxHfov: _this.props.maxHfov,
              minPitch: _this.props.minPitch,
              maxPitch: _this.props.maxPitch,
              minYaw: _this.props.minYaw,
              maxYaw: _this.props.maxYaw,
              hotSpotDebug: _this.props.hotspotDebug,
              autoRotate: _this.props.autoRotate,
              mouseZoom: _this.props.mouseZoom,
              hotSpots: hotspotArray
            }
          }
        });

        _this.video.src({
          type: 'video/mp4',
          src: _this.props.video
        });

        _this.video.play();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "componentDidMount", function () {
      _this.renderVideo("mount");
    });

    _defineProperty(_assertThisInitialized(_this), "handleClickHotspot", function (e, args) {
      console.log("hotspot clicked", args.name);
    });

    _defineProperty(_assertThisInitialized(_this), "hotspotTooltip", function (hotSpotDiv, args) {
      hotSpotDiv.setAttribute("id", "textInfo");
      var hDiv = document.createElement('div');
      hDiv.classList.add('hotspot');
      var outDiv = document.createElement('div');
      outDiv.classList.add('out');
      var inDiv = document.createElement('div');
      inDiv.classList.add('in');
      var imageDiv = document.createElement('div');
      imageDiv.classList.add('image');
      hotSpotDiv.appendChild(hDiv);
      hDiv.appendChild(inDiv);
      hDiv.appendChild(outDiv);
    });

    _defineProperty(_assertThisInitialized(_this), "getViewer", function () {
      return _this.video.pnlmViewer;
    });

    _this.state = {
      id: Math.random().toString(36).substr(2, 9)
    };
    return _this;
  }

  var _proto = PannellumVideo.prototype;

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    // videojs(this.videoNode).dispose();
    // this.videoNode.setAttribute("src", this.props.video );
    this.renderVideo("update");
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    videojs(this.videoNode).dispose();
  };

  _proto.render = function render() {
    var _this2 = this;

    var _this$props = this.props,
        width = _this$props.width,
        height = _this$props.height,
        video = _this$props.video;
    var divStyle = {
      width: width,
      height: height
    };
    return /*#__PURE__*/React.createElement("div", {
      "data-vjs-player": true
    }, /*#__PURE__*/React.createElement("video", {
      id: this.props.id ? this.props.id : this.state.id,
      className: "video-js vjs-default-skin vjs-big-play-centered",
      ref: function ref(node) {
        return _this2.videoNode = node;
      },
      preload: "none",
      crossOrigin: "anonymous",
      style: divStyle
    }));
  };

  return PannellumVideo;
}(Component);

_defineProperty(PannellumVideo, "defaultProps", {
  children: [],
  width: '100%',
  height: '400px',
  video: '',
  yaw: 0,
  pitch: 0,
  hfov: 100,
  minHfov: 50,
  maxHfov: 150,
  minPitch: -90,
  maxPitch: 90,
  minYaw: -180,
  maxYaw: 180,
  hotspotDebug: false,
  autoRotate: 0,
  mouseZoom: true,
  loop: false,
  autoplay: true,
  controls: false,
  muted: true
});

PannellumVideo.propTypes = process.env.NODE_ENV !== "production" ? {
  children: propTypes.oneOfType([propTypes.arrayOf(propTypes.node), propTypes.node]),
  id: propTypes.string,
  width: propTypes.string,
  height: propTypes.string,
  video: propTypes.string,
  yaw: propTypes.number,
  pitch: propTypes.number,
  hfov: propTypes.number,
  minHfov: propTypes.number,
  maxHfov: propTypes.number,
  minPitch: propTypes.number,
  maxPitch: propTypes.number,
  minYaw: propTypes.number,
  maxYaw: propTypes.number,
  hotspotDebug: propTypes.bool,
  autoRotate: propTypes.number,
  mouseZoom: propTypes.bool,
  loop: propTypes.bool,
  autoplay: propTypes.bool,
  controls: propTypes.bool,
  muted: propTypes.bool,
  tooltip: propTypes.func,
  tooltipArg: propTypes.object,
  handleClick: propTypes.func,
  handleClickArg: propTypes.object,
  cssClass: propTypes.string
} : {};
export default PannellumVideo;