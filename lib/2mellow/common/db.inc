<?

class db {
	
    function __construct(){
		try {
			$this->db = new PDO('mysql:host=localhost;dbname=cluthd_wifi', 'cluthd_wifi', '*,3fm-dU$DD=');
			$this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		}
		catch( PDOException $e ) {
			echo "error ". $e->getMessage();
		}
    }
	
	public function fetch_single_row($sql, $data = array("")){
        if( $data !== null )
            $data = array_values( $data ); // Incase it's an associative array
        $sel = $this->db->prepare( $sql );
        $sel->execute( $data );
        $sel->setFetchMode( PDO::FETCH_OBJ );
        $obj = $sel->fetch();
        return $obj;
    }

    public function execute($sql, $data = array("")){
        if( $data !== null )
            $data = array_values( $data ); // Incase it's an associative array
        $sel = $this->db->prepare( $sql );
        $sel->execute( $data );
        return true;
    }
	
    public function fetch_multiple_rows($sql, $data = array(""), $base=false, $page=false, $resultsPerPage=14){
		
		//paginataion coding
		if($page!==false){
			
			//set paginatation session
			$rownums = $this->countrows($sql, $data);
			$pages = ceil($rownums / $resultsPerPage);
			
			if ($page < 1) $page = 1;
			$limitStart = ($page * $resultsPerPage) - $resultsPerPage;
			$sql = $sql . " limit " . $limitStart . ", " . $resultsPerPage;
			
			$_SESSION['paging']['html'] = "<ul class='pagination'>";
			for($x = 1; $x <= $pages; $x++){
				if($page == $x){ $inj = ' class="active"'; } else { $inj = ''; }
				$_SESSION['paging']['html'] .= "<li".$inj."><a href='".$base."?page=".$x."'>".$x."</a></li>";
			}
			$_SESSION['paging']['html'] .= "</ul>";
		}
		
        if( $data !== null )
            $data = array_values( $data ); // Incase it's an associative array
        $sel = $this->db->prepare( $sql );
        $sel->execute( $data );
        $sel->setFetchMode( PDO::FETCH_OBJ );
		$obj = $sel->fetchAll();
        return $obj;
    }
	
    public function countrows($sql, $data)
    {
        if( $data !== null )
            $data = array_values( $data ); // Incase it's an associative array
        $ins = $this->db->prepare( $sql );
        $ins->execute( $data );
		return $ins->rowCount();
    }
	
    public function insert($sql, $data){
        if( $data !== null )
            $data = array_values( $data ); // Incase it's an associative array
        $ins = $this->db->prepare( $sql );
        $ins->execute( $data );
    }

	public function lastid(){
        if($this->db->lastInsertID()){
			return $this->db->lastInsertID();
		} else {
			return false;
		}
    }
	
	public function dbinsert($data, $tbl, $id = false){
		
		if(!empty($id)){
			
			//set dynamic update
			$sql = "UPDATE `".$tbl."` SET ";
			
			$fields = '';
			foreach($data as $k => $v){
				$fields .= "`".$k."`=?, ";
			}
			
			$sql .= rtrim($fields, ", ");
			
			$sql .= " WHERE id = '".$id."';";
			
		} else {
			
			//set new insert
			$sql = "INSERT INTO `".$tbl."` (";
			
			$fields = '';
			foreach($data as $k => $v){
				$fields .= "`".$k."`, ";
			}
			
			$sql .= rtrim($fields, ", ");
			
			$sql .= ") VALUES (";
			
			$values = '';
			foreach($data as $k => $v){
				$values .= "?, ";
			}
			
			$sql .= rtrim($values, ", ");
			
			$sql .= ")";
			
		}
		
		//now database insert
		$this->insert($sql, $data);
		
	}
	
    public function close(){
        $this->pdo = null;
    }
        
    public function __destruct(){
        $this->pdo = null;
    }
}