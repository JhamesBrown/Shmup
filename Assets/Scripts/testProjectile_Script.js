#pragma strict
var shotForce : int;
 var g:float;
//var anim : Animator;


function Start () {
	shotForce = 700;

	var relativeForce = transform.InverseTransformDirection(Vector2.up);
  //Debug.Log(relativeForce);
  rigidbody2D.AddForce(new Vector2(relativeForce.x, relativeForce.y)*shotForce);
}

function Update () {


}

function OnCollisionEnter2D (col : Collision2D) {

  if(col.gameObject.tag =="Player" || col.gameObject.tag =="Projectile")
  {
    //do nothing friendly fire is off
  }
  else
    {
      collider2D.isTrigger = true;
      yield WaitForSeconds(0.1);
      Destroy(gameObject);
    }
}
