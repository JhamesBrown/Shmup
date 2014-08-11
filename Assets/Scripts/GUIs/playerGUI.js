#pragma strict
var statsGUIStyle : GUIStyle;
var statsGUIStyleLabels : GUIStyle;

var size : Vector2 = new Vector2(100, 10);
var healthBarEmpty : Texture2D;
var healthBarFull : Texture2D;
var healthBarChange : Texture2D;

var healthBarFullStyle : GUIStyle;
var healthBarEmptyStyle : GUIStyle;
var healthBarChangeStyle : GUIStyle;
var changeAlpha : float;

var gameManager : gameManager_Script;
var player : Player_Script;

function Start () {
	gameManager = GameObject.FindGameObjectWithTag("GameManager").GetComponent(gameManager_Script);
	player = GameObject.FindGameObjectWithTag("Player").GetComponent(Player_Script);
}

function Update () {

}

function OnGUI(){

	//healthBar
	GUI.BeginGroup ( Rect (Screen.width - 150, 30, size.x, size.y));
  		GUI.Box (Rect (0,0, size.x, size.y),healthBarEmpty, healthBarEmptyStyle);
  // draw the filled-in part:
  		GUI.BeginGroup ( Rect (0, 0, size.x - 100 + (player.Health), size.y));
  			GUI.Box (Rect (0,0, size.x, size.y),healthBarFull, healthBarFullStyle);
  		GUI.EndGroup ();
  		GUI.BeginGroup ( Rect (size.x - 100 + (player.Health),0, 10, size.y));
  			GUI.color.a = changeAlpha;
  			GUI.Box (Rect (0,0, size.x, size.y),"", healthBarChangeStyle);
  		GUI.EndGroup ();
  	GUI.EndGroup ();

	
	//Stats	
	GUI.BeginGroup ( Rect (Screen.width - 150, 100, 100, 100));
		GUI.Box(Rect(0, 0, 100, 50), ""+gameManager.enemiesKilled, statsGUIStyle);
		GUI.Box(Rect(0, 50, 100, 50), "Enemies \n Destroyed", statsGUIStyleLabels);
	GUI.EndGroup ();



}

function changeAlphaSet () {
	changeAlpha = 1.0;
	for (var i = 0; i <= 10;) {
		changeAlpha -= i * 0.1;
		yield WaitForSeconds (0.1);
		i++;
	} 
}
