// Hardcoded data that can easily be changed during development.  No need for a MongoDB or resaving, updating records.
// Easier experimentation with schema as it evolves in early stages.  Can be loaded into MongoDB later if needsbe.

// Films
var googleM = {
  slug : 'googlem',
  title : "Google M",
  thumb: 'googlem-?.jpg',
  thumbNum: 3,
  summary: "6 Minute Short Comedy about one woman's love for her phone.",
  pages: [ 
    {
      theater: {
        poster: 'googlem-1.jpg',
        video: 'googlem-short'
      },
      cards : [
        'We made Google M when iPhones first hit the market.',
        'Our friends Max and Molly were kind enough to star with no rehearsal',
        'Lit by a few LEDs we rented for free from VER in NYC.',
        'It placed 3rd in the Bite My Flick Film Festival in Portland'
      ]
    },
    {
      credits: [
        ['Directors', 'Antonio Bonilla & Lawrence Whiteside'],
        ['Writer', 'Antonio Bonilla'],
        ['Cindy', 'Molly Ryzdel'],
        ['John', 'Max Hambleton'],
        ['Editor', 'Benadict'],
        ['Sound Design', 'Gora Faal'],
        ['Visual Effects', 'Chris Lohouse'],
        ['Script Supervisor', 'Cindy Ormondroyd']
      ]
    }
  ]
}

var pModels = {
  slug : 'pm-calendar',
  title : "Prestegious Models",
  thumb: 'pm-?.jpg',
  thumbNum: 3,
  summary: "Behind the scenes calendar photoshoot at the Velvet Lounge in NYC",
  pages: [ 
    {
      theater: {
        poster: 'pm-1.jpg',
        video: 'pm-teaser'
      },
      cards : ['Kim Lo, head of The "Prestigious Models" modeling agency in NYC, brought me in to shoot BTS on their sexy calendar shoot.',
      'The footage was included in a DVD and Web promotional material for years.']
    }
  ]
}

var aaaf = {
  slug: 'alternative-arts',
  thumb: 'necropolis-?.jpg',
  thumbNum: 3,
  title : 'Alternative Arts Association',
  summary: 'Promotional video about the multi-night Necropolis arts festival.',
  pages: [ 
    {
      theater: {
        poster: 'necropolis-2.jpg',
        video: 'necropolis-promo',
      },
      cards : ['AlternativeArts.org wanted a fun and from the heart promotional video to accompany their rebranding.']
    }
  ]
}

var fadsf = {
  slug: 'fred-astaire',
  thumb: 'fads-?.jpg',
  thumNum: 3,
  title : 'Fred Astaire Dance Portland',
  summary: 'Promotional video for the school to showcase the dances they teach.',
  pages: [ 
    {
      theater: {
        poster: 'fads-1.jpg',
        video: 'fads-promo',
      },
      cards : ['Fred Astaire wanted a video showcase of each of their 6 signature dances',
      "To go on the front page of the studio's web site"]
    }
  ]
}

var morningAfter = {
  slug: 'morning-after',
  title: "The Morning After",
  thumb: 'morning-after-?.jpg',
  thumbNum: 3,
  summary: 'Episode 3 of a 3-part web-series about love and lycanthropy',
  pages: [ 
    {
      theater: {
        poster: 'morning-after-1.jpg',
        video: 'morning-after-ep3',
      },
      cards : ['We were recruited by a young writer to reimagine her sketch comedy script as an action parody.']
    },
    {
      credits: [
        ['Directors', 'Antonio Bonilla & Lawrence Whiteside'],
        ['Writer', 'Antonio Bonilla'],
        ['Cindy', 'Molly Ryzdel'],
        ['John', 'Max Hambleton'],
        ['Editor', 'Benadict'],
        ['Sound Design', 'Gora Faal'],
        ['Visual Effects', 'Chris Lohouse'],
        ['Script Supervisor', 'Cindy Ormondroyd']
      ]
    }
  ]
}

