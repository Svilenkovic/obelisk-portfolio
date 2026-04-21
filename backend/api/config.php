<?php
declare(strict_types=1);

// CORS
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// Database
define('DB_HOST', 'localhost');
define('DB_NAME', 'nacionale');
define('DB_USER', 'nacionale_user');
define('DB_PASS', 'Nac10nale!Str0ng');

function getDB(): PDO {
    static $pdo = null;
    if ($pdo === null) {
        $pdo = new PDO(
            'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=utf8mb4',
            DB_USER,
            DB_PASS,
            [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES => false,
            ]
        );
    }
    return $pdo;
}

function jsonResponse(mixed $data, bool $success = true, int $code = 200): never {
    http_response_code($code);
    echo json_encode(['success' => $success, 'data' => $data], JSON_UNESCAPED_UNICODE);
    exit;
}

function jsonError(string $message, int $code = 400): never {
    http_response_code($code);
    echo json_encode(['success' => false, 'error' => $message], JSON_UNESCAPED_UNICODE);
    exit;
}

function getJsonInput(): array {
    $raw = file_get_contents('php://input');
    if (!$raw) return [];
    $data = json_decode($raw, true);
    return is_array($data) ? $data : [];
}

function sanitize(string $input): string {
    return htmlspecialchars(trim($input), ENT_QUOTES, 'UTF-8');
}

// Rate limiting (simple file-based, per IP)
function rateLimit(int $maxRequests = 30, int $windowSeconds = 60): void {
    $ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
    $file = sys_get_temp_dir() . '/nacionale_rate_' . md5($ip);

    $data = [];
    if (file_exists($file)) {
        $data = json_decode(file_get_contents($file) ?: '[]', true) ?: [];
    }

    $now = time();
    $data = array_filter($data, fn($t) => ($now - $t) < $windowSeconds);

    if (count($data) >= $maxRequests) {
        jsonError('Previše zahteva. Pokušajte ponovo za minut.', 429);
    }

    $data[] = $now;
    file_put_contents($file, json_encode($data));
}
