"use client"
import { useEffect, useState } from 'react';
import { UAParser } from 'ua-parser-js';
import DeviceDetector from 'device-detector-js';

// Define the type for uaInfo state
interface DeviceInfo {
  type: string;
  brand: string;
  model: string;
}
interface UAInfo {
  browser: UAParser.IBrowser;
  cpu: UAParser.ICPU;
  device: DeviceInfo;
  engine: UAParser.IEngine;
  os: UAParser.IOS & { platform: string }; // Extend the type to include platform
  ua: string;
}

const InfoDevice = () => {
  const [uaInfo, setUaInfo] = useState<UAInfo | null>(null);

  useEffect(() => {
    const parser = new UAParser();
    const deviceDetector = new DeviceDetector();

    // Parse the user agent string
    const userAgent = navigator.userAgent;

    const parsedDevice = deviceDetector.parse(userAgent);
    const device: DeviceInfo = {
      type: parsedDevice.device?.type || 'unknown',
      brand: parsedDevice.device?.brand || 'unknown',
      model: parsedDevice.device?.model || 'unknown',
    };

    const osInfo = parser.getOS();

    // Determine platform
    let platform = 'unknown';
    if (userAgent.includes('Win64')) {
      platform = 'x64';
    } else if (userAgent.includes('Macintosh') && userAgent.includes('Intel')) {
      platform = 'Intel Mac OS X';
    } else if (userAgent.includes('Macintosh') && (userAgent.includes('ARM') || userAgent.includes('AppleWebKit'))) {
      platform = 'ARM Mac OS X';
    }

    const uaData: UAInfo = {
      browser: parser.getBrowser(),
      cpu: parser.getCPU(),
      device: device,
      engine: parser.getEngine(),
      os: { ...osInfo, platform },
      ua: parser.getUA(),
    };

    setUaInfo(uaData);
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
