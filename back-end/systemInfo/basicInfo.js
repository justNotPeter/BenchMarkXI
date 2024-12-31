const si = require('systeminformation');

const retrieveSystemInfo = async () => {
  try {
    const cpu = await si.cpu(); 
    const gpu = await si.graphics(); 
    const ram = await si.mem(); 
    const storage = await si.diskLayout(); 
    const os = await si.osInfo(); 
    const network = await si.networkInterfaces(); 

    return {
      cpu,        
      gpu,        
      ram,        
      storage,    
      os,         
      network,    
    };
  } catch (error) {
    console.error('Error retrieving system information:', error);
    return null;
  }
};

module.exports = { retrieveSystemInfo };