var iNinja = {
  slug: 'ininja',
  thumb: 'ininja-?.jpg',
  thumbNum: 4,
  title : 'iNinja',
  summary: 'A 3 minute short about the secrets we keep as an international ninja assassin.',
  pages: [ 
    {
      theater: {
        poster: 'ininja-2.jpg',
        video: 'ininja-short',
      },
      cards : ['I took the On the Lot challenge and made this film, with just me and my actress.',
      'Written, shot edited and composed in 1 week']
    },
    {
      credits: [
        ['Director', 'Lawrence Whiteside'],
        ['Writer', 'Lawrence Whiteside'],
        ['Babe', 'Cecily Crow'],
        ['Babe', 'Lawrence Whiteside'],
        ['Ninja', 'Anotonio Bonilla'],
        ['Editor', 'Lawrence Whiteside'],
        ['Sound Track', 'Jake Doris']
      ]
    }
  ]
}

var coursing = {
  slug: 'coursing',
  thumb: 'coursing-?.jpg',
  thumbNum: 4,
  title : 'Coursing',
  summary: 'Our first entry into the 48-hour film festivl in Portland.  2011.',
  pages: [ 
    {
      theater: {
        poster: 'coursing-1.jpg',
        video: 'coursing-48hour',
      },
      cards : [
        'Our category was Femme Fatale.  With less than a day to prepare and a weekend to shoot and cut it.', 
        'We delivered a face-paced, action film.  Hoping Luc Besson would approve.'
      ]
    },
    {
      credits: [
        ['Directors', 'Jon Bebe'],
        ['Writer', 'Jonathan Bebe'],
        ['Assistant Director', 'Lawrence Whiteside']
      ]
    }  ]
}

var illHave = {
  slug: 'ill-have-another',
  thumb: 'illhave-?.jpg',
  thumbNum: 4,
  title : "I'll Have Another",
  summary: 'Our second try at the 48-hour film festivl in Portland.  2012.',
  pages: [ 
    {
      theater: {
        poster: 'illhave-1.jpg',
        video: 'ill-have-another-48hour',
      },
      cards : [
        'Our category was DArk Comedy.  With less than a day to prepare and a weekend to shoot and cut it.', 
        'We delivered a dark family portrait that goes too far for Wes Anderson.'
      ]
    },
    {
      credits: [
        ['Directors', 'Jon Bebe'],
        ['Writer', 'Jonathan Bebe'],
        ['Assistant Director', 'Lawrence Whiteside']
      ]
    }  
  ]
}

var americanDf = {
  slug: 'american-detour',
  title : 'American Detour',
  thumb: 'ad-?.jpg',
  thumbNum: 5,
  summary: 'Shot 3 pilot episodes for the American Detour Webseries',
  pages: [ 
    {
      theater: {
        poster: 'ad-2.jpg',
        video: 'ad-tunesia-1',
      },
      cards : [
        'Bruce and I were contracted to do a pilot for a new Web Series'
      ]
    },
    {
      theater: {
        poster: 'ad-3.jpg',
        video: 'ad-tunesia-2',
      },
      cards : [
        'Our first destination was the oft-overlooked Mediteranean destination in Tunesia.'
      ]
    },
    {
      theater: {
        poster: 'ad-4.jpg',
        video: 'ad-tunesia-3',
      },
      cards : [
        'The show ran for a few seasons online.  Our friendship continues.'
      ]
    }
  ]
}

var yay = {
  slug: 'yaywallet',
  title : 'YayWallet',
  thumb: 'yaywallet-?.jpg',
  thumbNav: 4,
  summary: 'Crowd Supply video for a crowd-funding campaign.',
  pages: [ 
    {
      theater: {
        poster: 'yaywallet-2.jpg',
        video: 'yaywallet-funder',
      },
      cards : [
        'Yay Wallet hired us to create a fun and informative video about their new company.', 
        'We delivered something personal, beautiful and from the heart.'
      ]
    }
  ]
}

var bsa = {
  slug: 'bsa',
  title : 'Brooklyn Street Art',
  thumb: 'bsa-?.jpg',
  thumbNav: 4,
  summary: 'Promotional video for the Brooklyn-Based art collective and blog',
  pages: [ 
    {
      theater: {
        poster: 'bsa-4.jpg',
        video: 'bsa-promo',
      },
      cards : [
        'Brooklyn Street Art was throwing a party to celebrate their latest book', 
        'On valentines day.  We captured the heart of the event and the mission of the organization'
      ]
    }
  ]
}

