<?php
// Local PHP router — mirrors nginx.conf clean URLs
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$root = __DIR__;

if ($uri === '/health') {
    header('Content-Type: text/plain');
    echo "ok\n";
    return true;
}

// Redirect *.html → clean path (like nginx)
if (preg_match('#^/(.+)\.html$#', $uri, $m)) {
    if ($m[1] === 'index') {
        header('Location: /', true, 301);
    } else {
        header('Location: /' . $m[1], true, 301);
    }
    return true;
}

$path = $root . $uri;

if ($uri === '/' || $uri === '') {
    return false; // serve index.html via -t docroot
}

if (is_file($path)) {
    return false;
}

$html = $path . '.html';
if (is_file($html)) {
    header('Content-Type: text/html; charset=UTF-8');
    readfile($html);
    return true;
}

if (is_dir($path) && is_file($path . '/index.html')) {
    return false;
}

http_response_code(404);
header('Content-Type: text/plain; charset=UTF-8');
echo "404 Not Found\n";
return true;
