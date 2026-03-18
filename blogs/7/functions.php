<?php 
add_filter('nf_member_custom_fields', 'svsetzten_custom_fields_anpassung');

function svsetzten_custom_fields_anpassung($custom_fields) {
    // Beispiel: Neues Feld hinzufügen
    $custom_fields['nf_abteilung'] = [
        'label'    => 'Abteilung',
        'section'  => 'Zusätzliche Daten',
        'type'     => 'select',
        'sanitize' => 'select',
        'options'  => ['' => '– bitte wählen –', 'fussball' => 'Fußball', 'gymnastik' => 'Gymnastik'],
        'form_key' => 'abteilung',

    ];

    return $custom_fields;
}