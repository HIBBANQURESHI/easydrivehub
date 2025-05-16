// lib/pricing.ts
export const VEHICLE_PRICING = {
  car: {
    'startup-package': 4999,
    'promotional-package': 7499,
    'premium-package': 9999
  },
  bike: {
    'basic-report': 4999,
    'pro-rider': 7499,
    'premium-package': 9999
  },
  truck: {
    'basic-report': 5499,
    'commercial-pro': 7999,
    'fleet-package': 11999
  },
  van: {
    'basic-van': 5299,
    'commercial-pro': 7299,
    'fleet-package': 11499
  }
};

export type VehicleType = keyof typeof VEHICLE_PRICING;
export type PackageType<T extends VehicleType> = keyof typeof VEHICLE_PRICING[T];