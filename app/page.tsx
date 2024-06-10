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
  "iPhone14,1": "iPhone 13",
  "iPhone14,2": "iPhone 13 Mini",
  "iPhone14,3": "iPhone 13 Pro",
  "iPhone14,4": "iPhone 13 Pro Max",
  "iPhone15,1": "iPhone 14",
  "iPhone15,2": "iPhone 14 Pro",
  "iPhone15,3": "iPhone 14 Pro Max",
  "iPhone16,1": "iPhone 15",
  "iPhone16,2": "iPhone 15 Pro",
  "iPhone16,3": "iPhone 15 Pro Max",

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
  "iPad12,1": "iPad (9th generation)",
  "iPad12,2": "iPad (9th generation)",
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
  "iPad11,1": "iPad mini 5",
  "iPad11,2": "iPad mini 5",
  "iPad14,1": "iPad mini 6",
  "iPad14,2": "iPad mini 6",
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
  // iPad Pro (tiếp tục)
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
  "MacBookPro18,1": "MacBook Pro (13-inch, 2023, M2)",
  "MacBookPro18,2": "MacBook Pro (13-inch, 2023, M2)",
  "MacBookPro18,3": "MacBook Pro (14-inch, 2023, M2)",
  "MacBookPro18,4": "MacBook Pro (14-inch, 2023, M2)",
  "MacBookPro18,5": "MacBook Pro (16-inch, 2023, M2)",
  "MacBookPro18,6": "MacBook Pro (16-inch, 2023, M2)",
  "MacBookPro19,1": "MacBook Pro (13-inch, 2024, M3)",
  "MacBookPro19,2": "MacBook Pro (13-inch, 2024, M3)",
  "MacBookPro19,3": "MacBook Pro (14-inch, 2024, M3)",
  "MacBookPro19,4": "MacBook Pro (14-inch, 2024, M3)",
  "MacBookPro19,5": "MacBook Pro (16-inch, 2024, M3)",
  "MacBookPro19,6": "MacBook Pro (16-inch, 2024, M3)",
  "MacBookAir10,1": "MacBook Air (Retina, 13-inch, 2022, M2)",
  "MacBookAir10,2": "MacBook Air (Retina, 13-inch, 2022, M2)",
  "MacBookAir10,3": "MacBook Air (Retina, 13-inch, 2022, M3)",
  "MacBookAir10,4": "MacBook Air (Retina, 13-inch, 2022, M3)",
};

