#pragma strict
var testEnemy : GameObject;
var nextSpawn : int;
var spawnRate : int;
var gameTime : int = 0 ;
var paused : boolean;
var	Enemy_test : Transform;

var SpawnGUI : Transform;
var SpawnGUIstaged : GameObject;
var spawnGUIon : boolean;

function Start () {
	paused = false;
	spawnRate = 1;
	spawnGUIon = false;
}

function Update () {

	if (Input.GetKey ("escape")) {
			Application.Quit();
	}
	gameTime = Time.time;


	if (Input.GetKeyDown("`") && spawnGUIon == false) {
		spawnGUIon = true;
		Instantiate(SpawnGUI, Vector2.zero, Quaternion.identity);
		Debug.Log("GUIon");
	} 
	
}

function pause (){
//pause & unpause
	if(paused == false){
		Time.timeScale = 0;
		paused = true;
	}
	else
	{
		Time.timeScale = 1;
		paused = false;

	}
}



//function OnGUI(){
//GUI.Box(Rect(Screen.width - 100, 50, size.x, size.y), ""+gameTime);
//}
var size : Vector2 = new Vector2(120,50);


