// export
const links = {
  config: {
  },
  items: [
    {
      id: -1,
      // image: cyberrisk,
      title: 'Home',
      route: '/',
      description: 'Go to home',
    },
    {
      id: 21,
      // image: cyberrisk,
      title: '#OpenSezame DB admin',
      route: '/opensezame',
      description: 'Admin area for APP configuration via REST API',
      link: 'https://beacondbadmin.finnoconsult.at/opensezame',
      items: [
        {
          id: 1,
          // image: cyberrisk,
          title: 'Doors',
          route: '/opensezame/doors',
          description: 'Configure doors',
        },
        {
          id: 2,
          // image: cyberrisk,
          title: 'Beacons',
          route: '/opensezame/beacons',
          description: 'Configure beacons',
        },
        {
          id: 3,
          // image: cyberrisk,
          title: 'Triggers',
          route: '/opensezame/triggers',
          description: 'Configure triggers',
        },
        {
          id: 4,
          // image: cyberrisk,
          title: 'startservice',
          route: '/opensezame/startservice',
          description: 'Starting Service',
        },
      ],
    },
    {
      id: 11,
      // image: cyberrisk,
      title: '#FinnoScore',
      description: 'English-German website publishing our evaluation about banks based on online digital presence',
      link: 'https://finnoscore.finnoconsult.at',
    },
    {
      id: 12,
      // image: cyberrisk,
      title: '#SpeedCreation',
      description: 'English-Hungarian website to describe our special methodology to increase digital user experience',
      link: 'https://www.innovaciostanacsado.com/prezi#speedcreation',
    },
    {
      id: 1,
      // image: cyberrisk,
      title: 'Innovációs Tanácsadó',
      description: 'English-Hungarian website to promote our services to Hungarian customers',
      link: 'https://www.innovaciostanacsado.com',
    },
    {
      id: 2,
      // image: cyberrisk,
      title: 'Innovációs #Prezi',
      description: 'English-Hungarian detailed presentation about our joint digital experience improvement services',
      link: 'https://www.innovaciostanacsado.com/prezi',
    },
    {
      id: 10,
      // image: reisegepaeck,
      title: '#FInnoConsult',
      description: 'German-English website to promote our digital services to DACH region ',
      link: 'https://www.finnoconsult.at',
    },
  ],
  functions: {
    getRoute: item => item.route || `./pages?${item.id}`,
    getLink: (items, search) => items.find(i => i.id === parseInt(search && search.match(/\?(\d+)/)[1], 10) || 0).link,
  },
};

module.exports = { links };