var every = {
  slug: 'everybody-dies',
  title : 'Everybody Dies Trailer',
  summary: "Movie Trailer for a fringe play in NYC",
  thumb: 'ed-?.jpg',
  thumbNum: 3,
  pages: [ 
    {
      theater: {
        poster: 'ed-1.jpg',
        video: 'everybody-dies-trailer',
      },
      cards : [
        'Edible Brains wanted something special to set them apart in a Theatre festival competition.', 
        'We made a movie trailer for the play, that delighted and horrified the admissions panel.'
      ]
    },
    {
      credits: [
        ['Directors', 'Antonio Bonilla & Lawrence Whiteside'],
        ['Writer', 'Antonio Bonilla'],
        ['Cindy', 'Molly Ryzdel'],
        ['John', 'Max Hambleton'],
        ['Editor', 'Benadict'],
        ['Sound Design', 'Gora Faal'],
        ['Visual Effects', 'Chris Lohouse'],
        ['Script Supervisor', 'Cindy Ormondroyd']
      ]
    }  
  ]
}

var moment = {
  slug: 'moment',
  title : 'Moment',
  thumb: 'moment-?.jpg',
  thumbNum: 2,
  pages: [ 
    {
      theater: {
        poster: 'moment-1.jpg',
        video: 'moment-short',
      },
      cards : [
        'Once upon a time, I made a music video about how photographs steal our memories.'
      ]
    },
    {
      credits: [
        ['Directors', 'Antonio Bonilla & Lawrence Whiteside'],
        ['Writer', 'Antonio Bonilla'],
        ['Cindy', 'Molly Ryzdel'],
        ['John', 'Max Hambleton'],
        ['Editor', 'Benadict'],
        ['Sound Design', 'Gora Faal'],
        ['Visual Effects', 'Chris Lohouse'],
        ['Script Supervisor', 'Cindy Ormondroyd']
      ]
    }  
  ]
}









// Websites
var americanD = {
  slug: 'american-detour',
  logo: 'ad',
  site: 'americandetour.com',
  thumb: 'front.jpg',
  title: 'American Detour',
  summary : "The brand of travel writer, Bruce Northam.  I contributed video work to the Web Video Series. I built the Wordpress Blog",
  pages: [
    {
      videos: ['ad-collage.jpg'], 
      cards: ['The Short-form travel web-series staring Bruce Northam began filming in 2009.']
    },
    {
      posters: ['ad-books.jpg'], 
      cards : ['Bruce is a veteran writer with decades of travel experience,'],
      icon : ''
    },
    {
      posters: ['ad-2guys.jpg'], 
      cards : ['But when it came to creating an identity online he needed a guide.'],
      icon : ''
    },
    {
      posters: ['ad-2guys.jpg'], 
      cards : ['I developed a wordpress site that would provide him a way to sell his latest book.'],
      icon : ''
    },
    {
      videos: ['ad-oktane.jpg'], 
      cards : [
        'During my time at Oktane we all shot, edited and animated dozens of 3-4 minute episodes.',
      ],
      icon : ''
    },
    {
      posters: ['ad-directions'], 
      cards : ['Bruce and I remaind close friends and travel buddies.'],
      icon : ''
    }
  ]
}

var csfME = {
  slug: 'csf',
  logo: 'csf',
  site: 'cinemasetfree.com',
  thumb: 'front.jpg',
  title : 'Cinema Set Free',
  summary : 'Filmmaking Collective, Free Portfolio\'s for Artists, Films, Monthly Meetups',
  pages: [ 
    {
      desktop: {
        poster: 'front.jpg',
        video: 'landing'
      }, 
      cards: [
        'Cinema Set Free is a personal project and my playground for experimenting with new technologies',
      ],
      button: {
        label: 'Live Site',
        link: 'http://cinemasetfree.com'
      }
    },
    {
      desktop: {
        poster: 'signin.jpg',
        video: 'landing'
      }, 
      cards: ['It consists of a suite of apps for indie filmmakers']
    },
    {
      desktop: {
        poster: 'sales.jpg',
        video: 'landing'
      }, 
      cards: ['CSF.ME is my everchanging idea for an Artist\'s Online Portfolio Builder.']
    },
    {
      desktop: {
        poster: 'video.jpg',
        video: 'landing'
      }, 
      cards: [
        'Anyone can create a stunning portfolio with video and images and go live in minutes.'
      ]
    },
    {
      desktop: {
        poster: 'design.jpg',
        video: 'landing'
      }, 
      cards: [
        'Eskewing the complexities of sites such as SquareSpace and Wix, I replaced any design desicions with simple questions that lead to beautiful results.'
      ]
    },
    {
      desktop: {
        poster: 'ccard.jpg',
        video: 'landing'
      }, 
      cards: [
        'Completely free for everyone.',  
        'Behind your own domain name for $7.99/month'
      ]
    }
  ]
}

