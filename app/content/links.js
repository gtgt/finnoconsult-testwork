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
          id: 0,
          title: 'PureText',
          route: '/demo/text',
          description: 'Simple paragraph content without component',
        },
        {
          id: 0,
          title: 'MoreText',
          route: '/demo/texts',
          description: 'Separate component with multiple texts',
        },
        {
          id: 1,
          title: 'Grid',
          route: '/demo/grid',
          description: 'Grid view demo',
        },
        {
          id: 2,
          title: 'Form',
          route: '/demo/form',
          description: 'Form element demo',
        },
        {
          id: 3,
          title: 'TableView',
          route: '/demo/table',
          description: 'TableView demo',
        },
        {
          id: 4,
          title: 'Image',
          route: '/demo/images',
          description: 'Sample image scroller',
        },
        {
          id: 5,
          title: 'NavBar',
          route: '/demo/navbar',
          description: 'Sample navBar to override main floating',
        },
        {
          id: 6,
          title: 'Carousel',
          route: '/demo/carousel',
          description: 'Sample carousel for some items',
        },
        {
          id: 7,
          title: 'Drag&Drop',
          route: '/demo/drag-drop',
          description: 'Sample drag and drop',
        },
        {
          id: 11,
          title: 'Static1',
          route: '/demo/static/bank/bank',
          description: 'Simple page to show static images',
        },
        {
          id: 12,
          title: 'Static2',
          route: '/demo/static/?title=more detailed title&image=https://finnoconsult.at/img/bg-shibuya.jpg',
          description: 'Simple page to show static images',
        },
        {
          id: 13,
          title: 'FullPage',
          route: '/demo/fullpage',
          description: 'Full Page with floating navbar',
        },
        {
          id: 20,
          title: 'Overlay',
          route: '/demo/overlay',
          description: 'Sample ActionSheet overlay',
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
  tabBarLinks: [
    {
      id: 0,
      image: null,
      title: 'PureText',
      route: '/demo/text',
      description: 'Simple paragraph content without component',
    },
    {
      id: 1,
      image: null,
      title: 'MoreText',
      route: '/demo/texts',
      description: 'Separate component with multiple texts',
    },
    {
      id: 2,
      image: null,
      title: 'Grid',
      route: '/demo/grid',
      description: 'Grid view demo',
    },
    {
      id: 3,
      image: null,
      title: 'Form',
      route: '/demo/form',
      description: 'Form element demo',
    },
    {
      id: 4,
      image: null,
      title: 'Image',
      route: '/demo/images',
      description: 'Sample image scroller',
    },
  ],
  buttons: [
    {
      id: 'search',
      image: null,
      title: 'Search',
      to: '/demo/search',
    },
  ],
  functions: {
    getRoute: item => item.route || `/pages?${item.id}`,
    getLink: (items, search) => items.find(i => i.id === parseInt(search && search.match(/\?(\d+)/)[1], 10) || 0).link,
  },
};

module.exports = { links };