const samsungDeviceLookup = {
  // Galaxy S series
  "SM-G960": "Samsung Galaxy S9",
  "SM-G965": "Samsung Galaxy S9+",
  "SM-G970": "Samsung Galaxy S10e",
  "SM-G973": "Samsung Galaxy S10",
  "SM-G975": "Samsung Galaxy S10+",
  "SM-G977": "Samsung Galaxy S10 5G",
  "SM-G981": "Samsung Galaxy S20",
  "SM-G986": "Samsung Galaxy S20+",
  "SM-G988": "Samsung Galaxy S20 Ultra",
  "SM-G990": "Samsung Galaxy S21",
  "SM-G996": "Samsung Galaxy S21+",
  "SM-G998": "Samsung Galaxy S21 Ultra",
  "SM-G220": "Samsung Galaxy S22",
  "SM-G225": "Samsung Galaxy S22+",
  "SM-G230": "Samsung Galaxy S22 Ultra",
  "SM-G900": "Samsung Galaxy S23",
  "SM-G905": "Samsung Galaxy S23+",
  "SM-G910": "Samsung Galaxy S23 Ultra",
  "SM-G915": "Samsung Galaxy S24",
  "SM-G920": "Samsung Galaxy S24+",
  "SM-G925": "Samsung Galaxy S24 Ultra",

  // Galaxy Note series
  "SM-N900": "Samsung Galaxy Note 3",
  "SM-N910": "Samsung Galaxy Note 4",
  "SM-N920": "Samsung Galaxy Note 5",
  "SM-N930": "Samsung Galaxy Note 7",
  "SM-N950": "Samsung Galaxy Note 8",
  "SM-N960": "Samsung Galaxy Note 9",
  "SM-N970": "Samsung Galaxy Note 10",
  "SM-N975": "Samsung Galaxy Note 10+",
  "SM-N976": "Samsung Galaxy Note 10+ 5G",
  "SM-N770": "Samsung Galaxy Note 10 Lite",
  "SM-N980": "Samsung Galaxy Note 20",
  "SM-N985": "Samsung Galaxy Note 20 Ultra",
  "SM-N986": "Samsung Galaxy Note 20 Ultra 5G",

  // Galaxy A series (cũ)
  "SM-A015": "Samsung Galaxy A01",
  "SM-A025": "Samsung Galaxy A02s",
  "SM-A035": "Samsung Galaxy A03",
  "SM-A145": "Samsung Galaxy A14",
  "SM-A155": "Samsung Galaxy A15",
  "SM-A235": "Samsung Galaxy A23",
  "SM-A305": "Samsung Galaxy A30",
  "SM-A315": "Samsung Galaxy A31",
  "SM-A325": "Samsung Galaxy A32",
  "SM-A326": "Samsung Galaxy A32 5G",
  "SM-A335": "Samsung Galaxy A33",
  "SM-A345": "Samsung Galaxy A34",
  "SM-A355": "Samsung Galaxy A35",
  "SM-A425": "Samsung Galaxy A42",
  "SM-A435": "Samsung Galaxy A43",
  "SM-A515": "Samsung Galaxy A51",
  "SM-A525": "Samsung Galaxy A52",
  "SM-A526": "Samsung Galaxy A52 5G",
  "SM-A535": "Samsung Galaxy A53",
  "SM-A545": "Samsung Galaxy A54",
  "SM-A625": "Samsung Galaxy A62",
  "SM-A635": "Samsung Galaxy A63",
  "SM-A705": "Samsung Galaxy A70",
  "SM-A715": "Samsung Galaxy A71",
  "SM-A725": "Samsung Galaxy A72",
  "SM-A726": "Samsung Galaxy A72 5G",
  "SM-A805": "Samsung Galaxy A80",
  "SM-A925": "Samsung Galaxy A92",
  "SM-A014": "Samsung Galaxy A04",
  "SM-A024": "Samsung Galaxy A02",
  "SM-A034": "Samsung Galaxy A03",
  "SM-A044": "Samsung Galaxy A04s",
  "SM-A054": "Samsung Galaxy A05",
  "SM-A054S": "Samsung Galaxy A05s",
  "SM-A445": "Samsung Galaxy A44",
  "SM-A455": "Samsung Galaxy A45",
  "SM-A555": "Samsung Galaxy A55",
  "SM-A655": "Samsung Galaxy A65",
  "SM-A655G": "Samsung Galaxy A65 5G",
  "SM-A755": "Samsung Galaxy A75",
  "SM-A755G": "Samsung Galaxy A75 5G",
  "SM-A755F": "Samsung Galaxy A75 5G",
  "SM-A855": "Samsung Galaxy A85",
  "SM-A855G": "Samsung Galaxy A85 5G",
  "SM-A855F": "Samsung Galaxy A85 5G",
  "SM-A955": "Samsung Galaxy A95",
  "SM-A955G": "Samsung Galaxy A95 5G",
  "SM-A955F": "Samsung Galaxy A95 5G",

  // Galaxy Z series
  "SM-F900": "Samsung Galaxy Fold",
  "SM-F700": "Samsung Galaxy Z Flip",
  "SM-F711": "Samsung Galaxy Z Flip 5G",
  "SM-F916": "Samsung Galaxy Z Fold 2",
  "SM-F926": "Samsung Galaxy Z Fold 2 5G",
  "SM-F707": "Samsung Galaxy Z Flip 3",
  "SM-F711G": "Samsung Galaxy Z Flip 3 5G",
  "SM-F710": "Samsung Galaxy Z Flip 4",
  "SM-F710F": "Samsung Galaxy Z Flip 4 5G",
  "SM-F915": "Samsung Galaxy Z Fold 4",
  "SM-F915F": "Samsung Galaxy Z Fold 4 5G",
  "SM-F720": "Samsung Galaxy Z Flip 5",
  "SM-F720F": "Samsung Galaxy Z Flip 5 5G",
  "SM-F925": "Samsung Galaxy Z Fold 5",
  "SM-F925F": "Samsung Galaxy Z Fold 5 5G",

  // Galaxy M series
  "SM-M105": "Samsung Galaxy M10",
  "SM-M205": "Samsung Galaxy M20",
  "SM-M305": "Samsung Galaxy M30",
  "SM-M405": "Samsung Galaxy M40",
  "SM-M515": "Samsung Galaxy M51",
  "SM-M425": "Samsung Galaxy M42 5G",
  "SM-M315": "Samsung Galaxy M31",
  "SM-M317": "Samsung Galaxy M31s",
  "SM-M215": "Samsung Galaxy M21",
  "SM-M215F": "Samsung Galaxy M21 5G",
  "SM-M225": "Samsung Galaxy M22",
  "SM-M225F": "Samsung Galaxy M22 5G",
  "SM-M325": "Samsung Galaxy M32",
  "SM-M325F": "Samsung Galaxy M32 5G",
  "SM-M525": "Samsung Galaxy M52 5G",
  "SM-M625": "Samsung Galaxy M62",
  "SM-M625F": "Samsung Galaxy M62 5G",
  "SM-M715": "Samsung Galaxy M71",
  "SM-M715F": "Samsung Galaxy M71 5G",
  "SM-M725": "Samsung Galaxy M72",
  "SM-M725F": "Samsung Galaxy M72 5G",
  "SM-M815": "Samsung Galaxy M81",
  "SM-M815F": "Samsung Galaxy M81 5G",
  "SM-M825": "Samsung Galaxy M82",
  "SM-M825F": "Samsung Galaxy M82 5G",
  "SM-M915": "Samsung Galaxy M91",
  "SM-M915F": "Samsung Galaxy M91 5G",
  "SM-M925": "Samsung Galaxy M92",
  "SM-M925F": "Samsung Galaxy M92 5G",
  "SM-M1015": "Samsung Galaxy M101",
  "SM-M1015F": "Samsung Galaxy M101 5G",

  // Galaxy Tab series
  "SM-T860": "Samsung Galaxy Tab S6",
  "SM-T865": "Samsung Galaxy Tab S6 LTE",
  "SM-T870": "Samsung Galaxy Tab S7",
  "SM-T875": "Samsung Galaxy Tab S7+",
  "SM-T970": "Samsung Galaxy Tab S7 FE",
  "SM-T976": "Samsung Galaxy Tab S7+ 5G",
  "SM-T860G": "Samsung Galaxy Tab S6 5G",
  "SM-T975": "Samsung Galaxy Tab S8",
  "SM-T976C": "Samsung Galaxy Tab S8+",
  "SM-T979": "Samsung Galaxy Tab S8 Ultra",
  "SM-T870G": "Samsung Galaxy Tab S8+ 5G",
  "SM-T975G": "Samsung Galaxy Tab S9",
  "SM-T976D": "Samsung Galaxy Tab S9 Ultra",
  "SM-T976B": "Samsung Galaxy Tab S9 Ultra 5G",
  "SM-T860F": "Samsung Galaxy Tab S9 5G",
  "SM-T975H": "Samsung Galaxy Tab S9+ 5G",
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

    if (parsedDevice.device?.brand === "Samsung") {
      const modelCode = parsedDevice.device
        ?.model as keyof typeof samsungDeviceLookup;
      fullModel =
        samsungDeviceLookup[modelCode] || modelCode || "unknown Samsung device";
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
