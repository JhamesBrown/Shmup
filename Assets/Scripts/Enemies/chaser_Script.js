﻿#pragma strict
var health : int;
var testGib_pref : Transform;
var baseEnemy_Explosion : GameObject;
var EnemyLayer : int = 11;
var GibsLayer : int = 12;

static var SPEED : int = 20;

function Start () {
	Physics2D.IgnoreLayerCollision(GibsLayer, EnemyLayer, true);
 	Physics2D.IgnoreLayerCollision(EnemyLayer, GibsLayer, true);
	health = 10;
	transform.localRotation.eulerAngles = Vector3(-90,0,0);
}

function FixedUpdate () {
	if (health <= 0 && collider2D != null) {
		collider2D.isTrigger = true;
		onDeath();
	}
	
	
	
	rigidbody2D.AddForce(transform.TransformDirection(Vector3.down) * Time.deltaTime * SPEED);
	
	rigidbody2D.fixedAngle = true;
	
	
}

function OnCollisionEnter2D (col : Collision2D) {

	if(col.gameObject.tag =="Projectile") {
		health -= 10;
	}

	if(col.gameObject.tag =="Wall" && col != null) {
		Destroy(transform.parent.gameObject);
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
	Destroy(transform.parent.gameObject);
	Destroy(gameObject);
	
}

function AddNoiseToXPosition(){
  return transform.position.x + Random.Range(-0.1, 0.1);

}

function AddNoiseToYPosition(){
  return transform.position.y + Random.Range(-0.1, 0.1);

}