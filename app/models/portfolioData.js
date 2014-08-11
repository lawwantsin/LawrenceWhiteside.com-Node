// Hardcoded data that can easily be changed during development.  No need for a MongoDB or resaving, updating records.
// Easier experimentation with schema as it evolves in early stages.  Can be loaded into MongoDB later if needsbe.

// Films
var googleM = {
  slug : 'googlem',
  title : "Google M",
  thumb: 'googlem-1.jpeg',
  posters : [
    {url : 'googlem-1.jpeg'},
    {url : 'googlem-2.jpeg'},
    {url : 'googlem-3.jpeg'}    
  ]
}

var pModels = {
  slug : 'pm-calendar',
  title : "Prestegious Models",
  thumb: 'pm-1.jpeg',
  posters : [
    {url : 'pm-1.jpeg'},
    {url : 'pm-2.jpeg'},
    {url : 'pm-3.jpeg'}    
  ]
}

var morningAfter = {
  slug: 'morning-after',
  title: "The Morning After",
  thumb: 'morning-after-1.jpeg',
  posters : [
    {url: 'morning-after-1.jpeg'},
    {url: 'morning-after-2.jpeg'},
    {url: 'morning-after-3.jpeg'}
  ]
}

var iNinja = {
  slug: '',
  thumb: 'ininja-1.jpeg',
  title : 'iNinja',
  posters : [
    {url: 'ininja-1.jpeg'},
    {url: 'ininja-2.jpeg'},
    {url: 'ininja-3.jpeg'}
  ]
}

var coursing = {
  slug: 'coursing',
  title : 'Coursing',
  posters : [
    {url: 'coursing-1.jpeg'},
    {url: 'coursing-2.jpeg'},
    {url: 'coursing-3.jpeg'}
  ]
}

// Websites
var americanD = {
  slug: 'american-detour',
  logo: 'ad',
  thumb: 'front.jpg',
  title: 'American Detour',
  summary : "The brand of travel writer, Bruce Northam.  I contributed video work to the Web Video Series. I built the Wordpress Blog",
  pages: [ 
    {
      videos: ['ad-collage.jpg'], 
      cards: ['The Short-form travel web-series staring Bruce Northam began filming in 2009.'],
      button: {
        label: '',
        link: ''
      }
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
      cards: ['It consists of a suite of apps for indie filmmakers'],
      button: {
        label: '',
        link: ''
      }
    },
    {
      desktop: {
        poster: 'sales.jpg',
        video: 'landing'
      }, 
      cards: ['CSF.ME is my everchanging idea for an Artist\'s Online Portfolio Builder.'],
      button: {
        label: '',
        link: ''
      }
    },
    {
      desktop: {
        poster: 'video.jpg',
        video: 'landing'
      }, 
      cards: [
        'Anyone can create a stunning portfolio with video and images and go live in minutes.'
      ],
      button: {
        label: '',
        link: ''
      }
    },
    {
      desktop: {
        poster: 'design.jpg',
        video: 'landing'
      }, 
      cards: [
        'Eskewing the complexities of sites such as SquareSpace and Wix, I replaced any design desicions with simple questions that lead to beautiful results.'
      ],
      button: {
        label: '',
        link: ''
      }
    },
    {
      desktop: {
        poster: 'ccard.jpg',
        video: 'landing'
      }, 
      cards: [
        'Completely free for everyone.',  
        'Behind your own domain name for $7.99/month'
      ],
      button: {
        label: '',
        link: ''
      }
    }
  ]
}

