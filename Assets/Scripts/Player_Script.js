﻿#pragma strict

var speed : int = 15;

//dash
var dash : boolean = false;
var dashDuration : float = 0.01;
var dashModifier : int = 10;
var dashCoolDown : float = 2;


//rigidBody2D movement
var hoverForce : int = 30;
var velocity : Vector2;

//shooting
var shot_pref : Transform;
var fireRate : float = 0.2;
@HideInInspector var nextShot : float = 0.0;



//screenShake effects
var shake : boolean = false;
var shakeDuration : float = 0.1; //duration of hit effect
@HideInInspector var shakeTime : float;

var PlayerGib_pref : Transform;


function Start () {

}

function Update () {

velocity = rigidbody2D.velocity;
//Debug.Log(velocity);

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
//		if (transform.position.x > 7.5){
//			transform.position.x = 7.5;
//		}
//		if (transform.position.x < -7.5){
//			transform.position.x = -7.5;
//		}
		//transform.Translate(Vector3((Input.GetAxis("Horizontal")) * speed * Time.deltaTime,0,0));
		rigidbody2D.AddForce(Vector3.right * hoverForce * (Input.GetAxis("Horizontal")));
	}
	
	
//reduce the hoverforce when 2 keys are pressed so that it doesnt move faster on diagonals
	if(Input.GetAxis("Horizontal") != 0 && Input.GetAxis("Vertical") != 0) {
		if (hoverForce == 30) {
			hoverForce *= 0.7;
		}
	}
	else {
		hoverForce = 30;
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
			Instantiate(shot_pref, Vector3(transform.position.x, transform.position.y + 0.5,0), Quaternion.identity);
	
			nextShot = Time.time + fireRate;
			shakeTime = Time.time;
			shake = true;
		}
		
	}
	

	
	

			
//screen shake		
//	if (shake && Time.time < shakeTime + shakeDuration){
//		Camera.main.transform.Translate(Vector3(Random.Range(-0.02,0.02),Random.Range(-0.02,0.02),0));
//	}
//	else
//	{
//		shake = false;
//		Camera.main.transform.position = (Vector3(transform.position.x / 3, transform.position.y / 3, -10));
//	}
		
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


	





