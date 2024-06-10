"use client";
import { useEffect, useState } from 'react';
import { IDevice, UAParser } from 'ua-parser-js';
import DeviceDetector from 'device-detector-js';

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
  os: UAParser.IOS & { platform: string };
  ua: string;
}

const InfoDevice = () => {
  const [uaInfo, setUaInfo] = useState<UAInfo | null>(null);
  const [uaParser,setuaParser] = useState<IDevice>();

  useEffect(() => {
    const parser = new UAParser();
    const deviceDetector = new DeviceDetector();

    const userAgent = navigator.userAgent;
    const parsedDevice = deviceDetector.parse(userAgent);
    const device: DeviceInfo = {
      type: parsedDevice.device?.type || 'unknown',
      brand: parsedDevice.device?.brand || 'unknown',
      model: parsedDevice.device?.model || 'unknown',
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
    const parseruA = new UAParser(uaData.ua);
    const test= parseruA.getDevice()
    setuaParser(test)
    setUaInfo(uaData);
  }, []);

  if (!uaInfo) return <div>Loading...</div>;

  return (
    <div>
        <div>Test</div>
        <h1>{uaParser?.type} {uaParser?.vendor} {uaParser?.model}</h1>
      {/* <h1>User Agent Information</h1>
      <div>
        <h2>Browser</h2>
        <p>Name: {uaInfo.browser.name}</p>
        <p>Version: {uaInfo.browser.version}</p>
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
      </div>
      <div>
        <h2>Engine</h2>
        <p>Name: {uaInfo.engine.name}</p>
        <p>Version: {uaInfo.engine.version}</p>
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
      </div> */}
    </div>
  );
};

export default InfoDevice;
