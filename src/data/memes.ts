export interface Meme {
  id: string;
  title: string;
  imageSrc: string;
  altText: string;
}

export interface MemeBacklogItem {
  id: string;
  title: string;
  description: string;
  status: 'In Progress' | 'Planned' | 'Queued';
  targetCategory?: string;
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

export const MEME_PORTING_BACKLOG: MemeBacklogItem[] = [
  {
    id: 'backlog-1',
    title: 'Jack & Jill Rotation Roulette',
    description: 'When you step onto the floor and realize you got paired with the pro who watched you mess up in the workshop.',
    status: 'In Progress',
    targetCategory: 'Competitions'
  },
  {
    id: 'backlog-2',
    title: 'Late Night Social Dancing at 4 AM',
    description: 'Telling yourself "just one more dance" when the sunrise social is starting and your feet stopped feeling pain two hours ago.',
    status: 'In Progress',
    targetCategory: 'Social Floor'
  },
  {
    id: 'backlog-3',
    title: 'Counting 1-2-3&4-5&6 in Real Life',
    description: 'Accidentally triple-stepping while walking through the grocery store aisle when a good acoustic track comes on.',
    status: 'Planned',
    targetCategory: 'Daily Life'
  },
  {
    id: 'backlog-4',
    title: 'The DJ Slow Blues vs Acoustic Contemporary Dilemma',
    description: 'When you gear up for a dramatic acoustic pop hit and the DJ drops a 60 BPM acoustic blues track.',
    status: 'Planned',
    targetCategory: 'Music & Timing'
  },
  {
    id: 'backlog-5',
    title: 'Pro-Am Hair & Makeup Crunch',
    description: 'Trying to do a 6-step hair routine in a shared hotel bathroom with 4 roommates in 15 minutes before prelims.',
    status: 'Queued',
    targetCategory: 'Event Life'
  }
];
