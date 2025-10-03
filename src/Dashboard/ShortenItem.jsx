import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { FaExternalLinkAlt, FaRegCalendarAlt } from "react-icons/fa";
import { MdAnalytics, MdOutlineAdsClick } from "react-icons/md";
import { IoCopy } from "react-icons/io5";
import { LiaCheckSolid } from "react-icons/lia";
import api from "../assets/api/api";
import { useNavigate } from "react-router-dom";
import { useStoreContext } from "../contextApi/ContextApi";
import HashLoader from "react-spinners/HashLoader";
import Graph from "./Graph";

const ShortenItem = ({ originalUrl, shortUrl, clickCount, createdDate }) => {
  const { token } = useStoreContext();
  const navigate = useNavigate();
  const [isCopied, setIsCopied] = useState(false);
  const [selectedUrl, setSelectedUrl] = useState("");
  const [analyticToggle, setAnalyticToggle] = useState(false);
  const [loader, setLoader] = useState(false);
  const [analyticsData, setAnalyticsData] = useState([]);
  const subDomain = import.meta.env.VITE_REACT_FRONT_END_URL.replace(
    /^https?:\/\//,
    ""
  );

  const handleCopy = async () => {
    const textToCopy = `${
      import.meta.env.VITE_REACT_FRONT_END_URL
    }/s/${shortUrl}`;
    try {
      await navigator.clipboard.writeText(textToCopy);
      setIsCopied(true);

      // Balik ke "Copy" setelah 2 detik
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const analyticsHandler = (shortUrl) => {
    if (!analyticToggle) {
      setSelectedUrl(shortUrl);
    }
    setAnalyticToggle(!analyticToggle);
  };

  const fetchMyShortUrls = async () => {
    setLoader(true);
    try {
      const { data } = await api.get(
        `/api/urls/analytics/${selectedUrl}?startDate=2024-12-01T00:00:00&endDate=2025-12-01T23:59:59`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      setAnalyticsData(data);
      setSelectedUrl("");
      console.log(data);
    } catch (error) {
      navigate("/error");
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    if (selectedUrl) {
      fetchMyShortUrls();
    }
  }, [selectedUrl]);

  return (
   <div
  className="bg-white shadow-md hover:shadow-xl border border-slate-200 px-6 py-5 rounded-xl transition-all duration-300"
>
  <div className="flex sm:flex-row flex-col sm:justify-between gap-6">
    {/* URL Info */}
    <div className="flex-1 space-y-3 overflow-hidden">
      {/* Short URL */}
      <div className="flex items-center gap-2">
        <a
          href={`${import.meta.env.VITE_REACT_SUBDOMAIN}/${shortUrl}`}
          className="text-lg font-semibold text-blue-700 hover:underline truncate"
        >
          {subDomain + "/" + shortUrl}
        </a>
        <FaExternalLinkAlt className="text-blue-600 text-sm" />
      </div>

      {/* Original URL */}
      <p className="text-slate-600 text-sm truncate">{originalUrl}</p>

      {/* Stats */}
      <div className="flex flex-wrap items-center gap-6 pt-3">
        <div className="flex items-center gap-2 text-emerald-700 font-medium">
          <MdOutlineAdsClick className="text-xl" />
          <span className="text-base">{clickCount}</span>
          <span className="text-sm">
            {clickCount === 0 || clickCount === 1 ? "Click" : "Clicks"}
          </span>
        </div>

        <div className="flex items-center gap-2 text-slate-700 font-medium">
          <FaRegCalendarAlt className="text-lg" />
          <span className="text-sm">
            {dayjs(createdDate).format("MMM DD, YYYY")}
          </span>
        </div>
      </div>
    </div>

    {/* Actions */}
    <div className="flex sm:flex-col flex-row sm:items-end items-center sm:gap-3 gap-2">
      {/* Copy Button */}
      <button
        onClick={handleCopy}
        className="flex items-center gap-2 px-4 py-2 rounded-lg 
                 bg-blue-600 text-white text-sm font-medium 
                 shadow hover:bg-blue-700 hover:shadow-md 
                 transition-all duration-200"
      >
        {isCopied ? "Copied" : "Copy"}
        {isCopied ? (
          <LiaCheckSolid className="text-lg" />
        ) : (
          <IoCopy className="text-lg" />
        )}
      </button>

      {/* Analytics Button */}
      <button
        onClick={() => analyticsHandler(shortUrl)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg 
                   bg-rose-600 text-white text-sm font-medium 
                   shadow hover:bg-rose-700 hover:shadow-md 
                   transition-all duration-200"
      >
        Analytics
        <MdAnalytics className="text-lg" />
      </button>
    </div>
  </div>

  {/* Analytics Section */}
  <div
    className={`${
      analyticToggle ? "flex" : "hidden"
    } border-t mt-6 pt-6 w-full relative min-h-[350px]`}
  >
    {loader ? (
      <div className="flex flex-col justify-center items-center w-full gap-3">
        <HashLoader color="#1E3A8A" size={50} />
        <p className="text-slate-500 text-sm">Fetching your analytics...</p>
      </div>
    ) : analyticsData.length === 0 ? (
      <div className="absolute inset-0 flex flex-col justify-center items-center px-4 text-center">
        <h1 className="text-slate-800 font-bold text-lg sm:text-xl mb-2">
          No Data For This Time Period
        </h1>
        <p className="text-slate-600 text-sm sm:text-base max-w-md">
          Share your short link to view where your engagements are coming from.
        </p>
      </div>
    ) : (
      <Graph graphData={analyticsData} />
    )}
  </div>
</div>

  );
};

export default ShortenItem;
