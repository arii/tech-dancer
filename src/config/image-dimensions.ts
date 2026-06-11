/**
 * Centralized image dimension and aspect ratio tokens for the design system.
 * These ensure consistent layout stability and responsive delivery across components.
 */

export const IMAGE_DIMENSIONS = {
  HOME: {
    HERO_GUIDE: {
      ASPECT_RATIO: '420 / 600',
      DESKTOP_WIDTH: 420,
      DESKTOP_HEIGHT: 600,
    },
    EVENT_GUIDE: {
      ASPECT_RATIO: '260 / 200',
      THUMBNAIL_WIDTH: 358,
      THUMBNAIL_HEIGHT: 176,
    },
    GEAR_SHELF: {
      ASPECT_RATIO: '1 / 1',
      DESKTOP_TILE: 400,
      MOBILE_TILE: 112,
    },
    LATEST_POSTS: {
      ASPECT_RATIO: '72 / 56',
      WIDTH: 72,
      HEIGHT: 56,
    }
  }
} as const;
