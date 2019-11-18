<?php
require_once(__DIR__ . '/DbLink.php');
require_once(__DIR__ . '/Validator.php');

class e_otb_exception extends Exception {}
class e_login_exception extends e_otb_exception {}

class DbBase extends DbPDO 
{      
    // проверка авторизации пользователя    
    public function access() 
	{
        if (isset($_COOKIE['token'])) {
            if (strlen($_COOKIE['token']) != 32) {
                setcookie('token','',time()-3600,'/');
                return false;
            }    
            $sql = "SELECT `ip`,`expire`,`userId` FROM Token WHERE `token`=:token";
            $stmt = $this->db->prepare($sql);
            $stmt->bindValue(':token', $_COOKIE['token'], PDO::PARAM_STR);
            $stmt->execute();
            $rows = $stmt->fetch(PDO::FETCH_OBJ);   
            if (!$rows || $rows->ip != $_SERVER['REMOTE_ADDR']) {
                if ($rows) {
                    $sql = 'DELETE FROM Token WHERE `token`=:token';
                    $stmt = $db->prepare($sql);
                    $stmt->bindValue(':token', $_COOKIE['token'], PDO::PARAM_STR);
                    $stmt->execute();
                }
                setcookie('token','',time()-3600,'/');
                return false;
            } else {
                return ($rows->ip == $_SERVER['REMOTE_ADDR'] && (strtotime($rows->expire) > strtotime("now")));
            } 
        } else {
            return false;
        }
    }
    
    public function login($email, $password) 
	{        
        $sql = 'SELECT * FROM User WHERE `email`=:email';       
        $stmt = $this->db->prepare($sql);
        $stmt->bindValue(':email', $email, PDO::PARAM_STR);
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_OBJ); 

