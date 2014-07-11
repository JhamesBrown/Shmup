#pragma strict
static var hoverForce : int = 30;
static var pickUpsLayer : int = 13;
static var projectileLayer : int = 8;

function Start () {

	Physics2D.IgnoreLayerCollision(projectileLayer, pickUpsLayer, true);
  	//Physics2D.IgnoreLayerCollision(pickUpsLayer, projectileLayer, true);
  	
	rigidbody2D.AddForce(Vector3.down * hoverForce);
}

function Update () {

}

function OnCollisionEnter2D (col : Collision2D){

	if(col.gameObject.tag =="Player"){
			Destroy(gameObject);
	}
	if(col.gameObject.tag =="Wall" && col != null) {
		Destroy(gameObject);
	}
}