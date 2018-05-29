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
      title: '#Boilerplate demo',
      route: '/demo',
      description: 'Some things to demonstrate the boilerplate',
      items: [
        {
          id: 1,
          // image: cyberrisk,
          title: 'Form',
          route: '/demo/form',
          description: 'Form element demo',
        },
        {
          id: 2,
          // image: cyberrisk,
          title: 'Grid',
          route: '/demo/grid',
          description: 'Grid view demo',
        },
        {
          id: 3,
          // image: cyberrisk,
          title: 'Text',
          route: '/demo/text',
          description: 'Simple paragraph content',
        },
        {
          id: 4,
          // image: cyberrisk,
          title: 'Image',
          route: '/demo/images',
          description: 'Sample image scroller',
        },
        {
          id: 5,
          // image: cyberrisk,
          title: 'NavBar',
          route: '/demo/navbar',
          description: 'Sample navBar to override main floating',
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
