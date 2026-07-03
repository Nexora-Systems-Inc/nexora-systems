import { Link } from 'react-router-dom';

export default function ProductCtaButtons({
  bookDemoLabel,
  contactLabel,
  launchAppLabel,
  launch,
  bookDemoTo = '/contact',
  contactTo = '/contact',
}) {
  const showLaunchApp = launch?.showLaunchApp && launch?.launchAppUrl;

  return (
    <>
      <Link to={bookDemoTo} className="btn-gold">{bookDemoLabel}</Link>
      {showLaunchApp && (
        <a
          href={launch.launchAppUrl}
          className="btn-outline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {launchAppLabel}
        </a>
      )}
      <Link to={contactTo} className="btn-outline">{contactLabel}</Link>
    </>
  );
}
