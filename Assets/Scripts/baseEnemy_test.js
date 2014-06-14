#pragma strict
var health : int;
var testGib_pref : Transform;

function Start () {
	health = 20;
}

function Update () {
	if (health <= 0 && collider2D != null) {
		collider2D.isTrigger = true;
		onDeath();
	}
}
function OnCollisionEnter2D (col : Collision2D) {

	if(col.gameObject.tag =="Projectile") {
		health -= 10;
	}

	if(col.gameObject.tag =="Wall" && col != null) {
		health = 0;
	}
}

function onDeath() {
	for (var i = 0; i < 15; i++){
			Instantiate(testGib_pref, Vector2( AddNoiseToXPosition(), AddNoiseToYPosition()), Quaternion.identity);
	}
	Destroy(gameObject);
}

function AddNoiseToXPosition(){
  return transform.position.x + Random.Range(-0.1, 0.1);

}

function AddNoiseToYPosition(){
  return transform.position.y + Random.Range(-0.1, 0.1);

}
