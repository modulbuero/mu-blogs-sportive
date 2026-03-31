<?php 

/**
 * Anpassung eines benutzerdefinierten Felder für Mitglieder
 */
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

/**
 * CPT Vorstandsinfos
 */
function create_custom_post_type_vorstandsinfo() {

    $labels = array(
        'name'               => 'Vorstandsinfos',
        'singular_name'      => 'Vorstandsinfos',
        'plural_name'        => 'Vorstandsinfos',
        'title'              => 'Vorstandsinfos',
        'menu_name'          => 'Vorstandsinfos',
        'add_new'            => 'Neu hinzufügen',
        'add_new_item'       => 'Neuen Vorstandsinfo hinzufügen',
        'edit_item'          => 'Vorstandsinfo bearbeiten',
        'new_item'           => 'Neue Vorstandsinfos',
        'view_item'          => 'Vorstandsinfos ansehen',
        'search_items'       => 'Vorstandsinfos durchsuchen',
        'not_found'          => 'Keine Vorstandsinfos gefunden',
    );

    $args = array(
        'label'              => 'Vorstände',
        'name'               => 'vorstand',
        'plural_name'        => 'Vorstände',
        'labels'             => $labels,
        'public'             => true,
        'has_archive'        => true,
        'menu_icon'          => 'dashicons-portfolio',
        'supports'           => array('title', 'editor'),
        'rewrite'            => array('slug' => 'vorstandinfos'),
        'show_in_rest'       => true, // wichtig für Gutenberg
    );

    register_post_type('vorstandinfos', $args);
}

add_action('init', 'create_custom_post_type_vorstandsinfo');

/**
 * Shortcode für Vorstandsinfos
 */
function shortcode_zeige_letzten_vorstandsinfo($atts) {

    $atts = shortcode_atts(array(
        'post_type' => 'vorstandinfos', // optional: CPT angeben
    ), $atts);

    $args = array(
        'post_type'      => $atts['post_type'],
        'post_status'    => 'publish',
        'posts_per_page' => 1,
        'orderby'        => 'date',
        'order'          => 'DESC',
    );

    $query = new WP_Query($args);

    if ($query->have_posts()) {
        $query->the_post();
        $output = '<h2>Der Vorstand informiert</h2>';
        $output .= '<div class="shortcode-beitrag block-distance-bottom">';
        $output .= '<h3>' . esc_html(get_the_title()) . '</h3>';
        $output .= '<div class="content">' . apply_filters('the_content', get_the_content()) . '</div>';
        $output .= '</div>';

        wp_reset_postdata();

        return $output;
    }

    wp_reset_postdata();
    return '';
}

add_shortcode('zeige_letzten_vorstandsinfo', 'shortcode_zeige_letzten_vorstandsinfo');