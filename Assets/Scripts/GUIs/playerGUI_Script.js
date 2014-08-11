#pragma strict
var statsGUIStyle : GUIStyle;
var statsGUIStyleLabels : GUIStyle;
var statsLabelLeading : int;

var size : Vector2 = new Vector2(100, 50);
var healthBarEmpty : Texture2D;
var healthBarFull : Texture2D;
var healthBarChange : Texture2D;

var healthBarFullStyle : GUIStyle;
var healthBarEmptyStyle : GUIStyle;
var healthBarChangeStyle : GUIStyle;
var changeAlpha : float;

var statsPosition : Vector2;
var statsSize : Vector2;

var gameManager : gameManager_Script;
var player : Player_Script;

function Start () {
	gameManager = GameObject.FindGameObjectWithTag("GameManager").GetComponent(gameManager_Script);
	player = GameObject.FindGameObjectWithTag("Player").GetComponent(Player_Script);
}

function Update () {
	
	if (player==null) {
		statsPosition = Vector2((Screen.width / 2) - 50 , 100 );
		statsSize = Vector2(200,800);
		statsGUIStyle.fontSize = 150;
		statsGUIStyle.normal.textColor = Color(255.0/255.0, 190.0/255.0, 20.0/255.0);
		statsLabelLeading = 200;
	}
	else {
		statsPosition = Vector2( Screen.width - 150, 100);
		statsSize = Vector2(100,200);
		statsLabelLeading = 50;
	}
	
	
}

function OnGUI(){
	if (player != null) {
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
	  			GUI.color.a = 1;
	  		GUI.EndGroup ();
	  	GUI.EndGroup ();
	}
	
//Stats	
	
	GUI.BeginGroup ( Rect (statsPosition.x , statsPosition.y, statsSize.x, statsSize.y));
		GUI.Box(Rect(0, 0, statsSize.x , 50), ""+gameManager.enemiesKilled, statsGUIStyle);
		GUI.Box(Rect(0, statsLabelLeading, statsSize.x, 50), "Enemies \n Destroyed", statsGUIStyleLabels);
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
