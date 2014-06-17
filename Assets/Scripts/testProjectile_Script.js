#pragma strict
var shotForce : int;
 var g:float;
//var anim : Animator;


function Start () {
	shotForce = 700;
	//anim = GetComponent(Animator);
  //Physics.IgnoreCollision(clone.collider, collider);

	var relativeForce = transform.InverseTransformDirection(Vector2.up);
  Debug.Log(relativeForce);
  rigidbody2D.AddForce(new Vector2(relativeForce.x, relativeForce.y)*shotForce);
}

function Update () {


}

function OnCollisionEnter2D (col : Collision2D) {

  if(col.gameObject.tag =="Player")
  {
    //do nothing friendly fire is off
  }
  else
    {
	//anim.SetInteger("hit", 1);
	collider2D.isTrigger = true;
	yield WaitForSeconds(0.1);
	Destroy(gameObject);
    }
}
