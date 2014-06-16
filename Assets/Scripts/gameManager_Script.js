#pragma strict
var testEnemy : GameObject;
var nextSpawn : int;
var spawnRate : int;
var gameTime : int;
var paused : boolean;
var	Enemy_test : Transform;

function Start () {
	paused = false;
	spawnRate = 1;
}

function Update () {

	if (Input.GetKey ("escape")) {
			Application.Quit();
	}
	gameTime = Time.time;

//spawning
	if (Time.time >= nextSpawn){
		spawn("test");

		nextSpawn = Time.time + spawnRate;
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

var barDisplay : float = 0;
var pos : Vector2 = new Vector2(20,40);
var size : Vector2 = new Vector2(60,20);
var progressBarEmpty : Texture2D;
var progressBarFull : Texture2D;
function OnGUI(){

	GUI.Box(Rect(Screen.width - 100, 50, 120,50),""+ gameTime);

  GUI.BeginGroup (new Rect (Screen.width - 100, 100, size.x, size.y));
        GUI.Box (Rect (0,0, size.x, size.y),progressBarEmpty);

        // draw the filled-in part:
        GUI.BeginGroup (new Rect (0, 0, size.x * barDisplay, size.y));
            GUI.Box (Rect (0,0, size.x, size.y),progressBarFull);
        GUI.EndGroup ();

    GUI.EndGroup ();

}

//enemy spawn functions
function spawn(enemy : String){

	if (enemy == "test"){
		Instantiate(Enemy_test, Vector2(Random.Range(-8,8),7), Quaternion.identity);
	}

}
