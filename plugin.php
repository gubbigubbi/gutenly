<?php
/**
 * Plugin Name: Gutenly
 * Plugin URI: https://github.com/gubbigubbi/gutenly
 * Description: Gutenly - a collection of must have GB blocks
 * Author: gubbigubbi
 * Author URI: https://github.com/gubbigubbi/
 * Version: 0.0.1
 * License: GPL2+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package CGB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Block Initializer.
 */
require_once( plugin_dir_path( __FILE__ ) . 'src/init.php' );
