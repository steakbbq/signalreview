<?

class places {
	
    function places() {
        global $db;
        $this->db = $db;
    }
	
	function wasReviewed($googleid){
		if($googleid)
			if($r = $this->db->fetch_single_row("SELECT id FROM `places` WHERE googleid = ?", array($googleid)))
				return true;
	}
	
}