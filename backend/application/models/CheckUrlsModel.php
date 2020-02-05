<?php
defined('BASEPATH') or exit('No direct script access allowed');

class CheckUrlsModel extends CI_Model
{

    private $table_urls = 'urls';
    private $table_logs = 'urls_log';

    public function check_all_urls()
    {

        $res_text = '';
        $statusCode = '';

        $response = $this->db->select('id, title, url, status')
            ->from($this->table_urls)
            ->where('status = 0')
            ->get()
            ->result();

        if ($response) {

            foreach ($response as $res) {

				$headers = @get_headers($res->url, 1);
				
                if (strpos($headers[0], '404') === false) {
                    $statusCode = substr($headers[0], 9, 3);
                    $res_text =  json_encode($headers);
                } else {
                    $statusCode = substr($headers[0], 9, 3);
                    $res_text =  json_encode($headers);
                }

                $data = [
                    "id_url" => $res->id,
                    "response_code" => $statusCode,
                    "response_msg" => $res_text
                ];

                $this->db->where('id', $res->id)
                    ->update($this->table_urls, ['status' => 1]);

                $this->db->insert($this->table_logs, $data);
            }
            return array('status' => 200, 'message' => 'Urls was updated successfuly.');
        } else {
            return array('status' => 204, 'message' => 'No urls to be ckecked!');
        }
    }
}
