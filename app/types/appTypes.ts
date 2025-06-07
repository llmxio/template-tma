export interface User {
  id: string;
  name: string;
}

/**
 * Represents a radio station with its properties
 */
export interface RadioStation {
  src: string;
  title: string;
  artwork?: string;
  id?: string;
  genre?: string;
}

/**
 * Represents a song being played on the radio
 */
export interface RadioSong {
  artist: string;
  title: string;
  fullTitle: string;
  artwork?: string;
}

/**
 * Default radio station configuration used across the app
 */
export const DEFAULT_STATION: RadioStation = {
  id: "balrockru",
  title: "Hot Shop",
  genre: "non-format music",
  src: "https://listen.myrh.ru/balrockru",
  artwork: "/logobot.png",
};

/**
 * Default fallback image when track artwork can't be loaded
 */
export const DEFAULT_ARTWORK =
  "https://billing.radioheart.ru/public_pages/assets/img/noimage.jpg";
