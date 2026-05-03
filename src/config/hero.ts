/**
 * Hero Section Configuration
 * Centralizes magic numbers and visual constants for the Hero and Particle effects.
 */

export const HERO_CONFIG = {
  // Waveform
  BAR_COUNT: 48,

  // Particles
  PARTICLE_COUNT: 60,
  PARTICLE_RADIUS_MIN: 0.4,
  PARTICLE_RADIUS_MAX: 2.2, // 0.4 + 1.8
  PARTICLE_VELOCITY_FACTOR: 0.3,
  PARTICLE_ALPHA_MIN: 0.1,
  PARTICLE_ALPHA_MAX: 0.5, // 0.1 + 0.4
  PARTICLE_HUES: [190, 270], // Cyan and Purple

  // Layout
  MOBILE_PY: 10,
  DESKTOP_PY: 20,
};
