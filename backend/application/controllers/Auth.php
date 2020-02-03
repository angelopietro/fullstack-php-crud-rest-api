<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Auth extends CI_Controller
{

	public function __construct()
	{
		parent::__construct();

		#LOAD BIBLIOTECAS	
		$this->load->library('bcrypt');

		#LOAD MODELS
		$this->load->model('AuthModel');
	}


	public function login()
	{
		$method = $_SERVER['REQUEST_METHOD'];
		if ($method != 'POST') {
			json_output(400, array('status' => 400, 'message' => 'Bad request.'));
		} else {
			$check_auth_client = $this->AuthModel->check_auth_client();

			if ($check_auth_client) {
				$params = json_decode(file_get_contents('php://input'), TRUE);
				$username = $params['username'];
				$password = $params['password'];

				$response = $this->AuthModel->login($username, $password);
				json_output($response['status'], $response);
			}
		}
	}

	public function logout()
	{
		$method = $_SERVER['REQUEST_METHOD'];
		if ($method != 'POST') {
			json_output(400, array('status' => 400, 'message' => 'Bad request.'));
		} else {
			$check_auth_client = $this->AuthModel->check_auth_client();
			if ($check_auth_client == true) {
				$response = $this->AuthModel->logout();
				json_output($response['status'], $response);
			}
		}
	}
}