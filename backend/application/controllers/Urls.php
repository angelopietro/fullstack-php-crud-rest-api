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
			$resp = $this->UrlsModel->url_all_data();
			output_json(200, $resp);
		}
	}

	public function detail($id)
	{
		if ($this->check()) {
			$resp = $this->UrlsModel->url_detail_data($id);
			output_json(200, $resp);
		}
	}

	public function create()
	{
		if ($this->check()) {
			$params = json_decode(file_get_contents('php://input'), TRUE);
			if ($params['title'] == "" || $params['url'] == "") {
				$respStatus = 400;
				$resp = array('status' => 400, 'message' =>  'Title and Url can\'t be empty!');
			} else {
				$respStatus = 201;
				$resp = $this->UrlsModel->url_create_data($params);
			}
			output_json($respStatus, $resp);
		}
	}

	public function update($id)
	{
		if ($this->check()) {
			$params = json_decode(file_get_contents('php://input'), TRUE);
			$params['updated_at'] = date('Y-m-d H:i:s');
			if ($params['title'] == "" || $params['url'] == "") {
				$respStatus = 400;
				$resp = array('status' => 400, 'message' =>  'Title and Url can´t be empty!');
			} else {
				$respStatus = 201;
				$resp = $this->UrlsModel->url_update_data($id, $params);
			}
			output_json($respStatus, $resp);
		}
	}

	public function update_status($id)
	{
		if ($this->check()) {
			$params = json_decode(file_get_contents('php://input'), TRUE);
			$params['updated_at'] = date('Y-m-d H:i:s');

			$respStatus = 201;
			$resp = $this->UrlsModel->url_update_data($id, $params);

			output_json($respStatus, $resp);
		}
	}

	public function delete($id)
	{
		if ($this->check()) {
			$resp = $this->UrlsModel->url_delete_data($id);
			output_json(200, $resp);
		}
	}
}