var fan = {
  slug: 'fantrotter',
  logo: 'fantrotter',
  title : 'Fantrotter',
  thumb: 'front.jpg',
  summary : 'Event travel search engine that empowers artists to make money from their fans travelling to see them.  Available as a website, facebook app, mobile app and embeddable widget.',
  pages : [
    {
      desktop: {
        poster: 'front.jpg',
        video: 'landing'
      }, 
      cards: [
        'Fantrotter is an event-travel search engine that makes money for the performers.'
      ],
      button: {
        label: '',
        link: ''
      }
    },
    {
      desktop: {
        poster: 'suggestions.jpg',
        video: 'search'
      }, 
      cards: [
        'Our next generation travel site.  It\'s appeal is the fun UX.',
        'And autofills all the search information for major booking sites.'
      ],
      button: {
        label: '',
        link: ''
      }
    },
    {
      desktop: {
        poster: 'loaded.jpg',
        video: 'festival'
      }, 
      cards: [
        'A compelling, animated interface that draws users to their next action, generating revenue through PPC.'
      ],
      button: {
        label: '',
        link: ''
      }
    },
    {
      mobile: {
        poster: 'm-festival.jpg',
        video: ''
      },
      cards: [
        "They couldn't be happier with the results."
      ],
      button: {
        label: '',
        link: ''
      }
    },
    {
      desktop: {
        poster: 'install1.jpg',
        video: 'install'
      }, 
      cards: [
        'Any band or performer with a tour can install the app in 6 clicks.'
      ],
      button: {
        label: '',
        link: ''
      }
    },
    {
      desktop: {
        poster: 'facebookapp.jpg',
        video: 'umphreys'
      }, 
      cards: [
        'They promote their tour right along side the app.'
      ],
      button: {
        label: '',
        link: ''
      }
    },
    {
      desktop: {
        poster: 'dash.jpg',
        video: 'results'
      }, 
      cards: [
        'Bands make 20-70% of the PPC revenue their fans generate.'
      ],
      button: {
        label: '',
        link: ''
      }
    }
  ]
}

var spins = {
  slug: 'spins-fm',
  logo: 'spins',
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
      ],
      button: {
        label: '',
        link: ''
      }
    },
    {
      desktop: {
        poster: 'britney.jpg',
        video: 'britney'
      }, 
      cards: [
        'Radio is still the #1 way musicians break a new single.'
      ],
      button: {
        label: '',
        link: ''
      }
    },
    {
      desktop: {
        poster: 'artistfb.jpg',
        video: 'facebook'
      }, 
      cards: [
        'We leveraged their fanbase and reinvigorated the request line.'
      ],
      button: {
        label: '',
        link: ''
      }
    },    
    {
      desktop: {
        poster: 'game.jpg',
        video: 'analytics'
      }, 
      cards: [
        'We made it a game and saw engagement increase overnight.'
      ],
      button: {
        label: '',
        link: ''
      }
    },    
    {
      desktop: {
        poster: 'iga.jpg',
        video: 'analytics'
      }, 
      cards: [
        'We opened the lines of communication to stations.'
      ],
      button: {
        label: '',
        link: ''
      }
    },
    {
      desktop: {
        poster: 'station.jpg',
        video: 'analytics'
      }, 
      cards: [
        'All for an app that basically started as a way to spam radio stations.'
      ],
      button: {
        label: '',
        link: ''
      }
    }
  ]
}

var fads = {
  slug: 'fred-astaire',
  logo: 'fads',
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
      ],
      button: {
        label: '',
        link: ''
      }
    },
    {
      desktop: {
        poster: 'showcase.jpg',
        video: 'landing'
      }, 
      cards: [
        'So we developed a system to shoot their showcases and competitions'
      ],
      button: {
        label: '',
        link: ''
      }
    },
    {
      poster: 'print.jpg',
      cards: [
        'They also needed promo print material. No problem.'
      ],
      button: {
        label: '',
        link: ''
      }
    },
    {
      desktop: {
        poster: 'calendar.jpg',
        video: 'landing'
      }, 
      cards: [
        'Oh yeah, and their site had to sync to their iCalendar class-schedule.'
      ],
      button: {
        label: '',
        link: ''
      }
    },
    {
      desktop: {
        poster: 'wedding.jpg',
        video: 'landing'
      }, 
      cards: [
        "They couldn't be happier with our results."
      ],
      button: {
        label: '',
        link: ''
      }
    }
  ]
}

var h2h = {
  slug: 'head2head',
  logo: 'h2h',
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
      ],
      button: {
        label: '',
        link: ''
      }
    },
    {
      desktop: {
        poster: '.jpg',
        video: ''
      }, 
      cards: [
        "The NHL was our first big client.  Fans voted on goals, players & other highlights"
      ],
      button: {
        label: '',
        link: ''
      }
    },
    {
      desktop: {
        poster: '.jpg',
        video: ''
      }, 
      cards: [
        "The site went through 3 major version.  I learned a lot."
      ],
      button: {
        label: '',
        link: ''
      }
    },
    {
      desktop: {
        poster: '.jpg',
        video: ''
      }, 
      cards: [
        "Sadly the company folded into our 4th year after dozens of clients."
      ],
      button: {
        label: '',
        link: ''
      }
    },
    {
      desktop: {
        poster: '.jpg',
        video: ''
      }, 
      cards: [
        "And the NHL made their own in-house version in Flash (suckers)."
      ],
      button: {
        label: '',
        link: ''
      }
    }
  ]
}

