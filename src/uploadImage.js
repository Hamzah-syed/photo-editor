import React, { useState, useEffect } from "react";

const UploadImage = ({
  preview,
  setPreview,
  selectedFile,
  setSelectedFile,
}) => {
  console.log(setSelectedFile);
  console.log(preview);
  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    // I've kept this example simple by using the first image instead of multiple
    setSelectedFile(e.target.files[0]);
  };
  return (
    <div>
      <input type="file" onChange={onSelectFile} />
    </div>
  );
};

export default UploadImage;

// import React, { useState, useRef } from "react";
// import "./App.css";
// import Slider from "./Slider";
// import SidebarItem from "./SidebarItem";
// import UploadImage from "./uploadImage";
// import Img from "./img/profile.jpg";

// const DEFAULT_OPTIONS = [
//   {
//     name: "Brightness",
//     property: "brightness",
//     value: 100,
//     range: {
//       min: 0,
//       max: 200,
//     },
//     unit: "%",
//   },
//   {
//     name: "Contrast",
//     property: "contrast",
//     value: 100,
//     range: {
//       min: 0,
//       max: 200,
//     },
//     unit: "%",
//   },
//   {
//     name: "Saturation",
//     property: "saturate",
//     value: 100,
//     range: {
//       min: 0,
//       max: 200,
//     },
//     unit: "%",
//   },
//   {
//     name: "Grayscale",
//     property: "grayscale",
//     value: 0,
//     range: {
//       min: 0,
//       max: 100,
//     },
//     unit: "%",
//   },
//   {
//     name: "Sepia",
//     property: "sepia",
//     value: 0,
//     range: {
//       min: 0,
//       max: 100,
//     },
//     unit: "%",
//   },
//   {
//     name: "Hue Rotate",
//     property: "hue-rotate",
//     value: 0,
//     range: {
//       min: 0,
//       max: 360,
//     },
//     unit: "deg",
//   },
//   {
//     name: "Blur",
//     property: "blur",
//     value: 0,
//     range: {
//       min: 0,
//       max: 20,
//     },
//     unit: "px",
//   },
// ];

// function App() {
//   const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);
//   const [options, setOptions] = useState(DEFAULT_OPTIONS);
//   //used in upload image state
//   const [selectedFile, setSelectedFile] = useState();
//   const [preview, setPreview] = useState();

//   const selectedOption = options[selectedOptionIndex];
//   const canvasRef = useRef(null);

//   function getImageStyle() {
//     const filters = options.map((option) => {
//       return `${option.property}(${option.value}${option.unit})`;
//     });

//     return { filter: filters.join(" ") };
//   }

//   console.log(getImageStyle());

//   const canvasToImg = (_) => {
//     try {
//       let canvas = canvasRef.current;
//       let context = canvas.getContext("2d");
//       let img = new Image();
//       //edited from
//       img.crossOrigin = "anonymous";
//       img.src = Img;
//       //edited end
//       // context.fillRect(100, 100, 100, 100);

//       context.filter = getImageStyle().filter;
//       canvas.width = 700;
//       canvas.height = 700;
//       img.addEventListener("load", function () {
//         context.drawImage(img, 0, 0, 700, 700);
//       });
//       // //download image
//       // let tagA = document.createElement("a");
//       // document.body.appendChild(tagA);
//       // tagA.href = canvas.toDataURL();
//       // tagA.download = "canvas-image.png";
//       // tagA.click();
//       // document.body.removeChild(tagA);
//       // context.drawImage(img, 0, 0, 100, 100);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   // const canvasToImg = (_) => {
//   //   printLocation();
//   //   // let canvas = canvasRef.current;
//   // };
//   function handleSliderChange({ target }) {
//     setOptions((prevOptions) => {
//       return prevOptions.map((option, index) => {
//         if (index !== selectedOptionIndex) return option;
//         return { ...option, value: target.value };
//       });
//     });
//   }

//   return (
//     <div className="container">
//       <UploadImage
//         selectedFile={selectedFile}
//         setSelectedFile={setSelectedFile}
//         preview={preview}
//         setPreview={setPreview}
//       />
//       {selectedFile && (
//         <img className="main-image" src={preview} style={getImageStyle()} />
//       )}
//       <img src={Img} className="main-image" style={getImageStyle()} />
//       <div
//       // style={{ display: "none" }}
//       >
//         <canvas ref={canvasRef} />
//       </div>
//       {/* <button onClick={printLocation} style={{ marginLeft: 20 }}>
//         Generate Image on Canvas
//       </button> */}
//       {/* {selectedFile && ( */}
//       <button onClick={canvasToImg} style={{ marginLeft: 20 }}>
//         Download as Image
//       </button>
//       {/* )} */}
//       <Slider
//         min={selectedOption.range.min}
//         max={selectedOption.range.max}
//         value={selectedOption.value}
//         handleChange={handleSliderChange}
//       />
//       <div className="sidebar">
//         {options.map((option, index) => {
//           return (
//             <SidebarItem
//               key={index}
//               name={option.name}
//               active={index === selectedOptionIndex}
//               handleClick={() => setSelectedOptionIndex(index)}
//             />
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// export default App;
