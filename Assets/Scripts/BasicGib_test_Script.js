#pragma strict

function Start () {

	collider2D.isTrigger = false;
	rigidbody2D.AddForce(Vector2.right * 100 * GetRandomDirection());
	rigidbody2D.AddForce(Vector2.up * 100 * GetRandomDirection());
	if (rigidbody2D.velocity.x == 0 && rigidbody2D.velocity.y == 0){
		rigidbody2D.AddForce(Vector2.right * 100 * GetRandomDirection());
		rigidbody2D.AddForce(Vector2.up * 100 * GetRandomDirection());
	}
	countDown();
}

function Update () {
	if (rigidbody2D.velocity.x == 0 && rigidbody2D.velocity.y == 0){
		rigidbody2D.AddForce(transform.right * 100 * GetRandomDirection());
		rigidbody2D.AddForce(transform.up * 100 * GetRandomDirection());
	}
}

function countDown() {
	yield WaitForSeconds (0.3);
	collider2D.isTrigger = false;
	yield WaitForSeconds (Random.Range(1.0, 5.0));
	Destroy(gameObject);
}

function GetRandomDirection(){
    return Mathf.RoundToInt(Random.Range(-1.0,1.0));
}
