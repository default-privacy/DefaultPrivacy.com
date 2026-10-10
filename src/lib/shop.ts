// The shop (separate deployment, dp-shop repo) — launch-gated wiring on the hub side.
// Flip SHOP_LIVE to true ONLY when shop.defaultprivacy.com is actually serving:
// it adds the header nav item, the per-listing disclosure line on stocked vendors,
// and the shop section on /transparency, in one place.
export const SHOP_LIVE = false

export const SHOP_URL = "https://shop.defaultprivacy.com"

// Directory slugs of vendors the shop currently stocks. Keep in lockstep with
// dp-shop/src/lib/catalog.ts (products whose status is "live").
export const STOCKED_VENDOR_SLUGS: readonly string[] = []

export function isStockedVendor(slug: string): boolean {
  return SHOP_LIVE && STOCKED_VENDOR_SLUGS.includes(slug)
}
