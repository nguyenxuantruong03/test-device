"use client"
import { useEffect, useState } from 'react';
import { UAParser } from 'ua-parser-js';
import DeviceDetector from 'device-detector-js';

// Define the type for uaInfo state
interface UAInfo {
  browser: UAParser.IBrowser;
  cpu: UAParser.ICPU;
  device: any; // Update the type for device
  engine: UAParser.IEngine;
  os: UAParser.IOS;
  ua: string;
}

const InfoDevice = () => {
  const [uaInfo, setUaInfo] = useState<UAInfo | null>(null);

  useEffect(() => {
    const parser = new UAParser();
    const deviceDetector = new DeviceDetector();

    // Parse the user agent string
    const userAgent = navigator.userAgent;
    
    const uaData = {
      browser: parser.getBrowser(),
      cpu: parser.getCPU(),
      device: deviceDetector.parse(userAgent), // Get device info using device-detector-js
      engine: parser.getEngine(),
      os: parser.getOS(),
      ua: parser.getUA(),
    };

    // Debugging log
    console.log('User Agent Data:', uaData);

    setUaInfo(uaData as any);
  }, []);

  if (!uaInfo) return <div>Loading...</div>;

  return (
    <div>
      <h1>User Agent Information</h1>
      <pre>{JSON.stringify(uaInfo, null, 2)}</pre>
    </div>
  );
};

export default InfoDevice;
