export interface ReviewItem {
  id: string;
  name: string;
  location?: string;
  rating: number;
  tradeTag: string;
  tradeIconType: 'plumbing' | 'home' | 'wrench' | 'install' | 'furniture';
  quote: string;
  rotation: string; // CSS rotation degree for pinned note authenticity
  screwRotation: number;
}

export const reviewsData: ReviewItem[] = [
  {
    id: 'rev-ria',
    name: 'Ria Coetzee',
    location: 'Verified Client',
    rating: 5,
    tradeTag: 'Full Home Revamp & Multi-Trade',
    tradeIconType: 'home',
    quote: 'Ryan did a revamp at my home and did everything, tiles, kitchen cupboard, electrical work, plumbing, painting, refurbished build in cupboards - he did a very professional job and the result is excellent',
    rotation: '-rotate-1',
    screwRotation: 28,
  },
  {
    id: 'rev-ashley',
    name: 'Ashley Kleynhans',
    location: 'Verified Client',
    rating: 5,
    tradeTag: 'Furniture & Assembly',
    tradeIconType: 'furniture',
    quote: 'Ryan and the Dynamic Handyman team did an awesome job assembling my furniture for me. I tried to assemble the trampoline myself, but after starting over twice and still getting it wrong, Ryan and his team saved me a lot of time and took the frustration away completely. They also assembled my outdoor dining set, and pool loungers for me. Their pricing is very competitive, their service is amazing and I will continue to use them in future and highly recommend them.',
    rotation: 'rotate-1',
    screwRotation: -42,
  },
  {
    id: 'rev-mariaan',
    name: 'Mariaan Pretorius',
    location: 'Verified Client',
    rating: 5,
    tradeTag: 'Roof Rebuild & Maintenance',
    tradeIconType: 'wrench',
    quote: "Very happy with Dynamic Handyman's workmanship. Ryan redid our Wendyhouse roof that was falling apart, and the new look makes our garden look even fancier. Will recommend his services. And will make use of them again for more projects. Before and After pics. Im a happy client.",
    rotation: '-rotate-1',
    screwRotation: 65,
  },
  {
    id: 'rev-tracy',
    name: 'Tracy Maistry',
    location: 'Verified Client',
    rating: 5,
    tradeTag: 'Bathroom Fitment & Plumbing',
    tradeIconType: 'plumbing',
    quote: 'Professional, superior service. Thank you Ryan and team for our bathroom fitment, it looks awesome.',
    rotation: 'rotate-1',
    screwRotation: -16,
  },
  {
    id: 'rev-petrus',
    name: 'Petrus van Heerden',
    location: 'Verified Client',
    rating: 5,
    tradeTag: 'Fast-Track Emergency Repairs',
    tradeIconType: 'install',
    quote: 'I had the best experience with Ryan and his team, assisted me on a very short notice and did a great job in record time. Will definitely use them again.',
    rotation: 'rotate-1',
    screwRotation: 45,
  },
  {
    id: 'rev-johan',
    name: 'Johan de Swardt',
    location: 'Verified Client',
    rating: 5,
    tradeTag: 'After-Hours Trade Service',
    tradeIconType: 'wrench',
    quote: 'Excellent service and went out of there way to assist me even after hours. Would definitely recommend them.',
    rotation: '-rotate-1',
    screwRotation: 18,
  },
  {
    id: 'rev-melissa',
    name: 'Melissa Edwards',
    location: 'Verified Client',
    rating: 5,
    tradeTag: 'Property Maintenance',
    tradeIconType: 'home',
    quote: 'Punctuality, Quality, Professionalism',
    rotation: 'rotate-1',
    screwRotation: 52,
  },
];

export const aggregateReviewSummary = {
  score: '5.0',
  stars: 5,
  countLabel: 'Rated 5.0/5 on Google',
  title: 'OVERALL RATING',
  actionLabel: 'VIEW ALL REVIEWS →',
  googleReviewsUrl: 'https://www.google.com/search?q=dynamic+handyman&ie=UTF-8#lrd=0x1e951dea742589e3:0x7545b2471eeae154,1,,,,',
};
