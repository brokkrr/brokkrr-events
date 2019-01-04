(function($) {

	$(start);

	function start() {
		console.log("Brokkrr Events");
		addFacebookPixel();
		addGoogleAnalytics();
	}

	function addFacebookPixel() {
		var $facebookPixel = $("<script>\n  !function(f,b,e,v,n,t,s)\n  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?\n  n.callMethod.apply(n,arguments):n.queue.push(arguments)};\n  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';\n  n.queue=[];t=b.createElement(e);t.async=!0;\n  t.src=v;s=b.getElementsByTagName(e)[0];\n  s.parentNode.insertBefore(t,s)}(window, document,'script',\n  'https://connect.facebook.net/en_US/fbevents.js');\n  fbq('init', '334993257351007');\n  fbq('track', 'PageView');\n</script>\n<noscript><img height=\"1\" width=\"1\" style=\"display:none\"\n  src=\"https://www.facebook.com/tr?id=334993257351007&ev=PageView&noscript=1\"\n/></noscript>");
		var $body = $(document.body);
		$body.append($facebookPixel);
	}

	function addGoogleAnalytics() {
		var $ga = $("<script async src=\"https://www.googletagmanager.com/gtag/js?id=UA-131740171-1\"></script>\n<script>\n  window.dataLayer = window.dataLayer || [];\n  function gtag(){dataLayer.push(arguments);}\n  gtag('js', new Date());\n\n  gtag('config', 'UA-131740171-1');\n</script>\n	}");
		var $body = $(document.body);
		$body.append($ga);
	}

})(jQuery || $);
