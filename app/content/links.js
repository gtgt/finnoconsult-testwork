export const links = {
  config: {
  },
  items: [
    {
      id: 1,
      // image: reisegepaeck,
      title: 'Finnoconsult',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
      link: 'https://www.finnoconsult.at',
    },
    {
      id: 2,
      // image: cyberrisk,
      title: 'Innovacios Tanacsado website',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua!',
      link: 'https://www.innovaciostanacsado.com',
    },
    {
      id: 3,
      // image: cyberrisk,
      title: 'Innovacios Tanacsado #prezi',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua!',
      link: 'https://www.innovaciostanacsado.com/prezi',
    },
  ],
  functions: {
    getLink: (items, search) => items.find(i => i.id === parseInt(search && search.match(/\?(\d+)/)[1], 10) || 0).link,
  },
};
