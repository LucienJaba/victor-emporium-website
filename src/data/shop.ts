export type ShopTile = { label: string; image: string; alt: string };
export type ShopCategory = { id: string; title: string; blurb: string; tiles: ShopTile[] };

export const shopCategories: ShopCategory[] = [
  {
    id: 'apparel',
    title: 'Apparel',
    blurb: 'Shirts, hats, hoodies. Wear the Valley.',
    tiles: [
      { label: 'Emporium tees', image: '/images/shop/tees.webp', alt: 'Wall display of Victor Emporium t-shirts' },
      { label: 'Trucker hats', image: '/images/shop/hats.webp', alt: 'Trucker hats hanging on a wall' },
      { label: 'Hoodies', image: '/images/shop/hoodies.webp', alt: 'Folded hoodies on a shelf' },
      { label: 'Kids', image: '/images/shop/kids-apparel.webp', alt: 'Kids apparel display' },
    ],
  },
  {
    id: 'souvenirs',
    title: 'Souvenirs',
    blurb: 'Patches, postcards, magnets, mugs.',
    tiles: [
      { label: 'Magnets', image: '/images/shop/magnets.webp', alt: 'Souvenir magnets display' },
      { label: 'Postcards', image: '/images/shop/postcards.webp', alt: 'Postcard rack' },
      { label: 'Patches', image: '/images/shop/patches.webp', alt: 'Embroidered patches' },
      { label: 'Mugs', image: '/images/shop/mugs.webp', alt: 'Ceramic mugs on a shelf' },
    ],
  },
  {
    id: 'local',
    title: 'Local Goods',
    blurb: 'Jams, honey, candy, and treasures from the people next door.',
    tiles: [
      { label: 'Huckleberry jam', image: '/images/shop/jam.webp', alt: 'Huckleberry jam jars' },
      { label: 'Local honey', image: '/images/shop/honey.webp', alt: 'Local honey jars' },
      { label: 'Penny candy', image: '/images/shop/candy.webp', alt: 'Bins of penny candy' },
      { label: 'Idaho gifts', image: '/images/shop/gifts.webp', alt: 'Assorted Idaho-themed gifts' },
    ],
  },
  {
    id: 'fishing',
    title: 'Fishing & Outdoor',
    blurb: 'Licenses, flies, hats, and gear for the day on the water.',
    tiles: [
      { label: 'Fly selection', image: '/images/shop/flies.webp', alt: 'Display of fishing flies' },
      { label: 'Licenses', image: '/images/shop/licenses.webp', alt: 'Fishing license counter' },
      { label: 'Outdoor hats', image: '/images/shop/outdoor-hats.webp', alt: 'Outdoor and fishing hats' },
      { label: 'Gear basics', image: '/images/shop/gear.webp', alt: 'Basic fishing and outdoor gear shelf' },
    ],
  },
  {
    id: 'gifts',
    title: 'Gifts',
    blurb: 'Pick something up on the way out.',
    tiles: [
      { label: 'Books', image: '/images/shop/books.webp', alt: 'Local books display' },
      { label: 'Cards', image: '/images/shop/cards.webp', alt: 'Greeting cards' },
      { label: 'Toys', image: '/images/shop/toys.webp', alt: 'Small toys' },
      { label: 'Stocking stuffers', image: '/images/shop/stuffers.webp', alt: 'Stocking-stuffer-sized gifts' },
    ],
  },
];
