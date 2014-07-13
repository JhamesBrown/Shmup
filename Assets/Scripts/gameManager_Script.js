#pragma strict
var testEnemy : GameObject;
var nextSpawn : int;
var spawnRate : int;
var gameTime : int = 0 ;
var paused : boolean;
var enemiesKilled : int;

var SpawnGUI : Transform;
var SpawnGUIstaged : GameObject;
var spawnGUIon : boolean;

var statsGUIStyle : GUIStyle;
var statsGUIStyleLabels : GUIStyle;

function Start () {
	paused = false;
	spawnRate = 1;
	spawnGUIon = false;
	enemiesKilled = 0;
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



function OnGUI(){
GUI.BeginGroup ( Rect (Screen.width - 150, 100, 100, 100));

GUI.Box(Rect(0, 0, 100, 50), ""+enemiesKilled, statsGUIStyle);
GUI.Box(Rect(0, 50, 100, 50), "Enemies \n Destroyed", statsGUIStyleLabels);
GUI.EndGroup ();

}
var size : Vector2 = new Vector2(120,50);


