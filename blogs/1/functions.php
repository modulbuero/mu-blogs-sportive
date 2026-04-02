<?php 
function dsi_add_script_to_head() {
    ?>
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=AW-18005796338"></script> 
<script>window.dataLayer = window.dataLayer || [];   
    function gtag(){dataLayer.push(arguments);}   gtag('js', new Date());   gtag('config', 'AW-18005796338');
    </script>
<!-- Event snippet for Abonnieren conversion page -->
<script> gtag('event', 'conversion', { 'send_to': 'AW-18005796338/JnDlCLPn9YUcEPLL6olD', 'value': 1.0, 'currency': 'EUR' }); 
    
</script>

<!-- Matomo -->
<script>
  var _paq = window._paq = window._paq || [];
  /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
  _paq.push(['trackPageView']);
  _paq.push(['enableLinkTracking']);
  (function() {
    var u="//statistik.antwortzeit.de/";
    _paq.push(['setTrackerUrl', u+'matomo.php']);
    _paq.push(['setSiteId', '77']);
    var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
    g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
  })();
</script>
<!-- End Matomo Code -->
<?php
}
add_action('wp_head', 'dsi_add_script_to_head');