var fan = {
  slug: 'fantrotter',
  logo: 'fantrotter',
  site: 'fantrotter.com',
  title : 'Fantrotter',
  thumb: 'front.jpg',
  summary : 'Event travel search engine that connects fans to one another.',
  pages : [
    {
      desktop: {
        poster: 'front.jpg',
        video: 'landing'
      }, 
      cards: [
        'Fantrotter is an event-travel search engine that makes money for the performers.',
        'While looking towards an algorythm for senerdipity between fans meeting one another'
      ]
    },
    {
      desktop: {
        poster: 'suggestions.jpg',
        video: 'search'
      }, 
      cards: [
        'Our next generation travel site.  It\'s appeal is the fun UX.',
        'And autofills all the search information for major booking sites.'
      ]
    },
    {
      desktop: {
        poster: 'loaded.jpg',
        video: 'festival'
      }, 
      cards: [
        'A compelling, animated interface that draws users to their next action, generating revenue through PPC.'
      ]
    },
    {
      mobile: {
        poster: 'm-festival.jpg',
        video: ''
      },
      cards: [
        "A place for fans to gather and interact before and after the show."
      ]
    },
    {
      desktop: {
        poster: 'install1.jpg',
        video: 'install'
      }, 
      cards: [
        'Any band or performer with a tour can install the app in 6 clicks.'
      ]
    },
    {
      desktop: {
        poster: 'facebookapp.jpg',
        video: 'umphreys'
      }, 
      cards: [
        'They promote their tour right along side the app.'
      ]
    },
    {
      desktop: {
        poster: 'dash.jpg',
        video: 'results'
      }, 
      cards: [
        'Bands make 20-70% of the PPC revenue their fans generate.'
      ]
    }
  ]
}

var spins = {
  slug: 'spins-fm',
  logo: 'spins',
  site: 'spins.fm',
  title : 'Spins.FM',
  thumb: 'front.jpg',
  summary : "An app that makes it fun for new generations to connect with the old technology of terrestrial radio.  My role was principle technology architect.",
  pages: [
    {
      desktop: {
        poster: 'front.jpg',
        video: 'landing'
      }, 
      cards: [
        'Spins.FM is a radio request app for facebook and iPhone.'
      ]
    },
    {
      desktop: {
        poster: 'britney.jpg',
        video: 'britney'
      }, 
      cards: [
        'Radio is still the #1 way musicians break a new single.'
      ]
    },
    {
      desktop: {
        poster: 'artistfb.jpg',
        video: 'facebook'
      }, 
      cards: [
        'We leveraged their fanbase and reinvigorated the request line.'
      ]
    },    
    {
      desktop: {
        poster: 'game.jpg',
        video: 'analytics'
      }, 
      cards: [
        'We made it a game and saw engagement increase overnight.'
      ]
    },    
    {
      desktop: {
        poster: 'iga.jpg',
        video: 'analytics'
      }, 
      cards: [
        'We opened the lines of communication to stations.'
      ]
    },
    {
      desktop: {
        poster: 'station.jpg',
        video: 'analytics'
      }, 
      cards: [
        'All for an app that basically started as a way to spam radio stations.'
      ]
    }
  ]
}

