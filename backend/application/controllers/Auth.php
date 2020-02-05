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
		$check_auth = $this->AuthModel->check_auth();

		if ($check_auth) {
			$params = json_decode(file_get_contents('php://input'), TRUE);
			$username = $params['username'];
			$password = $params['password'];

			$response = $this->AuthModel->login($username, $password);
			json_response($response['status'], $response);
		}
	}	
}
