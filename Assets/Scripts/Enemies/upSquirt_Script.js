﻿#pragma strict

var health : int;
var pulseForce : int = 66;
var nextPulse : int;
var pulseInterval : int = 3;

var testGib_pref : Transform;
var baseEnemy_Explosion : GameObject;

var plume : GameObject;

function Start () {
	health = 20;
}

function Update () {
	
	
	
	if (Time.time >= nextPulse) {
		rigidbody2D.AddForce(transform.TransformDirection(Vector2.up) * pulseForce);
		Instantiate(plume , Vector2(transform.position.x, transform.position.y - 0.3), Quaternion.identity);
		nextPulse = Time.time + pulseInterval;
	}
	
	if (health <= 0 && collider2D != null) {
	collider2D.isTrigger = true;
		onDeath();
	}
}



function OnCollisionEnter2D (col : Collision2D) {
	if(col.gameObject.tag =="Projectile") {
		health -= 10;
		return;
	}
	if(col.gameObject.tag =="Wall" && col != null) {
		health = 0;
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
	
	Destroy(gameObject);
}

function AddNoiseToXPosition(){
  return transform.position.x + Random.Range(-0.1, 0.1);

}

function AddNoiseToYPosition(){
  return transform.position.y + Random.Range(-0.1, 0.1);

}