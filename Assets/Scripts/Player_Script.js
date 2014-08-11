#pragma strict

var speed : int = 15;


//Health
var Health : float = 100;
var size : Vector2 = new Vector2(100, 10);
var progressBarEmpty : Texture2D;
var progressBarFull : Texture2D;
var progressBarChange : Texture2D;

var progressBarFullStyle : GUIStyle;
var progressBarEmptyStyle : GUIStyle;
var progressBarChangeStyle : GUIStyle;
var changeAlpha : float;

var playerGUI : playerGUI_Script;

// 0.707 = sin(45) which would be the sum of the horizontal and vertical vertor at 45
// TODO use equation instead  of constant if joystick supported
static var HOVER_FORCE_MODIFIER : float = 0.707;
static var BASE_HOVER_FORCE : int = 12000;

static var HALF_WIDTH : float = 8.5;
static var projectileLayer : int = 8;
static var playerLayer : int = 9;

//rigidBody2D movement
var hoverForce : int = BASE_HOVER_FORCE;
var velocity : Vector2;


//shooting

var fireRotation : Quaternion;
var shot_pref : Transform;
var fireRate : float;
@HideInInspector var nextShot : float = 0.0;








function Start () {
    Physics2D.IgnoreLayerCollision(projectileLayer, projectileLayer, true);
  Physics2D.IgnoreLayerCollision(playerLayer, projectileLayer, true);
 	fireRate = 0.15;
 	playerGUI = GameObject.FindGameObjectWithTag("GameManager").GetComponent(playerGUI_Script);
}

function FixedUpdate () {

	velocity = rigidbody2D.velocity;

//player movement and playable area limits


  OrientPlayerAxis(); // orient player rotation to current input direction

	if(MovingVertically()){
		CheckVerticalBounds();
		rigidbody2D.AddForce(Vector3.up * hoverForce * (Input.GetAxis("Vertical")));

	}

	if(MovingHorizontally()){
		rigidbody2D.AddForce(Vector3.right * hoverForce * (Input.GetAxis("Horizontal")));
	}


	if(MovingHorizontally() && MovingVertically()) {
    //reduce the hoverforce when 2 keys are pressed so that it doesnt move faster on diagonals
		if (hoverForce == BASE_HOVER_FORCE) {
			hoverForce *= HOVER_FORCE_MODIFIER;
		}
	}
	else {
		hoverForce = BASE_HOVER_FORCE;
	}




//shooting
	if (Input.GetAxis("Fire1")== 0){
		fireRotation = transform.rotation;
	}
	if (Input.GetAxis("Fire1")>0){
		if (Time.time >= nextShot){
		audio.Play();
      		Instantiate(shot_pref, Vector3(transform.position.x, transform.position.y , 0), fireRotation);
			nextShot = Time.time + fireRate;
		}
	}
		
	
//cap player health
	if(Health > 100){
		Health = 100;
	}
	if(Health <= 0 ) {
		onDeath();
	}
}

function OnCollisionEnter2D (col : Collision2D){

	if(col.gameObject.tag =="Enemy"){
			
			screenShake();
			playerGUI.changeAlphaSet();
			Health -= 10;
	}
	if(col.gameObject.tag =="HealthPickUp"){
			Health += 10;
	}
}

//helper functions
function MovingHorizontally(){
    return Input.GetAxis("Horizontal") != 0;
}

function MovingVertically(){
    return Input.GetAxis("Vertical") != 0;
}
function CheckVerticalBounds(){
    if (transform.position.y > HALF_WIDTH){
			transform.position.y = HALF_WIDTH;
		}
		else if (transform.position.y < -HALF_WIDTH){
			transform.position.y = -HALF_WIDTH;
		}

}

function OrientPlayerAxis(){
    if(MovingVertically() || MovingHorizontally())
     {

       var toVector2 = Vector2(Input.GetAxis("Horizontal"), Input.GetAxis("Vertical"));
       //get angle between origin ie vector2.up and current player input
       var angle  = GetAngleBetweenUpAndVector(toVector2);

      transform.rotation = Quaternion.Euler(0, 0, angle);
    }

  }
function GetAngleBetweenUpAndVector(toVector2 : Vector2)
{

    var angle = Vector2.Angle(Vector2.up, toVector2);

    //take cross product to determine quadrant
    var cross = Vector3.Cross(Vector2.up, toVector2);

    if (cross.z < 0)
    {
      //use quadrant knowledge to get 360 angle
      angle = 360 - angle;
    }
  return angle;

}

function OnGUI(){

	
	
//  GUI.BeginGroup ( Rect (Screen.width - 150, 30, size.x, size.y));
//  	GUI.Box (Rect (0,0, size.x, size.y),progressBarEmpty, progressBarEmptyStyle);
//  // draw the filled-in part:
//  	GUI.BeginGroup ( Rect (0, 0, size.x - 100 + (Health), size.y));
//  		GUI.Box (Rect (0,0, size.x, size.y),progressBarFull, progressBarFullStyle);
//  	GUI.EndGroup ();
//  	GUI.BeginGroup ( Rect (size.x - 100 + (Health),0, 10, size.y));
//  		GUI.color.a = changeAlpha;
//  		GUI.Box (Rect (0,0, size.x, size.y),"", progressBarChangeStyle);
//  	GUI.EndGroup ();
//  GUI.EndGroup ();
}



function screenShake() {

	var shakeDirection : int;
	var shakeForce : float = 0.2;
	
		for (var i = 0; i <= 5;){
			if (i % 2 == 0) {
				shakeDirection = 1;
			}
			else {
				shakeDirection = -1;
			}
		Camera.main.transform.Translate(Vector2.right * shakeForce * shakeDirection);
		yield WaitForSeconds (0.01);
		i++;		
		}
}

function onDeath (){
	Destroy(gameObject);

}
//
//function changeAlphaSet () {
//	changeAlpha = 1.0;
//	for (var i = 0; i <= 10;) {
//		changeAlpha -= i * 0.1;
//		yield WaitForSeconds (0.1);
//		i++;
//	} 
//}



