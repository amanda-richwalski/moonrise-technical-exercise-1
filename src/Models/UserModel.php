<?php
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

			throw new Exception("Error Inserting User Into DB");
		}

		public static function read($id) {
			$user = array(
				'id' => 1,
				'email' => 'what@what.com',
				'first' => 'jason',
				'last' => 'tham',
				'phone' => '7738418100',
				'user_type' => 'moonriser',
				'status' => 'active',
				'avatar' => 'http://imugur.com/123.jpg',
				'address' => '129 West 81st Street',
				'lat' => 40.783821, 
				'lng' => -73.975423,
			);

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

		}

		public static function list() {

		}

		public static function find($find_params) {

		}
	}
