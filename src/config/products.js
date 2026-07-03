/**
 * Per-product launch configuration.
 * Toggle `showLaunchApp` to true on launch day — no page changes required.
 */
export const productLaunchConfig = {
  crewpilot: {
    showLaunchApp: false,
    launchAppUrl: 'https://app.nexorasystems.ca',
  },
};

export function getProductLaunchConfig(productKey) {
  return productLaunchConfig[productKey] ?? { showLaunchApp: false, launchAppUrl: '' };
}
