<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Users extends CI_Controller
{

	public function __construct()
	{	
		parent::__construct();

		#LOAD BIBLIOTECAS	
		$this->load->library('bcrypt');

		#LOAD MODELS
		$this->load->model(array('UsersModel', 'AuthModel'));
	}

	public function check()
	{
		
		$check_auth = $this->AuthModel->check_auth();

		if ($check_auth == true) {
			return true;
		} else {
			return false;
		}
	}

	public function index()
	{

		if ($this->check()) {			
			$resp = $this->UsersModel->users_all();
			json_response(200, $resp); 
		}
	}

	public function detail($id)
	{
		if ($this->check()) {
			$resp = $this->UsersModel->users_detail($id);
			json_response(200, $resp);
		}
	}

	public function create()
	{
		if ($this->check()) {
			$params = json_decode(file_get_contents('php://input'), TRUE);

			if ($params['username'] == "" || $params['name'] == "" || $params['password'] == "") {
				$respStatus = 400;
				$resp = array('status' => 400, 'message' =>  'Username, Name and password are required!');
			} else {
				$respStatus = 200;
				$resp = $this->UsersModel->users_create($params);
			}
			json_response($respStatus, $resp);
		}
	}

	public function update($id)
	{
		if ($this->check()) {
			$params = json_decode(file_get_contents('php://input'), TRUE);
			$params['updated_at'] = date('Y-m-d H:i:s');

			if ($params['username'] == "" || $params['name'] == "") {
				$respStatus = 400;
				$resp = array('status' => 400, 'message' =>  'Username and Name are required!');
			} else {
				$respStatus = 200;
				$resp = $this->UsersModel->users_update($id, $params);
			}
			json_response($respStatus, $resp);
		}
	}

	public function delete($id)
	{
		if ($this->check()) {
			$resp = $this->UsersModel->users_delete($id);
			json_response(200, $resp);
		}
	}
}