var elay = {
  slug: 'e-layaway',
  logo: 'elay',
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
      ],
      button: {
        label: '',
        link: ''
      }
    },
    {
      desktop: {
        poster: '.jpg',
        video: ''
      }, 
      cards: [
        "Across thousands of e-commerce sites, this modal had work to do."
      ],
      button: {
        label: '',
        link: ''
      }
    },    
    {
      desktop: {
        poster: '.jpg',
        video: ''
      }, 
      cards: [
        "Our answer was a beautiful and complex pay schedule calculator."
      ],
      button: {
        label: '',
        link: ''
      }
    }
  ]
}

var kavi = {
  slug: 'kavi',
  title : 'Kavi Calculator',
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
      ],
      button: {
        label: '',
        link: ''
      }
    },
    {
      desktop: {
        poster: 'report.jpg',
        video: ''
      }, 
      cards: [
        "We gave them a responsive, simple wizard that generates leads."
      ],
      button: {
        label: '',
        link: ''
      }
    },
    {
      mobile: {
        poster: 'm-step7.jpg',
        video: ''
      },
      cards: [
        "They couldn't be happier with the results."
      ],
      button: {
        label: '',
        link: ''
      }
    },
    {
      desktop: {
        poster: 'print.jpg',
        video: ''
      }, 
      cards: [
        "Printer-friently reports, of course, (the original screen-size)."
      ],
      button: {
        label: '',
        link: ''
      }
    }
  ]
}

var rsf = {
  slug: 'real-smart-fitness',
  logo: 'rsf',
  thumb: 'front.jpg',
  title : 'Real Smart Fitness',
  summary : 'Mobile App for a Personal Training company.',
  pages : [
    {
      mobiles: ['rsf-preview1.png'],
      cards: [
        "Real Smart Fitness wanted to codify their training program in a mobile app."
      ],
      button: {
        label: '',
        link: ''
      }
    },
    {
      mobiles: ['rsf-preview2.png'],
      cards: [
        "We created 3D puppets that animated and gave instructions through the hour long program"
      ],
      button: {
        label: '',
        link: ''
      }
    },
    {
      mobiles: ['rsf-preview3.png'],
      cards: [
        "The app got attention for their personal training business."
      ],
      button: {
        label: '',
        link: ''
      }
    },
    {
      mobiles: ['rsf-preview3.png'],
      cards: [
        "But with a $5 price tag and a real lack of on-going development.",
        "The competition won out on market share."
      ],
      button: {
        label: '',
        link: ''
      }
    }
  ]
}

var bsa = {
  slug: 'brooklyn-street-art',
  title : 'Brooklyn Street Art',
  thumb: 'front.jpg',
  summary : 'Filmmaking for an art-blog\'s book release party.',
  logo : 'bsa',
  pages : [
    {
      desktop: {
        poster: '.jpg',
        video: ''
      }, 
      cards: [
        "Brooklyn Street Art, a popular blog was releasing a book."
      ],
      button: {
        label: '',
        link: ''
      }
    },
    {
      desktop: {
        poster: '.jpg',
        video: ''
      }, 
      cards: [
        "They wanted a video to celebrate the Valentine's day release party"
      ],
      button: {
        label: '',
        link: ''
      }
    },
    {
      desktop: {
        poster: '.jpg',
        video: ''
      }, 
      cards: [
        "We delivered a promotional video the party could be proud of."
      ],
      button: {
        label: '',
        link: ''
      }
    }
  ]
}

var eb = {
  slug: 'edible-brains',
  logo: 'eb',
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
  thumb: 'front.jpg',
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



sections = {}
sections.film = [
  googleM,
  pModels,
  morningAfter,
  iNinja,
  coursing,
  americanD,
  aaa,
  bsa
]
sections.web = [
  csfME,
  fan
  ,spins
  ,fads
  // ,americanD
  // , h2h
  , elay
  , kavi
  // , rsf
  , aaa
  , eb
]

