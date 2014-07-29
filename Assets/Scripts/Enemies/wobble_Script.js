#pragma strict
var health : int;
var testGib_pref : Transform;
var baseEnemy_Explosion : GameObject;
@HideInInspector var gameManager : gameManager_Script;
var Velocity : Vector2;
var fallingVelocityMax : float;
var downwardForce : float;
var anim : Animator;

var state : int;
static var LEFT : int = 0;
static var RIGHT : int = 1;
var sideSwapInterval : float;
var sideSwapTime : float;
var sideSwapForce : int;

function Start () {
	gameManager = GameObject.FindGameObjectWithTag("GameManager").GetComponent(gameManager_Script);
	health = 20;
	fallingVelocityMax = 0.8;
	anim = GetComponent(Animator);
	sideSwapInterval = 2.1;
	sideSwapTime = Time.time + sideSwapInterval;
	sideSwapForce = 1000;
	downwardForce = 200;
}

function Update () {
	if (sideSwapTime < Time.time){
		sideSwapTime = Time.time + sideSwapInterval;
		sideSwap();
	}

	Velocity = rigidbody2D.velocity;
	
	if (health <= 0 && collider2D != null) {
		collider2D.isTrigger = true;
		onDeath();
	}
	
	if (rigidbody2D.velocity.y > - fallingVelocityMax){
		rigidbody2D.AddForce(Vector2.up * (-1) * downwardForce);
	}
}

function OnCollisionEnter2D (col : Collision2D) {

	if(col.gameObject.tag =="Projectile") {
		health -= 10;
	}

	if(col.gameObject.tag =="Wall" && col != null) {
		Destroy(gameObject);
	}
	if(col.gameObject.tag =="Player" && col != null) {
		health = 0;
	}
}

function sideSwap (){
	if (state == LEFT) {
		anim.SetInteger("state", 1);
		yield WaitForSeconds (0.4);
		rigidbody2D.AddForce(Vector2.right * sideSwapForce);
		state = RIGHT;
		
		return;
	}
	if (state == RIGHT) {
		anim.SetInteger("state", 0);
		yield WaitForSeconds (0.4);
		rigidbody2D.AddForce(Vector2.right * (-1) * sideSwapForce);
		state = LEFT;
		
		return;
	}	
}

function onDeath() {

	Instantiate (baseEnemy_Explosion,Vector2(transform.position.x, transform.position.y), Quaternion.identity);
	for (var i = 0; i < 15; i++){
			Instantiate(testGib_pref, Vector2( AddNoiseToXPosition(), AddNoiseToYPosition()), Quaternion.identity);
	}
	gameManager.enemiesKilled ++;
	Destroy(gameObject);
}

function AddNoiseToXPosition(){
  return transform.position.x + Random.Range(-0.1, 0.1);

}

function AddNoiseToYPosition(){
  return transform.position.y + Random.Range(-0.1, 0.1);

}