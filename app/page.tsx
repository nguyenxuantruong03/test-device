"use client";
import { useEffect, useState } from 'react';
import { UAParser } from 'ua-parser-js';
import DeviceDetector from 'device-detector-js';

interface DeviceInfo {
  type: string;
  brand: string;
  model: string;
  fullModel: string;
}

interface UAInfo {
  browser: UAParser.IBrowser;
  cpu: UAParser.ICPU;
  device: DeviceInfo;
  engine: UAParser.IEngine;
  os: UAParser.IOS & { platform: string };
  ua: string;
}

const InfoDevice = () => {
  const [uaInfo, setUaInfo] = useState<UAInfo | null>(null);

  useEffect(() => {
    const parser = new UAParser();
    const deviceDetector = new DeviceDetector();

    const userAgent = navigator.userAgent;
    const parsedDevice = deviceDetector.parse(userAgent);

    let fullModel = parsedDevice.device?.model || 'unknown';

    // Handle detailed model information for various devices
    if (parsedDevice.device?.brand === 'Apple') {
      if (/iPad/i.test(userAgent)) {
        const match = userAgent.match(/(iPad; CPU OS [0-9_]+)/);
        if (match && match[1]) {
          fullModel = `iPad (${match[1].replace(/_/g, '.')})`;
        }
      } else if (/iPhone/i.test(userAgent)) {
        const match = userAgent.match(/(iPhone; CPU iPhone OS [0-9_]+)/);
        if (match && match[1]) {
          fullModel = `iPhone (${match[1].replace(/_/g, '.')})`;
        }
      }
    } else if (parsedDevice.device?.brand === 'Samsung') {
      // Additional logic to get full model details for Samsung devices if needed
      fullModel = parsedDevice.device?.model || 'Samsung Device';
    } else {
      fullModel = `${parsedDevice.device?.brand} ${parsedDevice.device?.model}` || 'unknown device';
    }

    const device: DeviceInfo = {
      type: parsedDevice.device?.type || 'unknown',
      brand: parsedDevice.device?.brand || 'unknown',
      model: parsedDevice.device?.model || 'unknown',
      fullModel: fullModel,
    };

    const osInfo = parser.getOS();

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
      <div>
        <h2>Browser</h2>
        <p>Name: {uaInfo.browser.name}</p>
      </div>
      <div>
        <h2>CPU</h2>
        <p>Architecture: {uaInfo.cpu.architecture}</p>
      </div>
      <div>
        <h2>Device</h2>
        <p>Type: {uaInfo.device.type}</p>
        <p>Brand: {uaInfo.device.brand}</p>
        <p>Model: {uaInfo.device.model}</p>
        <p>Full Model: {uaInfo.device.fullModel}</p>
      </div>
      <div>
        <h2>Operating System</h2>
        <p>Name: {uaInfo.os.name}</p>
        <p>Version: {uaInfo.os.version}</p>
        <p>Platform: {uaInfo.os.platform}</p>
      </div>
      <div>
        <h2>User Agent</h2>
        <p>{uaInfo.ua}</p>
      </div>
    </div>
  );
};

export default InfoDevice;
