export type MenuItem = {
  name: string;
  description: string;
  illustration: string;
  featured?: boolean;
};

export type MenuSection = {
  title: string;
  blurb: string;
  items: MenuItem[];
};

export const huckleberryFeature: MenuItem = {
  name: 'Huckleberry Milkshake',
  description: 'Wild Idaho huckleberries, real ice cream, hand-spun at the fountain. The one people drive miles for.',
  illustration: '/images/menu/huckleberry-milkshake.jpg',
  featured: true,
};

export const menuSections: MenuSection[] = [
  {
    title: 'Milkshakes',
    blurb: 'Hand-spun at the fountain with real ice cream.',
    items: [
      { name: 'Vanilla', description: 'Classic, the way it should be.', illustration: '/images/menu/vanilla-shake.jpg' },
      { name: 'Chocolate', description: 'Deep cocoa, no shortcuts.', illustration: '/images/menu/chocolate-shake.jpg' },
      { name: 'Strawberry', description: 'Real berries blended through.', illustration: '/images/menu/strawberry-shake.jpg' },
      { name: 'Malted', description: 'A nod to the original soda fountain.', illustration: '/images/menu/malted-shake.jpg' },
    ],
  },
  {
    title: 'Sundaes',
    blurb: 'Scoops, sauces, and the works.',
    items: [
      { name: 'Hot Fudge', description: 'Vanilla, fudge, whipped cream, cherry.', illustration: '/images/menu/hot-fudge.jpg' },
      { name: 'Banana Split', description: 'Three scoops, three sauces, the whole banana.', illustration: '/images/menu/banana-split.jpg' },
      { name: 'Huckleberry', description: 'Vanilla, huckleberry sauce, whipped cream.', illustration: '/images/menu/huckleberry-sundae.jpg' },
    ],
  },
  {
    title: 'Sodas & Floats',
    blurb: 'Made the old-fashioned way at the fountain.',
    items: [
      { name: 'Root Beer Float', description: 'Cold root beer, scoop of vanilla.', illustration: '/images/menu/root-beer-float.jpg' },
      { name: 'Cherry Phosphate', description: 'A genuine soda fountain throwback.', illustration: '/images/menu/cherry-phosphate.jpg' },
      { name: 'Italian Soda', description: 'Choose your flavor, pour over ice.', illustration: '/images/menu/italian-soda.jpg' },
    ],
  },
  {
    title: 'Espresso',
    blurb: 'For the morning regulars.',
    items: [
      { name: 'Drip Coffee', description: 'Hot, black, honest.', illustration: '/images/menu/drip-coffee.jpg' },
      { name: 'Latte', description: 'Espresso, steamed milk, no fuss.', illustration: '/images/menu/latte.jpg' },
      { name: 'Mocha', description: 'Espresso, chocolate, milk.', illustration: '/images/menu/mocha.jpg' },
    ],
  },
];
