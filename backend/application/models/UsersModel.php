<?php
defined('BASEPATH') or exit('No direct script access allowed');

class UsersModel extends CI_Model
{

    private $table = 'users';


    public function users_all()
    {
        return $this->db->select('id, username, name, email, last_login, created_at, updated_at')
            ->from($this->table)
            ->order_by('id', 'desc')
            ->get()->result();
    }

    public function users_detail($id)
    {
        return $this->db->select('id, username, name, email, password, last_login, created_at, updated_at')
            ->from($this->table)->where('id', $id)
            ->order_by('id', 'desc')
            ->get()
            ->row();
    }

    public function users_create($data)
    {
        $userExists = $this->db->select('username')
            ->from($this->table)
            ->where('username', $data['username'])
            ->get()
            ->num_rows();

        if (!$userExists) {

            $req = [
                "username" => $data['username'],
                "name" => $data['name'],
                "email" => $data['email'],
                "password" =>  $this->bcrypt->hash_password($data['password'])
            ];

            $this->db->insert($this->table, $req);

            return array('status' => 200, 'message' => 'New user has been created.');
        } else {

            return array('status' => 400, 'message' => 'The username (' . $data['username'] . ') already exists');
        }
    }

    public function users_update($id, $data)
    {

		if($data['password'])
		{
			$newData['name'] = $data['name'];
			$newData['email'] = $data['email'];
			$newData['username'] = $data['username'];		
			$newData['password'] = $this->bcrypt->hash_password($data['password']);
			$this->db->where('id', $id)->update($this->table, $newData);
		}else{
			$newData['name'] = $data['name'];
			$newData['email'] = $data['email'];
			$newData['username'] = $data['username'];						
			$this->db->where('id', $id)->update($this->table, $newData);
		}        
        return array('status' => 200, 'message' => 'Data has been updated.');
    }

    public function users_delete($id)
    {
        $this->db->where('id', $id)->delete($this->table);
        return array('status' => 200, 'message' => 'Data has been deleted.');
    }
}
