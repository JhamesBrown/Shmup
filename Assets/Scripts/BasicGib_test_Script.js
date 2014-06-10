#pragma strict

function Start () {
	
	collider2D.isTrigger = false;
	rigidbody2D.AddForce(Vector3.right * 100 * (Mathf.RoundToInt(Random.Range(-1.0,1.0))));
	rigidbody2D.AddForce(Vector3.up * 100 * (Mathf.RoundToInt(Random.Range(-1.0,1.0))));
	if (rigidbody2D.velocity.x == 0 && rigidbody2D.velocity.y == 0){
		rigidbody2D.AddForce(Vector3.right * 100 * (Mathf.RoundToInt(Random.Range(-1.0,1.0))));
		rigidbody2D.AddForce(Vector3.up * 100 * (Mathf.RoundToInt(Random.Range(-1.0,1.0))));
	}
	countDown();
}

function Update () {
	if (rigidbody2D.velocity.x == 0 && rigidbody2D.velocity.y == 0){
		rigidbody2D.AddForce(Vector3.right * 100 * (Mathf.RoundToInt(Random.Range(-1.0,1.0))));
		rigidbody2D.AddForce(Vector3.up * 100 * (Mathf.RoundToInt(Random.Range(-1.0,1.0))));
	}
}

function countDown() {
	yield WaitForSeconds (0.3);
	collider2D.isTrigger = false;
	yield WaitForSeconds (Random.Range(1.0, 5.0));
	Destroy(gameObject);
}