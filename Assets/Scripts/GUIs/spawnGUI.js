#pragma strict
var gameManager : gameManager_Script;
var spawnManager : spawnManager_Script;


static var GUI_X_LEFT_ALIGN : int = 140;
static var GUI_Y_TOP :int = 50;
static var GUI_WIDTH : int = 200;
static var GUI_BASE_ROW_HEIGHT : int = 20;
static var GUI_BTN_WIDTH : int = 20;
 
function Start () {
	gameManager = GameObject.FindGameObjectWithTag("GameManager").GetComponent(gameManager_Script);
	spawnManager = GameObject.Find("spawnManager").GetComponent(spawnManager_Script);
}

function Update () {
	if (Input.GetKeyDown("`")) {
		gameManager.spawnGUIon = false;
		Destroy(gameObject);
		
	}
}

function OnGUI () {
	//row 1
	GUI.Box(Rect(GUI_X_LEFT_ALIGN, GUI_Y_TOP, GUI_WIDTH, GUI_BASE_ROW_HEIGHT), "bunch of text and vars  \n for spawning stuff");
	
	//row 2
	GUI.Box(Rect(GUI_X_LEFT_ALIGN, GUI_Y_TOP + GUI_BASE_ROW_HEIGHT, GUI_WIDTH - (GUI_BTN_WIDTH * 2 ), GUI_BASE_ROW_HEIGHT), "Amount in wave:"+ spawnManager.amountinWave);
	if(GUI.Button(Rect(GUI_X_LEFT_ALIGN + GUI_WIDTH - (GUI_BTN_WIDTH * 2 ),  GUI_Y_TOP + GUI_BASE_ROW_HEIGHT, GUI_BTN_WIDTH, GUI_BASE_ROW_HEIGHT),"<")) {
		spawnManager.amountinWave--;
	}
	if(GUI.Button(Rect(GUI_X_LEFT_ALIGN + GUI_WIDTH - (GUI_BTN_WIDTH * 1 ), GUI_Y_TOP + GUI_BASE_ROW_HEIGHT, GUI_BTN_WIDTH, GUI_BASE_ROW_HEIGHT),">")) {
		spawnManager.amountinWave++;
	}
	
	//row 3
	GUI.Box(Rect(GUI_X_LEFT_ALIGN, GUI_Y_TOP + (GUI_BASE_ROW_HEIGHT * 2), GUI_WIDTH - (GUI_BTN_WIDTH * 2 ), GUI_BASE_ROW_HEIGHT), "SpawnInterval:" + spawnManager.spawnInterval);
	if(GUI.Button(Rect(GUI_X_LEFT_ALIGN + GUI_WIDTH - (GUI_BTN_WIDTH * 2 ), GUI_Y_TOP + (GUI_BASE_ROW_HEIGHT * 2), GUI_BTN_WIDTH, GUI_BASE_ROW_HEIGHT),"<")) {
		spawnManager.spawnInterval-= 0.2;
	}
	if(GUI.Button(Rect(GUI_X_LEFT_ALIGN + GUI_WIDTH - (GUI_BTN_WIDTH * 1 ), GUI_Y_TOP + (GUI_BASE_ROW_HEIGHT * 2), GUI_BTN_WIDTH, GUI_BASE_ROW_HEIGHT),">")) {
		spawnManager.spawnInterval+= 0.2;
	}
}