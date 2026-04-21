<?php
declare(strict_types=1);
require_once __DIR__ . '/config.php';

$db = getDB();

// GET single product by slug
if (isset($_GET['slug'])) {
    $slug = sanitize($_GET['slug']);
    $stmt = $db->prepare('
        SELECT p.*, c.name AS collection_name, c.slug AS collection_slug
        FROM products p
        LEFT JOIN collections c ON p.collection_id = c.id
        WHERE p.slug = :slug AND p.active = 1
        LIMIT 1
    ');
    $stmt->execute(['slug' => $slug]);
    $product = $stmt->fetch();

    if (!$product) {
        jsonError('Proizvod nije pronađen', 404);
    }

    $product['colors'] = json_decode($product['colors'], true);
    $product['sizes'] = json_decode($product['sizes'], true);
    $product['featured'] = (bool) $product['featured'];
    $product['active'] = (bool) $product['active'];
    $product['price'] = (float) $product['price'];
    $product['old_price'] = $product['old_price'] ? (float) $product['old_price'] : null;

    jsonResponse($product);
}

// GET product list
$where = ['p.active = 1'];
$params = [];

if (!empty($_GET['collection'])) {
    $where[] = 'c.slug = :collection';
    $params['collection'] = sanitize($_GET['collection']);
}

if (!empty($_GET['featured'])) {
    $where[] = 'p.featured = 1';
}

$whereSQL = implode(' AND ', $where);
$orderSQL = 'p.sort_order ASC, p.created_at DESC';

if (!empty($_GET['sort'])) {
    match (sanitize($_GET['sort'])) {
        'price-asc' => $orderSQL = 'p.price ASC',
        'price-desc' => $orderSQL = 'p.price DESC',
        'newest' => $orderSQL = 'p.created_at DESC',
        default => null,
    };
}

$stmt = $db->prepare("
    SELECT p.*, c.name AS collection_name, c.slug AS collection_slug
    FROM products p
    LEFT JOIN collections c ON p.collection_id = c.id
    WHERE {$whereSQL}
    ORDER BY {$orderSQL}
");
$stmt->execute($params);
$products = $stmt->fetchAll();

foreach ($products as &$p) {
    $p['colors'] = json_decode($p['colors'], true);
    $p['sizes'] = json_decode($p['sizes'], true);
    $p['featured'] = (bool) $p['featured'];
    $p['active'] = (bool) $p['active'];
    $p['price'] = (float) $p['price'];
    $p['old_price'] = $p['old_price'] ? (float) $p['old_price'] : null;
}

jsonResponse($products);
