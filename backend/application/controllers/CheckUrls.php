<?php
defined('BASEPATH') or exit('No direct script access allowed');

class CheckUrls extends CI_Controller
{

    public function __construct()
    {
        parent::__construct();

        #LOAD MODELS
        $this->load->model(array('CheckUrlsModel'));
    }


    public function index()
    {
        $resp = $this->CheckUrlsModel->check_all_data();
        output_json(200, $resp);
    }
}