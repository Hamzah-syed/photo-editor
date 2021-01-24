import React, { useState, useRef } from "react";
import "./App.css";
import Slider from "./Slider";
import SidebarItem from "./SidebarItem";

import UploadImage from "./uploadImage";

const DEFAULT_OPTIONS = [
  {
    name: "Brightness",
    property: "brightness",
    value: 100,
    range: {
      min: 0,
      max: 200,
    },
    unit: "%",
  },
  {
    name: "Contrast",
    property: "contrast",
    value: 100,
    range: {
      min: 0,
      max: 200,
    },
    unit: "%",
  },
  {
    name: "Saturation",
    property: "saturate",
    value: 100,
    range: {
      min: 0,
      max: 200,
    },
    unit: "%",
  },
  {
    name: "Grayscale",
    property: "grayscale",
    value: 0,
    range: {
      min: 0,
      max: 100,
    },
    unit: "%",
  },
  {
    name: "Sepia",
    property: "sepia",
    value: 0,
    range: {
      min: 0,
      max: 100,
    },
    unit: "%",
  },
  {
    name: "Hue Rotate",
    property: "hue-rotate",
    value: 0,
    range: {
      min: 0,
      max: 360,
    },
    unit: "deg",
  },
  {
    name: "Blur",
    property: "blur",
    value: 0,
    range: {
      min: 0,
      max: 20,
    },
    unit: "px",
  },
];

function App() {
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);
  const [options, setOptions] = useState(DEFAULT_OPTIONS);
  //used in upload image state
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const selectedOption = options[selectedOptionIndex];
  const canvasRef = useRef(null);

  function getImageStyle() {
    const filters = options.map((option) => {
      return `${option.property}(${option.value}${option.unit})`;
    });

    return { filter: filters.join(" ") };
  }

  console.log(getImageStyle());

  const canvasToImg = (_) => {
    try {
      let canvas = canvasRef.current;
      let context = canvas.getContext("2d");
      let img = new Image();
      //edited from
      img.crossOrigin = "anonymous";
      img.src = preview;
      //edited end
      // context.fillRect(100, 100, 100, 100);
      canvas.width = 700;
      canvas.height = 700;

      context.filter = getImageStyle().filter;
      img.addEventListener("load", function () {
        context.drawImage(img, 0, 0, 700, 700);
        let tagA = document.createElement("a");
        document.body.appendChild(tagA);
        tagA.href = canvas.toDataURL();
        tagA.download = "canvas-image.png";
        tagA.click();
        document.body.removeChild(tagA);
      });
      // context.drawImage(img, 0, 0, 100, 100);
    } catch (err) {
      console.log(err);
    }
  };

  function handleSliderChange({ target }) {
    setOptions((prevOptions) => {
      return prevOptions.map((option, index) => {
        if (index !== selectedOptionIndex) return option;
        return { ...option, value: target.value };
      });
    });
  }

  return (
    <div className="container">
      <div className="uploadImageContainer">
        <UploadImage
          selectedFile={selectedFile}
          setSelectedFile={setSelectedFile}
          preview={preview}
          setPreview={setPreview}
        />
      </div>
      {selectedFile && (
        <img
          alt="profile"
          className="main-image"
          src={preview}
          style={getImageStyle()}
        />
      )}
      {selectedFile && (
        <button onClick={canvasToImg} style={{ marginLeft: 20 }}>
          Download
        </button>
      )}

      <Slider
        min={selectedOption.range.min}
        max={selectedOption.range.max}
        value={selectedOption.value}
        handleChange={handleSliderChange}
      />
      <div className="sidebar">
        {options.map((option, index) => {
          return (
            <SidebarItem
              key={index}
              name={option.name}
              active={index === selectedOptionIndex}
              handleClick={() => setSelectedOptionIndex(index)}
            />
          );
        })}
      </div>
      <div style={{ display: "none" }}>
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
}

export default App;
