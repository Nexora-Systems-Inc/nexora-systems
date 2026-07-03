import { useEffect } from 'react';
import { analyticsConfig } from '../../config/analytics';

function injectScript(id, src, inline) {
  if (document.getElementById(id)) return;
  const script = document.createElement('script');
  script.id = id;
  if (src) {
    script.async = true;
    script.src = src;
  }
  if (inline) script.textContent = inline;
  document.head.appendChild(script);
}

export default function Analytics() {
  const { googleAnalyticsId, microsoftClarityId, metaPixelId } = analyticsConfig;

  useEffect(() => {
    if (googleAnalyticsId) {
      injectScript(
        'nexora-ga',
        `https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`,
      );
      injectScript(
        'nexora-ga-init',
        null,
        `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${googleAnalyticsId}');`,
      );
    }

    if (microsoftClarityId) {
      injectScript(
        'nexora-clarity',
        null,
        `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${microsoftClarityId}");`,
      );
    }

    if (metaPixelId) {
      injectScript(
        'nexora-meta-pixel',
        null,
        `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${metaPixelId}');fbq('track','PageView');`,
      );
    }
  }, [googleAnalyticsId, microsoftClarityId, metaPixelId]);

  return null;
}
