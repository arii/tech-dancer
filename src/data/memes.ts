export interface Meme {
  id: string;
  title: string;
  imageSrc: string;
  altText: string;
}

export const MEMES_DATA: Meme[] = [
  {
    id: '9c2lc9',
    title: 'The Slotted Dance Debate',
    imageSrc: '/assets/memes/9c2lc9.jpg',
    altText: 'WCS is a slotted dance. The slot: curves around and takes up the whole floor anyway.'
  },
  {
    id: '9buj8i',
    title: 'New Pattern Ambition',
    imageSrc: '/assets/memes/9buj8i.jpg',
    altText: 'When you learn a cool new pattern in class vs when you try to execute it on the social floor and freeze completely.'
  },
  {
    id: 'a0hmu1',
    title: 'Slotted Connection Struggles',
    imageSrc: '/assets/memes/a0hmu1.jpg',
    altText: 'Trying to maintain a perfect slotted connection when your partner wants to spin and travel everywhere.'
  },
  {
    id: '9hz3zx',
    title: 'The Perfect Song Dilemma',
    imageSrc: '/assets/memes/9hz3zx.jpg',
    altText: 'Hearing the perfect West Coast Swing song start to play right after you just sat down to rest your feet.'
  },
  {
    id: '9hz3pj',
    title: 'The Workshop Illusion',
    imageSrc: '/assets/memes/9hz3pj.jpg',
    altText: 'Understanding the mechanics perfectly when the pro explains it vs when the music starts and your body forgets everything.'
  }
];
