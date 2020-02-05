<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Checkurls extends CI_Controller
{

	public function __construct()
	{
		parent::__construct();

        #LOAD MODELS
        $this->load->model(array('CheckUrlsModel'));
    }

    public function index()
    {
        $resp = $this->CheckUrlsModel->check_all_urls();
        json_response(200, $resp);
    }
}
