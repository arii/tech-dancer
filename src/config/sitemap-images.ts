export interface StaticRouteImage {
  routePath: string;
  imgLoc: string;
  title: string;
  caption: string;
}

export const STATIC_ROUTE_IMAGES: StaticRouteImage[] = [
  // Home Route
  {
    routePath: '/',
    imgLoc: '/assets/dancer_hero.webp',
    title: 'West Coast Swing Social Dancer',
    caption: 'Hero illustration of West Coast Swing dancers on the floor.'
  },
  {
    routePath: '/',
    imgLoc: '/assets/roboticist_hero.webp',
    title: 'Ariel Anders PhD Roboticist',
    caption: 'Hero illustration of Ariel Anders in robotics engineering laboratory.'
  },

  // About / Profile Route
  {
    routePath: '/about',
    imgLoc: '/assets/comp_analysis_hero.webp',
    title: 'Ariel Anders Profile Photo',
    caption: 'Ariel Anders, PhD - Roboticist & WCS Dancer'
  },
  {
    routePath: '/about',
    imgLoc: '/assets/first_comp.jpg',
    title: 'First WCS Competition',
    caption: 'Ariel Anders performing a West Coast Swing extension during a competition'
  },
  {
    routePath: '/about',
    imgLoc: '/assets/glow_bunny.jpg',
    title: 'Late Night Social LED Bunny',
    caption: 'Ariel Anders wearing a creative LED light-up bunny costume'
  },
  {
    routePath: '/about',
    imgLoc: '/assets/mad_jam_ari.jpg',
    title: 'MADjam Precision & Groove',
    caption: 'Ariel Anders social dancing at the MADjam West Coast Swing convention'
  },
  {
    routePath: '/about',
    imgLoc: '/assets/monterey.jpg',
    title: 'Monterey Swingfest',
    caption: 'Ariel Anders on stage at a West Coast Swing event in Monterey'
  },
  {
    routePath: '/about',
    imgLoc: '/assets/www_ari.jpg',
    title: 'Weekend Social Dance',
    caption: 'Ariel Anders demonstrating athletic connection in a high-energy social dance session'
  }
];
