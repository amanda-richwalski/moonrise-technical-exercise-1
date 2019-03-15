<?php

require_once __DIR__ . '/../src/functions.php';
require_once __DIR__ . '/../src/Models/UserModel.php';


// Default index page
router('GET', '^/$', function() {
    header('Content-Type: application/json');
    $status = array(
        'status'  =>  'up'
    );
    echo json_encode($status);
});

// GET request to /users
router('GET', '^/users$', function() {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Max-Age: 600");
    $user_list = UserModel::list();
    header('Content-Type: application/json');
    echo json_encode($user_list);
});

// With named parameters
router('GET', '^/users/(?<id>\d+)$', function($params) {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Max-Age: 600");
    $user = UserModel::read(intval($params['id']));
    header('Content-Type: application/json');
    echo json_encode($user->toJSON());
});

// POST request to /users
router('POST', '^/users$', function() {
    header("Access-Control-Allow-Origin: *");
    header('Content-Type: application/json');
    $json = json_decode(file_get_contents('php://input'), true);
    $user_id = UserModel::create($json);
    echo json_encode(UserModel::read($user_id));
});

header("HTTP/1.0 404 Not Found");
echo '404 Not Found';
