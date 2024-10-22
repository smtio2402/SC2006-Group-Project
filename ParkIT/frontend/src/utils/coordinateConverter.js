import proj4 from 'proj4';

// Define the SVY21 projection
proj4.defs(
  'EPSG:3414',
  '+proj=tmerc +lat_0=1.366666667 +lon_0=103.8333333 +k=1 +x_0=28001.642 +y_0=38744.572 +ellps=WGS84 +units=m +no_defs'
);

export function convertSVY21toWGS84(x, y) {
  const [lon, lat] = proj4('EPSG:3414', 'EPSG:4326', [x, y]);
  return { lat, lon };
}
