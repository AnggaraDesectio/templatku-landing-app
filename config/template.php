<?php

// Di-generate oleh php artisan template:zip - hanya berisi flavor "landing-app".
// Ganti brand/warna di bawah, atau set TEMPLATE_FLAVOR di .env.

return [
    'flavor' => env('TEMPLATE_FLAVOR', 'landing-app'),

    'flavors' => array (
  'landing-app' => 
  array (
    'label' => 'NUSAAPP — Aplikasi Mobile',
    'brand_name' => 'NUSAAPP',
    'brand_tagline' => 'Kasir canggih di genggamanmu',
    'brand_initials' => 'NA',
    'accent' => '#0c4a6e',
    'category' => 'teknologi',
    'home' => 'landings.app',
    'nav' => 
    array (
      'sections' => 
      array (
        0 => 
        array (
          'label' => 'Menu',
          'items' => 
          array (
            0 => 
            array (
              'label' => 'Landing',
              'to' => '/landings/app',
              'icon' => 'Home',
            ),
            1 => 
            array (
              'label' => 'Dashboard',
              'to' => '/dashboard',
              'icon' => 'LayoutDashboard',
            ),
            2 => 
            array (
              'label' => 'Pengaturan',
              'to' => '/settings',
              'icon' => 'Settings',
            ),
          ),
        ),
      ),
    ),
  ),
),
];
