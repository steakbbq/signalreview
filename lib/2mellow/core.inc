<?
session_start();

if (get_magic_quotes_gpc()) {
    function stripslashes_gpc(&$value){
        $value = stripslashes($value);
    }
    array_walk_recursive($_GET, 'stripslashes_gpc');
    array_walk_recursive($_POST, 'stripslashes_gpc');
    array_walk_recursive($_COOKIE, 'stripslashes_gpc');
    array_walk_recursive($_REQUEST, 'stripslashes_gpc');
}

//We are going to auto-include all the common inc files.
function findfiles($location='',$fileregex='') {
	if (!$location or !is_dir($location) or !$fileregex) {
	   return false;
	}
	
	$matchedfiles = array();
	
	//Open and read include directory.
	$all = opendir($location);
	while ($file = readdir($all)) {
	   if (!is_dir($location.'/'.$file)) {
		  if (preg_match($fileregex,$file)) {
			 array_push($matchedfiles,$location.'/'.$file);
		  }
	   }
	}
	
	closedir($all);
	unset($all);
	
	return $matchedfiles;
}

//INCLUDE COMMON FILES
$files = findfiles(dirname(__FILE__) . '/common/','/\.(inc)$/'); 

if($files) {
	while (list($key, $value) = each($files)) {
		include_once("$value");
	}
}

//Gentlemen, start your engines!
$db = new db();
$user = new user();

//set timezone on server and mysql database
//Both set as UTC for now
date_default_timezone_set('UTC');
$db->execute("SET time_zone = '+00:00'");
setlocale(LC_MONETARY, 'en_US');

?>