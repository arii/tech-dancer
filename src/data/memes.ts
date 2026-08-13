export interface Meme {
  id: string;
  title: string;
  imageSrc: string;
  altText: string;
}

export const MEMES_DATA: Meme[] = [
  {
    id: '9c2lc9',
    title: 'The WCS Slot',
    imageSrc: '/assets/memes/9c2lc9.jpg',
    altText: 'A meme labeled "WCS IS A SLOTTED DANCE. THE SLOT: |" showing a highly wavy, winding path representing how dancers actually drift during a dance.',
  },
  {
    id: '9buj8i',
    title: 'WCS Spectating Preference',
    imageSrc: '/assets/memes/9buj8i.jpg',
    altText: 'A Tuxedo Winnie the Pooh meme. Normal Pooh represents "Watch the show sitting on the ballroom floor". Fancy Tuxedo Pooh represents "Watch the livestream from your hotel bedroom".',
  },
  {
    id: 'a0hmu1',
    title: 'West Coast Swing Connection',
    imageSrc: '/assets/memes/a0hmu1.jpg',
    altText: 'A chaotic, colorful flowchart of lines representing the complex connection and tension network of West Coast Swing.',
  },
  {
    id: '9hz3zx',
    title: 'Workshop vs Social Floor',
    imageSrc: '/assets/memes/9hz3zx.jpg',
    altText: 'A dog vs werewolf meme. The weak dog labeled "TRYING THE PATTERN ON THE SOCIAL FLOOR" and the terrifying werewolf labeled "TRYING THE PATTERN DURING THE WORKSHOP".',
  },
  {
    id: '9hz3pj',
    title: 'Safe from Dips and Drops',
    imageSrc: '/assets/memes/9hz3pj.jpg',
    altText: 'A Facebook-style alert labeled "Marked Safe From Big" with "DIPS, DUCKS, AND DROPS" underneath.',
  },
];
