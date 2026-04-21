<?php
declare(strict_types=1);
require_once __DIR__ . '/config.php';

$db = getDB();

// GET single collection by slug
if (isset($_GET['slug'])) {
    $slug = sanitize($_GET['slug']);
    $stmt = $db->prepare('SELECT * FROM collections WHERE slug = :slug LIMIT 1');
    $stmt->execute(['slug' => $slug]);
    $collection = $stmt->fetch();

    if (!$collection) {
        jsonError('Kolekcija nije pronađena', 404);
    }

    jsonResponse($collection);
}

// GET all collections
$stmt = $db->query('SELECT * FROM collections ORDER BY created_at DESC');
jsonResponse($stmt->fetchAll());
