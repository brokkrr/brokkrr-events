(function($) {
  console.log("Brokkrr Events");
	var $facebookPixel = $("<script>\n  !function(f,b,e,v,n,t,s)\n  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?\n  n.callMethod.apply(n,arguments):n.queue.push(arguments)};\n  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';\n  n.queue=[];t=b.createElement(e);t.async=!0;\n  t.src=v;s=b.getElementsByTagName(e)[0];\n  s.parentNode.insertBefore(t,s)}(window, document,'script',\n  'https://connect.facebook.net/en_US/fbevents.js');\n  fbq('init', '334993257351007');\n  fbq('track', 'PageView');\n</script>\n<noscript><img height=\"1\" width=\"1\" style=\"display:none\"\n  src=\"https://www.facebook.com/tr?id=334993257351007&ev=PageView&noscript=1\"\n/></noscript>");
	var $body = $(document.body);
  $body.append($facebookPixel);
})(jQuery || $);
