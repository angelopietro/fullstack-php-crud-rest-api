<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class UrlsModel extends CI_Model {

    private $table = 'urls';

    public function url_all_data()
    {
        return $this->db->select('id, title, url, status, created_at, updated_at')->from($this->table)->order_by('id','desc')->get()->result();
    }

    public function url_detail_data($id)
    {
        return $this->db->select('id, title, url, status, created_at, updated_at')->from($this->table)->where('id',$id)->order_by('id','desc')->get()->row();
    }

    public function url_create_data($data)
    {
        $urlExists = $this->db->select('title, url')->from($this->table)->where('url',$data['url'])->get()->num_rows();

        if(!$urlExists){
        $this->db->insert($this->table,$data);
        return array('status' => 201,'message' => 'Data has been created.');

        }else{

        return array('status' => 400,'message' => 'Url ('.$data['url'].') already exists');

        }
    }

    public function url_update_data($id,$data)
    {        
        $this->db->where('id',$id)->update($this->table,$data);
        return array('status' => 200,'message' => 'Data has been updated.');
    }


    public function url_update_status($id,$data)
    {        
        $this->db->where('id',$id)->update($this->table,$data);
        return array('status' => 200,'message' => 'Status has been updated.');
    }

    public function url_delete_data($id)
    {
        $this->db->where('id',$id)->delete($this->table);
        return array('status' => 200,'message' => 'Data has been deleted.');
    }

}
