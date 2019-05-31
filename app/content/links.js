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
      title: '#TestWork',
      route: '/testwork',
      description: 'Some things to demonstrate the boilerplate',
      items: [
        {
          id: 0,
          title: 'Inbox',
          route: '/testwork/inbox',
          description: 'Inbox view (video_1)',
        },
        {
          id: 1,
          title: 'Tabs',
          route: '/testwork/tabs/0',
          description: 'Tab view (video_2)',
        },
        {
          id: 2,
          title: 'New event',
          route: '/testwork/new_event',
          description: 'New event view (video_3)',
        },
      ],
    },
  ],
  functions: {
    getRoute: item => item.route || `/pages?${item.id}`,
    getLink: (items, search) => items.find(i => i.id === parseInt(search && search.match(/\?(\d+)/)[1], 10) || 0).link,
  },
};

module.exports = { links };
