"use client"; // this is a client component

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from 'next/navigation'
import gredentColor from './generated.json'

const GradientBlobGenerator2 = () => {
  const [borderRadius, setBorderRadius] = useState(15);
  const [blendMode, setBlendMode] = useState("normal");
  const [blur, setBlur] = useState(50);
  const [css, setCss] = useState("");
  const [background_colors, setBackground] = useState("radial-gradient(63.62% 69.52% at 100% 0%, rgba(247, 214, 98, 0.8) 0%, rgba(247, 214, 98, 0.17) 52.08%, rgba(247, 214, 98, 0) 100%), linear-gradient(208.42deg, rgb(240, 66, 42) 7.46%, rgba(240, 88, 42, 0.18) 42.58%, rgba(240, 101, 42, 0) 64.13%), radial-gradient(114.51% 122.83% at 0% -15.36%, rgb(231, 79, 106) 0%, rgba(231, 79, 106, 0.22) 66.72%, rgba(231, 79, 106, 0) 100%), linear-gradient(333.95deg, rgba(83, 208, 236, 0.85) -7.76%, rgba(83, 208, 236, 0.204) 19.67%, rgba(138, 137, 190, 0) 35.42%), radial-gradient(109.15% 148.57% at 4.46% 98.44%, rgb(27, 49, 128) 0%, rgba(27, 49, 128, 0) 100%), linear-gradient(141.57deg, rgb(78, 173, 235) 19.08%, rgba(78, 173, 235, 0) 98.72%)");
  const textAreaRef = useRef(null);
  const [copySuccess, setCopySuccess] = useState('Copy CSS code');
  const router = useRouter()

  useEffect(()=>{
    setCss(
      `background: ${background_colors}
       border-radius: ${borderRadius}rem;
       background-blend-mode: ${blendMode};
       filter: blur(${blur}px);
       height: 100%;
       width: 100%;
       max-height: 400px;
       max-width: 400px;`
    );
  },[]);

  useEffect(()=>{
    setCss(
      `background: ${background_colors};
       border-radius: ${borderRadius}rem;
       background-blend-mode: ${blendMode};
       filter: blur(${blur}px);
       height: 100%;
       width: 100%;
       max-height: 400px;
       max-width: 400px;`
    );
  },[background_colors, borderRadius, blur, blendMode ]);


  const blobstyle = {
    background: background_colors,
    borderRadius: `${borderRadius}rem`,
    backgroundBlendMode: blendMode,
    filter: `blur(${blur}px)`,
    height: '100%',
    width: '100%',
    maxHeight: "400px",
    maxWidth: "400px",
  };

  const handleBorderRadiusChange =(e)=>{
    setBorderRadius(e.target.value)
  }

  const handleBlurChange =(e)=>{
    setBlur(e.target.value)
  }

  const handleColor = (bgColor, Bmode) =>{
    console.log(bgColor);
    setBackground(bgColor);
    setBlendMode(Bmode);
  }

  function copyToClipboard(e) {
    textAreaRef.current.select();
    document.execCommand('copy');
    setCopySuccess('Copied!');
    setTimeout(() => {
      setCopySuccess('Copy CSS code');
    }, 3000);
  };
  

  return (
    <main className={`min-h-screen h-full md:p-20 p-4 md:flex flex-col md:overflow-hidden overflow-x-hidden bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-700 via-gray-900 to-black`}>
        <div className={` flex flex-grow rounded-2xl `}>
          <div className="flex flex-grow sm:flex-row flex-col rounded-2xl gap-6">
            <div className="md:w-[380px] flex flex-col p-4 bg-opacity-25 rounded-2xl  backdrop-blur-3xl bg-slate-600 text-white border border-slate-700">
              <div className="h-full  p-5 overflow-y-auto flex flex-col item-start justify-start rounded-tl-2xl rounded-bl-2xl">
                <div className="mb-2">
                  <label>Presets</label>
                  <div className="w-full grid grid-cols-6 gap-2 mt-3">
                    {gredentColor &&
                      gredentColor.map((item, i) => (
                        <div key={i} className="col-span-1 aspect-square ">
                        <button type="button" className="w-full aspect-square rounded-lg relative overflow-hidden border-2  border-white  border-opacity-40 transition duration-100 hover:border-opacity-100 backface">
                          <div className="w-[16px] h-[16px] absolute inset-0 z-10 flex items-center justify-center text-[12px] text-white font-semibold">{i+1}</div>
                          <div className="w-full h-full object-cover object-center blur-[5px] scale-[1.5] cursor-pointer" onClick={()=>handleColor(item.gradient, item.backgroundBlendMode)} style={{background: item.gradient ,backgroundBlendMode: item.backgroundBlendMode}}></div>
                        </button>
                      </div>
                      ))
                    }
                  </div>
                </div>
                <div className="relative pt-1">
                  <label htmlFor="customRange1" className="form-label">Blur</label>
                  <div className="flex items-center justify-start gap-2 h-10">
                    <input type="range" value={blur}  onChange={handleBlurChange} name="range_blur" className="w-full h-1  appearance-none rounded-md bg-white bg-opacity-5 border border-slate-700" />
                    <div className="numstyle  flex items-center  justify-center h-full gap-2  relative  rounded-md  overflow-hidden">
                      <input type="number" name="blur" min="0" max="100" step="1" value={blur} className="font-medium text-sm p-3 w-16 h-full flex items-center justify-start rounded-md bg-white bg-opacity-5 border border-slate-700 outline-none focus:outline-none w-[72px]" />  
                     </div>
                  </div>
                </div>

                <div className="relative pt-1">
                  <label htmlFor="customRange1" className="form-label">Border radius</label>
                  <div className="flex items-center justify-start gap-2 h-10">
                    <input type="range" name="range_border_radius" onChange={handleBorderRadiusChange} value={borderRadius} className="w-full h-1  appearance-none rounded-md bg-white bg-opacity-5 border border-slate-700" />
                    <div className="numstyle  flex items-center  justify-center h-full gap-2  relative  rounded-md  overflow-hidden">
                      <input type="number" name="border_radius" min="0" max="25" step="1" value={borderRadius} className="font-medium text-sm p-3 w-16 h-full flex items-center justify-start rounded-md bg-white bg-opacity-5 border border-slate-700 outline-none focus:outline-none w-[72px]" />  
                     </div>
                  </div>
                </div>

                <div className="mt-4 flex-1 flex flex-col items-start justify-start rounded-xl pb-4 overflow-hidden">
                  <textarea ref={textAreaRef} defaultValue={css} className="w-full h-full flex-1 text-sm focus:border-none focus:outline-none p-2 rounded-xl resize-none scroll-small overflow-y-auto bg-transparent  bg-white bg-opacity-5"></textarea>
                </div>

                <button type="button" onClick={copyToClipboard} className=" w-full text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-5">{copySuccess}</button>
              </div>
            </div>
            <div className="flex-1 h-full min-h-screen flex items-center justify-center border border-slate-700 rounded-2xl">
              <div style={blobstyle}></div>
            </div>
          </div>
      </div>
    </main>
  );
};

export default GradientBlobGenerator2;
