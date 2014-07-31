#pragma strict
var shotForce : int;
var anim : Animator;
static var GibsLayer : int = 12;
static var projectileLayer : int = 8;

function Start () {
	Physics2D.IgnoreLayerCollision(GibsLayer, projectileLayer, true);
 	Physics2D.IgnoreLayerCollision(projectileLayer, GibsLayer, true);
	shotForce = 550;
	anim = GetComponent(Animator);
	rigidbody2D.AddForce(transform.rotation*Vector3.one * shotForce);
}

function Update () {


}

function OnCollisionEnter2D (col : Collision2D) {

	anim.SetInteger("hit", 1);
	collider2D.isTrigger = true;
	yield WaitForSeconds(0.1);
	Destroy(gameObject);
}
