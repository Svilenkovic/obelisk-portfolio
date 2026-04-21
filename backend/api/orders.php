<?php
declare(strict_types=1);
require_once __DIR__ . '/config.php';

$db = getDB();

// POST — place order
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    rateLimit(10, 60); // max 10 orders per minute per IP

    $input = getJsonInput();

    // Validate required fields
    $required = ['customer_name', 'customer_phone', 'address', 'city', 'zip_code', 'items'];
    foreach ($required as $field) {
        if (empty($input[$field])) {
            jsonError("Polje '{$field}' je obavezno");
        }
    }

    $items = $input['items'];
    if (!is_array($items) || count($items) === 0) {
        jsonError('Korpa je prazna');
    }

    // Validate items against DB
    $productIds = array_column($items, 'product_id');
    $placeholders = implode(',', array_fill(0, count($productIds), '?'));
    $stmt = $db->prepare("SELECT id, price FROM products WHERE id IN ({$placeholders}) AND active = 1");
    $stmt->execute($productIds);
    $dbProducts = $stmt->fetchAll(PDO::FETCH_KEY_PAIR); // id => price

    $total = 0;
    $validatedItems = [];

    foreach ($items as $item) {
        $pid = (int) ($item['product_id'] ?? 0);
        if (!isset($dbProducts[$pid])) {
            jsonError("Proizvod #{$pid} ne postoji ili nije aktivan");
        }

        $qty = max(1, min(10, (int) ($item['quantity'] ?? 1)));
        $serverPrice = (float) $dbProducts[$pid];
        $subtotal = $serverPrice * $qty;
        $total += $subtotal;

        $validatedItems[] = [
            'product_id' => $pid,
            'color' => sanitize((string) ($item['color'] ?? '')),
            'size' => sanitize((string) ($item['size'] ?? '')),
            'quantity' => $qty,
            'price' => $serverPrice,
        ];
    }

    // Shipping
    $shippingCost = $total >= 3000 ? 0 : 350;
    $grandTotal = $total + $shippingCost;

    // Sanitize customer data
    $name = sanitize((string) $input['customer_name']);
    $phone = sanitize((string) $input['customer_phone']);
    $email = sanitize((string) ($input['customer_email'] ?? ''));
    $address = sanitize((string) $input['address']);
    $city = sanitize((string) $input['city']);
    $zip = sanitize((string) $input['zip_code']);
    $note = sanitize((string) ($input['note'] ?? ''));

    // Validate phone
    if (!preg_match('/^[\d\s+\-()]{6,20}$/', $phone)) {
        jsonError('Neispravan format telefona');
    }

    // Validate email if provided
    if ($email && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        jsonError('Neispravan email format');
    }

    // Insert order
    $db->beginTransaction();
    try {
        $stmt = $db->prepare('
            INSERT INTO orders (customer_name, customer_phone, customer_email, address, city, zip_code, note, total, shipping_cost, status)
            VALUES (:name, :phone, :email, :address, :city, :zip, :note, :total, :shipping, :status)
        ');
        $stmt->execute([
            'name' => $name,
            'phone' => $phone,
            'email' => $email,
            'address' => $address,
            'city' => $city,
            'zip' => $zip,
            'note' => $note,
            'total' => $grandTotal,
            'shipping' => $shippingCost,
            'status' => 'pending',
        ]);

        $orderId = (int) $db->lastInsertId();

        $stmt = $db->prepare('
            INSERT INTO order_items (order_id, product_id, color, size, quantity, price)
            VALUES (:order_id, :product_id, :color, :size, :quantity, :price)
        ');

        foreach ($validatedItems as $item) {
            $stmt->execute([
                'order_id' => $orderId,
                'product_id' => $item['product_id'],
                'color' => $item['color'],
                'size' => $item['size'],
                'quantity' => $item['quantity'],
                'price' => $item['price'],
            ]);
        }

        $db->commit();
        jsonResponse(['order_id' => $orderId], true, 201);

    } catch (\Exception $e) {
        $db->rollBack();
        jsonError('Greška pri kreiranju porudžbine', 500);
    }
}

// GET — order status lookup
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (empty($_GET['id']) || empty($_GET['phone'])) {
        jsonError('Parametri id i phone su obavezni');
    }

    $id = (int) $_GET['id'];
    $phone = sanitize($_GET['phone']);

    $stmt = $db->prepare('SELECT * FROM orders WHERE id = :id AND customer_phone = :phone LIMIT 1');
    $stmt->execute(['id' => $id, 'phone' => $phone]);
    $order = $stmt->fetch();

    if (!$order) {
        jsonError('Porudžbina nije pronađena', 404);
    }

    // Fetch items
    $stmt = $db->prepare('
        SELECT oi.*, p.name AS product_name
        FROM order_items oi
        LEFT JOIN products p ON oi.product_id = p.id
        WHERE oi.order_id = :order_id
    ');
    $stmt->execute(['order_id' => $id]);
    $order['items'] = $stmt->fetchAll();

    // Cast types
    $order['total'] = (float) $order['total'];
    $order['shipping_cost'] = (float) $order['shipping_cost'];
    foreach ($order['items'] as &$item) {
        $item['price'] = (float) $item['price'];
        $item['quantity'] = (int) $item['quantity'];
    }

    jsonResponse($order);
}

jsonError('Method not allowed', 405);
