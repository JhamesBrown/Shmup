#pragma strict
var shotForce : int;
//var anim : Animator;


function Start () {
	shotForce = 500;
	//anim = GetComponent(Animator);
	rigidbody2D.AddForce(Vector3.up * shotForce);
}

function Update () {
	
	
}

function OnCollisionEnter2D (col : Collision2D) {
	
	//anim.SetInteger("hit", 1);
	collider2D.isTrigger = true;
	yield WaitForSeconds(5.1);
	Destroy(gameObject);
}