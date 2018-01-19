export const links = {
  config: {
  },
  items: [
    {
      id: 1,
      // image: reisegepaeck,
      title: 'Finnoconsult',
      description: 'German-English website to promote our digital services to DACH region ',
      link: 'https://www.finnoconsult.at',
    },
    {
      id: 2,
      // image: cyberrisk,
      title: 'Innovációs Tanácsadó',
      description: 'English-Hungarian website to promote our services to Hungarian customers',
      link: 'https://www.innovaciostanacsado.com',
    },
    {
      id: 3,
      // image: cyberrisk,
      title: 'Innovációs #prezi',
      description: 'English-Hungarian detailed presentation about our joint digital experience improvement services',
      link: 'https://www.innovaciostanacsado.com/prezi',
    },
  ],
  functions: {
    getLink: (items, search) => items.find(i => i.id === parseInt(search && search.match(/\?(\d+)/)[1], 10) || 0).link,
  },
};
