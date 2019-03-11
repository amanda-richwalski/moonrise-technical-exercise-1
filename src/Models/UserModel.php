<?php
	$db = new SQLite3('db/testing.sqlite', SQLITE3_OPEN_CREATE | SQLITE3_OPEN_READWRITE);
	class UserModel
	{
		public $id = null;
		public $first = '';
		public $email = '';
		public $last = '';
		public $phone = '';
		public $status = '';
		public $user_type = '';
		public $avatar = '';
		public $address = '';
		public $lat = 0;
		public $lng = 0;

		// Constructor is public but only is called by static class methods.
		public function __construct($row) {
			if ( !$row ) {
				throw new Exception("Empty row returned from database.");
			}
			
			$this->id = $row['id'];
			$this->first = $row['first'];
			$this->email = $row['email'];
			$this->last = $row['last'];
			$this->phone = $row['phone'];
			$this->status = $row['status'];
			$this->user_type = $row['user_type'];
			$this->avatar = $row['avatar'];
			$this->address = $row['address'];
			$this->lat = $row['lat'];
			$this->lng = $row['lng'];

		}

		public static function create($user) {
			self::validate($user);
			global $db;
			$query = "
			INSERT INTO users
				(first, email, last, phone, status, user_type, avatar, address, lat, lng)
			VALUES
				(?,?,?,?,?,?,?,?,?,?)
			";
			if ($statement = $db->prepare($query)) {
				$statement->bindParam('ssssssssdd',
				$user['first'],
				$user['email'],
				$user['last'],
				$user['phone'],
				$user['status'],
				$user['user_type'],
				$user['avatar'],
				$user['address'],
				$user['lat'],
				$user['lng']);
			}

			$statement->execute();
			$insert_id = $statement->insert_id;

			if ($insert_id) {
				return $insert_id;
			}

			throw new Exception("Error Inserting User Into DB");
		}

		public static function read($id) {
			global $db;
			$results = $db->query("SELECT * from users WHERE id = $id");
			while ($row = $results->fetchArray()) {
				$user = $row;
			}

			if ($user) {
				return new UserModel($user);
			} else {
				throw new Exception("Error Running Query");
			}
			
		}

		public function toJSON() {
			$json = array(
				'id'           => $this->id,
				'email'        => $this->email,
				'name'         => array(
					'first'    => $this->first,
					'last'     => $this->last,
					'full'     => $this->first . ' ' . $this->last,
					),
				'phone'        => $this->phone,
				'status'       => $this->status,
				'type'         => $this->user_type,
				'avatar'       => $this->avatar,
				'location'     => array(
					'address'  => $this->address,
					'lat'      => $this->lat,
					'lng'      => $this->lng,
				),
			);

			return $json;
		}

		public static function update($update) {
			if (!isset($update['id']) || ! is_int($update['id']) || $update['id'] < 1) {
				throw new Exception('Attempted to update user without ID.');
			}
		}

		public static function validate($user) {
			if (!filter_var($user['email'], FILTER_VALIDATE_EMAIL)) {
				throw new Exception('Invalid Email provided.');
			} elseif (!filter_var($user['lat'], FILTER_VALIDATE_FLOAT) || !filter_var($user['lng'], FILTER_VALIDATE_FLOAT)) {
				throw new Exception('Invalid latitude / longitude provided.');
			}
			return true;
		}

		public static function list() {
			global $db;

			if ($results = $db->query("SELECT * from users")){
				$user_list = array();
				while ($row = $results->fetchArray()) {
					$user = new UserModel($row);
					$user_list[] = $user->toJSON();
				}

				return $user_list;
			}

			throw new Exception("Error Running Query");
		}
	}
