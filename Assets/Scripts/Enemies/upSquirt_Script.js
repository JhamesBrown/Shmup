#pragma strict

var health : int;
var pulseForce : int = 66;
var nextPulse : int;
var pulseInterval : int = 3;

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
}

function onDeath() {
	Destroy(gameObject);
}