export const visit = {
  address: {
    street: '45 N Main St',
    city: 'Victor',
    state: 'ID',
    zip: '83455',
  },
  coords: { lat: 43.6027, lng: -111.1108 },
  phone: '208-787-2221',
  email: 'hello@victoremporium.com',
  hours: {
    summer: {
      label: 'Summer hours (May–Sep)',
      days: [
        { d: 'Mon–Thu', t: '10am–8pm' },
        { d: 'Fri–Sat', t: '10am–9pm' },
        { d: 'Sun', t: '11am–7pm' },
      ],
    },
    winter: {
      label: 'Winter hours (Oct–Apr)',
      days: [
        { d: 'Mon–Sat', t: '11am–6pm' },
        { d: 'Sun', t: '12pm–5pm' },
      ],
    },
  },
};
