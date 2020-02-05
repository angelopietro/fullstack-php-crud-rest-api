<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Urls extends CI_Controller
{

	public function __construct()
	{
		parent::__construct();		

		#LOAD MODELS
		$this->load->model(array('UrlsModel', 'AuthModel'));
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
			$resp = $this->UrlsModel->url_all();
			json_response(200, $resp);
		}
	}

	public function urlByUser($userID)
	{		
		if ($this->check()) {
			$resp = $this->UrlsModel->url_by_user($userID);
			json_response(200, $resp);
		}
	}

	public function detail($id)
	{
		if ($this->check()) {
			$resp = $this->UrlsModel->url_detail($id);
			json_response(200, $resp);
		}
	}

	public function create()
	{		
		if ($this->check()) {
			$params = json_decode(file_get_contents('php://input'), TRUE);
			if ($params['title'] == "" || $params['url'] == "") 
			{
				$respStatus = 400;
				$resp = array('status' => 400, 'message' =>  'Title and Url are required!');
			} 
			else 
			{
				$respStatus = 200;
				$resp = $this->UrlsModel->url_create($params);
			}
			json_response($respStatus, $resp);
		}
	}

	public function update($id)
	{ 
		if ($this->check()) {
			$params = json_decode(file_get_contents('php://input'), TRUE);
			$params['updated_at'] = date('Y-m-d H:i:s');

			if ($params['title'] == "" || $params['url'] == "") {
				$respStatus = 400;
				$resp = array('status' => 400, 'message' =>  'Title and Url are required!');
			} else {
				$respStatus = 200;
				$resp = $this->UrlsModel->url_update($id, $params);
			}
			json_response($respStatus, $resp);
		}
	}

	public function update_status($id)
	{
		if ($this->check()) {
			$params = json_decode(file_get_contents('php://input'), TRUE);
			$params['updated_at'] = date('Y-m-d H:i:s');
			
			$resp = $this->UrlsModel->url_update($id, $params);
			json_response(200, $resp);
		}
	}

	public function delete($id)
	{
		if ($this->check()) {
			$resp = $this->UrlsModel->url_delete($id);
			json_response(200, $resp);
		}
	}

	public function log($id)
	{
		if ($this->check()) {
			$resp = $this->UrlsModel->url_log($id);
			json_response(200, $resp);
		}
	}	
}
