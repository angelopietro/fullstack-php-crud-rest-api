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
		$check_auth_client = $this->AuthModel->check_auth_client();

		if ($check_auth_client == true) {
			return true;
		} else {
			return false;
		}
	}

	public function index()
	{

		if ($this->check()) {
			$response = $this->AuthModel->auth();
			if ($response['status'] == 200) {
				$resp = $this->UsersModel->users_all_data();
				output_json(200, $resp);
			}
		}
	}

	public function detail($id)
	{
		if ($this->check()) {
			$resp = $this->UsersModel->users_detail_data($id);
			output_json(200, $resp);
		}
	}

	public function create()
	{
		if ($this->check()) {
			$params = json_decode(file_get_contents('php://input'), TRUE);
			if ($params['username'] == "" || $params['name'] == "" || $params['password'] == "") {
				$respStatus = 400;
				$resp = array('status' => 400, 'message' =>  'The Username, name and password can\'t be empty');
			} else {
				$respStatus = 201;
				$resp = $this->UsersModel->users_create_data($params);
			}
			output_json($respStatus, $resp);
		}
	}

	public function update($id)
	{
		if ($this->check()) {
			$params = json_decode(file_get_contents('php://input'), TRUE);
			$params['updated_at'] = date('Y-m-d H:i:s');
			if ($params['username'] == "" || $params['name'] == "" || $params['password'] == "") {
				$respStatus = 400;
				$resp = array('status' => 400, 'message' =>  'The Username, name and password can\'t be empty!');
			} else {
				$respStatus = 201;
				$resp = $this->UsersModel->users_update_data($id, $params);
			}
			output_json($respStatus, $resp);
		}
	}

	public function delete($id)
	{
		if ($this->check()) {
			$resp = $this->UsersModel->users_delete_data($id);
			output_json(200, $resp);
		}
	}
}