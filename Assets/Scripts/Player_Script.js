#pragma strict

var speed : int = 15;


//Health
var Health : float = 100;
var size : Vector2 = new Vector2(100, 10);
var progressBarEmpty : Texture2D;
var progressBarFull : Texture2D;

var progressBarFullStyle : GUIStyle;
var progressBarEmptyStyle : GUIStyle;

//dash
var dash : boolean = false;
var dashDuration : float = 0.01;
var dashModifier : int = 10;
var dashCoolDown : float = 2;


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
var shot_pref : Transform;
var fireRate : float = 0.2;
@HideInInspector var nextShot : float = 0.0;



//screenShake effects
var shake : boolean = false;
var shakeDuration : float = 0.1; //duration of hit effect
@HideInInspector var shakeTime : float;




function Start () {
    Physics2D.IgnoreLayerCollision(projectileLayer, projectileLayer, true);
  Physics2D.IgnoreLayerCollision(playerLayer, projectileLayer, true);
}

function Update () {

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


// dash rewrite
	if (dash == false){
		if (Input.GetAxis("Dash")){
			dash = true;
			dashFunction();
			}
			renderer.material.color = Color(1,1,1);
	}

//shooting
	if (Input.GetAxis("Fire1")){
		if (Time.time >= nextShot){
      var angle = GetAngleBetweenUpAndVector(velocity);

			Instantiate(shot_pref, Vector3(transform.position.x, transform.position.y , 0), Quaternion.Euler(0, 0, angle));

			nextShot = Time.time + fireRate;
			shakeTime = Time.time;
			shake = true;
		}

	}
}

function OnCollisionEnter2D (col : Collision2D){

	if(col.gameObject.tag =="Enemy"){

			//Destroy(col.gameObject);
			Health -= 10;


	}
}

function dashFunction(){
	speed *= dashModifier;
	renderer.material.color = Color(1,0.0,0.0);
	yield WaitForSeconds(dashDuration);
	speed /= dashModifier;
	yield WaitForSeconds (dashCoolDown);
	dash = false;
}

//will change the sprite to the appropriate stage of movement and direction
function spriteMovement (movementState, rotation) {

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

	
	
  GUI.BeginGroup ( Rect (Screen.width - 200, 30, size.x, size.y));
  	GUI.Box (Rect (0,0, size.x, size.y),progressBarEmpty, progressBarEmptyStyle);
  // draw the filled-in part:
  	GUI.BeginGroup ( Rect (0, 0, size.x - 100 + (Health), size.y));
  	GUI.Box (Rect (0,0, size.x, size.y),progressBarFull, progressBarFullStyle);
  	GUI.EndGroup ();
  GUI.EndGroup ();
}







