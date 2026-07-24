const paths = {
  star: 'M12 3.5l2.6 5.3 5.9.9-4.3 4.2 1 5.8L12 16.9 6.8 19.7l1-5.8L3.5 9.7l5.9-.9L12 3.5z',
  bread: 'M4 10c0-3 3.5-5 8-5s8 2 8 5v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-6zm2 .5h12',
  cafe: 'M4 9h12v7a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V9zm12 1h2.5A2.5 2.5 0 0 1 21 12.5 2.5 2.5 0 0 1 18.5 15H16M8 5v2M12 5v2',
  heart: 'M12 20s-7-4.4-7-10a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 5.6-7 10-7 10z',
  people: 'M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm7.5-1a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zM3.5 19a5.5 5.5 0 0 1 11 0M14 19a4.5 4.5 0 0 1 6.5-4',
  spark: 'M12 3v4M12 17v4M4.9 6.9l2.8 2.8M16.3 14.3l2.8 2.8M3 12h4M17 12h4M4.9 17.1l2.8-2.8M16.3 9.7l2.8-2.8',
  globe: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zm-9-9h18M12 3c2.5 2.7 2.5 15.3 0 18M12 3c-2.5 2.7-2.5 15.3 0 18',
  share: 'M16 8a3 3 0 1 0-2.8-4M8 12a3 3 0 1 0 0 .2M16 20a3 3 0 1 0-2.2-1M13.2 6.7l-4.4 2.6M8.8 13.3l4.4 3',
  calendar: 'M7 4v2M17 4v2M4.5 9h15M6 6h12a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z',
  image: 'M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6zm3 3.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM4.8 18l4.7-5.2 3 3.3 2.3-2.5L19 18',
  gift: 'M12 8v13M4 12h16v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-7zm0-3h16v3H4V9zm4.5-5A2.5 2.5 0 0 1 12 6.5 2.5 2.5 0 0 1 8.5 4zm7 0A2.5 2.5 0 0 0 12 6.5 2.5 2.5 0 0 0 15.5 4z',
  search: 'M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14zm6.5.5L21 22',
  phone: 'M8 3h8a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm0 3h8M10 18h4',
  layout: 'M4 5h16v14H4V5zm0 5h16M10 10v9',
  steam: 'M8 14c0-2 1.5-3 1.5-5M12 15c0-2.5 2-3.5 2-6M16 14c0-2 1.5-3 1.5-5M6 18h12a2 2 0 0 0 0-4H6a2 2 0 0 0 0 4z',
  clock: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zm0-13v5l3 2',
  arrow: 'M5 12h12M13 6l6 6-6 6',
  check: 'M5 12.5l4.5 4.5L19 7',
}

export function Icon({ name = 'spark', size = 22, className = '' }) {
  const d = paths[name] || paths.spark
  return (
    <svg
      className={`icon ${className}`.trim()}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d={d}
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
