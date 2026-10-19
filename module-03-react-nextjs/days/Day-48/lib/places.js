export const kitchen = { lat: 9.0054, lng: 38.7636 };

const areas = {
  kality: { lat: 8.9333, lng: 38.7667 },
  stadium: { lat: 9.012, lng: 38.758 },
  kotobe: { lat: 9.04, lng: 38.8 },
  piassa: { lat: 9.035, lng: 38.75 },
};

const fallback = { lat: 9.0107, lng: 38.7612 };

export function getDeliveryPoint(area) {
  return areas[String(area || "").trim().toLowerCase()] || fallback;
}