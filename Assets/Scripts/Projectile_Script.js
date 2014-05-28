#pragma strict
var shotForce : int;
var anim : Animator;


function Start () {
	shotForce = 350;
	
	anim = GetComponent(Animator);
	rigidbody2D.AddForce(Vector3.up * shotForce);
}

function Update () {
	
}

function OnCollisionEnter2D (col : Collision2D) {
	collider2D.isTrigger = true;
	anim.SetInteger("hit", 1);
	yield WaitForSeconds(0.3);
	Destroy(gameObject);
}