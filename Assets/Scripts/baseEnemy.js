#pragma strict
var anim : Animator;
var health : int;

function Start () {
	anim = GetComponent(Animator);
	health = 20;
}

function Update () {
	if (health <= 0 && collider2D != null) {
	collider2D.isTrigger = true;
		onDeath();
	}
}
function OnCollisionEnter2D (col : Collision2D) {
	
	if(col.gameObject.tag =="Projectile") {
		anim.SetInteger("state", 1);
		health -= 10;
		yield WaitForSeconds(0.3);
		anim.SetInteger("state", 0);
		return;
	}
	
	if(col.gameObject.tag =="Wall" && col != null) {
		health = 0;
	}
}

function onDeath() {
	anim.SetInteger("state", 2);
	yield WaitForSeconds(0.5);
	Destroy(gameObject);
}