/**
 * Bakery Le Petit Pain — Opportunity Report
 *
 * Content is based on publicly available listings and reviews as of research
 * for this foundation build. Claims are intentionally conservative.
 * If something could not be verified, it is not stated as fact.
 */

/** @type {import('../../lib/reportSchema').OpportunityReport} */
export const lePetitPainReport = {
  slug: 'le-petit-pain',

  meta: {
    businessName: 'Le Petit Pain',
    legalName: 'Bakery Le Petit Pain',
    industry: 'Bakery & Café',
    city: 'Hawkesbury',
    region: 'Ontario',
    country: 'Canada',
    address: '245 Main Street East, Hawkesbury, ON K6A 1A1',
    phone: '(613) 632-4486',
    tagline: 'A beloved Main Street bakery and lunch destination',
    preparedBy: 'Nexora Systems',
    preparedFor: 'Bakery Le Petit Pain',
    dateLabel: 'Opportunity Report',
    sources: [
      'Google Business listings and public review aggregations',
      'Facebook page (facebook.com/LePetitPain)',
      'TripAdvisor public reviews',
      'Public restaurant directories (Restaurant Guru, menu listing sites)',
    ],
  },

  theme: {
    accent: '#B08D57',
    accentSoft: 'rgba(176, 141, 87, 0.14)',
    heroImage:
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=2000&q=80',
    heroImageAlt: 'Fresh artisan bread loaves on a wooden bakery surface',
    atmosphere: 'atmosphere-bakery',
  },

  intro: {
    eyebrow: 'Business Opportunity Report',
    title: 'Understanding Le Petit Pain before recommending anything',
    lede:
      'This report is a thoughtful look at how Bakery Le Petit Pain appears online today — based on publicly available information — and where a modern digital presence could quietly support the business you already run well.',
    body: [
      'It is not a sales pitch disguised as analysis. It is a demonstration of how Nexora Systems approaches local businesses: listen first, observe carefully, and only then show what becomes possible.',
      'Everything here is intended to educate, highlight genuine strengths, and open a conversation about digital growth — at your pace.',
    ],
  },

  presence: {
    title: 'Current online presence',
    lede:
      'From the public web, Le Petit Pain is discoverable primarily through review platforms and social channels rather than a dedicated business website.',
    summary:
      'Customers can find the bakery through Google and Facebook, read encouraging reviews, and see that the shop is an established Main Street destination. What is less clear online is a single owned destination that presents the full story — fresh baking, lunch service, daily rhythm, and how to engage beyond a social feed.',
    channels: [
      {
        id: 'facebook',
        label: 'Facebook',
        status: 'Active',
        summary:
          'Public directories commonly point to the Facebook page (facebook.com/LePetitPain) as the primary web destination for the business.',
        url: 'https://www.facebook.com/LePetitPain',
      },
      {
        id: 'google',
        label: 'Google Business Profile',
        status: 'Active',
        summary:
          'The bakery appears in Google results with location details, hours references, and a substantial set of public customer ratings.',
      },
      {
        id: 'website',
        label: 'Dedicated website',
        status: 'Not found',
        summary:
          'No standalone business website was identified during public research. Several directories list Facebook in place of a website.',
      },
      {
        id: 'reviews',
        label: 'Public reviews',
        status: 'Strong signal',
        summary:
          'Customer feedback across Google, Facebook, and TripAdvisor consistently highlights fresh baking, lunch offerings, and a welcoming local atmosphere.',
      },
      {
        id: 'directories',
        label: 'Online directories',
        status: 'Present',
        summary:
          'The business is listed on multiple public restaurant and local directories with address, phone, and review excerpts.',
      },
      {
        id: 'photos',
        label: 'Public photos',
        status: 'Available',
        summary:
          'Food and interior photos appear across review and listing platforms, giving prospective customers a partial visual sense of the bakery.',
      },
    ],
    ratings: [
      {
        platform: 'Google',
        score: 4.6,
        scoreLabel: '4.6 / 5',
        countLabel: 'Approx. 149 reviews',
        note: 'Aggregated from public listing sources. Review counts can change over time.',
      },
      {
        platform: 'Facebook',
        score: 4.5,
        scoreLabel: '4.5 / 5',
        countLabel: 'Approx. 55 reviews',
        note: 'Based on publicly referenced Facebook rating summaries.',
      },
      {
        platform: 'TripAdvisor',
        score: 4.5,
        scoreLabel: '4.5 / 5',
        countLabel: 'Approx. 68 reviews',
        note: 'Public TripAdvisor rating referenced by listing aggregators.',
      },
    ],
  },

  strengths: {
    title: 'What’s working well',
    lede:
      'Before talking about gaps, it is important to recognize what Le Petit Pain already does strongly in the eyes of the public.',
    items: [
      {
        id: 'reputation',
        title: 'A strong local reputation',
        body: 'Public ratings across major platforms sit in a clearly positive range, signalling trust from people who have already visited.',
        detail: 'That kind of reputation is difficult to manufacture — and worth building around.',
        icon: 'star',
      },
      {
        id: 'fresh-baking',
        title: 'Fresh baking at the centre of the story',
        body: 'Reviewers repeatedly mention fresh bread, pastries, desserts, and the inviting aroma of a working bakery.',
        detail: 'This is a distinctive, sensory brand advantage.',
        icon: 'bread',
      },
      {
        id: 'lunch',
        title: 'A valued lunch destination',
        body: 'Many customers describe Le Petit Pain as a go-to for light, satisfying lunches — soups, sandwiches, quiche, and salad combinations.',
        detail: 'Daily specials are part of how regulars experience the shop.',
        icon: 'cafe',
      },
      {
        id: 'hospitality',
        title: 'Warmth and approachability',
        body: 'Friendly service and a cozy atmosphere appear often in public feedback, reinforcing the feeling of a community bakery rather than a generic café.',
        icon: 'heart',
      },
      {
        id: 'loyalty',
        title: 'Loyal and returning customers',
        body: 'Multiple reviews describe habitual visits, bringing guests from out of town, or recommending the bakery as a local gem.',
        detail: 'That loyalty is a foundation for digital growth, not a substitute for it.',
        icon: 'people',
      },
      {
        id: 'value',
        title: 'Perceived value',
        body: 'Customers frequently note reasonable pricing and solid value for fresh, homemade food — an important trust signal for new visitors researching where to go.',
        icon: 'spark',
      },
    ],
  },

  opportunities: {
    title: 'Missed opportunities',
    lede:
      'These are not criticisms of the bakery. They are places where the current online setup may be asking Facebook and listings to do more work than they should.',
    items: [
      {
        id: 'no-website',
        title: 'No dedicated website to own the first impression',
        body: 'When someone searches for the bakery, they may land on a listing or social page rather than a calm, branded home that tells your story on your terms.',
        detail: 'Why it matters: an owned website becomes the stable centre of your digital presence — hours, offerings, atmosphere, and next steps in one place.',
        icon: 'globe',
      },
      {
        id: 'facebook-dependence',
        title: 'Heavy dependence on Facebook',
        body: 'Facebook is useful for updates, but it is not equally comfortable for every customer, and algorithms decide who sees what.',
        detail: 'Why it matters: people who are not active on Facebook — or who simply want quick answers — can miss the best of what you offer.',
        icon: 'share',
      },
      {
        id: 'daily-specials',
        title: 'Daily specials are hard to discover remotely',
        body: 'Public reviews make clear that soup, sandwich, and quiche specials are part of the lunch rhythm — yet there is no obvious always-on place online to check “what’s fresh today.”',
        detail: 'Why it matters: changing inventory and daily specials reward a page designed for quick updates.',
        icon: 'calendar',
      },
      {
        id: 'product-showcase',
        title: 'Limited online showcase for baking and desserts',
        body: 'Photos exist across platforms, but they are fragmented. A curated presentation of breads, pastries, cakes, and chocolates would help new customers arrive already excited.',
        detail: 'Why it matters: beautiful food deserves a gallery that feels as intentional as the baking itself.',
        icon: 'image',
      },
      {
        id: 'catering-events',
        title: 'No clear online path for larger orders or catering interest',
        body: 'Even without assuming a specific catering program, bakeries with cakes, desserts, and lunch fare often receive inquiries for gatherings. Public channels do not currently present a simple, dedicated path for that interest.',
        detail: 'Why it matters: a focused page turns quiet curiosity into clear inquiries.',
        icon: 'gift',
      },
      {
        id: 'local-seo',
        title: 'SEO and discoverability left mostly to listings',
        body: 'Directory pages and social profiles help, but they rarely rank or persuade as effectively as a well-structured local website with clear service and location signals.',
        detail: 'Why it matters: people searching for bakery, lunch, cakes, or “near me” in Hawkesbury should find you with confidence.',
        icon: 'search',
      },
      {
        id: 'mobile',
        title: 'Mobile experience depends on third-party apps',
        body: 'Customers on phones currently navigate Facebook or Google rather than a fast, mobile-first site built around the questions they actually ask.',
        detail: 'Why it matters: most local discovery happens on a phone, often in the moment.',
        icon: 'phone',
      },
    ],
  },

  recommendations: {
    title: 'Recommendations',
    lede:
      'Each recommendation below is practical, local-business-minded, and designed to amplify what customers already love about Le Petit Pain.',
    items: [
      {
        id: 'modern-site',
        title: 'A modern, mobile-first website',
        body: 'Create a warm, elegant site that introduces the bakery, showcases food, and makes hours, location, and contact effortless.',
        detail: 'Expected benefit: a trustworthy first impression you control — not one rented from a social platform.',
        icon: 'layout',
      },
      {
        id: 'fresh-today',
        title: 'A “Fresh Today” section',
        body: 'Add a simple daily or weekly update area for specials, featured loaves, or lunch highlights — designed so updates can take under a minute.',
        detail: 'Expected benefit: regulars and newcomers can check what’s available without calling during a busy lunch rush.',
        icon: 'steam',
      },
      {
        id: 'catering-page',
        title: 'A catering & special orders showcase',
        body: 'Provide a clear page for cakes, platters, or group orders with photos, guidance, and an easy inquiry path.',
        detail: 'Expected benefit: better exposure for higher-consideration orders that do not fit neatly into a Facebook post.',
        icon: 'gift',
      },
      {
        id: 'photo-story',
        title: 'Photography presented with intention',
        body: 'Organize existing and new photos into a calm visual story — bakery case, breads, lunch plates, desserts — rather than scattered uploads.',
        detail: 'Expected benefit: stronger appetite appeal and a more premium perception before someone walks through the door.',
        icon: 'image',
      },
      {
        id: 'local-seo',
        title: 'Local SEO foundations',
        body: 'Pair the new site with clear location pages, consistent business information, and content that matches how locals actually search.',
        detail: 'Expected benefit: improved discoverability for bakery, lunch, and celebration searches in Hawkesbury and nearby communities.',
        icon: 'search',
      },
      {
        id: 'simple-updates',
        title: 'An update workflow measured in minutes',
        body: 'Design the site so staff can refresh a special or notice quickly — without needing a developer for everyday changes.',
        detail: 'Expected benefit: the website stays alive and useful, matching the rhythm of a real bakery.',
        icon: 'clock',
      },
    ],
  },

  impact: {
    title: 'Potential business impact',
    lede:
      'No inflated percentages. No promises we cannot keep. Just the kinds of practical improvements a clearer digital presence can support.',
    items: [
      {
        id: 'visibility',
        title: 'Better visibility when people are deciding where to go',
        body: 'A dedicated site gives search engines and customers a clearer, more complete destination to evaluate.',
      },
      {
        id: 'confidence',
        title: 'Increased customer confidence',
        body: 'Polished presentation of food, atmosphere, and reviews helps first-time visitors feel sure before they arrive.',
      },
      {
        id: 'discovery',
        title: 'Easier discovery of what makes the bakery special',
        body: 'Daily specials, signature desserts, and lunch offerings become easier to understand without relying on word of mouth alone.',
      },
      {
        id: 'fewer-repeat-questions',
        title: 'Fewer repetitive phone questions',
        body: 'Hours, location, offerings, and “what’s available today” can be answered online before the lunch line forms.',
      },
      {
        id: 'changing-inventory',
        title: 'Clearer presentation of a changing menu',
        body: 'Bakeries thrive on freshness. A site can celebrate that reality instead of fighting it with a static brochure feel.',
      },
      {
        id: 'larger-orders',
        title: 'Improved exposure for cakes and larger orders',
        body: 'When celebration and group needs have a home online, interested customers have a simpler way to reach out.',
      },
    ],
  },

  preview: {
    title: 'Website preview',
    lede:
      'The strongest way to understand a modern digital presence is to experience a concept built around Le Petit Pain itself.',
    ctaLabel: 'Preview Website Concept',
    ctaTo: '/le-petit-pain/demo',
    note: 'The interactive website concept will live here. For now, this route is prepared and ready for the demo build.',
  },

  nextSteps: {
    title: 'A gentle invitation',
    body: [
      'This report exists to spark ideas — not to pressure a decision.',
      'If anything here resonates, we would be glad to walk through the website concept together, answer questions, and explore what a lightweight digital presence could look like for Le Petit Pain.',
      'If the timing is not right, that is completely fine. The bakery’s reputation is already something to be proud of. Whenever you are curious about the next layer of visibility, Nexora Systems is ready to continue the conversation.',
    ],
    closing: 'With appreciation for what you already bake into the community of Hawkesbury.',
  },

  quotes: [
    {
      id: 'q1',
      text: 'Le Petit Pain is now my go-to spot in Hawkesbury for a light lunch… The prices are competitive and the value is exceptional.',
      attribution: 'Public review',
      source: 'Menu listing / review aggregation',
    },
    {
      id: 'q2',
      text: 'Only the best bakery in town! Delicious fresh-baked bread daily, great variety of pastries and mouth-watering desserts.',
      attribution: 'Public review',
      source: 'Local directory review',
    },
    {
      id: 'q3',
      text: 'The Tanya Myre Team often stop into this bakery for sandwiches and salads at lunch. The staff is always friendly and willing to suggest their specialties of the day.',
      attribution: 'Google review excerpt',
      source: 'Publicly quoted on Restaurant Guru',
    },
  ],
}
