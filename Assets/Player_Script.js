#pragma strict

var speed : int = 8;

//dash
var dash : boolean = false;
var dashDuration : float = 0.05;
var dashModifier : int = 10;
var dashCoolDown : float = 2;


//rigidBody2D movement
var hoverForce : int = 10;

//shooting
var shot_pref : Transform;
var fireRate : float = 0.8;
@HideInInspector var nextShot : float = 0.0;



//screenShake effects
var shake : boolean = false;
var shakeDuration : float = 0.1; //duration of hit effect
@HideInInspector var shakeTime : float;

var PlayerGib_pref : Transform;


function Start () {

}

function Update () {
	


//player movement and playable area limits
	if(Input.GetAxis("Vertical") != 0){
		if (transform.position.y > 8.5){
			transform.position.y = 8.5;
		}
		if (transform.position.y < -8.5){
			transform.position.y = -8.5;
		}
		//transform.Translate(Vector3(0,(Input.GetAxis("Vertical")) * speed * Time.deltaTime,0));
		rigidbody2D.AddForce(Vector3.up * hoverForce * (Input.GetAxis("Vertical")));
	}
	
	if(Input.GetAxis("Horizontal") != 0){
		if (transform.position.x > 7.5){
			transform.position.x = 7.5;
		}
		if (transform.position.x < -7.5){
			transform.position.x = -7.5;
		}
		//transform.Translate(Vector3((Input.GetAxis("Horizontal")) * speed * Time.deltaTime,0,0));
		rigidbody2D.AddForce(Vector3.right * hoverForce * (Input.GetAxis("Horizontal")));
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
			Instantiate(shot_pref, Vector3(transform.position.x, transform.position.y,0), Quaternion.identity);
	
			nextShot = Time.time + fireRate;
			shakeTime = Time.time;
			shake = true;
		}
		
	}
	

	
	

			
//screen shake		
	if (shake && Time.time < shakeTime + shakeDuration){
		Camera.main.transform.Translate(Vector3(Random.Range(-0.05,0.05),Random.Range(-0.05,0.05),0));
	}
	else
	{
		shake = false;
		Camera.main.transform.position = (Vector3(transform.position.x / 3, transform.position.y / 3, -10));
	}
	
		
}

function OnCollisionEnter2D (col : Collision2D){

	if(col.gameObject.tag =="Enemy"){
			
			Destroy(col.gameObject);
			Destroy(gameObject);
			
			
			for (var i = 0; i < 200; i++){
				Instantiate(PlayerGib_pref, Vector3(transform.position.x, transform.position.y,0), Quaternion.identity);
			}
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


	





