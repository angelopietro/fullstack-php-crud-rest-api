<?php
defined('BASEPATH') or exit('No direct script access allowed');


function json_response($statusHeader, $response)
{
	$ci = &get_instance();
	$ci->output->set_content_type('application/json');
	$ci->output->set_status_header($statusHeader);
	$ci->output->set_output(json_encode($response));
}
