#pragma strict

static var EnemyLayer : int = 11;
static var GibsLayer : int = 12;
static var projectileLayer : int = 8;


function Start () {
	Physics2D.IgnoreLayerCollision(GibsLayer, EnemyLayer, true);
 	Physics2D.IgnoreLayerCollision(EnemyLayer, GibsLayer, true);
 	Physics2D.IgnoreLayerCollision(GibsLayer, projectileLayer, true);
 	Physics2D.IgnoreLayerCollision(projectileLayer, GibsLayer, true);

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
		rigidbody2D.AddForce(Vector2.right * 100 * GetRandomDirection());
		rigidbody2D.AddForce(Vector2.up * 100 * GetRandomDirection());
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
