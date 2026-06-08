export type Owner = {
  slug: string;
  years: string;
  ownerNames: string;
  headline: string;
  body: string;
  pullQuote?: string;
  imagePath: string;
  imageAlt: string;
  imageStyle: 'archival' | 'photo';
};

export const ownership: Owner[] = [
  {
    slug: 'holmes',
    years: '1950–1963',
    ownerNames: 'Harold Holmes',
    headline: 'The Victor Drug Company',
    body: 'In 1950, Harold Holmes completed construction of the Victor Drug Company. He ran it as a hub for the post-war Valley community — candy, gifts, magazines, flowers, sodas, ice cream, and a watch repair counter at the soda fountain. In 1952, he opened a movie theater next door; television closed it within a few years. Holmes worked six to seven days a week, year-round, for thirteen years before selling in 1963.',
    imagePath: '/images/archival/1950-drug-company.jpg',
    imageAlt: 'Sepia-toned archival illustration of the 1950s Victor Drug Company storefront',
    imageStyle: 'archival',
  },
  {
    slug: 'egbert',
    years: '1963–1978',
    ownerNames: 'Peggy & Tom Egbert',
    headline: 'The Egbert Trading Post',
    body: 'The Egberts renamed the store and broadened its offerings — souvenirs, gifts, variety items, plus fishing and hunting gear for the growing Valley scene. They opened Pierre\'s Playhouse community theater, which became a beloved institution. They expanded into donuts delivered to Driggs businesses and Grand Targhee skiers before selling in 1978 to pursue theater in Arizona.',
    imagePath: '/images/archival/1970-trading-post.jpg',
    imageAlt: 'Sepia-toned archival illustration of the Egbert Trading Post in the 1970s',
    imageStyle: 'archival',
  },
  {
    slug: 'kasper',
    years: '1978–1985',
    ownerNames: 'Ted & Shona Kasper',
    headline: 'The Emporium gets its name',
    body: 'The Kaspers added sporting goods and fishing gear and rebranded as the Victor Emporium — the name that stuck. Hollywood arrived briefly when portions of Continental Divide were filmed in Victor; the Kaspers famously interacted with John Belushi. They kept the fountain humming through 100–150 gallons of ice cream a week each summer before stepping away in 1985.',
    pullQuote: 'Hollywood arrived briefly when Continental Divide came through town.',
    imagePath: '/images/archival/1980-emporium.jpg',
    imageAlt: 'Sepia-toned archival illustration of the Victor Emporium soda fountain in the 1980s',
    imageStyle: 'archival',
  },
  {
    slug: 'woolstenhulme',
    years: '1985–1989',
    ownerNames: 'Rosalee Woolstenhulme',
    headline: 'Family, fountain, fishing',
    body: 'Woolstenhulme kept the Emporium name and its focus on variety and fishing gear, leaning on family help to run the business. She spent long hours scooping ice cream at the fountain — her favorite way to meet locals and travelers. After four years of long days, she decided it was time to slow down.',
    imagePath: '/images/archival/1985-fountain.jpg',
    imageAlt: 'Sepia-toned archival illustration of the soda fountain counter in the late 1980s',
    imageStyle: 'archival',
  },
  {
    slug: 'meyer',
    years: '1989–1999',
    ownerNames: 'Bob & Marilyn Meyer',
    headline: 'An international fishing destination',
    body: 'The Meyers bought the Emporium in September 1989 and leaned hard into its identity as a fishing destination, drawing anglers from across the U.S. and around the world — Japan, South America, France, Australia. They expanded the merchandise to include souvenirs, t-shirts, books, and hunting gear while keeping the iconic fountain running. They were planning the 50th anniversary celebration as they wound down.',
    imagePath: '/images/archival/1995-fishing-shop.jpg',
    imageAlt: 'Sepia-toned archival illustration of fishing gear displayed in the Emporium in the 1990s',
    imageStyle: 'archival',
  },
  {
    slug: 'keeley-ferris',
    years: '1999–2025',
    ownerNames: 'Kathryn Ferris & Kimberly Keeley',
    headline: 'A handshake on a truck hood',
    body: 'Kim and Kath had been fishing guides who stopped in most mornings for huckleberry milkshakes and licenses. When the Meyers began looking toward retirement, the two struck an informal deal and signed it on the hood of a truck at a boat ramp in Jackson. They kept the doors open year-round — shoveling the stoop, selling lunches — and never went a single day without selling ice cream in twenty-six years. Along the way, they gave dozens of valley teenagers their first jobs.',
    pullQuote: 'They never went a single day without selling ice cream in twenty-six years.',
    imagePath: '/images/archival/2010-counter.jpg',
    imageAlt: 'Sepia-toned archival illustration of the Emporium counter in the 2010s',
    imageStyle: 'archival',
  },
  {
    slug: 'zderski',
    years: '2025–present',
    ownerNames: 'Adam & Lee Zderski',
    headline: 'The next chapter',
    body: 'Originally from Melbourne, Australia, Adam and Lee landed in Teton Valley in 2019 after years of vacationing here. Their son, who had been working at the Emporium and loved it, set the purchase in motion when the business went up for sale. With backgrounds in engineering and education, they\'re committed to honoring the legacy while supporting the teenage crew who keeps the milkshake counter humming.',
    imagePath: '/images/storefront-landscape.webp',
    imageAlt: 'The Victor Emporium storefront at blue hour',
    imageStyle: 'photo',
  },
];
