import React, { useState } from "react";

function SystemInfoPage() {
  const [systemInfo, setSystemInfo] = useState(null);

  const handleButtonClick = () => {
    fetchSystemInfo();
  };

  const fetchSystemInfo = async () => {
    console.log("Fetching system information...");
    try {
      const response = await fetch("http://localhost:4001/get-system-info");
      const data = await response.json();
      setSystemInfo(data);
      console.log("System info data:", data);
      //   console.log(systemInfo.cpu.manufacturer);
      //   console.log(systemInfo.cpu.brand);
    } catch (error) {
      console.error("Error fetching system information:", error);
    }
  };

  return (
    <div className="system-info-page bg-gray-50 p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {/* CPU Information */}
        <div className="cpu-info bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
            CPU
          </h2>
          <p className="text-gray-600">
            <strong>Model:</strong>
            {(systemInfo?.cpu?.model &&
              (systemInfo.cpu.manufacturer === "Apple" &&
              systemInfo.cpu.brand.includes("M4 Max")
                ? "Apple Silicon"
                : systemInfo.cpu.model)) ||
              "Not available"}
          </p>
          <p className="text-gray-600">
            <strong>Speed:</strong> {systemInfo?.cpu?.speed || "Not available"}
          </p>
          <p className="text-gray-600">
            <strong>Total Cores:</strong>{" "}
            {systemInfo?.cpu?.cores || "Not available"}
          </p>
          <p className="text-gray-600">
            <strong>Performance Cores:</strong>{" "}
            {systemInfo?.cpu?.performanceCores || "Not available"}
          </p>
          <p className="text-gray-600">
            <strong>Efficiency Cores:</strong>{" "}
            {systemInfo?.cpu?.efficiencyCores || "Not available"}
          </p>

          {/* Cache Information */}
          <p className="text-gray-600">
            <strong>L1 Cache (Data):</strong>{" "}
            {systemInfo?.cpu?.cache?.l1d
              ? `${systemInfo.cpu.cache.l1d} KB`
              : "Not available"}
          </p>
          <p className="text-gray-600">
            <strong>L1 Cache (Instruction):</strong>{" "}
            {systemInfo?.cpu?.cache?.l1i
              ? `${systemInfo.cpu.cache.l1i} KB`
              : "Not available"}
          </p>
          <p className="text-gray-600">
            <strong>L2 Cache:</strong>{" "}
            {systemInfo?.cpu?.cache?.l2
              ? `${systemInfo.cpu.cache.l2} KB`
              : "Not available"}
          </p>
          <p className="text-gray-600">
            <strong>L3 Cache:</strong>{" "}
            {systemInfo?.cpu?.cache?.l3
              ? `${systemInfo.cpu.cache.l3} KB`
              : "Not available"}
          </p>
        </div>

        {/* GPU Information */}
        <div className="gpu-info bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">GPU</h2>
          <p className="text-gray-600">
            <strong>Model:</strong>{" "}
            {systemInfo?.gpu?.controllers?.[0]?.model || "Not available"}
          </p>
          <p className="text-gray-600">
            <strong>Vendor:</strong>{" "}
            {systemInfo?.gpu?.controllers?.[0]?.vendor || "Not available"}
          </p>
          <p className="text-gray-600">
            <strong>VRAM:</strong>{" "}
            {systemInfo?.gpu?.controllers?.[0]?.vram || "Not available"}
          </p>
          <p className="text-gray-600">
            <strong>GPU Cores:</strong>{" "}
            {systemInfo?.gpu?.controllers?.[0]?.cores || "Not available"}
          </p>
          <p className="text-gray-600">
            <strong>Bus:</strong>{" "}
            {systemInfo?.gpu?.controllers?.[0]?.bus || "Not available"}
          </p>
          <p className="text-gray-600">
            <strong>External:</strong>{" "}
            {systemInfo?.gpu?.controllers?.[0]?.external ? "Yes" : "No"}
          </p>
        </div>

        {/* RAM Information */}
        <div className="ram-info bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">RAM</h2>
          <p className="text-gray-600">
            <strong>Total RAM:</strong>{" "}
            {(systemInfo?.ram?.total / (1024 * 1024 * 1024)).toFixed(2)} GB
          </p>
          <p className="text-gray-600">
            <strong>Used RAM:</strong>{" "}
            {(systemInfo?.ram?.used / (1024 * 1024 * 1024)).toFixed(2)} GB
          </p>
          <p className="text-gray-600">
            <strong>Free RAM:</strong>{" "}
            {(systemInfo?.ram?.free / (1024 * 1024 * 1024)).toFixed(2)} GB
          </p>
          <p className="text-gray-600">
            <strong>Active RAM:</strong>{" "}
            {(systemInfo?.ram?.active / (1024 * 1024 * 1024)).toFixed(2)} GB
          </p>
          <p className="text-gray-600">
            <strong>Available RAM:</strong>{" "}
            {(systemInfo?.ram?.available / (1024 * 1024 * 1024)).toFixed(2)} GB
          </p>
          <p className="text-gray-600">
            <strong>Buffers:</strong>{" "}
            {(systemInfo?.ram?.buffers / (1024 * 1024)).toFixed(2)} MB
          </p>
          <p className="text-gray-600">
            <strong>Cached:</strong>{" "}
            {(systemInfo?.ram?.cached / (1024 * 1024)).toFixed(2)} MB
          </p>
          <p className="text-gray-600">
            <strong>Slab:</strong>{" "}
            {(systemInfo?.ram?.slab / (1024 * 1024)).toFixed(2)} MB
          </p>
          <p className="text-gray-600">
            <strong>Buffer Cache:</strong>{" "}
            {(systemInfo?.ram?.buffcache / (1024 * 1024 * 1024)).toFixed(2)} GB
          </p>
          <p className="text-gray-600">
            <strong>Swap Total:</strong>{" "}
            {(systemInfo?.ram?.swaptotal / (1024 * 1024 * 1024)).toFixed(2)} GB
          </p>
          <p className="text-gray-600">
            <strong>Swap Used:</strong>{" "}
            {(systemInfo?.ram?.swapused / (1024 * 1024 * 1024)).toFixed(2)} GB
          </p>
          <p className="text-gray-600">
            <strong>Swap Free:</strong>{" "}
            {(systemInfo?.ram?.swapfree / (1024 * 1024 * 1024)).toFixed(2)} GB
          </p>
          <p className="text-gray-600">
            <strong>Writeback:</strong>{" "}
            {systemInfo?.ram?.writeback || "Not available"}
          </p>
          <p className="text-gray-600">
            <strong>Dirty:</strong> {systemInfo?.ram?.dirty || "Not available"}
          </p>
        </div>

        {/* Storage Information */}
        <div className="storage-info bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Storage</h2>
          <p className="text-gray-600">
            <strong>Device:</strong>{" "}
            {systemInfo?.storage?.[0]?.name || "Not available"}
          </p>
          <p className="text-gray-600">
            <strong>Type:</strong>{" "}
            {systemInfo?.storage?.[0]?.type || "Not available"}
          </p>
          <p className="text-gray-600">
            <strong>Vendor:</strong>{" "}
            {systemInfo?.storage?.[0]?.vendor || "Not available"}
          </p>
          <p className="text-gray-600">
            <strong>Size:</strong>
            {systemInfo?.storage?.[0]?.size
              ? `${(systemInfo.storage[0].size / 1024 / 1024 / 1024).toFixed(
                  2
                )} GB`
              : "Not available"}
          </p>
          <p className="text-gray-600">
            <strong>Interface Type:</strong>{" "}
            {systemInfo?.storage?.[0]?.interfaceType || "Not available"}
          </p>
          <p className="text-gray-600">
            <strong>Firmware Revision:</strong>{" "}
            {systemInfo?.storage?.[0]?.firmwareRevision || "Not available"}
          </p>
          <p className="text-gray-600">
            <strong>SMART Status:</strong>{" "}
            {systemInfo?.storage?.[0]?.smartStatus || "Not available"}
          </p>
          <p className="text-gray-600">
            <strong>Serial Number:</strong>{" "}
            {systemInfo?.storage?.[0]?.serialNum || "Not available"}
          </p>
        </div>

        {/* Operating System Information */}
        <div className="os-info bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Operating System
          </h2>

          <p className="text-gray-600">
            <strong>Platform:</strong>{" "}
            {systemInfo?.os?.platform || "Not available"}
          </p>
          <p className="text-gray-600">
            <strong>Distribution:</strong>{" "}
            {systemInfo?.os?.distro || "Not available"}
          </p>
          <p className="text-gray-600">
            <strong>Release:</strong>{" "}
            {systemInfo?.os?.release || "Not available"}
          </p>
          <p className="text-gray-600">
            <strong>Codename:</strong>{" "}
            {systemInfo?.os?.codename || "Not available"}
          </p>
          <p className="text-gray-600">
            <strong>Kernel:</strong> {systemInfo?.os?.kernel || "Not available"}
          </p>
          <p className="text-gray-600">
            <strong>Architecture:</strong>{" "}
            {systemInfo?.os?.arch || "Not available"}
          </p>
          <p className="text-gray-600">
            <strong>Hostname:</strong>{" "}
            {systemInfo?.os?.hostname || "Not available"}
          </p>
          <p className="text-gray-600">
            <strong>FQDN:</strong> {systemInfo?.os?.fqdn || "Not available"}
          </p>
          <p className="text-gray-600">
            <strong>Codepage:</strong>{" "}
            {systemInfo?.os?.codepage || "Not available"}
          </p>
          <p className="text-gray-600">
            <strong>Logofile:</strong>{" "}
            {systemInfo?.os?.logofile || "Not available"}
          </p>
          <p className="text-gray-600">
            <strong>Serial:</strong> {systemInfo?.os?.serial || "Not available"}
          </p>
          <p className="text-gray-600">
            <strong>Build:</strong> {systemInfo?.os?.build || "Not available"}
          </p>
          <p className="text-gray-600">
            <strong>Service Pack:</strong>{" "}
            {systemInfo?.os?.servicepack || "Not available"}
          </p>
          <p className="text-gray-600">
            <strong>UEFI Support:</strong> {systemInfo?.os?.uefi ? "Yes" : "No"}
          </p>
        </div>

        {/* Network Information */}
        <div className="network-info bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Network Information
          </h2>
          {/* <p className="text-gray-600"><strong>IP Address:</strong> {systemInfo?.network?.ipAddress || 'Not available'}</p>
          <p className="text-gray-600"><strong>MAC Address:</strong> {systemInfo?.network?.macAddress || 'Not available'}</p> */}
        </div>
      </div>

      {/* Get System Information Button */}
      <div className="text-center mt-8">
        <button
          onClick={handleButtonClick}
          className="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out"
        >
          Get Your Laptop System Information
        </button>
      </div>
    </div>
  );
}

export default SystemInfoPage;