var fads = {
  slug: 'fred-astaire',
  logo: 'fads',
  site: 'danceportland.com',
  thumb: 'front.jpg',
  title : 'Fred Astaire Dance Studios',
  summary : 'Videography, Video Editing, Website creation & printed materials design. Also a student.',
  pages : [
    {
      desktop: {
        poster: 'front.jpg',
        video: 'landing'
      }, 
      cards: [
        'Fred Astaire Portland wanted to engage new customers with video.'
      ]
    },
    {
      desktop: {
        poster: 'showcase.jpg',
        video: 'landing'
      }, 
      cards: [
        'So we developed a system to shoot their showcases and competitions.'
      ]
    },
    // {
    //   poster: 'print.jpg',
    //   cards: [
    //     'They also needed promo print material. No problem.'
    //   ],
    //   button: {
    //     label: '',
    //     link: ''
    //   }
    // },
    {
      desktop: {
        poster: 'calendar.jpg',
        video: 'landing'
      }, 
      cards: [
        'Oh yeah, and their site had to sync to their iCalendar class-schedule.'
      ]
    },
    {
      desktop: {
        poster: 'wedding.jpg',
        video: 'landing'
      }, 
      cards: [
        "They couldn't be happier with the results."
      ]
    }
  ]
}

var h2h = {
  slug: 'head2head',
  logo: 'h2h',
  site: 'h2h.lawrencewhiteside.com',
  title : 'Head 2 Head',
  summary : 'A skinable video competition app built with Branded Entertainment in mind.',
  pages : [
    {
      desktop: {
        poster: '.jpg',
        video: ''
      }, 
      cards: [
        "Head2Head was my first real app.  Before app was a thing."
      ]
    },
    {
      desktop: {
        poster: '.jpg',
        video: ''
      }, 
      cards: [
        "The NHL was our first big client.  Fans voted on goals, players & other highlights"
      ]
    },
    {
      desktop: {
        poster: '.jpg',
        video: ''
      }, 
      cards: [
        "The site went through 3 major version.  I learned a lot."
      ]
    },
    {
      desktop: {
        poster: '.jpg',
        video: ''
      }, 
      cards: [
        "Sadly the company folded into our 4th year after dozens of clients."
      ]
    },
    {
      desktop: {
        poster: '.jpg',
        video: ''
      }, 
      cards: [
        "And the NHL made their own in-house version in Flash (suckers)."
      ]
    }
  ]
}

var elay = {
  slug: 'e-layaway',
  logo: 'elay',
  site: 'elayaway.com',
  title : 'E-Layaway',
  thumb: 'front.jpg',
  summary : 'Short contract for a JS heavy, embeddable shopping cart & checkout system using a payment system.',
  pages : [
    {
      desktop: {
        poster: 'front.jpg',
        video: ''
      }, 
      cards: [
        "eLayaway needed a sexier checkout embeddable javascript."
      ]
    },
    {
      desktop: {
        poster: 'elay-checkout1.jpg',
        video: ''
      }, 
      cards: [
        "Across thousands of e-commerce sites, this popup had lots of calculations to work out."
      ]
    },    
    {
      desktop: {
        poster: 'elay-checkout2.jpg',
        video: ''
      }, 
      cards: [
        "I delivered a beautiful and complex pay schedule calculator on spec and schedule."
      ]
    }
  ]
}

var kavi = {
  slug: 'kavi',
  title : 'Kavi Calculator',
  site: 'kaviworkspace.com/roi',
  thumb: 'full.jpg',
  logo: 'kavi',
  summary : 'Short contract for a responsive sales tool for their Workspace App.',
  pages : [
    {
      desktop: {
        poster: 'full.jpg',
        video: ''
      }, 
      cards: [
        "Kavi Workspace needed a promotional questionaire for it's Project Management Software."
      ]
    },
    {
      desktop: {
        poster: 'report.jpg',
        video: ''
      }, 
      cards: [
        "We gave them a responsive, simple wizard that delivers numbers an organization can use."
      ]
    },
    {
      mobile: {
        poster: 'm-step7.jpg',
        video: ''
      },
      cards: [
        "We hoped to make the decision to switch to Kavi more concrete."
      ]
    },
    {
      desktop: {
        poster: 'print.jpg',
        video: ''
      }, 
      cards: [
        "With printably-friently final reports of the savings."
      ]
    }
  ]
}