        if ($row && password_verify($password, $row->password)) {   
            while (true) {
                $token = md5(uniqid());
                $checktoken = $this->db->query(
                    'SELECT COUNT(*) FROM Token'.
                    ' WHERE `token`="'.$token.'"')->fetch(PDO::FETCH_NUM);
                if ($checktoken[0] == 0) break;
            }
            $hash = md5(uniqid());
            setcookie('token',$token,time()+60*60*24*7,'/');
            $sql=
                'INSERT INTO Token(`token`,`ip`,`expire`,`userId`) ' .
                'VALUES (:token, :ip, DATE_ADD(NOW(), INTERVAL 7 DAY), :userId)';
            $stmt = $this->db->prepare($sql);
            $stmt->bindValue(':token', $token, PDO::PARAM_STR);
            $stmt->bindValue(':ip', $_SERVER['REMOTE_ADDR'], PDO::PARAM_STR);
            $stmt->bindValue(':userId', (int)$row->id, PDO::PARAM_INT);
            $res = $stmt->execute();
            if ($res) {
                return $token; 
            } else {
                return false; 
            }     
        } else {
            return false; 
        }    
    }
	
	 public function reg($email, $password) 
	 {        
            $sql=
                'INSERT INTO User(`email`,`password`,`blocked`) ' .
                'VALUES (:email, :password, :blocked)';
            $stmt = $this->db->prepare($sql);
            $stmt->bindValue(':email', $email, PDO::PARAM_STR);
			$password = password_hash($password, PASSWORD_DEFAULT);
            $stmt->bindValue(':password', $password, PDO::PARAM_STR);
			$stmt->bindValue(':blocked', 1, PDO::PARAM_INT);
            $res = $stmt->execute();
            if ($res) {			
				$urlParse = explode('/', $_SERVER['HTTP_REFERER']);
				$url = $urlParse[0] . '//' . $urlParse[2] . '/activation.php?email=' . $email;
				$subject = "Подтверждение регистрации"; 
				$message = ' <p>Перейдите по ссылке для подтверждения Вашей регистрации!!!</p><a href="' .$url. '">Подтвердить</a></br>';
				$headers  = "Content-type: text/html; charset=windows-1251 \r\n"; 
				$headers .= "From: От кого письмо <from@example.com>\r\n"; 
				$headers .= "Reply-To: reply-to@example.com\r\n"; 
				mail($email, $subject, $message, $headers);
                return true; 
            } else {
                return false; 
            }        
    }
	
	public function activation($email) 
	{  		 
		$query = "SELECT * FROM User WHERE email = '$email'";
		$stmt = $this->db->prepare($query);
		$stmt->execute();
		$row = $stmt->fetch(PDO::FETCH_ASSOC);
		if ($row) {	
				$sql = "UPDATE User SET blocked=:blocked WHERE `email`=:email";
				$stmt = $this->db->prepare($sql);
				$stmt->bindValue(':email', $email, PDO::PARAM_STR);
				$stmt->bindValue(':blocked', 0, PDO::PARAM_BOOL);	
				return $stmt->execute();
		} else {
			return false;
		}		
    }
	
    public function logout() 
	{ 
        if (isset($_COOKIE['token'])) {
            $sql = 'DELETE FROM Token WHERE `token`=:token';
            $stmt = $this->db->prepare($sql);
            $stmt->bindValue(':token', $_COOKIE['token'], PDO::PARAM_STR);
            setcookie('token', '', time()-60*60*24*7, '/');
            return $stmt->execute();  
        } else {
            return true;
        }   
    }
	
	public function getBadusers() 
	{
		$query = "SELECT * FROM Badusers";
		$stmt = $this->db->prepare($query);
		$stmt->execute();
		$items = array();
		while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {	
			$items[] = (object) array(
				"id"      => (int)$row['id'],
				"name"    => $row['name'],
				"surname"    => $row['surname'],
				"patronymic"    => $row['patronymic'],
				"city"    => $row['city'],
				"phone"    => $row['phone'],
				"comment"    => $row['comment']
			);       
		}
		return $items;
    }
	
	public function getBadusersSearch($name, $surname, $patronymic, $city, $phone) 
	{
		 $whereArray = array();   

        if ($name != '') {
            array_push($whereArray, "(name = '$name')");
        }

		if ($surname != '') {
            array_push($whereArray, "(surname = '$surname')");
        }
   
         if ($patronymic != '') {
            array_push($whereArray, "(patronymic = '$patronymic')");
        }
		
		if ($city != ''){
            array_push($whereArray, "(city = '$city')");
        }
		
		if ($phone != '') {
            array_push($whereArray, "(phone = '$phone')");
        }
        $where = '';
        if (count($whereArray) > 0) {
            $where = ' WHERE ' . implode(' AND ', $whereArray);                
        }
		
		$query = "SELECT * FROM Badusers" . $where;
		$stmt = $this->db->prepare($query);
		$stmt->execute();
		$items = array();
		while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {	
			$items[] = (object) array(
				"id"      => (int)$row['id'],
				"name"    => $row['name'],
				"surname"    => $row['surname'],
				"patronymic"    => $row['patronymic'],
				"city"    => $row['city'],
				"phone"    => $row['phone'],
				"comment"    => $row['comment']
			);       
		}
		return $items;
    }
	
	public function detail($phone) 
	{
		$query = "SELECT * FROM Badusers WHERE phone = '$phone'";
		$stmt = $this->db->prepare($query);
		$stmt->execute();
		$items = array();
		while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {	
			$items[] = (object) array(
				"id"      => (int)$row['id'],
				"name"    => $row['name'],
				"surname"    => $row['surname'],
				"patronymic"    => $row['patronymic'],
				"city"    => $row['city'],
				"phone"    => $row['phone'],
				"comment"    => $row['comment']
			);       
		}
		return $items;
    }
                            
    public function addBadUser($name, $surname, $patronymic, $city, $phone, $comment) 
	{		
        $query = 'INSERT INTO Badusers(`name`, `surname`, `patronymic`, `city`, `phone`, `comment`) ' .
		         'VALUES (:name, :surname, :patronymic, :city, :phone, :comment)';
        $stmt = $this->db->prepare($query);
		
		$stmt->bindValue(':name', $name, PDO::PARAM_STR);
		$stmt->bindValue(':surname', $surname, PDO::PARAM_STR);
		$stmt->bindValue(':patronymic', $patronymic, PDO::PARAM_STR);
		$stmt->bindValue(':city', $city, PDO::PARAM_STR);
		$stmt->bindValue(':phone', $phone, PDO::PARAM_STR);
		$stmt->bindValue(':comment', $comment, PDO::PARAM_STR);

        if ($stmt->execute()) {
            return $this->db->lastInsertId();
        } else {
            return false; 
        }
    }           
}