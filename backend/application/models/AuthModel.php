<?php
defined('BASEPATH') or exit('No direct script access allowed');

class AuthModel extends CI_Model
{
    private $table_user  = 'users';
    public $secret_key 	 = SECRET_KEY;
    

    public function login($username, $password)
    {
        $query  = $this->db->select('id, name, password')
                           ->from($this->table_user)
                           ->where('username', $username)
                           ->get()
                           ->row();

        if ($query === 0) {
            return array('status' => 204, 'message' => 'User was not found!');
        } else {
			$stored_hash = $query->password;
			$userName 	 = $query->name;	 
            $userId      = $query->id;
            
            if ($this->bcrypt->check_password($password, $stored_hash)) {
                $last_login = date('Y-m-d H:i:s');
                $token = $this->bcrypt->hash_password(substr(md5(rand()), 0, 7));
                $expired_at = date("Y-m-d H:i:s", strtotime('+6 hours'));
                    
                $this->db->where('id', $userId)->update($this->table_user, array('last_login' => $last_login, 'token' => $token, 'expired_at' => $expired_at));
            
                return array('status' => 200, 'message' => 'Login was done Successfully!', 'token' => $token, 'id' => $userId, 'name'=> $userName);
            } else {
                return array('status' => 204, 'message' => 'Password Error!');
            }
        }
    }


    public function check_auth()
    {
        $user_auth_key  = $this->input->get_request_header('Authorization', true);

        if ($user_auth_key == $this->secret_key) {
            return true;
        } else {
            return json_response(401, array('status' => 401, 'message' => 'Unauthorized.'));
        }
    }

}
