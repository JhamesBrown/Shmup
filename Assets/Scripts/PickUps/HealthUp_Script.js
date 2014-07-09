#pragma strict
static var hoverForce : int = 30;

function Start () {
	rigidbody2D.AddForce(Vector3.down * hoverForce);
}

function Update () {

}

function OnCollisionEnter2D (col : Collision2D){

	if(col.gameObject.tag =="Player"){
			Destroy(gameObject);
	}
}