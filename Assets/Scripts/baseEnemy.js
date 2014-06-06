#pragma strict
var anim : Animator;
var health : int;

function Start () {
	anim = GetComponent(Animator);
	health = 100;
}

function Update () {
	if (health <= 0) {
	collider2D.isTrigger = true;
		onDeath();
	}
}
function OnCollisionEnter2D (col : Collision2D) {
	anim.SetInteger("state", 1);
	health -= 20;
	yield WaitForSeconds(0.3);
	anim.SetInteger("state", 0);
}

function onDeath() {
	anim.SetInteger("state", 2);
	yield WaitForSeconds(0.167);
	Destroy(gameObject);
}