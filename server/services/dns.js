const dns = require('dns').promises;

class DNSService {
  constructor() {
    this.cache = new Map();
    this.TTL = 3600; // 1 heure
  }

  getCachedResult(domain) {
    if (this.cache.has(domain)) {
      const {result, timestamp} = this.cache.get(domain);
      if (Date.now() - timestamp < this.TTL * 1000) {
        return result;
      }
      this.cache.delete(domain);
    }
    return null;
  }

  async resolve(domain) {
    const cached = this.getCachedResult(domain);
    if (cached) {
      return cached;
    }

    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Timeout DNS')), 10000);
    });

    const addresses = await Promise.race([
      dns.resolve4(domain),
      timeoutPromise
    ]);

    this.cache.set(domain, { 
      result: addresses, 
      timestamp: Date.now() 
    });

    return addresses;
  }
}

module.exports = new DNSService();