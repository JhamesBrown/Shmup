#pragma strict
var health : int;
var testGib_pref : Transform;
var baseEnemy_Explosion : GameObject;
@HideInInspector var gameManager : gameManager_Script;
var Velocity : Vector2;
var fallingVelocityMax : float;


function Start () {
	gameManager = GameObject.FindGameObjectWithTag("GameManager").GetComponent(gameManager_Script);
	health = 20;
	fallingVelocityMax = 0.8;
}

function Update () {

	Velocity = rigidbody2D.velocity;
	
	if (health <= 0 && collider2D != null) {
		collider2D.isTrigger = true;
		onDeath();
	}
	
	if (rigidbody2D.velocity.y > - fallingVelocityMax){
		rigidbody2D.AddForce(Vector2.up * (-1));
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