(function($) {

  var Promise = Promise || PromisePolyfill;
  var startOnce = callOnce(start);

  try {
    $(startOnce);
  } finally {
    // Call start if jQuery fails.
    setTimeout(startOnce, 300);
  }

	function start() {
		log("Initialize");
		addFacebookPixel();
		addGoogleAnalytics();
		bindEvents();
		log("Initialization complete");
	}

	function bindEvents() {
    switch (location.pathname) {
      case "/":
        log("Bind landing page events");
        //Track searching by zip code on the landing page
        var $form = $("form[action=\"/\"][method=post]");
        $form.find("#arrow").on("click", function() {
          track("FindLocation", { zip: $form.find("input[type=text]").first().val() });
        });
        return;
      case "/Insurances/Insurance":
        log("Bind insurance questionnaire events");
        //Track searching for matches
        $("input[type=button].seematches.SubmitInsurance").on("click", function() {
          track("Search");
        });
        return;
      case "/Insurances/SearchBroker":
        log("Bind broker matches events");
        //Track contacting a broker
        $("div.contactbutton").on("click", function() {
          track("Contact");
        });
        return;
      default:
        return;
    }
	}

	function track(event, data) {
    if (!fbq) setTimeout(function() { track.apply(this, arguments); }, 200);
		data = data || {};
		switch(event) {
			case "FindLocation":
				return fbq("track", event, { zip: data.zip || "00000" });
			case "Search":
				return fbq("track", event);
			case "Contact":
				return fbq("track", event);
			default:
				return;
		}
	}

	function addFacebookPixel() {
		var $facebookPixel = $("<script>\n  !function(f,b,e,v,n,t,s)\n  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?\n  n.callMethod.apply(n,arguments):n.queue.push(arguments)};\n  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';\n  n.queue=[];t=b.createElement(e);t.async=!0;\n  t.src=v;s=b.getElementsByTagName(e)[0];\n  s.parentNode.insertBefore(t,s)}(window, document,'script',\n  'https://connect.facebook.net/en_US/fbevents.js');\n  fbq('init', '389674785135006');\n  fbq('track', 'PageView');\n</script>\n<noscript><img height=\"1\" width=\"1\" style=\"display:none\"\n  src=\"https://www.facebook.com/tr?id=389674785135006&ev=PageView&noscript=1\"\n/></noscript>");
		var $body = $(document.body);
		$body.append($facebookPixel);
	}

	function addGoogleAnalytics() {
		var $ga = $("<script async src=\"https://www.googletagmanager.com/gtag/js?id=UA-131740171-1\"></script>\n<script>\n  window.dataLayer = window.dataLayer || [];\n  function gtag(){dataLayer.push(arguments);}\n  gtag('js', new Date());\n\n  gtag('config', 'UA-131740171-1');\n</script>\n	}");
		var $body = $(document.body);
		$body.append($ga);
	}

  // Misc helpers.
  
  function callOnce(fn) {
    var called = false;
    return function() {
      if (called) return;
      called = true;
      fn();
    };
  }

	function PromisePolyfill(cb) {
    this.resolved = false;
    this.value = null;
		this.queue = [];
		cb(function(value) {
			this.resolved = true;
      this.value = value;
			this.flushQueue();
		});
	}

	PromisePolyfill.prototype.flushQueue = function(value) {
    if (!this.resolved) return;
    var self = this;
    this.queue.forEach(function(fn) {
      fn(self.value);
    });
  };

	PromisePolyfill.prototype.then = function(cb) {
    var self = this;
    return new PromisePolyfill(function(resolve) {
      self.queue.push(function(value) {
        resolve(cb(value));
      });
      self.flushQueue();
    });
  };

  function log(msg) {
    console.log("[brokkrr:events] " + msg);
  }

})(jQuery || $);
