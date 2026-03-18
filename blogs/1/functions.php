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
<?php
}
add_action('wp_head', 'dsi_add_script_to_head');