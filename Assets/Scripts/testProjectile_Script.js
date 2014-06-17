#pragma strict
var shotForce : int;
//var anim : Animator;


function Start () {
	shotForce = 300;
	//anim = GetComponent(Animator);
	var relativeForce = transform.InverseTransformDirection(Vector2.up);
  Debug.Log(relativeForce);
  rigidbody2D.AddForce(new Vector2(relativeForce.x, relativeForce.y)*shotForce);

}

function Update () {


}

function OnCollisionEnter2D (col : Collision2D) {

	//anim.SetInteger("hit", 1);
	collider2D.isTrigger = true;
	yield WaitForSeconds(5.1);
	Destroy(gameObject);
}
