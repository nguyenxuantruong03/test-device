"use client";
import { useEffect, useState } from "react";
import { UAParser } from "ua-parser-js";
import DeviceDetector from "device-detector-js";

const appleDeviceLookup = {
  // iPhone
  "iPhone1,1": "iPhone",
  "iPhone1,2": "iPhone 3G",
  "iPhone2,1": "iPhone 3GS",
  "iPhone3,1": "iPhone 4",
  "iPhone3,2": "iPhone 4",
  "iPhone3,3": "iPhone 4",
  "iPhone4,1": "iPhone 4S",
  "iPhone5,1": "iPhone 5",
  "iPhone5,2": "iPhone 5",
  "iPhone5,3": "iPhone 5c",
  "iPhone5,4": "iPhone 5c",
  "iPhone6,1": "iPhone 5s",
  "iPhone6,2": "iPhone 5s",
  "iPhone7,1": "iPhone 6 Plus",
  "iPhone7,2": "iPhone 6",
  "iPhone8,1": "iPhone 6s",
  "iPhone8,2": "iPhone 6s Plus",
  "iPhone8,4": "iPhone SE (1st generation)",
  "iPhone9,1": "iPhone 7",
  "iPhone9,2": "iPhone 7 Plus",
  "iPhone9,3": "iPhone 7",
  "iPhone9,4": "iPhone 7 Plus",
  "iPhone10,1": "iPhone 8",
  "iPhone10,2": "iPhone 8 Plus",
  "iPhone10,3": "iPhone X",
  "iPhone10,4": "iPhone 8",
  "iPhone10,5": "iPhone 8 Plus",
  "iPhone10,6": "iPhone X",
  "iPhone11,2": "iPhone XS",
  "iPhone11,4": "iPhone XS Max",
  "iPhone11,6": "iPhone XS Max",
  "iPhone11,8": "iPhone XR",
  "iPhone12,1": "iPhone 11",
  "iPhone12,3": "iPhone 11 Pro",
  "iPhone12,5": "iPhone 11 Pro Max",
  "iPhone12,8": "iPhone SE (2nd generation)",
  "iPhone13,1": "iPhone 12 Mini",
  "iPhone13,2": "iPhone 12",
  "iPhone13,3": "iPhone 12 Pro",
  "iPhone13,4": "iPhone 12 Pro Max",
  // iPad
  "iPad1,1": "iPad",
  "iPad2,1": "iPad 2",
  "iPad2,2": "iPad 2",
  "iPad2,3": "iPad 2",
  "iPad2,4": "iPad 2",
  "iPad3,1": "iPad (3rd generation)",
  "iPad3,2": "iPad (3rd generation)",
  "iPad3,3": "iPad (3rd generation)",
  "iPad3,4": "iPad (4th generation)",
  "iPad3,5": "iPad (4th generation)",
  "iPad3,6": "iPad (4th generation)",
  "iPad6,11": "iPad (5th generation)",
  "iPad6,12": "iPad (5th generation)",
  "iPad7,5": "iPad (6th generation)",
  "iPad7,6": "iPad (6th generation)",
  "iPad7,11": "iPad (7th generation)",
  "iPad7,12": "iPad (7th generation)",
  "iPad11,6": "iPad (8th generation)",
  "iPad11,7": "iPad (8th generation)",
  // iPad
  "iPad2,5": "iPad mini",
  "iPad2,6": "iPad mini",
  "iPad2,7": "iPad mini",
  "iPad4,4": "iPad mini 2",
  "iPad4,5": "iPad mini 2",
  "iPad4,6": "iPad mini 2",
  "iPad4,7": "iPad mini 3",
  "iPad4,8": "iPad mini 3",
  "iPad4,9": "iPad mini 3",
  "iPad5,1": "iPad mini 4",
  "iPad5,2": "iPad mini 4",
  // iPad mini 5
  "iPad11,1": "iPad mini (5th generation)",
  "iPad11,2": "iPad mini (5th generation)",
  // iPad mini 6
  "iPad14,1": "iPad mini (6th generation)",
  "iPad14,2": "iPad mini (6th generation)",
  // iPad Pro
  "iPad6,3": "iPad Pro (9.7-inch)",
  "iPad6,4": "iPad Pro (9.7-inch)",
  "iPad6,7": "iPad Pro (12.9-inch)",
  "iPad6,8": "iPad Pro (12.9-inch)",
  "iPad7,1": "iPad Pro (12.9-inch, 2nd generation)",
  "iPad7,2": "iPad Pro (12.9-inch, 2nd generation)",
  "iPad7,3": "iPad Pro (10.5-inch)",
  "iPad7,4": "iPad Pro (10.5-inch)",
  "iPad8,1": "iPad Pro (11-inch)",
  "iPad8,2": "iPad Pro (11-inch)",
  "iPad8,3": "iPad Pro (11-inch)",
  "iPad8,4": "iPad Pro (11-inch)",
  "iPad8,5": "iPad Pro (12.9-inch, 3rd generation)",
  "iPad8,6": "iPad Pro (12.9-inch, 3rd generation)",
  "iPad8,7": "iPad Pro (12.9-inch, 3rd generation)",
  "iPad8,8": "iPad Pro (12.9-inch, 3rd generation)",
  "iPad8,9": "iPad Pro (11-inch, 2nd generation)",
  "iPad8,10": "iPad Pro (11-inch, 2nd generation)",
  "iPad8,11": "iPad Pro (12.9-inch, 4th generation)",
  "iPad8,12": "iPad Pro (12.9-inch, 4th generation)",
  "iPad13,4": "iPad Pro (11-inch, 3rd generation)",
  "iPad13,5": "iPad Pro (11-inch, 3rd generation)",
  "iPad13,6": "iPad Pro (11-inch, 3rd generation)",
  "iPad13,7": "iPad Pro (11-inch, 3rd generation)",
  "iPad13,8": "iPad Pro (12.9-inch, 5th generation)",
  "iPad13,9": "iPad Pro (12.9-inch, 5th generation)",
  "iPad13,10": "iPad Pro (12.9-inch, 5th generation)",
  "iPad13,11": "iPad Pro (12.9-inch, 5th generation)",
  // iPad Air
  "iPad4,1": "iPad Air",
  "iPad4,2": "iPad Air",
  "iPad4,3": "iPad Air",
  "iPad5,3": "iPad Air 2",
  "iPad5,4": "iPad Air 2",
  "iPad11,3": "iPad Air (3rd generation)",
  "iPad11,4": "iPad Air (3rd generation)",
  "iPad13,1": "iPad Air (4th generation)",
  "iPad13,2": "iPad Air (4th generation)",
  // Mac
  "MacBook10,1": "MacBook (12-inch, Early 2015)",
  "MacBookAir8,1": "MacBook Air (Retina, 13-inch, 2018)",
  "MacBookAir8,2": "MacBook Air (Retina, 13-inch, 2018)",
  "MacBookAir9,1": "MacBook Air (Retina, 13-inch, 2020)",
  "MacBookAir9,2": "MacBook Air (Retina, 13-inch, 2020)",
  "MacBookPro15,1": "MacBook Pro (15-inch, 2018)",
  "MacBookPro15,2": "MacBook Pro (15-inch, 2018)",
  "MacBookPro15,3": "MacBook Pro (15-inch, 2018)",
  "MacBookPro15,4": "MacBook Pro (15-inch, 2018)",
  "MacBookPro15,5": "MacBook Pro (15-inch, 2018)",
  "MacBookPro15,6": "MacBook Pro (15-inch, 2018)",
  "MacBookPro15,7": "MacBook Pro (15-inch, 2018)",
  "MacBookPro16,1": "MacBook Pro (16-inch, 2019)",
  "MacBookPro16,2": "MacBook Pro (16-inch, 2019)",
  "MacBookPro16,3": "MacBook Pro (13-inch, 2020)",
  "MacBookPro16,4": "MacBook Pro (13-inch, 2020)",
  "MacBookPro16,5": "MacBook Pro (13-inch, 2020)",
  "MacBookPro16,6": "MacBook Pro (13-inch, 2020)",
  "MacBookPro16,7": "MacBook Pro (13-inch, 2020)",
  "MacBookPro17,1": "MacBook Pro (13-inch, 2021, M1)",
  "MacBookPro17,2": "MacBook Pro (13-inch, 2021, M1)",
  "MacBookPro17,3": "MacBook Pro (13-inch, 2021, M1)",
  "MacBookPro17,4": "MacBook Pro (14-inch, 2021, M1 Pro)",
  "MacBookPro17,5": "MacBook Pro (14-inch, 2021, M1 Max)",
  "MacBookPro17,6": "MacBook Pro (16-inch, 2021, M1 Pro)",
  "MacBookPro17,7": "MacBook Pro (16-inch, 2021, M1 Max)",
  // MacBook Pro M2
  "MacBookPro18,1": "MacBook Pro (13-inch, 2023, M2)",
  "MacBookPro18,2": "MacBook Pro (13-inch, 2023, M2)",
  "MacBookPro18,3": "MacBook Pro (14-inch, 2023, M2)",
  "MacBookPro18,4": "MacBook Pro (14-inch, 2023, M2)",
  "MacBookPro18,5": "MacBook Pro (16-inch, 2023, M2)",
  "MacBookPro18,6": "MacBook Pro (16-inch, 2023, M2)",
  // MacBook Pro M3
  "MacBookPro19,1": "MacBook Pro (13-inch, 2024, M3)",
  "MacBookPro19,2": "MacBook Pro (13-inch, 2024, M3)",
  "MacBookPro19,3": "MacBook Pro (14-inch, 2024, M3)",
  "MacBookPro19,4": "MacBook Pro (14-inch, 2024, M3)",
  "MacBookPro19,5": "MacBook Pro (16-inch, 2024, M3)",
  "MacBookPro19,6": "MacBook Pro (16-inch, 2024, M3)",
  // MacBook Air
  "MacBookAir10,1": "MacBook Air (Retina, 13-inch, 2022, M2)",
  "MacBookAir10,2": "MacBook Air (Retina, 13-inch, 2022, M2)",
  "MacBookAir10,3": "MacBook Air (Retina, 13-inch, 2022, M3)",
  "MacBookAir10,4": "MacBook Air (Retina, 13-inch, 2022, M3)",
};

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

    let fullModel = parsedDevice.device?.model || "unknown";

    if (parsedDevice.device?.brand === "Apple") {
      const modelCode = parsedDevice.device
        ?.model as keyof typeof appleDeviceLookup;
      fullModel =
        appleDeviceLookup[modelCode] || modelCode || "unknown Apple device";
    } else {
      fullModel =
        `${parsedDevice.device?.brand} ${parsedDevice.device?.model}` ||
        "unknown device";
    }

    const device: DeviceInfo = {
      type: parsedDevice.device?.type || "unknown",
      brand: parsedDevice.device?.brand || "unknown",
      model: parsedDevice.device?.model || "unknown",
      fullModel: fullModel,
    };

    const osInfo = parser.getOS();

    let platform = "unknown";
    if (userAgent.includes("Win64")) {
      platform = "x64";
    } else if (userAgent.includes("Macintosh") && userAgent.includes("Intel")) {
      platform = "Intel Mac OS X";
    } else if (
      userAgent.includes("Macintosh") &&
      (userAgent.includes("ARM") || userAgent.includes("AppleWebKit"))
    ) {
      platform = "ARM Mac OS X";
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
