import "../styles/globals.css";
import { useState, useEffect } from "react";
import type { AppProps } from "next/app";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const MyApp = ({ Component, pageProps }: AppProps) => {
  // next js application runs both on backend and frontend so,to make sure our apps works well.
  // this will help us to have smoother workflow in the future
  const [isSSR, setIsSSR] = useState(true);
  useEffect(() => {
    setIsSSR(false);
  }, []);
  if (isSSR) return null;
  return (
    <div>
      <Navbar />
      <div className="flex gap-6 md-20">
        <div className="h-[92vh] overflow-hidden xl:overflo-auto">
          <Sidebar />
        </div>
        <div className="m-4 flex-col gap-10 overflow-auto h-[88vh] videos flex-1">
          <Component {...pageProps} />;
        </div>
      </div>
    </div>
  );
};

export default MyApp;
