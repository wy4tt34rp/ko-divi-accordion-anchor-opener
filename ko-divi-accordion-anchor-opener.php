<?php
/**
 * Plugin Name: KO – Divi Accordion Anchor Opener
 * Description: Lets hash links open Divi Accordion items by CSS ID/anchor OR by accordion item title using #ko-accordion=Title.
 * Version: 1.1.0
 * Author: KO
 */

if ( ! defined( 'ABSPATH' ) ) exit;

class KO_Divi_Accordion_Anchor_Opener {
	const VER = '1.1.0';

	public function __construct() {
		add_action( 'wp_enqueue_scripts', [ $this, 'enqueue' ] );
	}

	public function enqueue() {
		if ( is_admin() ) return;

		wp_register_script(
			'ko-divi-accordion-anchor-opener',
			plugins_url( 'assets/ko-divi-accordion-anchor-opener.js', __FILE__ ),
			[],
			self::VER,
			true
		);

		wp_enqueue_script( 'ko-divi-accordion-anchor-opener' );
	}
}

new KO_Divi_Accordion_Anchor_Opener();
