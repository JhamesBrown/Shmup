#pragma strict
var shotForce : int;
//var anim : Animator;


function Start () {
	shotForce = 750;
	//anim = GetComponent(Animator);
	rigidbody2D.AddForce(transform.rotation * Vector3.one * shotForce);
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
