<?php
defined('BASEPATH') or exit('No direct script access allowed');

class UrlsModel extends CI_Model
{

	private $table = 'urls';
	private $table_log = 'urls_log';

    public function url_all()
    {
		return $this->db->select('id, title, url, status, created_at, updated_at')
		->from($this->table)
		->order_by('id', 'desc')
		->get()
		->result();
	}
	

    public function url_by_user($userID)
    {
        return $this->db->select('id, title, url, status, created_at, updated_at')
        ->from($this->table)
        ->where('user_id', $userID)
        ->order_by('id', 'desc')
        ->get()
        ->result();
    }

	 
    public function url_detail($id)
    {
		return $this->db->select('id, title, url, status, created_at, updated_at')
		->from($this->table)
		->where('id', $id)
		->order_by('id', 'desc')
		->get()
		->row();
    }

    public function url_log($id)
    {
		$query = $this->db->select('L.id, L.response_code, L.response_msg, L.created_at, L.updated_at, U.title, U.url')
		->from("$this->table_log as L")
		->join("$this->table as U", 'L.id_url = U.id', 'inner')
		->where('L.id_url', $id)
		->order_by('L.id', 'desc')
		->get()
		->row();

        return $query;
    }

    public function url_create($data)
    {
		$urlExists = $this->db->select('title, url')
		->from($this->table)
		->where('user_id', $data['user_id'])
		->where('url', $data['url'])
		->get()
		->num_rows();

        if (!$urlExists) {
            $this->db->insert($this->table, $data);
            return array('status' => 200, 'message' => 'Data has been created.');
        } else {

            return array('status' => 400, 'message' => 'Url (' . $data['url'] . ') already exists');
        }
    }

    public function url_update($id, $data)
    {			
		$newData['title'] = $data['title'];
		$newData['url'] = $data['url'];

         $query = $this->db->select('url')
        ->from($this->table)
        ->where('url', $newData['url'])        
        ->get()
		->num_rows();
		
		if($query == 0){
			$newData['status'] = 0;
		}	
		
        $this->db->where('id', $id)->update($this->table, $newData);
        return array('status' => 200, 'message' => 'Data has been updated.');
    }


    public function url_update_status($id, $data)
    {
        $this->db->where('id', $id)->update($this->table, $data);
        return array('status' => 200, 'message' => 'Status has been updated.');
    }

    public function url_delete($id)
    {
        $this->db->where('id', $id)->delete($this->table);
        return array('status' => 200, 'message' => 'Data has been deleted.');
    }
}
