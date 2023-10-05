import React, { useEffect, useState } from "react";
import axios from "axios";
import { api_url } from "../Constants";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Label } from "recharts";

const A4Page = ({ setLoading }) => {
  const [data, setData] = useState([]);

  const date = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  useEffect(() => {
    axios.get(api_url).then((res) => {
      setLoading(false);
      // considering only year and burglary arrest
      setData(
        res.data.data.map((d) => ({
          year: d.data_year,
          Arrests: d.Burglary,
        }))
      );
    });
  }, [setLoading]);
  return (
    <div
      id="chart"
      style={{
        width: "208mm",
        height: "295mm",
        margin: "0 auto",
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: " 5mm 5mm 5mm 5mm ",
        // padding : 'top right bottom left'
        boxSizing: "border-box",
      }}
    >
      {
        // ==============================
        // HEADER SECTION
        // ==============================
      }
      <div className="flex flex-col justify-between h-fit">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row items-center">
            <img src="./images/logo.jpg" alt="logo" className="w-7 h-7" />
            <h1 className="ml-2 text-xl">
              <span>RealAssist.AI</span>
            </h1>
          </div>
          <h1 className="text-sm font-extrabold">
            <span>123 Main Street, Dover, NH 03820-4667</span>
          </h1>
        </div>
        <div className="bg-gradient-to-l from-[#68d9fb] to-[#275cf6] w-full h-1 mt-1"></div>
      </div>

      <div id="content" className="flex items-end h-full">
        <div className="flex flex-col w-full ">
          <div className="flex flex-row justify-center items-center">
            <img
              src="./images/location.png"
              alt="crime-logo"
              className="w-7 h-7"
            />
            <h1 className="mr-4 font-semibold">Crime</h1>
            <div className="bg-gradient-to-l from-[#68d9fb] to-[#275cf6] w-full h-1 mt-1"></div>
          </div>

          <div className="flex flex-col bg-[#f0f2f3] rounded-2xl w-full mt-4 mb-2 items-center">
            <div className="bg-[#e9eefa] w-full h-full p-4 rounded-tl-2xl rounded-tr-2xl">
              <h1 className="text-[#2f61f6] text-sm font-bold w-full">
                Burglary
              </h1>
            </div>

            <LineChart
              id="chart"
              width={700}
              height={200}
              className=" rounded-xl mt-4 bg-white mb-4"
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              isAnimationActive={false}
            >
              <CartesianGrid strokeWidth={"2"} vertical={false} />
              {/* Disable vertical grid lines */}
              <XAxis
                dataKey="year"
                axisLine={{ stroke: "#bbc2d9", strokeWidth: 2 }}
                tick={{
                  fill: "#646e96",
                }}
                fontSize={12}
              />
              <YAxis
                domain={[0, 1000]}
                axisLine={{ stroke: "#bbc2d9", strokeWidth: 2 }}
                tick={{
                  fill: "#646e96",
                }}
                fontSize={12}
              >
                <Label
                  angle={-90}
                  value="Arrests"
                  position="insideLeft"
                  style={{ textAnchor: "middle", fill: "#000" }}
                />
              </YAxis>
              <Line
                type="linear"
                dataKey="Arrests"
                dot={false}
                strokeWidth={3}
                stroke="#2f61f6"
                isAnimationActive={false}
              />
            </LineChart>
          </div>
        </div>
      </div>
      <div id="footer">
        <div className="bg-gradient-to-l from-[#68d9fb] to-[#275cf6] w-full h-1 mt-1"></div>
        <div className="flex flex-row justify-between mt-1">
          <h1 className="text-[#2f61f6] text-sm font-extrabold">
            Report generated on {date}
          </h1>
          <h1>
            <span className="text-black text-sm font-extrabold">
              RealAssist Property Report|Page 1
            </span>
            <span className="text-gray-500   text-sm font-extrabold">
              {" "}
              of 25
            </span>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default A4Page;