var rsf = {
  slug: 'real-smart-fitness',
  logo: 'rsf',
  thumb: 'front.jpg',
  site: 'realsmartfitness.com',
  title : 'Real Smart Fitness',
  summary : 'Mobile App for a Personal Training company.',
  pages : [
    {
      mobiles: ['rsf-preview1.png'],
      cards: [
        "Real Smart Fitness wanted to codify their training program in a mobile app."
      ]
    },
    {
      mobiles: ['rsf-preview2.png'],
      cards: [
        "We created 3D puppets that animated and gave instructions through the hour long program"
      ]
    },
    {
      mobiles: ['rsf-preview3.png'],
      cards: [
        "The app got attention for their personal training business."
      ]
    },
    {
      mobiles: ['rsf-preview3.png'],
      cards: [
        "But with a $5 price tag and a real lack of on-going development.",
        "The competition won out on market share."
      ]
    }
  ]
}

var eb = {
  slug: 'edible-brains',
  logo: 'eb',
  site: 'ediblebrains.com',
  thumb: 'front.jpg',
  title : 'Edible Brains Productions',
  summary : 'Web Design, Filmmaking, Branding, Online Strategy for NY Theatre company.',
  pages : [
    {
      desktop: {
        poster: 'front.jpg',
        video: ''
      }, 
      cards: [
        "Edible Brains Productions was applying to a theatre festival"
      ],
    },
    {
      desktop: {
        poster: 'films.jpg',
        video: ''
      }, 
      cards: [
        "They needed a trailer of their latest piece and a kickass website to go with it"
      ],
    },
    {
      desktop: {
        poster: 'theatre.jpg',
        video: ''
      }, 
      cards: [
        "We delivered a powerful, expressive video and a site that captured their unique personality."
      ],
    }
  ]
}

var aaa = {
  slug: 'alternative-arts',
  logo: 'aaa',
  thumb: 'one.jpg',
  site: 'alternativearts.org',
  still: 'necropolis-1.jpg',
  title : 'Alternative Arts Association',
  circa: '2010',
  summary : 'Web Design, Filmmaking, Branding, Online Strategy for NY Arts organization.',
  pages : [
    {
      desktop: {
        poster: 'one.jpg',
        video: ''
      }, 
      cards: [
        "Alternative Arts was gearing up for it's biggest event"
      ],
    },
    {
      desktop: {
        poster: 'two.jpg',
        video: ''
      }, 
      cards: [
        "Necropolis would coenside with the West village Halloween parade"
      ],
    },
    {
      desktop: {
        poster: 'popup.jpg',
        video: ''
      }, 
      cards: [
        "They needed a complete rebranding.  New web site and video to reintroduce their organization to the city"
      ],
    },
  ]
}

var exit21 = {
  slug: 'exit-21',
  logo: 'exit21',
  site: 'exit-21.com',
  thumb: 'front.jpg',
  title : 'Exit-21: Apparel Solutions',
  circa: '2010',
  summary : 'Online Strategy for Portfland Apparel Team.',
  pages : [
    {
      desktop: {
        poster: 'front.jpg',
        video: ''
      }, 
      cards: [
        "Exit-21 hired us originally to shoot their apparel on live models.  They were in the middle of a huge upgrade."
      ],
    },
    {
      desktop: {
        poster: 'modal.jpg',
        video: ''
      }, 
      cards: [
        "They needed a website that would capture the fun, vitality and especially the new space in Old Town Portland."
      ],
    },
    {
      desktop: {
        poster: 'portfolio.jpg',
        video: ''
      }, 
      cards: [
        "We came together to improve our portfolios.  They chose a Wordpress site."
      ],
    },
    {
      desktop: {
        poster: 'team.jpg',
        video: ''
      }, 
      cards: [
        "From one small business to another, good luck with your big dreams."
      ],
    }
  ]
}



sections = {}
sections.film = [
  googleM
  , morningAfter
  , iNinja
  , coursing
  , illHave
  , americanDf
  , aaaf
  , fadsf
  , yay
  , every
  , bsa
  , pModels
]
sections.web = [
  csfME
  , fan
  , spins
  , fads
  // ,americanD
  // , h2h
  , elay
  , kavi
  // , rsf
  , aaa
  , eb
  , exit21
]

